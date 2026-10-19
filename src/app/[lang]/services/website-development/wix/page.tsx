import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Wix Website Development Services",
  description:
    "Wix website development, Wix Studio builds and redesigns with CMS setup, integrations and SEO foundations. Request a tailored quote from Markit Media.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/website-development/wix",
  },
  openGraph: {
    url: "https://themarkitmedia.com/en/services/website-development/wix",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Wix Website Development Services",
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
      servicePath="/services/website-development/wix"
      title="Wix Development"
      heading="Wix Website Development Services"
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
          q: "How do you protect SEO when redesigning a Wix website?",
          a: "We review indexed URLs, existing content, headings, metadata and internal links before the redesign. If URLs change, we map each one directly to the most relevant final page and check crawlability after launch. Rankings cannot be guaranteed, but protecting the search signals the site already has is part of the plan.",
        },
        {
          q: "Can Wix work for a service business?",
          a: "Yes. Wix can be a practical fit for service businesses that need a manageable website, forms, bookings, content editing and standard integrations without a custom application stack.",
        },
        {
          q: "Can you set up Wix forms, bookings and analytics?",
          a: "Yes. Depending on your Wix plan and integrations, we can configure lead forms, booking flows, GA4, Google Tag Manager and conversion events, then test the main customer journeys before launch.",
        },
        {
          q: "Should I choose Wix or a custom Next.js website?",
          a: "Wix suits many content-managed business websites with straightforward requirements. A custom Next.js build can be a better fit when you need application logic, custom integrations or more control over performance. We recommend a platform after reviewing your requirements.",
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
    >
      <section className="px-6 lg:px-12 py-16 border-y border-gray-200" aria-label="Choosing Wix">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">When Wix Is a Good Fit</h2>
            <ul className="mt-5 space-y-3 text-base text-gray-600 leading-relaxed list-disc pl-5">
              <li>Your team wants to edit pages, services and blog content without a developer.</li>
              <li>You need lead forms, bookings or a simple CMS rather than a custom application.</li>
              <li>The site is mainly marketing and service content with standard integrations.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">When Another Platform May Be Better</h2>
            <ul className="mt-5 space-y-3 text-base text-gray-600 leading-relaxed list-disc pl-5">
              <li>You need custom application logic, complex user accounts or heavy back-end integrations.</li>
              <li>You need a large online store; a dedicated ecommerce platform such as Shopify is usually the better choice.</li>
              <li>You need full control over performance and code, where a custom Next.js build can fit better.</li>
            </ul>
          </div>
        </div>
      </section>
    </SubServicePage>
  );
}
