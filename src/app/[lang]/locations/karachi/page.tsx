import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Karachi — Markit Media",
  description:
    "Markit Media is a full-service digital marketing agency based in Karachi. We offer SEO, PPC advertising, web development, branding, and social media marketing to businesses across Pakistan and beyond.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Markit Media",
  description:
    "Full-service digital marketing agency based in Karachi, offering SEO, PPC, web development, branding, and social media marketing.",
  areaServed: { "@type": "City", name: "Karachi" },
  url: "https://themarkitmedia.com/en/locations/karachi",
};

const services = [
  {
    title: "Marketing Agency",
    href: "/locations/karachi/marketing-agency",
    description:
      "End-to-end marketing strategy and execution built around measurable business outcomes. From market research to campaign deployment, every initiative ties back to revenue.",
  },
  {
    title: "PPC Ads",
    href: "/locations/karachi/ppc-ads",
    description:
      "Paid search and display campaigns across Google, Meta, and programmatic networks. We manage budgets of every size with a focus on cost-per-acquisition and return on ad spend.",
  },
  {
    title: "Website Development",
    href: "/locations/karachi/website-development",
    description:
      "High-performance websites and landing pages engineered for speed, accessibility, and conversion. We build on modern stacks that scale with your business.",
  },
  {
    title: "SEO Services",
    href: "/locations/karachi/seo-services",
    description:
      "Technical audits, on-page optimisation, and authority-building link strategies designed to earn long-term organic visibility in competitive search results.",
  },
  {
    title: "Social Media Marketing",
    href: "/locations/karachi/social-media-marketing",
    description:
      "Content planning, community management, and paid social campaigns that grow engaged audiences on the platforms where your customers already spend their time.",
  },
  {
    title: "Branding",
    href: "/locations/karachi/branding",
    description:
      "Visual identity, messaging frameworks, and brand guidelines that give your company a distinct, consistent presence across every customer touchpoint.",
  },
];

const reasons = [
  {
    title: "Local Market Knowledge",
    description:
      "Karachi is our home. We understand the purchasing behaviour, cultural nuances, and competitive dynamics that define this market — insight that no offshore team can replicate from a distance.",
  },
  {
    title: "Data-Driven Approach",
    description:
      "Every recommendation we make is grounded in analytics. We set clear KPIs before a campaign launches and report against them transparently so you always know what&apos;s working.",
  },
  {
    title: "Full-Service Capability",
    description:
      "SEO, paid ads, web development, branding, and social media under one roof. Integrated teams mean faster execution, consistent messaging, and fewer communication gaps.",
  },
  {
    title: "Transparent Reporting",
    description:
      "No vanity metrics, no black-box dashboards. You get access to real performance data with clear explanations of what the numbers mean for your bottom line.",
  },
];

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start by understanding your business model, target audience, competitive landscape, and current digital footprint. This phase defines what success looks like.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Based on the discovery findings, we build a channel-specific plan with timelines, budgets, and projected outcomes. Nothing launches without your sign-off.",
  },
  {
    number: "03",
    title: "Execution",
    description:
      "Our specialists implement across every agreed channel — from ad creative and landing pages to technical SEO fixes and content calendars — with weekly progress updates.",
  },
  {
    number: "04",
    title: "Optimisation",
    description:
      "Performance data feeds back into strategy. We run A/B tests, adjust bids, refine targeting, and iterate on creative to improve results month over month.",
  },
];

export default function KarachiPage() {
  return (
    <>
      <JsonLd data={schema} />

      {/* Breadcrumb */}
      <section className="bg-white pt-28 pb-4">
        <div className="mx-auto max-w-7xl px-6">
          <Breadcrumb
            items={[
              { label: "Locations", href: "/locations" },
              { label: "Karachi" },
            ]}
          />
        </div>
      </section>

      {/* Hero */}
      <section className="bg-white pt-12 pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Karachi, Pakistan</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-tight max-w-4xl mt-4">
              Digital Marketing Agency in Karachi
            </h1>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <p className="mt-6 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Karachi is Pakistan&apos;s economic engine — home to the country&apos;s
              largest consumer market, its busiest port, and a rapidly expanding
              digital economy. More businesses here are moving online every quarter,
              and the gap between companies that invest in digital marketing and
              those that don&apos;t is widening fast.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={300}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Markit Media is based in Karachi. We work with businesses across the
              city and beyond, combining deep local market understanding with
              international-standard execution in SEO, paid advertising, web
              development, branding, and social media marketing.
            </p>
          </Animate>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Our Services</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              What we do for businesses in Karachi
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Each service is available as a standalone engagement or as part of an
              integrated marketing programme. Click through for details specific to
              the Karachi market.
            </p>
          </Animate>

          <Stagger stagger={100} animation="fade-up" className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group rounded-2xl border border-gray-200 bg-white p-8 transition-shadow hover:shadow-lg"
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-black group-hover:underline">
                  {service.title}
                </h3>
                <p className="mt-3 text-base text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <span className="mt-5 inline-block text-base font-semibold text-black">
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why Markit Media */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              Why businesses in Karachi choose Markit Media
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Karachi&apos;s digital market moves quickly. Agencies that rely on
              templated strategies from other regions miss the local context that
              determines whether a campaign actually converts. Here&apos;s what sets
              our work apart.
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

      {/* Process / Approach */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Our Process</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              How we approach every engagement
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Repeatable process, customised execution. Whether you need a single
              channel or a full-funnel programme, the framework stays the same — it&apos;s
              the tactics inside each phase that adapt to your goals.
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
                <p className="mt-3 text-base text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Karachi Context */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div>
            <Animate animation="fade-right">
              <SectionLabel>The Karachi Opportunity</SectionLabel>
            </Animate>
            <Animate animation="fade-right" delay={100}>
              <SectionTitle>
                A digital economy that&apos;s accelerating
              </SectionTitle>
            </Animate>
          </div>
          <div>
            <Animate animation="fade-left" delay={150}>
              <p className="text-lg text-gray-700 leading-relaxed">
                Pakistan&apos;s internet penetration continues to climb, and Karachi
                leads that growth. Mobile-first consumers, expanding e-commerce
                infrastructure, and increasing comfort with online transactions mean
                that digital channels are no longer optional for businesses that want
                to stay competitive.
              </p>
            </Animate>
            <Animate animation="fade-left" delay={250}>
              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                Search volumes for local services grow year on year. Social platforms
                are where purchasing decisions begin. Paid media costs in Pakistan
                still offer significantly better unit economics than mature Western
                markets — but that window narrows as more advertisers enter the
                auction. The businesses that build their digital presence now will
                have a compounding advantage over those that wait.
              </p>
            </Animate>
            <Animate animation="fade-left" delay={350}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/services/seo"
                  className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
                >
                  SEO Services
                </Link>
                <Link
                  href="/services/performance-marketing"
                  className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
                >
                  Performance Marketing
                </Link>
                <Link
                  href="/services/website-development"
                  className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
                >
                  Web Development
                </Link>
                <Link
                  href="/services/branding"
                  className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
                >
                  Branding
                </Link>
                <Link
                  href="/services/social-media"
                  className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
                >
                  Social Media
                </Link>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Animate animation="scale-in">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-white tracking-tight leading-tight">
              Ready to grow your business in Karachi?
            </h2>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300 leading-relaxed">
              Tell us about your goals and we&apos;ll put together a tailored
              proposal — no obligation, no generic pitch decks. Just a clear plan
              built around your numbers.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={300}>
            <Link
              href="/contact"
              className="mt-10 inline-block rounded-full bg-white px-10 py-4 text-base font-bold text-black transition-opacity hover:opacity-90"
            >
              Get in Touch
            </Link>
          </Animate>
        </div>
      </section>
    </>
  );
}
