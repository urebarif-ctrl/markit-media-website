import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Channel Mix Modeller | Free Tool | Markit Media",
  description:
    "Model your marketing channel mix allocation. Set budgets across channels, see projected ROI, and find the optimal spend distribution.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/channel-mix-modeller" },
  openGraph: {
    title: "Marketing Channel Mix Modeller | Free Tool | Markit Media",
    description:
      "Model your marketing channel mix allocation and find the optimal spend distribution.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
