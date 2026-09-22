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
      // Old page slugs
      { source: "/about-us", destination: "/en/about", permanent: true },
      { source: "/:lang/about-us", destination: "/en/about", permanent: true },
      { source: "/contact-us", destination: "/en/contact", permanent: true },
      { source: "/:lang/contact-us", destination: "/en/contact", permanent: true },
      { source: "/our-services", destination: "/en/services", permanent: true },
      { source: "/:lang/our-services", destination: "/en/services", permanent: true },
      { source: "/our-work", destination: "/en/work", permanent: true },
      { source: "/:lang/our-work", destination: "/en/work", permanent: true },
      { source: "/portfolio", destination: "/en/work", permanent: true },
      { source: "/:lang/portfolio", destination: "/en/work", permanent: true },
      { source: "/our-team", destination: "/en/about", permanent: true },
      { source: "/:lang/our-team", destination: "/en/about", permanent: true },
      { source: "/get-quote", destination: "/en/get-a-quote", permanent: true },
      { source: "/:lang/get-quote", destination: "/en/get-a-quote", permanent: true },
      { source: "/request-quote", destination: "/en/get-a-quote", permanent: true },
      { source: "/:lang/request-quote", destination: "/en/get-a-quote", permanent: true },
      { source: "/home", destination: "/en", permanent: true },
      { source: "/team", destination: "/en/about", permanent: true },
      { source: "/sitemap", destination: "/sitemap.xml", permanent: true },

      // Service shorthand URLs
      { source: "/seo-services", destination: "/en/services/seo", permanent: true },
      { source: "/ppc-advertising", destination: "/en/services/paid-advertising", permanent: true },
      { source: "/social-media-marketing", destination: "/en/services/social-media", permanent: true },
      { source: "/web-development", destination: "/en/services/website-development", permanent: true },
      { source: "/web-design", destination: "/en/services/website-development", permanent: true },
      { source: "/digital-marketing", destination: "/en/services/digital-marketing", permanent: true },
      { source: "/google-ads", destination: "/en/services/performance-marketing/google-ads", permanent: true },
      { source: "/facebook-ads", destination: "/en/services/performance-marketing/meta-ads", permanent: true },
      { source: "/branding", destination: "/en/services/branding", permanent: true },
      { source: "/content-marketing", destination: "/en/services/content-marketing", permanent: true },
      { source: "/email-marketing", destination: "/en/services/email-marketing", permanent: true },
      { source: "/video-production", destination: "/en/services/video-production", permanent: true },
      { source: "/ecommerce", destination: "/en/services/ecommerce-marketing", permanent: true },
      { source: "/photography", destination: "/en/services/photography", permanent: true },
      { source: "/public-relations", destination: "/en/services/public-relations", permanent: true },

      // WordPress taxonomy/feed patterns
      { source: "/category/:slug", destination: "/en/blog", permanent: true },
      { source: "/tag/:slug", destination: "/en/blog", permanent: true },
      { source: "/feed", destination: "/en/blog", permanent: true },
      { source: "/feed/:path*", destination: "/en/blog", permanent: true },

      // WordPress case studies/work
      { source: "/case-study/:slug*", destination: "/en/work", permanent: true },
      { source: "/:lang/case-study/:slug*", destination: "/en/work", permanent: true },

      // WordPress infrastructure
      { source: "/wp-content/:path*", destination: "/en", permanent: false },
      { source: "/wp-admin/:path*", destination: "/en", permanent: false },
      { source: "/wp-login.php", destination: "/en", permanent: false },
      { source: "/wp-includes/:path*", destination: "/en", permanent: false },
      { source: "/wp-json/:path*", destination: "/en", permanent: false },
      { source: "/xmlrpc.php", destination: "/en", permanent: false },
      { source: "/wp-cron.php", destination: "/en", permanent: false },
    ];
  },
};

export default nextConfig;
