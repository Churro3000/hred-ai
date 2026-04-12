/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['promptfoo'],
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    }
  }
}
module.exports = nextConfig
