import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study-page";

export const metadata: Metadata = {
  title: "One Homes — Amaya Residences Walkthrough",
  description: "Property walkthrough video production for One Homes' Amaya Residences development.",
  alternates: { canonical: "https://themarkitmedia.com/en/work/one-homes" },
};

export default function OneHomesPage() {
  return (
    <CaseStudyPage
      client="One Homes"
      industry="Real Estate"
      services={["Video Production", "Property Walkthroughs"]}
      title="One Homes: Amaya Residences Walkthrough"
      subtitle="Professional property walkthrough and commercial video production for a premium real estate development."
      context="One Homes required professional video content to showcase their Amaya Residences development. Property walkthroughs are a critical marketing asset in real estate — they allow prospective buyers to experience a property remotely, building interest and qualifying leads before in-person visits."
      approach="We produced a cinematic walkthrough video that captured the space, finishes, and atmosphere of Amaya Residences. The production focused on smooth camera movement, professional lighting, and an editorial style that communicated the premium positioning of the development."
      deliverables={[
        "Exclusive first walkthrough video of Amaya Residences",
        "Commercial video production for brand communication",
        "Professional editing and post-production",
        "Video content formatted for digital distribution",
      ]}
      videos={[
        { id: "v63aw0v8jeo", title: "Exclusive First Walkthrough of Amaya Residences – One Homes" },
        { id: "Lntsa25Xsk4", title: "ONE HOMES FINAL" },
      ]}
      relatedServices={[
        { title: "Video Production", href: "/services/video-production" },
        { title: "Photography", href: "/services/photography" },
      ]}
      readingTime="2 min read"
    />
  );
}
