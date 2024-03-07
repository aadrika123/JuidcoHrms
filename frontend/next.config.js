/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:7001/api/:path*' // Proxy to Backend
        }
      ]
    },
  }

module.exports = nextConfig

