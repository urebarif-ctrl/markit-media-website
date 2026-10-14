import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Funnel Visualizer — Map Channels & Tactics to Every Stage",
  description:
    "Free funnel visualizer that maps your marketing channels and tactics to each funnel stage with a clear, shareable diagram.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-funnel-visualizer" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-funnel-visualizer",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Funnel Visualizer — Map Your Funnel",
    description:
      "Free visualizer that maps marketing channels and tactics to each funnel stage with a clear, shareable diagram.",
  },
};

export default function FunnelVisualizerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
