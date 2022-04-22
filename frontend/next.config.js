/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  env: {
    BACKEND_PUBLIC_URL: process.env.BACKEND_PUBLIC_URL,
  },
}

module.exports = nextConfig
