/** @type {import('next').NextConfig} */
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
          loader: 'css-loader',
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
