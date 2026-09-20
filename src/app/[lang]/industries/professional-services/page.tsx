import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import {
  Briefcase,
  Search,
  FileText,
  Users,
  MousePointerClick,
  Globe,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing for Professional Services",
  description:
    "Marketing strategies for law firms, accounting practices, consulting firms, and professional service providers. SEO, content marketing, LinkedIn marketing, PPC, website development, and reputation management.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/industries/professional-services",
  },
};

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Search,
    title: "SEO",
    desc: "Rank for high-value service and location-based searches so potential clients find your firm when they need legal, accounting, or consulting expertise.",
  },
  {
    icon: FileText,
    title: "Content Marketing",
    desc: "Thought leadership articles, whitepapers, case studies, and guides that demonstrate expertise, build trust, and attract qualified prospects through organic search.",
  },
  {
    icon: Users,
    title: "LinkedIn Marketing",
    desc: "Build authority and generate leads on the platform where business decisions are made. Organic thought leadership and targeted advertising to reach key decision-makers.",
  },
  {
    icon: MousePointerClick,
    title: "PPC / Google Ads",
    desc: "Capture high-intent prospects searching for professional services with targeted campaigns that drive consultations, inquiries, and qualified leads.",
  },
  {
    icon: Globe,
    title: "Website Development",
    desc: "Professional, trust-building websites that clearly communicate your expertise, showcase credentials, and make it easy for prospects to schedule a consultation.",
  },
  {
    icon: Star,
    title: "Reputation Management",
    desc: "Build and protect your online reputation across Google, legal directories, and industry platforms. Positive reviews and ratings directly influence client acquisition.",
  },
];

const challenges = [
  {
    title: "Trust building and credibility",
    desc: "Professional services involve significant financial and personal stakes. Potential clients need to trust your expertise and judgment before engaging. Marketing must establish credibility through demonstrated knowledge, credentials, and social proof.",
  },
  {
    title: "Long sales cycles",
    desc: "Decisions to hire a law firm, accountant, or consultant often take weeks or months. Marketing strategies need to nurture leads over time with relevant content and consistent touchpoints until the prospect is ready to engage.",
  },
  {
    title: "Regulatory constraints on advertising",
    desc: "Many professional services face advertising regulations and ethical guidelines. Marketing campaigns need to be effective while staying compliant with industry-specific rules around claims, testimonials, and solicitation.",
  },
  {
    title: "Thought leadership differentiation",
    desc: "In crowded professional services markets, firms often offer similar capabilities. Establishing genuine thought leadership through content and public presence is essential for differentiation and attracting higher-value clients.",
  },
];

const results = [
  {
    title: "Increased qualified leads",
    desc: "SEO, PPC, and LinkedIn campaigns connect your firm with prospects actively searching for professional services, resulting in more consultations and higher-value engagements.",
  },
  {
    title: "Established thought leadership",
    desc: "Consistent content marketing and LinkedIn presence position your firm as a recognized authority in your practice area, attracting clients who value expertise over price.",
  },
  {
    title: "Improved online visibility",
    desc: "A strong digital presence across search, social, and review platforms ensures your firm appears when and where potential clients are evaluating their options.",
  },
];

const faq = [
  {
    q: "What digital marketing channels work best for professional services?",
    a: "SEO and content marketing form the foundation because potential clients often begin with search engine queries when looking for professional help. LinkedIn is the strongest social platform for B2B professional services, both for organic thought leadership and targeted advertising. PPC campaigns capture high-intent searches and deliver immediate lead flow. Reputation management across Google and industry directories protects your conversion rate.",
  },
  {
    q: "How can professional service firms generate leads online?",
    a: "The most effective approach combines SEO to capture organic search traffic, PPC to capture high-intent queries, and content marketing to build authority and nurture prospects. LinkedIn advertising and organic posting reach decision-makers directly. A well-designed website with clear calls to action converts visitors into consultations. Email nurturing keeps your firm top-of-mind during long decision cycles.",
  },
  {
    q: "How important is content marketing for professional services?",
    a: "Content marketing is critical for professional services because purchasing decisions are heavily influenced by perceived expertise and trust. Articles, whitepapers, case studies, and guides demonstrate knowledge and give potential clients confidence in your capabilities. Content also drives organic search traffic for service-related queries and provides material for LinkedIn and email marketing.",
  },
  {
    q: "How long does it take to see results from professional services marketing?",
    a: "PPC campaigns can generate leads within the first few weeks. LinkedIn advertising typically shows results within the first month. SEO and content marketing are longer-term investments that show meaningful results within three to six months. The combination of paid and organic channels creates both immediate lead flow and sustainable growth over time.",
  },
];

export default function ProfessionalServicesPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing for Professional Services",
    description:
      "Marketing strategies for law firms, accounting practices, consulting firms, and professional service providers to generate qualified leads and build authority.",
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
          { label: "Professional Services" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Animate animation="fade-up">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6">
                <Briefcase size={28} strokeWidth={2} aria-hidden="true" />
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
                Digital Marketing for Professional Services
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mt-6">
                Law firms, accounting practices, consulting firms, and
                professional service providers &mdash; your clients research
                credentials, read thought leadership, and compare options online
                before reaching out. We help professional service firms build
                authority, generate qualified leads, and win higher-value
                engagements.
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
              src="/images/industries/professional-services.svg"
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
              Marketing Services for Professional Services
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
              Professional services firms face distinct digital marketing
              challenges. Here are the problems we help law firms, accountants,
              and consultants solve.
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
              Professional services marketing should deliver measurable
              business outcomes. Here is what a well-executed strategy delivers.
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
              Ready to Grow Your Practice?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that positions your firm as
              a trusted authority and generates qualified leads.
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
