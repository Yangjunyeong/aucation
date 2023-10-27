/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `https://auction.co.kr/api/v1/:path*`,
        // destination: `https://aucation.co.kr:8001/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
