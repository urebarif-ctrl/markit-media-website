import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-campaign-naming-convention" },
  title: "Campaign Naming Convention Template | Free Tool",
  description:
    "Generate consistent campaign naming conventions for Google Ads, Meta Ads, email, and UTM parameters. Keep your marketing data clean and organised.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-campaign-naming-convention",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Campaign Naming Convention Template",
    description: "Free tool to standardise your marketing campaign naming across all platforms.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
