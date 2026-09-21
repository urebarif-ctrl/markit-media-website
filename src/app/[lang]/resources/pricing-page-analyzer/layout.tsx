import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Page Analyser | Free Conversion Tool | Markit Media",
  description:
    "Analyse your pricing page against proven conversion best practices. Get a score and actionable recommendations to improve your pricing page performance.",
  openGraph: {
    title: "Pricing Page Analyser | Markit Media",
    description: "Free tool to analyse and improve your pricing page for better conversions.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
