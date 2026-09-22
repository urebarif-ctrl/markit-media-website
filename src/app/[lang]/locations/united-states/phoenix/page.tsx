import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Phoenix — Markit Media",
  description:
    "Performance marketing, SEO, PPC, and web development for businesses in Phoenix. Digital strategies for real estate, healthcare, tech relocations, and semiconductor manufacturing across the Valley of the Sun.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/locations/united-states/phoenix",
  },
  openGraph: {
    title: "Digital Marketing Agency in Phoenix — Markit Media",
    description:
      "Performance marketing, SEO, PPC, and web development for businesses in Phoenix. Digital strategies for real estate, healthcare, tech relocations, and semiconductor manufacturing across the Valley of the Sun.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Markit Media",
  description:
    "Digital marketing agency serving businesses in Phoenix with performance marketing, SEO, PPC, web development, and branding.",
  areaServed: { "@type": "City", name: "Phoenix" },
  url: "https://themarkitmedia.com/en/locations/united-states/phoenix",
};

const services = [
  {
    title: "Performance Marketing",
    desc: "Google Ads and Meta Ads campaigns built for Phoenix’s rapidly expanding market, where real estate developers, healthcare systems, and relocating tech companies compete for consumer and business attention across the Valley of the Sun. We structure ad accounts to capture the wave of new residents and businesses arriving monthly.",
  },
  {
    title: "SEO",
    desc: "Technical SEO, local pack strategy, and content programs designed for Phoenix’s fast-growing search landscape. From Scottsdale to Tempe, Chandler to Gilbert, we target high-intent keywords where real estate, healthcare, home services, and technology businesses compete for organic visibility in one of America’s largest metros.",
  },
  {
    title: "Social Media Marketing",
    desc: "Paid and organic social campaigns across LinkedIn, Meta, TikTok, and X tailored to Phoenix’s expanding audience. The metro’s massive population influx means new consumer segments arrive continuously — making social targeting and community-building essential for brands establishing roots in the Valley.",
  },
  {
    title: "Website Development",
    desc: "Fast, conversion-focused websites on Next.js, WordPress, and Shopify built for the standards Phoenix businesses expect. Mobile-first development for a metro where residents rely heavily on digital tools to navigate a sprawling urban landscape and find local services.",
  },
  {
    title: "Branding & Design",
    desc: "Brand identity systems that stand out in a market flooded with new entrants. As businesses relocate to Phoenix for lower costs and a growing talent pool, strong branding separates established players from newcomers across real estate, healthcare, financial services, and technology.",
  },
  {
    title: "Video Production",
    desc: "Short-form video, motion graphics, and ad creative optimized for digital platforms. Video content that communicates the energy and growth of the Phoenix market — ideal for real estate showcases, healthcare brand campaigns, and tech company recruitment efforts targeting new arrivals.",
  },
  {
    title: "Email Marketing",
    desc: "Automated sequences, segmented campaigns, and deliverability management for Phoenix businesses targeting both transplants and longtime Valley residents. Nurture sequences designed for the high-volume lead pipelines common in real estate, senior living, home services, and healthcare.",
  },
  {
    title: "Content Marketing",
    desc: "Long-form articles, thought leadership, and SEO-driven content production tailored to the industries defining Phoenix’s growth: real estate development, semiconductor manufacturing, healthcare systems, renewable energy, and the wave of technology companies establishing Western U.S. operations.",
  },
  {
    title: "AI Solutions",
    desc: "AI-powered chatbots, predictive lead scoring, and marketing automation workflows built to help Phoenix businesses manage rapid growth. Especially relevant for real estate firms handling high lead volumes and healthcare providers managing patient acquisition across a metro adding hundreds of thousands of new residents.",
  },
];

const reasons = [
  {
    title: "Fastest-growing metro demands aggressive digital positioning",
    desc: "Phoenix has been one of the fastest-growing metropolitan areas in the U.S. for over a decade. That growth means new competitors, new consumers, and new search behavior appearing constantly. Businesses that wait to invest in digital visibility lose ground to those already building SEO authority, ad presence, and brand recognition in the Valley.",
  },
  {
    title: "Real estate boom creates intense competition for online attention",
    desc: "The Phoenix housing market attracts developers, brokerages, property managers, and investors at a national scale. Every one of them is competing for the same buyer and renter keywords. Winning in this space requires a combination of local SEO, high-converting landing pages, and paid campaigns with precise geographic targeting across the metro’s many submarkets.",
  },
  {
    title: "Healthcare and retirement sectors need specialized digital strategies",
    desc: "Arizona’s retirement-friendly climate drives massive demand for healthcare, senior living, and wellness services. Marketing in these sectors requires audience segmentation by age and need, compliance-aware advertising, and content that builds trust with both patients and their adult children who often research providers on their behalf.",
  },
  {
    title: "Premium execution without Phoenix agency overhead",
    desc: "Agency retainers in Scottsdale or the Biltmore corridor often carry overhead costs that inflate pricing without improving results. As a remote team, we deliver the same strategic depth and hands-on campaign management at a lower cost, freeing more of your budget for actual media spend and growth.",
  },
];

const faq = [
  {
    q: "How do you approach marketing for businesses in a fast-growing metro like Phoenix?",
    a: "Growth markets reward speed. We prioritize getting campaigns live quickly, then optimize based on real data. In Phoenix specifically, that means targeting new residents through relocation-intent keywords, building local SEO authority before competitors lock in top positions, and running paid campaigns that adapt as the metro’s demographics shift month over month.",
  },
  {
    q: "What digital strategies work best for Phoenix real estate businesses?",
    a: "Real estate in the Valley requires hyperlocal SEO for submarket searches, Google Ads for high-intent buyer and renter keywords, and retargeting campaigns that keep listings visible across a long research cycle. We also build landing pages optimized for lead capture so that traffic from Zillow, Realtor.com, and direct search converts into actual inquiries.",
  },
  {
    q: "Can you handle marketing for healthcare and senior living providers?",
    a: "Yes. We build healthcare marketing campaigns with HIPAA-aware practices, compliant ad copy, and landing pages designed to convert both direct patients and the family members researching care options. We understand the multi-stakeholder decision process common in senior living and specialty healthcare.",
  },
  {
    q: "How does a remote team effectively serve businesses in Phoenix?",
    a: "We maintain overlap with Mountain Time working hours and use the same communication and project management tools any in-house team would. Strategy calls, reporting, and campaign adjustments happen on your schedule. The result is responsive, hands-on service without a premium office lease built into your monthly retainer.",
  },
];

const subPages = [
  {
    title: "Marketing Agency",
    href: "/locations/united-states/phoenix/marketing-agency",
    desc: "Full-service marketing strategy for Phoenix businesses across real estate, healthcare, and technology sectors.",
  },
  {
    title: "PPC & Paid Ads",
    href: "/locations/united-states/phoenix/ppc-ads",
    desc: "Google Ads and Meta Ads management built for the Valley’s competitive real estate and consumer markets.",
  },
  {
    title: "Website Development",
    href: "/locations/united-states/phoenix/website-development",
    desc: "Custom web development for businesses across the Phoenix metropolitan area.",
  },
  {
    title: "SEO Services",
    href: "/locations/united-states/phoenix/seo-services",
    desc: "Search engine optimization for competitive Phoenix keywords and local search rankings.",
  },
];

export default function PhoenixPage() {
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
          { label: "Phoenix" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Phoenix</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Digital Marketing Agency Serving Businesses in Phoenix
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-3xl">
              Phoenix is one of the fastest-growing metropolitan areas in
              the United States, and that growth is reshaping every
              industry in the Valley of the Sun. A booming real estate
              market, expanding healthcare and senior living sectors,
              major semiconductor manufacturing investments, and a wave
              of technology companies relocating operations from higher-cost
              states have created an intensely competitive digital
              landscape.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-3xl">
              Markit Media serves businesses in Phoenix with full-stack
              digital marketing — from performance advertising and SEO to
              web development and branding — delivering measurable growth
              tailored to the scale and speed of Arizona&apos;s largest
              metro.
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
        aria-label="Services for businesses in Phoenix"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionTitle>Services for the Phoenix Market</SectionTitle>
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
        aria-label="Why businesses in Phoenix choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Businesses in Phoenix Choose Markit Media
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
      <section className="px-6 lg:px-12 py-20" aria-label="Phoenix service pages">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore</SectionLabel>
            <SectionTitle>Phoenix Service Pages</SectionTitle>
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
              Ready to Grow Your Business in Phoenix?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a performance marketing strategy designed for
              the speed and scale of the Valley of the Sun.
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
