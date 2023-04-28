/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true
  },
  env: {
    BACKEND_PUBLIC_URL: process.env.BACKEND_PUBLIC_URL,
  },
  images: {
    domains: [
      'corretora-storage.s3.amazonaws.com', 
      'corretora-storage.s3.sa-east-1.amazonaws.com', 
      'picsum.photos', 
      'localhost',
      's3.amazonaws.com',
      'www.tpsimoveis.com.br',
      's2.glbimg.com',
      'images.unsplash.com',
    ],
  },
}


module.exports = nextConfig
