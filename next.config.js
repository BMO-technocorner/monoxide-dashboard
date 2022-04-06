/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const nextConfig = withPWA({
  pwa: {
    disable: process.env.NEXT_PUBLIC_ENV === "development",
    dest: "public",
    fallbacks: {
      font: "/fonts/inter.var.woff2",
    },
    publicExcludes: ["!google*.html"],
    register: true,
    skipWaiting: true,
    swSrc: "service-worker.js",
  },
  reactStrictMode: true,
  images: {
    domains: ["github.com"],
  },
});

module.exports = nextConfig;
