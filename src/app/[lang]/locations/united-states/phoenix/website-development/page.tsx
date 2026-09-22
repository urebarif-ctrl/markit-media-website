import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Website Development Agency in Phoenix — Markit Media",
  description:
    "Website development for businesses in Phoenix. WordPress, Shopify, and Next.js builds with mobile-first design, performance optimization, and conversion-focused architecture for Arizona's fastest-growing market.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/phoenix/website-development",
  },
  openGraph: {
    title: "Website Development Agency in Phoenix — Markit Media",
    description:
      "Website development for Phoenix businesses. WordPress, Shopify, and Next.js builds with mobile-first design and performance optimization for Arizona's booming metro.",
  },
};

const serviceItems = [
  {
    title: "WordPress Development",
    desc: "Custom WordPress themes, plugin development, and CMS configuration for Phoenix businesses that need a flexible, easy-to-manage website. We build sites for real estate brokerages, healthcare practices, solar installers, and professional services firms that need content control without ongoing developer dependency.",
  },
  {
    title: "Shopify & E-Commerce",
    desc: "Shopify storefronts, custom theme builds, and checkout optimization for Phoenix's growing retail and direct-to-consumer brands. We configure product catalogs, payment gateways, and shipping integrations for businesses selling locally and across Arizona.",
  },
  {
    title: "Next.js & Custom Applications",
    desc: "Server-rendered React applications, headless CMS architectures, and custom web platforms for Phoenix businesses that need speed, SEO performance, and the flexibility to scale with the Valley's growth. Ideal for companies with complex data needs or high-traffic requirements.",
  },
  {
    title: "UX & UI Design",
    desc: "Wireframing, prototyping, and visual design grounded in conversion best practices. Phoenix's real estate, healthcare, and financial services markets demand polished interfaces that build trust with prospects before they ever make contact — especially for high-value transactions.",
  },
  {
    title: "Performance Optimization",
    desc: "Core Web Vitals audits, image compression, code splitting, and CDN configuration. Phoenix's mobile-heavy traffic means slow-loading pages lose visitors before they scroll. We optimize for the real-world conditions of how your audience browses — on phones, in the heat, on the go.",
  },
  {
    title: "Ongoing Maintenance & Support",
    desc: "Security updates, plugin management, uptime monitoring, content updates, and technical support so your site stays fast, secure, and current after launch. We handle the infrastructure so you can focus on running your business in one of the country's most active markets.",
  },
];

const reasons = [
  {
    title: "Built for Phoenix's high-growth industries",
    desc: "Real estate, healthcare, solar energy, semiconductor, and financial services are the engines driving Phoenix's economy. We build websites that address the specific conversion paths of these industries — IDX property search for brokerages, patient intake flows for medical practices, quote calculators for solar installers, and lead gen architectures for B2B firms.",
  },
  {
    title: "Mobile-first for a mobile-first market",
    desc: "Phoenix's population skews younger and more mobile-connected than the national average, with a significant commuter workforce spread across the Valley. Every site we build starts with the mobile experience and scales up to desktop. Navigation, load times, and conversion flows are all tested on real devices first.",
  },
  {
    title: "Performance that supports your marketing",
    desc: "A website that loads slowly or converts poorly undermines every dollar you spend on paid media and SEO. We build sites with sub-three-second load times, clean code, and conversion-focused layouts that support your broader marketing investment — not work against it.",
  },
  {
    title: "Scalable architecture for growing businesses",
    desc: "Phoenix businesses grow fast. We build on platforms and architectures that scale with you — whether that means adding new service areas as you expand across the Valley, integrating with CRM and marketing automation tools, or migrating from a starter site to a full custom build when your business outgrows it.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Requirements",
    desc: "We start with your business goals, not a template. We review your current site (if you have one), audit competitor websites in the Phoenix market, and define the scope — pages, features, integrations, and the content architecture that will support your marketing and sales efforts.",
  },
  {
    step: "02",
    title: "Design & Prototyping",
    desc: "Wireframes and visual designs are built in Figma and shared for your review before any code is written. We design for conversion — clear calls to action, logical user flows, and layouts that guide visitors from landing to contact for Phoenix's key audience segments.",
  },
  {
    step: "03",
    title: "Development & Testing",
    desc: "We build on WordPress, Shopify, or Next.js depending on your needs. Every build includes mobile-responsive testing, performance optimization, accessibility checks, and integration with your analytics and tracking infrastructure so your site launches production-ready.",
  },
  {
    step: "04",
    title: "Launch & Ongoing Support",
    desc: "After launch, we provide ongoing maintenance, performance monitoring, and technical support. As your Phoenix business grows and your marketing evolves, we update and expand your site to keep pace — adding pages, features, and integrations as your needs change.",
  },
];

export default function PhoenixWebDevelopmentPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "Website development for businesses in Phoenix. WordPress, Shopify, and Next.js builds with mobile-first design and performance optimization for Arizona's fastest-growing metro.",
    areaServed: { "@type": "City", name: "Phoenix" },
    url: "https://themarkitmedia.com/en/locations/united-states/phoenix/website-development",
  };

  return (
    <article>
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
                name: "How long does it take to build a website for a Phoenix business?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most business websites take four to eight weeks from kickoff to launch, depending on scope and complexity. A straightforward WordPress site for a local Phoenix service business is typically on the shorter end, while custom Next.js applications or e-commerce builds with complex integrations take longer. We define the timeline during the discovery phase so expectations are clear before any work begins.",
                },
              },
              {
                "@type": "Question",
                name: "Should my Phoenix business use WordPress, Shopify, or Next.js?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "WordPress is the best fit for most Phoenix businesses that need a content-managed site with flexibility — real estate firms, healthcare practices, and professional services. Shopify is ideal if you sell products online. Next.js is suited for businesses that need fast page loads, strong SEO performance, and custom functionality — common for companies in the Valley's tech and semiconductor sectors or high-traffic sites serving the broader Arizona market.",
                },
              },
              {
                "@type": "Question",
                name: "How important is mobile performance for Phoenix websites?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Extremely important. Phoenix's population skews younger and more mobile-connected than the national average, with a large commuter workforce spread across the Valley from Scottsdale to Mesa to Gilbert. The majority of local searches happen on mobile devices. A site that loads slowly or is difficult to navigate on a phone will lose visitors before they ever reach your contact form.",
                },
              },
              {
                "@type": "Question",
                name: "Do you build bilingual websites for Phoenix businesses?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. With over 30 percent of the Phoenix metro population being Hispanic or Latino, bilingual websites can significantly expand your reach. We build bilingual sites with proper URL structures and content strategy — not machine translations, but properly localized content that performs well in both English and Spanish search results.",
                },
              },
            ],
          }),
        }}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "United States", href: "/locations/united-states" },
          {
            label: "Phoenix",
            href: "/locations/united-states/phoenix",
          },
          { label: "Website Development" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Phoenix, Arizona</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              Website Development for Businesses in Phoenix
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Phoenix&apos;s rapid growth means more businesses competing
              for the same customers online. Whether you are a real estate
              firm in Scottsdale, a healthcare provider serving the Valley,
              or a solar company capturing Arizona&apos;s energy market,
              your website is the foundation of every marketing effort you
              run.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media builds performance-first websites on WordPress,
              Shopify, and Next.js — designed to load fast, convert
              visitors, and support your growth in one of the most
              competitive and fastest-expanding metros in the country.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Discuss Your Project &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Service Details */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Web development services for Phoenix"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              Web Development Services for the Phoenix Market
            </SectionTitle>
            <p className="text-base text-gray-500 leading-relaxed mt-4 max-w-2xl">
              From content-managed business sites to custom web
              applications, every project is scoped to your business goals
              and built to perform in Phoenix&apos;s competitive digital
              landscape. Each service below can be engaged as a standalone
              project or as part of a broader marketing engagement.
            </p>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {serviceItems.map((svc) => (
              <div
                key={svc.title}
                className="bg-white border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
              >
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black uppercase tracking-wide mb-2">
                  {svc.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why Phoenix Businesses Choose Markit Media */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why Phoenix businesses choose Markit Media for web development"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Phoenix Businesses Choose Markit Media for Web Development
            </SectionTitle>
          </Animate>
          <ul className="mt-10 space-y-4">
            {reasons.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <li className="flex items-start gap-4 py-3 border-b border-gray-200">
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center flex-shrink-0 text-base font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-base font-bold text-black">
                      {item.title}
                    </span>
                    <p className="text-base text-gray-500 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </li>
              </Animate>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Our web development process"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Process</SectionLabel>
            <SectionTitle>
              How We Build Websites for Phoenix Businesses
            </SectionTitle>
          </Animate>
          <div className="mt-10 space-y-8">
            {processSteps.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 80}>
                <div className="flex items-start gap-5">
                  <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black flex-shrink-0 w-12">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black">
                      {item.title}
                    </h3>
                    <p className="text-base text-gray-500 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="px-6 lg:px-12 py-20" aria-label="Related services">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore More</SectionLabel>
            <SectionTitle>Related Services in Phoenix</SectionTitle>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10"
          >
            <Link
              href="/locations/united-states/phoenix/marketing-agency"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <span className="text-base font-bold text-black">
                Marketing Agency
              </span>
              <p className="text-base text-gray-500 mt-1">
                Full-service marketing for Phoenix businesses.
              </p>
            </Link>
            <Link
              href="/locations/united-states/phoenix/ppc-ads"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <span className="text-base font-bold text-black">
                PPC Ads
              </span>
              <p className="text-base text-gray-500 mt-1">
                Google Ads and Meta Ads for Phoenix businesses.
              </p>
            </Link>
            <Link
              href="/locations/united-states/phoenix/seo-services"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <span className="text-base font-bold text-black">
                SEO Services
              </span>
              <p className="text-base text-gray-500 mt-1">
                Technical, local, and content SEO for Phoenix.
              </p>
            </Link>
            <Link
              href="/locations/united-states/phoenix"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <span className="text-base font-bold text-black">
                All Phoenix Services
              </span>
              <p className="text-base text-gray-500 mt-1">
                View all services available in Phoenix.
              </p>
            </Link>
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">How long does it take to build a website for a Phoenix business?</h3>
              <p className="text-base text-neutral-600">Most business websites take four to eight weeks from kickoff to launch, depending on scope and complexity. A straightforward WordPress site for a local Phoenix service business is typically on the shorter end, while custom Next.js applications or e-commerce builds with complex integrations take longer. We define the timeline during the discovery phase so expectations are clear before any work begins.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Should my Phoenix business use WordPress, Shopify, or Next.js?</h3>
              <p className="text-base text-neutral-600">WordPress is the best fit for most Phoenix businesses that need a content-managed site with flexibility — real estate firms, healthcare practices, and professional services. Shopify is ideal if you sell products online. Next.js is suited for businesses that need fast page loads, strong SEO performance, and custom functionality — common for companies in the Valley&apos;s tech and semiconductor sectors or high-traffic sites serving the broader Arizona market.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">How important is mobile performance for Phoenix websites?</h3>
              <p className="text-base text-neutral-600">Extremely important. Phoenix&apos;s population skews younger and more mobile-connected than the national average, with a large commuter workforce spread across the Valley from Scottsdale to Mesa to Gilbert. The majority of local searches happen on mobile devices. A site that loads slowly or is difficult to navigate on a phone will lose visitors before they ever reach your contact form.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Do you build bilingual websites for Phoenix businesses?</h3>
              <p className="text-base text-neutral-600">Yes. With over 30 percent of the Phoenix metro population being Hispanic or Latino, bilingual websites can significantly expand your reach. We build bilingual sites with proper URL structures and content strategy — not machine translations, but properly localized content that performs well in both English and Spanish search results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Your Website Should Work as Hard as Your Business
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s talk about what your Phoenix business needs from
              its website — and build something that actually delivers
              leads, sales, and growth.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              Discuss Your Project &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
