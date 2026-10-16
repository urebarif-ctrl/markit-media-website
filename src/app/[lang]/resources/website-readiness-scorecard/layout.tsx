import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-website-readiness-scorecard" },
  title: "Website Readiness Scorecard | Free Assessment Tool",
  description:
    "Score your website across mobile experience, page speed, SEO, security, and accessibility. Get a prioritised action plan to improve performance.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-website-readiness-scorecard",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Website Readiness Scorecard",
    description:
      "Free interactive tool to assess your website readiness across 5 critical dimensions.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
