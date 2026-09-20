import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Proof Guide — Build Trust That Converts Visitors",
  description:
    "Use this free interactive guide to implement social proof elements based on your business type and existing assets. Testimonials, reviews, case studies, and more.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/social-proof-guide" },
  openGraph: {
    title: "Free Social Proof Implementation Guide",
    description:
      "Interactive guide to adding social proof that converts. Get tailored recommendations for testimonials, reviews, and trust signals.",
  },
};

export default function SocialProofGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
