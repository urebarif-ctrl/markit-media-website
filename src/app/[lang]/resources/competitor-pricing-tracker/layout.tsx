import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-competitor-pricing-tracker" },
  title: "Competitor Pricing Tracker | Free Tool",
  description:
    "Track competitor pricing, features, and positioning across products and tiers. Compare plans and identify market gaps.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
