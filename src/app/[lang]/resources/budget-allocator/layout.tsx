import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Budget Allocator | Free Tool | Markit Media",
  description:
    "Allocate your marketing budget across channels using data-driven templates. Compare allocation strategies and optimize for your goals.",
  openGraph: {
    title: "Marketing Budget Allocator | Free Tool | Markit Media",
    description:
      "Allocate marketing budget across channels using templates.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
