/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net'], 
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;