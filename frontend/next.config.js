/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org"],
  },
  rewrites() {
    return [
      {
        source: "/api/movielists/:path*",
        destination: "http://localhost:3001/api/movielists/:path*", // Proxy to Backend
      },
      {
        source: "/api/movies/:path*",
        destination: "http://localhost:3001/api/movies/:path*", // Proxy to Backend
      },
    ];
  }
}

module.exports = nextConfig
