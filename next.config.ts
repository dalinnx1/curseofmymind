import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer, webpack }) => {
    // Mongoose'u istemci tarafında tamamen devre dışı bırak
    if (!isServer) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^mongoose$/,
          contextRegExp: /.*/,
        })
      );
      
      // Alternatif olarak alias ile false ataması
      config.resolve.alias = {
        ...config.resolve.alias,
        mongoose: false,
        'mongoose/dist/browser.umd.js': false
      };
    }

    // Sharp optimizasyonu (resim işleme için)
    config.externals.push('sharp');
    
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
    serverComponentsExternalPackages: ['mongoose'], // Mongoose'u sunucu bileşenlerinde kullan
  },
  // ESM ve CJS uyumluluğu
  transpilePackages: ['mongoose'],
};

export default nextConfig;