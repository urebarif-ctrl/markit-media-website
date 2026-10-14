import type { Metadata } from "next";
import { PortfolioArchivePage } from "@/components/portfolio-archive-page";

export const metadata: Metadata = { openGraph:{url:"https://themarkitmedia.com/en/work/chefiality",title:"Chefiality Branding & Logo Design Portfolio",description:"Chefiality branding and logo design work in the Markit Media portfolio.",siteName:"Markit Media",images:[{url:"/images/branding/og-image.png",width:1200,height:630,alt:"Markit Media — Full-Stack Digital Marketing Agency"}]},
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
