/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ko'],
    defaultLocale: 'ko',
  },
  images: {
    domains: ['www.notion.so', 'lh5.googleusercontent.com', 's3-us-west-2.amazonaws.com'],
  },
  async headers() {
    return [
      {
        source: '/about',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=60, stale-while-revalidate=119',
          },
        ],
      },
    ];
  },
};
 
module.exports = nextConfig;