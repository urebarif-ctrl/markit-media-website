import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Voice Generator — Define Your Brand Personality",
  description:
    "Use our free brand voice generator to create detailed voice and tone guidelines for your brand. Get industry-specific recommendations based on your personality and audience.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/brand-voice-generator" },
  openGraph: {
    title: "Free Brand Voice & Tone Generator",
    description:
      "Generate brand voice guidelines based on your industry and personality. Get tone, vocabulary, and messaging recommendations.",
  },
};

export default function BrandVoiceGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
