import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ad Copy Analyser | Free Tool | Markit Media",
  description:
    "Analyse your ad copy against best practices for headlines, descriptions, CTAs, and emotional triggers. Get a score and specific improvement suggestions.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
