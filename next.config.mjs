/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    // No ESLint config is set up in this repo yet; type errors still fail the build.
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
