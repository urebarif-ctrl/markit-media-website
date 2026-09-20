import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import {
  Wrench,
  Search,
  MousePointerClick,
  Globe,
  MapPin,
  Star,
  Smartphone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing for Home Services",
  description:
    "Marketing strategies for home service businesses including plumbing, HVAC, roofing, electrical, landscaping, and cleaning. SEO, PPC, local search, and reputation management.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/industries/home-services",
  },
  openGraph: {
    title: "Digital Marketing for Home Services",
    description: "Marketing strategies for home service businesses including plumbing, HVAC, roofing, electrical, landscaping, and cleaning. SEO, PPC, local search, and r...",
  },
};

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Search,
    title: "SEO",
    desc: "Rank higher in organic search results so homeowners find your business when they need a service provider.",
  },
  {
    icon: MousePointerClick,
    title: "PPC / Google Ads",
    desc: "Targeted pay-per-click campaigns that put your business at the top of search results for high-intent local queries.",
  },
  {
    icon: Globe,
    title: "Website Development",
    desc: "Fast, mobile-friendly websites built to convert visitors into service calls and appointment bookings.",
  },
  {
    icon: MapPin,
    title: "Local SEO / Google Business Profile",
    desc: "Optimize your Google Business Profile and local citations to dominate the map pack in your service area.",
  },
  {
    icon: Star,
    title: "Reputation Management",
    desc: "Monitor, respond to, and grow your online reviews across Google, Yelp, and industry-specific platforms.",
  },
  {
    icon: Smartphone,
    title: "Social Media",
    desc: "Build trust and stay top-of-mind with homeowners through consistent, professional social media content.",
  },
];

const challenges = [
  {
    title: "Standing out in local search",
    desc: "Homeowners search for services near them. Without a strong local presence, your business gets buried beneath competitors who have optimized their listings and citations.",
  },
  {
    title: "Managing seasonal demand",
    desc: "Most home service businesses experience peaks and valleys throughout the year. Marketing needs to adapt so you stay busy in slow months and capitalize on high-demand seasons.",
  },
  {
    title: "Building trust online",
    desc: "Customers invite service providers into their homes. Reviews, professional branding, and a credible online presence are essential to earning that trust before the first phone call.",
  },
  {
    title: "Competing with large franchises",
    desc: "National franchises have bigger budgets, but local businesses can win by being more visible, more responsive, and more connected to their community.",
  },
  {
    title: "Generating leads cost-effectively",
    desc: "Lead aggregator sites charge per lead regardless of quality. Owning your own marketing channels gives you better leads at a lower long-term cost.",
  },
];

const faq = [
  {
    q: "What digital marketing channels work best for home service businesses?",
    a: "Local SEO and Google Ads tend to deliver the most immediate results because homeowners search with high intent — they need a service now. A well-optimized Google Business Profile, combined with targeted PPC campaigns, puts your business in front of people ready to book. Social media and reputation management support these efforts by building long-term trust.",
  },
  {
    q: "How important is Google Business Profile for home service companies?",
    a: "It is one of the most important assets for a local service business. Your Google Business Profile determines whether you appear in the local map pack, which is often the first thing homeowners see when searching for a service. Keeping it complete, accurate, and actively managed with reviews and posts is essential.",
  },
  {
    q: "How can a home service business compete with larger franchises online?",
    a: "Local businesses can outperform franchises in their service area by focusing on local SEO, earning authentic reviews, and creating content specific to the neighborhoods they serve. Personalized service and community connection are advantages that large companies struggle to replicate.",
  },
  {
    q: "How do you handle seasonal fluctuations in demand?",
    a: "We adjust campaign budgets and messaging based on seasonal patterns. During peak seasons, we focus on maximizing lead volume. In slower months, we shift toward brand awareness, review generation, and content that keeps your pipeline warm for the next busy period.",
  },
  {
    q: "How long before we see results from digital marketing?",
    a: "PPC campaigns can generate leads within the first week of launching. SEO and local search optimization are longer-term strategies that typically show meaningful improvement within three to six months, with results compounding over time.",
  },
];

export default function HomeServicesPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing for Home Services",
    description:
      "Marketing strategies for home service businesses including plumbing, HVAC, roofing, electrical, landscaping, and cleaning.",
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
          { label: "Home Services" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
          <Animate animation="fade-up">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6">
              <Wrench size={28} strokeWidth={2} aria-hidden="true" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
              Digital Marketing for Home Services
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6">
              Plumbing, HVAC, roofing, electrical, landscaping, cleaning &mdash;
              no matter the trade, homeowners start their search online. We help
              home service businesses get found, build trust, and turn searches
              into booked jobs.
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
            <img src="/images/industries/home-services.svg" alt="Home Services marketing services" className="w-full aspect-[4/3] object-cover" />
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
              Marketing Services for Home Service Businesses
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
              Home service businesses face unique marketing challenges. Here are
              the problems we solve every day.
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
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Grow Your Home Service Business?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that keeps your phone
              ringing and your schedule full.
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
