import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Trends 2025",
  description: "Top digital marketing trends and predictions shaping strategy in 2025.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/marketing-trends-2025" },
  openGraph: {
    title: "Marketing Trends 2025",
    description: "Top digital marketing trends and predictions shaping strategy in 2025.",
  },
};

export default function MarketingTrends2025Layout({ children }: { children: React.ReactNode }) {
  return children;
}
