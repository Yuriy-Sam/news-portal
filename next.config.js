/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localnews8.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  env: {
    GOOGLE_APP_CLIENT_ID:
      "213969071569-mc25ejj73ievsgbjlo3kcrj02g58gki9.apps.googleusercontent.com",
    GOOGLE_APP_CLIENT_SECRET: "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",
    NEXTAUTH_SECRET: "x5y53RdSbRktZ7mkZtFUZFeMhNFrm+V22cQ6AM6ksk4=",
    MONGODB_URI:
      "mongodb+srv://yuriyfrontend:avVdnD7r35bnQkMS@cluster0.bgc5jde.mongodb.net/",
    CLOUD_NAME: "dlvlup8dc",
    CLOUD_API_KEY: "492858671454362",
    CLOUD_API_SECRET: "Kwj68bzWCPm6MwDb0g1dS3v0-C8",

    // GOOGLE_ANALYTICS_ID: "",
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
