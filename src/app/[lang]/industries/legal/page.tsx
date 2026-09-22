import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import {
  Scale,
  Search,
  MousePointerClick,
  Globe,
  MapPin,
  FileText,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing for Law Firms",
  description:
    "Marketing strategies for law firms and legal services including SEO, PPC, website development, local SEO, content marketing, and reputation management.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/industries/legal",
  },
  openGraph: {
    title: "Digital Marketing for Law Firms",
    description: "Marketing strategies for law firms and legal services including SEO, PPC, website development, local SEO, content marketing, and reputation management.",
  },
};

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Search,
    title: "SEO",
    desc: "Rank for practice-area and location-specific queries so potential clients find your firm when they need legal help.",
  },
  {
    icon: MousePointerClick,
    title: "PPC / Google Ads",
    desc: "Targeted campaigns for high-intent legal searches that put your firm at the top of results when it matters most.",
  },
  {
    icon: Globe,
    title: "Website Development",
    desc: "Professional, fast-loading websites that communicate credibility and make it easy for visitors to schedule a consultation.",
  },
  {
    icon: MapPin,
    title: "Local SEO / Google Business Profile",
    desc: "Optimize your firm's local presence so you appear in map results and local searches in your practice area.",
  },
  {
    icon: FileText,
    title: "Content Marketing",
    desc: "Informative articles and resources that demonstrate expertise, answer common legal questions, and build authority in your practice areas.",
  },
  {
    icon: Star,
    title: "Reputation Management",
    desc: "Monitor and grow your online reviews to build the trust that potential clients look for when choosing a law firm.",
  },
];

const challenges = [
  {
    title: "Ethical advertising constraints",
    desc: "Legal marketing is subject to bar association rules and ethical guidelines. Every ad, claim, and piece of content must be compliant, which limits what you can say and how you can say it.",
  },
  {
    title: "Highly competitive keywords",
    desc: "Legal search terms are among the most expensive in PPC. Competing effectively requires smart keyword strategy and efficient budget allocation.",
  },
  {
    title: "Building trust before the first meeting",
    desc: "Potential clients are often in difficult situations and need to trust your firm before they reach out. Your online presence must communicate credibility, empathy, and competence.",
  },
  {
    title: "Client confidentiality in marketing",
    desc: "Law firms cannot share client names, case details, or outcomes without explicit permission. Marketing must build credibility without relying on specifics that could compromise confidentiality.",
  },
  {
    title: "Differentiating your practice",
    desc: "Many firms in the same market offer similar services. Clear positioning, strong content, and a professional online presence help you stand out from the competition.",
  },
];

const faq = [
  {
    q: "What digital marketing strategies work best for law firms?",
    a: "SEO and PPC are the primary drivers for law firms because potential clients search for legal help with high intent. A well-optimized website and Google Business Profile ensure you appear in those results. Content marketing builds long-term authority, and reputation management reinforces trust.",
  },
  {
    q: "Are there restrictions on how law firms can advertise?",
    a: "Yes. Bar associations in most jurisdictions have rules governing attorney advertising. These rules vary by state and cover areas like testimonials, guarantees of outcomes, and how you describe your practice. All marketing materials should be reviewed for compliance with applicable rules.",
  },
  {
    q: "How competitive is PPC for law firms?",
    a: "Legal keywords are among the most expensive in Google Ads. Cost per click for terms like personal injury lawyer or criminal defense attorney can be significant. Effective law firm PPC requires careful keyword selection, strong landing pages, and ongoing optimization to maintain a positive return.",
  },
  {
    q: "How important are online reviews for law firms?",
    a: "Very important. Potential clients read reviews before contacting a firm. A consistent stream of positive reviews on Google and legal directories builds trust and influences the decision to reach out. Responding professionally to all reviews — positive and negative — also matters.",
  },
  {
    q: "How long does it take to see results from law firm SEO?",
    a: "SEO for law firms is a long-term investment. Most firms begin to see measurable improvement in rankings and organic traffic within three to six months, with results continuing to build over time. PPC can generate leads more immediately while SEO gains momentum.",
  },
];

export default function LegalPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing for Law Firms",
    description:
      "Marketing strategies for law firms and legal services including SEO, PPC, website development, local SEO, content marketing, and reputation management.",
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
          { label: "Law Firms" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Page header" className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
          <Animate animation="fade-up">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6">
              <Scale size={28} strokeWidth={2} aria-hidden="true" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
              Digital Marketing for Law Firms
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6">
              Law firms, solo practitioners, legal services &mdash;
              potential clients search for legal help online before making a
              single phone call. We help law firms build visibility, earn
              trust, and convert searches into consultations.
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
            <img loading="lazy" src="/images/industries/legal.svg" alt="Legal marketing services" className="w-full aspect-[4/3] object-cover" />
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
              Marketing Services for Law Firms
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
              Law firms face unique marketing challenges shaped by regulation,
              competition, and trust. Here are the problems we solve every day.
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
              Ready to Grow Your Legal Practice?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that brings qualified
              clients to your firm.
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
