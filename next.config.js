const { withSuperjson } = require("next-superjson");

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["avatars.githubusercontent.com", "cloudflare-ipfs.com"],
  },
};

module.exports = withSuperjson()(nextConfig);
