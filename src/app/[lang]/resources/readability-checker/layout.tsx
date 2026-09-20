import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Readability Checker — Score Your Content for Clarity",
  description:
    "Analyze your content readability using Flesch-Kincaid, Gunning Fog, and other scoring methods with this free tool. Write content your audience actually reads and understands.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/readability-checker" },
  openGraph: {
    title: "Free Content Readability Checker",
    description:
      "Analyze content readability with Flesch-Kincaid, Gunning Fog, and more. Get actionable scores and suggestions to improve clarity.",
  },
};

export default function ReadabilityCheckerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
