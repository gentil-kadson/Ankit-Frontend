/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ankit.backend.gentil.dev.br",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
