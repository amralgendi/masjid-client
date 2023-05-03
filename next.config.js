/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DOMAIN: "masjid.net",
    API_BASE: "https://api.masjid.net/saas",
  },
};

module.exports = nextConfig;
