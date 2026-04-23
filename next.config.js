/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@react-pdf/renderer'],
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    }
  }
}
module.exports = nextConfig 
