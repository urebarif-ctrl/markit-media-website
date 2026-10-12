import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Platform Comparison Guide",
  description: "Compare website platforms and CMS options to find the best fit for your project.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-web-platform-guide" },
  openGraph: {
    title: "Web Platform Comparison Guide",
    description: "Compare website platforms and CMS options to find the best fit for your project.",
  },
};

export default function WebPlatformGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
