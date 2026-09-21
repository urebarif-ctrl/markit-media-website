import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Name Evaluator | Free Tool | Markit Media",
  description:
    "Score and evaluate brand names across memorability, pronounceability, uniqueness, and more. Free tool from Markit Media.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/brand-name-evaluator" },
  openGraph: {
    title: "Brand Name Evaluator | Free Tool | Markit Media",
    description:
      "Score and evaluate brand names across memorability, pronounceability, uniqueness, and more.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
