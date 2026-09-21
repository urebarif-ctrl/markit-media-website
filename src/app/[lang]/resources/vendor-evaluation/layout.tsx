import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Vendor Evaluation Scorecard | Free Tool | Markit Media",
  description:
    "Evaluate and compare up to 5 marketing vendors side by side across 8 weighted categories. Radar chart, strengths and weaknesses analysis, and winner recommendation included.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/vendor-evaluation" },
  openGraph: {
    title: "Marketing Vendor Evaluation Scorecard | Free Tool | Markit Media",
    description:
      "Compare marketing vendors across capabilities, pricing, communication, and more. Free interactive scorecard with radar chart and exportable results.",
    url: "https://themarkitmedia.com/en/resources/vendor-evaluation",
    siteName: "Markit Media",
    type: "website",
  },
};

export default function VendorEvaluationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
