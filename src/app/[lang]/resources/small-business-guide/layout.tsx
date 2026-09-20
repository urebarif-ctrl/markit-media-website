import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Small Business Marketing Guide",
  description: "A practical digital marketing guide for small businesses with actionable strategies and tips.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/small-business-guide" },
  openGraph: {
    title: "Small Business Marketing Guide",
    description: "A practical digital marketing guide for small businesses with actionable strategies and tips.",
  },
};

export default function SmallBusinessGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
