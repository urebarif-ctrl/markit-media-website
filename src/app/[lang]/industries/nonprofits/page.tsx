import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import {
  HeartHandshake,
  Search,
  Share2,
  Mail,
  Globe,
  BookOpen,
  BadgeDollarSign,
  TrendingUp,
  Users,
  Megaphone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Digital Marketing for Nonprofits & NGOs",
  description:
    "Marketing strategies for nonprofits and NGOs including SEO, social media, email marketing, website development, content marketing, and Google Ad Grants management.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/industries/nonprofits",
  },
  openGraph: {
    title: "Digital Marketing for Nonprofits & NGOs",
    description: "Marketing strategies for nonprofits and NGOs including SEO, social media, email marketing, website development, content marketing, and Google Ad Grants ...",
  },
};

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Search,
    title: "SEO",
    desc: "Help your organization rank for cause-related and mission-driven search queries so supporters, donors, and volunteers find you when they search.",
  },
  {
    icon: Share2,
    title: "Social Media",
    desc: "Build an engaged community around your mission on the platforms your supporters use most, from awareness campaigns to fundraising drives.",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    desc: "Nurture donor relationships, drive recurring giving, and keep supporters informed with segmented email campaigns that respect their time and inbox.",
  },
  {
    icon: Globe,
    title: "Website Development",
    desc: "Accessible, mobile-friendly websites with clear donation flows, volunteer sign-up forms, and compelling storytelling that turns visitors into supporters.",
  },
  {
    icon: BookOpen,
    title: "Content Marketing",
    desc: "Impact stories, blog posts, and resources that communicate your mission, build trust with potential donors, and improve your search visibility.",
  },
  {
    icon: BadgeDollarSign,
    title: "Google Ad Grants",
    desc: "Apply for, set up, and manage Google Ad Grants accounts to access up to $10,000 per month in free search advertising for eligible nonprofits.",
  },
];

const challenges = [
  {
    title: "Limited marketing budgets",
    desc: "Most nonprofit budgets prioritize programs over marketing. Every dollar spent on outreach needs to justify itself against mission-critical spending, making efficiency essential.",
  },
  {
    title: "Donor fatigue",
    desc: "Supporters are asked to give by dozens of organizations every week. Cutting through the noise requires clear messaging, genuine storytelling, and respectful communication frequency.",
  },
  {
    title: "Volunteer recruitment and retention",
    desc: "Finding and keeping volunteers requires reaching the right people at the right time. Digital channels need to make it easy to sign up and stay involved without overwhelming them.",
  },
  {
    title: "Measuring impact vs. ROI",
    desc: "Traditional marketing metrics like cost per click only tell part of the story. Nonprofits need to connect marketing activity to mission outcomes — donations raised, people served, awareness shifted.",
  },
];

const results: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: TrendingUp,
    title: "Increased donations",
    desc: "Optimized donation pages, targeted campaigns, and email nurture sequences that turn one-time gifts into recurring support.",
  },
  {
    icon: Users,
    title: "More volunteer sign-ups",
    desc: "Clear calls to action, local search visibility, and social media outreach that connect your organization with people ready to help.",
  },
  {
    icon: Megaphone,
    title: "Greater awareness reach",
    desc: "SEO, content marketing, and Google Ad Grants that expand your digital footprint and put your mission in front of new audiences every month.",
  },
];

const faq = [
  {
    q: "What is Google Ad Grants and does our nonprofit qualify?",
    a: "Google Ad Grants provides eligible 501(c)(3) nonprofits with up to $10,000 per month in free Google Search advertising. To qualify, your organization must hold valid charity status, have a functioning website with substantial content, and meet Google's eligibility guidelines. We handle the application process, campaign setup, and ongoing management to ensure your account stays compliant and performs well.",
  },
  {
    q: "How can we increase online donations without a large marketing budget?",
    a: "Start with the fundamentals: a fast, mobile-friendly website with a simple donation flow, an email list you communicate with regularly, and a Google Ad Grants account for free search visibility. SEO and content marketing are cost-effective long-term strategies. Social media helps amplify your message without paid spend. Small, consistent efforts across these channels compound over time.",
  },
  {
    q: "How do you measure marketing success for a nonprofit?",
    a: "We track metrics tied to your mission goals — donation volume, average gift size, recurring donor rate, volunteer sign-ups, email list growth, and website traffic from cause-related searches. We also monitor cost per acquisition to make sure your limited budget is working as hard as possible. Monthly reports connect marketing activity directly to organizational outcomes.",
  },
  {
    q: "How often should we communicate with our donors and supporters?",
    a: "Frequency depends on your audience and the type of communication. A monthly newsletter keeps supporters engaged without overwhelming them. Campaign-specific emails during fundraising drives can be more frequent. The key is providing value in every message — impact updates, stories from the field, and clear calls to action — rather than sending appeals on a fixed schedule.",
  },
];

export default function NonprofitsPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing for Nonprofits & NGOs",
    description:
      "Marketing strategies for nonprofits and NGOs including SEO, social media, email marketing, website development, content marketing, and Google Ad Grants management.",
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
          { label: "Nonprofits & NGOs" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
          <Animate animation="fade-up">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-6">
              <HeartHandshake size={28} strokeWidth={2} aria-hidden="true" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1]">
              Digital Marketing for Nonprofits &amp; NGOs
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mt-6">
              Your mission matters &mdash; but it can only make an impact if
              people know about it. We help nonprofits and NGOs build a digital
              presence that attracts donors, recruits volunteers, and expands
              the reach of your cause.
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
            <img src="/images/industries/nonprofits.svg" alt="Nonprofits marketing services" className="w-full aspect-[4/3] object-cover" />
          </Animate>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Services">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionTitle>
              Marketing Services for Nonprofits &amp; NGOs
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
              Nonprofits face unique marketing challenges. Here are the problems
              we help organizations like yours solve.
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
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>What to Expect</SectionLabel>
            <SectionTitle>Outcomes That Matter</SectionTitle>
            <SectionDesc>
              We measure success by the metrics that move your mission forward,
              not vanity numbers.
            </SectionDesc>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {results.map((r) => (
              <div key={r.title} className="bg-white border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center mb-4">
                  <r.icon size={20} strokeWidth={2} aria-hidden="true" />
                </div>
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
                    <span className="text-xl text-gray-500 group-open:rotate-45 transition-transform motion-reduce:transition-none flex-shrink-0 ml-4" aria-hidden="true">
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
              Ready to Amplify Your Mission?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Let&apos;s build a marketing strategy that brings more donors,
              volunteers, and awareness to your cause.
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
