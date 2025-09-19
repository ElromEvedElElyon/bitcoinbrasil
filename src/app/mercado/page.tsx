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
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchRealPrices = async () => {
    try {
      setLoading(true);
      
      // Lista expandida de criptomoedas
      const cryptoList = [
        { symbol: 'BTC', id: 'bitcoin', name: 'Bitcoin' },
        { symbol: 'ETH', id: 'ethereum', name: 'Ethereum' },
        { symbol: 'BNB', id: 'binancecoin', name: 'BNB' },
        { symbol: 'SOL', id: 'solana', name: 'Solana' },
        { symbol: 'XRP', id: 'ripple', name: 'XRP' },
        { symbol: 'ADA', id: 'cardano', name: 'Cardano' },
        { symbol: 'AVAX', id: 'avalanche-2', name: 'Avalanche' },
        { symbol: 'DOT', id: 'polkadot', name: 'Polkadot' },
        { symbol: 'MATIC', id: 'matic-network', name: 'Polygon' },
        { symbol: 'LINK', id: 'chainlink', name: 'Chainlink' },
        { symbol: 'UNI', id: 'uniswap', name: 'Uniswap' },
        { symbol: 'ATOM', id: 'cosmos', name: 'Cosmos' },
        { symbol: 'LTC', id: 'litecoin', name: 'Litecoin' },
        { symbol: 'FIL', id: 'filecoin', name: 'Filecoin' },
        { symbol: 'ARB', id: 'arbitrum', name: 'Arbitrum' }
      ];

      const prices: CryptoData[] = [];

      // Busca dados do CoinGecko para todos de uma vez
      const ids = cryptoList.map(c => c.id).join(',');
      const geckoResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=false&price_change_percentage=24h`
      );

      if (geckoResponse.ok) {
        const geckoData = await geckoResponse.json();
        
        for (const coin of geckoData) {
          const cryptoInfo = cryptoList.find(c => c.id === coin.id);
          if (cryptoInfo) {
            prices.push({
              symbol: cryptoInfo.symbol,
              name: cryptoInfo.name,
              price: coin.current_price,
              change24h: coin.price_change_percentage_24h || 0,
              volume24h: coin.total_volume || 0,
              marketCap: coin.market_cap || 0,
              high24h: coin.high_24h,
              low24h: coin.low_24h,
              rank: coin.market_cap_rank
            });
          }
        }
      }

      // Fallback para Binance API para os principais pares
      if (prices.length === 0) {
        for (const crypto of cryptoList.slice(0, 6)) {
          try {
            const response = await fetch(
              `https://api.binance.com/api/v3/ticker/24hr?symbol=${crypto.symbol}USDT`
            );
            
            if (response.ok) {
              const data = await response.json();
              prices.push({
                symbol: crypto.symbol,
                name: crypto.name,
                price: parseFloat(data.lastPrice),
                change24h: parseFloat(data.priceChangePercent),
                volume24h: parseFloat(data.volume) * parseFloat(data.lastPrice),
                marketCap: 0,
                high24h: parseFloat(data.highPrice),
                low24h: parseFloat(data.lowPrice)
              });
            }
          } catch (error) {
            console.error(`Erro ao buscar ${crypto.symbol}:`, error);
          }
        }
      }

      setCryptos(prices);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Erro ao buscar preços:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealPrices();

    if (autoRefresh) {
      const interval = setInterval(fetchRealPrices, 30000); // Atualiza a cada 30 segundos
      return () => clearInterval(interval);
    }
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
      {/* Aurora Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="gradient-aurora opacity-30 absolute inset-0"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-aurora-cyan blur-[150px] opacity-20 rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-aurora-purple blur-[150px] opacity-20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-aurora-pink blur-[150px] opacity-15 rounded-full"></div>
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

            {loading && cryptos.length === 0 ? (
              <div className="p-12 text-center">
                <div className="inline-flex items-center gap-3">
                  <RefreshCw className="w-6 h-6 text-aurora-cyan animate-spin" />
                  <span className="text-white text-lg">Carregando dados do mercado...</span>
                </div>
              </div>
            ) : (
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
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                        24h High/Low
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
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          {crypto.high24h && crypto.low24h ? (
                            <div className="text-sm">
                              <div className="text-aurora-green">
                                H: {formatPrice(crypto.high24h)}
                              </div>
                              <div className="text-aurora-pink">
                                L: {formatPrice(crypto.low24h)}
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="card-aurora p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Top Ganhador 24h</h3>
                <TrendingUp className="w-5 h-5 text-aurora-green" />
              </div>
              {cryptos.length > 0 && (() => {
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
              {cryptos.length > 0 && (() => {
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
              {cryptos.length > 0 && (() => {
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
        </div>
      </div>
    </div>
  );
}