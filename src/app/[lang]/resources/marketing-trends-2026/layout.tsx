import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Trends 2026",
  description: "Digital marketing trends and emerging strategies to watch in 2026.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/marketing-trends-2026" },
  openGraph: {
    title: "Marketing Trends 2026",
    description: "Digital marketing trends and emerging strategies to watch in 2026.",
  },
};

export default function MarketingTrends2026Layout({ children }: { children: React.ReactNode }) {
  return children;
}
