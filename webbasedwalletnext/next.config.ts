import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // PWA only in pro
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

module.exports = withPWA(nextConfig);