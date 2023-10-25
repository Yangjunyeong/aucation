/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://192.168.31.161:80/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
