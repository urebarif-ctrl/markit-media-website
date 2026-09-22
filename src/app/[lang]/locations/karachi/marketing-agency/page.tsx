import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Marketing Agency in Karachi — Markit Media",
  description:
    "Full-service marketing agency in Karachi delivering strategy, execution, and measurable growth. Markit Media understands Karachi’s business landscape from the inside — because we operate in it every day.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/locations/karachi/marketing-agency",
  },
  openGraph: {
    title: "Marketing Agency in Karachi — Markit Media",
    description:
      "Full-service marketing agency in Karachi delivering strategy, execution, and measurable growth. Markit Media understands Karachi’s business landscape from the inside.",
  },
};

const services = [
  {
    title: "Brand Strategy",
    desc: "Positioning, messaging frameworks, and competitive differentiation that give your brand a clear identity in a crowded Karachi marketplace. We define who you are before we decide where to show up.",
  },
  {
    title: "Digital Advertising",
    desc: "Google Ads, Meta Ads, and programmatic campaigns built around local search behaviour, regional audience segments, and budget efficiency — not global templates that ignore how Karachi consumers actually discover products.",
  },
  {
    title: "Content Marketing",
    desc: "Blog content, video scripts, social copy, and long-form assets that speak to local audiences. Every piece ties back to a documented content calendar and measurable KPIs.",
  },
  {
    title: "Analytics & Reporting",
    desc: "Dashboards and monthly performance reports that translate raw data into decisions. We track acquisition cost, conversion paths, and revenue attribution so you always know what is working.",
  },
  {
    title: "Market Research",
    desc: "Competitor audits, audience surveys, and demand mapping specific to Karachi&apos;s industry verticals. We identify gaps before committing budget to channels that might not fit your segment.",
  },
  {
    title: "Campaign Management",
    desc: "End-to-end ownership of multi-channel campaigns — from creative production through launch, optimisation, and post-campaign analysis. One team, one timeline, no hand-off gaps.",
  },
];

const reasons = [
  {
    title: "We operate inside the market we serve",
    desc: "Karachi is not a pin on our expansion map — it is where Markit Media is based. We understand the city&apos;s commercial rhythms, seasonal demand shifts, and the practical realities of running campaigns here because we live them.",
  },
  {
    title: "An integrated approach, not isolated services",
    desc: "Brand strategy informs ad creative, which feeds content, which generates data for the next round of optimisation. When everything runs through one agency, the feedback loop is shorter and the outcomes compound.",
  },
  {
    title: "Measurable outcomes over vanity metrics",
    desc: "We report on leads, revenue, and cost-per-acquisition — not impressions and reach alone. If a channel is not contributing to business goals, we reallocate budget instead of defending the spend.",
  },
  {
    title: "Agile execution at the pace Karachi demands",
    desc: "Market conditions in Karachi can shift quickly — new competitors, regulatory changes, seasonal surges. Our team is structured for fast turnarounds so your campaigns adapt in days, not quarters.",
  },
];

const steps = [
  {
    num: "01",
    title: "Audit & Research",
    desc: "We begin with a thorough review of your current marketing assets, analytics, competitor landscape, and audience data. The goal is to find what is already working and where the biggest gaps are before any strategy is written.",
  },
  {
    num: "02",
    title: "Strategy Development",
    desc: "Based on audit findings, we build a documented marketing plan: channel mix, messaging direction, budget allocation, content themes, and a timeline. Everything is tied to specific business objectives and KPIs you approve.",
  },
  {
    num: "03",
    title: "Multi-Channel Execution",
    desc: "We launch across the agreed channels simultaneously — paid ads, organic content, SEO improvements, email sequences — with a single team managing creative, copy, and media buying. No silos, no coordination delays.",
  },
  {
    num: "04",
    title: "Performance Review",
    desc: "Monthly reviews cover what hit target, what did not, and exactly what we are changing next. Reports are plain-language, not data dumps. You see the numbers, the analysis, and the next set of actions in one document.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Markit Media",
  description:
    "Full-service marketing agency in Karachi delivering strategy, execution, and measurable growth for local businesses.",
  areaServed: { "@type": "City", name: "Karachi" },
  url: "https://themarkitmedia.com/en/locations/karachi/marketing-agency",
};

export default function KarachiMarketingAgencyPage() {
  return (
    <article>
      <JsonLd data={schema} />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Locations", href: "/locations" },
          { label: "Karachi", href: "/locations/karachi" },
          { label: "Marketing Agency" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Karachi" className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Karachi</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              Marketing Agency in Karachi
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Karachi is Pakistan&apos;s largest commercial centre — home to
              thousands of businesses competing for the same audiences across
              digital and traditional channels. Markit Media provides
              full-service marketing from inside the city: strategy, creative
              execution, paid media, and ongoing performance management under one
              roof.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              We work with businesses that need more than a single-channel vendor.
              If you need a cohesive marketing operation that connects brand
              positioning to ad spend to content to reporting, that is what we
              build.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Start a Conversation &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Services Grid */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Marketing services in Karachi"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Deliver</SectionLabel>
            <SectionTitle>Full-Service Marketing Capabilities</SectionTitle>
            <p className="text-base text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Every service below is available as part of an integrated
              engagement or as a standalone capability. Most clients start with
              two or three and expand as results justify additional investment.
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
          <Animate animation="fade-up" delay={100}>
            <div className="flex flex-wrap gap-6 mt-10 text-base font-bold">
              <Link
                href="/services/seo"
                className="text-black underline underline-offset-4 hover:no-underline transition-all"
              >
                SEO Services
              </Link>
              <Link
                href="/services/performance-marketing"
                className="text-black underline underline-offset-4 hover:no-underline transition-all"
              >
                Performance Marketing
              </Link>
              <Link
                href="/services/branding"
                className="text-black underline underline-offset-4 hover:no-underline transition-all"
              >
                Branding
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Why Businesses Choose Markit Media */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why businesses in Karachi choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Businesses in Karachi Choose Markit Media
            </SectionTitle>
            <p className="text-base text-gray-500 leading-relaxed mt-4">
              Karachi&apos;s marketing landscape is dense with freelancers,
              boutique studios, and offshore teams. Choosing the right partner
              comes down to who understands your market at ground level and can
              execute across every channel without dropping context between
              hand-offs.
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
        aria-label="Our marketing process"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>How We Work</SectionLabel>
            <SectionTitle>From Research to Results</SectionTitle>
            <p className="text-base text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Every engagement follows the same four-phase structure. It keeps
              expectations clear, timelines predictable, and gives you a review
              point before any major spend is committed.
            </p>
          </Animate>
          <Stagger
            stagger={80}
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
          >
            {steps.map((step) => (
              <div key={step.num} className="relative">
                <span className="font-[family-name:var(--font-display)] text-5xl font-extrabold text-black/10 leading-none">
                  {step.num}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mt-2">
                  {step.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed mt-2">
                  {step.desc}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Karachi Context */}
      <section className="px-6 lg:px-12 py-20" aria-label="Karachi market context">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Local Perspective</SectionLabel>
            <SectionTitle>Marketing in Karachi&apos;s Reality</SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <div className="mt-8 space-y-5 text-base text-gray-500 leading-relaxed">
              <p>
                Karachi is a city of contrasts — global brands share shelf space
                with neighbourhood retailers, and consumer behaviour varies
                sharply between areas like Clifton, North Nazimabad, and Korangi.
                A marketing strategy that treats the city as a single block will
                underperform.
              </p>
              <p>
                Digital adoption is accelerating. More businesses are competing
                for attention on Google, Instagram, and TikTok, which means ad
                costs are rising and organic reach is shrinking. Competing
                effectively now requires a deliberate strategy — not just
                boosting posts or running ads without a funnel behind them.
              </p>
              <p>
                This is where a Karachi-based agency has an edge over remote
                teams. We see how local consumers respond to different messaging
                angles, we know which platforms dominate which demographics in
                this city, and we can iterate creative based on real-time market
                feedback — not assumptions built from case studies in other
                countries.
              </p>
              <p>
                Whether you are a startup trying to build initial traction, an
                established business entering a new product category, or a
                service provider that needs a steady pipeline of qualified leads,
                the fundamentals are the same: clear positioning, the right
                channels, strong creative, and disciplined measurement.
              </p>
            </div>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <div className="mt-8">
              <Link
                href="/locations/karachi"
                className="text-base font-bold text-black underline underline-offset-4 hover:no-underline transition-all"
              >
                Explore all Markit Media services in Karachi &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Build a Marketing Engine That Delivers?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Tell us what you&apos;re working toward. We&apos;ll outline how
              Markit Media can help you get there — with a clear scope, timeline,
              and measurable targets.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get in Touch &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
