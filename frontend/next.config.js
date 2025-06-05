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



       backend: "https://jharkhandegovernance.com/auth",

    // backend: "http://localhost:7001",
    // backend: "https://egov.rsccl.in/auth",
    // backend: "https://aadrikainfomedia.com/auth",
    // backend: "http://localhost:8000",
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

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://aadrikainfomedia.com https://jharkhandegovernance.com;
  font-src 'self';
  connect-src *;
  frame-src *;
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, '').replace(/\s{2,}/g, ' ').trim(),
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
];


module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   basePath: "/hrms",
//   env: {
//     backend: "https://aadrikainfomedia.com/auth",
//   },
// };

// module.exports = nextConfig;
