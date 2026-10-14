import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Trends 2026",
  description: "Digital marketing trends and emerging strategies to watch in 2026.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-marketing-trends-2026" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-marketing-trends-2026",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing Trends 2026",
    description: "Digital marketing trends and emerging strategies to watch in 2026.",
  },
};

export default function MarketingTrends2026Layout({ children }: { children: React.ReactNode }) {
  return children;
}
