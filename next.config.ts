import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products',
        permanent: true, // 308 редирект
      },
    ];
  },
  images: {
    domains: [
      'i.imgur.com',
      'placeimg.com',
      'images.unsplash.com',
      'api.escuelajs.co',
      'picsum.photos',
      'placehold.co',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placeimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.escuelajs.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
