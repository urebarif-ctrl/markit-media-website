import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Bio Generator | Free Tool | Markit Media",
  description:
    "Generate optimised social media bios for LinkedIn, Instagram, Twitter/X, TikTok, and Facebook with character limits, keywords, and CTAs.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
