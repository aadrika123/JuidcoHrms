/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/hrms",
  env: {
    backend: "https://jharkhandegovernance.com/auth",
  },
};

module.exports = nextConfig;
