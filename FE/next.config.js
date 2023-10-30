/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["cdn.thecolumnist.kr"],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/:path*",
      },
      {
        source: "/api/v1/:path*",
        destination: `https://aucation.co.kr:8001/api/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
