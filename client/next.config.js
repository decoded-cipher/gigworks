
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compiler: {
    removeConsole: true,
  },
  images: {
    unoptimized: true,
  },
}


module.exports = nextConfig