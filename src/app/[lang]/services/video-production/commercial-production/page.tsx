import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Commercial Production",
  description:
    "End-to-end commercial video production for brands — from concept development and scripting through filming, post-production, and final delivery across all platforms.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/services/video-production/commercial-production",
  },
  openGraph: {
    title: "Commercial Production",
    description: "End-to-end commercial video production for brands — from concept development and scripting through filming, post-production, and final delivery across a...",
  },
};

export default function CommercialProductionPage() {
  return (
    <SubServicePage
      parentTitle="Video Production"
      parentHref="/services/video-production"
      title="Commercial Production"
      description="Bring your brand story to life with professionally produced commercials built for impact. We handle every stage of production — creative concept, scripting, casting, filming, and post-production — delivering polished video assets ready for broadcast, digital platforms, and social media."
      details={[
        "Creative concept development and storyboarding that aligns with your brand positioning, campaign goals, and target audience.",
        "Pre-production planning including scriptwriting, location scouting, talent casting, shot lists, and production scheduling.",
        "Professional on-set production with experienced crew, cinema-grade equipment, lighting design, and art direction.",
        "Post-production editing, color grading, sound design, and music licensing to deliver broadcast-ready final cuts.",
        "Multi-format delivery optimized for TV, YouTube, social media, website, and in-store display requirements.",
        "Product and lifestyle video shoots tailored for ecommerce, brand campaigns, and promotional content.",
        "Project management from brief to delivery with structured timelines, review rounds, and transparent communication at every stage.",
      ]}
      benefits={[
        "Full concept-to-delivery production under one team",
        "Broadcast-quality output for any platform or screen size",
        "Structured pre-production that keeps projects on schedule and on budget",
        "Multi-format exports ready for TV, digital, and social channels",
        "Consistent brand storytelling across every video asset",
        "Dedicated project management with clear milestones and review cycles",
      ]}
      faq={[
        {
          q: "What does the commercial production process look like?",
          a: "It starts with a creative brief and concept development, followed by pre-production planning (script, storyboard, casting, locations). Then we move into the production shoot, and finally post-production — editing, color grading, sound design, and final delivery in all required formats.",
        },
        {
          q: "How long does a commercial production typically take?",
          a: "Timelines vary based on scope. A straightforward single-day shoot with standard post-production typically takes 3-5 weeks from brief to final delivery. Larger productions with multiple locations or complex post-production may take 6-10 weeks.",
        },
        {
          q: "Can you produce content for both digital and broadcast?",
          a: "Yes. We deliver in whatever formats your distribution requires — broadcast-spec files for TV, optimized exports for YouTube and social platforms, and web-ready versions for your site.",
        },
        {
          q: "Do you handle casting and location scouting?",
          a: "Yes. Our pre-production process covers talent casting, location scouting, wardrobe, props, and all logistics needed before the cameras roll.",
        },
      ]}
    />
  );
}
