import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import {
  UtensilsCrossed,
  Search,
  MousePointerClick,
  Share2,
  Camera,
  MapPin,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing for Restaurants & Food Businesses",
  description:
    "Marketing strategies for restaurants, cafes, food trucks, catering companies, and ghost kitchens. Local SEO, PPC, social media, food photography, and reputation management.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/industries/restaurants",
  },
  openGraph: {
    title: "Digital Marketing for Restaurants & Food Businesses",
    description: "Marketing strategies for restaurants, cafes, food trucks, catering companies, and ghost kitchens. Local SEO, PPC, social media, food photography, and re...",
  },
};

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Search,
    title: "Local SEO",
    desc: "Rank higher in local search results so hungry customers find your restaurant before they find your competitors.",
  },
  {
    icon: MousePointerClick,
    title: "PPC / Delivery Platform Ads",
    desc: "Targeted paid campaigns across Google, delivery apps, and local directories to drive orders and reservations.",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    desc: "Build a loyal following with consistent, engaging content that showcases your food, your team, and your atmosphere.",
  },
  {
    icon: Camera,
    title: "Food Photography / Visual Content",
    desc: "Professional-quality visual content that makes your dishes look as good online as they taste in person.",
  },
  {
    icon: MapPin,
    title: "Google Business Profile Optimization",
    desc: "Keep your Google listing accurate, active, and optimized so you show up in the map pack when locals search for places to eat.",
  },
  {
    icon: Star,
    title: "Reputation Management",
    desc: "Monitor and respond to reviews across Google, Yelp, and TripAdvisor to protect and strengthen your online reputation.",
  },
];

const challenges = [
  {
    title: "Standing out in saturated local markets",
    desc: "Restaurants compete with dozens of options within a few-mile radius. Without strong local visibility, potential customers choose whoever shows up first in their search results.",
  },
  {
    title: "Managing multiple delivery platform listings",
    desc: "Between UberEats, DoorDash, Grubhub, and your own ordering system, keeping menus, pricing, and hours consistent across every platform is a constant challenge.",
  },
  {
    title: "Adapting to seasonal menu changes",
    desc: "New menu items, seasonal specials, and limited-time offers need to be reflected across your website, social media, and listings quickly and accurately.",
  },
  {
    title: "Negative review impact",
    desc: "A single bad review can deter dozens of potential customers. Restaurants need a proactive approach to monitoring, responding to, and learning from online feedback.",
  },
  {
    title: "Building a consistent brand across platforms",
    desc: "Your brand should feel the same whether someone finds you on Instagram, Google, a delivery app, or your own website. Inconsistency erodes trust and recognition.",
  },
];

const faq = [
  {
    q: "What digital marketing channels are most effective for restaurants?",
    a: "Local SEO and Google Business Profile optimization tend to have the highest impact because most diners search for food near them with immediate intent. Social media is a close second for restaurants because food is inherently visual. Paid ads on Google and delivery platforms can also drive orders directly.",
  },
  {
    q: "How important are online reviews for restaurants?",
    a: "Online reviews are one of the most influential factors in a diner's decision. Most people check reviews before choosing a restaurant, and star ratings directly affect click-through rates on Google and delivery platforms. A consistent review management strategy is essential.",
  },
  {
    q: "How can a restaurant compete with chain brands online?",
    a: "Independent restaurants can win locally by focusing on what chains cannot replicate: authentic personality, local community connection, and a unique dining experience. Strong local SEO, genuine social media content, and authentic customer reviews help independent restaurants stand out in their area.",
  },
  {
    q: "How long does it take to see results from restaurant marketing?",
    a: "Paid campaigns and social media can generate immediate visibility and orders. Local SEO improvements typically show meaningful results within three to six months as your listings, citations, and review profile strengthen over time.",
  },
];

export default function RestaurantsPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing for Restaurants & Food Businesses",
    description:
      "Marketing strategies for restaurants, cafes, food trucks, catering companies, and ghost kitchens.",
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
          { label: "Restaurants & Food" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Page header" className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
          <Animate animation="fade-up">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6">
              <UtensilsCrossed size={28} strokeWidth={2} aria-hidden="true" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
              Digital Marketing for Restaurants &amp; Food Businesses
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6">
              Restaurants, cafes, food trucks, catering companies, ghost
              kitchens &mdash; your customers decide where to eat online before
              they ever walk through the door. We help food businesses get
              found, fill tables, and drive orders.
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
            <img src="/images/industries/restaurant.svg" alt="Restaurants marketing services" className="w-full aspect-[4/3] object-cover" />
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
              Marketing Services for Restaurants &amp; Food Businesses
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
              The food industry faces unique digital marketing challenges. Here
              are the problems we help restaurants and food businesses solve.
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
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Grow Your Restaurant Business?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that fills your tables and
              drives more orders.
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
