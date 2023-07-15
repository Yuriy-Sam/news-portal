/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localnews8.b-cdn.net",
      },
    ],
  },
};

module.exports = nextConfig;
