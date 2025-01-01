
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}


/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
      runtime: 'edge'
    },
    reactStrictMode: true,
    swcMinify: true,
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
            {
              key: 'Referrer-Policy',
              value: 'same-origin',
            }
          ],
        },
      ]
    },
    // async redirects() {
    //   return [
    //     {
    //       source: '/home',
    //       destination: '/',
    //       permanent: true
    //     }
    //   ]
    // },
    i18n: {
        locales: ['en'],
        defaultLocale: 'en',
    },
    webpack: (config, { isServer }) => {
      if (isServer) {
        config.module.rules.push({
          test: /\.xml$/,
          use: 'raw-loader',
        })
      }
      return config
    }
}
  
export default nextConfig  
