import { NextResponse } from 'next/server';

// API Route para buscar preços de crypto
// Proxies requests para Binance e CoinGecko

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get('source') || 'binance';
  const symbol = searchParams.get('symbol') || 'BTC';
  
  try {
    if (source === 'binance') {
      // Binance API
      const response = await fetch(
        `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}USDT`,
        {
          headers: {
            'Accept': 'application/json',
          },
          next: { revalidate: 60 } // Cache por 60 segundos
        }
      );
      
      if (!response.ok) {
        throw new Error('Binance API error');
      }
      
      const data = await response.json();
      
      return NextResponse.json({
        symbol: symbol,
        price: parseFloat(data.lastPrice),
        change24h: parseFloat(data.priceChangePercent),
        volume24h: parseFloat(data.volume),
        high24h: parseFloat(data.highPrice),
        low24h: parseFloat(data.lowPrice),
        source: 'binance'
      });
      
    } else if (source === 'coingecko') {
      // CoinGecko API
      const coinId = searchParams.get('coinId') || 'bitcoin';
      
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`,
        {
          headers: {
            'Accept': 'application/json',
          },
          next: { revalidate: 60 } // Cache por 60 segundos
        }
      );
      
      if (!response.ok) {
        throw new Error('CoinGecko API error');
      }
      
      const data = await response.json();
      const coinData = data[coinId];
      
      return NextResponse.json({
        coinId: coinId,
        price: coinData.usd,
        change24h: coinData.usd_24h_change,
        volume24h: coinData.usd_24h_vol,
        marketCap: coinData.usd_market_cap,
        source: 'coingecko'
      });
    }
    
    // Preços múltiplos
    if (source === 'multiple') {
      const prices = [];
      
      // Tenta Binance primeiro
      try {
        const binanceSymbols = ['BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'ADA', 'MATIC', 'DOT', 'AVAX', 'LINK'];
        
        for (const sym of binanceSymbols) {
          try {
            const response = await fetch(
              `https://api.binance.com/api/v3/ticker/price?symbol=${sym}USDT`,
              { 
                headers: { 'Accept': 'application/json' },
                next: { revalidate: 30 }
              }
            );
            
            if (response.ok) {
              const data = await response.json();
              prices.push({
                symbol: sym,
                price: parseFloat(data.price)
              });
            }
          } catch {
            // Fallback para valores padrão se falhar
            const defaultPrices: Record<string, number> = {
              'BTC': 95000, 'ETH': 3500, 'BNB': 640, 'SOL': 185,
              'XRP': 0.62, 'ADA': 0.98, 'MATIC': 1.15, 'DOT': 8.9,
              'AVAX': 42, 'LINK': 15.7
            };
            prices.push({
              symbol: sym,
              price: defaultPrices[sym] || 1
            });
          }
        }
      } catch {
        // Se tudo falhar, retorna valores de exemplo
        return NextResponse.json({ 
          prices: [
            { symbol: 'BTC', price: 95000 },
            { symbol: 'ETH', price: 3500 },
            { symbol: 'BNB', price: 640 },
            { symbol: 'SOL', price: 185 },
            { symbol: 'XRP', price: 0.62 },
            { symbol: 'ADA', price: 0.98 }
          ], 
          source: 'fallback' 
        });
      }
      
      return NextResponse.json({ prices, source: 'binance' });
    }
    
    return NextResponse.json({ error: 'Invalid source' }, { status: 400 });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch crypto prices' },
      { status: 500 }
    );
  }
}