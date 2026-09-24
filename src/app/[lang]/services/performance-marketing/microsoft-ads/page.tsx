import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Microsoft Ads (Bing)",
  description: "Reach high-intent searchers across Microsoft Bing and its search partner ecosystem with campaigns structured around profitable queries, conversion quality, and incremental demand.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/performance-marketing/microsoft-ads" },
};

export default function Page() {
  return <SubServicePage
    parentTitle="Performance Marketing"
    parentHref="/services/performance-marketing"
    title="Microsoft Ads (Bing)"
    description="Reach high-intent searchers across Microsoft Bing and its search partner ecosystem with campaigns structured around profitable queries, conversion quality, and incremental demand."
    details={["Account and campaign architecture for search intent and business priorities","Keyword, search-term, negative-keyword, audience, location, device, and schedule management","Responsive search ads, extensions/assets, landing-page alignment, and offer testing","Conversion tracking, budget pacing, bid strategy reviews, and ongoing optimization"]}
    benefits={["Adds another source of high-intent search demand beyond Google","Campaigns can be built natively or carefully adapted from existing search strategy","Useful for testing incremental reach without mixing every channel into one budget"]}
    faq={[
      { q: "What is included in microsoft ads (bing)?", a: "We define the scope around your current setup and goals, then cover the strategy, implementation, quality checks, measurement, and handoff or ongoing optimization required for the engagement." },
      { q: "Can this work with an existing website or marketing team?", a: "Yes. We can work as the delivery team or alongside internal staff and existing partners, with responsibilities and access defined before implementation." },
      { q: "How do you decide the right approach?", a: "We start with the business objective, current platform or account, available data, technical constraints, audience, and risk. The recommendation follows that assessment rather than forcing every project into the same package." },
    ]}
    blogCategory="Performance Marketing"
    relatedServices={[
      { title: "Performance Marketing", href: "/services/performance-marketing", desc: "Explore the complete service and related specialist options." },
      { title: "Marketing Analytics", href: "/services/marketing-analytics", desc: "Connect implementation with measurement, search visibility, and ongoing improvement." },
    ]}
    portfolio={[{ title: "Selected Work", href: "/work", desc: "Browse relevant digital, website, campaign, and creative work from Markit Media." }]}
  />;
}
