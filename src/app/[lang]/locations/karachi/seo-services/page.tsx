import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "SEO Services in Karachi — Markit Media",
  description:
    "Markit Media offers SEO services in Karachi — technical SEO audits, local SEO, content optimization, and keyword research for businesses competing in Pakistan’s largest city.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Markit Media",
  description:
    "SEO services agency in Karachi providing technical SEO, local SEO, content optimization, and keyword research for businesses competing in Pakistan's largest city.",
  areaServed: { "@type": "City", name: "Karachi" },
  url: "https://themarkitmedia.com/en/locations/karachi/seo-services",
};

const services = [
  {
    title: "Technical SEO Audits",
    description:
      "We crawl every page, diagnose indexing gaps, fix broken links, resolve duplicate content, and ensure your site meets the Core Web Vitals thresholds that Google rewards with higher rankings.",
  },
  {
    title: "Local SEO & Google Business Profile",
    description:
      "Karachi shoppers search with local intent — \"near me\" queries, area names, neighborhood keywords. We optimize your Google Business Profile, local citations, and on-page signals so your business surfaces where it matters.",
  },
  {
    title: "Content Strategy & Optimization",
    description:
      "Ranking pages need more than keywords. We build topic clusters, optimize existing content for search intent, improve internal linking, and create editorial calendars aligned with what Karachi audiences actually search for.",
  },
  {
    title: "Keyword Research & Mapping",
    description:
      "We identify the terms your potential customers type into Google — from high-volume head terms to long-tail queries specific to Karachi — then map each keyword to the right page on your site.",
  },
  {
    title: "Link Building & Authority",
    description:
      "Domain authority grows through genuine, relevant backlinks. We pursue white-hat link acquisition through content partnerships, digital PR, and resource-based outreach — no paid link schemes.",
  },
  {
    title: "SEO Reporting & Analytics",
    description:
      "Every month you receive a clear report showing ranking movements, organic traffic trends, conversion data, and the next round of priorities. No vanity metrics — only numbers tied to business outcomes.",
  },
];

const reasons = [
  {
    title: "Local Search Expertise",
    description:
      "We operate in Karachi. We understand how people here search, the neighborhoods they reference, the Urdu-English queries they mix, and the seasonal patterns that shift demand across the city.",
  },
  {
    title: "White-Hat Methodology",
    description:
      "Short-term ranking tricks invite penalties. We follow Google&apos;s guidelines strictly — earning rankings through site health, quality content, and legitimate authority signals that compound over time.",
  },
  {
    title: "Content-Driven Approach",
    description:
      "Search engines reward pages that genuinely help users. Our SEO work is inseparable from content — every optimization decision starts with what the reader needs and works backward to the technical implementation.",
  },
  {
    title: "Measurable Rankings",
    description:
      "We track keyword positions, organic sessions, click-through rates, and conversions weekly. You always know where you stand, what moved, and why — no guesswork, no inflated dashboards.",
  },
];

const steps = [
  {
    number: "01",
    title: "Comprehensive Audit",
    description:
      "We start by examining your site&apos;s technical health, content quality, backlink profile, and current keyword positions. This baseline tells us exactly where gains are available.",
  },
  {
    number: "02",
    title: "Keyword & Competitor Research",
    description:
      "We map the search landscape in your industry within Karachi and across Pakistan. We study which competitors rank, how they earn their positions, and where opportunities exist that they haven&apos;t captured.",
  },
  {
    number: "03",
    title: "On-Page & Technical Optimization",
    description:
      "From meta tags and heading structures to site speed and mobile usability, we work through every technical factor that influences how Google crawls, indexes, and ranks your pages.",
  },
  {
    number: "04",
    title: "Content Creation & Link Building",
    description:
      "We produce search-optimized content that targets your mapped keywords and pursue authoritative backlinks that strengthen your domain — an ongoing cycle that drives sustained organic growth.",
  },
];

export default function SeoServicesKarachiPage() {
  return (
    <>
      <JsonLd data={schema} />

      {/* Breadcrumb */}
      <section className="pt-24 pb-4">
        <div className="mx-auto max-w-7xl px-6">
          <Breadcrumb
            items={[
              { label: "Locations", href: "/locations" },
              { label: "Karachi", href: "/locations/karachi" },
              { label: "SEO Services" },
            ]}
          />
        </div>
      </section>

      {/* Hero */}
      <section className="pb-20 pt-8">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up" once>
            <SectionLabel>Search Engine Optimization</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100} once>
            <h1 className="mt-4 text-5xl font-bold tracking-tight text-black sm:text-6xl font-[family-name:var(--font-display)]">
              SEO Services in Karachi
            </h1>
          </Animate>
          <Animate animation="fade-up" delay={200} once>
            <p className="mt-6 max-w-2xl text-lg text-black/70">
              Karachi is home to over 16 million internet users and thousands of
              businesses fighting for the same first-page positions. In a market
              this dense, organic search visibility isn&apos;t optional — it&apos;s
              the difference between being found and being forgotten. Markit Media
              helps Karachi-based businesses earn sustainable rankings through
              technical precision, strategic content, and disciplined execution.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={300} once>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-black px-6 py-3 text-base font-medium text-white transition hover:bg-black/80"
              >
                Start ranking higher
              </Link>
              <Link
                href="/services/seo"
                className="inline-flex items-center rounded-full border border-black px-6 py-3 text-base font-medium text-black transition hover:bg-black hover:text-white"
              >
                Explore our SEO services
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up" once>
            <SectionLabel>What We Deliver</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100} once>
            <SectionTitle>
              SEO services built for Karachi&apos;s competitive landscape
            </SectionTitle>
          </Animate>
          <Stagger stagger={100} animation="fade-up" className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-black/10 p-8 transition hover:border-black/30"
              >
                <h3 className="text-xl font-semibold text-black font-[family-name:var(--font-display)]">
                  {service.title}
                </h3>
                <p className="mt-3 text-base text-black/70">
                  {service.description}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why Markit Media */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up" once>
            <span className="text-base font-bold text-white/60 uppercase tracking-[0.15em]">Why Markit Media</span>
          </Animate>
          <Animate animation="fade-up" delay={100} once>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl font-[family-name:var(--font-display)]">
              Why Karachi businesses choose Markit Media for SEO
            </h2>
          </Animate>
          <Animate animation="fade-up" delay={150} once>
            <p className="mt-6 max-w-2xl text-lg text-white/70">
              Pakistan&apos;s digital economy is expanding rapidly, and Karachi sits at
              its center. E-commerce adoption is accelerating, mobile-first search
              is the norm, and Google&apos;s local pack results dominate commercial
              queries. Businesses that invest in SEO now are building an asset that
              delivers compounding returns — the earlier you start, the harder it
              becomes for competitors to close the gap.
            </p>
          </Animate>
          <Stagger stagger={100} animation="fade-up" className="mt-16 grid gap-10 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason.title}>
                <h3 className="text-xl font-semibold text-white font-[family-name:var(--font-display)]">
                  {reason.title}
                </h3>
                <p className="mt-3 text-base text-white/70">
                  {reason.description}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up" once>
            <SectionLabel>Our Process</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100} once>
            <SectionTitle>
              From audit to authority — how we grow your organic traffic
            </SectionTitle>
          </Animate>
          <Stagger stagger={120} animation="fade-up" className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number}>
                <span className="text-4xl font-bold text-black/10 font-[family-name:var(--font-display)]">
                  {step.number}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-black font-[family-name:var(--font-display)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-base text-black/70">
                  {step.description}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Karachi Context */}
      <section className="bg-white py-24 border-t border-black/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            <Animate animation="fade-right" once>
              <div>
                <SectionLabel>Karachi&apos;s Digital Landscape</SectionLabel>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-black sm:text-4xl font-[family-name:var(--font-display)]">
                  SEO in Pakistan&apos;s most competitive city
                </h2>
                <p className="mt-6 text-base text-black/70">
                  Karachi generates the highest volume of commercial search traffic
                  in Pakistan. Millions of queries each day cover everything from
                  restaurant recommendations and local services to B2B suppliers and
                  professional consultancies. The businesses that appear on page one
                  capture the vast majority of clicks — and everyone below folds into
                  a long tail that most searchers never scroll to.
                </p>
                <p className="mt-4 text-base text-black/70">
                  Organic search is especially powerful in Karachi because paid
                  advertising costs keep rising as more businesses enter the digital
                  space. A well-ranked page continues generating traffic without
                  additional spend per click. For businesses thinking long-term, SEO
                  is the most capital-efficient acquisition channel available.
                </p>
              </div>
            </Animate>
            <Animate animation="fade-left" once>
              <div>
                <h3 className="text-xl font-semibold text-black font-[family-name:var(--font-display)]">
                  Related services in Karachi
                </h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <Link
                      href="/locations/karachi/website-development"
                      className="group flex items-center justify-between rounded-xl border border-black/10 p-5 transition hover:border-black/30"
                    >
                      <span className="text-base font-medium text-black">
                        Website Development in Karachi
                      </span>
                      <span className="text-black/40 transition group-hover:translate-x-1 group-hover:text-black">
                        &rarr;
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/locations/karachi/social-media-marketing"
                      className="group flex items-center justify-between rounded-xl border border-black/10 p-5 transition hover:border-black/30"
                    >
                      <span className="text-base font-medium text-black">
                        Social Media Marketing in Karachi
                      </span>
                      <span className="text-black/40 transition group-hover:translate-x-1 group-hover:text-black">
                        &rarr;
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/locations/karachi"
                      className="group flex items-center justify-between rounded-xl border border-black/10 p-5 transition hover:border-black/30"
                    >
                      <span className="text-base font-medium text-black">
                        All Karachi Services
                      </span>
                      <span className="text-black/40 transition group-hover:translate-x-1 group-hover:text-black">
                        &rarr;
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Animate animation="scale-in" once>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-[family-name:var(--font-display)]">
              Ready to own page one in Karachi?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
              Every day without an SEO strategy is a day your competitors collect
              the organic clicks that should be yours. Let&apos;s change that.
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition hover:bg-white/90"
            >
              Get a free SEO consultation
            </Link>
          </Animate>
        </div>
      </section>
    </>
  );
}
