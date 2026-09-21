import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Voice Consistency Checker | Free Tool | Markit Media",
  description: "Check your content against brand voice guidelines. Define your brand voice attributes and evaluate content for consistency.",
  openGraph: {
    title: "Brand Voice Consistency Checker | Free Tool | Markit Media",
    description: "Evaluate content against your brand voice guidelines for consistency.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
