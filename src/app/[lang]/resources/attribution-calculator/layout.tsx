import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Attribution Calculator | Free Marketing Tool | Markit Media",
  description:
    "Compare Last Touch, First Touch, Linear, and Time Decay attribution models side by side. See how credit is distributed across your marketing channels and optimize spend with this free calculator.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/attribution-calculator" },
  openGraph: {
    title: "Marketing Attribution Calculator | Free Marketing Tool | Markit Media",
    description:
      "Compare attribution models side by side to see how credit is distributed across your marketing channels. Free, no sign-up required.",
  },
};

export default function AttributionCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
