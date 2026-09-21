import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Calendar Template | Free Tool | Markit Media",
  description: "Plan your social media content with this interactive calendar. Schedule posts, set themes, track progress across platforms.",
  openGraph: {
    title: "Social Media Calendar Template | Free Tool | Markit Media",
    description: "Plan your social media content with an interactive calendar and scheduling tool.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
