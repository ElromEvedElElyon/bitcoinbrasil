#!/bin/bash

echo "🚀 Starting Bitcoin Brasil Authentication Server..."
echo "================================================"
echo ""

# Check if node_modules exists
if [ ! -d "auth-server/node_modules" ]; then
  echo "📦 Installing dependencies..."
  cd auth-server
  npm install
  cd ..
  echo "✅ Dependencies installed"
  echo ""
fi

# Start the auth server
echo "🔐 Starting authentication server on port 3001..."
echo "================================================"
echo ""
echo "Features:"
echo "✅ JWT Authentication (no cookies)"
echo "✅ WebSocket support for real-time features"
echo "✅ Rate limiting for security"
echo "✅ Multi-language support"
echo "✅ Session management"
echo ""
echo "API Endpoints:"
echo "POST   http://localhost:3001/api/auth/register"
echo "POST   http://localhost:3001/api/auth/login"
echo "POST   http://localhost:3001/api/auth/refresh"
echo "POST   http://localhost:3001/api/auth/logout"
echo "GET    http://localhost:3001/api/user/profile"
echo "PUT    http://localhost:3001/api/user/preferences"
echo "GET    http://localhost:3001/api/user/sessions"
echo "POST   http://localhost:3001/api/user/revoke-sessions"
echo ""
echo "WebSocket: ws://localhost:3001"
echo ""
echo "Press Ctrl+C to stop the server"
echo "================================================"
echo ""

cd auth-server
node server.js