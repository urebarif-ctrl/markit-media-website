import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UTM Builder — Tag Campaign URLs for Accurate Attribution",
  description:
    "Build UTM-tagged tracking URLs for campaign attribution across marketing channels with this free tool. Know exactly which campaigns drive results.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/utm-builder" },
  openGraph: {
    title: "Free UTM Campaign URL Builder",
    description:
      "Build UTM-tagged URLs for accurate campaign attribution across every marketing channel. Know exactly what drives results.",
  },
};

export default function UtmBuilderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
