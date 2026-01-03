/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from any domain (WordPress can be anywhere)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },

  // Experimental features
  experimental: {
    // Enable server actions
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
};

export default nextConfig;
