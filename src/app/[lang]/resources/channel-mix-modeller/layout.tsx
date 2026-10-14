import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Channel Mix Modeller | Free Tool",
  description:
    "Model your marketing channel mix allocation. Set budgets across channels, see projected ROI, and find the optimal spend distribution.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-channel-mix-modeller" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-channel-mix-modeller",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing Channel Mix Modeller | Free Tool",
    description:
      "Model your marketing channel mix allocation and find the optimal spend distribution.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
