import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import {
  Scissors,
  Search,
  MousePointerClick,
  Share2,
  Camera,
  Mail,
  PenTool,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing for Fashion & Apparel Brands",
  description:
    "Marketing strategies for clothing brands, accessories, footwear, and fashion retailers. E-commerce SEO, paid social, influencer marketing, email campaigns, and brand positioning.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/industries/fashion",
  },
};

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Search,
    title: "E-Commerce SEO",
    desc: "Optimize product pages, category structures, and technical SEO so your collections rank for the terms shoppers actually search.",
  },
  {
    icon: MousePointerClick,
    title: "Paid Social / Shopping Ads",
    desc: "Targeted campaigns across Meta, Google Shopping, and Pinterest that put your products in front of high-intent buyers.",
  },
  {
    icon: Share2,
    title: "Influencer Marketing Strategy",
    desc: "Identify, vet, and manage influencer partnerships that align with your brand and reach the right audience authentically.",
  },
  {
    icon: Camera,
    title: "Visual Content / Lookbook Creation",
    desc: "High-quality lifestyle and product imagery that tells your brand story and converts browsers into buyers.",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    desc: "Segmented email campaigns for new arrivals, restocks, seasonal drops, and abandoned cart recovery that drive repeat purchases.",
  },
  {
    icon: PenTool,
    title: "Brand Identity / Positioning",
    desc: "Define and refine your brand voice, visual identity, and market positioning to stand apart in a crowded fashion landscape.",
  },
];

const challenges = [
  {
    title: "Seasonal trend cycles",
    desc: "Fashion moves fast. Marketing campaigns need to align with seasonal collections, trend cycles, and cultural moments while maintaining a cohesive brand identity year-round.",
  },
  {
    title: "High return rates impacting ad ROI",
    desc: "Online fashion purchases have higher return rates than most industries. This affects how you measure ad performance and requires strategies that attract the right buyers, not just any buyers.",
  },
  {
    title: "Visual-first audience expectations",
    desc: "Fashion shoppers make decisions based on imagery. Every touchpoint needs polished, on-brand visuals that communicate quality, style, and fit before a customer ever touches the product.",
  },
  {
    title: "Fast fashion competition",
    desc: "Competing on price alone is a losing game against fast fashion giants. Brands need a clear value proposition and marketing that communicates why their products are worth the investment.",
  },
  {
    title: "Building brand loyalty online",
    desc: "With endless options one click away, turning first-time buyers into repeat customers requires more than a good product. It takes consistent brand experience, community building, and smart retention marketing.",
  },
];

const faq = [
  {
    q: "What digital marketing channels work best for fashion brands?",
    a: "Paid social ads on platforms like Meta and Pinterest tend to perform well for fashion because the audience is visually driven. E-commerce SEO brings in organic traffic from shoppers searching for specific products or categories. Email marketing is essential for retention, especially around new drops, restocks, and seasonal promotions.",
  },
  {
    q: "How can a fashion brand stand out against larger competitors?",
    a: "Smaller brands can differentiate through a strong brand identity, authentic storytelling, and community building. Niche positioning, a clear point of view, and direct engagement with your audience give independent brands advantages that larger competitors struggle to replicate at scale.",
  },
  {
    q: "How important is influencer marketing for fashion?",
    a: "Influencer marketing can be very effective for fashion when executed strategically. The key is choosing partners whose audience and aesthetic genuinely align with your brand, rather than chasing follower counts. Micro-influencers with engaged, relevant audiences often deliver stronger results than celebrity partnerships.",
  },
  {
    q: "How do you handle the seasonal nature of fashion marketing?",
    a: "We plan campaigns around your collection calendar and seasonal cycles, adjusting budgets, creative, and messaging to match each phase. Pre-launch builds anticipation, launch drives initial sales, and mid-season campaigns sustain momentum. End-of-season strategies focus on clearing inventory while protecting brand perception.",
  },
];

export default function FashionPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing for Fashion & Apparel Brands",
    description:
      "Marketing strategies for clothing brands, accessories, footwear, and fashion retailers.",
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
          { label: "Fashion & Apparel" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
          <Animate animation="fade-up">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6">
              <Scissors size={28} strokeWidth={2} aria-hidden="true" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
              Digital Marketing for Fashion &amp; Apparel Brands
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6">
              Clothing brands, accessories, footwear, fashion
              retailers &mdash; your customers discover and shop for fashion
              online. We help fashion businesses build brand presence, drive
              traffic, and convert shoppers into loyal customers.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-base hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Get a Free Consultation &rarr;
              </Link>
            </div>
          </Animate>
          </div>
          <Animate animation="fade-in" delay={200}>
            <img src="/images/industries/fashion.svg" alt="" className="w-full aspect-[4/3] object-cover" />
          </Animate>
        </div>
      </section>

      {/* Services */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Services"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionTitle>
              Marketing Services for Fashion &amp; Apparel Brands
            </SectionTitle>
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
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center mb-4">
                  <svc.icon size={20} strokeWidth={2} aria-hidden="true" />
                </div>
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

      {/* Challenges */}
      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Industry challenges"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Industry Challenges</SectionLabel>
            <SectionTitle>Common Pain Points</SectionTitle>
            <SectionDesc>
              Fashion brands face distinct marketing challenges in a fast-moving,
              visually driven market. Here are the problems we help solve.
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
                    <span className="text-base font-bold text-black">
                      {c.title}
                    </span>
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
                      className="text-xl text-gray-500 group-open:rotate-45 transition-transform flex-shrink-0 ml-4"
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
              Ready to Grow Your Fashion Brand?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that drives traffic,
              conversions, and brand loyalty.
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
