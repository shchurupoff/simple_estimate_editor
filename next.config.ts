import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Для статического экспорта
  distDir: "out", // Папка с билдом
  images: {
    unoptimized: true, // Для статического экспорта
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
