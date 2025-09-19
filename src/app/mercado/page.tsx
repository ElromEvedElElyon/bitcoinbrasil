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
import MarketClient from './MarketClient';

// Função para buscar dados no servidor (mais rápido)
async function getInitialPrices() {
  try {
    // Lista resumida das principais cryptos
    const mainCryptos = [
      { symbol: 'BTC', id: 'bitcoin', name: 'Bitcoin' },
      { symbol: 'ETH', id: 'ethereum', name: 'Ethereum' },
      { symbol: 'BNB', id: 'binancecoin', name: 'BNB' },
      { symbol: 'SOL', id: 'solana', name: 'Solana' },
      { symbol: 'XRP', id: 'ripple', name: 'XRP' },
      { symbol: 'ADA', id: 'cardano', name: 'Cardano' }
    ];

    // Dados estáticos de fallback para carregamento rápido
    return mainCryptos.map((crypto, index) => ({
      symbol: crypto.symbol,
      name: crypto.name,
      price: 0,
      change24h: 0,
      volume24h: 0,
      marketCap: 0,
      rank: index + 1
    }));
  } catch (error) {
    console.error('Error fetching initial prices:', error);
    return [];
  }
}

export default async function MercadoAoVivo() {
  const initialPrices = await getInitialPrices();

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

              <div className="flex flex-wrap gap-6 justify-center mt-8">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Globe className="w-4 h-4 text-aurora-blue" />
                  <span>Dados Globais</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Sparkles className="w-4 h-4 text-aurora-pink" />
                  <span>Top Criptomoedas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Component for Dynamic Data */}
        <MarketClient initialPrices={initialPrices} />
      </div>
    </div>
  );
}