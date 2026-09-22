import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study-page";

export const metadata: Metadata = {
  title: "Minhaz Couture — Website & Social Media",
  description: "Full-stack digital delivery for Minhaz Couture: website development plus social media content production for a fashion brand.",
  alternates: { canonical: "https://themarkitmedia.com/en/work/minhaz-couture" },
};

export default function MinhazCouturePage() {
  return (
    <CaseStudyPage
      client="Minhaz Couture"
      industry="Fashion"
      services={["Website Development", "Social Media Marketing", "Video Production"]}
      title="Minhaz Couture: From Website to Social, One Cohesive Brand"
      subtitle="Full-stack digital delivery combining a custom website with social media content production for a fashion brand."
      context="Minhaz Couture needed a digital presence that matched the quality of their fashion line. This meant not just a website, but a cohesive digital identity that extended from their web presence to their social media channels. The fashion industry demands visual excellence — every touchpoint needed to reflect the brand's craftsmanship and aesthetic."
      approach="We took a full-stack approach, delivering both the website and social media content as part of a unified brand experience. The website was designed to showcase the collection with clean, editorial-style layouts and fast performance. Social media reels were produced to drive traffic and build brand awareness, with content that felt native to each platform while maintaining brand consistency."
      deliverables={[
        "Custom website designed and developed for the fashion brand",
        "Website showcase highlighting the collection and brand story",
        "Social media reels produced for brand channels",
        "Cohesive visual identity across web and social touchpoints",
        "Platform-optimized content for Instagram and social distribution",
      ]}
      videos={[
        { id: "I07B52LpjYg", title: "Social Media Reel for Minhaz Couture", aspect: "portrait" as const },
        { id: "XlzRKdF0Ssg", title: "Minhaz Couture Baroque Collection", aspect: "portrait" as const },
      ]}
      relatedServices={[
        { title: "Website Development", href: "/services/website-development" },
        { title: "Social Media", href: "/services/social-media" },
        { title: "Branding", href: "/services/branding" },
        { title: "Video Production", href: "/services/video-production" },
      ]}
      readingTime="2 min read"
    />
  );
}
