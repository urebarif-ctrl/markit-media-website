import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study-page";

export const metadata: Metadata = {
  title: "American Auto Parts — Video Production",
  description: "Video production work for American Auto Parts, a long-standing client engagement producing professional video content for the automotive aftermarket.",
  alternates: { canonical: "https://themarkitmedia.com/en/work/american-auto-parts" },
};

export default function AmericanAutoPartsPage() {
  return (
    <CaseStudyPage
      client="American Auto Parts"
      industry="Automotive"
      services={["Video Production", "Digital Content"]}
      title="American Auto Parts: Building a Video Presence for Automotive Aftermarket"
      subtitle="A long-standing creative partnership producing professional video content for the automotive parts and accessories market."
      context="American Auto Parts was a well-established name in the automotive aftermarket space. Over the course of our engagement, we produced a body of video work that helped communicate their product range, expertise, and brand story to their target audience. The automotive aftermarket is a visual industry — customers want to see parts, applications, and results before purchasing."
      approach="We worked closely with the American Auto Parts team over an extended period to build their video content library. Each production was tailored to their audience — practical, informative, and visually engaging. The focus was on creating content that showcased products in context, demonstrated applications, and built confidence in the brand."
      deliverables={[
        "Professional video production across multiple shoots and campaigns",
        "Product showcase videos highlighting key automotive parts and accessories",
        "Brand content communicating American Auto Parts' expertise and range",
        "Video content formatted for digital distribution channels",
      ]}
      outcomes={[
        "Long-term creative partnership spanning multiple production cycles",
        "Comprehensive video content library for the brand",
      ]}
      videos={[]}
      relatedServices={[
        { title: "Video Production", href: "/services/video-production" },
        { title: "Digital Marketing", href: "/services/digital-marketing" },
        { title: "Content Marketing", href: "/services/content-marketing" },
      ]}
      readingTime="2 min read"
    />
  );
}
