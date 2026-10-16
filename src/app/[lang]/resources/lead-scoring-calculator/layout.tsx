import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-lead-scoring-calculator" },
  title: "Lead Scoring Calculator | Free Tool",
  description:
    "Build a lead scoring model with demographic, firmographic, and behavioural criteria. Assign weights, test scores, and define qualification thresholds.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
