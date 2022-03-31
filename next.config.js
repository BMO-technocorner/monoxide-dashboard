/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const nextConfig = withPWA({
  pwa: {
    dest: "public",
    fallbacks: {
      font: "/fonts/inter.var.woff2",
    },
  },
  reactStrictMode: true,
  images: {
    domains: ["github.com"],
  },
});

module.exports = nextConfig;
