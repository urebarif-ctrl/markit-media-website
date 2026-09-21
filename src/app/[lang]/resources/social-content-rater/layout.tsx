import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Content Rater | Free Tool | Markit Media",
  description:
    "Rate your social media content against best practices for each platform. Get scores on visuals, copy, hashtags, timing, and engagement potential.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
