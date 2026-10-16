import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-budget-allocator" },
  title: "Marketing Budget Allocator | Free Tool",
  description:
    "Allocate your marketing budget across channels using data-driven templates. Compare allocation strategies and optimize for your goals.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-budget-allocator",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing Budget Allocator | Free Tool",
    description:
      "Allocate marketing budget across channels using templates.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
