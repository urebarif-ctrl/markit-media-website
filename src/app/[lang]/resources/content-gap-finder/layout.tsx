import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-content-gap-finder" },
  title: "Content Gap Finder | Free Tool",
  description: "Identify content gaps in your marketing strategy. Map your existing content against the buyer journey and find opportunities to fill.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-content-gap-finder",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Content Gap Finder | Free Tool",
    description: "Map existing content against the buyer journey and find gaps.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
