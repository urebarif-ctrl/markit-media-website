import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Audit Scorecard | Free Tool | Markit Media",
  description: "Score your marketing across 8 categories. Identify strengths, weaknesses, and priority improvements with a comprehensive audit scorecard.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/marketing-audit-scorecard" },
  openGraph: {
    title: "Marketing Audit Scorecard | Free Tool | Markit Media",
    description: "Score your marketing across 8 categories and identify priority improvements.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
