import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-marketing-roi-report" },
  title: "Marketing ROI Report Generator | Free Tool",
  description:
    "Generate a professional marketing ROI report. Input channel spend and revenue data to create a comprehensive performance analysis.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-marketing-roi-report",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing ROI Report Generator | Free Tool",
    description:
      "Generate professional marketing ROI reports with channel-level analysis.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
