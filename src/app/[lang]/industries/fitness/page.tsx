import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import {
  Dumbbell,
  Search,
  MousePointerClick,
  Share2,
  Globe,
  Mail,
  FileText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing for Fitness & Wellness",
  description:
    "Marketing strategies for gyms, studios, personal trainers, wellness centers, and fitness brands. SEO, PPC, social media, website development, email marketing, and content marketing.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/industries/fitness",
  },
};

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Search,
    title: "Local SEO",
    desc: "Rank in local search results and Google Maps so people nearby find your gym, studio, or wellness center when they search for fitness options in their area.",
  },
  {
    icon: MousePointerClick,
    title: "PPC / Google Ads",
    desc: "Targeted ad campaigns that reach people actively searching for gyms, personal trainers, yoga classes, and wellness services in your area.",
  },
  {
    icon: Share2,
    title: "Social Media",
    desc: "Build community and showcase transformations on Instagram and TikTok. Short-form video content that highlights workouts, client progress, and your facility.",
  },
  {
    icon: Globe,
    title: "Website Development",
    desc: "Fast, mobile-first websites with online class scheduling, membership sign-up flows, and clear calls to action that convert visitors into members.",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    desc: "Automated sequences that onboard new members, re-engage lapsed ones, and promote class schedules, challenges, and seasonal offers to your list.",
  },
  {
    icon: FileText,
    title: "Content Marketing",
    desc: "Workout guides, nutrition tips, and wellness articles that drive organic traffic and position your brand as a trusted resource in the fitness space.",
  },
];

const challenges = [
  {
    title: "Seasonal membership cycles",
    desc: "January and September bring surges of new sign-ups, but sustaining momentum through slower months requires year-round marketing that keeps your pipeline full.",
  },
  {
    title: "Intense local competition",
    desc: "Most fitness businesses compete within a small radius. Boutique studios, big-box gyms, and independent trainers all fight for the same local audience.",
  },
  {
    title: "Retention vs. acquisition",
    desc: "Acquiring a new member costs significantly more than retaining one. Marketing needs to balance attracting new prospects with keeping current members engaged and committed.",
  },
  {
    title: "Content creation demands",
    desc: "Fitness audiences expect frequent, high-quality visual content — workout videos, transformation stories, class previews — which takes time and consistency to produce.",
  },
];

const results = [
  {
    title: "Membership sign-ups",
    desc: "More qualified leads from local search and paid ads that convert into trial visits and full memberships.",
  },
  {
    title: "Class and session bookings",
    desc: "Higher fill rates for group classes, personal training sessions, and wellness appointments through targeted campaigns.",
  },
  {
    title: "Improved retention rates",
    desc: "Email sequences, community-building content, and re-engagement campaigns that reduce monthly churn and increase member lifetime value.",
  },
  {
    title: "Stronger local visibility",
    desc: "Top rankings in Google Maps and local search results so your business is the first option people see in your area.",
  },
];

const faq = [
  {
    q: "What marketing channels work best for gyms and fitness studios?",
    a: "Local SEO and Google Ads are the foundation — most people search for fitness options near them. Social media, especially Instagram and TikTok, is essential for showcasing your facility, classes, and community. Email marketing drives retention by keeping members engaged between visits. The right mix depends on whether you are a single-location studio or a multi-location brand.",
  },
  {
    q: "How do we keep members engaged after they sign up?",
    a: "Automated email sequences are the most scalable approach. Welcome series for new members, milestone check-ins, class recommendations based on attendance patterns, and re-engagement emails for members who have not visited recently. Social media community groups and challenges also help build accountability and connection.",
  },
  {
    q: "How should fitness businesses handle the January rush?",
    a: "Start awareness campaigns in November and December to capture early intent. Have landing pages ready for New Year promotions with clear offers and easy sign-up flows. Plan a content calendar that extends the momentum — January sign-ups who feel welcomed and supported are more likely to stay past February.",
  },
  {
    q: "Is social media really necessary for a local gym?",
    a: "Yes. Prospective members look at your social media before they visit. An active presence with real content — member spotlights, class clips, facility tours — builds trust and gives people a feel for your culture. It also serves as social proof. A gym with no social media presence raises questions; an active one answers them.",
  },
];

export default function FitnessPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing for Fitness & Wellness",
    description:
      "Marketing strategies for gyms, studios, personal trainers, wellness centers, and fitness brands.",
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
          { label: "Fitness & Wellness" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
          <Animate animation="fade-up">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6">
              <Dumbbell size={28} strokeWidth={2} aria-hidden="true" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
              Digital Marketing for Fitness &amp; Wellness
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6">
              Gyms, studios, personal trainers, wellness centers &mdash; your
              next member is searching online right now. We help fitness and
              wellness businesses get found locally, build community, and turn
              website visitors into loyal members.
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
            <img src="/images/industries/fitness.svg" alt="" className="w-full aspect-[4/3] object-cover" />
          </Animate>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Services">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionTitle>
              Marketing Services for Fitness &amp; Wellness
            </SectionTitle>
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
              Fitness and wellness businesses face unique marketing challenges.
              Here are the problems we solve every day.
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
              Our fitness marketing strategies are built around the outcomes that
              move your business forward.
            </SectionDesc>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {results.map((r) => (
              <div key={r.title} className="bg-white border border-gray-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-black uppercase tracking-wide mb-2">
                  {r.title}
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  {r.desc}
                </p>
              </div>
            ))}
          </Stagger>
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
              Ready to Grow Your Membership?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that fills your classes,
              grows your membership, and keeps your community coming back.
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
