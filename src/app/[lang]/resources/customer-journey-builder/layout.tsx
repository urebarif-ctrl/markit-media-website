import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-customer-journey-builder" },
  title: "Customer Journey Map Builder | Free Tool",
  description:
    "Map your customer journey across awareness, consideration, decision, and retention stages with touchpoints, emotions, and opportunities.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
