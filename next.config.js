/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        module: false,
      };
    }
    return config;
  },
  // Enable React strict mode
  reactStrictMode: true,
  // Enable static optimization
  swcMinify: true,
  // Configure images
  images: {
    domains: ['localhost'],
  },
  // Configure TypeScript
  typescript: {
    // Enable type checking during build
    ignoreBuildErrors: false,
  },
  // Configure ESLint
  eslint: {
    // Enable ESLint during build
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig; 