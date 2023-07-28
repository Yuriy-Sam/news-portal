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
  env: {
    GOOGLE_APP_CLIENT_ID:
      "213969071569-mc25ejj73ievsgbjlo3kcrj02g58gki9.apps.googleusercontent.com",
    GOOGLE_APP_CLIENT_SECRET: "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",
    NEXTAUTH_SECRET: "x5y53RdSbRktZ7mkZtFUZFeMhNFrm+V22cQ6AM6ksk4=",
  },
};

module.exports = nextConfig;
