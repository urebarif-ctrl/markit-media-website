import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Magnet Idea Generator",
  description: "Generate high-converting lead magnet ideas tailored to your industry, funnel stage, and format.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/lead-magnet-generator" },
  openGraph: {
    title: "Lead Magnet Idea Generator",
    description: "Generate high-converting lead magnet ideas tailored to your industry, funnel stage, and format.",
  },
};

export default function LeadMagnetGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
