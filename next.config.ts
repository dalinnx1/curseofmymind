import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
          config.resolve.alias.mongoose = false;
        }
        return config;
      },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    experimental: {
        nodeMiddleware: true,
    },
};

export default nextConfig;
