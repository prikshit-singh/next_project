/** @type {import('next').NextConfig} */
import Loader from '@/components/Loader';
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
        {
            protocol: 'https',
            hostname: '**',
            port: '',
            pathname: '**',
        },
        {
          protocol: 'http',
          hostname: 'localhost:3000',
          port: '3000',
          pathname: '**',
        },
    ],
},
webpack: (config) => {
    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        'style-loader',
        {
          loader: ['style-loader', 'css-loader'],
          options: {
            modules: true,
          },
        },
      ],
    });

    return config;
  },
  api: {
    externalResolver: true,
  },
  
}
// export const staticResourcesUrl = 'http://localhost:3000/uploads/'

module.exports = nextConfig
