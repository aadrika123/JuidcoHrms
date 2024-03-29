/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/hrms",
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:7001/api/:path*", // Proxy to Backend
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
