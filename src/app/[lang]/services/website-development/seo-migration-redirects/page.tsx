import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "SEO Migration & Redirect Services",
  description: "Protect discoverability during redesigns, URL changes, platform migrations, domain moves, and content consolidation with URL mapping, permanent redirects, canonical checks, internal-link updates, sitemaps, and post-launch monitoring.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/website-development/seo-migration-redirects" },
};

export default function Page() {
  return <SubServicePage
    parentTitle="Website Development"
    parentHref="/services/website-development"
    title="SEO Migration & Redirect Services"
    description="Protect discoverability during redesigns, URL changes, platform migrations, domain moves, and content consolidation with URL mapping, permanent redirects, canonical checks, internal-link updates, sitemaps, and post-launch monitoring."
    details={["Crawl and inventory important existing URLs, backlinks, templates, metadata, and indexable content","Map old URLs to the most relevant new destinations and define server-side permanent redirect rules","Update internal links, canonicals, hreflang where applicable, robots directives, and XML sitemaps","Validate redirects and crawlability after launch, then monitor Search Console and analytics for migration issues"]}
    benefits={["Reduces the risk of losing valuable URLs during a redesign or platform move","Avoids unnecessary redirect chains and irrelevant homepage redirects","Aligns the technical launch with documented search-engine migration practices"]}
    faq={[
      { q: "What is included in seo migration & redirect services?", a: "We define the scope around your current setup and goals, then cover the strategy, implementation, quality checks, measurement, and handoff or ongoing optimization required for the engagement." },
      { q: "Can this work with an existing website or marketing team?", a: "Yes. We can work as the delivery team or alongside internal staff and existing partners, with responsibilities and access defined before implementation." },
      { q: "How do you decide the right approach?", a: "We start with the business objective, current platform or account, available data, technical constraints, audience, and risk. The recommendation follows that assessment rather than forcing every project into the same package." },
    ]}
    blogCategory="SEO"
    relatedServices={[
      { title: "Website Development", href: "/services/website-development", desc: "Explore the complete service and related specialist options." },
      { title: "SEO", href: "/services/seo", desc: "Connect implementation with measurement, search visibility, and ongoing improvement." },
    ]}
    portfolio={[{ title: "Selected Work", href: "/work", desc: "Browse relevant digital, website, campaign, and creative work from Markit Media." }]}
  />;
}
