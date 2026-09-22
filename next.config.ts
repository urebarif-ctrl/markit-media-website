import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000,
  },
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://www.googletagmanager.com https://i.ytimg.com https://img.youtube.com",
      "font-src 'self'",
      "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com",
      "frame-src https://www.googletagmanager.com https://www.youtube.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");

    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      { key: "X-DNS-Prefetch-Control", value: "on" },
      { key: "Content-Security-Policy", value: csp },
    ];
    return [
      { source: "/(.*)", headers: securityHeaders },
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/fonts/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/ar/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/ur/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ];
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/en/about", permanent: true },
      { source: "/contact-us", destination: "/en/contact", permanent: true },
      { source: "/our-services", destination: "/en/services", permanent: true },
      { source: "/our-work", destination: "/en/work", permanent: true },
      { source: "/portfolio", destination: "/en/work", permanent: true },
      { source: "/our-team", destination: "/en/about", permanent: true },
      { source: "/get-quote", destination: "/en/get-a-quote", permanent: true },
      { source: "/request-quote", destination: "/en/get-a-quote", permanent: true },
      { source: "/case-study/:slug*", destination: "/en/work", permanent: true },
      { source: "/wp-content/:path*", destination: "/en", permanent: false },
      { source: "/wp-admin/:path*", destination: "/en", permanent: false },
      { source: "/wp-login.php", destination: "/en", permanent: false },
    ];
  },
};

export default nextConfig;
