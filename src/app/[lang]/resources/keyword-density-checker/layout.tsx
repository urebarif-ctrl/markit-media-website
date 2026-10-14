import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keyword Density Checker — Analyze Word Frequency & Content Length",
  description:
    "Free keyword density checker that analyzes keyword density, word frequency, and content length to keep your SEO on point.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-keyword-density-checker" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-keyword-density-checker",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Keyword Density Checker",
    description:
      "Free checker that analyzes keyword density, word frequency, and content length to keep your SEO on point.",
  },
};

export default function KeywordDensityCheckerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
