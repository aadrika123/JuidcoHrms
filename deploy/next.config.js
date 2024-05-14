/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/hrms",
  env: {
    backend: "https://egov.rsccl.in/auth",
  },
};

module.exports = nextConfig;
