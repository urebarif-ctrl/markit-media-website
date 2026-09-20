import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A/B Test Ideas Generator",
  description: "Generate prioritized A/B test ideas for any page type with ICE scoring, sample size estimates, and implementation guidance.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/ab-test-ideas" },
  openGraph: {
    title: "A/B Test Ideas Generator",
    description: "Get prioritized A/B test ideas with ICE scoring and sample size calculations.",
  },
};

export default function AbTestIdeasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
