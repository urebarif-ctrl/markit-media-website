import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ad Copy Generator — Create High-Converting Ad Text",
  description:
    "Use our free ad copy generator to create compelling ad templates for Google Ads, Facebook, LinkedIn, and email campaigns. Get platform-optimized copy in seconds.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-ad-copy-generator" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-ad-copy-generator",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Free Ad Copy Generator for All Platforms",
    description:
      "Generate high-converting ad copy for Google, Facebook, LinkedIn, and email. Platform-optimized templates ready to launch.",
  },
};

export default function AdCopyGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
