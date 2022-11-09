/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_SERVER_URL: process.env.API_SERVER_URL,
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
