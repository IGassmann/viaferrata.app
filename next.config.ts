import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "46s1kywljfszgglh.public.blob.vercel-storage.com",
        port: "",
        search: "",
      },
    ],
  },
};

export default nextConfig;
