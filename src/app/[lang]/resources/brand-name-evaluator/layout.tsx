import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Name Evaluator | Free Tool",
  description:
    "Score and evaluate brand names across memorability, pronounceability, uniqueness, and more. Free tool from Markit Media.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-brand-name-evaluator" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-brand-name-evaluator",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Brand Name Evaluator | Free Tool",
    description:
      "Score and evaluate brand names across memorability, pronounceability, uniqueness, and more.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
