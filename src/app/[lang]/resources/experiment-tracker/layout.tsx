import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Experiment Tracker | Free Planning Tool",
  description:
    "Plan, run, and analyze marketing experiments with our free tracker. Score ideas with ICE framework, visualize timelines, track win rates, and build a learnings library.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-experiment-tracker" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-experiment-tracker",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing Experiment Tracker | Free Planning Tool",
    description:
      "Plan, run, and analyze marketing experiments. Score ideas with ICE, visualize timelines, track win rates, and capture learnings.",
  },
};

export default function ExperimentTrackerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
