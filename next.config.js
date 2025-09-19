/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permite chamadas para APIs externas
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
  
  // Configurações para APIs externas
  async rewrites() {
    return [
      {
        source: '/binance/:path*',
        destination: 'https://api.binance.com/:path*',
      },
      {
        source: '/coingecko/:path*',
        destination: 'https://api.coingecko.com/:path*',
      },
    ];
  },
}

module.exports = nextConfig