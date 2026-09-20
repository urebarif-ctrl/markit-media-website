import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import {
  Plane,
  Share2,
  Search,
  MousePointerClick,
  Video,
  FileText,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing for Travel & Tourism",
  description:
    "Marketing strategies for travel agencies, tour operators, destinations, and tourism brands. Social media marketing, SEO, PPC, video production, content marketing, and email marketing to drive bookings.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/industries/travel",
  },
};

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Share2,
    title: "Social Media Marketing",
    desc: "Inspire travelers with stunning destination content on Instagram, TikTok, Facebook, and Pinterest. Build an engaged audience that turns followers into booked travelers.",
  },
  {
    icon: Search,
    title: "SEO",
    desc: "Rank for destination queries, travel guides, and experience searches so potential travelers discover your offerings during the research and planning phase.",
  },
  {
    icon: MousePointerClick,
    title: "PPC / Google Ads",
    desc: "Capture travelers actively searching for trips, tours, and destinations with targeted campaigns that drive bookings and maximize return on ad spend.",
  },
  {
    icon: Video,
    title: "Video Production",
    desc: "Bring destinations to life with professional video content, drone footage, and short-form reels that showcase experiences and drive emotional engagement.",
  },
  {
    icon: FileText,
    title: "Content Marketing",
    desc: "Travel guides, destination spotlights, itinerary ideas, and blog content that attract organic traffic and position your brand as a trusted travel resource.",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    desc: "Seasonal promotions, trip inspiration, and post-trip follow-ups that nurture your subscriber list and drive repeat bookings from past travelers.",
  },
];

const challenges = [
  {
    title: "Seasonal booking patterns",
    desc: "Travel demand fluctuates dramatically by season and destination. Marketing budgets, messaging, and channel mix need to adapt throughout the year to capture demand during peak planning windows.",
  },
  {
    title: "OTA and aggregator competition",
    desc: "Online travel agencies and booking aggregators dominate search results and consumer attention. Travel brands need strong direct-booking strategies to avoid high commission costs and build direct customer relationships.",
  },
  {
    title: "Visual content demands",
    desc: "Travelers make decisions based on imagery and video. Maintaining a consistent flow of high-quality visual content across multiple platforms and destinations is resource-intensive but essential.",
  },
  {
    title: "Review and reputation management",
    desc: "Travelers rely heavily on reviews when choosing destinations, tours, and travel providers. Managing reviews across Google, TripAdvisor, and social platforms directly impacts booking rates.",
  },
];

const results = [
  {
    title: "More direct bookings",
    desc: "Targeted SEO, PPC, and email campaigns drive travelers to book directly through your website, reducing commission costs and giving you control over the customer relationship.",
  },
  {
    title: "Stronger brand engagement",
    desc: "Consistent social media presence and compelling visual content build an audience of travel enthusiasts who follow, share, and ultimately book with your brand.",
  },
  {
    title: "Improved online visibility",
    desc: "Search engine optimization and content marketing position your brand in front of travelers during the research phase, when destination and experience decisions are being made.",
  },
];

const faq = [
  {
    q: "What digital marketing channels work best for travel and tourism?",
    a: "Social media and SEO are the most impactful channels for travel brands. Instagram, TikTok, and Pinterest drive inspiration and brand awareness, while SEO captures travelers actively researching destinations and experiences. PPC campaigns are effective for capturing high-intent searches during peak booking windows. Email marketing drives repeat bookings and is highly cost-effective for nurturing past travelers.",
  },
  {
    q: "How can travel brands compete with OTAs like Booking.com and Expedia?",
    a: "The key is building a strong direct-booking channel. This means investing in a fast, mobile-optimized website with a seamless booking experience, running branded PPC campaigns, building an email list of past travelers, and creating unique content that OTAs cannot replicate. Loyalty incentives and exclusive offers for direct bookers also help shift bookings away from commission-heavy platforms.",
  },
  {
    q: "How important is video content for travel marketing?",
    a: "Video is one of the most effective content formats for travel marketing because it conveys the experience of a destination in a way that photos and text cannot. Short-form video on TikTok and Instagram Reels drives discovery and engagement, while longer-form content on YouTube serves travelers in the research phase. Drone footage, destination walkthroughs, and traveler testimonials all perform well.",
  },
  {
    q: "How should travel brands handle marketing during the off-season?",
    a: "Off-season marketing should focus on early-bird promotions, content that inspires future travel, and email campaigns targeting past travelers. SEO content published during slower months gains authority in time for the next booking season. Social media engagement should remain consistent year-round to maintain brand visibility and audience connection.",
  },
];

export default function TravelPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing for Travel & Tourism",
    description:
      "Marketing strategies for travel agencies, tour operators, destinations, and tourism brands to drive bookings and brand awareness.",
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
          { label: "Travel & Tourism" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Animate animation="fade-up">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6">
                <Plane size={28} strokeWidth={2} aria-hidden="true" />
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
                Digital Marketing for Travel &amp; Tourism
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mt-6">
                Travel agencies, tour operators, destinations, and tourism
                brands &mdash; travelers research, compare, and book online
                months before they arrive. We help travel brands inspire,
                convert, and build loyalty across every digital touchpoint.
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
              src="/images/industries/travel.svg"
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
              Marketing Services for Travel &amp; Tourism
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
              The travel and tourism industry faces distinct digital marketing
              challenges. Here are the problems we help travel brands solve.
            </SectionDesc>
          </Animate>
          <ul className="mt-10 space-y-4">
            {challenges.map((c, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <li className="flex items-start gap-4 py-3 border-b border-gray-200">
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
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
              Travel marketing should drive measurable business outcomes. Here
              is what a well-executed strategy delivers.
            </SectionDesc>
          </Animate>
          <ul className="mt-10 space-y-4">
            {results.map((r, i) => (
              <Animate key={i} animation="fade-up" delay={i * 50}>
                <li className="flex items-start gap-4 py-3 border-b border-gray-200">
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
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
              Ready to Drive More Bookings?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that inspires travelers and
              converts interest into confirmed bookings.
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
