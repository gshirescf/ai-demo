import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Enable SWC for faster builds
  swcMinify: true,

  // Configure Webpack optimizations
  webpack: (config, { isServer }) => {
    // Analyze bundle size if needed (uncomment for debugging)
    // const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
    // config.plugins.push(new BundleAnalyzerPlugin());

    // Optimize splitting chunks
    config.optimization.splitChunks = {
      chunks: "all",
      maxSize: 500000, // Ensure no chunk exceeds 500 KB
    };

    // Add any custom Webpack rules here
    return config;
  },

  // Add internationalization support if needed
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  // Output configuration for static export
  output: "export",

  // Asset prefixes (useful if hosting static assets externally)
  assetPrefix: process.env.ASSET_PREFIX || "",

  // Base path if your app is deployed in a subdirectory
  basePath: process.env.BASE_PATH || "",
};

export default nextConfig;

