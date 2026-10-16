import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-seo-content-optimizer" },
  title: "SEO Content Optimizer | Free Tool",
  description: "Optimize your content for search engines. Analyze keyword usage, readability, heading structure, meta tags, and internal linking for any piece of content.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-seo-content-optimizer",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "SEO Content Optimizer | Free Tool",
    description: "Analyze keyword usage, readability, heading structure, and more.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
