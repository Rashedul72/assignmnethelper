import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
