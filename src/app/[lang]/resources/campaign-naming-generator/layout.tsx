import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaign Naming Convention Generator | Free Tool | Markit Media",
  description: "Generate consistent campaign naming conventions for Google Ads, Meta Ads, LinkedIn, and more. Keep your ad accounts organised.",
  openGraph: {
    title: "Campaign Naming Convention Generator | Free Tool | Markit Media",
    description: "Generate consistent naming conventions for marketing campaigns across platforms.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
