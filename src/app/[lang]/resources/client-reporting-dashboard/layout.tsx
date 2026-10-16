import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-client-reporting-dashboard" },
  title: "Client Reporting Dashboard Builder | Free Tool",
  description: "Build professional marketing reports for clients. Select KPIs, add channels, include insights and recommendations. Export ready-to-present reports.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-client-reporting-dashboard",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Client Reporting Dashboard Builder | Free Tool",
    description: "Build professional marketing reports for clients.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
