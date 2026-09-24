import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "X Ads",
  description: "Run paid campaigns on X when its audience, conversation context, and targeting options support a clear acquisition, awareness, or distribution objective.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/performance-marketing/x-ads" },
};

export default function Page() {
  return <SubServicePage
    parentTitle="Performance Marketing"
    parentHref="/services/performance-marketing"
    title="X Ads"
    description="Run paid campaigns on X when its audience, conversation context, and targeting options support a clear acquisition, awareness, or distribution objective."
    details={["Channel-fit and campaign objective assessment","Audience, geography, placement, and creative planning","Campaign build, pacing, exclusions, and optimization","Reporting against agreed traffic, lead, conversion, or awareness KPIs"]}
    benefits={["Adds channel diversity when audience fit is proven","Useful for timely distribution and interest-led campaigns","Clear measurement criteria before budget is scaled"]}
    faq={[
      { q: "What is included in x ads?", a: "We define the scope around your current setup and goals, then cover the strategy, implementation, quality checks, measurement, and handoff or ongoing optimization required for the engagement." },
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
