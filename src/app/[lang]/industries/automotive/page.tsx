import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import {
  Car,
  Search,
  MousePointerClick,
  Share2,
  Globe,
  Video,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing for Automotive Businesses",
  description:
    "Marketing strategies for automotive businesses including dealerships, auto repair shops, and car rental companies. SEO, PPC, social media, website development, video production, and reputation management.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/industries/automotive",
  },
  openGraph: {
    title: "Digital Marketing for Automotive Businesses",
    description: "Marketing strategies for automotive businesses including dealerships, auto repair shops, and car rental companies. SEO, PPC, social media, website devel...",
  },
};

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Search,
    title: "SEO",
    desc: "Rank for high-intent local searches like 'dealerships near me' and model-specific queries so buyers find your lot before the competition.",
  },
  {
    icon: MousePointerClick,
    title: "PPC / Google Ads",
    desc: "Capture in-market shoppers with targeted search and display campaigns built around make, model, price range, and geographic radius.",
  },
  {
    icon: Share2,
    title: "Social Media",
    desc: "Showcase inventory, promotions, and customer stories on the platforms where local buyers spend their time, from Facebook Marketplace to Instagram.",
  },
  {
    icon: Globe,
    title: "Website Development",
    desc: "Fast, mobile-first websites with live inventory feeds, financing calculators, and clear calls to action that turn browsers into showroom visits.",
  },
  {
    icon: Video,
    title: "Video Production",
    desc: "Walk-around videos, virtual test drives, and customer testimonial clips that build confidence and move shoppers closer to a purchase decision.",
  },
  {
    icon: Star,
    title: "Reputation Management",
    desc: "Monitor and respond to reviews across Google, Yelp, and DealerRater. A strong review profile is often the deciding factor for automotive buyers.",
  },
];

const challenges = [
  {
    title: "High cost per click",
    desc: "Automotive keywords are among the most expensive in paid search. Without precise targeting and strong landing pages, ad budgets disappear quickly with little return.",
  },
  {
    title: "Long and complex buying cycle",
    desc: "The average car buyer spends weeks researching before visiting a dealership. Marketing must engage prospects at every stage, from initial research through final purchase.",
  },
  {
    title: "Intense local competition",
    desc: "Multiple dealerships and service centers compete for the same geographic market. Standing out requires a combination of local SEO, paid media, and a strong online reputation.",
  },
  {
    title: "Inventory-based marketing",
    desc: "Stock changes daily. Campaigns need to reflect real-time availability, promote the right vehicles at the right time, and avoid advertising units that are already sold.",
  },
];

const results = [
  {
    title: "Test drive bookings",
    desc: "Targeted campaigns drive qualified traffic to your scheduling page, increasing the number of test drive appointments from people who are ready to buy.",
  },
  {
    title: "Higher lead quality",
    desc: "By focusing on in-market buyers through intent-based keywords and audience targeting, the leads that reach your sales team are further along in the purchase process.",
  },
  {
    title: "Lower cost per lead",
    desc: "Ongoing optimization of ad spend, landing pages, and conversion paths reduces the cost of acquiring each qualified lead over time.",
  },
  {
    title: "Stronger online reputation",
    desc: "A proactive review strategy increases your average rating and review volume, which directly influences where buyers choose to shop.",
  },
];

const faq = [
  {
    q: "What digital marketing channels work best for car dealerships?",
    a: "Search engine marketing (both SEO and PPC) is the backbone of dealership marketing because buyers start with Google. Social media is important for inventory promotion and community engagement. Video content builds trust and lets shoppers explore vehicles before visiting the lot. Reputation management ties everything together — a dealership with poor reviews will struggle regardless of ad spend.",
  },
  {
    q: "How do you handle marketing when inventory changes constantly?",
    a: "We build campaigns around vehicle categories, price ranges, and buyer intent rather than individual VINs. Dynamic ad feeds can pull from your live inventory so listings stay current. Landing pages are structured to highlight available stock without requiring manual updates every time a vehicle sells.",
  },
  {
    q: "How long does it take to see results from automotive marketing?",
    a: "Paid search and social campaigns can generate leads within the first two weeks. SEO improvements typically become visible within three to six months as local rankings improve. Reputation management is an ongoing effort, but most businesses see measurable improvement in review volume and rating within the first 90 days.",
  },
  {
    q: "How do you reduce cost per lead in such a competitive market?",
    a: "Through a combination of negative keyword management, geographic bid adjustments, landing page optimization, and audience segmentation. We focus budget on the searches and audiences most likely to convert, and continuously test ad copy and page layouts to improve conversion rates over time.",
  },
];

export default function AutomotivePage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing for Automotive Businesses",
    description:
      "Marketing strategies for automotive businesses including dealerships, auto repair shops, and car rental companies.",
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
          { label: "Automotive" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
          <Animate animation="fade-up">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6">
              <Car size={28} strokeWidth={2} aria-hidden="true" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
              Digital Marketing for Automotive Businesses
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6">
              Dealerships, service centers, auto body shops &mdash; no matter
              the segment, today&apos;s car buyers start their search online. We
              help automotive businesses get found, build trust, and turn clicks
              into showroom visits and service appointments.
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
            <img src="/images/industries/automotive.svg" alt="" className="w-full aspect-[4/3] object-cover" />
          </Animate>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Services">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionTitle>
              Marketing Services for Automotive Businesses
            </SectionTitle>
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
                <p className="text-base text-gray-500 leading-relaxed">
                  {svc.desc}
                </p>
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
              Automotive marketing comes with unique challenges. Here are the
              problems we solve every day.
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
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Expected results">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What to Expect</SectionLabel>
            <SectionTitle>Results That Matter</SectionTitle>
            <SectionDesc>
              Here is what a well-executed automotive marketing strategy
              delivers over time.
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
                    <span className="text-xl text-gray-500 group-open:rotate-45 transition-transform flex-shrink-0 ml-4" aria-hidden="true">
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
              Ready to Drive More Leads?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that fills your showroom
              and keeps your service bays booked.
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
