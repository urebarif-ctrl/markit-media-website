import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study-page";

export const metadata: Metadata = {
  title: "Elite — Website & Social Media",
  description: "Website showcase and social media reel production for Elite, demonstrating full-stack digital delivery.",
  alternates: { canonical: "https://themarkitmedia.com/en/work/elite" },
};

export default function ElitePage() {
  return (
    <CaseStudyPage
      client="Elite"
      industry="Various"
      services={["Website Development", "Social Media Marketing", "Video Production"]}
      title="Elite: Website Showcase & Social Content"
      subtitle="Website development and social media content production, delivered as a cohesive digital package."
      context="Elite needed both a professional web presence and social media content to establish their digital footprint. The project required delivering assets that worked together — a website that communicated credibility and social content that drove awareness and engagement."
      approach="We built the website with a focus on clean design and strong messaging, then produced social media reels that drove traffic back to the site. Each piece of content was designed to serve a specific role in the customer journey — from awareness-building reels to conversion-focused web pages."
      deliverables={[
        "Custom website development with professional design",
        "Website showcase reel highlighting the build",
        "Social media reels for brand channels",
        "Cohesive visual language across web and social",
      ]}
      videos={[
        { id: "gdYOxjfyUr0", title: "Elite Website Showcase Reel", aspect: "portrait" as const },
        { id: "_UOtCEgQeSg", title: "Elite Social Media Reel", aspect: "portrait" as const },
      ]}
      relatedServices={[
        { title: "Website Development", href: "/services/website-development" },
        { title: "Social Media", href: "/services/social-media" },
        { title: "Video Production", href: "/services/video-production" },
      ]}
      readingTime="2 min read"
    />
  );
}
