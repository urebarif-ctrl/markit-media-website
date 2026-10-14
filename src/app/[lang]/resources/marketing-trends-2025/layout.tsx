import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Trends 2025",
  description: "Top digital marketing trends and predictions shaping strategy in 2025.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-marketing-trends-2025" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-marketing-trends-2025",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing Trends 2025",
    description: "Top digital marketing trends and predictions shaping strategy in 2025.",
  },
};

export default function MarketingTrends2025Layout({ children }: { children: React.ReactNode }) {
  return children;
}
