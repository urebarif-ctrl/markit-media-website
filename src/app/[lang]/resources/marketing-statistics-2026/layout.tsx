import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Statistics 2026",
  description: "Essential digital marketing statistics and benchmarks for 2026 planning and strategy.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-marketing-statistics-2026" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-marketing-statistics-2026",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing Statistics 2026",
    description: "Essential digital marketing statistics and benchmarks for 2026 planning and strategy.",
  },
};

export default function MarketingStatistics2026Layout({ children }: { children: React.ReactNode }) {
  return children;
}
