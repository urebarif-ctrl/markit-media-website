import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Technical SEO Services",
  description:
    "Improve site speed, Core Web Vitals, crawlability, and indexation. Markit Media delivers technical SEO that builds a search-engine-friendly foundation for sustainable rankings.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/seo/technical-seo",
  },
};

export default function TechnicalSeoPage() {
  return (
    <SubServicePage
      parentTitle="SEO"
      parentHref="/services/seo"
      title="Technical SEO"
      description="A technically sound website is the foundation of every successful SEO strategy. We identify and resolve the infrastructure issues that prevent search engines from crawling, indexing, and ranking your content effectively."
      details={[
        "Site speed optimization — compress assets, reduce server response times, eliminate render-blocking resources, and implement lazy loading to improve page load performance across devices.",
        "Core Web Vitals improvement — target Largest Contentful Paint, Cumulative Layout Shift, and Interaction to Next Paint to meet Google's page experience benchmarks.",
        "Crawlability and indexation — configure robots.txt, XML sitemaps, canonical tags, and internal linking so search engines discover and index every important page.",
        "Schema markup implementation — add structured data (FAQ, Organization, Service, Breadcrumb, LocalBusiness) to help search engines understand your content and generate rich results.",
        "URL structure and site architecture — design clean, keyword-relevant URL hierarchies and logical navigation that distribute link equity throughout the site.",
        "Mobile optimization — ensure responsive design, touch-friendly elements, and fast mobile page speeds for Google's mobile-first indexing.",
        "HTTPS and security — verify SSL certificates, fix mixed-content warnings, and ensure all pages load securely to meet baseline ranking requirements.",
      ]}
      benefits={[
        "Faster page load times that reduce bounce rates and improve user experience",
        "Higher crawl efficiency so search engines index new and updated pages faster",
        "Improved Core Web Vitals scores that support Google's page experience ranking signals",
        "Rich results and enhanced SERP features through properly implemented schema markup",
        "Stronger internal link architecture that distributes ranking power to key pages",
        "A mobile-first website ready for the majority of search traffic",
      ]}
      faq={[
        {
          q: "What is technical SEO and why does it matter?",
          a: "Technical SEO covers the non-content elements of your website that affect how search engines crawl, render, and index your pages. Without a solid technical foundation, even the best content can struggle to rank because search engines may not be able to access or understand it.",
        },
        {
          q: "How do Core Web Vitals affect rankings?",
          a: "Core Web Vitals are part of Google's page experience signals. Pages that meet the recommended thresholds for loading speed, visual stability, and interactivity can receive a ranking advantage over slower competitors, all else being equal.",
        },
        {
          q: "How long does a technical SEO overhaul take?",
          a: "A typical technical SEO project takes four to eight weeks depending on the size and complexity of the site. Priority fixes like crawl errors and broken redirects are addressed first, followed by performance and structured data improvements.",
        },
        {
          q: "Will technical SEO changes affect my live site?",
          a: "We stage and test all changes before deploying them. Redirect maps, robots.txt updates, and schema additions are validated in a staging environment to prevent disruptions to your existing traffic and rankings.",
        },
      ]}
    />
  );
}
