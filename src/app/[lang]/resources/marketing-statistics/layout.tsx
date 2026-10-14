import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing Statistics",
  description: "Key digital marketing statistics and industry benchmarks to inform your strategy.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-marketing-statistics" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-marketing-statistics",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Digital Marketing Statistics",
    description: "Key digital marketing statistics and industry benchmarks to inform your strategy.",
  },
};

export default function MarketingStatisticsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
