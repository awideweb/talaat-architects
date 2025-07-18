/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.vercel.app',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
  },
  trailingSlash: false,
  // Ensure proper transpilation
  transpilePackages: [],
  // Disable experimental features for more stable Vercel builds
  experimental: {},
  // Configure webpack for better module resolution
  webpack: (config) => {
    // Add explicit alias resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/config': path.resolve(__dirname, 'src/config'),
      '@/data': path.resolve(__dirname, 'src/data'),
    };
    
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  async rewrites() {
    // Only apply rewrites in development
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3001/api/:path*',
        },
      ];
    }
    return [];
  },
};

module.exports = nextConfig;