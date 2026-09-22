import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Website Development Agency in Denver — Markit Media",
  description:
    "Markit Media builds high-performance websites for businesses in Denver — WordPress, Shopify, and Next.js development focused on speed, conversion, and scalability for tech, outdoor, and growing Front Range companies.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/locations/united-states/denver/website-development",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Markit Media",
  description:
    "Website development agency serving businesses in Denver with WordPress, Shopify, and Next.js builds focused on performance and conversion.",
  areaServed: { "@type": "City", name: "Denver" },
  url: "https://themarkitmedia.com/en/locations/united-states/denver/website-development",
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
      "Storefront design, custom theme development, and app integrations for Shopify and Shopify Plus. Built for product catalogues of any size — from outdoor gear retailers to craft beverage brands selling direct-to-consumer.",
  },
  {
    title: "Next.js &amp; Custom Builds",
    description:
      "Server-rendered React applications for businesses that need speed, flexibility, and complex functionality. Ideal for Denver&apos;s tech companies, SaaS marketing sites, and high-traffic content platforms.",
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
    title: "Built for Denver&apos;s Innovation-Driven Market",
    description:
      "Denver&apos;s tech corridor and startup culture demand websites that project credibility and move fast. We build to that standard — clean code, accessible markup, fast load times — whether you&apos;re a SaaS company in RiNo, an outdoor brand in Boulder, or an aerospace contractor in the Denver Tech Center.",
  },
  {
    title: "Designed for Business Outcomes",
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

export default function DenverWebDevelopmentPage() {
  return (
    <>
      <JsonLd data={schema} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How long does a typical website project take for a Denver business?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most projects take between 6 and 12 weeks from kickoff to launch, depending on scope and complexity. A straightforward WordPress or Shopify build lands on the shorter end, while a custom Next.js application with complex integrations takes longer. We provide a detailed timeline during the planning phase so you know exactly what to expect before development begins.",
                },
              },
              {
                "@type": "Question",
                name: "Should I choose WordPress, Shopify, or Next.js for my Denver business website?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It depends on your business needs. WordPress is ideal for content-driven sites and businesses that need frequent updates without developer involvement. Shopify is the strongest option for e-commerce — especially for Denver’s outdoor gear retailers, craft beverage brands, and DTC companies. Next.js suits tech companies, SaaS platforms, and high-traffic sites that need top-tier performance and flexibility. We recommend the platform that fits your requirements, not the one that is easiest to build.",
                },
              },
              {
                "@type": "Question",
                name: "Do you build websites for Denver cannabis companies?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. We build websites for cannabis operators across the Denver metro, including dispensaries, cultivators, and ancillary businesses. Cannabis websites have specific compliance considerations around age gating, product claims, and payment processing. We build with those requirements in mind from the start so your site is both effective and compliant.",
                },
              },
              {
                "@type": "Question",
                name: "What does website maintenance include after launch?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Our maintenance plans cover security updates, plugin and dependency management, uptime monitoring, performance checks, and technical support. For Denver businesses that rely on their website for lead generation or e-commerce, ongoing maintenance protects your investment and ensures the site continues to perform well as traffic grows and technology evolves.",
                },
              },
            ],
          }),
        }}
      />

      {/* Breadcrumb */}
      <section className="bg-white pt-28 pb-4">
        <div className="mx-auto max-w-7xl px-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Locations", href: "/locations" },
              { label: "United States", href: "/locations/united-states" },
              { label: "Denver", href: "/locations/united-states/denver" },
              { label: "Website Development" },
            ]}
          />
        </div>
      </section>

      {/* Hero */}
      <section className="bg-white pt-12 pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Denver, Colorado</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-tight max-w-4xl mt-4">
              Website Development for Businesses in Denver
            </h1>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <p className="mt-6 max-w-2xl text-lg text-gray-700 leading-relaxed">
              In a city where tech startups compete alongside outdoor recreation
              brands, aerospace contractors, and a booming real estate market,
              your website is often the first interaction a prospect has with
              your business. It needs to load fast, communicate clearly, and
              convert visitors into leads or customers.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={300}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Markit Media builds websites for businesses across the Denver metro
              on WordPress, Shopify, and Next.js. Every project is engineered for
              performance, designed for conversion, and built to scale with your
              business.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={400}>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-black px-10 py-4 text-base font-bold text-white transition-opacity hover:opacity-90 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
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
              Web development services for Denver businesses
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Whether you need a corporate site that positions your company as a
              Front Range leader, an e-commerce storefront for outdoor or craft
              products, or a custom web application for your SaaS platform — we
              build on the technology that fits your requirements.
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

      {/* Why Denver Businesses Choose Us */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              Why Denver businesses choose Markit Media for web development
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Denver companies need web partners who understand that a website
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
              Explore our Denver service pages
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              We build on the platforms that best fit your business. These pages
              go deeper into our other Denver capabilities.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={250}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/locations/united-states/denver/marketing-agency"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Marketing Agency
              </Link>
              <Link
                href="/locations/united-states/denver/ppc-ads"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                PPC Ads
              </Link>
              <Link
                href="/locations/united-states/denver/seo-services"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                SEO Services
              </Link>
              <Link
                href="/locations/united-states/denver"
                className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                All Denver Services
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">How long does a typical website project take for a Denver business?</h3>
              <p className="text-base text-neutral-600">Most projects take between 6 and 12 weeks from kickoff to launch, depending on scope and complexity. A straightforward WordPress or Shopify build lands on the shorter end, while a custom Next.js application with complex integrations takes longer. We provide a detailed timeline during the planning phase so you know exactly what to expect before development begins.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Should I choose WordPress, Shopify, or Next.js for my Denver business website?</h3>
              <p className="text-base text-neutral-600">It depends on your business needs. WordPress is ideal for content-driven sites and businesses that need frequent updates without developer involvement. Shopify is the strongest option for e-commerce — especially for Denver&apos;s outdoor gear retailers, craft beverage brands, and DTC companies. Next.js suits tech companies, SaaS platforms, and high-traffic sites that need top-tier performance and flexibility. We recommend the platform that fits your requirements, not the one that is easiest to build.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Do you build websites for Denver cannabis companies?</h3>
              <p className="text-base text-neutral-600">Yes. We build websites for cannabis operators across the Denver metro, including dispensaries, cultivators, and ancillary businesses. Cannabis websites have specific compliance considerations around age gating, product claims, and payment processing. We build with those requirements in mind from the start so your site is both effective and compliant.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">What does website maintenance include after launch?</h3>
              <p className="text-base text-neutral-600">Our maintenance plans cover security updates, plugin and dependency management, uptime monitoring, performance checks, and technical support. For Denver businesses that rely on their website for lead generation or e-commerce, ongoing maintenance protects your investment and ensures the site continues to perform well as traffic grows and technology evolves.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Animate animation="scale-in">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-white tracking-tight leading-tight">
              Build a website that works for your Denver business
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
              className="mt-10 inline-block rounded-full bg-white px-10 py-4 text-base font-bold text-black transition-opacity hover:opacity-90 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Start Your Project
            </Link>
          </Animate>
        </div>
      </section>
    </>
  );
}
