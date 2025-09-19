// Script para testar a API de crypto diretamente

async function testBinanceAPI() {
  console.log('Testando Binance API...\n');
  
  const symbols = ['BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'ADA'];
  
  for (const symbol of symbols) {
    try {
      const response = await fetch(
        `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}USDT`
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log(`${symbol}: $${parseFloat(data.lastPrice).toFixed(2)} (${parseFloat(data.priceChangePercent).toFixed(2)}%)`);
      } else {
        console.log(`${symbol}: Erro ao buscar`);
      }
    } catch (error) {
      console.log(`${symbol}: ${error.message}`);
    }
  }
}

testBinanceAPI();