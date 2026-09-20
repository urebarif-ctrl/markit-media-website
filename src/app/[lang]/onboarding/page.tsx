import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Client Onboarding — Your First 30 Days",
  description: "What to expect when you start working with Markit Media. A transparent look at the first 30 days: access setup, discovery, strategy, and launch.",
  alternates: { canonical: "https://themarkitmedia.com/en/onboarding" },
  openGraph: {
    title: "Client Onboarding",
    description: "Your first 30 days with Markit Media: access setup, discovery, strategy, and launch.",
  },
};

const weeklyTimeline = [
  {
    week: "Week 1",
    title: "Kickoff & Access",
    tasks: [
      "Kickoff call with your dedicated team",
      "Share brand guidelines, existing assets, and logins",
      "We set up analytics tracking and platform access",
      "Begin competitive and market research",
      "Establish communication cadence and channels",
    ],
    outcome: "By end of Week 1, we have full context on your business, access to all platforms, and a clear understanding of your goals and constraints.",
  },
  {
    week: "Week 2",
    title: "Discovery & Audit",
    tasks: [
      "Complete audit of current marketing efforts",
      "Analyze existing website performance and SEO health",
      "Review ad account history and performance trends",
      "Map customer journey and conversion funnel",
      "Identify quick wins and high-impact opportunities",
    ],
    outcome: "By end of Week 2, you receive a comprehensive audit report with findings, benchmarks, and a prioritized list of opportunities.",
  },
  {
    week: "Week 3",
    title: "Strategy & Planning",
    tasks: [
      "Develop channel strategy with KPI targets",
      "Create messaging framework and content themes",
      "Build campaign structures and audience segments",
      "Set budget allocation across channels",
      "Present strategy for your review and feedback",
    ],
    outcome: "By end of Week 3, you approve a documented strategy with clear timelines, deliverables, and success metrics.",
  },
  {
    week: "Week 4",
    title: "Build & Launch",
    tasks: [
      "Build campaign creatives and landing pages",
      "Set up tracking and conversion events",
      "Launch initial campaigns across selected channels",
      "Configure reporting dashboards",
      "Schedule first performance review",
    ],
    outcome: "By end of Week 4, your campaigns are live, tracking is verified, and you have access to real-time performance dashboards.",
  },
];

const whatWeNeed = [
  { title: "Brand Assets", desc: "Logo files, brand guidelines, fonts, and photography. If you do not have brand guidelines, we can help create them." },
  { title: "Platform Access", desc: "Admin or manager access to your ad accounts, analytics, CMS, and social profiles. We will walk you through what is needed." },
  { title: "Business Context", desc: "Your target audience, competitive landscape, past marketing performance, and seasonal patterns." },
  { title: "Goals & Constraints", desc: "Revenue targets, budget parameters, timeline expectations, and any compliance or legal requirements." },
];

const faqItems = [
  { q: "How long does onboarding take?", a: "The structured onboarding process takes 4 weeks. By the end of Week 4, campaigns are live and dashboards are active. Some channels like SEO continue to ramp over months, but you will see activity and data from day one." },
  { q: "Who will I work with?", a: "You will have a dedicated account lead who is your primary contact, plus direct access to the specialists working on your campaigns. No junior account managers relaying messages." },
  { q: "What if I need to move faster?", a: "We can compress the timeline for urgent launches. If you have existing assets and clear goals, we have launched campaigns within 7 days. Talk to us about your timeline." },
  { q: "Do I keep access to everything?", a: "Yes. All accounts, data, dashboards, and assets are set up in your name. You own everything. If you ever leave, you take it all with you." },
  { q: "What happens after the first 30 days?", a: "We shift into ongoing optimization and growth mode. Weekly performance updates, monthly strategy sessions, and continuous campaign improvement. The first 30 days build the foundation — everything after builds on it." },
];

export default function OnboardingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Client Onboarding — Markit Media",
    description: "What to expect in your first 30 days working with Markit Media.",
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Onboarding" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Getting Started</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Your First 30 Days
            </h1>
            <SectionDesc>
              Starting with a new agency can feel uncertain. Here is exactly what happens in the first 30 days so you know what to expect, what we need from you, and when you will start seeing results.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12 bg-gray-50" aria-label="Timeline overview">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {weeklyTimeline.map((w) => (
                <div key={w.week} className="bg-white border border-gray-200 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 motion-reduce:transition-none">
                  <span className="text-base font-bold text-gray-400 uppercase tracking-wide">{w.week}</span>
                  <h2 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mt-2">{w.title}</h2>
                </div>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16" aria-label="Weekly details">
        <div className="max-w-5xl mx-auto">
          {weeklyTimeline.map((w, i) => (
            <Animate key={w.week} animation="fade-up" delay={i * 80}>
              <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 py-12 ${i < weeklyTimeline.length - 1 ? "border-b border-gray-200" : ""}`}>
                <div>
                  <span className="font-[family-name:var(--font-display)] text-5xl font-extrabold text-black/10 block leading-none">{w.week.split(" ")[1]}</span>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mt-2">{w.title}</h3>
                </div>
                <div>
                  <h4 className="text-base font-bold text-black uppercase tracking-wide mb-4">What Happens</h4>
                  <ul className="space-y-3">
                    {w.tasks.map((t) => (
                      <li key={t} className="flex items-start gap-3 text-base text-gray-600 leading-relaxed">
                        <span className="text-black font-bold mt-0.5 flex-shrink-0" aria-hidden="true">&#10003;</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 border border-gray-200">
                  <h4 className="text-base font-bold text-black uppercase tracking-wide mb-3">Your Outcome</h4>
                  <p className="text-base text-gray-500 leading-relaxed">{w.outcome}</p>
                </div>
              </div>
            </Animate>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="What we need from you">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Your Part</SectionLabel>
            <SectionTitle>What We Need From You</SectionTitle>
            <SectionDesc>
              We handle the heavy lifting, but onboarding works best when you come prepared with these four things.
            </SectionDesc>
          </Animate>
          <Stagger stagger={80} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {whatWeNeed.map((item, i) => (
              <div key={item.title} className="bg-white p-8 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center flex-shrink-0 text-base font-bold">{i + 1}</span>
                  <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black">{item.title}</h3>
                </div>
                <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white" aria-label="Our commitment">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Our Promise</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-white mt-3">
              What You Can Expect From Us
            </h2>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { title: "Fast Responses", desc: "Your messages get answered within one business day. Urgent items get same-day attention." },
              { title: "No Surprises", desc: "You will never be blindsided by a bill, a scope change, or a missed deadline. We communicate proactively." },
              { title: "Real Expertise", desc: "The people on your kickoff call are the same people doing the work. No bait-and-switch after the sale." },
            ].map((item) => (
              <div key={item.title} className="border border-white/20 p-8">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-white mb-3">{item.title}</h3>
                <p className="text-base text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="Onboarding FAQ">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Onboarding Questions</SectionTitle>
          </Animate>
          <div className="mt-10">
            {faqItems.map((item, i) => (
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

      <section className="px-6 lg:px-12 py-16 bg-gray-50" aria-label="Related pages">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Our Process", desc: "The 5-step framework behind every engagement.", href: "/process" },
                { title: "How We Report", desc: "Transparent dashboards and actionable insights.", href: "/results" },
                { title: "Pricing", desc: "Retainer, project, or performance-based models.", href: "/pricing" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="group border border-gray-200 bg-white p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black group-hover:underline mb-2">{link.title}</h3>
                  <p className="text-base text-gray-500 leading-relaxed">{link.desc}</p>
                </Link>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Start?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              The first step is a free consultation. No commitment, no pressure — just a conversation about your goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                Schedule a Consultation &rarr;
              </Link>
              <Link href="/get-a-quote" className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                Get a Quote
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    </article>
  );
}
