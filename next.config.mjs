/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SEBEZ_ENDPOINT: process.env.SEBEZ_ENDPOINT,
  },
  images: {
    domains: ['files.edgestore.dev'],
  },
};

export default nextConfig;
