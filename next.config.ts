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
};

export default nextConfig;
