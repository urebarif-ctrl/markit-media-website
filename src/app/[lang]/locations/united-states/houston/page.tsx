import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Houston — Markit Media",
  description:
    "Performance marketing, SEO, PPC, and web development for businesses in Houston. Digital strategies built for energy, healthcare, and real estate sectors in America's fastest-growing metro.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/locations/united-states/houston",
  },
  openGraph: {
    title: "Digital Marketing Agency in Houston — Markit Media",
    description:
      "Performance marketing, SEO, PPC, and web development for businesses in Houston. Digital strategies built for energy, healthcare, and real estate sectors in America's fastest-growing metro.",
  },
};

const serviceItems = [
  {
    title: "Performance Marketing",
    desc: "Data-driven paid media campaigns across Google, Meta, and LinkedIn — tuned for Houston's competitive energy, healthcare, and B2B service verticals where cost-per-lead discipline matters most.",
  },
  {
    title: "SEO",
    desc: "Technical optimization, keyword strategy, and content development to rank in Houston's local search results and capture high-intent traffic from the metro's 7 million residents.",
  },
  {
    title: "Social Media Marketing",
    desc: "Platform-specific content and paid social campaigns designed for Houston audiences, from oil and gas professionals on LinkedIn to consumer brands reaching the city's diverse communities.",
  },
  {
    title: "Website Development",
    desc: "Fast, conversion-focused websites on WordPress, Shopify, and Next.js — built for Houston businesses that need to turn site visitors into qualified leads or customers.",
  },
  {
    title: "Branding & Design",
    desc: "Visual identity systems, brand guidelines, and creative assets that position Houston businesses to stand out in industries crowded with established players.",
  },
  {
    title: "Video Production",
    desc: "Promotional videos, testimonial content, and social-first video assets that communicate your value proposition to Houston's market without requiring an in-house production team.",
  },
  {
    title: "Email Marketing",
    desc: "Automated sequences, newsletter campaigns, and lead nurture flows designed to move Houston prospects through long B2B sales cycles common in energy and professional services.",
  },
  {
    title: "Content Marketing",
    desc: "Blog posts, whitepapers, case studies, and industry-specific content that establishes authority in Houston's key sectors — energy, medical devices, real estate development, and logistics.",
  },
  {
    title: "AI Solutions",
    desc: "AI-powered chatbots, predictive analytics dashboards, and marketing automation workflows that give Houston businesses an operational edge without adding headcount.",
  },
];

const reasons = [
  {
    title: "Energy and healthcare sector digital expertise",
    desc: "Houston's economy runs on energy and healthcare — two industries with complex buyer journeys, regulatory nuances, and long sales cycles. We build campaigns that speak the language of these sectors and reach decision-makers at the right stage.",
  },
  {
    title: "Rapid metro growth creating new market opportunities",
    desc: "Houston adds tens of thousands of new residents every year, creating fresh demand across consumer services, housing, dining, and professional services. We help businesses capture this expanding audience before competitors lock in brand loyalty.",
  },
  {
    title: "Competitive real estate marketing",
    desc: "Houston's real estate market moves fast — from master-planned communities to commercial developments. We build lead generation funnels, landing pages, and paid campaigns that deliver qualified buyer and investor inquiries consistently.",
  },
  {
    title: "Senior-level execution at a competitive price point",
    desc: "Our distributed team delivers the same strategic depth and campaign quality as high-overhead agencies at a more competitive price point — so more of your budget goes into actual media spend and content production, not agency margins.",
  },
];

const faqItems = [
  {
    q: "How does Markit Media handle marketing for Houston's energy sector?",
    a: "We research your specific sub-sector — upstream, midstream, downstream, or energy services — and build campaigns targeting the job titles and companies that match your ideal customer profile. That includes LinkedIn advertising for B2B lead generation, SEO content around industry-specific search terms, and account-based marketing strategies for high-value prospects.",
  },
  {
    q: "What does a healthcare digital strategy look like for Houston businesses?",
    a: "For healthcare clients in Houston, we focus on local SEO to capture patient search intent, HIPAA-aware advertising practices, reputation management, and content marketing that builds trust with both patients and referring physicians. Houston's Texas Medical Center ecosystem makes healthcare one of the highest-opportunity verticals in the metro.",
  },
  {
    q: "Can you help with real estate marketing in Houston?",
    a: "Yes. We build lead generation systems for developers, brokerages, and property management firms across Houston. That includes paid search and social campaigns targeting buyers and renters, IDX-integrated websites, email drip sequences for long-cycle prospects, and retargeting to stay visible throughout the decision process.",
  },
  {
    q: "How does a remote team serve Houston's fast-growing market effectively?",
    a: "We use asynchronous workflows, shared project management tools, and scheduled calls aligned to your time zone. Our team monitors campaign performance daily and provides the same reporting cadence and strategic input you would expect from a local agency — at a lower cost structure that lets you invest more in actual media spend.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Markit Media",
  description:
    "Digital marketing agency serving businesses in Houston with performance marketing, SEO, PPC, web development, and branding.",
  areaServed: { "@type": "City", name: "Houston" },
  url: "https://themarkitmedia.com/en/locations/united-states/houston",
};

const subPages = [
  {
    title: "Marketing Agency",
    href: "/locations/united-states/houston/marketing-agency",
    desc: "Full-service marketing strategy and execution for Houston businesses across energy, healthcare, and professional services.",
  },
  {
    title: "PPC & Paid Ads",
    href: "/locations/united-states/houston/ppc-ads",
    desc: "Google Ads and Meta Ads management built for Houston's competitive B2B and consumer verticals.",
  },
  {
    title: "Website Development",
    href: "/locations/united-states/houston/website-development",
    desc: "Custom web development for businesses serving the Houston metro area.",
  },
  {
    title: "SEO Services",
    href: "/locations/united-states/houston/seo-services",
    desc: "Search engine optimization for competitive Houston keywords and local search.",
  },
];

export default function HoustonPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
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
          { label: "Houston" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Houston" className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Houston</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3 max-w-3xl">
              Digital Marketing Agency Serving Businesses in Houston
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Houston is the energy capital of the world, home to the largest
              medical center on the planet, and one of America&apos;s
              fastest-growing metros. Its economy is massive, diverse, and
              fiercely competitive — which means digital marketing here demands
              precision, not guesswork.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
              Markit Media serves Houston businesses with performance marketing,
              SEO, PPC, web development, and branding — built for the sectors
              that drive this city: energy, healthcare, real estate, and
              professional services.
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

      {/* Services Grid */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Digital marketing services for Houston businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Services</SectionLabel>
            <SectionTitle>
              What We Deliver for Houston Businesses
            </SectionTitle>
          </Animate>
          <Stagger
            stagger={60}
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {serviceItems.map((svc) => (
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
        aria-label="Why businesses in Houston choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Businesses in Houston Choose Markit Media
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
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Frequently asked questions about Houston digital marketing"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>
              Common Questions About Marketing in Houston
            </SectionTitle>
          </Animate>
          <div className="mt-10 space-y-4">
            {faqItems.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <details className="group border border-gray-200 bg-white">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-base font-bold text-black">
                    {item.q}
                    <span className="ml-4 flex-shrink-0 text-xl leading-none transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-4">
                    <p className="text-base text-gray-500 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </details>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-pages */}
      <section className="px-6 lg:px-12 py-20" aria-label="Houston service pages">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore</SectionLabel>
            <SectionTitle>Houston Service Pages</SectionTitle>
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
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Grow Your Business in Houston?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a digital strategy that matches the scale and
              speed of Houston&apos;s market. No long-term contracts — just
              results.
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
