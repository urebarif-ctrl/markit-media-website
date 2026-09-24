import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Pinterest Ads",
  description: "Use Pinterest paid media for visually led discovery, product consideration, and demand capture where the platform fits the audience and buying journey.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/performance-marketing/pinterest-ads" },
};

export default function Page() {
  return <SubServicePage
    parentTitle="Performance Marketing"
    parentHref="/services/performance-marketing"
    title="Pinterest Ads"
    description="Use Pinterest paid media for visually led discovery, product consideration, and demand capture where the platform fits the audience and buying journey."
    details={["Campaign objective and audience planning","Creative and Pin format recommendations","Catalog or landing-page alignment where relevant","Budget pacing, conversion measurement, and creative iteration"]}
    benefits={["Strong visual context for discovery-led categories","Useful for testing earlier-stage consideration alongside search and social","Campaigns remain tied to business goals rather than vanity engagement"]}
    faq={[
      { q: "What is included in pinterest ads?", a: "We define the scope around your current setup and goals, then cover the strategy, implementation, quality checks, measurement, and handoff or ongoing optimization required for the engagement." },
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
