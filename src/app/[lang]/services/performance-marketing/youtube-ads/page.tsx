import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "YouTube Ads",
  description: "Plan and manage YouTube advertising across awareness, consideration, remarketing, and conversion-oriented video journeys with creative matched to audience intent.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/performance-marketing/youtube-ads" },
};

export default function Page() {
  return <SubServicePage
    parentTitle="Performance Marketing"
    parentHref="/services/performance-marketing"
    title="YouTube Ads"
    description="Plan and manage YouTube advertising across awareness, consideration, remarketing, and conversion-oriented video journeys with creative matched to audience intent."
    details={["Campaign and audience strategy by funnel stage","Video creative requirements, hooks, messaging, formats, and calls to action","Placement, audience, remarketing, and exclusion planning","Measurement, frequency, view quality, conversion analysis, and iterative testing"]}
    benefits={["Connects video storytelling with measurable paid distribution","Supports prospecting and remarketing across different stages of demand","Creative testing creates useful learning for other channels"]}
    faq={[
      { q: "What is included in youtube ads?", a: "We define the scope around your current setup and goals, then cover the strategy, implementation, quality checks, measurement, and handoff or ongoing optimization required for the engagement." },
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
