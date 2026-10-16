import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-social-content-rater" },
  title: "Social Media Content Rater | Free Tool",
  description:
    "Rate your social media content against best practices for each platform. Get scores on visuals, copy, hashtags, timing, and engagement potential.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
