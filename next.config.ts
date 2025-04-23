import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
 
   turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
