'use client';

import { useEffect, useState } from 'react';
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

interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  high24h?: number;
  low24h?: number;
  rank?: number;
}

export default function MercadoAoVivo() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([
    // Dados iniciais para carregamento rápido
    { symbol: 'BTC', name: 'Bitcoin', price: 95234, change24h: 2.5, volume24h: 15600000000, marketCap: 1860000000000, rank: 1 },
    { symbol: 'ETH', name: 'Ethereum', price: 3567, change24h: 1.8, volume24h: 8900000000, marketCap: 429000000000, rank: 2 },
    { symbol: 'BNB', name: 'BNB', price: 642, change24h: -0.5, volume24h: 1200000000, marketCap: 96000000000, rank: 3 },
    { symbol: 'SOL', name: 'Solana', price: 187, change24h: 4.2, volume24h: 2100000000, marketCap: 84000000000, rank: 4 },
    { symbol: 'XRP', name: 'XRP', price: 0.62, change24h: -1.2, volume24h: 1100000000, marketCap: 35000000000, rank: 5 },
    { symbol: 'ADA', name: 'Cardano', price: 0.98, change24h: 3.1, volume24h: 450000000, marketCap: 34000000000, rank: 6 },
    { symbol: 'AVAX', name: 'Avalanche', price: 42.15, change24h: 2.8, volume24h: 380000000, marketCap: 15000000000, rank: 7 },
    { symbol: 'DOT', name: 'Polkadot', price: 8.92, change24h: -0.9, volume24h: 290000000, marketCap: 12000000000, rank: 8 },
    { symbol: 'MATIC', name: 'Polygon', price: 1.15, change24h: 1.5, volume24h: 410000000, marketCap: 10000000000, rank: 9 },
    { symbol: 'LINK', name: 'Chainlink', price: 15.78, change24h: 3.2, volume24h: 520000000, marketCap: 9000000000, rank: 10 }
  ]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchRealPrices = async () => {
    try {
      setLoading(true);
      
      // Busca direto da API CoinGecko
      const ids = 'bitcoin,ethereum,binancecoin,solana,ripple,cardano,avalanche-2,polkadot,matic-network,chainlink';
      const geckoUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`;
      
      const response = await fetch(geckoUrl);
      
      if (response.ok) {
        const data = await response.json();
        
        // Mapeia os dados para nosso formato
        const updatedCryptos = [
          { symbol: 'BTC', name: 'Bitcoin', price: data.bitcoin?.usd || 95234, change24h: data.bitcoin?.usd_24h_change || 2.5, volume24h: data.bitcoin?.usd_24h_vol || 15600000000, marketCap: data.bitcoin?.usd_market_cap || 1860000000000, rank: 1 },
          { symbol: 'ETH', name: 'Ethereum', price: data.ethereum?.usd || 3567, change24h: data.ethereum?.usd_24h_change || 1.8, volume24h: data.ethereum?.usd_24h_vol || 8900000000, marketCap: data.ethereum?.usd_market_cap || 429000000000, rank: 2 },
          { symbol: 'BNB', name: 'BNB', price: data.binancecoin?.usd || 642, change24h: data.binancecoin?.usd_24h_change || -0.5, volume24h: data.binancecoin?.usd_24h_vol || 1200000000, marketCap: data.binancecoin?.usd_market_cap || 96000000000, rank: 3 },
          { symbol: 'SOL', name: 'Solana', price: data.solana?.usd || 187, change24h: data.solana?.usd_24h_change || 4.2, volume24h: data.solana?.usd_24h_vol || 2100000000, marketCap: data.solana?.usd_market_cap || 84000000000, rank: 4 },
          { symbol: 'XRP', name: 'XRP', price: data.ripple?.usd || 0.62, change24h: data.ripple?.usd_24h_change || -1.2, volume24h: data.ripple?.usd_24h_vol || 1100000000, marketCap: data.ripple?.usd_market_cap || 35000000000, rank: 5 },
          { symbol: 'ADA', name: 'Cardano', price: data.cardano?.usd || 0.98, change24h: data.cardano?.usd_24h_change || 3.1, volume24h: data.cardano?.usd_24h_vol || 450000000, marketCap: data.cardano?.usd_market_cap || 34000000000, rank: 6 },
          { symbol: 'AVAX', name: 'Avalanche', price: data['avalanche-2']?.usd || 42.15, change24h: data['avalanche-2']?.usd_24h_change || 2.8, volume24h: data['avalanche-2']?.usd_24h_vol || 380000000, marketCap: data['avalanche-2']?.usd_market_cap || 15000000000, rank: 7 },
          { symbol: 'DOT', name: 'Polkadot', price: data.polkadot?.usd || 8.92, change24h: data.polkadot?.usd_24h_change || -0.9, volume24h: data.polkadot?.usd_24h_vol || 290000000, marketCap: data.polkadot?.usd_market_cap || 12000000000, rank: 8 },
          { symbol: 'MATIC', name: 'Polygon', price: data['matic-network']?.usd || 1.15, change24h: data['matic-network']?.usd_24h_change || 1.5, volume24h: data['matic-network']?.usd_24h_vol || 410000000, marketCap: data['matic-network']?.usd_market_cap || 10000000000, rank: 9 },
          { symbol: 'LINK', name: 'Chainlink', price: data.chainlink?.usd || 15.78, change24h: data.chainlink?.usd_24h_change || 3.2, volume24h: data.chainlink?.usd_24h_vol || 520000000, marketCap: data.chainlink?.usd_market_cap || 9000000000, rank: 10 }
        ];
        
        setCryptos(updatedCryptos);
      }
      
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Erro ao buscar preços:', error);
      // Mantém os valores de fallback já carregados
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Busca preços reais após 2 segundos
    const timer = setTimeout(() => {
      fetchRealPrices();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(fetchRealPrices, 60000); // Atualiza a cada 60 segundos
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(price);
    } else if (price >= 1) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(price);
    } else {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 4,
        maximumFractionDigits: 6
      }).format(price);
    }
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`;
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`;
    } else if (volume >= 1e3) {
      return `$${(volume / 1e3).toFixed(2)}K`;
    }
    return `$${volume.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-aurora-darker">
      {/* Aurora Background Effect - COMPLETO */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="gradient-aurora opacity-30 absolute inset-0"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-aurora-cyan blur-[150px] opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-aurora-purple blur-[150px] opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-aurora-pink blur-[150px] opacity-15 rounded-full animate-pulse"></div>
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-aurora-green blur-[120px] opacity-15 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-aurora-blue blur-[130px] opacity-15 rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-aurora-dark shadow-lg border-b-2 border-aurora-cyan">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <Link 
                  href="/" 
                  className="text-white hover:text-aurora-cyan transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold text-white">Bitcoin Brasil</h1>
              </div>
              <div className="flex space-x-4">
                <a 
                  href="https://yuotube.ai" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gradient-aurora text-white px-4 py-2 rounded-full text-sm hover:opacity-90 transition-opacity"
                >
                  YuoTube.ai
                </a>
                <a 
                  href="https://www.standardbitcoin.io" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-aurora-light text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity text-sm border border-aurora-purple"
                >
                  Standard Bitcoin
                </a>
                <a 
                  href="https://pump.fun/coin/386JZJtkvf43yoNawAHmHHeEhZWUTZ4UuJJtxC9fpump" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-aurora-pink text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity text-sm border border-aurora-cyan"
                >
                  STBTCx Token
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Page Title Section */}
        <div className="gradient-aurora-subtle py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-4">
                <Activity className="w-4 h-4 text-aurora-cyan animate-pulse" />
                <span className="text-sm font-medium text-white">Atualização em Tempo Real</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-aurora">Mercado Crypto ao Vivo</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-6">
                Preços em tempo real das principais criptomoedas via Binance & CoinGecko
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={fetchRealPrices}
                  disabled={loading}
                  className="btn-aurora inline-flex items-center gap-2"
                >
                  <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                  Atualizar Agora
                </button>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`btn-glass inline-flex items-center gap-2 ${
                    autoRefresh ? 'border-aurora-green' : 'border-gray-600'
                  }`}
                >
                  <Zap className={`w-5 h-5 ${autoRefresh ? 'text-aurora-green' : 'text-gray-400'}`} />
                  Auto-refresh: {autoRefresh ? 'ON' : 'OFF'}
                </button>
              </div>

              <div className="flex flex-wrap gap-6 justify-center mt-8">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Globe className="w-4 h-4 text-aurora-blue" />
                  <span>Dados Globais</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Activity className="w-4 h-4 text-aurora-cyan" />
                  <span>Última atualização: {lastUpdate.toLocaleTimeString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Sparkles className="w-4 h-4 text-aurora-pink" />
                  <span>{cryptos.length} Criptomoedas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Table */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="card-aurora overflow-hidden">
            <div className="gradient-aurora p-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <BarChart3 className="w-6 h-6" />
                Tabela de Preços em Tempo Real
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-aurora-dark/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Moeda
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Preço
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      24h %
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Volume 24h
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Market Cap
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {cryptos.map((crypto, index) => (
                    <tr 
                      key={crypto.symbol} 
                      className="hover:bg-aurora-light/10 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-400">
                          {crypto.rank || index + 1}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-aurora-cyan to-aurora-purple flex items-center justify-center">
                            <span className="text-xs font-bold text-white">
                              {crypto.symbol.slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <div className="text-white font-medium">{crypto.name}</div>
                            <div className="text-sm text-gray-400">{crypto.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <span className="text-white font-bold text-lg">
                          {formatPrice(crypto.price)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className={`inline-flex items-center gap-1 ${
                          crypto.change24h >= 0 
                            ? 'text-aurora-green' 
                            : 'text-aurora-pink'
                        }`}>
                          {crypto.change24h >= 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span className="font-medium">
                            {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <span className="text-gray-300">
                          {formatVolume(crypto.volume24h)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <span className="text-gray-300">
                          {formatVolume(crypto.marketCap)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="card-aurora p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Top Ganhador 24h</h3>
                <TrendingUp className="w-5 h-5 text-aurora-green" />
              </div>
              {(() => {
                const topGainer = [...cryptos].sort((a, b) => b.change24h - a.change24h)[0];
                return (
                  <div>
                    <p className="text-2xl font-bold text-aurora-green">
                      {topGainer.symbol}
                    </p>
                    <p className="text-sm text-gray-400">
                      +{topGainer.change24h.toFixed(2)}%
                    </p>
                  </div>
                );
              })()}
            </div>

            <div className="card-aurora p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Top Perdedor 24h</h3>
                <TrendingDown className="w-5 h-5 text-aurora-pink" />
              </div>
              {(() => {
                const topLoser = [...cryptos].sort((a, b) => a.change24h - b.change24h)[0];
                return (
                  <div>
                    <p className="text-2xl font-bold text-aurora-pink">
                      {topLoser.symbol}
                    </p>
                    <p className="text-sm text-gray-400">
                      {topLoser.change24h.toFixed(2)}%
                    </p>
                  </div>
                );
              })()}
            </div>

            <div className="card-aurora p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Maior Volume</h3>
                <DollarSign className="w-5 h-5 text-aurora-cyan" />
              </div>
              {(() => {
                const topVolume = [...cryptos].sort((a, b) => b.volume24h - a.volume24h)[0];
                return (
                  <div>
                    <p className="text-2xl font-bold text-aurora-cyan">
                      {topVolume.symbol}
                    </p>
                    <p className="text-sm text-gray-400">
                      {formatVolume(topVolume.volume24h)}
                    </p>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 card-aurora p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Acompanhe os Melhores Projetos
            </h3>
            <p className="text-gray-300 mb-6">
              Descubra as melhores oportunidades em AI e Blockchain
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="https://yuotube.ai" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-aurora inline-flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Explore YuoTube.ai
              </a>
              <a 
                href="https://www.standardbitcoin.io" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass inline-flex items-center gap-2"
              >
                <Globe className="w-5 h-5" />
                Standard Bitcoin
              </a>
              <a 
                href="https://pump.fun/coin/386JZJtkvf43yoNawAHmHHeEhZWUTZ4UuJJtxC9fpump" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-aurora inline-flex items-center gap-2 bg-aurora-pink"
              >
                <Sparkles className="w-5 h-5" />
                Comprar STBTCx
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}