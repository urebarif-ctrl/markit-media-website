import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study-page";

export const metadata: Metadata = {
  title: "NoorShad — Video-First Real Estate Branding",
  description: "How Markit Media built a comprehensive video production suite for NoorShad real estate, including property tours, testimonials, and home buying guides.",
  alternates: { canonical: "https://themarkitmedia.com/en/work/noorshad" },
};

export default function NoorShadPage() {
  return (
    <CaseStudyPage
      client="NoorShad"
      industry="Real Estate"
      services={["Video Production", "Property Tours", "Testimonial Videos", "Content Strategy"]}
      title="NoorShad: Building a Video-First Real Estate Brand"
      subtitle="A multi-video production engagement that gave NoorShad a complete library of property tours, client testimonials, and educational home buying content."
      context="NoorShad needed a strong video presence to stand out in a competitive real estate market. Property buyers increasingly rely on video tours and visual content before scheduling in-person visits. The challenge was creating a cohesive video library that covered everything from individual property walkthroughs to broader brand storytelling — all maintaining a consistent professional standard."
      approach="We developed a comprehensive video production plan covering three content types: cinematic property tours showcasing individual listings, client testimonial videos building trust and social proof, and educational home buying guides positioning NoorShad as a knowledgeable industry resource. Each video was produced with consistent branding, professional editing, and platform-optimized formatting."
      deliverables={[
        "9+ professionally produced videos across property tours, testimonials, and guides",
        "Cinematic property walkthrough videos with professional editing and music",
        "Client testimonial videos capturing authentic buyer experiences",
        "Home buying guide content positioning NoorShad as a trusted resource",
        "Dedicated YouTube playlist organizing all NoorShad content",
        "Video content formatted for social media distribution",
      ]}
      videos={[]}
      relatedServices={[
        { title: "Video Production", href: "/services/video-production" },
        { title: "Social Media", href: "/services/social-media" },
        { title: "Content Marketing", href: "/services/content-marketing" },
      ]}
      readingTime="3 min read"
    />
  );
}
