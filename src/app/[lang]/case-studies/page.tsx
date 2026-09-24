import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Measurable marketing results across industries. Case studies in SEO, PPC, branding, web development, and more.",
  alternates: { canonical: "https://themarkitmedia.com/en/case-studies" },
  openGraph: {
    title: "Case Studies — Markit Media",
    description:
      "Measurable marketing results across industries — SEO, PPC, branding, web development, and more.",
  },
};

const serviceFilters = [
  "All",
  "Performance Marketing",
  "SEO",
  "Social Media",
  "Branding",
  "Web Development",
  "Video Production",
];

function PatternA() {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-full">
      <rect width="400" height="240" fill="#F5F5F5" />
      <rect x="40" y="30" width="80" height="80" stroke="#000" strokeWidth="2" fill="none" />
      <rect x="60" y="50" width="80" height="80" stroke="#999" strokeWidth="2" fill="none" />
      <circle cx="280" cy="70" r="50" stroke="#000" strokeWidth="2" fill="none" />
      <line x1="40" y1="180" x2="360" y2="180" stroke="#CCC" strokeWidth="1" />
      <rect x="40" y="190" width="60" height="8" fill="#000" />
      <rect x="40" y="206" width="120" height="6" fill="#DDD" />
    </svg>
  );
}

function PatternB() {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-full">
      <rect width="400" height="240" fill="#F5F5F5" />
      <polygon points="200,20 340,140 60,140" stroke="#000" strokeWidth="2" fill="none" />
      <polygon points="200,50 310,130 90,130" stroke="#999" strokeWidth="1.5" fill="none" />
      <line x1="60" y1="160" x2="340" y2="160" stroke="#CCC" strokeWidth="1" />
      <rect x="60" y="174" width="80" height="8" fill="#000" />
      <rect x="60" y="190" width="140" height="6" fill="#DDD" />
    </svg>
  );
}

function PatternC() {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-full">
      <rect width="400" height="240" fill="#F5F5F5" />
      <circle cx="120" cy="80" r="55" stroke="#000" strokeWidth="2" fill="none" />
      <circle cx="170" cy="80" r="55" stroke="#999" strokeWidth="2" fill="none" />
      <rect x="260" y="40" width="90" height="90" rx="6" stroke="#000" strokeWidth="2" fill="none" />
      <line x1="40" y1="170" x2="360" y2="170" stroke="#CCC" strokeWidth="1" />
      <rect x="40" y="184" width="70" height="8" fill="#000" />
      <rect x="40" y="200" width="130" height="6" fill="#DDD" />
    </svg>
  );
}

function PatternD() {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-full">
      <rect width="400" height="240" fill="#F5F5F5" />
      <rect x="50" y="30" width="120" height="80" rx="4" stroke="#000" strokeWidth="2" fill="none" />
      <rect x="230" y="30" width="120" height="80" rx="4" stroke="#999" strokeWidth="2" fill="none" />
      <line x1="110" y1="110" x2="290" y2="30" stroke="#CCC" strokeWidth="1" strokeDasharray="6 4" />
      <circle cx="200" cy="140" r="12" fill="#000" />
      <line x1="50" y1="180" x2="350" y2="180" stroke="#CCC" strokeWidth="1" />
      <rect x="50" y="192" width="90" height="8" fill="#000" />
      <rect x="50" y="208" width="160" height="6" fill="#DDD" />
    </svg>
  );
}

function PatternE() {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-full">
      <rect width="400" height="240" fill="#F5F5F5" />
      <path d="M60 130 Q130 20 200 80 Q270 140 340 40" stroke="#000" strokeWidth="2" fill="none" />
      <circle cx="60" cy="130" r="6" fill="#000" />
      <circle cx="200" cy="80" r="6" fill="#999" />
      <circle cx="340" cy="40" r="6" fill="#000" />
      <line x1="60" y1="160" x2="340" y2="160" stroke="#CCC" strokeWidth="1" />
      <rect x="60" y="174" width="75" height="8" fill="#000" />
      <rect x="60" y="190" width="150" height="6" fill="#DDD" />
    </svg>
  );
}

function PatternF() {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full h-full">
      <rect width="400" height="240" fill="#F5F5F5" />
      <rect x="60" y="30" width="60" height="100" stroke="#000" strokeWidth="2" fill="none" />
      <rect x="140" y="60" width="60" height="70" stroke="#999" strokeWidth="2" fill="none" />
      <rect x="220" y="20" width="60" height="110" stroke="#000" strokeWidth="2" fill="none" />
      <rect x="300" y="50" width="60" height="80" stroke="#999" strokeWidth="2" fill="none" />
      <line x1="40" y1="165" x2="380" y2="165" stroke="#CCC" strokeWidth="1" />
      <rect x="60" y="178" width="85" height="8" fill="#000" />
      <rect x="60" y="194" width="140" height="6" fill="#DDD" />
    </svg>
  );
}

const caseStudies = [
  {
    industry: "E-commerce",
    service: "SEO & Content",
    title: "SEO & Content Strategy for E-commerce Client",
    description:
      "Technical SEO audit, content strategy, and link building campaign to drive organic traffic growth.",
    Pattern: PatternA,
    image: "/images/portfolio/fashion-feed-hero.jpg", readTime: "6 min read", href: "/work/fashion-feed",
  },
  {
    industry: "Healthcare",
    service: "Performance Marketing",
    title: "Performance Marketing for Healthcare Client",
    description:
      "Multi-channel paid advertising strategy across Google Ads and Meta Ads to increase patient acquisition.",
    Pattern: PatternB,
    image: "/images/work/performance-marketing.svg", readTime: "7 min read", href: "/work/pur-health",
  },
  {
    industry: "B2B SaaS",
    service: "Full-Stack Marketing",
    title: "Full-Stack Marketing for B2B SaaS Client",
    description:
      "End-to-end marketing strategy combining SEO, paid media, and content marketing for lead generation.",
    Pattern: PatternC,
  },
  {
    industry: "Real Estate",
    service: "Branding & Web Development",
    title: "Branding & Web Development for Real Estate Client",
    description:
      "Complete brand identity redesign and high-performance website build to establish market positioning.",
    Pattern: PatternD,
    image: "/images/work/website-development.svg", readTime: "5 min read", href: "/work/one-homes",
  },
  {
    industry: "Education",
    service: "Social Media & Video",
    title: "Social Media & Video Production for Education Client",
    description:
      "Social media strategy and video content production to build brand awareness and drive enrollment.",
    Pattern: PatternE,
    image: "/images/portfolio/social-media-hero.jpg", readTime: "5 min read", href: "/work/social-media-designs",
  },
  {
    industry: "Hospitality",
    service: "Digital Marketing",
    title: "Digital Marketing for Hospitality Client",
    description:
      "Integrated digital marketing campaign including local SEO, reputation management, and paid advertising.",
    Pattern: PatternF,
  },
  {
    industry: "Home Services",
    service: "SEO & PPC",
    title: "Local Lead Generation for Home Services Client",
    description:
      "Local SEO optimization and Google Ads campaigns to drive qualified leads for a multi-location home services provider.",
    Pattern: PatternA,
  },
  {
    industry: "Finance",
    service: "Content Marketing",
    title: "Content Marketing for Financial Services Client",
    description:
      "Educational content strategy, lead magnets, and email nurture sequences for a financial advisory firm.",
    Pattern: PatternC,
  },
  {
    industry: "Fashion",
    service: "Social Media",
    title: "Social Commerce Strategy for Fashion Brand",
    description:
      "Instagram and TikTok content strategy, influencer partnerships, and shoppable content to drive direct-to-consumer sales.",
    Pattern: PatternE,
  },
  {
    industry: "Legal",
    service: "Web Development & SEO",
    title: "Website Redesign & SEO for Law Firm",
    description:
      "Complete website redesign with conversion optimization and local SEO strategy for a multi-practice law firm.",
    Pattern: PatternD,
  },
];

const caseStudyFaqItems = [
  { q: "Are these real client projects?", a: "Yes. Every case study represents a real engagement with a real business. We share the industry, the challenge, and the approach we took. Specific client names and detailed metrics are shared only with their permission — contact us for more details on any case study." },
  { q: "Can I see results specific to my industry?", a: "If your industry is listed on our Industries page, we likely have relevant experience. Reach out and we will share case studies and insights specific to your vertical and business model." },
  { q: "How do you measure success in a case study?", a: "We define success metrics at the start of every engagement — typically revenue growth, lead volume, cost per acquisition, or traffic growth. Our case studies report against the KPIs that were agreed upon, not cherry-picked vanity metrics." },
  { q: "How long do these campaigns typically take to show results?", a: "Paid advertising campaigns can show initial results within the first week. SEO and content marketing campaigns typically take 3-6 months to show meaningful organic growth. Branding and web development projects have defined timelines based on scope." },
];

export default function CaseStudiesPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: caseStudyFaqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const caseStudiesSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Markit Media Case Studies",
    description:
      "Case studies showcasing measurable marketing results delivered by Markit Media across industries.",
    url: "https://themarkitmedia.com/en/case-studies",
  };

  return (
    <article>
      <JsonLd data={caseStudiesSchema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Case Studies" }]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-20" aria-label="Case studies overview">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Case Studies</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Measurable Results, Real Impact
            </h1>
            <SectionDesc>
              Markit Media partners with businesses across industries to deliver
              marketing strategies that drive growth. Explore how we approach
              challenges and create measurable outcomes for our clients.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Service Category Filters */}
      <section className="px-6 lg:px-12 pb-8" aria-label="Filter by service">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <div
              className="flex flex-wrap gap-3"
              role="group"
              aria-label="Filter by service category"
            >
              {serviceFilters.map((filter, i) => (
                <button
                  key={filter}
                  className={`px-5 py-2.5 text-base font-semibold border transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    i === 0
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* Case Study Cards */}
      <section
        className="px-6 lg:px-12 py-12 bg-gray-50"
        aria-label="Case studies"
      >
        <div className="max-w-7xl mx-auto">
          <Stagger
            stagger={80}
            animation="fade-up"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {caseStudies.map((study) => (
              <div
                key={study.title}
                className="bg-white border border-gray-200 hover:border-black/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none overflow-hidden group"
              >
                <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                  {"image" in study && study.image ? <Image src={study.image} alt={study.title} width={800} height={500} className="w-full h-full object-cover" /> : <study.Pattern />}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 mb-3"><div className="flex items-center gap-3">
                    <span className="text-base font-semibold text-gray-500 uppercase tracking-wider bg-gray-100 px-2.5 py-1">
                      {study.industry}
                    </span>
                    <span className="text-base font-semibold text-black uppercase tracking-wider bg-gray-100 px-2.5 py-1">
                      {study.service}
                    </span>
                  </div><span className="text-base text-gray-400">{"readTime" in study ? study.readTime : "5 min read"}</span></div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black leading-snug mb-2">
                    {study.title}
                  </h3>
                  <p className="text-base text-gray-500 leading-relaxed mb-5">
                    {study.description}
                  </p>
                  <Link
                    href={("href" in study && study.href) || "/get-a-quote"}
                    className="inline-flex items-center gap-2 text-base font-bold text-black hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    Read Case Study
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Approach Overview */}
      <section className="px-6 lg:px-12 py-16" aria-label="Our approach to client work">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Approach</SectionLabel>
            <SectionTitle>How We Deliver Results</SectionTitle>
            <SectionDesc>
              Every engagement follows a structured process designed to minimize risk and maximize impact.
            </SectionDesc>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { step: "01", title: "Discovery & Audit", desc: "We analyze your current position, competitive landscape, and business objectives before recommending anything." },
              { step: "02", title: "Strategy Development", desc: "A custom strategy document with specific channels, tactics, KPIs, and timelines tailored to your goals." },
              { step: "03", title: "Execution & Optimization", desc: "We launch, test, measure, and refine. Every campaign gets continuous attention — not set-and-forget." },
              { step: "04", title: "Reporting & Scaling", desc: "Transparent reporting with clear metrics. We show what worked, what didn't, and where to invest next." },
            ].map((item) => (
              <div key={item.step} className="border border-gray-200 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <span className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-gray-200 block mb-4">{item.step}</span>
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">{item.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Stagger>
          <Animate animation="fade-up">
            <div className="mt-10 text-center">
              <Link href="/process" className="inline-flex items-center gap-2 text-base font-bold text-black hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                Learn more about our process &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* Industry Coverage */}
      <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="Industries we serve">
        <div className="max-w-4xl mx-auto text-center">
          <Animate animation="fade-up">
            <SectionLabel>Industries</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">
              Experience Across 20 Verticals
            </h2>
            <p className="text-base text-gray-500 mb-8 max-w-2xl mx-auto">
              Every industry has unique buyer journeys and competitive dynamics. Our experience across verticals means we bring cross-industry insights to every engagement.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["E-commerce", "Healthcare", "Real Estate", "B2B SaaS", "Education", "Hospitality", "Finance", "Legal", "Home Services", "Fashion", "Construction", "Manufacturing"].map((ind) => (
                <span key={ind} className="border border-gray-200 bg-white px-4 py-2 text-base font-medium text-black">
                  {ind}
                </span>
              ))}
              <Link href="/industries" className="border border-black bg-black text-white px-4 py-2 text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                View All Industries &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-12 py-20" aria-label="Case studies FAQ">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Questions About Our Work</SectionTitle>
          </Animate>
          <div className="mt-10">
            {caseStudyFaqItems.map((item, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <details className="group border-b border-gray-200">
                  <summary className="flex justify-between items-center py-5 cursor-pointer text-base font-bold text-black list-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                    {item.q}
                    <span className="text-xl text-gray-500 group-open:rotate-45 transition-transform motion-reduce:transition-none flex-shrink-0 ml-4" aria-hidden="true">+</span>
                  </summary>
                  <div className="pb-5 text-base text-gray-500 leading-relaxed">{item.a}</div>
                </details>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="px-6 lg:px-12 py-12" aria-label="Explore more">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Our Services", href: "/services" },
                { label: "Our Process", href: "/process" },
                { label: "Results & Reporting", href: "/results" },
                { label: "Industries", href: "/industries" },
                { label: "Get a Quote", href: "/get-a-quote" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="border border-gray-200 px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px] inline-flex items-center">
                  {link.label}
                </Link>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-24 bg-black text-white text-center" aria-label="Start your project">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Become Our Next Success Story?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s discuss your goals and build a strategy tailored to
              your business.
            </p>
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Request a Quote &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
