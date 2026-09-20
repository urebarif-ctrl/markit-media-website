import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import {
  Cloud,
  Search,
  MousePointerClick,
  FileText,
  Mail,
  Share2,
  BarChart3,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing for SaaS Companies",
  description:
    "Marketing strategies for SaaS companies including performance marketing, SEO, content marketing, email nurture campaigns, LinkedIn marketing, and analytics.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/industries/saas",
  },
};

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: MousePointerClick,
    title: "Performance Marketing",
    desc: "Data-driven paid campaigns across search and social that target decision-makers at each stage of the buying journey.",
  },
  {
    icon: Search,
    title: "SEO",
    desc: "Rank for the product and category terms your ideal customers search when evaluating solutions.",
  },
  {
    icon: FileText,
    title: "Content Marketing",
    desc: "In-depth articles, comparison guides, and resources that educate prospects and build authority in your category.",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    desc: "Nurture sequences that move prospects from awareness to demo request with timely, relevant messaging throughout the sales cycle.",
  },
  {
    icon: Share2,
    title: "Social Media / LinkedIn",
    desc: "Build thought leadership and engage decision-makers on the platform where B2B buyers spend their time.",
  },
  {
    icon: BarChart3,
    title: "Analytics and Reporting",
    desc: "End-to-end tracking from first touch to closed deal so you know exactly which channels drive pipeline and revenue.",
  },
];

const challenges: { title: string; desc: string }[] = [
  {
    title: "Long sales cycles",
    desc: "B2B SaaS purchases involve multiple stakeholders and extended evaluation periods. Marketing must nurture prospects over weeks or months without losing their attention.",
  },
  {
    title: "Demonstrating ROI to buyers",
    desc: "SaaS buyers need to justify the investment internally. Marketing content and campaigns must clearly communicate value, cost savings, and business impact.",
  },
  {
    title: "Reducing churn through better acquisition",
    desc: "Acquiring the wrong customers leads to high churn. Marketing needs to attract prospects who are a genuine fit for the product, not just anyone willing to sign up.",
  },
  {
    title: "Standing out in a crowded market",
    desc: "Most SaaS categories have dozens of competitors. Clear positioning, strong content, and consistent messaging are essential to differentiation.",
  },
  {
    title: "Connecting marketing to revenue",
    desc: "SaaS companies need to trace marketing spend to pipeline and closed revenue. Without proper attribution, it is difficult to know what is working and where to invest.",
  },
];

const faq = [
  {
    q: "What marketing channels work best for SaaS companies?",
    a: "It depends on whether you sell to small businesses or enterprise. For most B2B SaaS, SEO and content marketing build long-term inbound pipeline, while paid search and LinkedIn ads can accelerate results. Email nurture sequences are essential for moving prospects through a longer sales cycle. The right mix depends on your audience, price point, and sales motion.",
  },
  {
    q: "How do you approach content marketing for SaaS?",
    a: "We focus on content that maps to the buyer journey. Top-of-funnel content targets problem-aware searchers. Mid-funnel content — comparison pages, use case guides, feature breakdowns — helps prospects evaluate your solution. Bottom-of-funnel content supports the decision to buy. Every piece is built to rank in search and move the reader closer to a conversion.",
  },
  {
    q: "How do you measure SaaS marketing performance?",
    a: "We track the full funnel: traffic, lead volume, marketing qualified leads, demo requests, pipeline generated, and customer acquisition cost. We also monitor leading indicators like content engagement, email open rates, and ad click-through rates. The goal is to connect marketing activity to revenue, not just vanity metrics.",
  },
  {
    q: "How long does it take to see results from SaaS marketing?",
    a: "Paid campaigns can generate leads within the first few weeks. SEO and content marketing are longer-term plays that typically show meaningful traction within three to six months, with compounding returns over time. Email nurture sequences begin delivering value as soon as you have a contact list to work with.",
  },
  {
    q: "Can you help reduce customer churn through marketing?",
    a: "Marketing plays a role in churn reduction by attracting better-fit customers in the first place. When your acquisition channels target the right audience with accurate messaging, the customers you bring in are more likely to succeed with your product. We also help with onboarding email sequences and customer communication strategies.",
  },
];

export default function SaaSPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing for SaaS Companies",
    description:
      "Marketing strategies for SaaS companies including performance marketing, SEO, content marketing, email nurture campaigns, and analytics.",
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
          { label: "SaaS" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
          <Animate animation="fade-up">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6">
              <Cloud size={28} strokeWidth={2} aria-hidden="true" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
              Digital Marketing for SaaS Companies
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6">
              Software as a service, B2B SaaS, tech startups &mdash;
              your buyers research solutions online long before they talk to
              sales. We help SaaS companies build pipeline, reduce acquisition
              costs, and turn traffic into qualified demos.
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
            <img src="/images/industries/saas.svg" alt="" className="w-full aspect-[4/3] object-cover" />
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
              Marketing Services for SaaS Companies
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
              SaaS companies face distinct marketing challenges driven by
              competition, long buying cycles, and the need to prove ROI. Here
              are the problems we solve every day.
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
              Ready to Grow Your SaaS Pipeline?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing engine that drives qualified demos
              and predictable revenue.
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
