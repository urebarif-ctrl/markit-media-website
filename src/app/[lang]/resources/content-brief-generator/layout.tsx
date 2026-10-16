import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-content-brief-generator" },
  title: "Content Brief Generator | Free Tool",
  description:
    "Create detailed content briefs for writers with target audience, keywords, outline, tone, word count, and competitive references.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
