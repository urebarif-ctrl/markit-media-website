import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Zap, Search, MousePointerClick, Globe, MapPin, FileText, BarChart3 } from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Digital Marketing for EV Chargers & Clean Energy",
  description:
    "Digital marketing services for EV charging networks, solar installers, and clean energy providers. Build visibility, educate your market, and drive adoption with targeted campaigns.",
  alternates: { canonical: "https://themarkitmedia.com/en/industries/ev-chargers" },
  openGraph: {
    title: "Digital Marketing for EV Chargers & Clean Energy",
    description: "Digital marketing services for EV charging networks, solar installers, and clean energy providers. Build visibility, educate your market, and drive adop...",
  },
};

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Search,
    title: "SEO for Clean Energy",
    desc: "Capture search demand from property owners, fleet managers, and businesses looking for charging solutions and clean energy providers. We target high-intent keywords that drive real inquiries.",
  },
  {
    icon: MousePointerClick,
    title: "PPC & Google Ads",
    desc: "Run paid search and display campaigns that put your charging stations or energy services in front of people actively searching for solutions. Maximize every dollar with precise targeting and continuous optimization.",
  },
  {
    icon: Globe,
    title: "Website Development",
    desc: "Build fast, conversion-focused websites that clearly communicate your offerings, showcase station locations, and make it easy for visitors to request quotes or find your nearest installation.",
  },
  {
    icon: MapPin,
    title: "Local Marketing & Station Finder Optimization",
    desc: "Ensure your charging stations and service areas appear in local search results, Google Maps, and directory listings. Help drivers and customers find you exactly when they need you.",
  },
  {
    icon: FileText,
    title: "Content Marketing & Educational Content",
    desc: "Create guides, articles, and resources that explain EV charging, solar benefits, and clean energy options to a market that is still learning. Position your brand as the go-to source of clarity.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Campaign Management",
    desc: "Monitor campaign performance across every channel and adjust in real time. Track cost per lead, conversion rates, and customer acquisition costs to continuously improve your marketing ROI.",
  },
];

const challenges: { title: string; desc: string }[] = [
  {
    title: "Educating a Growing but Unfamiliar Market",
    desc: "Many potential customers are still learning the basics of EV charging and clean energy. Your marketing must inform and build confidence before it can convert.",
  },
  {
    title: "Competing in a Rapidly Evolving Industry",
    desc: "New players, technologies, and regulations emerge constantly. Staying visible and relevant requires agile marketing that adapts as fast as the market moves.",
  },
  {
    title: "Location-Based Marketing for Charging Networks",
    desc: "Drivers need to find your stations at the exact moment they need a charge. Multi-location local SEO and map optimization are essential but complex to execute at scale.",
  },
  {
    title: "Communicating Complex Technical Offerings",
    desc: "Charging speeds, connector types, energy storage, and grid integration are technical topics. Your messaging needs to make these concepts accessible without oversimplifying.",
  },
  {
    title: "Building Brand Authority in an Emerging Space",
    desc: "In a young industry with many new entrants, establishing trust and credibility is critical. Buyers choose providers they recognize and believe will be around long-term.",
  },
];

const faq: { q: string; a: string }[] = [
  {
    q: "Why does the EV charging and clean energy industry need specialized marketing?",
    a: "This industry combines technical complexity with a market that is still maturing. Effective marketing requires understanding how consumers and businesses research charging solutions, solar installations, and energy services. Generic approaches miss the nuances of location-based search, regulatory incentives, and the education buyers need before making decisions.",
  },
  {
    q: "How can digital marketing help EV charging networks attract more users?",
    a: "A combination of local SEO, Google Maps optimization, and paid search ensures drivers find your stations when they need them. Content marketing builds awareness among fleet operators and property developers considering charging installations. Together, these channels drive both immediate usage and long-term partnerships.",
  },
  {
    q: "What digital channels are most effective for clean energy companies?",
    a: "SEO and content marketing are particularly effective because buyers in this space do significant research before committing. Google Ads captures high-intent searches for immediate lead generation. Local marketing is critical for companies with physical locations or service areas. The right mix depends on whether you serve consumers, businesses, or both.",
  },
  {
    q: "How do you approach marketing for a market where customers are still learning?",
    a: "We lead with educational content that meets people where they are in their understanding. This means creating clear, jargon-free resources about EV charging basics, cost savings from solar, or how clean energy works. As prospects learn and build trust with your brand, they naturally move toward conversion.",
  },
];

export default function EVChargersIndustryPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing for EV Chargers & Clean Energy",
    description:
      "Digital marketing services for EV charging networks, solar installers, and clean energy providers.",
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
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }, { label: "EV Chargers & Clean Energy" }]} />

      {/* Hero */}
      <section aria-label="Page header" className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
          <Animate animation="fade-up">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6">
              <Zap size={28} strokeWidth={2} aria-hidden="true" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
              Digital Marketing for EV Chargers &amp; Clean Energy
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6">
              The clean energy market is growing fast, and so is the competition. Whether you operate a charging network, install solar panels, or provide energy solutions, your customers are searching online before they buy. We help EV charger companies and clean energy providers build visibility, educate their market, and turn interest into installations and partnerships.
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
            <img loading="lazy" src="/images/industries/ev-chargers.svg" alt="Ev Chargers marketing services" className="w-full aspect-[4/3] object-cover" />
          </Animate>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Services">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionTitle>Marketing Services for EV Chargers &amp; Clean Energy</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {services.map((svc) => (
              <div key={svc.title} className="bg-white border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
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
              Clean energy marketing comes with its own set of hurdles. Here are the challenges we help EV charger and energy companies navigate.
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
                      className="text-xl text-gray-500 group-open:rotate-45 transition-transform motion-reduce:transition-none flex-shrink-0 ml-4"
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
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Grow Your Clean Energy Business?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that drives awareness, educates your audience, and converts interest into real customers. No invented metrics&mdash;just clear plans and measurable growth.
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
