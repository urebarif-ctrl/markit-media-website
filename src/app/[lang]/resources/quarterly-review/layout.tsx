import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Quarterly Review Template | Free Tool | Markit Media",
  description:
    "Build structured quarterly marketing reviews with channel performance tracking, goal progress, budget variance analysis, and auto-generated scorecards. Free interactive template.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/resources/quarterly-review",
  },
  openGraph: {
    title: "Marketing Quarterly Review Template | Free Tool | Markit Media",
    description:
      "Build structured quarterly marketing reviews with channel performance tracking, goal progress, budget variance analysis, and auto-generated scorecards. Free interactive template.",
    url: "https://themarkitmedia.com/en/resources/quarterly-review",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
