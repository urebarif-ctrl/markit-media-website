import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Platform Comparison Guide",
  description: "Compare website platforms and CMS options to find the best fit for your project.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-web-platform-guide" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-web-platform-guide",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Web Platform Comparison Guide",
    description: "Compare website platforms and CMS options to find the best fit for your project.",
  },
};

export default function WebPlatformGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
