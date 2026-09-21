import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Competitor Pricing Tracker | Free Tool | Markit Media",
  description:
    "Track competitor pricing, features, and positioning across products and tiers. Compare plans and identify market gaps.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
