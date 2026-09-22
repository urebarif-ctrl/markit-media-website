import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Website Development Agency in Chicago — Markit Media",
  description:
    "Markit Media builds high-performance websites for businesses in Chicago — WordPress, Shopify, and Next.js development focused on speed, conversion, and scalability for B2B and e-commerce.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Markit Media",
  description:
    "Website development agency serving businesses in Chicago with WordPress, Shopify, and Next.js builds focused on performance and conversion.",
  areaServed: { "@type": "City", name: "Chicago" },
  url: "https://themarkitmedia.com/en/locations/united-states/chicago/website-development",
};

const serviceItems = [
  {
    title: "WordPress Development",
    description:
      "Custom themes, headless configurations, and plugin development for businesses that need a flexible, content-driven website. We build WordPress sites that load fast and are straightforward to maintain.",
  },
  {
    title: "Shopify &amp; E-Commerce",
    description:
      "Storefront design, custom theme development, and app integrations for Shopify and Shopify Plus. Built for product catalogues of any size with a focus on checkout optimisation and mobile performance.",
  },
  {
    title: "Next.js &amp; Custom Builds",
    description:
      "Server-rendered React applications for businesses that need speed, flexibility, and complex functionality. Ideal for B2B platforms, SaaS marketing sites, and high-traffic content hubs.",
  },
  {
    title: "UI/UX Design",
    description:
      "Wireframes, prototypes, and visual design rooted in user research and conversion data. Every design decision is tied to a business objective — not just aesthetic preference.",
  },
  {
    title: "Performance Optimisation",
    description:
      "Core Web Vitals audits, image optimisation, code splitting, and caching strategies. Fast-loading pages reduce bounce rates, improve search rankings, and increase conversion rates.",
  },
  {
    title: "Ongoing Maintenance",
    description:
      "Security updates, plugin management, uptime monitoring, and technical support. We keep your site running smoothly so your team can focus on the business.",
  },
];

const reasons = [
  {
    title: "Corporate-Grade Quality, Agency Efficiency",
    description:
      "Chicago&apos;s corporate landscape demands websites that project credibility and professionalism. We build to that standard — clean code, accessible markup, fast load times — without the bloated timelines and overhead that come with large enterprise agencies.",
  },
  {
    title: "Built for Business Outcomes",
    description:
      "A website is a business tool, not a portfolio piece. Every page we build is designed to support a specific goal: lead capture for B2B companies, product sales for e-commerce, or content distribution for thought leadership. Structure, copy, and design all serve that purpose.",
  },
  {
    title: "Platform Expertise Across the Stack",
    description:
      "WordPress for content-heavy sites, Shopify for e-commerce, Next.js for high-performance custom applications. We recommend the platform that fits your business needs and technical requirements — not the one that&apos;s easiest for us.",
  },
  {
    title: "Post-Launch Accountability",
    description:
      "Launch day is the starting line, not the finish. We provide ongoing maintenance, performance monitoring, and iterative improvements based on real user data. Your site gets better over time, not worse.",
  },
];

const steps = [
  {
    number: "01",
    title: "Requirements &amp; Planning",
    description:
      "We document your business goals, technical requirements, content structure, and integration needs. This phase produces a detailed project scope and timeline before any design or development begins.",
  },
  {
    number: "02",
    title: "Design &amp; Prototyping",
    description:
      "Wireframes and visual designs are created and reviewed iteratively. You see how the site will look and function on desktop and mobile before a single line of production code is written.",
  },
  {
    number: "03",
    title: "Development &amp; Testing",
    description:
      "Clean, well-documented code built to spec. Every page is tested across browsers, devices, and screen sizes. Performance benchmarks are verified against Core Web Vitals targets before launch.",
  },
  {
    number: "04",
    title: "Launch &amp; Iteration",
    description:
      "Deployment, DNS configuration, and post-launch monitoring. Once the site is live, we track user behaviour and conversion data to identify opportunities for improvement.",
  },
];

export default function ChicagoWebsiteDevelopmentPage() {
  return (
    <>
      <JsonLd data={schema} />

      {/* Breadcrumb */}
      <section className="bg-white pt-28 pb-4">
        <div className="mx-auto max-w-7xl px-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Locations", href: "/locations" },
              { label: "United States", href: "/locations/united-states" },
              { label: "Chicago", href: "/locations/united-states/chicago" },
              { label: "Website Development" },
            ]}
          />
        </div>
      </section>

      {/* Hero */}
      <section className="bg-white pt-12 pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Chicago, Illinois</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-tight max-w-4xl mt-4">
              Website Development for Businesses in Chicago
            </h1>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <p className="mt-6 max-w-2xl text-lg text-gray-700 leading-relaxed">
              In a city built on commerce — from the trading floors of the Loop
              to the manufacturing corridors of the South Side — your website is
              often the first interaction a prospect has with your business. It
              needs to load fast, communicate clearly, and convert visitors into
              leads or customers.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={300}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Markit Media builds websites for businesses across the Chicago metro
              on WordPress, Shopify, and Next.js. Every project is engineered for
              performance, designed for conversion, and built to scale with your
              business.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={400}>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-black px-10 py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
            >
              Discuss Your Project
            </Link>
          </Animate>
        </div>
      </section>

      {/* Service Details */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>What We Build</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              Web development services for Chicago businesses
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Whether you need a corporate B2B site that positions your company as
              an industry leader, an e-commerce storefront that handles thousands
              of SKUs, or a custom web application — we build on the platform that
              fits your requirements.
            </p>
          </Animate>

          <Stagger stagger={100} animation="fade-up" className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {serviceItems.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-8"
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-black">
                  {item.title}
                </h3>
                <p
                  className="mt-3 text-base text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why Chicago Businesses Choose Us */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              Why Chicago businesses choose Markit Media for web development
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Chicago companies need web partners who understand that a website
              is infrastructure — not decoration. Here&apos;s what sets our
              approach apart.
            </p>
          </Animate>

          <Stagger stagger={100} animation="fade-up" className="mt-14 grid gap-10 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason.title} className="border-l-4 border-black pl-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-black">
                  {reason.title}
                </h3>
                <p
                  className="mt-3 text-base text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: reason.description }}
                />
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Our Process</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              How we deliver web projects
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Clear phases, defined deliverables, and no surprises. Every project
              follows a structured process that keeps timelines predictable and
              gives you visibility at every stage.
            </p>
          </Animate>

          <Stagger stagger={120} animation="fade-up" className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="rounded-2xl border border-gray-200 bg-white p-8">
                <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-gray-200">
                  {step.number}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold text-black">
                  {step.title}
                </h3>
                <p
                  className="mt-3 text-base text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: step.description }}
                />
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Related Services */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Related Services</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              Explore our development platforms
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              We build on the platforms that best fit your business. These pages
              go deeper into each technology stack.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={250}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/services/website-development"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
              >
                Website Development
              </Link>
              <Link
                href="/services/website-development/wordpress"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
              >
                WordPress
              </Link>
              <Link
                href="/services/website-development/shopify"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
              >
                Shopify
              </Link>
              <Link
                href="/locations/united-states/chicago"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
              >
                All Chicago Services
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Animate animation="scale-in">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-white tracking-tight leading-tight">
              Build a website that works for your Chicago business
            </h2>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300 leading-relaxed">
              Tell us about your project — scope, timeline, and goals. We&apos;ll
              come back with a detailed proposal and realistic estimate, not a
              generic quote.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={300}>
            <Link
              href="/contact"
              className="mt-10 inline-block rounded-full bg-white px-10 py-4 text-base font-bold text-black transition-opacity hover:opacity-90"
            >
              Start Your Project
            </Link>
          </Animate>
        </div>
      </section>
    </>
  );
}
