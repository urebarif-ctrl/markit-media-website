import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import {
  Hotel,
  Search,
  MousePointerClick,
  Share2,
  Globe,
  Star,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing for Hospitality & Hotels",
  description:
    "Marketing strategies for hotels, resorts, vacation rentals, and hospitality brands. SEO, PPC, social media, website development, reputation management, and email marketing to drive direct bookings.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/industries/hospitality",
  },
  openGraph: {
    title: "Digital Marketing for Hospitality & Hotels",
    description: "Marketing strategies for hotels, resorts, vacation rentals, and hospitality brands. SEO, PPC, social media, website development, reputation management, ...",
  },
};

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Search,
    title: "SEO",
    desc: "Rank for destination, amenity, and experience-based searches so travelers find your property before they find an OTA listing.",
  },
  {
    icon: MousePointerClick,
    title: "PPC / Google Ads",
    desc: "Capture high-intent travelers searching for hotels in your area with targeted campaigns that drive direct bookings and reduce OTA commission costs.",
  },
  {
    icon: Share2,
    title: "Social Media",
    desc: "Showcase your property, amenities, and guest experiences on Instagram, Facebook, and TikTok to build desire and keep your brand top-of-mind for future trips.",
  },
  {
    icon: Globe,
    title: "Website Development",
    desc: "Fast, mobile-first websites with integrated booking engines, virtual tours, and clear calls to action that convert browsers into confirmed guests.",
  },
  {
    icon: Star,
    title: "Reputation Management",
    desc: "Monitor and respond to reviews on Google, TripAdvisor, and Booking.com to protect your ratings and turn guest feedback into a competitive advantage.",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    desc: "Pre-stay, in-stay, and post-stay email sequences that increase direct bookings, encourage upgrades, and drive repeat visits.",
  },
];

const challenges = [
  {
    title: "Seasonal demand fluctuations",
    desc: "Occupancy swings between peak and off-peak seasons require different marketing strategies, pricing approaches, and promotional calendars throughout the year.",
  },
  {
    title: "OTA dependency and commission costs",
    desc: "Online travel agencies like Booking.com and Expedia drive bookings but take significant commissions. Shifting even a portion of bookings to direct channels improves margins substantially.",
  },
  {
    title: "Review and reputation pressure",
    desc: "Travelers rely heavily on reviews when choosing where to stay. A few negative reviews can drop your ranking on major platforms and directly reduce bookings.",
  },
  {
    title: "Local discovery and visibility",
    desc: "Guests search for hotels near landmarks, airports, and event venues. Properties that do not appear in local and map-based search results lose bookings to competitors who do.",
  },
];

const results = [
  {
    title: "More direct bookings",
    desc: "Reduce reliance on OTAs by driving guests to book through your own website, lowering commission costs and giving you full control over the guest relationship.",
  },
  {
    title: "Higher revenue per guest",
    desc: "Targeted email campaigns and on-site upselling strategies encourage room upgrades, spa packages, dining reservations, and extended stays.",
  },
  {
    title: "Stronger review ratings",
    desc: "Proactive review management and guest communication help maintain high ratings on Google, TripAdvisor, and booking platforms, which directly influence traveler decisions.",
  },
];

const faq = [
  {
    q: "How can hotels reduce dependence on OTAs like Booking.com and Expedia?",
    a: "The most effective approach combines branded PPC campaigns that bid on your own hotel name, a well-optimized website with a frictionless booking engine, and SEO content targeting destination and experience queries. Email marketing to past guests also drives repeat direct bookings. The goal is not to abandon OTAs entirely but to shift a meaningful share of reservations to your direct channel where margins are higher.",
  },
  {
    q: "What digital marketing channels work best for hotels?",
    a: "SEO and PPC are the foundation because most travelers begin with a search engine query. Social media builds brand awareness and keeps your property in consideration during the planning phase. Email marketing drives repeat bookings and loyalty. Reputation management on review platforms protects your visibility and conversion rate across all channels.",
  },
  {
    q: "How should hotels handle negative reviews online?",
    a: "Respond to every negative review promptly, professionally, and specifically. Acknowledge the concern, explain any steps taken to address it, and invite the guest to continue the conversation offline. Consistent, thoughtful responses show prospective guests that you take feedback seriously. Over time, generating a steady flow of new positive reviews will naturally push older negative ones down.",
  },
  {
    q: "How long does it take to see results from hotel digital marketing?",
    a: "PPC campaigns can generate bookings within the first week. Social media engagement builds over weeks as you establish a content cadence. SEO improvements typically show measurable results within three to six months as your property gains authority for destination and amenity searches. Email marketing ROI is often visible within the first campaign cycle when targeting past guests.",
  },
];

export default function HospitalityPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing for Hospitality & Hotels",
    description:
      "Marketing strategies for hotels, resorts, vacation rentals, and hospitality brands to drive direct bookings and revenue.",
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
          { label: "Hospitality & Hotels" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Animate animation="fade-up">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6">
                <Hotel size={28} strokeWidth={2} aria-hidden="true" />
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
                Digital Marketing for Hospitality &amp; Hotels
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mt-6">
                Hotels, resorts, boutique properties, vacation rentals &mdash;
                travelers research and book online long before they arrive. We
                help hospitality brands get found, drive direct bookings, and
                build the kind of reputation that fills rooms year-round.
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
              src="/images/industries/hospitality.svg"
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
              Marketing Services for Hospitality &amp; Hotels
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
              The hospitality industry faces distinct digital marketing
              challenges. Here are the problems we help hotels and hospitality
              brands solve.
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
              Hospitality marketing should move the numbers that affect your
              bottom line. Here is what a well-executed strategy delivers.
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
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Fill More Rooms?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that drives direct bookings
              and reduces your dependence on OTAs.
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
