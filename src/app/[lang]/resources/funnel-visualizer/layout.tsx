import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Funnel Visualizer — Map Channels & Tactics to Every Stage",
  description:
    "Free funnel visualizer that maps your marketing channels and tactics to each funnel stage with a clear, shareable diagram.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/funnel-visualizer" },
  openGraph: {
    title: "Funnel Visualizer — Map Your Funnel",
    description:
      "Free visualizer that maps marketing channels and tactics to each funnel stage with a clear, shareable diagram.",
  },
};

export default function FunnelVisualizerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
