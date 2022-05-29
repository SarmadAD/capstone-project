/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const nextConfig = withPWA({
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com", "res.cloudinary.com", "lh3.googleusercontent.com"],
  },
  env: {
    PRESET: process.env.PRESET,
    CLOUDNAME: process.env.CLOUDNAME,
  },
  pwa:{
    dest:"public",
    register: true,
    skipWaiting:true,
    disable:process.env.NODE_ENV === 'development'
  }
})

module.exports = nextConfig;
