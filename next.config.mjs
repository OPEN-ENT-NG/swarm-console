/** @type {import('next').NextConfig} */
// import nextI18NextConfig from "./next-i18next.config.js"
const nextConfig = {
  transpilePackages: ['@cgi-learning-hub'],
  output: 'standalone',
  logging: {
    fetches: {
      fullUrl: process.env.DEBUG === 'true',
    },
  },
};

export default nextConfig;
