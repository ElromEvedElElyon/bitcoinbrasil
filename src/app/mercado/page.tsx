'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  DollarSign, 
  BarChart3,
  ArrowLeft,
  RefreshCw,
  Sparkles,
  Globe,
  Zap
} from 'lucide-react';

export default function MercadoAoVivo() {
  const [cryptos] = useState([
    { symbol: 'BTC', name: 'Bitcoin', price: 95234, change24h: 2.5, volume24h: 15600000000, marketCap: 1860000000000, rank: 1 },
    { symbol: 'ETH', name: 'Ethereum', price: 3567, change24h: 1.8, volume24h: 8900000000, marketCap: 429000000000, rank: 2 },
    { symbol: 'BNB', name: 'BNB', price: 642, change24h: -0.5, volume24h: 1200000000, marketCap: 96000000000, rank: 3 },
    { symbol: 'SOL', name: 'Solana', price: 187, change24h: 4.2, volume24h: 2100000000, marketCap: 84000000000, rank: 4 },
    { symbol: 'XRP', name: 'XRP', price: 0.62, change24h: -1.2, volume24h: 1100000000, marketCap: 35000000000, rank: 5 },
    { symbol: 'ADA', name: 'Cardano', price: 0.98, change24h: 3.1, volume24h: 450000000, marketCap: 34000000000, rank: 6 }
  ]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price >= 1 ? 2 : 4,
      maximumFractionDigits: price >= 1 ? 2 : 6
    }).format(price);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`;
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`;
    return `$${volume.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-aurora-darker">
      {/* Aurora Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="gradient-aurora opacity-30 absolute inset-0"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-aurora-cyan blur-[150px] opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-aurora-purple blur-[150px] opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-aurora-pink blur-[150px] opacity-15 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-aurora-dark shadow-lg border-b-2 border-aurora-cyan">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <Link href="/" className="text-white hover:text-aurora-cyan transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold text-white">Bitcoin Brasil</h1>
              </div>
              <div className="flex space-x-4">
                <a href="https://yuotube.ai" target="_blank" rel="noopener noreferrer"
                  className="gradient-aurora text-white px-4 py-2 rounded-full text-sm hover:opacity-90 transition-opacity">
                  YuoTube.ai
                </a>
                <a href="https://www.standardbitcoin.io" target="_blank" rel="noopener noreferrer"
                  className="bg-aurora-light text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity text-sm border border-aurora-purple">
                  Standard Bitcoin
                </a>
                <a href="https://pump.fun/coin/386JZJtkvf43yoNawAHmHHeEhZWUTZ4UuJJtxC9fpump" target="_blank" rel="noopener noreferrer"
                  className="bg-aurora-pink text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity text-sm border border-aurora-cyan">
                  STBTCx Token
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Title Section */}
        <div className="gradient-aurora-subtle py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-4">
              <Activity className="w-4 h-4 text-aurora-cyan animate-pulse" />
              <span className="text-sm font-medium text-white">Atualização em Tempo Real</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-aurora">Mercado Crypto ao Vivo</span>
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Preços das principais criptomoedas
            </p>
          </div>
        </div>

        {/* Market Table */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="card-aurora overflow-hidden">
            <div className="gradient-aurora p-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <BarChart3 className="w-6 h-6" />
                Tabela de Preços
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-aurora-dark/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Moeda</th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Preço</th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">24h %</th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Volume 24h</th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Market Cap</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {cryptos.map((crypto) => (
                    <tr key={crypto.symbol} className="hover:bg-aurora-light/10 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-400">{crypto.rank}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-aurora-cyan to-aurora-purple flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{crypto.symbol.slice(0, 2)}</span>
                          </div>
                          <div>
                            <div className="text-white font-medium">{crypto.name}</div>
                            <div className="text-sm text-gray-400">{crypto.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <span className="text-white font-bold text-lg">{formatPrice(crypto.price)}</span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className={`inline-flex items-center gap-1 ${crypto.change24h >= 0 ? 'text-aurora-green' : 'text-aurora-pink'}`}>
                          {crypto.change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span className="font-medium">
                            {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <span className="text-gray-300">{formatVolume(crypto.volume24h)}</span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <span className="text-gray-300">{formatVolume(crypto.marketCap)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}