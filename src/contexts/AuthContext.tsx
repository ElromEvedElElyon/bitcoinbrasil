'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface User {
  userId: string;
  username: string;
  email: string;
  language: string;
  preferences: {
    theme: 'dark' | 'light';
    notifications: boolean;
    language: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, language?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  updatePreferences: (preferences: Partial<User['preferences']>) => Promise<void>;
  wsConnection: WebSocket | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';

// Token management in localStorage (not cookies!)
class TokenManager {
  private static ACCESS_TOKEN_KEY = 'btc_brasil_access_token';
  private static REFRESH_TOKEN_KEY = 'btc_brasil_refresh_token';
  private static SESSION_ID_KEY = 'btc_brasil_session_id';
  
  static getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }
  
  static getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }
  
  static getSessionId(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.SESSION_ID_KEY);
  }
  
  static setTokens(accessToken: string, refreshToken: string, sessionId?: string) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    if (sessionId) {
      localStorage.setItem(this.SESSION_ID_KEY, sessionId);
    }
  }
  
  static clearTokens() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.SESSION_ID_KEY);
  }
  
  static isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }
}

// API Client
class ApiClient {
  private static async request(endpoint: string, options: RequestInit = {}) {
    const accessToken = TokenManager.getAccessToken();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    if (accessToken && !TokenManager.isTokenExpired(accessToken)) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || 'Request failed');
    }
    
    return response.json();
  }
  
  static async login(email: string, password: string) {
    const data = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    TokenManager.setTokens(data.accessToken, data.refreshToken, data.sessionId);
    return data;
  }
  
  static async register(username: string, email: string, password: string, language = 'pt') {
    const data = await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, language }),
    });
    
    TokenManager.setTokens(data.accessToken, data.refreshToken, data.sessionId);
    return data;
  }
  
  static async logout() {
    const refreshToken = TokenManager.getRefreshToken();
    const sessionId = TokenManager.getSessionId();
    
    try {
      await this.request('/api/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken, sessionId }),
      });
    } finally {
      TokenManager.clearTokens();
    }
  }
  
  static async refreshToken() {
    const refreshToken = TokenManager.getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token');
    
    const data = await this.request('/api/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
    
    TokenManager.setTokens(data.accessToken, data.refreshToken);
    return data;
  }
  
  static async getProfile() {
    return this.request('/api/user/profile');
  }
  
  static async updatePreferences(preferences: Partial<User['preferences']>) {
    return this.request('/api/user/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  }
}

// WebSocket Manager
class WsManager {
  private ws: WebSocket | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private messageHandlers: ((data: any) => void)[] = [];
  
  connect(token: string) {
    if (this.ws?.readyState === WebSocket.OPEN) return;
    
    this.ws = new WebSocket(WS_URL);
    
    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.ws?.send(JSON.stringify({ type: 'AUTH', token }));
    };
    
    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.messageHandlers.forEach(handler => handler(data));
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    };
    
    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.reconnectTimer = setTimeout(() => {
        const token = TokenManager.getAccessToken();
        if (token && !TokenManager.isTokenExpired(token)) {
          this.connect(token);
        }
      }, 5000);
    };
    
    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    return this.ws;
  }
  
  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
  
  send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }
  
  onMessage(handler: (data: any) => void) {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }
  
  getConnection() {
    return this.ws;
  }
}

// Auth Provider Component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [wsManager] = useState(() => new WsManager());
  
  const isAuthenticated = !!user;
  
  // Auto refresh token before expiry
  useEffect(() => {
    const token = TokenManager.getAccessToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    
    if (TokenManager.isTokenExpired(token)) {
      refreshToken().finally(() => setIsLoading(false));
    } else {
      // Load user profile
      ApiClient.getProfile()
        .then(setUser)
        .catch(() => TokenManager.clearTokens())
        .finally(() => setIsLoading(false));
      
      // Setup auto refresh
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiresIn = payload.exp * 1000 - Date.now() - 60000; // Refresh 1 min before expiry
      
      const timer = setTimeout(() => {
        refreshToken();
      }, Math.max(0, expiresIn));
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // WebSocket connection management
  useEffect(() => {
    const token = TokenManager.getAccessToken();
    if (token && !TokenManager.isTokenExpired(token)) {
      wsManager.connect(token);
    }
    
    return () => {
      wsManager.disconnect();
    };
  }, [user]);
  
  const login = useCallback(async (email: string, password: string) => {
    const data = await ApiClient.login(email, password);
    setUser(data.user);
    
    // Connect WebSocket
    wsManager.connect(data.accessToken);
  }, [wsManager]);
  
  const register = useCallback(async (username: string, email: string, password: string, language?: string) => {
    const data = await ApiClient.register(username, email, password, language);
    setUser(data.user);
    
    // Connect WebSocket
    wsManager.connect(data.accessToken);
  }, [wsManager]);
  
  const logout = useCallback(async () => {
    await ApiClient.logout();
    setUser(null);
    wsManager.disconnect();
  }, [wsManager]);
  
  const refreshToken = useCallback(async () => {
    try {
      await ApiClient.refreshToken();
      const profile = await ApiClient.getProfile();
      setUser(profile);
    } catch (error) {
      console.error('Token refresh failed:', error);
      setUser(null);
      TokenManager.clearTokens();
      throw error;
    }
  }, []);
  
  const updatePreferences = useCallback(async (preferences: Partial<User['preferences']>) => {
    const data = await ApiClient.updatePreferences(preferences);
    setUser(prev => prev ? { ...prev, preferences: { ...prev.preferences, ...preferences } } : null);
    return data;
  }, []);
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        refreshToken,
        updatePreferences,
        wsConnection: wsManager.getConnection(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}