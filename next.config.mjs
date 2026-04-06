/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.1.132', 'localhost:3000'],

  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: process.env.NODE_ENV === 'development' 
          ? 'http://localhost:5000/api/v1/:path*' 
          : 'https://lumina-backend-8xpn.onrender.com/api/v1/:path*',
      },
    ];
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  images: {
    remotePatterns: [
      { 
        protocol: 'https', 
        hostname: 'lumina-backend-8xpn.onrender.com' 
      },
      { 
        protocol: 'http',
        hostname: 'localhost',
        port: '5000'
      },
      { 
        protocol: 'https', 
        hostname: 'ui-avatars.com' 
      },
      { 
        protocol: 'https', 
        hostname: 'www.gravatar.com' 
      },
      { 
        protocol: 'https', 
        hostname: 'lh3.googleusercontent.com' 
      },
    ],
  },
};

export default nextConfig;