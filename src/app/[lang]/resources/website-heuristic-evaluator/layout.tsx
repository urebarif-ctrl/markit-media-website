import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Heuristic Evaluator | Free Tool | Markit Media",
  description:
    "Evaluate your website against Nielsen's 10 usability heuristics. Score each principle, identify issues, and get improvement recommendations.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/resources/website-heuristic-evaluator",
  },
  openGraph: {
    title: "Website Heuristic Evaluator | Free Tool | Markit Media",
    description:
      "Evaluate your website against Nielsen's 10 usability heuristics.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
