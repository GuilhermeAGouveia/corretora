/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  env: {
    BACKEND_PUBLIC_URL: process.env.BACKEND_PUBLIC_URL,
  },
  images: {
    domains: ['corretora-storage.s3.amazonaws.com', 'corretora-storage.s3.sa-east-1.amazonaws.com', 'picsum.photos'],
  },
}


module.exports = nextConfig
