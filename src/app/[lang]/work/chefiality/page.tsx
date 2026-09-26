import type { Metadata } from "next";
import { PortfolioArchivePage } from "@/components/portfolio-archive-page";

export const metadata: Metadata = {
  title: "Chefiality Branding & Logo Design Portfolio",
  description: "Chefiality branding and logo design work in the Markit Media portfolio.",
  alternates: { canonical: "https://themarkitmedia.com/en/work/chefiality" },
};

export default function ChefialityWorkPage() {
  return (
    <PortfolioArchivePage
      client="Chefiality"
      subtitle="Branding and logo design work from the Markit Media portfolio."
      note="Chefiality is listed in Markit Media's current branding and logo design portfolio. The original legacy case study URLs now lead here instead of dropping visitors onto a generic case studies page."
    />
  );
}
