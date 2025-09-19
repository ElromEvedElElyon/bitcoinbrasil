'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface CryptoPrice {
  symbol: string;
  price: number;
  change24h: number;
}

export default function CryptoPrices() {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 4 : 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    }).format(price);
  };

  const formatChange = (change: number) => {
    return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
  };

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/crypto?source=multiple');
        if (response.ok) {
          const data = await response.json();
          if (data.prices) {
            setPrices(data.prices.slice(0, 6));
          }
        }
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Erro ao buscar preços:', error);
      } finally {
        setLoading(false);
      }
    };

    // Busca inicial após 1 segundo
    const timer = setTimeout(fetchPrices, 1000);

    // Atualiza a cada 60 segundos
    const interval = setInterval(fetchPrices, 60000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (loading && prices.length === 0) {
    return (
      <div className="card-aurora p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-aurora-cyan" />
          Mercado Crypto
        </h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex justify-between items-center">
                <div className="h-4 bg-aurora-light rounded w-20"></div>
                <div className="h-4 bg-aurora-light rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card-aurora p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-aurora-cyan" />
          Mercado Crypto
        </h3>
        <span className="text-xs text-gray-400">
          {lastUpdate.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
      
      <div className="space-y-3">
        {prices.map((crypto) => (
          <div 
            key={crypto.symbol} 
            className="flex justify-between items-center hover:bg-aurora-light/10 rounded-lg p-2 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">{crypto.symbol}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white font-bold">
                {formatPrice(crypto.price)}
              </span>
              {crypto.change24h !== 0 && (
                <span 
                  className={`flex items-center gap-1 text-xs font-medium ${
                    crypto.change24h >= 0 
                      ? 'text-aurora-green' 
                      : 'text-aurora-pink'
                  }`}
                >
                  {crypto.change24h >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {formatChange(crypto.change24h)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-800">
        <p className="text-xs text-gray-500 text-center">
          Dados via Binance & CoinGecko API
        </p>
      </div>
    </div>
  );
}