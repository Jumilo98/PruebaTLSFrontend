import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
      config.externals = [...(config.externals || []), 'react-server-dom-webpack/server.edge'];
    }
    return config;
  },
};

export default nextConfig;
