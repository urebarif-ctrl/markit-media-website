import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";
import { ServiceCaseStudies } from "@/components/service-case-studies";

export const metadata: Metadata = {
  title: "Wix Website Development Services | Markit Media",
  description:
    "Wix website development, Wix Studio builds and redesigns with CMS setup, integrations and SEO foundations. Request a tailored quote from Markit Media.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/website-development/wix",
  },
  openGraph: {
    url: "https://themarkitmedia.com/en/services/website-development/wix",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Wix Website Development Services | Markit Media",
    description:
      "Wix website development, Wix Studio builds and redesigns with CMS setup, integrations and SEO foundations. Request a tailored quote from Markit Media.",
  },
};

export default function WixDevelopmentPage() {
  return (
    <SubServicePage
      platforms={[{"name":"Wix"},{"name":"Google Analytics","note":"GA4"},{"name":"Google Tag Manager"},{"name":"Canva"},{"name":"Stripe"}]}
      parentTitle="Website Development"
      parentHref="/services/website-development"
      title="Wix Website Development Services"
      quoteSectionPlacement="before-related-services"
      description="We build and redesign Wix websites and Wix Studio sites for service businesses and growing brands. From responsive layouts and Wix CMS collections to booking forms, integrations, analytics and search-friendly page structure, we plan each build around your visitors and your team’s editing needs."
      details={[
        "Information architecture and page planning around your services, audience and conversion goals.",
        "Custom Wix website development or Wix Studio implementation with responsive layouts, reusable sections and consistent visual rules.",
        "CMS collections, forms, booking flows and third-party integrations configured around the way your business operates.",
        "On-page SEO foundations including titles, descriptions, headings, internal links, image alt text and indexation checks.",
        "Analytics and conversion tracking setup for forms, calls, bookings and other meaningful actions.",
        "Wix website redesign and migration support, including URL mapping and redirects when existing addresses change.",
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
          q: "How do you protect SEO when redesigning a Wix website?",
          a: "We audit indexed URLs, existing content, headings, metadata and internal links before the redesign. If URLs change, we map redirects and validate crawlability after launch. Rankings cannot be guaranteed, but preserving important search signals is part of the plan.",
        },
        {
          q: "Can Wix work for a service business?",
          a: "Yes. Wix is often a practical fit for service businesses that need an editable website, contact forms, appointment bookings and common integrations without a custom application stack.",
        },
        {
          q: "Can you set up Wix forms, bookings and analytics?",
          a: "Yes. Depending on your plan and integrations, we can configure lead forms, booking flows, GA4, Google Tag Manager and conversion events, then test the key customer journeys before launch.",
        },
        {
          q: "Should I choose Wix or a custom Next.js website?",
          a: "Wix suits many content-managed business websites with straightforward requirements. Next.js can be a better fit for custom application logic and more tailored integrations. We recommend the platform after reviewing your needs.",
        },
      ]}
      blogCategory="Web"
      relatedServices={[
        { title: "SEO", href: "/services/seo", desc: "Connect the website build with organic visibility and technical search foundations." },
        { title: "Shopify", href: "/services/shopify", desc: "For ecommerce businesses that need a dedicated store platform and growth stack." },
      ]}
    >
      <ServiceCaseStudies
        heading="Website Development Case Studies"
        introduction="Explore examples of our broader website development work. These projects demonstrate website delivery across different industries; the project pages do not establish that they were built on Wix."
        studies={[
          {
            client: "Elite",
            href: "/work/elite",
            summary: "Website development and a showcase reel, alongside social content for a connected digital presence.",
          },
          {
            client: "Pur Health",
            href: "/work/pur-health",
            summary: "A professional healthcare website and supporting social media content designed around clarity and trust.",
          },
          {
            client: "Minhaz Couture",
            href: "/work/minhaz-couture",
            summary: "Fashion website development with a coordinated social content engagement.",
          },
        ]}
      />
    </SubServicePage>
  );
}
