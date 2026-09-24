import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study-page";

export const metadata: Metadata = {
  title: "MeezoTech — Technology Branding & Motion Design",
  description: "MeezoTech branding and motion design work by Markit Media, including animated logo and technology-focused brand presentation.",
  alternates: { canonical: "https://themarkitmedia.com/en/work/meezotech" },
};

export default function MeezoTechPage() {
  return <CaseStudyPage
    client="MeezoTech"
    industry="Technology"
    services={["Branding","Logo Animation","Motion Design"]}
    title="MeezoTech: Technology Branding Brought to Life Through Motion"
    subtitle="A technology-focused identity presentation using logo animation and motion design to give the brand a more dynamic digital presence."
    context="MeezoTech is represented in Markit Media’s branding and logo-animation portfolio. The work focuses on presenting the technology brand through a clean identity and motion-led treatment suitable for digital channels."
    approach="We translated the identity into a concise animated brand asset, using motion to add energy while keeping the presentation clear and professional."
    deliverables={["Animated logo treatment","Motion-design presentation","Digital-ready brand asset"]}
    videos={[{id:"OK4E1x-e6m8",title:"MeezoTech logo animation and showreel"}]}
    relatedServices={[{title:"Branding",href:"/services/branding"},{title:"Motion Design",href:"/services/video-production/motion-design"},{title:"Video Production",href:"/services/video-production"}]}
    readingTime="2 min read"
  />;
}
