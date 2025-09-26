// Next.js Configuration with SEO and Performance Optimizations

module.exports = {
  // Basic configurations
  reactStrictMode: true,
  swcMinify: true,
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    domains: ['bitcoinbrasil.org', 'cdn.bitcoinbrasil.org'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Internationalization
  i18n: {
    locales: ['pt-BR', 'en', 'es', 'fr', 'de', 'it', 'ja'],
    defaultLocale: 'pt-BR',
    localeDetection: true,
  },
  
  // Headers for SEO and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ],
      },
      {
        source: '/public/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/news',
        destination: '/noticias',
        permanent: true,
      },
      {
        source: '/market',
        destination: '/mercado',
        permanent: true,
      },
    ];
  },
  
  // Rewrites for clean URLs
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/feed.xml',
        destination: '/api/feed',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ];
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test(module) {
                return module.size() > 160000 &&
                  /node_modules[\\/]/.test(module.identifier());
              },
              name(module) {
                // Simple hash function without crypto dependency
                const moduleId = module.identifier();
                let hash = 0;
                for (let i = 0; i < moduleId.length; i++) {
                  const char = moduleId.charCodeAt(i);
                  hash = ((hash << 5) - hash) + char;
                  hash = hash & hash; // Convert to 32bit integer
                }
                return 'lib-' + Math.abs(hash).toString(16).substring(0, 8);
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
            },
            shared: {
              name(module, chunks) {
                // Simple hash function without crypto dependency
                const chunkNames = chunks.reduce((acc, chunk) => acc + chunk.name, '');
                let hash = 0;
                for (let i = 0; i < chunkNames.length; i++) {
                  const char = chunkNames.charCodeAt(i);
                  hash = ((hash << 5) - hash) + char;
                  hash = hash & hash; // Convert to 32bit integer
                }
                return 'shared-' + Math.abs(hash).toString(16).substring(0, 8);
              },
              priority: 10,
              minChunks: 2,
              reuseExistingChunk: true,
            },
          },
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
        },
      };
    }
    
    return config;
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://bitcoinbrasil.org',
    NEXT_PUBLIC_GA_ID: 'G-BITCOINBR25',
    NEXT_PUBLIC_GTM_ID: 'GTM-BTCBR25',
  },
  
  // Experimental features for better performance
  experimental: {
    optimizeFonts: true,
    optimizeImages: true,
    scrollRestoration: true,
  },
};