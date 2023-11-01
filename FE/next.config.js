/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.thecolumnist.kr",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.newspenguin.com",
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
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
