/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  output: "standalone",
  images: {
    domains: ['storage.googleapis.com',"lh3.googleusercontent.com"],
  }
};

module.exports = nextConfig;
