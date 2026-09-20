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
  },
  {
    num: "02",
    title: "Full-Stack Execution Under One Roof",
    desc: "Digital marketing channels don't operate in silos, and neither should your agency partners. SEO informs content strategy. Paid ads reveal which messages resonate. Web development affects conversion rates. Branding influences everything.",
    detail: "When one team owns the full picture, insights flow between channels in real time. We catch opportunities that multi-vendor setups miss, and we eliminate the communication overhead that slows everything down.",
  },
  {
    num: "03",
    title: "Data-Driven Decisions, Not Gut Feelings",
    desc: "We measure everything that matters and ignore everything that doesn't. Impressions, reach, and follower counts are nice to know. Revenue, leads, cost per acquisition, and customer lifetime value are what we optimize for.",
    detail: "Every campaign has clear KPIs defined before launch. Reporting shows performance against those targets, not vanity metrics that make everyone feel good but change nothing.",
  },
  {
    num: "04",
    title: "Continuous Optimization, Not Set-and-Forget",
    desc: "Launching a campaign is the beginning, not the end. Markets shift, competitors adjust, algorithms update. Static campaigns decay. We run structured testing cycles — adjusting targeting, creative, messaging, and budgets based on live performance data.",
    detail: "Our optimization cadence depends on the channel: paid media gets weekly adjustments, SEO gets monthly strategy reviews, and creative gets refreshed based on engagement decay curves.",
  },
  {
    num: "05",
    title: "Transparent Communication and Reporting",
    desc: "You should never have to wonder what your agency is doing. We give you direct access to your team, clear reporting on what's working and what isn't, and honest assessments when something needs to change.",
    detail: "No jargon-filled PDF decks designed to obscure poor performance. Our reports focus on business outcomes, and we walk you through them so you understand every number.",
  },
];

const engagementModels = [
  {
    title: "Retainer",
    desc: "Ongoing monthly engagement with a dedicated team. Best for businesses that need consistent execution across multiple channels.",
    bestFor: "Established businesses scaling their marketing",
  },
  {
    title: "Project-Based",
    desc: "Fixed-scope engagements for specific initiatives: a website build, a brand refresh, a campaign launch. Clear deliverables and timeline.",
    bestFor: "Specific initiatives with defined outcomes",
  },
  {
    title: "Consulting",
    desc: "Strategic guidance and direction without full execution. We build the playbook, train your team, and advise on key decisions.",
    bestFor: "Companies with in-house teams that need strategic direction",
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
            </div>
          </Animate>
          <Animate animation="fade-in" delay={200}>
            <GrowthChart className="max-w-md mx-auto" />
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16" aria-label="Our pillars">
        <div className="max-w-4xl mx-auto">
          <Stagger stagger={80} animation="fade-up" className="space-y-16">
            {pillars.map((p) => (
              <div key={p.num} className="grid grid-cols-1 lg:grid-cols-[80px_1fr] gap-6">
                <div className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-gray-200">{p.num}</div>
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

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Engagement models">
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
              <div key={model.title} className="bg-white border border-gray-200 p-8">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">{model.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed mb-4">{model.desc}</p>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <span className="text-base font-bold text-black">Best for: </span>
                  <span className="text-base text-gray-500">{model.bestFor}</span>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16" aria-label="Related pages">
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
              { title: "Tools We Use", desc: "The technology behind our work.", href: "/tools" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="group border border-gray-200 hover:border-black/30 transition-all p-6 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
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
              <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors">
                Schedule a Call &rarr;
              </Link>
              <Link href="/get-a-quote" className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors">
                Get a Quote
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    </article>
  );
}
