import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/yuotube',
        destination: 'https://yuotube.ai',
        permanent: true,
      },
      {
        source: '/standardbitcoin',
        destination: 'https://standardbitcoin.io',
        permanent: true,
      },
      {
        source: '/youtube',
        destination: 'https://yuotube.ai',
        permanent: true,
      },
      {
        source: '/bitcoin',
        destination: 'https://standardbitcoin.io',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['yuotube.ai', 'standardbitcoin.io'],
  },
};

export default nextConfig;
