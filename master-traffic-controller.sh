#!/bin/bash

# MASTER TRAFFIC CONTROLLER
# Manages traffic generation for 7 years with 100 parallel agents
# Sites: yuotube.ai, standardbitcoin.io, bitcoinbrasil.org

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║     BITCOIN BRASIL - MASTER TRAFFIC CONTROLLER              ║"
echo "║     7 YEARS AUTOMATED TRAFFIC GENERATION SYSTEM             ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "🌐 Target Sites:"
echo "   1. https://yuotube.ai"
echo "   2. https://www.standardbitcoin.io"
echo "   3. https://bitcoinbrasil.org"
echo ""
echo "⚙️  Configuration:"
echo "   • Duration: 7 years (2,555 days)"
echo "   • Agents: 100 parallel"
echo "   • Daily requests: 50,000 - 150,000 per site"
echo "   • Total estimated: 1+ billion requests"
echo ""

# Create log directory
mkdir -p /home/administrador/bitcoinbrasil/traffic_logs
LOG_DIR="/home/administrador/bitcoinbrasil/traffic_logs"

# Function to run daily traffic with 100 agents
run_daily_traffic() {
    local day=$1
    local year=$((day / 365 + 1))
    local day_of_year=$((day % 365))
    
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║  📅 YEAR $year - DAY $day_of_year (Total Day: $day/2555)    ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    
    # Morning batch (6 AM)
    echo "🌅 Morning Traffic Batch (06:00)"
    ./100-agents-traffic.sh >> "$LOG_DIR/day_${day}_morning.log" 2>&1 &
    
    # Afternoon batch (2 PM)  
    sleep 28800  # 8 hours
    echo "☀️ Afternoon Traffic Batch (14:00)"
    ./100-agents-traffic.sh >> "$LOG_DIR/day_${day}_afternoon.log" 2>&1 &
    
    # Evening batch (10 PM)
    sleep 28800  # 8 hours
    echo "🌙 Evening Traffic Batch (22:00)"
    ./100-agents-traffic.sh >> "$LOG_DIR/day_${day}_evening.log" 2>&1 &
    
    # Wait for all batches to complete
    wait
    
    # Daily summary
    echo ""
    echo "📊 Daily Summary - Day $day"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "✅ Morning batch: Complete"
    echo "✅ Afternoon batch: Complete"
    echo "✅ Evening batch: Complete"
    echo "📈 Estimated requests: ~450,000"
    echo ""
    
    # Save progress
    echo "$day" > "$LOG_DIR/current_day.txt"
}

# Function to run continuous traffic
run_continuous() {
    # Check if resuming
    if [ -f "$LOG_DIR/current_day.txt" ]; then
        CURRENT_DAY=$(cat "$LOG_DIR/current_day.txt")
        echo "📍 Resuming from day $CURRENT_DAY"
    else
        CURRENT_DAY=1
        echo "🚀 Starting fresh from day 1"
    fi
    
    # Run for 7 years (2555 days)
    while [ $CURRENT_DAY -le 2555 ]; do
        run_daily_traffic $CURRENT_DAY
        
        # Increment day
        CURRENT_DAY=$((CURRENT_DAY + 1))
        
        # Wait for next day (24 hours = 86400 seconds)
        # For testing, use smaller value like 60 seconds
        echo "⏰ Waiting 24 hours for next day..."
        sleep 86400
    done
    
    echo "🎉 7-YEAR MISSION COMPLETE!"
    echo "Total days: 2,555"
    echo "Total estimated requests: 1.15 billion+"
}

# Function for immediate test
run_test() {
    echo "🧪 Running test batch (1 minute)..."
    
    # Quick test with fewer agents
    for site in "https://yuotube.ai" "https://www.standardbitcoin.io" "https://bitcoinbrasil.org"; do
        echo "Testing $site..."
        for i in {1..10}; do
            curl -s -L --max-time 5 "$site" > /dev/null 2>&1 &
        done
    done
    
    wait
    echo "✅ Test complete!"
}

# Main menu
echo "Select operation mode:"
echo "1) Start 7-year continuous traffic"
echo "2) Run single day test"
echo "3) Quick test (1 minute)"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        echo "🚀 Starting 7-year traffic generation..."
        chmod +x 100-agents-traffic.sh
        run_continuous
        ;;
    2)
        echo "📆 Running single day test..."
        chmod +x 100-agents-traffic.sh
        run_daily_traffic 1
        ;;
    3)
        echo "⚡ Running quick test..."
        run_test
        ;;
    *)
        echo "Invalid choice!"
        exit 1
        ;;
esac

echo ""
echo "✨ Master Traffic Controller finished!"
echo "Logs saved in: $LOG_DIR"