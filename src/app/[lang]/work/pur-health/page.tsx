import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study-page";
import { ClientDesignWork } from "@/components/portfolio/portfolio-sections";
import { getClient } from "@/lib/portfolio";
import { caseStudyMetadata } from "@/lib/case-studies";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return caseStudyMetadata("pur-health", lang);
}

export default function PurHealthPage() {
  return (
    <CaseStudyPage
      slug="pur-health"
      client="Pur Health"
      industry="Healthcare / Wellness"
      services={["Website Development", "Social Media Marketing"]}
      title="Pur Health: Digital Presence for Healthcare"
      subtitle="Website development and social media content for a healthcare and wellness brand."
      context="Pur Health needed a professional digital presence that communicated trust, expertise, and accessibility — critical qualities in the healthcare space. The project combined a clean, functional website with social media content that reinforced the brand's wellness messaging."
      approach="We built a website focused on clarity and trust, using clean layouts and straightforward navigation. The social media component extended the brand's reach with content designed to educate and engage their wellness-focused audience."
      deliverables={[
        "Professional website development for healthcare brand",
        "Website and social media showcase reel",
        "Social media content for brand channels",
        "Healthcare-appropriate design and messaging",
      ]}
      videos={[
        { id: "1LDTOTFeYBI", title: "Pur Health Website and Social Media Reel", aspect: "portrait" as const },
      ]}
      relatedServices={[
        { title: "Website Development", href: "/services/website-development" },
        { title: "Social Media", href: "/services/social-media" },
        { title: "Content Marketing", href: "/services/content-marketing" },
      ]}
      readingTime="2 min read"
    >
      <ClientDesignWork client={getClient("pur-health")!} />
    </CaseStudyPage>
  );
}
