import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Atlanta — Markit Media",
  description:
    "Performance marketing, SEO, PPC, and web development for businesses in Atlanta. Digital growth strategies for logistics, entertainment, and the Southeast's fastest-growing business hub.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/locations/united-states/atlanta",
  },
  openGraph: {
    title: "Digital Marketing Agency in Atlanta — Markit Media",
    description:
      "Performance marketing, SEO, PPC, and web development for businesses in Atlanta. Digital growth strategies for logistics, entertainment, and the Southeast's fastest-growing business hub.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Markit Media",
  description:
    "Digital marketing agency serving businesses in Atlanta with performance marketing, SEO, PPC, web development, and branding.",
  areaServed: { "@type": "City", name: "Atlanta" },
  url: "https://themarkitmedia.com/en/locations/united-states/atlanta",
};

const services = [
  {
    title: "Performance Marketing",
    desc: "Google Ads and Meta Ads campaigns built for Atlanta's competitive logistics, hospitality, and entertainment sectors. We structure funnels around high-intent commercial searches and retarget decision-makers across the Southeast.",
  },
  {
    title: "SEO",
    desc: "Technical SEO and content strategies designed to rank in Atlanta's fast-growing search landscape. From supply chain companies near Hartsfield-Jackson to entertainment firms in Midtown, we build organic visibility where your buyers are searching.",
  },
  {
    title: "Social Media Marketing",
    desc: "Instagram and TikTok strategies for Atlanta's culture-driven consumer brands, paired with LinkedIn campaigns targeting B2B buyers in logistics, fintech, and corporate services across the metro area.",
  },
  {
    title: "Website Development",
    desc: "Conversion-optimized websites on WordPress, Shopify, or Next.js for Atlanta businesses. Built for speed and mobile performance — critical in a metro where buyers research on the move between Buckhead, Midtown, and the Perimeter.",
  },
  {
    title: "Branding & Design",
    desc: "Brand identity systems that stand out in Atlanta's crowded market. We create logos, visual guidelines, and messaging frameworks that reflect the energy and ambition the city is known for.",
  },
  {
    title: "Video Production",
    desc: "Short-form video, product demos, and brand stories edited remotely with fast turnaround. Ideal for Atlanta's entertainment and hospitality businesses that need high-volume content for social and paid channels.",
  },
  {
    title: "Email Marketing",
    desc: "Automated sequences and segmented campaigns for Atlanta companies with complex sales cycles. We build nurture flows for logistics providers, SaaS platforms, and professional services firms targeting Southeast buyers.",
  },
  {
    title: "Content Marketing",
    desc: "Blog posts, whitepapers, and case studies that position your Atlanta business as a sector leader. Written for the procurement managers, operations directors, and C-suite executives who research thoroughly before engaging vendors.",
  },
  {
    title: "AI Solutions",
    desc: "AI-powered chatbots, lead scoring models, and marketing automation for Atlanta businesses scaling fast. Practical tools that reduce manual work and improve conversion rates across your digital channels.",
  },
];

const reasons = [
  {
    title: "Logistics and supply chain marketing expertise",
    desc: "Atlanta is one of the largest logistics hubs in the country, anchored by the world's busiest airport and a dense network of distribution centers. We understand how to market to freight companies, 3PLs, and supply chain technology providers — from SEO targeting commercial freight queries to LinkedIn campaigns reaching operations executives.",
  },
  {
    title: "Entertainment and media industry digital presence",
    desc: "Atlanta's film, music, and media sector has grown into a production powerhouse. We help entertainment-adjacent businesses — studios, post-production houses, talent agencies, and hospitality brands — build digital presences that match the caliber of the work they produce.",
  },
  {
    title: "Positioning for the Southeast's fastest-growing market",
    desc: "The Atlanta metro is one of the top destinations for corporate relocations and startup activity in the US. We build marketing strategies that help businesses capture this growth — whether you're an established company defending market share or a new entrant looking to gain traction quickly.",
  },
  {
    title: "Cost efficiency of a dedicated remote team",
    desc: "You get senior-level strategists, designers, and developers without the overhead of a Peachtree Street agency. Our remote model means your marketing budget goes toward campaigns and results, not office rent in Buckhead.",
  },
];

const faq = [
  {
    q: "How do you approach marketing for logistics companies in Atlanta?",
    a: "We start with search intent analysis specific to freight, warehousing, and supply chain services. That means Google Ads campaigns targeting shippers and procurement teams actively searching for logistics partners, SEO content built around commercial freight corridors and distribution services, and LinkedIn outreach to operations and supply chain decision-makers across the Southeast.",
  },
  {
    q: "Can you help entertainment and media businesses in Atlanta with digital strategy?",
    a: "Yes. Atlanta's entertainment sector needs high-impact visual branding, social media strategies built for audience engagement, and websites that showcase creative work effectively. We handle everything from social content calendars for production companies to full website builds for studios and agencies operating in the Atlanta market.",
  },
  {
    q: "How do you help businesses expand across the Southeast from Atlanta?",
    a: "Atlanta is the gateway to the Southeast market. We build geo-targeted paid campaigns, regional SEO strategies, and content plans that help Atlanta-based businesses extend their reach into markets like Charlotte, Nashville, Jacksonville, and Tampa — scaling ad spend and organic presence as you grow.",
  },
  {
    q: "You're a remote team — how does that work for Atlanta clients?",
    a: "We work during US business hours and use the tools your team already relies on: Slack, Zoom, email, and shared reporting dashboards. You get a dedicated account manager, weekly performance reviews, and the same responsiveness you would expect from an agency down the street — at a fraction of the cost.",
  },
];

const subPages = [
  {
    title: "Marketing Agency",
    href: "/locations/united-states/atlanta/marketing-agency",
    desc: "Full-service marketing strategy for Atlanta businesses across logistics, healthcare, and Fortune 500 sectors.",
  },
  {
    title: "PPC & Paid Ads",
    href: "/locations/united-states/atlanta/ppc-ads",
    desc: "Google Ads and Meta Ads management for Atlanta's diverse business landscape.",
  },
  {
    title: "Website Development",
    href: "/locations/united-states/atlanta/website-development",
    desc: "Custom web development for businesses in metro Atlanta and the Southeast.",
  },
  {
    title: "SEO Services",
    href: "/locations/united-states/atlanta/seo-services",
    desc: "Search engine optimization for competitive Atlanta keywords and local rankings.",
  },
];

export default function AtlantaPage() {
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
      <JsonLd data={schema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "United States", href: "/locations/united-states" },
          { label: "Atlanta" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Atlanta" className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Atlanta</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Digital Marketing Agency Serving Businesses in Atlanta
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6">
              Atlanta sits at the center of the Southeast&apos;s economic engine
              — a metro area shaped by the world&apos;s busiest airport, a
              booming entertainment industry, and a corporate relocation pipeline
              that keeps accelerating. Businesses here compete across logistics,
              film and media, fintech, healthcare, and hospitality, all in a
              market growing faster than most companies can keep up with.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed mt-4">
              Markit Media serves businesses in Atlanta with performance
              marketing, SEO, web development, and full-stack digital strategy
              — delivering senior-level execution remotely, without the overhead
              of a local agency.
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

      {/* Services */}
      <section
        className="px-6 lg:px-12 py-20 bg-gray-50"
        aria-label="Services for Atlanta businesses"
      >
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionTitle>Services for Businesses in Atlanta</SectionTitle>
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
        aria-label="Why businesses in Atlanta choose Markit Media"
      >
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
            <SectionTitle>
              Why Businesses in Atlanta Choose Markit Media
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

      {/* Sub-pages */}
      <section className="px-6 lg:px-12 py-20" aria-label="Atlanta service pages">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore</SectionLabel>
            <SectionTitle>Atlanta Service Pages</SectionTitle>
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
              Ready to Grow Your Business in Atlanta?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that delivers measurable
              results in the Southeast&apos;s fastest-growing business hub.
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
