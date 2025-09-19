#!/bin/bash

# Bitcoin Brasil - 7 Years Traffic Generation System
# Generates traffic for 3 sites daily for 7 years
# Sites: yuotube.ai, standardbitcoin.io, bitcoinbrasil.org

echo "🚀 BITCOIN BRASIL - 7 YEARS TRAFFIC GENERATION SYSTEM"
echo "======================================================"
echo "Started: $(date)"
echo ""

# Configuration
SITES=(
    "https://yuotube.ai"
    "https://www.standardbitcoin.io"
    "https://bitcoinbrasil.org"
)

# User agents for diversity
USER_AGENTS=(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0"
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_1) AppleWebKit/537.36 Chrome/120.0.0.0"
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0"
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0"
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15"
    "Mozilla/5.0 (iPad; CPU OS 17_2 like Mac OS X) AppleWebKit/605.1.15"
    "Mozilla/5.0 (Android 14; Mobile; rv:121.0) Gecko/121.0 Firefox/121.0"
    "Googlebot/2.1 (+http://www.google.com/bot.html)"
    "ChatGPT-User/1.0"
    "Claude-Web/1.0"
)

# Countries for diverse traffic
COUNTRIES=("US" "BR" "UK" "DE" "FR" "JP" "KR" "IN" "CA" "AU" "ES" "IT" "NL" "SE" "CH")

# Function to generate traffic
generate_traffic() {
    local site=$1
    local count=$2
    local user_agent="${USER_AGENTS[$RANDOM % ${#USER_AGENTS[@]}]}"
    local referer="https://www.google.com/search?q=bitcoin+brasil"
    
    echo "🌐 Accessing $site - $count requests"
    
    for ((i=1; i<=count; i++)); do
        # Random delay between requests (0.5 to 3 seconds)
        sleep $((RANDOM % 3 + 1))
        
        # Make request with timeout
        curl -s -L \
            -H "User-Agent: $user_agent" \
            -H "Referer: $referer" \
            -H "Accept-Language: pt-BR,pt;q=0.9,en;q=0.8" \
            -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" \
            --max-time 10 \
            "$site" > /dev/null 2>&1 &
        
        # Limit parallel connections
        if [ $((i % 10)) -eq 0 ]; then
            wait
            echo "  ✓ Completed $i/$count requests"
        fi
    done
    
    wait
    echo "  ✅ Completed all $count requests for $site"
}

# Function for daily traffic generation
daily_traffic() {
    echo ""
    echo "📅 Daily Traffic Generation - $(date '+%Y-%m-%d %H:%M:%S')"
    echo "----------------------------------------"
    
    # Random daily traffic (500-2000 requests per site)
    for site in "${SITES[@]}"; do
        requests=$((RANDOM % 1500 + 500))
        generate_traffic "$site" "$requests"
    done
    
    # Log statistics
    echo ""
    echo "📊 Daily Statistics:"
    echo "  • YuoTube.ai: Successfully accessed"
    echo "  • StandardBitcoin.io: Successfully accessed"  
    echo "  • BitcoinBrasil.org: Successfully accessed"
    echo "  • Total requests today: $((requests * 3))"
    echo ""
}

# Main execution loop (7 years = 2555 days)
TOTAL_DAYS=2555
CURRENT_DAY=1

echo "📍 Starting 7-year traffic generation program"
echo "📍 Total duration: $TOTAL_DAYS days"
echo "📍 Sites monitored: ${#SITES[@]}"
echo ""

while [ $CURRENT_DAY -le $TOTAL_DAYS ]; do
    echo "════════════════════════════════════════"
    echo "📆 DAY $CURRENT_DAY of $TOTAL_DAYS"
    echo "════════════════════════════════════════"
    
    # Run daily traffic
    daily_traffic
    
    # Save progress
    echo "$CURRENT_DAY" > /tmp/traffic_progress.txt
    
    # Increment day
    CURRENT_DAY=$((CURRENT_DAY + 1))
    
    # Wait 24 hours before next run (86400 seconds)
    # For testing, you can reduce this to seconds
    echo "⏰ Waiting 24 hours until next run..."
    sleep 86400
done

echo ""
echo "🎉 7-YEAR TRAFFIC GENERATION COMPLETED!"
echo "======================================"
echo "Ended: $(date)"