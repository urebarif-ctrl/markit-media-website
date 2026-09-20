import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { GrowthChart } from "@/components/animated-infographic";

export const metadata: Metadata = {
  title: "Our Approach — How We Drive Marketing Results",
  description: "Learn how Markit Media approaches digital marketing: our methodology, frameworks, and the principles behind every campaign we run.",
  alternates: { canonical: "https://themarkitmedia.com/en/approach" },
};

const pillars = [
  {
    num: "01",
    title: "Start with Business Goals, Not Channel Tactics",
    desc: "Most agencies jump straight to tactics — running ads, posting content, building pages. We start by understanding what success looks like for your business. Revenue targets, market position, customer acquisition costs, lifetime value. Those numbers shape every decision that follows.",
    detail: "This means we sometimes recommend against services. If your funnel has a conversion problem, more traffic won't fix it. If your brand positioning is unclear, running ads will burn budget. We tell you what you need to hear, not what's easiest to sell.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="6" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Full-Stack Execution Under One Roof",
    desc: "Digital marketing channels don't operate in silos, and neither should your agency partners. SEO informs content strategy. Paid ads reveal which messages resonate. Web development affects conversion rates. Branding influences everything.",
    detail: "When one team owns the full picture, insights flow between channels in real time. We catch opportunities that multi-vendor setups miss, and we eliminate the communication overhead that slows everything down.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" stroke="currentColor" strokeWidth="2" />
        <rect x="28" y="4" width="16" height="16" stroke="currentColor" strokeWidth="2" />
        <rect x="4" y="28" width="16" height="16" stroke="currentColor" strokeWidth="2" />
        <rect x="28" y="28" width="16" height="16" stroke="currentColor" strokeWidth="2" />
        <line x1="20" y1="12" x2="28" y2="12" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="20" x2="12" y2="28" stroke="currentColor" strokeWidth="2" />
        <line x1="36" y1="20" x2="36" y2="28" stroke="currentColor" strokeWidth="2" />
        <line x1="20" y1="36" x2="28" y2="36" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Data-Driven Decisions, Not Gut Feelings",
    desc: "We measure everything that matters and ignore everything that doesn't. Impressions, reach, and follower counts are nice to know. Revenue, leads, cost per acquisition, and customer lifetime value are what we optimize for.",
    detail: "Every campaign has clear KPIs defined before launch. Reporting shows performance against those targets, not vanity metrics that make everyone feel good but change nothing.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <rect x="6" y="30" width="8" height="14" fill="currentColor" />
        <rect x="20" y="20" width="8" height="24" fill="currentColor" />
        <rect x="34" y="8" width="8" height="36" fill="currentColor" />
        <line x1="4" y1="44" x2="44" y2="44" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Continuous Optimization, Not Set-and-Forget",
    desc: "Launching a campaign is the beginning, not the end. Markets shift, competitors adjust, algorithms update. Static campaigns decay. We run structured testing cycles — adjusting targeting, creative, messaging, and budgets based on live performance data.",
    detail: "Our optimization cadence depends on the channel: paid media gets weekly adjustments, SEO gets monthly strategy reviews, and creative gets refreshed based on engagement decay curves.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <path d="M24 4C13 4 4 13 4 24s9 20 20 20" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M24 44C35 44 44 35 44 24S35 4 24 4" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" fill="none" />
        <polygon points="20,2 24,8 28,2" fill="currentColor" />
        <polygon points="28,46 24,40 20,46" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Transparent Communication and Reporting",
    desc: "You should never have to wonder what your agency is doing. We give you direct access to your team, clear reporting on what's working and what isn't, and honest assessments when something needs to change.",
    detail: "No jargon-filled PDF decks designed to obscure poor performance. Our reports focus on business outcomes, and we walk you through them so you understand every number.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <rect x="6" y="6" width="36" height="36" rx="2" stroke="currentColor" strokeWidth="2" />
        <line x1="6" y1="16" x2="42" y2="16" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="24" x2="36" y2="24" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <line x1="12" y1="30" x2="30" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <line x1="12" y1="36" x2="24" y2="36" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      </svg>
    ),
  },
];

const discoveryQuestions = [
  "What does success look like for your business in 12 months?",
  "Who is your ideal customer, and how do they find you today?",
  "What marketing have you tried before, and what worked?",
  "What is your competitive advantage that customers care about?",
  "What are your unit economics — cost per lead, close rate, customer value?",
  "Where do deals stall or fall apart in your funnel?",
  "What internal resources and capabilities do you have?",
  "What constraints should we know about — budget, timeline, compliance?",
];

const engagementModels = [
  {
    title: "Retainer",
    desc: "Ongoing monthly engagement with a dedicated team. Best for businesses that need consistent execution across multiple channels.",
    bestFor: "Established businesses scaling their marketing",
    features: ["Dedicated team", "Monthly strategy reviews", "Cross-channel optimization", "Flexible scope"],
  },
  {
    title: "Project-Based",
    desc: "Fixed-scope engagements for specific initiatives: a website build, a brand refresh, a campaign launch. Clear deliverables and timeline.",
    bestFor: "Specific initiatives with defined outcomes",
    features: ["Fixed price and scope", "Milestone payments", "Clear deliverables", "Post-launch support"],
  },
  {
    title: "Consulting",
    desc: "Strategic guidance and direction without full execution. We build the playbook, train your team, and advise on key decisions.",
    bestFor: "Companies with in-house teams that need strategic direction",
    features: ["Strategy and playbooks", "Team training", "Ongoing advisory", "Quarterly planning"],
  },
];

const operatingPrinciples = [
  {
    title: "Recommend Against When Appropriate",
    desc: "If a service won't move the needle for you, we'll say so. Our job is to solve your business problem, not sell hours.",
  },
  {
    title: "Senior People Do the Work",
    desc: "The people in the strategy meeting are the same people running your campaigns. No bait-and-switch with junior staff.",
  },
  {
    title: "Channel Insights Cross-Pollinate",
    desc: "Your PPC data informs your SEO strategy. Your email performance shapes your content calendar. Channels reinforce each other.",
  },
  {
    title: "We Explain the Why, Not Just the What",
    desc: "Every recommendation comes with the reasoning behind it. If you disagree, we discuss it. You should always understand what we're doing and why.",
  },
  {
    title: "Optimization Is Built Into the Process",
    desc: "Testing isn't an add-on. Every campaign includes structured testing cycles, performance thresholds, and iteration protocols.",
  },
  {
    title: "You Own Everything We Build",
    desc: "Your data, your accounts, your creative assets, your strategy documents. If we part ways, you keep everything.",
  },
];

export default function ApproachPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Our Approach to Digital Marketing",
    description: "How Markit Media approaches digital marketing strategy and execution.",
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Our Approach" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Animate animation="fade-up">
            <div>
              <SectionLabel>Our Approach</SectionLabel>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
                Strategy First. Results Always.
              </h1>
              <SectionDesc>
                We don&apos;t believe in cookie-cutter marketing. Every engagement starts with understanding your business,
                your customers, and your competitive landscape. Then we build a plan to win.
              </SectionDesc>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center bg-black text-white px-8 py-4 font-bold text-base hover:bg-gray-900 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  Talk to Us &rarr;
                </Link>
                <Link href="/process" className="inline-flex items-center border-2 border-black text-black px-8 py-4 font-bold text-base hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  See Our Process
                </Link>
              </div>
            </div>
          </Animate>
          <Animate animation="fade-in" delay={200}>
            <GrowthChart className="max-w-md mx-auto" />
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16" aria-label="Our pillars">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Five Pillars</SectionLabel>
            <SectionTitle>What We Believe</SectionTitle>
            <SectionDesc>
              These principles guide every decision we make. They are non-negotiable, regardless of the engagement size or channel mix.
            </SectionDesc>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="space-y-16 mt-12">
            {pillars.map((p) => (
              <div key={p.num} className="grid grid-cols-1 lg:grid-cols-[80px_1fr] gap-6">
                <div className="flex flex-col items-center lg:items-start gap-2">
                  <div className="text-black">{p.icon}</div>
                  <div className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-gray-200">{p.num}</div>
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black leading-tight mb-4">{p.title}</h2>
                  <p className="text-base text-gray-600 leading-relaxed mb-4">{p.desc}</p>
                  <p className="text-base text-gray-500 leading-relaxed">{p.detail}</p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white" aria-label="Discovery questions">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Before We Start</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight mt-3">
              Questions We Ask Every Client
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-10 max-w-2xl">
              Before recommending anything, we need to understand your business. These are the questions that shape your strategy.
            </p>
          </Animate>
          <Stagger stagger={50} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {discoveryQuestions.map((q, i) => (
              <div key={i} className="flex items-start gap-4 border border-white/10 p-5 hover:border-white/30 transition-colors duration-300">
                <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-white/20 flex-shrink-0 w-8 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-base text-gray-300 leading-relaxed">{q}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Operating principles">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>How We Operate</SectionLabel>
            <SectionTitle>Operating Principles</SectionTitle>
            <SectionDesc>
              The commitments we make to every client, regardless of engagement size.
            </SectionDesc>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {operatingPrinciples.map((p) => (
              <div key={p.title} className="bg-white border border-gray-200 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-3">{p.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="Engagement models">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>How We Work Together</SectionLabel>
            <SectionTitle>Engagement Models</SectionTitle>
            <SectionDesc>
              We structure engagements around your needs, not ours. Here are the most common ways we work with clients.
            </SectionDesc>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {engagementModels.map((model) => (
              <div key={model.title} className="border border-gray-200 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none flex flex-col">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">{model.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed mb-6">{model.desc}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {model.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-base text-gray-600">
                      <span className="text-black font-bold mt-0.5 flex-shrink-0" aria-hidden="true">&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-200 pt-4 mt-auto">
                  <span className="text-base font-bold text-black">Best for: </span>
                  <span className="text-base text-gray-500">{model.bestFor}</span>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="Related pages">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Explore More</SectionLabel>
            <SectionTitle>Go Deeper</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {[
              { title: "Our Process", desc: "The 5-step system behind every campaign.", href: "/process" },
              { title: "Why Markit Media", desc: "How we compare to typical agencies.", href: "/why-markit-media" },
              { title: "Services", desc: "Full list of what we offer.", href: "/services" },
              { title: "Case Studies", desc: "See how we work in practice.", href: "/case-studies" },
              { title: "Tools We Use", desc: "The technology behind our work.", href: "/tools" },
              { title: "Pricing", desc: "How we structure our engagements.", href: "/pricing" },
              { title: "Results", desc: "Our KPI framework and measurement.", href: "/results" },
              { title: "Resources", desc: "Free guides, tools, and calculators.", href: "/resources" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="group border border-gray-200 bg-white hover:border-black/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 motion-reduce:transition-none p-6 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black group-hover:underline mb-2">{link.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{link.desc}</p>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Talk Strategy?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Every great campaign starts with a conversation. Tell us about your goals, and we will tell you how we would approach them.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                Schedule a Call &rarr;
              </Link>
              <Link href="/get-a-quote" className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                Get a Quote
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    </article>
  );
}
