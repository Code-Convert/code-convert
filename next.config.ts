import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uadltocidtriezcntwxd.supabase.co',
      },
    ],
  },
};

export default nextConfig;
