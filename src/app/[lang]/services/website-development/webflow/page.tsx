import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Webflow Development",
  description: "Design and develop responsive Webflow websites with reusable components, CMS structure, clean content editing, technical SEO foundations, and launch QA.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/website-development/webflow" },
};

export default function Page() {
  return <SubServicePage
    parentTitle="Website Development"
    parentHref="/services/website-development"
    title="Webflow Development"
    description="Design and develop responsive Webflow websites with reusable components, CMS structure, clean content editing, technical SEO foundations, and launch QA."
    details={["Information architecture and responsive page design","Reusable Webflow components, CMS collections, and content templates","Forms, analytics, integrations, redirects, metadata, and technical launch checks","Performance review, editor handoff, documentation, and post-launch support"]}
    benefits={["Visual editing with a structured design system","Suitable for marketing sites that need flexible content ownership","SEO, analytics, and launch requirements are considered during the build"]}
    faq={[
      { q: "What is included in webflow development?", a: "We define the scope around your current setup and goals, then cover the strategy, implementation, quality checks, measurement, and handoff or ongoing optimization required for the engagement." },
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
