/** @type {import('next').NextConfig} */
const path = require('path');

const remotePatterns = [
  {
    protocol: 'https',
    hostname: '*.vercel.app',
  },
  {
    protocol: 'https',
    hostname: 'talaatstudio.com',
  },
  {
    protocol: 'https',
    hostname: '*.talaatstudio.com',
  },
  {
    protocol: 'http',
    hostname: 'localhost',
    port: '3000',
  },
  {
    protocol: 'http',
    hostname: '10.255.255.254',
    port: '3000',
  },
];

// Add production hostname from environment variable if it exists
if (process.env.PROD_IMAGE_HOSTNAME) {
  remotePatterns.push({
    protocol: 'https',
    hostname: process.env.PROD_IMAGE_HOSTNAME,
  });
}

const nextConfig = {
  // Image optimization configuration
  images: {
    remotePatterns,
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  
  // Performance optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Enable gzip compression
  compress: true,
  
  // Ensure proper transpilation
  transpilePackages: [],
  
  // Performance experimental features
  experimental: {
    optimizeCss: process.env.NODE_ENV === 'development', // Enable only in development to avoid production instability
    scrollRestoration: true,
  },
  
  // Configure webpack for better optimization (production only)
  webpack: process.env.NODE_ENV === 'production' ? (config, { isServer }) => {
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

    // Optimize for production
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
            common: {
              name: 'common',
              minChunks: 2,
              priority: 5,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      };
    }
    
    return config;
  } : undefined,
  
  // Headers for better caching and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/projects/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400', // 1 day cache, remove 'immutable'
          },
        ],
      },
    ];
  },
  
  // Disable trailing slash
  trailingSlash: false,
};

module.exports = nextConfig;