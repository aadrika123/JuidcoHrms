// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   basePath: "/hrms",
//   env: {
//     backend: "https://egov.rsccl.in/auth",
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/hrms",
  env: {
    // backend: "https://aadrikainfomedia.com/auth",
    backend: "http://localhost:8000",
  },
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

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   basePath: "/hrms",
//   env: {
//     backend: "https://aadrikainfomedia.com/auth",
//   },
// };

// module.exports = nextConfig;
