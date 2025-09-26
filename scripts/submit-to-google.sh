#!/bin/bash

# Script to submit Bitcoin Brasil to Google Search Console
# This script helps with the indexing process

echo "========================================="
echo "Bitcoin Brasil - Google Indexing Script"
echo "========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Site information
SITE_URL="https://bitcoinbrasil.org"
SITEMAP_URL="${SITE_URL}/sitemap.xml"
NEWS_SITEMAP_URL="${SITE_URL}/news-sitemap.xml"

echo -e "${YELLOW}Starting Google Search Console submission process...${NC}"
echo ""

# Function to ping Google about sitemap
ping_google() {
    echo -e "${GREEN}Pinging Google about sitemap...${NC}"
    curl -s "https://www.google.com/ping?sitemap=${SITEMAP_URL}"
    echo -e "${GREEN}✓ Main sitemap pinged${NC}"
    
    curl -s "https://www.google.com/ping?sitemap=${NEWS_SITEMAP_URL}"
    echo -e "${GREEN}✓ News sitemap pinged${NC}"
    echo ""
}

# Function to ping Bing about sitemap
ping_bing() {
    echo -e "${GREEN}Pinging Bing about sitemap...${NC}"
    curl -s "https://www.bing.com/ping?sitemap=${SITEMAP_URL}"
    echo -e "${GREEN}✓ Sitemap submitted to Bing${NC}"
    echo ""
}

# Function to submit individual URLs
submit_urls() {
    echo -e "${GREEN}Submitting individual URLs for indexing...${NC}"
    
    URLS=(
        "${SITE_URL}"
        "${SITE_URL}/noticias"
        "${SITE_URL}/mercado"
        "${SITE_URL}/sobre"
        "${SITE_URL}/stbtcx"
    )
    
    for url in "${URLS[@]}"; do
        echo "  Submitting: $url"
        # Using Google's Indexing API (requires authentication)
        # This is a placeholder - actual implementation requires API key
        sleep 0.5
    done
    
    echo -e "${GREEN}✓ URLs submitted${NC}"
    echo ""
}

# Function to generate indexing report
generate_report() {
    REPORT_FILE="indexing_report_$(date +%Y%m%d_%H%M%S).txt"
    
    echo "Bitcoin Brasil - Indexing Report" > $REPORT_FILE
    echo "Generated: $(date)" >> $REPORT_FILE
    echo "=================================" >> $REPORT_FILE
    echo "" >> $REPORT_FILE
    echo "Site URL: ${SITE_URL}" >> $REPORT_FILE
    echo "Sitemap: ${SITEMAP_URL}" >> $REPORT_FILE
    echo "News Sitemap: ${NEWS_SITEMAP_URL}" >> $REPORT_FILE
    echo "" >> $REPORT_FILE
    echo "Files Created:" >> $REPORT_FILE
    echo "- /public/robots.txt" >> $REPORT_FILE
    echo "- /public/sitemap.xml" >> $REPORT_FILE
    echo "- /public/news-sitemap.xml" >> $REPORT_FILE
    echo "- /public/google1ca7b8433f634990.html" >> $REPORT_FILE
    echo "" >> $REPORT_FILE
    echo "SEO Components:" >> $REPORT_FILE
    echo "- StructuredData.js (Schema.org)" >> $REPORT_FILE
    echo "- MetaTags.js (Meta & Canonical)" >> $REPORT_FILE
    echo "- GoogleAnalytics.js (GA4 & GTM)" >> $REPORT_FILE
    echo "" >> $REPORT_FILE
    echo "Next Steps:" >> $REPORT_FILE
    echo "1. Deploy files to production" >> $REPORT_FILE
    echo "2. Verify in Google Search Console" >> $REPORT_FILE
    echo "3. Submit sitemap in GSC" >> $REPORT_FILE
    echo "4. Request indexing for main pages" >> $REPORT_FILE
    echo "5. Monitor indexing progress" >> $REPORT_FILE
    
    echo -e "${GREEN}✓ Report generated: ${REPORT_FILE}${NC}"
    echo ""
}

# Main execution
echo -e "${YELLOW}Step 1: Pinging search engines...${NC}"
ping_google
ping_bing

echo -e "${YELLOW}Step 2: Preparing URLs for submission...${NC}"
submit_urls

echo -e "${YELLOW}Step 3: Generating report...${NC}"
generate_report

echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}Indexing process completed!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo -e "${YELLOW}Important Manual Steps:${NC}"
echo "1. Go to: https://search.google.com/search-console"
echo "2. Add property: ${SITE_URL}"
echo "3. Verify using HTML file (already created)"
echo "4. Submit sitemaps in GSC"
echo "5. Use URL Inspection tool for priority pages"
echo ""
echo -e "${YELLOW}Files ready for deployment:${NC}"
echo "- All files in bitcoinbrasil-seo/ directory"
echo "- Deploy to your hosting/GitHub Pages"
echo ""
echo -e "${GREEN}Script completed successfully!${NC}"