import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Feedback Survey Builder | Free Tool",
  description:
    "Build professional customer feedback surveys from proven templates. NPS, CSAT, product feedback, and post-purchase surveys with best-practice questions.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/free-tools/free-customer-feedback-survey",
  },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-customer-feedback-survey",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Customer Feedback Survey Builder | Free Tool",
    description:
      "Build customer feedback surveys from proven templates.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
