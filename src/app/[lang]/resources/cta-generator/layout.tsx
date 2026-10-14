import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CTA Generator — Create High-Converting Button Text & Headlines",
  description:
    "Free CTA generator that creates compelling button text, headlines, and subheadlines tailored to your business type and audience.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-cta-generator" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-cta-generator",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "CTA Generator — Button Text & Headlines",
    description:
      "Free tool that generates compelling button text, headlines, and subheadlines tailored to your business type and audience.",
  },
};

export default function CtaGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
