import type { Metadata } from "next";
import { PortfolioArchivePage } from "@/components/portfolio-archive-page";

export const metadata: Metadata = {
  title: "My Fresh Fruits Branding & Logo Design Portfolio",
  description: "My Fresh Fruits branding and logo design work in the Markit Media portfolio.",
  alternates: { canonical: "https://themarkitmedia.com/en/work/my-fresh-fruits" },
};

export default function MyFreshFruitsWorkPage() {
  return (
    <PortfolioArchivePage
      client="My Fresh Fruits"
      subtitle="Branding and logo design work from the Markit Media portfolio."
      note="My Fresh Fruits is listed in Markit Media's current branding and logo design portfolio. This dedicated project archive gives search visitors a relevant destination instead of sending the old portfolio URL to a generic case studies page."
    />
  );
}
