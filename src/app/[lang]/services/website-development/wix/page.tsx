import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Wix Development Services | Markit Media",
  description:
    "Wix website development, redesign, CMS setup, integrations, SEO foundations and migration support for service businesses and growing brands.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/website-development/wix",
  },
  openGraph: {
    title: "Wix Development Services | Markit Media",
    description:
      "Structured Wix websites, redesigns, CMS setup, integrations and SEO-ready launches for businesses that want simple content ownership.",
  },
};

export default function WixDevelopmentPage() {
  return (
    <SubServicePage
      parentTitle="Website Development"
      parentHref="/services/website-development"
      title="Wix Development"
      description="Build or improve a Wix website with clearer structure, stronger conversion paths and an editing experience your team can actually manage. We handle new builds, redesigns, CMS setup, integrations, analytics, SEO foundations and launch QA."
      details={[
        "Information architecture and page planning around your services, audience and conversion goals.",
        "Responsive Wix Studio or Wix website implementation with reusable sections and consistent visual rules.",
        "CMS collections, forms, booking flows and third-party integrations configured around the way your business operates.",
        "On-page SEO foundations including titles, descriptions, headings, internal links, image alt text and indexation checks.",
        "Analytics and conversion tracking setup for forms, calls, bookings and other meaningful actions.",
        "Website migration or redesign support with URL mapping and direct redirects when existing URLs change.",
      ]}
      benefits={[
        "Straightforward editing for internal teams",
        "Responsive layouts across desktop and mobile",
        "Clearer service and conversion journeys",
        "Search-friendly page structure",
        "Integrated forms, bookings and analytics",
        "Launch QA with redirect and indexation checks",
      ]}
      faq={[
        {
          q: "Do you build websites in Wix Studio?",
          a: "Yes. We can build in Wix Studio or work with an existing Wix setup depending on the current site, design requirements and editing workflow.",
        },
        {
          q: "Can you redesign an existing Wix website without losing SEO?",
          a: "Yes. We review current URLs, metadata, internal links and search-visible pages before redesign work. If URLs need to change, we map them directly to the most relevant final destination instead of creating redirect chains.",
        },
        {
          q: "Can Wix work for a service business?",
          a: "Yes. Wix can be a practical fit for service businesses that need a manageable website, forms, bookings, content editing and standard integrations without a custom application stack.",
        },
      ]}
      blogCategory="Web"
      relatedServices={[
        { title: "SEO", href: "/services/seo", desc: "Connect the website build with organic visibility and technical search foundations." },
        { title: "Shopify", href: "/services/shopify", desc: "For ecommerce businesses that need a dedicated store platform and growth stack." },
      ]}
      portfolio={[
        { title: "Selected Work", href: "/work", desc: "Browse relevant website, digital and brand work from Markit Media." },
      ]}
    />
  );
}
