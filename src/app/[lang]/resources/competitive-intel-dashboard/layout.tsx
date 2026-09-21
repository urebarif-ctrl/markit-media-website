import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Competitive Intelligence Dashboard | Free Tool | Markit Media",
  description:
    "Track up to 5 competitors across SEO, social media, content, ad spend, brand recognition, and innovation. Compare scores, identify gaps, and export insights with our free competitive intel tool.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/competitive-intel-dashboard" },
  openGraph: {
    title: "Competitive Intelligence Dashboard | Free Tool | Markit Media",
    description:
      "Track up to 5 competitors across 6 dimensions. Compare scores side-by-side, identify competitive gaps, and export actionable insights.",
    url: "https://themarkitmedia.com/en/resources/competitive-intel-dashboard",
    type: "website",
  },
};

export default function CompetitiveIntelDashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
