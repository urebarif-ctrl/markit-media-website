import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Website Development Agency in Los Angeles — Markit Media",
  description:
    "Website development for businesses in Los Angeles. WordPress, Shopify, and Next.js builds designed for LA's design-forward, mobile-first audience. Fast, conversion-optimized, and built to scale.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/los-angeles/website-development",
  },
  openGraph: {
    title: "Website Development Agency in Los Angeles — Markit Media",
    description:
      "Website development for businesses in Los Angeles. WordPress, Shopify, and Next.js builds designed for LA's design-forward, mobile-first audience.",
  },
};

const serviceItems = [
  {
    title: "WordPress Development",
    desc: "Custom WordPress builds, theme development, plugin integration, and performance optimization. Ideal for content-heavy sites, blogs, and businesses that need a flexible CMS without ongoing developer dependency.",
  },
  {
    title: "Shopify & E-Commerce",
    desc: "Shopify storefronts, custom theme builds, app integrations, and checkout optimization for LA's direct-to-consumer and lifestyle brands. We build stores that handle high traffic and look the part doing it.",
  },
  {
    title: "Next.js & Custom Applications",
    desc: "Server-rendered React applications, headless CMS architectures, and custom web platforms for businesses that need speed, SEO performance, and flexibility beyond what template-based tools offer.",
  },
  {
    title: "UI/UX Design",
    desc: "Wireframing, prototyping, and visual design that prioritizes conversion and usability. Los Angeles audiences have high expectations for design quality — we build interfaces that meet them.",
  },
  {
    title: "Mobile-First Responsive Design",
    desc: "Every build starts mobile-first. In a market where the majority of traffic comes from phones, responsive design is not optional — it is the foundation of the entire development process.",
  },
  {
    title: "Performance & Core Web Vitals",
    desc: "Speed optimization, image compression, code splitting, and server configuration to hit Core Web Vitals targets. Fast sites rank better, convert better, and keep LA's impatient audiences engaged.",
  },
];

const reasons = [
  {
    title: "Design standards that match the LA market",
    desc: "Los Angeles is a visual city. Businesses here compete against brands with world-class creative agencies. A functional website is not enough — it has to look and feel like it belongs in this market. We design with that bar in mind, delivering sites that are visually sharp without sacrificing usability or performance.",
  },
  {
    title: "Built for conversion, not just appearance",
    desc: "A beautiful website that does not convert is an expensive brochure. Every page layout, call-to-action placement, and user flow we design is informed by conversion data and best practices. We track what visitors do after they land and adjust accordingly.",
  },
  {
    title: "Platform expertise across WordPress, Shopify, and Next.js",
    desc: "We do not force every project into the same tech stack. WordPress makes sense for content-heavy businesses. Shopify is the right choice for most e-commerce operations. Next.js is ideal for performance-critical or custom applications. We recommend the platform that fits your actual needs.",
  },
  {
    title: "Ongoing support without lock-in",
    desc: "After launch, we offer maintenance, hosting management, and iterative improvements. But we also build sites you can manage internally if you prefer. No proprietary builders, no vendor lock-in, no artificially complex setups designed to keep you dependent.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Requirements & Discovery",
    desc: "We start with your business goals — not a design mood board. What does the site need to do? Who is the audience? What actions should visitors take? From there, we define the scope, platform recommendation, and project timeline.",
  },
  {
    step: "02",
    title: "Design & Prototyping",
    desc: "Wireframes and visual designs are built in Figma and shared for review before any code is written. You see the layout, the user flow, and the responsive behavior on every screen size before development begins.",
  },
  {
    step: "03",
    title: "Development & Integration",
    desc: "We build the site on your chosen platform, integrate third-party tools (analytics, CRM, payment processors, marketing platforms), and optimize for speed and SEO from the start — not as an afterthought.",
  },
  {
    step: "04",
    title: "QA, Launch & Handoff",
    desc: "Thorough testing across browsers and devices, staging environment review, and a structured launch process. After go-live, we provide documentation and training so your team can manage day-to-day updates independently.",
  },
];

export default function LosAngelesWebsiteDevelopmentPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "Website development agency serving businesses in Los Angeles. WordPress, Shopify, and Next.js builds optimized for design, performance, and conversion.",
    areaServed: { "@type": "City", name: "Los Angeles" },
    url: "https://themarkitmedia.com/en/locations/united-states/los-angeles/website-development",
  };

  const faqs = [
    {
      q: "Why does design quality matter more for websites in Los Angeles?",
      a: "Los Angeles is a visually driven market, and businesses here often compete against brands with access to top-tier creative talent. A functional site is not enough on its own — we design with the visual standards LA audiences expect while keeping usability and performance intact.",
    },
    {
      q: "Do you build websites for entertainment industry clients?",
      a: "Yes. We build sites for entertainment and media businesses that need to reflect the visual polish and production values common in the industry, while still performing well on speed and SEO.",
    },
    {
      q: "How do you account for LA's commuter and mobile-heavy audience?",
      a: "A large share of LA traffic comes from mobile devices, including people browsing on the go. Every site we build starts mobile-first, so navigation, load times, and layout are designed for that behavior rather than adapted to it afterward.",
    },
    {
      q: "Do you build e-commerce websites for LA-based brands?",
      a: "We build Shopify stores and custom e-commerce platforms for direct-to-consumer and lifestyle brands based in Los Angeles, with attention to checkout flow, page speed, and the visual presentation these brands are judged on.",
    },
  ];

  return (
    <article>
      <JsonLd data={schema} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "United States", href: "/locations/united-states" },
          {
            label: "Los Angeles",
            href: "/locations/united-states/los-angeles",
          },
          { label: "Website Development" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Los Angeles</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              Website Development for Businesses in Los Angeles
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              In Los Angeles, your website is your first impression — and the bar
              is higher here than almost anywhere else. We build WordPress,
              Shopify, and Next.js sites that meet LA&apos;s design expectations
              while delivering the speed and conversion performance your business
              actually needs.
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
        aria-label="Website development services for Los Angeles"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              Web Development Services for the LA Market
            </SectionTitle>
            <p className="text-base text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Whether you need a content-driven WordPress site, a
              high-converting Shopify store, or a custom Next.js application, we
              build on the platform that fits your business — not the one that is
              easiest for us to template.
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

      {/* Why LA Businesses Choose Markit Media for Web Dev */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why Los Angeles businesses choose Markit Media for website development"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Los Angeles Businesses Choose Markit Media for Web Development
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
        aria-label="Our development process"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Process</SectionLabel>
            <SectionTitle>
              How We Build Websites for LA Businesses
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
            <SectionTitle>Related Services</SectionTitle>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10"
          >
            <Link
              href="/services/website-development"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <span className="text-base font-bold text-black">
                Website Development
              </span>
              <p className="text-base text-gray-500 mt-1">
                Our full web development service overview.
              </p>
            </Link>
            <Link
              href="/services/website-development/wordpress"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <span className="text-base font-bold text-black">WordPress</span>
              <p className="text-base text-gray-500 mt-1">
                Custom WordPress design and development.
              </p>
            </Link>
            <Link
              href="/services/website-development/shopify"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <span className="text-base font-bold text-black">Shopify</span>
              <p className="text-base text-gray-500 mt-1">
                E-commerce storefronts and custom themes.
              </p>
            </Link>
            <Link
              href="/locations/united-states/los-angeles"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <span className="text-base font-bold text-black">
                All LA Services
              </span>
              <p className="text-base text-gray-500 mt-1">
                View all services available in Los Angeles.
              </p>
            </Link>
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-12 py-20" aria-label="Frequently asked questions">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>
              Frequently Asked Questions About Website Development in Los Angeles
            </SectionTitle>
          </Animate>
          <div className="mt-10 space-y-6">
            {faqs.map((faq, i) => (
              <Animate key={i} animation="fade-up" delay={i * 60}>
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black">
                    {faq.q}
                  </h3>
                  <p className="text-base text-gray-500 leading-relaxed mt-2">
                    {faq.a}
                  </p>
                </div>
              </Animate>
            ))}
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
              Let&apos;s build a site that looks right for the LA market and
              converts the traffic you&apos;re paying to drive there.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none"
            >
              Discuss Your Project &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
