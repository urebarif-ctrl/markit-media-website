import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Digital Marketing in United States",
  description:
    "Full-stack digital marketing services for businesses across the United States. SEO, PPC, social media, web development, branding, and more.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/locations/united-states",
  },
  openGraph: {
    title: "Digital Marketing in United States",
    description: "Full-stack digital marketing services for businesses across the United States. SEO, PPC, social media, web development, branding, and more.",
  },
};

const services = [
  {
    title: "Performance Marketing",
    desc: "Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads, and PPC campaign management built to drive measurable conversions.",
  },
  {
    title: "SEO",
    desc: "Technical SEO, local SEO, content SEO, link building, and keyword research to strengthen your organic search presence.",
  },
  {
    title: "Social Media Marketing",
    desc: "Strategy, content creation, community management, and paid social campaigns across every major platform.",
  },
  {
    title: "Website Development",
    desc: "WordPress, Shopify, Next.js, custom web applications, landing pages, and e-commerce builds.",
  },
  {
    title: "Branding & Design",
    desc: "Brand strategy, logo design, visual identity systems, brand guidelines, and packaging design.",
  },
  {
    title: "Video Production",
    desc: "Commercial production, editing, motion graphics, short-form content, and animation.",
  },
  {
    title: "Email Marketing",
    desc: "Campaign design, automation sequences, list management, A/B testing, and deliverability optimization.",
  },
  {
    title: "Content Marketing",
    desc: "Content strategy, copywriting, blog writing, whitepapers, case studies, and SEO content production.",
  },
  {
    title: "AI Solutions",
    desc: "AI chatbots, marketing automation, AI consulting, predictive analytics, and workflow optimization.",
  },
];

const highlights = [
  {
    title: "The largest digital ad market",
    desc: "The US accounts for a significant share of global digital advertising spend. Competing here requires sharp targeting, strong creative, and ongoing optimization across channels.",
  },
  {
    title: "Platform diversity",
    desc: "American consumers are active across Google, Meta, TikTok, LinkedIn, YouTube, and more. A multi-channel strategy is essential to reach and convert your audience.",
  },
  {
    title: "Local and national reach",
    desc: "Whether you serve a single metro area or the entire country, your marketing strategy needs to account for regional differences in search behavior and competition.",
  },
  {
    title: "High consumer expectations",
    desc: "US consumers expect fast websites, mobile-first experiences, and relevant messaging. Meeting that bar is the baseline for competing effectively.",
  },
];

const faq = [
  {
    q: "What digital marketing services do you offer in the US?",
    a: "We provide the full range: performance marketing (Google Ads, Meta Ads, TikTok Ads), SEO, social media marketing, website development, branding, video production, email marketing, content marketing, and AI solutions.",
  },
  {
    q: "Do you work with both local and national US businesses?",
    a: "Yes. We work with businesses targeting specific cities or regions as well as companies with a national footprint. Our approach is tailored to your geographic scope and audience.",
  },
  {
    q: "How do you handle the competitive US advertising landscape?",
    a: "We focus on data-driven targeting, continuous optimization, and creative testing to make your budget work efficiently regardless of competition levels in your market.",
  },
  {
    q: "Can you manage marketing for US businesses in multiple time zones?",
    a: "Absolutely. Our team operates across time zones and coordinates campaigns to align with your business hours and your audience's peak activity windows.",
  },
];

export default function UnitedStatesPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing in United States",
    description:
      "Full-stack digital marketing services for businesses across the United States.",
    provider: {
      "@type": "Organization",
      name: "Markit Media",
      url: "https://themarkitmedia.com",
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  };

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
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "United States" },
        ]}
      />

      {/* Hero */}
      <section aria-label="United States" className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Animate animation="fade-up">
              <SectionLabel>United States</SectionLabel>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
                Digital Marketing in the United States
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mt-6">
                The US is the most competitive digital marketing landscape in the
                world. We help businesses cut through the noise with data-driven
                strategy, hands-on execution, and full-stack capabilities across
                every major channel.
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
          <Animate animation="fade-in" delay={200}>
            <img loading="lazy" src="/images/locations/united-states.svg" alt="United States digital marketing" className="w-full aspect-[4/3] object-cover" />
          </Animate>
        </div>
      </section>

      {/* Services */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Services available in the United States"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionTitle>Services Available in This Market</SectionTitle>
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

      {/* Why This Market */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Why the United States market"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Market Context</SectionLabel>
            <SectionTitle>
              What Makes the US Market Unique
            </SectionTitle>
          </Animate>
          <ul className="mt-10 space-y-4">
            {highlights.map((item, i) => (
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

      {/* Cities */}
      <section className="px-6 lg:px-12 py-20" aria-label="US city pages">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore by City</SectionLabel>
            <SectionTitle>Marketing Services Across the US</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { title: "New York", href: "/locations/united-states/new-york", desc: "Performance marketing, SEO, and web development for the NYC market." },
              { title: "Los Angeles", href: "/locations/united-states/los-angeles", desc: "Digital marketing for LA's entertainment, tech, and consumer brands." },
              { title: "Chicago", href: "/locations/united-states/chicago", desc: "Full-stack marketing for the Midwest's largest business hub." },
              { title: "Houston", href: "/locations/united-states/houston", desc: "Marketing for energy, healthcare, and real estate in Houston." },
              { title: "Miami", href: "/locations/united-states/miami", desc: "Bilingual marketing strategies for South Florida businesses." },
              { title: "San Francisco", href: "/locations/united-states/san-francisco", desc: "SaaS and startup growth marketing in the Bay Area." },
              { title: "Dallas", href: "/locations/united-states/dallas", desc: "Digital marketing for the DFW metroplex's diverse economy." },
              { title: "Atlanta", href: "/locations/united-states/atlanta", desc: "Marketing for logistics, healthcare, and Fortune 500 companies in Atlanta." },
              { title: "Boston", href: "/locations/united-states/boston", desc: "Marketing for biotech, education, fintech, and healthcare in Boston." },
              { title: "Seattle", href: "/locations/united-states/seattle", desc: "Digital marketing for tech, cloud, and e-commerce companies in Seattle." },
              { title: "Denver", href: "/locations/united-states/denver", desc: "Marketing for Denver's growing tech and outdoor lifestyle brands." },
              { title: "Phoenix", href: "/locations/united-states/phoenix", desc: "Digital marketing for one of America's fastest-growing metros." },
            ].map((city) => (
              <Link
                key={city.href}
                href={city.href}
                className="bg-white border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none block focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black uppercase tracking-wide mb-2">
                  {city.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  {city.desc}
                </p>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Grow Your Business in the US?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy tailored to the American
              market.
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
