'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { getCryptoPrices, formatPrice, formatLargeNumber, subscribeToPriceUpdates } from '@/services/cryptoPrices';

interface CryptoData {
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  volume_24h: number;
  image?: string;
  sparkline?: number[];
}

export default function CryptoTicker() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBRL, setShowBRL] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(5.50);

  useEffect(() => {
    // Initial load
    loadPrices();
    
    // Refresh every 10 seconds
    const interval = setInterval(loadPrices, 10000);
    
    // Subscribe to real-time updates for top cryptos
    const unsubscribe = subscribeToPriceUpdates(
      ['BTC', 'ETH', 'SOL', 'BNB', 'XRP'],
      (data) => {
        setCryptos(prev => prev.map(crypto => 
          crypto.symbol === data.symbol 
            ? { ...crypto, current_price: data.price, price_change_percentage_24h: data.changePercent24h }
            : crypto
        ));
      }
    );
    
    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, []);

  const loadPrices = async () => {
    try {
      const prices = await getCryptoPrices();
      setCryptos(prices.slice(0, 10)); // Top 10 cryptos
      setLoading(false);
      
      // Get BRL exchange rate
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      if (response.ok) {
        const data = await response.json();
        setExchangeRate(data.rates.BRL || 5.50);
      }
    } catch (error) {
      console.error('Error loading prices:', error);
      setLoading(false);
    }
  };

  const renderSparkline = (sparkline?: number[]) => {
    if (!sparkline || sparkline.length === 0) return null;
    
    const min = Math.min(...sparkline);
    const max = Math.max(...sparkline);
    const range = max - min;
    
    const points = sparkline.map((value, i) => {
      const x = (i / (sparkline.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    }).join(' ');
    
    const isPositive = sparkline[sparkline.length - 1] > sparkline[0];
    
    return (
      <svg width="80" height="32" className="inline-block">
        <polyline
          points={points}
          fill="none"
          stroke={isPositive ? '#00FF88' : '#FF006E'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  if (loading) {
    return (
      <div className="gradient-aurora-dark rounded-3xl p-6 animate-pulse">
        <div className="h-8 bg-aurora-light rounded-full w-48 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-aurora-light rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card-aurora overflow-hidden">
      {/* Header */}
      <div className="gradient-aurora p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Mercado Crypto ao Vivo
        </h2>
        <button
          onClick={() => setShowBRL(!showBRL)}
          className="btn-glass text-sm py-1 px-3"
        >
          {showBRL ? 'BRL' : 'USD'}
        </button>
      </div>

      {/* Crypto List */}
      <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
        {cryptos.map((crypto) => {
          const price = showBRL ? crypto.current_price * exchangeRate : crypto.current_price;
          const isPositive = crypto.price_change_percentage_24h > 0;
          
          return (
            <div
              key={crypto.symbol}
              className="glass-dark rounded-2xl p-4 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {crypto.image && (
                    <img 
                      src={crypto.image} 
                      alt={crypto.name}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-white">
                      {crypto.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {crypto.symbol}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-lg text-white">
                    {formatPrice(price, showBRL ? 'BRL' : 'USD')}
                  </div>
                  <div className={`flex items-center justify-end gap-1 text-sm font-medium ${
                    isPositive ? 'text-aurora-green' : 'text-aurora-pink'
                  }`}>
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </div>
              </div>
              
              {/* Additional Info */}
              <div className="mt-3 pt-3 border-t border-gray-700 flex justify-between items-center">
                <div className="flex gap-4 text-xs">
                  <div>
                    <span className="text-gray-500">Cap:</span>
                    <span className="text-gray-300 ml-1">
                      {formatLargeNumber(crypto.market_cap * (showBRL ? exchangeRate : 1))}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Vol 24h:</span>
                    <span className="text-gray-300 ml-1">
                      {formatLargeNumber(crypto.volume_24h * (showBRL ? exchangeRate : 1))}
                    </span>
                  </div>
                </div>
                <div>
                  {renderSparkline(crypto.sparkline)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Dados: CoinGecko + Binance</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-aurora-green rounded-full animate-pulse"></span>
            Atualização em tempo real
          </span>
        </div>
      </div>
    </div>
  );
}