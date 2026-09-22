import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in New York — Markit Media",
  description:
    "Performance marketing, SEO, PPC, and web development for businesses in New York City. Markit Media delivers measurable growth across every digital channel.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/locations/united-states/new-york",
  },
  openGraph: {
    title: "Digital Marketing Agency in New York — Markit Media",
    description:
      "Performance marketing, SEO, PPC, and web development for businesses in New York City. Markit Media delivers measurable growth across every digital channel.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Markit Media",
  description:
    "Digital marketing agency serving businesses in New York City with performance marketing, SEO, PPC, web development, and branding.",
  areaServed: { "@type": "City", name: "New York" },
  url: "https://themarkitmedia.com/en/locations/united-states/new-york",
};

const services = [
  {
    title: "Performance Marketing",
    desc: "Google Ads and Meta Ads campaigns built for New York’s hyper-competitive auction landscape, where average CPCs in finance and legal regularly exceed $50. We structure accounts to maximize impression share without wasting budget on irrelevant borough-level traffic.",
  },
  {
    title: "SEO",
    desc: "Technical SEO, local pack optimization, and content strategy for a market where page-one rankings face competition from Fortune 500 headquarters, major publishers, and thousands of established local businesses all targeting the same keywords.",
  },
  {
    title: "Social Media Marketing",
    desc: "Paid and organic social campaigns calibrated for NYC audiences across Meta, TikTok, LinkedIn, and X. We tailor creative for the fast-scrolling, trend-aware New York demographic that expects polish and immediacy.",
  },
  {
    title: "Website Development",
    desc: "Fast, conversion-optimized sites on Next.js, WordPress, and Shopify built to handle the expectations of New York consumers who abandon slow pages in seconds. Mobile-first by default for a city that lives on its phones.",
  },
  {
    title: "Branding & Design",
    desc: "Brand identity systems that hold up against the visual noise of Manhattan storefronts, subway ads, and Instagram feeds. From logo design to full brand guidelines built for the NYC market.",
  },
  {
    title: "Video Production",
    desc: "Short-form video, motion graphics, and ad creative optimized for the platforms and attention spans that define New York’s media-saturated consumer base.",
  },
  {
    title: "Email Marketing",
    desc: "Automated sequences, segmented campaigns, and deliverability management for NYC businesses where inbox competition is fierce and open rates hinge on subject-line precision.",
  },
  {
    title: "Content Marketing",
    desc: "Long-form articles, thought leadership, and SEO content production tailored to the industries that define New York: finance, media, fashion, real estate, and professional services.",
  },
  {
    title: "AI Solutions",
    desc: "AI-powered chatbots, predictive lead scoring, and marketing automation workflows built to give New York businesses an operational edge over competitors still running manual processes.",
  },
];

const subPages = [
  {
    title: "Marketing Agency",
    href: "/locations/united-states/new-york/marketing-agency",
    desc: "Full-service marketing strategy and execution for NYC businesses.",
  },
  {
    title: "PPC & Paid Ads",
    href: "/locations/united-states/new-york/ppc-ads",
    desc: "Google Ads and Meta Ads management built for high-CPC New York auctions.",
  },
  {
    title: "Website Development",
    href: "/locations/united-states/new-york/website-development",
    desc: "Custom web development for businesses serving the New York market.",
  },
  {
    title: "SEO Services",
    href: "/locations/united-states/new-york/seo-services",
    desc: "Search engine optimization for competitive New York keywords.",
  },
];

const reasons = [
  {
    title: "Expert management of high-CPC auctions",
    desc: "New York has some of the most expensive cost-per-click rates in the country across finance, legal, real estate, and healthcare. Every dollar of ad spend needs to pull its weight. We build account structures and bidding strategies specifically designed to lower wasted spend in premium markets.",
  },
  {
    title: "Industry-specific knowledge across NYC verticals",
    desc: "Finance on Wall Street, media in Midtown, fashion in the Garment District, tech in Flatiron. Each of these industries has its own buying cycle, compliance requirements, and audience behavior. We tailor strategy to the vertical, not just the geography.",
  },
  {
    title: "Real-time optimization for a fast-moving market",
    desc: "Trends shift quickly in New York. A campaign that performed last week can underperform today if a competitor adjusts bids, a seasonal spike hits, or consumer sentiment changes. We monitor and adjust campaigns daily to keep performance on track.",
  },
  {
    title: "NYC-caliber execution without NYC agency overhead",
    desc: "Manhattan agency retainers often start at $15,000 per month before results. As a remote team, we deliver the same strategic depth and execution quality at a fraction of the cost, freeing budget for actual media spend where it drives returns.",
  },
];

const faq = [
  {
    q: "How do you manage campaigns in such a competitive market as NYC?",
    a: "We use granular audience segmentation, negative keyword layering, and dayparting strategies designed specifically for high-competition metros. In New York, broad targeting burns budget fast, so we focus on precision from day one and optimize based on real conversion data rather than vanity metrics.",
  },
  {
    q: "How do you handle New York’s high cost-per-click rates?",
    a: "High CPCs require tighter account structure, aggressive A/B testing of ad copy and landing pages, and bid strategies that prioritize conversion value over click volume. We also identify lower-competition long-tail opportunities within NYC verticals that many agencies overlook.",
  },
  {
    q: "Can you work across different industries in New York?",
    a: "Yes. We work with businesses in finance, professional services, fashion, real estate, hospitality, e-commerce, and more. Each industry in New York has distinct competitive dynamics, and we build strategies that account for those differences rather than applying a one-size-fits-all approach.",
  },
  {
    q: "How does a remote team effectively serve businesses in New York?",
    a: "We maintain overlap with Eastern Time working hours and communicate through the same tools any in-house team would use. Reporting, strategy calls, and campaign adjustments happen on your schedule. The result is the same hands-on service without the overhead of a Manhattan office built into your retainer.",
  },
];

export default function NewYorkPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
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
          { label: "New York" },
        ]}
      />

      {/* Hero */}
      <section aria-label="New York" className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>New York</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Digital Marketing Agency Serving Businesses in New York
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-3xl">
              New York City is the most competitive advertising market in the
              United States. Finance, media, fashion, and professional services
              all fight for the same digital real estate, driving CPCs well above
              national averages across every major platform. Cutting through that
              noise requires precision targeting, aggressive optimization, and
              strategy built for the pace of this city.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-3xl">
              Markit Media serves businesses in New York with full-stack digital
              marketing — from paid ads and SEO to web development and branding —
              delivering measurable growth without the overhead of a Manhattan
              agency retainer.
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

      {/* Services */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Services for businesses in New York"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionTitle>Services for the New York Market</SectionTitle>
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

      {/* Sub-pages */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="New York service pages"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore</SectionLabel>
            <SectionTitle>New York Service Pages</SectionTitle>
          </Animate>
          <Stagger
            stagger={80}
            animation="fade-up"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          >
            {subPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="bg-white border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none block"
              >
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black uppercase tracking-wide mb-2">
                  {page.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  {page.desc}
                </p>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why Markit Media */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why businesses in New York choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Businesses in New York Choose Markit Media
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

      {/* FAQ */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="FAQ">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Common Questions</SectionTitle>
          </Animate>
          <div className="mt-10">
            {faq.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <details className="group border-b border-gray-200">
                  <summary className="flex justify-between items-center py-5 cursor-pointer text-base font-bold text-black list-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                    {item.q}
                    <span
                      className="text-xl text-gray-500 group-open:rotate-45 transition-transform motion-reduce:transition-none flex-shrink-0 ml-4"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <div className="pb-5 text-base text-gray-500 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Grow Your Business in New York?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a performance marketing strategy designed for
              the most competitive market in the country.
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
