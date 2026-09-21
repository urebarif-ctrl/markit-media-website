import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaign Naming Convention Generator | Free Tool | Markit Media",
  description:
    "Generate consistent campaign naming conventions for Google Ads, Meta Ads, email, and UTM parameters. Keep your marketing data clean and organised.",
  openGraph: {
    title: "Campaign Naming Convention Generator | Markit Media",
    description: "Free tool to standardise your marketing campaign naming across all platforms.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
