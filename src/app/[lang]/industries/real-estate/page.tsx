import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Building, Search, MousePointerClick, Globe, Camera, Mail, MapPin } from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Digital Marketing for Real Estate",
  description:
    "Digital marketing for real estate agents, brokerages, property managers, and developers. Real estate SEO, PPC, virtual tour marketing, and hyper-local lead generation.",
  alternates: { canonical: "https://themarkitmedia.com/en/industries/real-estate" },
  openGraph: {
    title: "Digital Marketing for Real Estate",
    description: "Digital marketing for real estate agents, brokerages, property managers, and developers. Real estate SEO, PPC, virtual tour marketing, and hyper-local l...",
  },
};

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Search,
    title: "Real Estate SEO",
    desc: "Rank for neighborhood, city, and property-type searches. We build content strategies around the terms buyers and sellers actually use when looking for an agent.",
  },
  {
    icon: MousePointerClick,
    title: "PPC / Google Ads",
    desc: "Targeted pay-per-click campaigns that capture high-intent buyers and sellers at the moment they search. Optimized for cost-per-lead, not just clicks.",
  },
  {
    icon: Globe,
    title: "Website Development",
    desc: "IDX-ready, mobile-first real estate websites with property search, lead capture forms, and fast load times that keep visitors engaged.",
  },
  {
    icon: Camera,
    title: "Virtual Tour Marketing",
    desc: "Promote 3D tours and video walkthroughs across search, social, and email to drive more qualified showings and reduce time on market.",
  },
  {
    icon: Mail,
    title: "Email Campaigns",
    desc: "Automated drip sequences for new leads, market updates for your database, and listing announcement campaigns that keep your brand top of mind.",
  },
  {
    icon: MapPin,
    title: "Local / Neighborhood Marketing",
    desc: "Hyper-local content, Google Business Profile optimization, and geo-targeted ads that position you as the go-to agent in your target neighborhoods.",
  },
];

const challenges = [
  {
    title: "Hyper-Local Competition",
    desc: "Real estate is one of the most competitive local markets online. Multiple agents and brokerages compete for the same neighborhood keywords, making visibility difficult without a focused strategy.",
  },
  {
    title: "Long Sales Cycles",
    desc: "Buyers and sellers often research for months before making a move. Your marketing needs to nurture leads over extended timelines without losing engagement.",
  },
  {
    title: "Seasonal Market Shifts",
    desc: "Real estate demand fluctuates with seasons, interest rates, and market conditions. Campaign strategy must adapt quickly to capture demand when it spikes.",
  },
  {
    title: "Differentiating Agent Brands",
    desc: "Many agents offer similar services in the same area. Standing out requires a clear brand identity and consistent messaging across every digital channel.",
  },
  {
    title: "Generating Quality Leads",
    desc: "Volume alone does not close deals. The challenge is attracting leads who are genuinely ready to buy, sell, or invest -- not just browsing listings casually.",
  },
];

const faq = [
  {
    q: "What digital marketing channels work best for real estate?",
    a: "The most effective channels depend on your goals. Google Ads and SEO capture high-intent buyers and sellers actively searching. Social media and email marketing are strong for brand awareness and long-term nurturing. Most successful agents use a combination of channels to cover every stage of the buyer and seller journey.",
  },
  {
    q: "How do you target specific neighborhoods or markets?",
    a: "We use a combination of hyper-local SEO content, geo-targeted PPC campaigns, Google Business Profile optimization, and neighborhood-specific landing pages. This ensures your marketing reaches the exact areas where you want to build your reputation and generate leads.",
  },
  {
    q: "How long before I start seeing leads from SEO?",
    a: "Real estate SEO typically takes three to six months to gain traction in local search results. PPC campaigns can start generating leads within the first few weeks. We recommend running paid campaigns alongside SEO so you have a steady flow of leads while your organic rankings build.",
  },
  {
    q: "Do you work with individual agents or only brokerages?",
    a: "We work with both. Whether you are a solo agent building your personal brand, a team looking to scale, or a brokerage managing multiple agents, we tailor our strategy to fit your structure and goals.",
  },
];

export default function RealEstatePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing for Real Estate",
    description:
      "Digital marketing services for real estate agents, brokerages, property managers, and developers. Real estate SEO, PPC, virtual tour marketing, and hyper-local lead generation.",
    provider: {
      "@type": "Organization",
      name: "Markit Media",
      url: "https://themarkitmedia.com",
    },
    areaServed: [
      "United States",
      "Canada",
      "United Arab Emirates",
      "United Kingdom",
      "Australia",
      "Saudi Arabia",
    ],
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
          { label: "Industries", href: "/industries" },
          { label: "Real Estate" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
          <Animate animation="fade-up">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6">
              <Building size={28} strokeWidth={2} aria-hidden="true" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
              Digital Marketing for Real Estate
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6">
              Buyers start their property search online. We help real estate agents,
              brokerages, property managers, and developers attract qualified leads,
              build local authority, and close more deals through strategic digital
              marketing.
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
            <img src="/images/industries/real-estate.svg" alt="" className="w-full aspect-[4/3] object-cover" />
          </Animate>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Services">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionTitle>Marketing Services for Real Estate</SectionTitle>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {services.map((svc) => (
              <div key={svc.title} className="bg-white border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center mb-4">
                  <svc.icon size={20} strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black uppercase tracking-wide mb-2">
                  {svc.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Challenges */}
      <section className="px-6 lg:px-12 py-20" aria-label="Industry challenges">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Industry Challenges</SectionLabel>
            <SectionTitle>Common Pain Points</SectionTitle>
            <SectionDesc>
              Real estate marketing requires navigating intense local competition and
              long decision timelines. These are the challenges we help our clients
              address.
            </SectionDesc>
          </Animate>
          <ul className="mt-10 space-y-4">
            {challenges.map((c, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <li className="flex items-start gap-4 py-3 border-b border-gray-200">
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center flex-shrink-0 text-base font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-base font-bold text-black">{c.title}</span>
                    <p className="text-base text-gray-500 leading-relaxed mt-1">
                      {c.desc}
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
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Grow Your Real Estate Business?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a lead generation strategy that puts you in front of
              buyers and sellers in the neighborhoods that matter most.
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
