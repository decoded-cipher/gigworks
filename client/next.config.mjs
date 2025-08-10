
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
            },
            // Add proper content-type headers for better metadata handling
            {
              key: 'Content-Type',
              value: 'text/html; charset=utf-8',
            }
          ],
        },
        // Specific headers for business profile pages
        {
          source: '/:id*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=3600, s-maxage=3600',
            },
            {
              key: 'X-Robots-Tag',
              value: 'index, follow',
            }
          ],
        }
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
    },
    // Ensure proper image optimization for social media
    images: {
      domains: ['gigwork.co.in'],
      formats: ['image/webp', 'image/avif'],
    }
}
  
export default nextConfig  
