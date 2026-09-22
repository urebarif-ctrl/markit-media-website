import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Marketing Agency in Houston — Markit Media",
  description:
    "Full-service marketing agency for Houston businesses. Data-driven strategy, cross-channel execution, and performance analytics for energy, healthcare, real estate, and professional services.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/houston/marketing-agency",
  },
  openGraph: {
    title: "Marketing Agency in Houston — Markit Media",
    description:
      "Full-service marketing agency for Houston businesses. Data-driven strategy, cross-channel execution, and performance analytics for energy, healthcare, real estate, and professional services.",
  },
};

const serviceItems = [
  {
    title: "Marketing Strategy",
    desc: "Competitive analysis, audience research, and channel planning tailored to Houston’s key sectors — energy, healthcare, real estate, and professional services — so every dollar targets the right opportunity.",
  },
  {
    title: "Paid Media Management",
    desc: "Google Ads, Meta Ads, and LinkedIn campaigns structured for Houston’s B2B-heavy market, where long sales cycles and high-value contracts demand precision targeting and disciplined budget allocation.",
  },
  {
    title: "Search Engine Optimization",
    desc: "Technical audits, keyword strategy, and content production built to capture organic demand across Houston’s fast-growing industries and outrank entrenched local competitors.",
  },
  {
    title: "Social Media Marketing",
    desc: "Content strategy, community management, and paid social campaigns across LinkedIn, Instagram, and Meta — calibrated for Houston’s mix of corporate and consumer audiences.",
  },
  {
    title: "Web Design & Development",
    desc: "WordPress, Shopify, and custom Next.js builds that load fast, convert visitors, and reflect the professionalism Houston’s energy and medical sectors expect from their partners.",
  },
  {
    title: "Analytics & Reporting",
    desc: "Custom dashboards, conversion tracking, and attribution modeling that connect marketing activity to pipeline and revenue — not just clicks and impressions.",
  },
];

const reasons = [
  {
    title: "Industry depth across Houston’s core sectors",
    desc: "Houston’s economy runs on energy, healthcare, logistics, and real estate. We build marketing strategies that speak the language of these industries — addressing the buying cycles, compliance considerations, and decision-making structures that generic agencies overlook.",
  },
  {
    title: "Execution across every channel, under one roof",
    desc: "Houston businesses operating in competitive B2B verticals need coordinated campaigns, not a different vendor for each channel. We handle paid media, SEO, social, and web development together so nothing falls through the cracks.",
  },
  {
    title: "Performance-first, not activity-first",
    desc: "We measure success by pipeline generated and revenue influenced, not by deliverables produced. Every campaign we run is tied to a business outcome you can track in your CRM.",
  },
  {
    title: "Built for a 7-million-person metro",
    desc: "Houston’s metro population means large addressable audiences but also fierce competition for attention. We use data-driven targeting and continuous optimization to help you stand out without overspending.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Market Analysis",
    desc: "We audit your current marketing, analyze your competitive landscape in Houston, and identify the channels and tactics most likely to move the needle for your specific industry.",
  },
  {
    step: "02",
    title: "Strategy & Roadmap",
    desc: "We deliver a channel-by-channel plan with clear priorities, budgets, timelines, and KPIs — built around the realities of marketing in Houston’s high-competition sectors.",
  },
  {
    step: "03",
    title: "Execution & Launch",
    desc: "Our team builds and launches campaigns across your chosen channels — ad creative, landing pages, SEO content, and social assets — all coordinated under a single strategy.",
  },
  {
    step: "04",
    title: "Optimization & Growth",
    desc: "We monitor performance continuously, run structured tests, reallocate budget toward what converts, and scale winning campaigns while cutting underperformers.",
  },
];

const faqs = [
  {
    q: "Does Markit Media have experience marketing to Houston's energy and oil & gas sector?",
    a: "Yes. Houston is the energy capital of the world, and we build marketing strategies that account for the long sales cycles, technical audiences, and compliance considerations common in oil & gas and broader energy marketing.",
  },
  {
    q: "Can you market to healthcare providers around the Texas Medical Center?",
    a: "Yes. We work with healthcare and medical practice clients navigating the Texas Medical Center's competitive landscape, building campaigns that speak to both referring providers and patients.",
  },
  {
    q: "How does Markit Media handle marketing for a fast-growing metro like Houston?",
    a: "Houston's rapid growth means shifting neighborhoods, new developments, and an expanding population. We build targeting and messaging strategies that keep pace with the metro's growth rather than relying on static, outdated audience data.",
  },
  {
    q: "Do you offer bilingual marketing for Houston's Hispanic population?",
    a: "Yes. Houston has a large Hispanic population, and we develop bilingual marketing strategy and content so campaigns reach both English- and Spanish-speaking audiences effectively.",
  },
];

export default function HoustonMarketingAgencyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "Full-service marketing agency for Houston businesses. Data-driven strategy, cross-channel execution, and performance analytics for energy, healthcare, real estate, and professional services.",
    areaServed: { "@type": "City", name: "Houston" },
    url: "https://themarkitmedia.com/en/locations/united-states/houston/marketing-agency",
  };

  const faqSchema = {
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
          { label: "Houston", href: "/locations/united-states/houston" },
          { label: "Marketing Agency" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Houston</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              Marketing Agency Serving Businesses in Houston
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Houston is the energy capital of the world, home to the Texas
              Medical Center, and one of the fastest-growing metros in the
              country. Marketing here means reaching decision-makers across
              energy, healthcare, real estate, and professional services &mdash;
              industries where trust, expertise, and measurable results drive
              every buying decision.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media serves Houston businesses with full-service marketing
              &mdash; strategy, execution, and performance analytics &mdash;
              built to generate pipeline, not just traffic.
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
        aria-label="Marketing services for Houston businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>Full-Service Marketing for Houston</SectionTitle>
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
        aria-label="Why Houston businesses choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Houston Businesses Choose Markit Media for Marketing
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
            <SectionTitle>How We Work With Houston Clients</SectionTitle>
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
              href="/services/performance-marketing"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Performance Marketing
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Paid media campaigns built for measurable ROI.
              </p>
            </Link>
            <Link
              href="/services/seo"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                SEO
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Organic search visibility through technical and content SEO.
              </p>
            </Link>
            <Link
              href="/services/social-media"
              className="block border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
            >
              <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black">
                Social Media
              </h3>
              <p className="text-base text-gray-500 mt-2">
                Strategy, content, and paid campaigns across platforms.
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
                href="/locations/united-states/houston"
                className="text-base font-bold text-black underline underline-offset-4 hover:text-gray-600 transition-colors"
              >
                View all Houston services &rarr;
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
            <SectionTitle>Frequently Asked Questions About Marketing in Houston</SectionTitle>
          </Animate>
          <div className="mt-10 space-y-6">
            {faqs.map((faq, i) => (
              <Animate key={i} animation="fade-up" delay={i * 60}>
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black">{faq.q}</h3>
                  <p className="text-base text-gray-500 leading-relaxed mt-2">{faq.a}</p>
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
              Ready to Compete in Houston?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that drives real results in
              one of the largest and most competitive markets in the country.
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
