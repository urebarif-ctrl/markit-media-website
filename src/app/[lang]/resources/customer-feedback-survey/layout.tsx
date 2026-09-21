import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Feedback Survey Builder | Free Tool | Markit Media",
  description:
    "Build professional customer feedback surveys from proven templates. NPS, CSAT, product feedback, and post-purchase surveys with best-practice questions.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/resources/customer-feedback-survey",
  },
  openGraph: {
    title: "Customer Feedback Survey Builder | Free Tool | Markit Media",
    description:
      "Build customer feedback surveys from proven templates.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
