import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Los Angeles — Markit Media",
  description:
    "Performance marketing, SEO, paid media, and web development for businesses in Los Angeles. Data-driven strategies for LA's entertainment, tech, and creative industries.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/los-angeles",
  },
  openGraph: {
    title: "Digital Marketing Agency in Los Angeles — Markit Media",
    description:
      "Performance marketing, SEO, paid media, and web development for businesses in Los Angeles. Data-driven strategies for LA's entertainment, tech, and creative industries.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Markit Media",
  description:
    "Digital marketing agency serving businesses in Los Angeles with performance marketing, SEO, paid media, web development, and creative services.",
  areaServed: { "@type": "City", name: "Los Angeles" },
  url: "https://themarkitmedia.com/en/locations/united-states/los-angeles",
};

const services = [
  {
    title: "Performance Marketing",
    description:
      "ROI-focused campaigns across Google, Meta, and programmatic channels tailored to LA’s competitive ad landscape. We optimize spend against real revenue, not vanity impressions.",
  },
  {
    title: "SEO",
    description:
      "Technical audits, content strategy, and authority building designed for the search volumes and keyword difficulty that come with targeting one of the largest metro markets in the US.",
  },
  {
    title: "Social Media Marketing",
    description:
      "Platform strategy for Instagram, TikTok, LinkedIn, and YouTube — built for a city where social trends launch before they go national. Content calendars, community management, and paid amplification.",
  },
  {
    title: "Website Development",
    description:
      "Fast, accessible, conversion-optimized websites on modern stacks. LA audiences expect polished digital experiences, and slow load times kill engagement in a market with zero patience for friction.",
  },
  {
    title: "Branding & Design",
    description:
      "Visual identity systems, messaging frameworks, and brand guidelines that hold up in a city saturated with creative output. Distinctive positioning for businesses competing against Hollywood-level production values.",
  },
  {
    title: "Video Production",
    description:
      "Strategy, scripting, and post-production for ads, social content, and brand films. We handle the digital side so your LA-based production talent can focus on what they do best.",
  },
  {
    title: "Email Marketing",
    description:
      "Segmented campaigns, automated flows, and deliverability optimization for businesses selling to LA’s diverse consumer segments — from luxury retail to DTC startups to B2B SaaS.",
  },
  {
    title: "Content Marketing",
    description:
      "Long-form articles, landing pages, case studies, and thought leadership tuned for LA’s industries. Content that earns organic traffic and builds authority with decision-makers.",
  },
  {
    title: "AI Solutions",
    description:
      "Marketing automation, predictive analytics, and AI-powered personalization for forward-thinking LA businesses. We implement tools that scale your marketing output without scaling your headcount.",
  },
];

const subPages = [
  {
    title: "Marketing Agency",
    href: "/locations/united-states/los-angeles/marketing-agency",
    description:
      "Full-service marketing strategy and campaign management for Los Angeles businesses across every digital channel.",
  },
  {
    title: "PPC Ads",
    href: "/locations/united-states/los-angeles/ppc-ads",
    description:
      "Google Ads, Meta Ads, and programmatic campaigns built to compete in LA’s high-CPC advertising market.",
  },
  {
    title: "Website Development",
    href: "/locations/united-states/los-angeles/website-development",
    description:
      "High-performance websites engineered for conversion, speed, and the design standards LA audiences expect.",
  },
  {
    title: "SEO Services",
    href: "/locations/united-states/los-angeles/seo-services",
    description:
      "Organic search strategy for businesses targeting Los Angeles and Southern California search traffic.",
  },
];

const reasons = [
  {
    number: "01",
    title: "Diverse Demographic Targeting Expertise",
    description:
      "Los Angeles is one of the most ethnically and linguistically diverse cities on earth. We build campaigns that segment by language, neighborhood, and cultural context — not just age and income brackets.",
  },
  {
    number: "02",
    title: "Entertainment & Creative Industry Focus",
    description:
      "From production companies and talent agencies to streaming platforms and indie studios, we understand the marketing rhythms of LA’s signature industry and how to reach its decision-makers.",
  },
  {
    number: "03",
    title: "Tech-Forward Approach for a Digitally Mature Market",
    description:
      "LA’s consumers adopt new platforms early and abandon slow experiences fast. Our strategies lean into emerging channels, AI-driven personalization, and the performance benchmarks this market demands.",
  },
  {
    number: "04",
    title: "Cost Advantage Without Compromising Quality",
    description:
      "Working with a remote team means you get senior-level execution at rates well below what West LA and Beverly Hills agencies charge — without the overhead that inflates their retainers.",
  },
];

const faqs = [
  {
    question:
      "How do you market to Los Angeles’s diverse audiences?",
    answer:
      "We start with audience research that goes deeper than surface demographics. LA’s market includes Spanish-speaking households, Korean-American communities in Koreatown, Persian consumers in Westwood, and dozens of other segments that each respond to different messaging, imagery, and media channels. We build distinct targeting layers for each relevant audience and localize creative assets where the data supports it.",
  },
  {
    question:
      "Do you have experience with entertainment and creative businesses?",
    answer:
      "Yes. We work with production companies, post-production studios, talent management firms, and creative agencies on campaigns that drive qualified leads and brand visibility. The entertainment industry has unique sales cycles and relationship-driven buying processes, and our strategies account for that instead of applying generic B2B playbooks.",
  },
  {
    question:
      "How do you handle social media in a trend-driven market like LA?",
    answer:
      "Los Angeles sets trends before they reach the rest of the country. Our social strategy combines evergreen content pillars with a rapid-response workflow for trending formats and cultural moments. We monitor platform signals daily and have approval processes designed for speed so your brand can participate in conversations while they are still relevant.",
  },
  {
    question:
      "You’re a remote team — how does that work for LA clients?",
    answer:
      "We operate across time zones every day. LA clients get a dedicated account lead, scheduled syncs that respect Pacific Time, and async reporting through shared dashboards. The remote model is why we can offer rates significantly lower than comparable Los Angeles agencies without sacrificing execution quality or responsiveness.",
  },
];

export default function LosAngelesPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />

      {/* Breadcrumb */}
      <section className="bg-white pt-28 pb-4">
        <div className="mx-auto max-w-7xl px-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Locations", href: "/locations" },
              { label: "United States", href: "/locations/united-states" },
              { label: "Los Angeles" },
            ]}
          />
        </div>
      </section>

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Los Angeles</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Digital Marketing Agency Serving Businesses in Los Angeles
            </h1>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Los Angeles is the second-largest metro economy in the United
              States &mdash; a sprawling market where entertainment, technology,
              fashion, real estate, and hospitality industries compete for
              consumer attention across dozens of distinct neighborhoods and
              demographic segments.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={300}>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media serves businesses in LA with data-driven performance
              marketing, search engine optimization, paid media management, web
              development, and creative services &mdash; delivered remotely with
              the responsiveness and strategic depth that this market demands.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={400}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 mt-10"
            >
              Start a Conversation
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </Animate>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Services</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              What we do for businesses in Los Angeles
            </SectionTitle>
          </Animate>
          <Stagger
            stagger={80}
            animation="fade-up"
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
              >
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black uppercase tracking-wide mb-2">
                  {service.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Sub-Pages */}
      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              Los Angeles service pages
            </SectionTitle>
          </Animate>
          <Stagger
            stagger={100}
            animation="fade-up"
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {subPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group border border-gray-200 bg-white p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
              >
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black uppercase tracking-wide mb-2 group-hover:underline">
                  {page.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  {page.description}
                </p>
                <span className="mt-4 inline-block text-base font-semibold text-black">
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why Markit Media */}
      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              Why businesses in Los Angeles choose Markit Media
            </SectionTitle>
          </Animate>
          <Stagger
            stagger={100}
            animation="fade-up"
            className="mt-14 grid gap-10 sm:grid-cols-2"
          >
            {reasons.map((reason) => (
              <div key={reason.number} className="flex gap-5">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-black text-white font-[family-name:var(--font-display)] font-bold text-base">
                  {reason.number}
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-500 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              Common questions from Los Angeles businesses
            </SectionTitle>
          </Animate>
          <Stagger
            stagger={100}
            animation="fade-up"
            className="mt-14 max-w-3xl space-y-4"
          >
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border border-gray-200 bg-white"
              >
                <summary className="cursor-pointer px-6 py-5 text-base font-bold text-black font-[family-name:var(--font-display)] list-none flex items-center justify-between">
                  {faq.question}
                  <span className="ml-4 text-gray-400 group-open:rotate-45 transition-transform motion-reduce:transition-none text-xl leading-none">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-base text-gray-500 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-7xl mx-auto">
          <Animate animation="scale-in">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-white tracking-tight leading-tight">
              Ready to Grow Your Business in Los Angeles?
            </h2>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300 leading-relaxed">
              Tell us about your goals and we&apos;ll build a strategy tailored
              to LA&apos;s market &mdash; no generic decks, no obligation. Just a
              clear plan grounded in your numbers.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={300}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none mt-10"
            >
              Get in Touch
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </Animate>
        </div>
      </section>
    </>
  );
}
