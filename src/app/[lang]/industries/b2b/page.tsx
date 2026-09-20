import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Briefcase, Search, MousePointerClick, FileText, Mail, BarChart3, Users } from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Digital Marketing for B2B Companies",
  description:
    "Strategic digital marketing services for B2B companies including SaaS, professional services, manufacturing, and consulting. Drive qualified leads and shorten sales cycles with targeted campaigns.",
  alternates: { canonical: "https://themarkitmedia.com/en/industries/b2b" },
};

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Search,
    title: "B2B SEO",
    desc: "Rank for the high-intent keywords your buyers actually search. We build technical SEO foundations and create content strategies that capture demand at every stage of the B2B buying journey.",
  },
  {
    icon: MousePointerClick,
    title: "LinkedIn Advertising",
    desc: "Reach decision-makers by job title, company size, and industry with precision-targeted LinkedIn campaigns. Put your message in front of the exact accounts you want to close.",
  },
  {
    icon: FileText,
    title: "Content Marketing & Thought Leadership",
    desc: "Position your brand as a trusted authority with whitepapers, case studies, and long-form content that educates prospects and moves them through the funnel.",
  },
  {
    icon: Mail,
    title: "Email Marketing & Lead Nurturing",
    desc: "Build automated email sequences that nurture prospects from first touch to closed deal. Segment audiences, personalize messaging, and keep your pipeline warm.",
  },
  {
    icon: Users,
    title: "Account-Based Marketing",
    desc: "Coordinate personalized campaigns across channels for your highest-value target accounts. Align marketing and sales around the accounts that matter most to your revenue.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Attribution",
    desc: "Track every touchpoint from first click to signed contract. Multi-touch attribution models show exactly which channels and campaigns drive real pipeline and revenue.",
  },
];

const challenges: { title: string; desc: string }[] = [
  {
    title: "Long, Complex Sales Cycles",
    desc: "B2B purchases can take months. Your marketing needs to sustain engagement and deliver value at every stage, from initial awareness through final procurement.",
  },
  {
    title: "Multiple Decision Makers",
    desc: "Buying committees involve stakeholders across departments, each with different priorities. Messaging must resonate with technical users, managers, and executives alike.",
  },
  {
    title: "Proving Marketing ROI to Leadership",
    desc: "B2B leadership teams demand clear evidence that marketing spend translates to pipeline and revenue, not just impressions and clicks.",
  },
  {
    title: "Generating Quality Leads Over Volume",
    desc: "A flood of unqualified leads wastes sales time. The focus must be on attracting prospects who match your ideal customer profile and are ready to have a conversation.",
  },
  {
    title: "Aligning Sales and Marketing",
    desc: "Disconnected teams mean lost opportunities. Marketing and sales need shared definitions, shared data, and shared goals to convert leads efficiently.",
  },
];

const faq: { q: string; a: string }[] = [
  {
    q: "How is B2B digital marketing different from B2C?",
    a: "B2B marketing targets organizations rather than individual consumers. This means longer sales cycles, higher deal values, multiple stakeholders in the buying decision, and content that emphasizes expertise and ROI rather than impulse or emotion. Strategies like account-based marketing and LinkedIn advertising are built specifically for this environment.",
  },
  {
    q: "Which channels work best for B2B lead generation?",
    a: "The most effective channels depend on your audience and offering, but B2B companies typically see strong results from SEO, LinkedIn advertising, email nurturing, and content marketing. A data-driven approach helps identify where your specific buyers spend their time and allocate budget accordingly.",
  },
  {
    q: "How do you measure success for B2B marketing campaigns?",
    a: "We focus on metrics tied to revenue: marketing-qualified leads, sales-qualified leads, pipeline value, and cost per acquisition. Vanity metrics like impressions matter less than tracking which campaigns actually contribute to closed deals through multi-touch attribution.",
  },
  {
    q: "How long does it take to see results from B2B digital marketing?",
    a: "Paid channels like LinkedIn Ads can generate leads within weeks. SEO and content marketing are longer-term investments that typically begin showing measurable traction within three to six months. We set realistic timelines based on your industry, competition, and current digital presence.",
  },
];

export default function B2BIndustryPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing for B2B Companies",
    description:
      "Strategic digital marketing services for B2B companies including SaaS, professional services, manufacturing, and consulting.",
    provider: {
      "@type": "Organization",
      name: "Markit Media",
      url: "https://themarkitmedia.com",
    },
    areaServed: ["United States", "Canada", "United Arab Emirates", "United Kingdom", "Australia", "Saudi Arabia"],
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
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }, { label: "B2B" }]} />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
          <Animate animation="fade-up">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6">
              <Briefcase size={28} strokeWidth={2} aria-hidden="true" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
              Digital Marketing for B2B Companies
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6">
              B2B buying decisions are complex, high-stakes, and driven by committees. Your marketing needs to reach the right people with the right message at the right stage of their journey. We help SaaS companies, professional services firms, manufacturers, and consultancies build digital strategies that generate qualified pipeline and accelerate revenue.
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
            <img src="/images/industries/b2b.svg" alt="" className="w-full aspect-[4/3] object-cover" />
          </Animate>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Services">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionTitle>Marketing Services for B2B Companies</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {services.map((svc) => (
              <div key={svc.title} className="bg-white border border-gray-200 p-6">
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
              B2B marketers face unique obstacles that consumer brands never encounter. Here are the challenges we help our clients overcome every day.
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
                    <p className="text-base text-gray-500 leading-relaxed mt-1">{c.desc}</p>
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
                  <div className="pb-5 text-base text-gray-500 leading-relaxed">{item.a}</div>
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
              Ready to Grow Your B2B Pipeline?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a digital marketing strategy that reaches your ideal buyers and turns them into customers. No fluff, no vanity metrics&mdash;just qualified leads and measurable revenue growth.
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
