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
    backend: "https://aadrikainfomedia.com/auth",
    // backend: "http://localhost:7001",
  },
  images: {
    domains: ["aadrikainfomedia.com", "jharkhandegovernance.com"], // Replace with your image's domain
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
