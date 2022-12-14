/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_SERVER_URL: process.env.API_SERVER_URL,
  },
  images: {
    domains: [
      'is5-ssl.mzstatic.com',
      'is3-ssl.mzstatic.com',
      'is2-ssl.mzstatic.com',
      'is1-ssl.mzstatic.com',
      'is4-ssl.mzstatic.com',
      'play-lh.googleusercontent.com',
    ],
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
