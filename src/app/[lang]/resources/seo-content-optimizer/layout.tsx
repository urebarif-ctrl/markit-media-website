import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Content Optimizer | Free Tool | Markit Media",
  description: "Optimize your content for search engines. Analyze keyword usage, readability, heading structure, meta tags, and internal linking for any piece of content.",
  openGraph: {
    title: "SEO Content Optimizer | Free Tool | Markit Media",
    description: "Analyze keyword usage, readability, heading structure, and more.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
