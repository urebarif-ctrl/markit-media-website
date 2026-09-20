import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Headline Analyzer — Score Power Words, Emotion & SEO Impact",
  description:
    "Free headline analyzer that scores your headlines for power words, emotional impact, and SEO effectiveness so every title pulls readers in.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/headline-analyzer" },
  openGraph: {
    title: "Headline Analyzer — Score & Improve",
    description:
      "Free analyzer that scores headlines for power words, emotional impact, and SEO effectiveness so every title pulls readers in.",
  },
};

export default function HeadlineAnalyzerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
