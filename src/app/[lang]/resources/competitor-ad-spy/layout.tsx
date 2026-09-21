import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Competitor Ad Spy Worksheet | Free Tool | Markit Media",
  description:
    "Document and analyse competitor advertising across platforms. Track messaging, offers, CTAs, and creative strategies in a structured format.",
  openGraph: {
    title: "Competitor Ad Spy Worksheet | Markit Media",
    description:
      "Free worksheet to track and compare competitor advertising strategies across platforms.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
