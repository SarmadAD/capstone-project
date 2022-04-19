/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com", "res.cloudinary.com"],
  },
  env: {
    PRESET: process.env.PRESET,
    CLOUDNAME: process.env.CLOUDNAME,
  },
};

module.exports = nextConfig;
