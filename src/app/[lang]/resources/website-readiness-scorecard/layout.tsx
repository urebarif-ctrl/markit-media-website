import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Readiness Scorecard | Free Assessment Tool | Markit Media",
  description:
    "Score your website across mobile experience, page speed, SEO, security, and accessibility. Get a prioritised action plan to improve performance.",
  openGraph: {
    title: "Website Readiness Scorecard | Markit Media",
    description:
      "Free interactive tool to assess your website readiness across 5 critical dimensions.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
