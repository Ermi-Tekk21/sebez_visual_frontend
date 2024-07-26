/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SEBEZ_ENDPOINT: process.env.SEBEZ_ENDPOINT,
      },
};

export default nextConfig;
