/** @type {import('next').NextConfig} */
// import nextI18NextConfig from "./next-i18next.config.js"
const nextConfig = {
  // i18n: nextI18NextConfig.i18n,
  output: 'standalone',
  logging: {
    fetches: {
      fullUrl: process.env.DEBUG === 'true',
    },
  },
};

export default nextConfig;
