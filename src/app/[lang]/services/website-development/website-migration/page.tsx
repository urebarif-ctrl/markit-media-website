import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Website Migration",
  description: "Move a website between hosts, CMS platforms, frameworks, or domains with a documented migration plan, content and asset checks, analytics continuity, launch QA, and rollback awareness.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/website-development/website-migration" },
};

export default function Page() {
  return <SubServicePage
    parentTitle="Website Development"
    parentHref="/services/website-development"
    title="Website Migration"
    description="Move a website between hosts, CMS platforms, frameworks, or domains with a documented migration plan, content and asset checks, analytics continuity, launch QA, and rollback awareness."
    details={["Inventory current pages, assets, forms, integrations, analytics, and dependencies","Plan content, database, media, DNS, hosting, CMS, or framework migration requirements","Test the new environment before cutover and validate forms, tracking, performance, and critical journeys","Monitor the launch and resolve broken assets, links, tracking, indexing, or infrastructure issues"]}
    benefits={["Reduces avoidable downtime and launch surprises","Preserves business-critical content and integrations","Creates a controlled cutover instead of an improvised platform switch"]}
    faq={[
      { q: "What is included in website migration?", a: "We define the scope around your current setup and goals, then cover the strategy, implementation, quality checks, measurement, and handoff or ongoing optimization required for the engagement." },
      { q: "Can this work with an existing website or marketing team?", a: "Yes. We can work as the delivery team or alongside internal staff and existing partners, with responsibilities and access defined before implementation." },
      { q: "How do you decide the right approach?", a: "We start with the business objective, current platform or account, available data, technical constraints, audience, and risk. The recommendation follows that assessment rather than forcing every project into the same package." },
    ]}
    blogCategory="Web"
    relatedServices={[
      { title: "Website Development", href: "/services/website-development", desc: "Explore the complete service and related specialist options." },
      { title: "SEO", href: "/services/seo", desc: "Connect implementation with measurement, search visibility, and ongoing improvement." },
    ]}
    portfolio={[{ title: "Selected Work", href: "/work", desc: "Browse relevant digital, website, campaign, and creative work from Markit Media." }]}
  />;
}
