import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Manager CRM has legacy Prisma resolver typings; public site types are validated separately
    ignoreBuildErrors: true,
  },
  // Helps Next.js file tracing on Windows (non-C: drives / FAT32 volumes)
  outputFileTracingRoot: __dirname,
  // FAT/exFAT USB drives: readlink() on regular files throws EISDIR on Windows
  webpack: (config) => {
    config.resolve.symlinks = false;
    config.cache = { type: "memory" };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Avoid long hangs when external images are slow or unavailable
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
