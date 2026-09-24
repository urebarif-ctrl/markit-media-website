import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Squarespace Development",
  description: "Build or improve Squarespace websites for service businesses, portfolios, and content-led brands that want straightforward content management without sacrificing structure and conversion clarity.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/website-development/squarespace" },
};

export default function Page() {
  return <SubServicePage
    parentTitle="Website Development"
    parentHref="/services/website-development"
    title="Squarespace Development"
    description="Build or improve Squarespace websites for service businesses, portfolios, and content-led brands that want straightforward content management without sacrificing structure and conversion clarity."
    details={["Site architecture, page hierarchy, and responsive design","Template customization, content modules, forms, and integrations","On-page SEO, metadata, analytics, redirects, and launch configuration","Content migration, QA, training, and ongoing improvements"]}
    benefits={["Straightforward content management for internal teams","A practical fit for many service and portfolio websites","Conversion and SEO fundamentals are built into the implementation"]}
    faq={[
      { q: "What is included in squarespace development?", a: "We define the scope around your current setup and goals, then cover the strategy, implementation, quality checks, measurement, and handoff or ongoing optimization required for the engagement." },
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
