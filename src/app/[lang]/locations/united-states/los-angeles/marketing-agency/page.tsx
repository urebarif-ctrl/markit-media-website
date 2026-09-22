import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Marketing Agency in Los Angeles — Markit Media",
  description:
    "Full-service marketing agency serving businesses in Los Angeles. Strategy, execution, and optimization across paid media, SEO, social, branding, and web — built for LA's creative, entertainment-driven market.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/los-angeles/marketing-agency",
  },
  openGraph: {
    title: "Marketing Agency in Los Angeles — Markit Media",
    description:
      "Full-service marketing agency serving businesses in Los Angeles. Strategy, execution, and optimization across paid media, SEO, social, branding, and web.",
  },
};

const serviceItems = [
  {
    title: "Paid Media Management",
    desc: "Google Ads, Meta Ads, TikTok Ads, and programmatic campaigns built around the high-CPM verticals that define the LA advertising landscape — entertainment, fashion, and direct-to-consumer brands.",
  },
  {
    title: "Search Engine Optimization",
    desc: "Technical audits, keyword strategy, content production, and link acquisition tailored to the enormous local and national search volume that Los Angeles businesses compete for.",
  },
  {
    title: "Social Media Strategy & Execution",
    desc: "Platform-specific content planning, community management, influencer coordination, and paid social — designed for a market where social proof and visual storytelling drive purchasing decisions.",
  },
  {
    title: "Brand Identity & Design",
    desc: "Logo systems, visual identity, brand guidelines, packaging, and creative direction that meet the design-forward expectations of the LA consumer base.",
  },
  {
    title: "Website Development",
    desc: "WordPress, Shopify, and Next.js builds optimized for speed, conversion, and mobile-first audiences — because LA visitors abandon slow, dated sites faster than most markets.",
  },
  {
    title: "Content & Email Marketing",
    desc: "Blog content, email automation, campaign copywriting, and lifecycle sequences that keep your brand top-of-mind in one of the most attention-competitive cities in the world.",
  },
];

const reasons = [
  {
    title: "Built for entertainment and lifestyle brands",
    desc: "Los Angeles is home to some of the most recognizable brands in entertainment, fashion, beauty, and wellness. We understand the visual standards, audience expectations, and campaign cadences that these industries demand — and we build marketing programs that match.",
  },
  {
    title: "Data-driven in a trend-driven market",
    desc: "LA moves fast. Trends cycle through influencer culture, pop culture, and e-commerce at a pace that gut-feel marketing cannot keep up with. We combine real-time analytics with structured testing so your campaigns respond to what the data says, not what feels right this week.",
  },
  {
    title: "Full-stack execution, no outsourcing chain",
    desc: "Every channel — paid search, organic, social, email, web — is handled by our team. There is no subcontractor daisy-chain. That means faster turnaround, consistent quality, and a single point of accountability for results.",
  },
  {
    title: "Remote delivery, LA-market focus",
    desc: "We serve businesses in Los Angeles without the overhead of a local office. You get the same strategic depth and hands-on execution, with the flexibility and cost efficiency that remote delivery provides.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Audit",
    desc: "We start by reviewing your current marketing stack, competitive positioning, and analytics. For LA businesses, this includes benchmarking against the specific verticals and search behaviors that define your local market.",
  },
  {
    step: "02",
    title: "Strategy & Roadmap",
    desc: "Based on the audit, we build a channel-by-channel plan with clear priorities, timelines, and KPIs. Every recommendation ties back to a measurable business outcome — traffic, leads, revenue, or brand reach.",
  },
  {
    step: "03",
    title: "Execution & Optimization",
    desc: "Campaigns go live across your chosen channels. We manage creative production, media buying, content publishing, and technical implementation — then optimize weekly based on performance data.",
  },
  {
    step: "04",
    title: "Reporting & Iteration",
    desc: "Monthly reporting covers what moved, what didn't, and what we're changing next. No vanity metrics. Every report connects activity to the KPIs we agreed on at the start.",
  },
];

export default function LosAngelesMarketingAgencyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "Full-service marketing agency serving businesses in Los Angeles. Strategy, paid media, SEO, social media, branding, and web development.",
    areaServed: { "@type": "City", name: "Los Angeles" },
    url: "https://themarkitmedia.com/en/locations/united-states/los-angeles/marketing-agency",
  };

  const faqs = [
    {
      q: "Do you have experience marketing to the entertainment and media industry in Los Angeles?",
      a: "Yes. LA's entertainment and media sector has its own visual standards, audience expectations, and campaign cadence. We build marketing programs that reflect those industry norms rather than applying a generic playbook.",
    },
    {
      q: "Can you help lifestyle and consumer brands based in LA?",
      a: "Lifestyle, fashion, beauty, and wellness brands are a core part of who we work with in Los Angeles. We build campaigns around the visual storytelling and social proof that drive purchasing decisions in these categories.",
    },
    {
      q: "Do you only work with clients physically located in Los Angeles, or across the West Coast?",
      a: "We serve businesses based in Los Angeles as well as other West Coast markets. Our delivery is remote, so location within the region does not limit the level of strategic or hands-on support you receive.",
    },
    {
      q: "How do you approach marketing to LA's multicultural audiences?",
      a: "Los Angeles has one of the most diverse populations in the country, and effective marketing here accounts for that diversity in messaging, channel selection, and creative. We factor audience makeup into strategy rather than treating LA as a single homogenous market.",
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
          { label: "Marketing Agency" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Los Angeles</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              Marketing Agency Serving Businesses in Los Angeles
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Los Angeles is one of the most competitive and visually demanding
              markets in the country. From entertainment and e-commerce to
              lifestyle brands and tech startups, LA businesses need marketing
              that combines sharp creative with relentless optimization. We
              deliver both.
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
        aria-label="Marketing services for Los Angeles"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>
              Full-Service Marketing for the LA Market
            </SectionTitle>
            <p className="text-base text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Every engagement is tailored to your goals, but these are the core
              capabilities we bring to Los Angeles businesses. Each service can
              run independently or as part of an integrated program.
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

      {/* Why LA Businesses Choose Markit Media */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why Los Angeles businesses choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Los Angeles Businesses Choose Markit Media for Marketing
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
        aria-label="Our process"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Process</SectionLabel>
            <SectionTitle>
              How We Work with LA Businesses
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
              href="/services/performance-marketing"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <span className="text-base font-bold text-black">
                Performance Marketing
              </span>
              <p className="text-base text-gray-500 mt-1">
                Paid campaigns across Google, Meta, and more.
              </p>
            </Link>
            <Link
              href="/services/seo"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <span className="text-base font-bold text-black">SEO</span>
              <p className="text-base text-gray-500 mt-1">
                Organic search strategy and execution.
              </p>
            </Link>
            <Link
              href="/services/social-media"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <span className="text-base font-bold text-black">
                Social Media
              </span>
              <p className="text-base text-gray-500 mt-1">
                Content, community, and paid social campaigns.
              </p>
            </Link>
            <Link
              href="/services/branding"
              className="block border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <span className="text-base font-bold text-black">Branding</span>
              <p className="text-base text-gray-500 mt-1">
                Identity, design systems, and brand strategy.
              </p>
            </Link>
          </Stagger>
          <Animate animation="fade-up" delay={300}>
            <div className="mt-6">
              <Link
                href="/locations/united-states/los-angeles"
                className="text-base font-bold text-black underline underline-offset-4 hover:text-gray-600 transition-colors"
              >
                View all services in Los Angeles &rarr;
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
              Frequently Asked Questions About Marketing Agency Services in Los Angeles
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
              Ready to Grow Your Business in Los Angeles?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s talk about what a full-service marketing partner can do
              for your brand in the LA market.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
