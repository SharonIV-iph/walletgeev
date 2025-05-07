/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                path: false,
                os: false,
                module: false
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
        domains: ['localhost']
    },
    // Configure TypeScript
    typescript: {
        // Enable type checking during build
        ignoreBuildErrors: false
    },
    // Configure ESLint
    eslint: {
        // Enable ESLint during build
        ignoreDuringBuilds: false
    },
    // Configure CORS
    async headers() {
        return [
            {
                // Apply these headers to all routes
                source: '/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Credentials',
                        value: 'true'
                    },
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET,DELETE,PATCH,POST,PUT'
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
                    }
                ]
            }
        ];
    }
};

module.exports = nextConfig;
