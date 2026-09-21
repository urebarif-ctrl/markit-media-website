import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing OKR Planner | Free Tool | Markit Media",
  description:
    "Free interactive OKR planner for marketing teams. Set objectives, track key results with auto-calculated progress, and run quarterly reviews — no sign-up required.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/okr-planner" },
  openGraph: {
    title: "Marketing OKR Planner | Free Tool | Markit Media",
    description:
      "Plan and track marketing OKRs with auto-calculated progress, scorecard summaries, and export — completely free.",
    url: "https://themarkitmedia.com/en/resources/okr-planner",
    type: "website",
  },
};

export default function OkrPlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
