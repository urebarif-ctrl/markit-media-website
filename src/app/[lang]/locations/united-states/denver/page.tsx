import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Denver — Markit Media",
  description:
    "Performance marketing, SEO, PPC, and web development for businesses in Denver. Digital strategies for tech startups, outdoor brands, cannabis companies, and aerospace firms across the Front Range.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/locations/united-states/denver",
  },
  openGraph: {
    title: "Digital Marketing Agency in Denver — Markit Media",
    description:
      "Performance marketing, SEO, PPC, and web development for businesses in Denver. Digital strategies for tech startups, outdoor brands, cannabis companies, and aerospace firms across the Front Range.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Markit Media",
  description:
    "Digital marketing agency serving businesses in Denver with performance marketing, SEO, PPC, web development, and branding.",
  areaServed: { "@type": "City", name: "Denver" },
  url: "https://themarkitmedia.com/en/locations/united-states/denver",
};

const services = [
  {
    title: "Performance Marketing",
    desc: "Google Ads and Meta Ads campaigns calibrated for Denver’s fast-growing market, where tech startups, outdoor brands, and cannabis companies compete for attention across the Front Range. We build ad accounts that target high-intent audiences in a city where digital adoption outpaces most mid-market metros.",
  },
  {
    title: "SEO",
    desc: "Technical SEO, local pack strategy, and content programs designed for Denver’s competitive search landscape. From LoDo to the Tech Center, Cherry Creek to Boulder, we target high-intent keywords where outdoor, technology, and professional services businesses compete for organic visibility.",
  },
  {
    title: "Social Media Marketing",
    desc: "Paid and organic social campaigns across LinkedIn, Meta, TikTok, and X built for Denver’s active digital community. The city’s young, educated population engages heavily on social platforms, making targeted campaigns essential for brands in wellness, outdoor recreation, and emerging tech.",
  },
  {
    title: "Website Development",
    desc: "Fast, conversion-focused websites on Next.js, WordPress, and Shopify built for the standards Denver businesses expect. Mobile-first development optimized for a market where consumers research local services on their phones before heading to the mountains or exploring RiNo.",
  },
  {
    title: "Branding & Design",
    desc: "Brand identity systems that resonate in a market defined by authenticity and lifestyle appeal. From outdoor and wellness brands to clean energy startups, Denver audiences respond to design that balances professionalism with the approachable, active culture of the Front Range.",
  },
  {
    title: "Video Production",
    desc: "Short-form video, motion graphics, and ad creative optimized for digital platforms. Video content that captures the energy of Denver’s startup scene, outdoor culture, and emerging industries — the kind of creative that performs on Instagram, YouTube, and TikTok.",
  },
  {
    title: "Email Marketing",
    desc: "Automated sequences, segmented campaigns, and deliverability management for Denver businesses targeting both local consumers and national audiences. Nurture sequences designed for the product-launch cycles common in the city’s consumer goods, cannabis, and SaaS sectors.",
  },
  {
    title: "Content Marketing",
    desc: "Long-form articles, thought leadership, and SEO-driven content production tailored to the industries driving Denver forward: renewable energy, aerospace, cannabis regulation, outdoor recreation, and enterprise technology.",
  },
  {
    title: "AI Solutions",
    desc: "AI-powered chatbots, predictive lead scoring, and marketing automation workflows built to give Denver businesses a competitive edge. Especially relevant for high-growth startups and cannabis retailers managing complex compliance and customer education funnels.",
  },
];

const reasons = [
  {
    title: "A booming tech and startup ecosystem needs growth-stage marketing",
    desc: "Denver has become one of the top startup cities in the Western U.S., attracting venture capital and tech talent at an accelerating pace. Companies scaling from seed to Series B need marketing infrastructure that can move as fast as they do — performance campaigns, conversion-optimized websites, and brand systems that evolve with rapid growth.",
  },
  {
    title: "Outdoor and lifestyle brands require authentic digital presence",
    desc: "Denver’s identity is inseparable from the outdoors. Brands in recreation, wellness, and active lifestyle compete for an audience that values authenticity over polish. Digital marketing in this space demands content and creative that reflect real culture, not generic corporate messaging.",
  },
  {
    title: "Cannabis industry marketing operates under unique constraints",
    desc: "Colorado’s cannabis market is mature but marketing-restricted. Advertising on major platforms is limited, making SEO, content marketing, email, and compliant web experiences the primary growth channels. We build strategies that work within these constraints while maximizing reach and conversions.",
  },
  {
    title: "Premium execution without Denver agency overhead",
    desc: "Agency retainers along the Platte or in Cherry Creek North often carry overhead costs that inflate pricing without improving results. As a remote team, we deliver the same strategic depth and hands-on campaign management at a lower cost, freeing more of your budget for actual media spend and growth.",
  },
];

const faq = [
  {
    q: "How do you approach marketing for tech startups in Denver?",
    a: "We start by understanding your growth stage and unit economics. Denver startups often need to balance aggressive user acquisition with efficient spend. We build campaigns around paid search, LinkedIn targeting for B2B, and retargeting sequences that move prospects through the funnel — with clear attribution so you can report performance back to investors.",
  },
  {
    q: "What digital strategies work for outdoor and lifestyle brands in Colorado?",
    a: "Outdoor brands in Denver need a combination of strong organic content, influencer-adjacent social campaigns, and SEO that captures seasonal and activity-specific search intent. We build content calendars and paid campaigns around the rhythms of Colorado’s outdoor calendar — ski season, summer trails, festival circuits — so your brand shows up when your audience is planning.",
  },
  {
    q: "Can you handle marketing for cannabis businesses with advertising restrictions?",
    a: "Yes. We build cannabis marketing strategies around the channels that are available and effective: SEO for dispensary and product searches, email marketing for retention, compliant website experiences, and content that educates consumers while staying within state and platform advertising guidelines.",
  },
  {
    q: "How does a remote team effectively serve businesses in Denver?",
    a: "We maintain overlap with Mountain Time working hours and use the same communication and project management tools any in-house team would. Strategy calls, reporting, and campaign adjustments happen on your schedule. The result is responsive, hands-on service without a premium office lease built into your monthly retainer.",
  },
];

const subPages = [
  {
    title: "Marketing Agency",
    href: "/locations/united-states/denver/marketing-agency",
    desc: "Full-service marketing strategy for Denver businesses across tech, outdoor, and cannabis sectors.",
  },
  {
    title: "PPC & Paid Ads",
    href: "/locations/united-states/denver/ppc-ads",
    desc: "Google Ads and Meta Ads management built for Denver’s competitive startup and consumer markets.",
  },
  {
    title: "Website Development",
    href: "/locations/united-states/denver/website-development",
    desc: "Custom web development for businesses across the Denver metro and Front Range.",
  },
  {
    title: "SEO Services",
    href: "/locations/united-states/denver/seo-services",
    desc: "Search engine optimization for competitive Denver keywords and local search rankings.",
  },
];

export default function DenverPage() {
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
          { label: "Denver" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Denver</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Digital Marketing Agency Serving Businesses in Denver
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-3xl">
              Denver has emerged as one of the fastest-growing business
              hubs in the Western United States. A thriving tech startup
              ecosystem, the nation&apos;s most mature cannabis market,
              a deep bench of outdoor and lifestyle brands, and expanding
              aerospace and renewable energy sectors make the Front Range
              one of the most dynamic — and competitive — markets for
              digital attention.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-3xl">
              Markit Media serves businesses in Denver with full-stack
              digital marketing — from performance advertising and SEO to
              web development and branding — delivering measurable growth
              tailored to the industries and audiences that define
              Colorado&apos;s capital.
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
        aria-label="Services for businesses in Denver"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionTitle>Services for the Denver Market</SectionTitle>
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
        aria-label="Why businesses in Denver choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Businesses in Denver Choose Markit Media
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
      <section className="px-6 lg:px-12 py-20" aria-label="Denver service pages">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore</SectionLabel>
            <SectionTitle>Denver Service Pages</SectionTitle>
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
              Ready to Grow Your Business in Denver?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a performance marketing strategy designed for
              the growth and opportunity of Colorado&apos;s Front Range.
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
