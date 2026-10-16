import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-content-pillar-planner" },
  title: "Content Pillar Planner | Free Tool",
  description: "Plan your content pillar strategy with topic clusters, supporting content, and a publishing calendar. Build topical authority systematically.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-content-pillar-planner",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Content Pillar Planner | Free Tool",
    description: "Plan your content pillar strategy with topic clusters and a publishing calendar.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
