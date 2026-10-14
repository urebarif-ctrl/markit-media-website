import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hashtag Generator — Get Platform-Optimized Tags by Niche",
  description:
    "Free hashtag generator that creates platform-optimized hashtag sets by niche and content type for maximum reach.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-hashtag-generator" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-hashtag-generator",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Hashtag Generator — Tags by Niche",
    description:
      "Free generator that creates platform-optimized hashtag sets by niche and content type for maximum reach.",
  },
};

export default function HashtagGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
