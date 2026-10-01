import type { NextConfig } from "next";

// Fully static: `next build` writes plain HTML/CSS/JS to `out/`.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
