import type { Metadata } from "next";
import { PortfolioArchivePage } from "@/components/portfolio-archive-page";
import { caseStudyMetadata } from "@/lib/case-studies";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return caseStudyMetadata("my-fresh-fruits", lang);
}

export default function MyFreshFruitsWorkPage() {
  return (
    <PortfolioArchivePage
      slug="my-fresh-fruits"
      coverKey="my-fresh-fruits"
      client="My Fresh Fruits"
      subtitle="Branding and logo design work from the Markit Media portfolio."
      note="My Fresh Fruits is listed in Markit Media's current branding and logo design portfolio. This dedicated project archive gives search visitors a relevant destination instead of sending the old portfolio URL to a generic case studies page."
    />
  );
}
