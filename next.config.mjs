/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      },
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
      },
    ],
    //Kept getting an with this config file so I committed this out and it worked - the avatar_url is not working in profileIcon
    //  reactStrictMode: true,
    //experimental: {
    //  serverActions: true,
    //},
  },
};

export default nextConfig;
