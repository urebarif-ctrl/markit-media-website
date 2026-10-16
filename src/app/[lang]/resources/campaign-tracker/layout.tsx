import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-campaign-tracker" },
  title: "Marketing Campaign Tracker | Free Tool",
  description: "Track and manage all your marketing campaigns in one place. Monitor status, budgets, performance, and deadlines across channels.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-campaign-tracker",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing Campaign Tracker | Free Tool",
    description: "Track and manage all your marketing campaigns in one place.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
