import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-campaign-naming-generator" },
  title: "Campaign Naming Convention Generator | Free Tool",
  description: "Generate consistent campaign naming conventions for Google Ads, Meta Ads, LinkedIn, and more. Keep your ad accounts organised.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-campaign-naming-generator",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Campaign Naming Convention Generator | Free Tool",
    description: "Generate consistent naming conventions for marketing campaigns across platforms.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
