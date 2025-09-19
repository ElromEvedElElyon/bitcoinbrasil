const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { v4: uuidv4 } = require('uuid');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Environment setup
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'bitcoin-brasil-secret-key-2025';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh-secret-key-2025';

// In-memory storage (replace with database in production)
const users = new Map();
const sessions = new Map();
const refreshTokens = new Map();

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: ['http://localhost:3000', 'https://bitcoinbrasil.org'],
  credentials: false // No cookies!
}));
app.use(express.json());

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many authentication attempts, please try again later'
});

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100 // 100 requests per minute
});

app.use('/api/auth', authLimiter);
app.use('/api', apiLimiter);

// WebSocket connections for real-time features
const wsClients = new Map();

wss.on('connection', (ws, req) => {
  const clientId = uuidv4();
  
  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);
      
      if (data.type === 'AUTH') {
        const token = data.token;
        const decoded = jwt.verify(token, JWT_SECRET);
        wsClients.set(clientId, { ws, userId: decoded.userId, username: decoded.username });
        
        ws.send(JSON.stringify({
          type: 'AUTH_SUCCESS',
          clientId,
          username: decoded.username
        }));
      }
      
      if (data.type === 'BROADCAST' && wsClients.has(clientId)) {
        // Broadcast message to all authenticated clients
        wsClients.forEach((client, id) => {
          if (id !== clientId && client.ws.readyState === WebSocket.OPEN) {
            client.ws.send(JSON.stringify({
              type: 'MESSAGE',
              from: wsClients.get(clientId).username,
              content: data.content,
              timestamp: new Date().toISOString()
            }));
          }
        });
      }
    } catch (error) {
      ws.send(JSON.stringify({ type: 'ERROR', message: 'Invalid authentication' }));
    }
  });
  
  ws.on('close', () => {
    wsClients.delete(clientId);
  });
});

// Helper functions
function generateTokens(userId, username) {
  const accessToken = jwt.sign(
    { userId, username },
    JWT_SECRET,
    { expiresIn: '15m' }
  );
  
  const refreshToken = jwt.sign(
    { userId, username, type: 'refresh' },
    REFRESH_SECRET,
    { expiresIn: '7d' }
  );
  
  return { accessToken, refreshToken };
}

function generateSessionId() {
  return uuidv4();
}

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    activeSessions: sessions.size,
    activeWebSockets: wsClients.size
  });
});

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, language = 'pt' } = req.body;
    
    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Check if user exists
    if (users.has(email)) {
      return res.status(409).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const userId = uuidv4();
    const user = {
      userId,
      username,
      email,
      password: hashedPassword,
      language,
      createdAt: new Date().toISOString(),
      preferences: {
        theme: 'dark',
        notifications: true,
        language
      }
    };
    
    users.set(email, user);
    
    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(userId, username);
    
    // Store refresh token
    refreshTokens.set(refreshToken, { userId, email });
    
    // Create session
    const sessionId = generateSessionId();
    sessions.set(sessionId, {
      userId,
      username,
      email,
      loginTime: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    });
    
    res.status(201).json({
      message: 'User registered successfully',
      accessToken,
      refreshToken,
      sessionId,
      user: {
        userId,
        username,
        email,
        language,
        preferences: user.preferences
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Find user
    const user = users.get(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user.userId, user.username);
    
    // Store refresh token
    refreshTokens.set(refreshToken, { userId: user.userId, email });
    
    // Create session
    const sessionId = generateSessionId();
    sessions.set(sessionId, {
      userId: user.userId,
      username: user.username,
      email,
      loginTime: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    });
    
    res.json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      sessionId,
      user: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        language: user.language,
        preferences: user.preferences
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Refresh token
app.post('/api/auth/refresh', (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token required' });
    }
    
    // Verify refresh token
    const tokenData = refreshTokens.get(refreshToken);
    if (!tokenData) {
      return res.status(403).json({ error: 'Invalid refresh token' });
    }
    
    // Verify JWT
    jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
      if (err) {
        refreshTokens.delete(refreshToken);
        return res.status(403).json({ error: 'Invalid refresh token' });
      }
      
      // Generate new tokens
      const { accessToken, refreshToken: newRefreshToken } = generateTokens(
        decoded.userId,
        decoded.username
      );
      
      // Update refresh token
      refreshTokens.delete(refreshToken);
      refreshTokens.set(newRefreshToken, { 
        userId: decoded.userId, 
        email: tokenData.email 
      });
      
      res.json({
        accessToken,
        refreshToken: newRefreshToken
      });
    });
  } catch (error) {
    console.error('Refresh error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  try {
    const { refreshToken, sessionId } = req.body;
    
    // Remove refresh token
    if (refreshToken) {
      refreshTokens.delete(refreshToken);
    }
    
    // Remove session
    if (sessionId) {
      sessions.delete(sessionId);
    }
    
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify token middleware
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    
    req.user = decoded;
    next();
  });
}

// Protected route example - Get user profile
app.get('/api/user/profile', verifyToken, (req, res) => {
  const user = Array.from(users.values()).find(u => u.userId === req.user.userId);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json({
    userId: user.userId,
    username: user.username,
    email: user.email,
    language: user.language,
    preferences: user.preferences,
    createdAt: user.createdAt
  });
});

// Update user preferences
app.put('/api/user/preferences', verifyToken, (req, res) => {
  const { theme, notifications, language } = req.body;
  const user = Array.from(users.values()).find(u => u.userId === req.user.userId);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Update preferences
  if (theme) user.preferences.theme = theme;
  if (notifications !== undefined) user.preferences.notifications = notifications;
  if (language) {
    user.preferences.language = language;
    user.language = language;
  }
  
  res.json({
    message: 'Preferences updated',
    preferences: user.preferences
  });
});

// Get active sessions
app.get('/api/user/sessions', verifyToken, (req, res) => {
  const userSessions = Array.from(sessions.entries())
    .filter(([_, session]) => session.userId === req.user.userId)
    .map(([sessionId, session]) => ({
      sessionId,
      loginTime: session.loginTime,
      lastActivity: session.lastActivity
    }));
  
  res.json({ sessions: userSessions });
});

// Revoke all sessions
app.post('/api/user/revoke-sessions', verifyToken, (req, res) => {
  // Remove all sessions for user
  const sessionIds = Array.from(sessions.entries())
    .filter(([_, session]) => session.userId === req.user.userId)
    .map(([sessionId]) => sessionId);
  
  sessionIds.forEach(id => sessions.delete(id));
  
  // Remove all refresh tokens for user
  const userTokens = Array.from(refreshTokens.entries())
    .filter(([_, data]) => data.userId === req.user.userId)
    .map(([token]) => token);
  
  userTokens.forEach(token => refreshTokens.delete(token));
  
  res.json({ 
    message: 'All sessions revoked', 
    revokedSessions: sessionIds.length 
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║                                            ║
║   🚀 Bitcoin Brasil Auth Server           ║
║                                            ║
║   Running on: http://localhost:${PORT}       ║
║   WebSocket: ws://localhost:${PORT}         ║
║                                            ║
║   Features:                                ║
║   ✅ JWT Authentication                   ║
║   ✅ No Cookies (localStorage)            ║
║   ✅ WebSocket Support                    ║
║   ✅ Rate Limiting                        ║
║   ✅ Session Management                   ║
║   ✅ Multi-language Support               ║
║                                            ║
╚════════════════════════════════════════════╝
  `);
});