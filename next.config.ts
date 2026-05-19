import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy CMS / old marketing URLs that Google still discovers.
      { source: "/author/:path*", destination: "/", permanent: true },
      { source: "/product-category/:path*", destination: "/", permanent: true },
      { source: "/parking.php", destination: "/", permanent: true },
      { source: "/half-list/", destination: "/", permanent: true },
      { source: "/half-list", destination: "/", permanent: true },
    ];
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-slider",
      "framer-motion",
    ],
  },
};

export default nextConfig;
