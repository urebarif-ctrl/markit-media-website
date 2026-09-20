import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hashtag Generator — Get Platform-Optimized Tags by Niche",
  description:
    "Free hashtag generator that creates platform-optimized hashtag sets by niche and content type for maximum reach.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/hashtag-generator" },
  openGraph: {
    title: "Hashtag Generator — Tags by Niche",
    description:
      "Free generator that creates platform-optimized hashtag sets by niche and content type for maximum reach.",
  },
};

export default function HashtagGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
