import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "How to Choose a Digital Marketing Agency — Complete Guide",
  description: "A practical guide to evaluating and choosing a digital marketing agency. Red flags to watch for, questions to ask, and what to expect from a good partnership.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/agency-comparison" },
};

const criteria = [
  {
    title: "Strategy Before Tactics",
    good: "Asks about your business goals, margins, and customer journey before recommending channels.",
    bad: "Jumps straight to recommending services without understanding your business.",
    question: "Can you walk me through your discovery process before you start recommending tactics?",
  },
  {
    title: "Transparent Reporting",
    good: "Shows real-time dashboards. Reports on revenue metrics, not just traffic and impressions.",
    bad: "Sends monthly PDFs with vanity metrics. Hides underperforming campaigns.",
    question: "What KPIs do you track, and how often can I see performance data?",
  },
  {
    title: "Who Does the Work",
    good: "Senior specialists execute your campaigns directly. You know who is working on your account.",
    bad: "Account manager relays messages to unnamed junior staff or outsourced freelancers.",
    question: "Who specifically will be working on my account, and what is their experience level?",
  },
  {
    title: "Flexible Contracts",
    good: "Month-to-month or quarterly agreements. Easy to scale up or down based on results.",
    bad: "12-month lock-in contracts with early termination fees. Difficult to adjust scope.",
    question: "What are your contract terms, and what happens if I need to change scope?",
  },
  {
    title: "Industry Experience",
    good: "Has worked with businesses in your industry. Understands your buyer journey and competitive landscape.",
    bad: "Takes any client regardless of industry. Generic strategies applied across the board.",
    question: "Can you share examples of work you have done in my industry or a closely related one?",
  },
  {
    title: "Communication Cadence",
    good: "Regular check-ins, fast response times, proactive updates when something needs attention.",
    bad: "Radio silence between monthly meetings. Reactive only when you escalate issues.",
    question: "How often will we communicate, and what is your typical response time?",
  },
  {
    title: "Realistic Expectations",
    good: "Sets honest timelines and caveats. Explains what is and is not within their control.",
    bad: "Guarantees first-page rankings, specific revenue numbers, or overnight results.",
    question: "What kind of timeline should I realistically expect for measurable results?",
  },
  {
    title: "Technology and Tools",
    good: "Uses industry-standard tools and can explain their tech stack. Adapts to your existing tools.",
    bad: "Uses proprietary tools that lock you in. Cannot integrate with your existing CRM or analytics.",
    question: "What tools do you use, and do you integrate with our existing marketing stack?",
  },
];

const redFlags = [
  "Guarantees specific rankings or results before auditing your current position",
  "Will not share who is working on your account",
  "Requires a 12+ month contract before any work begins",
  "Ownership of ad accounts or creative assets stays with the agency",
  "Reports focus exclusively on impressions, reach, or traffic with no conversion data",
  "Cannot explain their pricing or how your budget is allocated",
  "Uses aggressive sales tactics or urgency pressure",
  "Has no case studies, references, or verifiable client work",
];

export default function AgencyComparisonPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Choose a Digital Marketing Agency",
    description: "A practical guide to evaluating digital marketing agencies.",
    publisher: {
      "@type": "Organization",
      name: "Markit Media",
      url: "https://themarkitmedia.com",
    },
  };

  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Resources", href: "/resources" }, { label: "Choosing an Agency" }]} />

      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Guide</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              How to Choose a Digital Marketing Agency
            </h1>
            <SectionDesc>
              Not all agencies are created equal. This guide helps you evaluate potential partners objectively, ask the right questions, and spot red flags before you commit.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16" aria-label="Evaluation criteria">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Evaluation Criteria</SectionLabel>
            <SectionTitle>8 Things to Evaluate Before Signing</SectionTitle>
          </Animate>
          <div className="mt-12 space-y-8">
            {criteria.map((c, i) => (
              <Animate key={i} animation="fade-up" delay={i * 30}>
                <div className="border border-gray-200 p-6 lg:p-8">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                    {i + 1}. {c.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-gray-50">
                      <p className="text-base font-bold text-black mb-1">Good sign</p>
                      <p className="text-base text-gray-500 leading-relaxed">{c.good}</p>
                    </div>
                    <div className="p-4 bg-white border border-gray-200">
                      <p className="text-base font-bold text-gray-400 mb-1">Red flag</p>
                      <p className="text-base text-gray-500 leading-relaxed">{c.bad}</p>
                    </div>
                  </div>
                  <div className="p-4 border-l-4 border-black bg-gray-50">
                    <p className="text-base font-bold text-black mb-1">Ask this:</p>
                    <p className="text-base text-gray-600 italic leading-relaxed">&ldquo;{c.question}&rdquo;</p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Red flags">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Warning Signs</SectionLabel>
            <SectionTitle>Red Flags to Watch For</SectionTitle>
            <SectionDesc>
              If you encounter any of these during the sales process, proceed with caution.
            </SectionDesc>
          </Animate>
          <ul className="mt-10 space-y-3">
            {redFlags.map((flag, i) => (
              <Animate key={i} animation="fade-up" delay={i * 30}>
                <li className="flex items-start gap-3 py-3 border-b border-gray-200">
                  <span className="w-6 h-6 flex items-center justify-center bg-black text-white text-base font-bold flex-shrink-0" aria-hidden="true">!</span>
                  <p className="text-base text-gray-600 leading-relaxed">{flag}</p>
                </li>
              </Animate>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="What to expect">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Setting Expectations</SectionLabel>
            <SectionTitle>What Good Agency Partnerships Look Like</SectionTitle>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {[
              { title: "Month 1-3", desc: "Discovery, auditing, strategy development, technical setup, and baseline measurement. Results start slowly as the foundation is built." },
              { title: "Month 3-6", desc: "Campaigns mature. Data accumulates. Optimization cycles accelerate. You should see clear directional improvement in key metrics." },
              { title: "Month 6-12", desc: "Compounding returns from SEO investment. Paid campaigns hitting efficient scale. Content assets generating organic traffic. Clear ROI picture emerges." },
              { title: "Ongoing", desc: "Continuous optimization, testing, and strategic refinement. The relationship shifts from setup to growth and scaling. Regular strategy reviews keep alignment tight." },
            ].map((phase) => (
              <div key={phase.title} className="bg-gray-50 p-6 border border-gray-200">
                <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-2">{phase.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Ready to Talk to an Agency That Checks Every Box?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              No lock-in contracts, no junior account managers, no vanity metrics. Just a straightforward conversation about your goals and how we can help.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
              Start the Conversation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    </article>
  );
}
