// Crypto Price Service - Binance & CoinGecko APIs
// Mantém dados atualizados de preços de criptomoedas

interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h?: number;
  marketCap?: number;
}

class CryptoPriceService {
  private binanceBaseUrl = 'https://api.binance.com/api/v3';
  private coingeckoBaseUrl = 'https://api.coingecko.com/api/v3';
  private cache: Map<string, { data: unknown; timestamp: number }> = new Map();
  private cacheTimeout = 60000; // 1 minuto de cache

  // Busca preços da Binance
  async getBinancePrice(symbol: string): Promise<number | null> {
    try {
      const cacheKey = `binance_${symbol}`;
      const cached = this.getFromCache(cacheKey);
      if (cached && typeof cached === 'number') return cached;

      const response = await fetch(
        `${this.binanceBaseUrl}/ticker/price?symbol=${symbol}USDT`
      );
      
      if (!response.ok) return null;
      
      const data = await response.json();
      const price = parseFloat(data.price);
      
      this.setCache(cacheKey, price);
      return price;
    } catch (error) {
      console.error(`Erro ao buscar preço Binance para ${symbol}:`, error);
      return null;
    }
  }

  // Busca preços do CoinGecko
  async getCoingeckoPrice(coinId: string): Promise<CryptoPrice | null> {
    try {
      const cacheKey = `coingecko_${coinId}`;
      const cached = this.getFromCache(cacheKey);
      if (cached && typeof cached === 'object' && cached !== null) return cached as CryptoPrice;

      const response = await fetch(
        `${this.coingeckoBaseUrl}/coins/markets?vs_currency=usd&ids=${coinId}&order=market_cap_desc&per_page=1&page=1&sparkline=false&price_change_percentage=24h`
      );
      
      if (!response.ok) return null;
      
      const data = await response.json();
      if (!data || data.length === 0) return null;
      
      const coin = data[0];
      const cryptoPrice: CryptoPrice = {
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        price: coin.current_price,
        change24h: coin.price_change_percentage_24h || 0,
        volume24h: coin.total_volume,
        marketCap: coin.market_cap
      };
      
      this.setCache(cacheKey, cryptoPrice);
      return cryptoPrice;
    } catch (error) {
      console.error(`Erro ao buscar preço CoinGecko para ${coinId}:`, error);
      return null;
    }
  }

  // Busca múltiplos preços
  async getMultiplePrices(): Promise<CryptoPrice[]> {
    const prices: CryptoPrice[] = [];
    
    // Principais criptos da Binance
    const binanceSymbols = ['BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'ADA'];
    
    for (const symbol of binanceSymbols) {
      const price = await this.getBinancePrice(symbol);
      if (price) {
        prices.push({
          symbol,
          name: this.getCoinName(symbol),
          price,
          change24h: 0 // Será atualizado com dados do CoinGecko se disponível
        });
      }
    }

    // Complementa com dados do CoinGecko para estatísticas adicionais
    const coingeckoIds = {
      'BTC': 'bitcoin',
      'ETH': 'ethereum',
      'SOL': 'solana',
      'XRP': 'ripple',
      'ADA': 'cardano',
      'DOT': 'polkadot',
      'MATIC': 'matic-network',
      'LINK': 'chainlink',
      'AVAX': 'avalanche-2',
      'UNI': 'uniswap'
    };

    for (const [symbol, id] of Object.entries(coingeckoIds)) {
      const coinData = await this.getCoingeckoPrice(id);
      if (coinData) {
        const existingIndex = prices.findIndex(p => p.symbol === symbol);
        if (existingIndex >= 0) {
          // Atualiza com dados mais completos
          prices[existingIndex] = coinData;
        } else {
          prices.push(coinData);
        }
      }
    }

    return prices;
  }

  // Helper para nomes de moedas
  private getCoinName(symbol: string): string {
    const names: Record<string, string> = {
      'BTC': 'Bitcoin',
      'ETH': 'Ethereum',
      'BNB': 'Binance Coin',
      'SOL': 'Solana',
      'XRP': 'Ripple',
      'ADA': 'Cardano',
      'DOT': 'Polkadot',
      'MATIC': 'Polygon',
      'LINK': 'Chainlink',
      'AVAX': 'Avalanche',
      'UNI': 'Uniswap'
    };
    return names[symbol] || symbol;
  }

  // Cache management
  private getFromCache(key: string): unknown {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > this.cacheTimeout) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  private setCache(key: string, data: unknown): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  // Formata preço para exibição
  formatPrice(price: number): string {
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
  }

  // Formata mudança percentual
  formatChange(change: number): string {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  }
}

export const cryptoPriceService = new CryptoPriceService();
export type { CryptoPrice };