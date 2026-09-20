import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Graph Preview Tool — See How Your Links Look When Shared",
  description:
    "Preview how your links appear on Facebook, Twitter/X, and LinkedIn before sharing. Free tool to optimize Open Graph tags and maximize social media engagement.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/og-preview" },
  openGraph: {
    title: "Free Open Graph Preview Tool",
    description:
      "Preview how your links look when shared on Facebook, Twitter/X, and LinkedIn. Optimize Open Graph tags for maximum social engagement.",
  },
};

export default function OgPreviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
