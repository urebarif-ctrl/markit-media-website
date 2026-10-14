import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Magnet Idea Generator",
  description: "Generate high-converting lead magnet ideas tailored to your industry, funnel stage, and format.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-lead-magnet-generator" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-lead-magnet-generator",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Lead Magnet Idea Generator",
    description: "Generate high-converting lead magnet ideas tailored to your industry, funnel stage, and format.",
  },
};

export default function LeadMagnetGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
