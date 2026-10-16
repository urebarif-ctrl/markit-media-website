import type { Metadata } from "next";
import { ClientCaseStudy } from "@/components/portfolio/portfolio-sections";
import { getClient } from "@/lib/portfolio";

export const metadata: Metadata = { openGraph:{url:"https://themarkitmedia.com/en/work/chefiality",title:"Chefiality Branding & Logo Design Portfolio",description:"Chefiality branding and logo design work in the Markit Media portfolio.",siteName:"Markit Media",images:[{url:"/images/branding/og-image.png",width:1200,height:630,alt:"Markit Media — Full-Stack Digital Marketing Agency"}]},
  title: "Chefiality Branding & Logo Design Portfolio",
  description: "Chefiality branding and logo design work in the Markit Media portfolio.",
  alternates: { canonical: "https://themarkitmedia.com/en/work/chefiality" },
};

export default async function ChefialityWorkPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = ["en", "ar", "ur"].includes(lang) ? lang : "en";
  return <ClientCaseStudy client={getClient("chefiality")!} locale={locale} />;
}
