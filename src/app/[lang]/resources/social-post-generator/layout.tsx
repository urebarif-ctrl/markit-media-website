import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Post Generator",
  description: "Generate platform-specific social media posts for LinkedIn, Instagram, Twitter/X, Facebook, and TikTok. Enter your topic and get ready-to-use templates.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/social-post-generator" },
  openGraph: {
    title: "Social Media Post Generator",
    description: "Create platform-optimized social posts instantly with templates for LinkedIn, Instagram, X, Facebook, and TikTok.",
  },
};

export default function SocialPostGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
