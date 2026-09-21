import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaign Debrief Generator | Free Tool | Markit Media",
  description:
    "Generate structured post-mortem debriefs for your marketing campaigns. Compare planned vs actual metrics, document lessons learned, and create actionable next steps.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/resources/campaign-debrief",
  },
  openGraph: {
    title: "Campaign Debrief Generator | Free Tool | Markit Media",
    description:
      "Generate structured post-mortem debriefs for your marketing campaigns. Compare planned vs actual metrics, document lessons learned, and create actionable next steps.",
    url: "https://themarkitmedia.com/en/resources/campaign-debrief",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
