import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ad Budget Pacing Calculator | Free Tool | Markit Media",
  description: "Track your advertising budget pacing across campaigns. Monitor spend rate, forecast end-of-month spend, and identify over/under-pacing campaigns.",
  openGraph: {
    title: "Ad Budget Pacing Calculator | Free Tool | Markit Media",
    description: "Track ad budget pacing and forecast end-of-month spend across campaigns.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
