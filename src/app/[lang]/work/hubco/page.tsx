import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study-page";

export const metadata: Metadata = {
  title: "HUBCO — Logo Animation & Brand Video",
  description: "Logo animation and commercial video production for HUBCO, one of Pakistan's leading energy companies.",
  alternates: { canonical: "https://themarkitmedia.com/en/work/hubco" },
};

export default function HubcoPage() {
  return (
    <CaseStudyPage
      client="HUBCO"
      industry="Energy"
      services={["Branding", "Logo Animation", "Video Production"]}
      title="HUBCO: Brand Identity in Motion"
      subtitle="Professional logo animation and commercial video production for a major energy company."
      context="HUBCO required a polished animated logo and professional commercial video content that reflected the scale and sophistication of their operations in the energy sector. The brand needed motion assets that could work across digital platforms, presentations, and video content — maintaining authority while adding modern visual appeal."
      approach="We developed a professional logo animation that brought the HUBCO brand to life with fluid motion design. The animation was designed to work as a standalone brand ident and as an intro/outro for video content. Alongside the logo animation, we produced commercial video content that communicated the brand's presence and capabilities."
      deliverables={[
        "Professional animated logo with fluid motion design",
        "Brand ident suitable for video intros, presentations, and digital use",
        "Commercial video content for brand communication",
        "Multiple format exports for different platforms and use cases",
      ]}
      videos={[]}
      relatedServices={[
        { title: "Branding", href: "/services/branding" },
        { title: "Video Production", href: "/services/video-production" },
      ]}
      readingTime="2 min read"
    />
  );
}
