import type { Metadata } from "next";
import { PortfolioArchivePage } from "@/components/portfolio-archive-page";
import { ClientDesignWork } from "@/components/portfolio/portfolio-sections";
import { getClient } from "@/lib/portfolio";
import { caseStudyMetadata } from "@/lib/case-studies";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return caseStudyMetadata("chefiality", lang);
}

export default function ChefialityWorkPage() {
  return (
    <PortfolioArchivePage
      slug="chefiality"
      coverKey="chefiality"
      client="Chefiality"
      subtitle="Branding and logo design work from the Markit Media portfolio."
      note="Chefiality is listed in Markit Media's current branding and logo design portfolio. The original legacy case study URLs now lead here instead of dropping visitors onto a generic case studies page."
    >
      <ClientDesignWork client={getClient("chefiality")!} />
    </PortfolioArchivePage>
  );
}
