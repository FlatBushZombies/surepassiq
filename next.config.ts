/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/course/vid-provisional-prep",
        destination: "/course/driving-theory-hazard-perception",
        permanent: true,
      },
      {
        source: "/learn/vid-provisional-prep",
        destination: "/learn/driving-theory-hazard-perception",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
