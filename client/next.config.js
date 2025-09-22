
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compiler: {
    removeConsole: false,
  },
  images: {
    unoptimized: true,
  },
}


module.exports = nextConfig