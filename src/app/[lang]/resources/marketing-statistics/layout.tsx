import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing Statistics",
  description: "Key digital marketing statistics and industry benchmarks to inform your strategy.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/marketing-statistics" },
  openGraph: {
    title: "Digital Marketing Statistics",
    description: "Key digital marketing statistics and industry benchmarks to inform your strategy.",
  },
};

export default function MarketingStatisticsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
