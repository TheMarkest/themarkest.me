import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Важно: раскомментируйте строку ниже, если сайт опубликован по адресу themarkest.github.io/themarkest.me/
  // Если у вас подключен свой домен (themarkest.me), эту строку нужно закомментировать или удалить.
  basePath: '/themarkest.me',
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'optim.tildacdn.pub',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
