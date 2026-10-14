import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Heuristic Evaluator | Free Tool",
  description:
    "Evaluate your website against Nielsen's 10 usability heuristics. Score each principle, identify issues, and get improvement recommendations.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/free-tools/free-website-heuristic-evaluator",
  },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-website-heuristic-evaluator",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Website Heuristic Evaluator | Free Tool",
    description:
      "Evaluate your website against Nielsen's 10 usability heuristics.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
