import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-competitor-ad-spy" },
  title: "Competitor Ad Spy Worksheet | Free Tool",
  description:
    "Document and analyse competitor advertising across platforms. Track messaging, offers, CTAs, and creative strategies in a structured format.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-competitor-ad-spy",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Competitor Ad Spy Worksheet",
    description:
      "Free worksheet to track and compare competitor advertising strategies across platforms.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
