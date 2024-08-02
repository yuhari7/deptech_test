/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "www.tiffincurry.ca",
      "i0.wp.com",
      "i.pinimg.com",
    ], // Add other domains as needed
  },
};

export default nextConfig;
