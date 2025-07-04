import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/memcommercestorage/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
