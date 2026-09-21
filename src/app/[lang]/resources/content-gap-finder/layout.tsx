import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Gap Finder | Free Tool | Markit Media",
  description: "Identify content gaps in your marketing strategy. Map your existing content against the buyer journey and find opportunities to fill.",
  openGraph: {
    title: "Content Gap Finder | Free Tool | Markit Media",
    description: "Map existing content against the buyer journey and find gaps.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
