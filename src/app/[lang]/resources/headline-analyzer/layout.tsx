import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Headline Analyzer — Score Power Words, Emotion & SEO Impact",
  description:
    "Free headline analyzer that scores your headlines for power words, emotional impact, and SEO effectiveness so every title pulls readers in.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-headline-analyzer" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-headline-analyzer",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Headline Analyzer — Score & Improve",
    description:
      "Free analyzer that scores headlines for power words, emotional impact, and SEO effectiveness so every title pulls readers in.",
  },
};

export default function HeadlineAnalyzerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
