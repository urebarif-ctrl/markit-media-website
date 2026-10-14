import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Voice Generator — Define Your Brand Personality",
  description:
    "Use our free brand voice generator to create detailed voice and tone guidelines for your brand. Get industry-specific recommendations based on your personality and audience.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-brand-voice-generator" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-brand-voice-generator",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Free Brand Voice & Tone Generator",
    description:
      "Generate brand voice guidelines based on your industry and personality. Get tone, vocabulary, and messaging recommendations.",
  },
};

export default function BrandVoiceGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
