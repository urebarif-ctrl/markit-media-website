import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CTA Generator — Create High-Converting Button Text & Headlines",
  description:
    "Free CTA generator that creates compelling button text, headlines, and subheadlines tailored to your business type and audience.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/cta-generator" },
  openGraph: {
    title: "CTA Generator — Button Text & Headlines",
    description:
      "Free tool that generates compelling button text, headlines, and subheadlines tailored to your business type and audience.",
  },
};

export default function CtaGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
