import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 85, 90, 95],
    remotePatterns: [],
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;
