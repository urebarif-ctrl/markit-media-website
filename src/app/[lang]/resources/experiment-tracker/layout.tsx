import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Experiment Tracker | Free Planning Tool | Markit Media",
  description:
    "Plan, run, and analyze marketing experiments with our free tracker. Score ideas with ICE framework, visualize timelines, track win rates, and build a learnings library.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/experiment-tracker" },
  openGraph: {
    title: "Marketing Experiment Tracker | Free Planning Tool | Markit Media",
    description:
      "Plan, run, and analyze marketing experiments. Score ideas with ICE, visualize timelines, track win rates, and capture learnings.",
  },
};

export default function ExperimentTrackerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
