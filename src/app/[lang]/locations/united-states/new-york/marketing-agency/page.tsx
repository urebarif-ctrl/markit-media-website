import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Marketing Agency in New York — Markit Media",
  description:
    "Full-service marketing agency serving businesses in New York. Strategy, execution, and analytics across paid media, SEO, social, web development, and branding.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/new-york/marketing-agency",
  },
  openGraph: {
    title: "Marketing Agency in New York — Markit Media",
    description:
      "Full-service marketing agency serving businesses in New York. Strategy, execution, and analytics across paid media, SEO, social, web development, and branding.",
  },
};

const serviceItems = [
  {
    title: "Marketing Strategy",
    desc: "Market analysis, competitor research, audience segmentation, and channel planning built around your business objectives and the realities of the New York market.",
  },
  {
    title: "Paid Media Management",
    desc: "Google Ads, Meta Ads, LinkedIn Ads, and programmatic campaigns managed with a focus on efficient spend and measurable return in a high-CPC environment.",
  },
  {
    title: "Search Engine Optimization",
    desc: "Technical audits, keyword strategy, content production, and link acquisition to build organic visibility against aggressive New York competitors.",
  },
  {
    title: "Social Media Marketing",
    desc: "Content calendars, community engagement, influencer coordination, and paid social campaigns across Instagram, TikTok, LinkedIn, and X.",
  },
  {
    title: "Web Design & Development",
    desc: "WordPress, Shopify, and custom Next.js builds designed to meet the high visual and performance standards New York audiences expect.",
  },
  {
    title: "Analytics & Reporting",
    desc: "Custom dashboards, conversion tracking, attribution modeling, and monthly performance reviews so you always know what&apos;s working and what needs adjustment.",
  },
];

const reasons = [
  {
    title: "Full-stack execution, not just advice",
    desc: "New York businesses need agencies that do the work, not just present decks. We handle strategy and execution end to end — from campaign architecture to creative production to ongoing optimization.",
  },
  {
    title: "Built for competitive markets",
    desc: "The New York advertising landscape is one of the most expensive and saturated in the country. Our approach prioritizes efficiency: precise targeting, disciplined budgets, and continuous testing to maximize every dollar.",
  },
  {
    title: "Cross-channel coordination",
    desc: "Your customers in New York move between Google, social media, email, and your website constantly. We build integrated campaigns where each channel reinforces the others rather than operating in isolation.",
  },
  {
    title: "Transparent performance data",
    desc: "You get access to real numbers — cost per acquisition, return on ad spend, organic traffic growth, conversion rates — with context that explains what they mean for your business.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Audit",
    desc: "We review your current marketing efforts, analyze your competitive landscape in New York, and identify the highest-impact opportunities for growth.",
  },
  {
    step: "02",
    title: "Strategy Development",
    desc: "Based on the audit, we build a channel strategy with clear priorities, budgets, timelines, and KPIs tailored to your industry and the New York market.",
  },
  {
    step: "03",
    title: "Execution & Launch",
    desc: "Our team builds and launches campaigns across your chosen channels — ad creative, landing pages, SEO content, social posts — all coordinated under one strategy.",
  },
  {
    step: "04",
    title: "Optimization & Scaling",
    desc: "We monitor performance daily, run A/B tests, reallocate budget toward what works, and scale winning campaigns while cutting underperformers.",
  },
];

export default function NewYorkMarketingAgencyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Markit Media",
    description:
      "Full-service marketing agency serving businesses in New York. Strategy, execution, and analytics across paid media, SEO, social media, web development, and branding.",
    areaServed: { "@type": "City", name: "New York" },
    url: "https://themarkitmedia.com/en/locations/united-states/new-york/marketing-agency",
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
                name: "How competitive is the New York marketing landscape?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "New York is home to some of the most sophisticated and well-funded marketing operations in the country, spanning finance, media, retail, and technology. Businesses here compete not just locally but against national brands headquartered in the city, which raises the bar for creative quality, targeting precision, and execution speed.",
                },
              },
              {
                "@type": "Question",
                name: "Do you market differently for Manhattan versus the outer boroughs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Manhattan audiences, foot traffic patterns, and price sensitivity differ meaningfully from Brooklyn, Queens, the Bronx, and Staten Island. We tailor targeting, messaging, and channel mix to where your customers actually are, rather than treating New York as a single undifferentiated market.",
                },
              },
              {
                "@type": "Question",
                name: "How much does marketing cost in New York compared to other cities?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Marketing costs in New York, including media spend and production, tend to run higher than in most other U.S. markets due to competition for attention and ad inventory. We work with businesses to build budgets that reflect this reality while prioritizing efficiency over simply outspending competitors.",
                },
              },
              {
                "@type": "Question",
                name: "How long does it take to see results from marketing in New York?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Timelines vary by channel and industry. Paid media can show measurable results within weeks, while organic strategies like SEO and content typically take longer to build traction given how saturated the New York market is. We set realistic timelines during the strategy phase, so you know what to expect at each stage.",
                },
              },
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "United States", href: "/locations/united-states" },
          { label: "New York", href: "/locations/united-states/new-york" },
          { label: "Marketing Agency" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>New York</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              Marketing Agency Serving Businesses in New York
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              New York is one of the most competitive business environments in the
              world. Standing out here takes more than a good product — it takes a
              marketing partner that understands how to drive real results across
              every channel, from paid search to organic growth.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media serves New York businesses with full-service marketing —
              strategy, execution, and performance analytics — built to deliver ROI,
              not just impressions.
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
        aria-label="Marketing services for New York businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What&apos;s Included</SectionLabel>
            <SectionTitle>Full-Service Marketing for New York</SectionTitle>
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
        aria-label="Why New York businesses choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why New York Businesses Choose Markit Media for Marketing
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
            <SectionTitle>How We Work With New York Clients</SectionTitle>
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
                href="/locations/united-states/new-york"
                className="text-base font-bold text-black underline underline-offset-4 hover:text-gray-600 transition-colors"
              >
                View all New York services &rarr;
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
              Frequently Asked Questions About Marketing Agency Services in New York
            </SectionTitle>
          </Animate>
          <div className="mt-10 space-y-6">
            {[
              {
                q: "How competitive is the New York marketing landscape?",
                a: "New York is home to some of the most sophisticated and well-funded marketing operations in the country, spanning finance, media, retail, and technology. Businesses here compete not just locally but against national brands headquartered in the city, which raises the bar for creative quality, targeting precision, and execution speed.",
              },
              {
                q: "Do you market differently for Manhattan versus the outer boroughs?",
                a: "Yes. Manhattan audiences, foot traffic patterns, and price sensitivity differ meaningfully from Brooklyn, Queens, the Bronx, and Staten Island. We tailor targeting, messaging, and channel mix to where your customers actually are, rather than treating New York as a single undifferentiated market.",
              },
              {
                q: "How much does marketing cost in New York compared to other cities?",
                a: "Marketing costs in New York, including media spend and production, tend to run higher than in most other U.S. markets due to competition for attention and ad inventory. We work with businesses to build budgets that reflect this reality while prioritizing efficiency over simply outspending competitors.",
              },
              {
                q: "How long does it take to see results from marketing in New York?",
                a: "Timelines vary by channel and industry. Paid media can show measurable results within weeks, while organic strategies like SEO and content typically take longer to build traction given how saturated the New York market is. We set realistic timelines during the strategy phase, so you know what to expect at each stage.",
              },
            ].map((faq, i) => (
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
              Ready to Compete in New York?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that delivers results in one of
              the toughest markets in the country.
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
