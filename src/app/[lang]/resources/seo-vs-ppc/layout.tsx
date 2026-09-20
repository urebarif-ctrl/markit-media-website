import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO vs PPC Comparison Guide",
  description: "Compare SEO and PPC strategies side by side to find the right approach for your business goals.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/seo-vs-ppc" },
  openGraph: {
    title: "SEO vs PPC Comparison Guide",
    description: "Compare SEO and PPC strategies side by side to find the right approach for your business goals.",
  },
};

export default function SeoVsPpcLayout({ children }: { children: React.ReactNode }) {
  return children;
}
