import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Marketing Agency in Dallas — Markit Media",
  description:
    "Full-service marketing agency for Dallas businesses. Strategy, paid media, SEO, and web development for the DFW metroplex — serving telecom, corporate headquarters, defense, fintech, and real estate sectors.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/dallas/marketing-agency",
  },
  openGraph: {
    title: "Marketing Agency in Dallas — Markit Media",
    description:
      "Full-service marketing agency for Dallas businesses. Strategy, paid media, SEO, and web development for the DFW metroplex — serving telecom, corporate headquarters, defense, fintech, and real estate sectors.",
  },
};

const serviceItems = [
  {
    title: "Marketing Strategy",
    desc: "Competitive analysis, audience research, and channel planning tailored to the DFW metroplex — where corporate relocations, telecom growth, and a booming real estate market create high-value opportunities across multiple industries.",
  },
  {
    title: "Paid Media Management",
    desc: "Google Ads, Meta Ads, and LinkedIn campaigns structured for Dallas's mix of corporate B2B and fast-growing consumer markets — from Fortune 500 headquarters in Uptown to fintech startups along the telecom corridor.",
  },
  {
    title: "Search Engine Optimization",
    desc: "Technical audits, keyword strategy, and content production built to capture organic demand across the DFW metroplex — a market where corporate relocations constantly shift the competitive landscape.",
  },
  {
    title: "Social Media Marketing",
    desc: "Content strategy, community management, and paid social campaigns across LinkedIn, Instagram, and Meta — calibrated for Dallas's concentration of corporate decision-makers and its growing consumer economy.",
  },
  {
    title: "Web Design & Development",
    desc: "WordPress, Shopify, and custom Next.js builds that load fast, convert visitors, and meet the expectations of Dallas's corporate and professional services audiences — where first impressions drive six- and seven-figure decisions.",
  },
  {
    title: "Analytics & Reporting",
    desc: "Custom dashboards, conversion tracking, and attribution modeling that connect marketing activity to pipeline and revenue — giving Dallas businesses the clarity to allocate budgets across a sprawling, multi-channel market.",
  },
];

const reasons = [
  {
    title: "Built for the DFW metroplex economy",
    desc: "Dallas-Fort Worth is the fourth-largest metro in the country, with a diverse economy spanning telecom, defense, fintech, logistics, and corporate headquarters. We build marketing strategies that account for this breadth — reaching the right industries and decision-makers without wasting spend on audiences that don't convert.",
  },
  {
    title: "Coordinated execution across every channel",
    desc: "Businesses competing in the DFW market need campaigns that work together — paid search reinforcing SEO, social supporting brand, and web experiences converting the traffic those channels generate. We manage all of it under one strategy so nothing falls through the cracks.",
  },
  {
    title: "Performance measured in revenue, not activity",
    desc: "We tie every campaign to business outcomes you can track — pipeline generated, deals influenced, cost per acquisition. In a market as competitive as Dallas, marketing that cannot demonstrate ROI is marketing that gets cut.",
  },
  {
    title: "Scaled for a metro of 8 million people",
    desc: "The DFW metroplex is massive — geographically and economically. We use data-driven targeting and continuous optimization to help businesses reach the right segments of this market without the cost inefficiency that comes from undisciplined campaigns in a large metro.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Market Analysis",
    desc: "We audit your current marketing, analyze your competitive landscape in Dallas-Fort Worth, and identify the channels and tactics most likely to move the needle for your specific industry and audience within the metroplex.",
  },
  {
    step: "02",
    title: "Strategy & Roadmap",
    desc: "We deliver a channel-by-channel plan with clear priorities, budgets, timelines, and KPIs — built around the realities of marketing in a metro where corporate headquarters, defense contractors, and fintech firms are all competing for attention.",
  },
  {
    step: "03",
    title: "Execution & Launch",
    desc: "Our team builds and launches campaigns across your chosen channels — ad creative, landing pages, SEO content, and social assets — all coordinated under a single strategy designed for the DFW market.",
  },
  {
    step: "04",
    title: "Optimization & Growth",
    desc: "We monitor performance continuously, run structured tests, reallocate budget toward what converts, and scale winning campaigns — adapting as Dallas's fast-growing economy introduces new competitors and opportunities.",
  },
];

const faqItems = [
  {
    q: "Do you work with businesses across the whole DFW metroplex, or just Dallas proper?",
    a: "We work with businesses throughout the Dallas-Fort Worth metroplex, including Fort Worth, Plano, Frisco, and Arlington, not only Dallas proper. A metroplex-wide strategy accounts for how audiences, competition, and search behavior differ across these areas.",
  },
  {
    q: "We just relocated our headquarters to Dallas — can you help us build local market presence?",
    a: "Yes. Corporate relocations are common in the DFW market, and we help newly arrived companies establish local visibility, from Texas-focused messaging to the digital presence customers and partners expect from a Dallas business.",
  },
  {
    q: "How do you approach marketing for real estate and property-related businesses in Dallas?",
    a: "Dallas real estate moves quickly, so we build campaigns and content around timely local demand, including buyer and renter search behavior, neighborhood-level positioning, and messaging suited to the pace of the market.",
  },
  {
    q: "Our industry doesn't fit a typical Dallas marketing mold — can you still help?",
    a: "Yes. The DFW economy spans telecom, defense, fintech, logistics, and corporate services, among other industries, so we build strategy around your specific audience rather than applying a generic template.",
  },
];

export default function DallasMarketingAgencyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "Full-service marketing agency for Dallas businesses. Strategy, paid media, SEO, and web development for the DFW metroplex — serving telecom, corporate headquarters, defense, fintech, and real estate sectors.",
    areaServed: { "@type": "City", name: "Dallas" },
    url: "https://themarkitmedia.com/en/locations/united-states/dallas/marketing-agency",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <article>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "United States", href: "/locations/united-states" },
          { label: "Dallas", href: "/locations/united-states/dallas" },
          { label: "Marketing Agency" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Dallas</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              Marketing Agency Serving Businesses in Dallas
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Dallas sits at the center of the fourth-largest metro in the
              United States — a market shaped by corporate headquarters
              relocations, one of the densest telecom corridors in the country,
              and rapid growth in defense, fintech, and real estate. Marketing
              here means reaching decision-makers across industries that are
              scaling fast and competing for the same talent, capital, and
              customers.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media serves Dallas businesses with full-service marketing
              &mdash; strategy, execution, and performance analytics &mdash;
              built to generate pipeline in one of the most dynamic metros in
              the country.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Get a Free Consultation &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Service Details */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Marketing services for Dallas businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>Full-Service Marketing for Dallas</SectionTitle>
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

      {/* Why Markit Media */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why Dallas businesses choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Dallas Businesses Choose Markit Media for Marketing
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
        aria-label="Our marketing process"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Process</SectionLabel>
            <SectionTitle>How We Work With Dallas Clients</SectionTitle>
          </Animate>
          <div className="mt-12 space-y-8">
            {processSteps.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 80}>
                <div className="flex items-start gap-6">
                  <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black flex-shrink-0 w-12">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black">
                      {item.title}
                    </h3>
                    <p className="text-base text-gray-500 leading-relaxed mt-2">
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
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Related services"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore More</SectionLabel>
            <SectionTitle>Related Services</SectionTitle>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          >
            <Link
              href="/locations/united-states/dallas/ppc-ads"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                PPC Ads
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Paid media campaigns built for measurable ROI in DFW.
              </p>
            </Link>
            <Link
              href="/locations/united-states/dallas/seo-services"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                SEO Services
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Organic search visibility for Dallas businesses.
              </p>
            </Link>
            <Link
              href="/locations/united-states/dallas/website-development"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Website Development
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Fast, conversion-focused sites for the Dallas market.
              </p>
            </Link>
            <Link
              href="/services/branding"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Branding
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Visual identity and brand strategy for competitive markets.
              </p>
            </Link>
          </Stagger>
          <Animate animation="fade-up" delay={200}>
            <div className="mt-8">
              <Link
                href="/locations/united-states/dallas"
                className="text-base font-bold text-black underline underline-offset-4 hover:text-gray-600 transition-colors"
              >
                View all Dallas services &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-12 py-20" aria-label="Frequently asked questions">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>
              Frequently Asked Questions About Marketing Agency Services in
              Dallas
            </SectionTitle>
          </Animate>
          <div className="mt-10 space-y-6">
            {faqItems.map((faq, i) => (
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
              Ready to Compete in Dallas?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that drives real results in
              one of the fastest-growing metros in the country.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
