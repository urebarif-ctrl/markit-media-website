import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import {
  Landmark,
  Search,
  MousePointerClick,
  FileText,
  Mail,
  Globe,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing for Financial Services",
  description:
    "Marketing strategies for banks, fintech, insurance, accounting, and wealth management firms. SEO, PPC, content marketing, email campaigns, and compliance-aware advertising.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/industries/finance",
  },
  openGraph: {
    title: "Digital Marketing for Financial Services",
    description: "Marketing strategies for banks, fintech, insurance, accounting, and wealth management firms. SEO, PPC, content marketing, email campaigns, and complianc...",
  },
};

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Search,
    title: "SEO",
    desc: "Rank for high-value financial keywords that drive qualified prospects searching for financial products and advisory services.",
  },
  {
    icon: MousePointerClick,
    title: "PPC / Google Ads",
    desc: "Targeted campaigns for financial services with careful audience segmentation, negative keyword management, and compliance-aware ad copy.",
  },
  {
    icon: FileText,
    title: "Content Marketing",
    desc: "Thought leadership content that builds authority and trust. Educational articles, guides, and resources that position your firm as an expert.",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    desc: "Nurture campaigns for long sales cycles, client onboarding sequences, and regular market updates that keep your firm top of mind.",
  },
  {
    icon: Globe,
    title: "Website Development",
    desc: "Professional, secure websites built for trust. Fast load times, clear CTAs, and conversion-optimized landing pages for financial products.",
  },
  {
    icon: Shield,
    title: "Compliance-Aware Advertising",
    desc: "Ad campaigns designed with regulatory requirements in mind. We understand the constraints of marketing financial products and services.",
  },
];

const challenges = [
  {
    title: "Regulatory compliance",
    desc: "Financial services marketing must comply with regulations from bodies like the SEC, FINRA, FCA, and others. Every claim must be substantiated, and disclaimers must be properly placed.",
  },
  {
    title: "Building trust in a skeptical market",
    desc: "Consumers are cautious with their money. Your marketing needs to demonstrate credibility, security, and expertise before prospects will engage.",
  },
  {
    title: "Competing with established institutions",
    desc: "Smaller firms and fintechs compete against household-name banks and insurance companies with massive brand recognition and marketing budgets.",
  },
  {
    title: "Explaining complex products simply",
    desc: "Financial products are inherently complex. Marketing must translate technical features into clear benefits that resonate with non-expert audiences.",
  },
  {
    title: "Long consideration cycles",
    desc: "Financial decisions take time. Marketing strategies need to nurture prospects across weeks or months before they convert into clients.",
  },
];

const faq = [
  {
    q: "What digital marketing channels work best for financial services?",
    a: "SEO and content marketing are typically the foundation, because financial decisions start with research. Paid search captures high-intent prospects actively looking for financial products. Email marketing nurtures leads through long consideration cycles. LinkedIn works well for B2B financial services and wealth management.",
  },
  {
    q: "How do you handle compliance requirements in financial marketing?",
    a: "We work within your compliance framework. All ad copy, landing pages, and content go through your review process before publishing. We understand common requirements around disclaimers, fair lending, and substantiation of claims. We do not make guarantees about returns or performance.",
  },
  {
    q: "How long does it take to see results from financial services marketing?",
    a: "Paid campaigns can generate qualified leads within the first month. SEO and content marketing typically show meaningful results within four to six months due to the competitive nature of financial keywords. Email nurture sequences can shorten the sales cycle once established.",
  },
  {
    q: "Can you help fintech companies compete with established banks?",
    a: "Yes. Fintech companies often win by targeting specific niches, emphasizing speed and user experience, and using content marketing to educate potential customers about alternatives to traditional banking. We help position fintech brands as credible, modern alternatives.",
  },
  {
    q: "Do you work with both B2B and B2C financial services?",
    a: "Yes. We work with consumer-facing financial products like personal banking and insurance, as well as B2B financial services like commercial lending, payment processing, and accounting software. The channel mix and messaging differ, but our strategic framework applies to both.",
  },
];

export default function FinancePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing for Financial Services",
    description:
      "Marketing strategies for banks, fintech, insurance, accounting, and wealth management firms.",
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
          { label: "Financial Services" },
        ]}
      />

      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Animate animation="fade-up">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6">
                <Landmark size={28} strokeWidth={2} aria-hidden="true" />
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
                Digital Marketing for Financial Services
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mt-6">
                Banks, fintech, insurance, accounting, and wealth management
                firms need marketing that builds trust, meets compliance
                requirements, and converts qualified prospects into long-term
                clients. We help financial services companies grow with
                strategies designed for your regulatory environment.
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
              src="/images/industries/finance.svg"
              alt=""
              className="w-full aspect-[4/3] object-cover"
            />
          </Animate>
        </div>
      </section>

      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Services"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionTitle>
              Marketing Services for Financial Companies
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

      <section
        className="px-6 lg:px-12 py-20"
        aria-label="Industry challenges"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Industry Challenges</SectionLabel>
            <SectionTitle>Common Pain Points</SectionTitle>
            <SectionDesc>
              Financial services companies face unique marketing challenges. Here
              are the problems we help solve.
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

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Grow Your Financial Services Firm?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that meets your compliance
              needs and drives qualified leads.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
