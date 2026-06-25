import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const githubPagesBasePath = "/ai-jungle";

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: process.cwd(),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  ...(isProduction
    ? {
        basePath: githubPagesBasePath,
        assetPrefix: `${githubPagesBasePath}/`,
      }
    : {}),
};

export default nextConfig;
