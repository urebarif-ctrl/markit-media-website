import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Scoring Calculator | Free Tool | Markit Media",
  description:
    "Build a lead scoring model with demographic, firmographic, and behavioural criteria. Assign weights, test scores, and define qualification thresholds.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
