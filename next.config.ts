/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ⛔ Ne állítsa le a buildet lint hibák miatt
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
