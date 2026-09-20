import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ad Copy Generator — Create High-Converting Ad Text",
  description:
    "Use our free ad copy generator to create compelling ad templates for Google Ads, Facebook, LinkedIn, and email campaigns. Get platform-optimized copy in seconds.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/ad-copy-generator" },
  openGraph: {
    title: "Free Ad Copy Generator for All Platforms",
    description:
      "Generate high-converting ad copy for Google, Facebook, LinkedIn, and email. Platform-optimized templates ready to launch.",
  },
};

export default function AdCopyGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
