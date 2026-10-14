import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Finder Quiz — Find the Right Marketing Services",
  description: "Answer a few questions about your business and goals to get personalized digital marketing service recommendations from Markit Media.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/finder" },
  openGraph: {
    url: "https://themarkitmedia.com/en/services/finder",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Find the Right Marketing Services",
    description: "Take our quick quiz to get personalized service recommendations for your business.",
  },
};

export default function ServiceFinderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
