import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import {
  Factory,
  Search,
  FileText,
  Target,
  Globe,
  Video,
  Presentation,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing for Manufacturing & Industrial",
  description:
    "Marketing strategies for manufacturers, industrial companies, and B2B suppliers. SEO, content marketing, LinkedIn advertising, website development, video production, and trade show marketing to reach buyers and engineers.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/industries/manufacturing",
  },
};

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Search,
    title: "SEO",
    desc: "Rank for technical product queries, specification searches, and industrial solution terms so engineers and procurement teams find your capabilities when sourcing suppliers.",
  },
  {
    icon: FileText,
    title: "Content Marketing",
    desc: "Technical whitepapers, application guides, product comparisons, and case studies that demonstrate expertise and guide buying committees through complex purchasing decisions.",
  },
  {
    icon: Target,
    title: "LinkedIn Advertising",
    desc: "Reach engineers, procurement managers, and C-suite decision-makers with targeted LinkedIn campaigns that build awareness and generate qualified leads for your sales team.",
  },
  {
    icon: Globe,
    title: "Website Development",
    desc: "Industrial-grade websites with product catalogs, specification sheets, CAD file downloads, and RFQ forms that serve as a 24/7 sales tool for your manufacturing capabilities.",
  },
  {
    icon: Video,
    title: "Video Production",
    desc: "Facility tours, process demonstrations, product showcases, and equipment walkthroughs that give buyers confidence in your manufacturing capabilities and quality standards.",
  },
  {
    icon: Presentation,
    title: "Trade Show Marketing",
    desc: "Pre-show outreach, booth collateral, lead capture strategies, and post-show follow-up campaigns that maximize your return on investment from industry trade shows and events.",
  },
];

const challenges = [
  {
    title: "Complex buying committees",
    desc: "Manufacturing purchasing decisions involve multiple stakeholders including engineers, procurement managers, quality teams, and executives. Marketing content needs to address the concerns and priorities of each role in the buying committee.",
  },
  {
    title: "Long sales cycles",
    desc: "Industrial sales cycles often span months or even years from initial research to purchase order. Marketing strategies must maintain engagement and build trust through sustained touchpoints over extended decision timelines.",
  },
  {
    title: "Technical content needs",
    desc: "Manufacturing buyers expect detailed technical content including specifications, tolerances, material certifications, and application data. Creating accurate, comprehensive technical marketing content requires deep product knowledge.",
  },
  {
    title: "Niche audiences",
    desc: "Manufacturing companies often serve highly specialized markets with small but valuable buyer pools. Digital marketing must precisely target the right engineers, buyers, and decision-makers without wasting spend on irrelevant audiences.",
  },
];

const results = [
  {
    title: "Increased qualified leads",
    desc: "SEO, LinkedIn campaigns, and technical content marketing connect your manufacturing capabilities with engineers and procurement teams actively sourcing suppliers, resulting in more RFQs and qualified opportunities.",
  },
  {
    title: "Shorter sales cycles",
    desc: "Comprehensive technical content and a strong digital presence give buyers the information they need to evaluate your capabilities faster, reducing time from initial inquiry to purchase decision.",
  },
  {
    title: "Improved online visibility",
    desc: "Search engine optimization and content marketing position your company in front of industrial buyers during the research phase, when supplier shortlists are being built.",
  },
];

const faq = [
  {
    q: "What digital marketing channels work best for manufacturing companies?",
    a: "SEO and content marketing are the foundation because engineers and procurement professionals begin their supplier research with search engines. LinkedIn is the strongest social platform for reaching industrial decision-makers through both organic content and paid advertising. Video content including facility tours and product demonstrations builds buyer confidence. Trade show marketing, when integrated with digital follow-up, remains highly effective for relationship-building in manufacturing.",
  },
  {
    q: "How can manufacturers generate leads online?",
    a: "The most effective approach combines technical SEO to capture product and specification searches, content marketing with whitepapers and application guides that require contact information to download, LinkedIn advertising targeting specific job titles and industries, and a website with RFQ forms and product configurators. The key is providing enough technical value that buyers willingly share their contact information in exchange for useful resources.",
  },
  {
    q: "How important is a website for manufacturing companies?",
    a: "A well-built website is essential for modern manufacturing marketing. Buyers and engineers expect to find product specifications, certifications, capability information, and contact options online before reaching out to sales. A website that serves as a comprehensive product catalog and sales tool works around the clock and can reach buyers globally. Companies with outdated or minimal websites lose opportunities to competitors with better digital presence.",
  },
  {
    q: "How long does it take to see results from manufacturing marketing?",
    a: "LinkedIn advertising and PPC campaigns can generate leads within the first month. SEO and content marketing typically show measurable results within three to six months as technical content gains search authority. Given the long sales cycles in manufacturing, the full impact of a marketing program on revenue is often visible within six to twelve months. Consistent investment in content builds compounding returns over time.",
  },
];

export default function ManufacturingPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing for Manufacturing & Industrial",
    description:
      "Marketing strategies for manufacturers, industrial companies, and B2B suppliers to reach buyers and engineers and generate qualified leads.",
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
          { label: "Manufacturing & Industrial" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Animate animation="fade-up">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6">
                <Factory size={28} strokeWidth={2} aria-hidden="true" />
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
                Digital Marketing for Manufacturing &amp; Industrial
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mt-6">
                Manufacturers, industrial suppliers, and B2B companies &mdash;
                engineers and procurement teams research capabilities, compare
                suppliers, and shortlist vendors online before they ever contact
                sales. We help manufacturing companies get found, demonstrate
                expertise, and generate qualified leads.
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
            <img
              src="/images/industries/manufacturing.svg"
              alt=""
              className="w-full aspect-[4/3] object-cover"
            />
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
              Marketing Services for Manufacturing &amp; Industrial
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
                className="bg-white border border-gray-200 p-6"
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
              The manufacturing and industrial sector faces distinct digital
              marketing challenges. Here are the problems we help manufacturers
              and industrial companies solve.
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

      {/* Results */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Expected results"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What to Expect</SectionLabel>
            <SectionTitle>Results That Matter</SectionTitle>
            <SectionDesc>
              Manufacturing marketing should deliver measurable business
              outcomes. Here is what a well-executed strategy delivers.
            </SectionDesc>
          </Animate>
          <ul className="mt-10 space-y-4">
            {results.map((r, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <li className="flex items-start gap-4 py-3 border-b border-gray-200">
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center flex-shrink-0 text-base font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <span className="text-base font-bold text-black">
                      {r.title}
                    </span>
                    <p className="text-base text-gray-500 leading-relaxed mt-1">
                      {r.desc}
                    </p>
                  </div>
                </li>
              </Animate>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-12 py-20" aria-label="FAQ">
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
              Ready to Reach More Buyers?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that connects your
              manufacturing capabilities with the engineers and buyers who need
              them.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
