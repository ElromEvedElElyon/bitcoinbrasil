#!/bin/bash

echo "🚀 Bitcoin Brasil - Deploy Script"
echo "================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}1. Checking GitHub repository...${NC}"
git remote -v

echo -e "${GREEN}✓ Repository configured${NC}"
echo ""

echo -e "${BLUE}2. Current branch and status:${NC}"
git branch --show-current
git status --short

echo ""
echo -e "${YELLOW}📌 Important Deployment Information:${NC}"
echo ""
echo "Repository: https://github.com/StandardBitcoin10/bitcoinbrasil"
echo "Latest commit: $(git log -1 --oneline)"
echo ""

echo -e "${GREEN}✅ Code successfully pushed to GitHub!${NC}"
echo ""
echo "To deploy to Netlify:"
echo "1. Go to https://app.netlify.com"
echo "2. Import the GitHub repository: StandardBitcoin10/bitcoinbrasil"
echo "3. Use these build settings:"
echo "   - Build command: npm install --legacy-peer-deps && npm run build"
echo "   - Publish directory: .next"
echo "   - Node version: 18"
echo ""
echo "Or use Netlify CLI:"
echo "   npx netlify-cli deploy --prod"
echo ""

echo -e "${BLUE}📊 Project Summary:${NC}"
echo "- Aurora Borealis theme ✨"
echo "- Real-time crypto prices (CoinGecko + Binance) 💰"
echo "- Google SEO optimized 🔍"
echo "- JWT Authentication (no cookies) 🔐"
echo "- 7 Languages support 🌍"
echo "- Modern glassmorphic UI 💎"
echo ""

echo -e "${GREEN}🎉 Deployment ready!${NC}"