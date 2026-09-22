import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Dallas — Markit Media",
  description:
    "Performance marketing, SEO, PPC, and web development for businesses in Dallas. Digital strategies for corporate headquarters, financial services, and real estate in the DFW metroplex.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/locations/united-states/dallas",
  },
  openGraph: {
    title: "Digital Marketing Agency in Dallas — Markit Media",
    description:
      "Performance marketing, SEO, PPC, and web development for businesses in Dallas. Digital strategies for corporate headquarters, financial services, and real estate in the DFW metroplex.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Markit Media",
  description:
    "Digital marketing agency serving businesses in Dallas with performance marketing, SEO, PPC, web development, and branding.",
  areaServed: { "@type": "City", name: "Dallas" },
  url: "https://themarkitmedia.com/en/locations/united-states/dallas",
};

const services = [
  {
    title: "Performance Marketing",
    desc: "Google Ads and Meta Ads campaigns built for the DFW metroplex, where corporate headquarters and financial services firms drive above-average CPCs in B2B verticals. We structure ad accounts to reach decision-makers at Fortune 500 companies headquartered across North Texas.",
  },
  {
    title: "SEO",
    desc: "Technical SEO, local pack strategy, and content programs designed for Dallas's competitive search landscape. From Downtown to Uptown, Las Colinas to Plano, we target high-intent keywords where corporate, real estate, and professional services businesses compete for page-one visibility.",
  },
  {
    title: "Social Media Marketing",
    desc: "Paid and organic social campaigns across LinkedIn, Meta, TikTok, and X tailored to the Dallas business community. LinkedIn strategy is especially critical here given the concentration of C-suite executives and corporate decision-makers in the DFW corridor.",
  },
  {
    title: "Website Development",
    desc: "Fast, conversion-focused websites on Next.js, WordPress, and Shopify built for the standards Dallas businesses expect. Mobile-first development for a metro where commuters spend significant time on devices across the sprawling DFW highway network.",
  },
  {
    title: "Branding & Design",
    desc: "Brand identity systems that communicate credibility in a market dominated by corporate headquarters, financial institutions, and high-end real estate. From logo design to full brand guidelines built for the Dallas professional landscape.",
  },
  {
    title: "Video Production",
    desc: "Short-form video, motion graphics, and ad creative optimized for digital platforms. Video content that reflects the polished, corporate tone Dallas audiences expect from brands competing in finance, real estate, and enterprise technology.",
  },
  {
    title: "Email Marketing",
    desc: "Automated sequences, segmented campaigns, and deliverability management for Dallas businesses targeting both B2B accounts and high-net-worth consumers. Nurture sequences designed for the longer sales cycles common in corporate and financial services.",
  },
  {
    title: "Content Marketing",
    desc: "Long-form articles, thought leadership, and SEO-driven content production tailored to the industries that define Dallas: energy, telecommunications, financial services, real estate development, and enterprise technology.",
  },
  {
    title: "AI Solutions",
    desc: "AI-powered chatbots, predictive lead scoring, and marketing automation workflows built to give Dallas businesses an operational advantage. Especially relevant for high-volume real estate leads and enterprise sales pipelines common across DFW.",
  },
];

const reasons = [
  {
    title: "Corporate headquarters concentration demands enterprise-level marketing",
    desc: "Dallas is home to more Fortune 500 headquarters than almost any other U.S. city, including AT&T, Texas Instruments, and CBRE. Marketing to and alongside these companies requires campaigns that match enterprise expectations in targeting precision, creative quality, and reporting depth.",
  },
  {
    title: "Booming real estate market requires strong digital visibility",
    desc: "The DFW metroplex is one of the fastest-growing metro areas in the country, fueling intense competition among developers, brokerages, and property management firms. Digital visibility through SEO, paid search, and social media is no longer optional for real estate businesses trying to capture buyer and renter attention online.",
  },
  {
    title: "Financial services sector needs compliance-aware marketing",
    desc: "Dallas has a deep concentration of banks, insurance companies, wealth management firms, and fintech startups. Marketing in this space requires understanding of advertising regulations, compliant landing pages, and messaging that builds trust without triggering compliance issues.",
  },
  {
    title: "Premium execution without Dallas agency overhead",
    desc: "Agency retainers in Uptown Dallas or the Design District often carry overhead costs that inflate pricing without improving results. As a remote team, we deliver the same strategic depth and hands-on campaign management at a lower cost, freeing more of your budget for actual media spend and growth.",
  },
];

const faq = [
  {
    q: "How do you approach marketing for corporate clients in the DFW metroplex?",
    a: "We start by understanding the specific vertical and buyer profile. Dallas corporate marketing often involves longer B2B sales cycles, multiple stakeholders, and higher deal values. We build campaigns around account-based targeting, LinkedIn outreach, and content that speaks to executive decision-makers rather than broad consumer audiences.",
  },
  {
    q: "What digital strategies work best for Dallas real estate businesses?",
    a: "Real estate in DFW requires a combination of local SEO for neighborhood-level searches, Google Ads for high-intent buyer keywords, and retargeting campaigns that keep listings in front of prospects. We also build landing pages optimized for lead capture so that traffic from Zillow, Realtor.com, and direct search converts into actual inquiries.",
  },
  {
    q: "Can you handle marketing for financial services firms with compliance requirements?",
    a: "Yes. We build campaigns with compliance guardrails from the start, including pre-approved ad copy frameworks, compliant landing page structures, and documentation workflows that make internal review straightforward. We have experience working within the advertising restrictions that apply to banking, insurance, and investment services.",
  },
  {
    q: "How does a remote team effectively serve businesses in Dallas?",
    a: "We maintain overlap with Central Time working hours and use the same communication and project management tools any in-house team would. Strategy calls, reporting, and campaign adjustments happen on your schedule. The result is responsive, hands-on service without a premium office lease built into your monthly retainer.",
  },
];

const subPages = [
  {
    title: "Marketing Agency",
    href: "/locations/united-states/dallas/marketing-agency",
    desc: "Full-service marketing strategy for Dallas businesses across telecom, finance, and corporate sectors.",
  },
  {
    title: "PPC & Paid Ads",
    href: "/locations/united-states/dallas/ppc-ads",
    desc: "Google Ads and Meta Ads management built for DFW's competitive corporate and consumer markets.",
  },
  {
    title: "Website Development",
    href: "/locations/united-states/dallas/website-development",
    desc: "Custom web development for businesses across the Dallas-Fort Worth metroplex.",
  },
  {
    title: "SEO Services",
    href: "/locations/united-states/dallas/seo-services",
    desc: "Search engine optimization for competitive Dallas keywords and local search rankings.",
  },
];

export default function DallasPage() {
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
          { label: "Dallas" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Dallas</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Digital Marketing Agency Serving Businesses in Dallas
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-3xl">
              Dallas sits at the center of one of the largest and
              fastest-growing metro economies in the United States. The DFW
              metroplex is a magnet for corporate headquarters, financial
              services firms, and real estate developers — all competing for
              digital attention in an increasingly crowded market. Winning
              that competition requires strategy built for the scale and
              sophistication of North Texas business.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-3xl">
              Markit Media serves businesses in Dallas with full-stack
              digital marketing — from performance advertising and SEO to
              web development and branding — delivering measurable growth
              tailored to the DFW metroplex&apos;s unique economic
              landscape.
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
        aria-label="Services for businesses in Dallas"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionTitle>Services for the Dallas Market</SectionTitle>
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

      {/* Why Markit Media */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why businesses in Dallas choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Businesses in Dallas Choose Markit Media
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

      {/* Sub-pages */}
      <section className="px-6 lg:px-12 py-20" aria-label="Dallas service pages">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore</SectionLabel>
            <SectionTitle>Dallas Service Pages</SectionTitle>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
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

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Grow Your Business in Dallas?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a performance marketing strategy designed for
              the scale and ambition of the DFW metroplex.
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
