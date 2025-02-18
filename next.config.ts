/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true, // Si lo estás usando
  },
  env: {
    MONGO_URI: process.env.MONGO_URI,
  }, 
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, 'react-server-dom-webpack/server.edge'];
    }
    return config;
  }
};

module.exports = nextConfig;
