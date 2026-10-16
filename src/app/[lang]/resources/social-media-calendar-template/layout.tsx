import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-social-media-calendar-template" },
  title: "Social Media Calendar Template | Free Tool",
  description: "Plan your social media content with this interactive calendar. Schedule posts, set themes, track progress across platforms.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-social-media-calendar-template",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Social Media Calendar Template | Free Tool",
    description: "Plan your social media content with an interactive calendar and scheduling tool.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
