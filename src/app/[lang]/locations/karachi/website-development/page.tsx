import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Website Development Agency in Karachi — Markit Media",
  description:
    "Karachi website development agency building modern, high-performance websites on WordPress, Shopify, and Next.js. Clean code, mobile-first design, and SEO-ready architecture.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/karachi/website-development",
  },
  openGraph: {
    title: "Website Development Agency in Karachi — Markit Media",
    description:
      "Karachi website development agency building modern, high-performance websites on WordPress, Shopify, and Next.js. Clean code, mobile-first design, and SEO-ready architecture.",
  },
};

const services = [
  {
    title: "WordPress Development",
    desc: "Custom themes, plugin development, WooCommerce stores, and headless WordPress builds. The most flexible CMS for businesses that need full content control.",
  },
  {
    title: "Shopify & E-Commerce",
    desc: "Storefront setup, custom Shopify themes, payment gateway integration, and product catalog builds for Karachi businesses selling online locally and internationally.",
  },
  {
    title: "Next.js & Custom Builds",
    desc: "Server-rendered React applications, static sites, and custom web apps built on modern frameworks for speed, scalability, and developer-friendly architecture.",
  },
  {
    title: "UI/UX Design",
    desc: "Wireframing, prototyping, responsive layouts, and user experience research. Every build starts with design that serves real user behavior, not assumptions.",
  },
  {
    title: "Website Maintenance",
    desc: "Security patches, plugin updates, uptime monitoring, backups, and content changes. Ongoing support so your site stays fast, secure, and current after launch.",
  },
  {
    title: "Speed & Performance Optimization",
    desc: "Core Web Vitals audits, image optimization, caching configuration, code splitting, and server tuning to cut load times and improve search rankings.",
  },
];

const reasons = [
  {
    title: "Full-stack expertise",
    desc: "We work across WordPress, Shopify, Next.js, and custom stacks. You get the right technology for your project, not whatever a single-framework shop defaults to.",
  },
  {
    title: "Performance-first approach",
    desc: "Karachi&apos;s mobile users often browse on variable network speeds. We build with aggressive performance budgets, lazy loading, and optimized assets from day one.",
  },
  {
    title: "SEO-ready builds",
    desc: "Clean markup, structured data, semantic HTML, fast page loads, and proper meta architecture. Every site ships with the technical foundation search engines need to index and rank your pages.",
  },
  {
    title: "Ongoing support",
    desc: "Launching a website is the starting point. We provide post-launch maintenance, content updates, security monitoring, and iterative improvements as your business grows.",
  },
];

const process = [
  {
    step: "01",
    title: "Discovery & Planning",
    desc: "We define your goals, target audience, content requirements, and technical needs. This phase produces a sitemap, feature list, and project timeline before any design work begins.",
  },
  {
    step: "02",
    title: "Design & Prototyping",
    desc: "Wireframes and high-fidelity mockups for every key page. You review and approve the visual direction, layout structure, and responsive behavior before development starts.",
  },
  {
    step: "03",
    title: "Development & Testing",
    desc: "Clean, maintainable code built to spec. We test across devices, browsers, and screen sizes. Performance audits, accessibility checks, and QA happen throughout — not as an afterthought.",
  },
  {
    step: "04",
    title: "Launch & Support",
    desc: "DNS migration, SSL setup, analytics configuration, and go-live. After launch, we monitor performance, handle updates, and remain available for ongoing changes and improvements.",
  },
];

export default function KarachiWebDevelopmentPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Markit Media",
    description:
      "Website development agency in Karachi building modern, high-performance websites on WordPress, Shopify, and Next.js.",
    areaServed: { "@type": "City", name: "Karachi" },
    url: "https://themarkitmedia.com/en/locations/karachi/website-development",
  };

  return (
    <article>
      <JsonLd data={schema} />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Locations", href: "/locations" },
          { label: "Karachi", href: "/locations/karachi" },
          { label: "Website Development" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Karachi</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Website Development Agency in Karachi
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-3xl">
              Karachi is Pakistan&apos;s largest commercial hub, and its
              businesses are moving online at pace. From retail and e-commerce to
              professional services and logistics, a modern web presence is no
              longer optional — it&apos;s the baseline expectation for any
              serious operation. We build websites that load fast, rank well, and
              convert visitors into customers.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-3xl">
              Whether you need a WordPress site with full content management, a
              Shopify store ready for domestic and international orders, or a
              custom Next.js application built for scale, we handle the entire
              process from planning through post-launch support.
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
              <Link
                href="/services/website-development"
                className="inline-flex items-center gap-3 border-2 border-black text-black px-10 py-5 font-bold text-base hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                View All Web Services
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Services Grid */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Web development services in Karachi"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Build</SectionLabel>
            <SectionTitle>Web Development Services</SectionTitle>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-3xl">
              Karachi&apos;s digital economy spans everything from textile
              exporters and food delivery platforms to SaaS startups and
              brick-and-mortar retailers going online for the first time. Each
              business needs a different kind of website — and a different
              technology stack behind it.
            </p>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {services.map((svc) => (
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

      {/* Why Karachi Businesses Choose Us */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why Karachi businesses choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Karachi Businesses Choose Us for Web Development
            </SectionTitle>
            <p className="text-lg text-gray-500 leading-relaxed mt-4">
              Pakistan&apos;s e-commerce market is growing rapidly, and
              Karachi sits at the centre of that growth. Mobile-first browsing
              dominates, search competition is intensifying, and customers
              expect fast, functional websites regardless of the device or
              network they&apos;re on. Here&apos;s how we approach that reality.
            </p>
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
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>How We Work</SectionLabel>
            <SectionTitle>From Brief to Launch</SectionTitle>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-3xl">
              Every project follows a structured process. No ambiguity about
              what happens next, no surprise scope changes, and no long gaps
              without communication. You know where your project stands at every
              stage.
            </p>
          </Animate>
          <Stagger
            stagger={80}
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
          >
            {process.map((item) => (
              <div key={item.step} className="relative">
                <span className="font-[family-name:var(--font-display)] text-5xl font-extrabold text-gray-200 leading-none">
                  {item.step}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mt-3">
                  {item.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed mt-2">
                  {item.desc}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Related Services */}
      <section className="px-6 lg:px-12 py-20" aria-label="Related services">
        <div className="max-w-3xl mx-auto text-center">
          <Animate animation="fade-up">
            <SectionLabel>Related Services</SectionLabel>
            <SectionTitle>More for Karachi Businesses</SectionTitle>
            <p className="text-lg text-gray-500 leading-relaxed mt-4">
              A website performs best when it&apos;s part of a broader digital
              strategy. These services pair directly with web development to
              drive traffic, improve visibility, and increase conversions.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                href="/locations/karachi/seo-services"
                className="border-2 border-black text-black px-8 py-4 font-bold text-base hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                SEO Services in Karachi
              </Link>
              <Link
                href="/locations/karachi"
                className="border-2 border-black text-black px-8 py-4 font-bold text-base hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                All Karachi Services
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Build Your Next Website?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Tell us what you need — a new site, a rebuild, or a performance
              overhaul — and we&apos;ll put together a clear scope and timeline.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none"
            >
              Start a Conversation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
