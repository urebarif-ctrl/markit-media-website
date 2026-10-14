import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Small Business Marketing Guide",
  description: "A practical digital marketing guide for small businesses with actionable strategies and tips.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-small-business-guide" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-small-business-guide",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Small Business Marketing Guide",
    description: "A practical digital marketing guide for small businesses with actionable strategies and tips.",
  },
};

export default function SmallBusinessGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
