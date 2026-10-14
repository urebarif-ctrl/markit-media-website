import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A/B Test Ideas Generator",
  description: "Generate prioritized A/B test ideas for any page type with ICE scoring, sample size estimates, and implementation guidance.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-ab-test-ideas" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-ab-test-ideas",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "A/B Test Ideas Generator",
    description: "Get prioritized A/B test ideas with ICE scoring and sample size calculations.",
  },
};

export default function AbTestIdeasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
