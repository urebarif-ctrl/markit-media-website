import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import {
  Building,
  Search,
  MousePointerClick,
  Globe,
  Star,
  FileText,
  Share2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing for Construction & Home Building",
  description:
    "Marketing strategies for contractors, home builders, remodelers, and construction companies. Local SEO, PPC, website development, reputation management, content marketing, and social media to generate qualified leads.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/industries/construction",
  },
  openGraph: {
    title: "Digital Marketing for Construction & Home Building",
    description: "Marketing strategies for contractors, home builders, remodelers, and construction companies. Local SEO, PPC, website development, reputation management,...",
  },
};

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Search,
    title: "Local SEO",
    desc: "Rank in local search results and Google Maps so homeowners in your service area find your business when they search for contractors, builders, or remodelers.",
  },
  {
    icon: MousePointerClick,
    title: "PPC for Contractors",
    desc: "Capture high-intent leads searching for construction services with targeted Google Ads campaigns that drive calls, form fills, and estimate requests.",
  },
  {
    icon: Globe,
    title: "Website Development",
    desc: "Professional, mobile-first websites that showcase your past projects, highlight certifications, and make it easy for homeowners to request a quote.",
  },
  {
    icon: Star,
    title: "Reputation Management",
    desc: "Build and protect your online reputation by generating reviews on Google and Houzz, and responding professionally to feedback that influences hiring decisions.",
  },
  {
    icon: FileText,
    title: "Content Marketing",
    desc: "Educational blog posts, project guides, and FAQ content that answers homeowner questions, builds trust, and improves your search engine rankings.",
  },
  {
    icon: Share2,
    title: "Social Media",
    desc: "Showcase completed projects, behind-the-scenes progress, and team expertise on Facebook, Instagram, and LinkedIn to build credibility and generate referrals.",
  },
];

const challenges = [
  {
    title: "Seasonal demand fluctuations",
    desc: "Construction activity peaks in warmer months and slows in winter in many regions. Marketing strategies need to account for seasonal shifts in demand and adjust spend and messaging accordingly.",
  },
  {
    title: "Intense local competition",
    desc: "Homeowners compare multiple contractors before making a decision. Standing out in local search results, review platforms, and paid ads is essential to winning bids consistently.",
  },
  {
    title: "Building trust with homeowners",
    desc: "Construction projects represent significant financial commitments. Homeowners need proof of quality work, proper licensing, and reliability before they hire a contractor.",
  },
  {
    title: "Showcasing past projects effectively",
    desc: "Before-and-after photos, project galleries, and case studies are critical for demonstrating capabilities. Without strong visual proof of work, potential clients move to a competitor who has it.",
  },
];

const results = [
  {
    title: "Increased qualified leads",
    desc: "Local SEO and PPC campaigns bring in homeowners actively searching for construction services in your area, resulting in more estimate requests and booked projects.",
  },
  {
    title: "Stronger online reputation",
    desc: "A steady flow of positive reviews on Google and industry platforms builds the trust that homeowners need before committing to a contractor.",
  },
  {
    title: "Improved online visibility",
    desc: "Consistent search rankings, a professional website, and active social media presence ensure your business is found by homeowners at every stage of their decision process.",
  },
];

const faq = [
  {
    q: "What digital marketing channels work best for construction companies?",
    a: "Local SEO and Google Ads are the strongest channels because most homeowners start with a search engine query when looking for contractors. A well-optimized Google Business Profile and targeted PPC campaigns capture high-intent leads. Social media is effective for showcasing projects and building brand awareness, while content marketing strengthens SEO and positions your company as a trusted authority.",
  },
  {
    q: "How important are online reviews for construction businesses?",
    a: "Extremely important. Homeowners research contractors thoroughly before hiring, and reviews on Google, Houzz, and the Better Business Bureau are among the first things they check. A strong review profile with recent, detailed reviews significantly increases the likelihood of getting contacted. Responding to all reviews, positive and negative, demonstrates professionalism.",
  },
  {
    q: "How can contractors generate leads during the off-season?",
    a: "Off-season marketing should focus on planning-stage homeowners who are researching projects for spring and summer. Content marketing, email nurturing, and retargeting campaigns keep your brand visible during slower months. Offering off-season promotions or interior-focused services can also help maintain a pipeline when outdoor construction slows down.",
  },
  {
    q: "How long does it take to see results from construction marketing?",
    a: "PPC campaigns can generate leads within the first week of launching. Local SEO improvements typically show results within three to six months as your Google Business Profile and website gain authority. Social media builds brand recognition over time and works best when maintained consistently with project showcases and community engagement.",
  },
];

export default function ConstructionPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing for Construction & Home Building",
    description:
      "Marketing strategies for contractors, home builders, remodelers, and construction companies to generate qualified leads and build trust.",
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
          { label: "Construction & Home Building" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Page header" className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Animate animation="fade-up">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6">
                <Building size={28} strokeWidth={2} aria-hidden="true" />
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
                Digital Marketing for Construction &amp; Home Building
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mt-6">
                Contractors, home builders, remodelers, and construction
                companies &mdash; homeowners research and compare online before
                they ever pick up the phone. We help construction businesses get
                found locally, generate qualified leads, and build the reputation
                that wins bids.
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
            <img
              src="/images/industries/construction.svg"
              alt="Construction marketing services"
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
              Marketing Services for Construction &amp; Home Building
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
              The construction industry faces distinct digital marketing
              challenges. Here are the problems we help contractors and builders
              solve.
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
              Construction marketing should generate measurable business
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
              Ready to Build Your Pipeline?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that generates qualified
              leads and helps your construction business grow.
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
