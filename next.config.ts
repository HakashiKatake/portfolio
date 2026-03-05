import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["pixel-retroui", "three"],
  turbopack: {},
};

export default nextConfig;
