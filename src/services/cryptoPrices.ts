// Real-time crypto price service using CoinGecko and Binance APIs

interface CryptoPrice {
  symbol: string;
  name: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap: number;
  volume_24h: number;
  image?: string;
  sparkline?: number[];
}

// CoinGecko API (no key required for basic requests)
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Binance API for price validation
const BINANCE_API = 'https://api.binance.com/api/v3';

// Cache for prices (5 seconds)
let priceCache: {
  data: CryptoPrice[] | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0
};

const CACHE_DURATION = 5000; // 5 seconds

export async function getCryptoPrices(): Promise<CryptoPrice[]> {
  // Check cache
  const now = Date.now();
  if (priceCache.data && (now - priceCache.timestamp) < CACHE_DURATION) {
    return priceCache.data;
  }

  try {
    // Fetch from CoinGecko - top 20 cryptocurrencies
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=24h`,
      {
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from CoinGecko');
    }

    const data = await response.json();
    
    // Map CoinGecko data to our format
    const prices: CryptoPrice[] = data.map((coin: any) => ({
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      current_price: coin.current_price,
      price_change_24h: coin.price_change_24h,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      market_cap: coin.market_cap,
      volume_24h: coin.total_volume,
      image: coin.image,
      sparkline: coin.sparkline_in_7d?.price?.slice(-24) // Last 24 points
    }));

    // Update cache
    priceCache = {
      data: prices,
      timestamp: now
    };

    return prices;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    
    // Return fallback data if API fails
    return getFallbackPrices();
  }
}

// Get specific crypto price from Binance for accuracy
export async function getBinancePrice(symbol: string): Promise<number | null> {
  try {
    const pair = `${symbol.toUpperCase()}USDT`;
    const response = await fetch(`${BINANCE_API}/ticker/price?symbol=${pair}`);
    
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return parseFloat(data.price);
  } catch (error) {
    console.error(`Error fetching Binance price for ${symbol}:`, error);
    return null;
  }
}

// Get price in BRL
export async function getPriceInBRL(priceUSD: number): Promise<number> {
  try {
    // Fetch USD to BRL rate
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    if (!response.ok) {
      // Fallback rate
      return priceUSD * 5.50;
    }
    const data = await response.json();
    return priceUSD * (data.rates.BRL || 5.50);
  } catch {
    // Fallback rate
    return priceUSD * 5.50;
  }
}

// Format price for display
export function formatPrice(price: number, currency: 'USD' | 'BRL' = 'USD'): string {
  const formatter = new Intl.NumberFormat(currency === 'BRL' ? 'pt-BR' : 'en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: price < 1 ? 4 : 2,
    maximumFractionDigits: price < 1 ? 6 : 2,
  });
  
  return formatter.format(price);
}

// Format large numbers (market cap, volume)
export function formatLargeNumber(num: number): string {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
}

// Fallback prices if APIs are down
function getFallbackPrices(): CryptoPrice[] {
  return [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      current_price: 65000,
      price_change_24h: 1200,
      price_change_percentage_24h: 1.88,
      market_cap: 1270000000000,
      volume_24h: 28000000000,
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      current_price: 3500,
      price_change_24h: 85,
      price_change_percentage_24h: 2.49,
      market_cap: 420000000000,
      volume_24h: 15000000000,
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      current_price: 150,
      price_change_24h: 5.5,
      price_change_percentage_24h: 3.81,
      market_cap: 65000000000,
      volume_24h: 2800000000,
    },
    {
      symbol: 'BNB',
      name: 'BNB',
      current_price: 580,
      price_change_24h: -8,
      price_change_percentage_24h: -1.36,
      market_cap: 85000000000,
      volume_24h: 1200000000,
    },
    {
      symbol: 'XRP',
      name: 'XRP',
      current_price: 0.62,
      price_change_24h: 0.02,
      price_change_percentage_24h: 3.33,
      market_cap: 34000000000,
      volume_24h: 1100000000,
    }
  ];
}

// WebSocket for real-time updates (Binance)
export function subscribeToPriceUpdates(symbols: string[], callback: (data: any) => void) {
  const streams = symbols.map(s => `${s.toLowerCase()}usdt@ticker`).join('/');
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${streams}`);
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    callback({
      symbol: data.s.replace('USDT', ''),
      price: parseFloat(data.c),
      change24h: parseFloat(data.p),
      changePercent24h: parseFloat(data.P),
      volume24h: parseFloat(data.v)
    });
  };
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  return () => ws.close();
}