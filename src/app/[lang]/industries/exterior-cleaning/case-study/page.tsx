import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, CheckCircle2, Gauge, Home, LineChart, PhoneCall, ShieldCheck, Target, TrendingUp } from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { SectionDesc, SectionLabel, SectionTitle } from "@/components/section";
import { CaseStudyThumbnail } from "@/components/case-study-thumbnail";

const pageUrl = "https://themarkitmedia.com/en/industries/exterior-cleaning/case-study";

export const metadata: Metadata = {
  title: "Exterior Cleaning Meta Ads Case Study | 448 Visible Leads",
  description:
    "A detailed Meta Ads case study for an exterior cleaning business using service-specific window cleaning and pressure washing campaigns, with 448 visible leads and an estimated visible average CPL of about $13.32 across visible June-August 2026 campaign rows.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Exterior Cleaning Meta Ads Case Study",
    description:
      "How service-specific Meta Ads campaigns generated 448 visible exterior cleaning leads across June, July and August 2026 campaign screenshots.",
    type: "article",
    url: pageUrl,
    images: [{ url: `https://themarkitmedia.com/api/case-study-thumbnail?title=${encodeURIComponent("448 Visible Meta Ads Leads for an Exterior Cleaning Business")}`, width: 1200, height: 630 }],
  },
};

const monthlyStats = [
  {
    month: "June 2026",
    leads: "124",
    avgCpl: "$12.05",
    highlight: "Strong first-month signal from window cleaning campaigns",
    image: "/images/case-studies/exterior-cleaning/june-performance.svg",
    rows: [
      "87 leads at $10.39 CPL",
      "26 leads at $17.42 CPL",
      "11 leads at $12.48 CPL",
    ],
  },
  {
    month: "July 2026",
    leads: "157",
    avgCpl: "$14.07",
    highlight: "Pressure washing and window cleaning tests scaled together",
    image: "/images/case-studies/exterior-cleaning/july-performance.svg",
    rows: [
      "60 leads at $9.76 CPL",
      "46 leads at $14.61 CPL",
      "33 leads at $14.08 CPL",
    ],
  },
  {
    month: "August 2026",
    leads: "167",
    avgCpl: "$13.54",
    highlight: "Best visible lead volume across the three uploaded screenshots",
    image: "/images/case-studies/exterior-cleaning/august-performance.svg",
    rows: [
      "76 leads at $12.22 CPL",
      "56 leads at $10.94 CPL",
      "21 leads at $14.47 CPL",
    ],
  },
];

const campaignPrinciples = [
  {
    icon: Target,
    title: "Separate the services",
    desc: "Window cleaning, pressure washing and roof washing behave like different offers. Campaigns were structured around service type so the data could show which offer deserved more budget.",
  },
  {
    icon: Home,
    title: "Target homeowners locally",
    desc: "The objective was not broad engagement. The campaign focused on local homeowner enquiries from service areas where the business could realistically quote and fulfil jobs.",
  },
  {
    icon: Gauge,
    title: "Optimise around CPL and lead quality",
    desc: "The visible rows show lead form campaigns being monitored by results, reach, frequency and cost per result so weaker tests could be paused and stronger tests could keep running.",
  },
  {
    icon: PhoneCall,
    title: "Support quote follow-up",
    desc: "For exterior cleaning, the job is not won at the form fill. Campaign reporting needs to support follow-up, estimate conversations and booked work rather than vanity metrics alone.",
  },
];

const optimisationLog = [
  "Built service-specific Meta lead generation campaigns instead of one generic exterior cleaning campaign.",
  "Tested window cleaning and pressure washing angles separately to make performance easier to read.",
  "Monitored cost per result, reach and frequency across each visible campaign row.",
  "Used campaign pauses and fresh tests to keep the account moving toward better lead costs.",
  "Kept campaign naming clean enough to understand service, date, budget level and test type quickly.",
  "Used redacted reporting screenshots for public proof while protecting the client account identity.",
];

const resultCards = [
  ["448", "Visible leads", "Across uploaded June, July and August 2026 screenshot rows."],
  ["$13.32", "Visible average CPL", "Estimated from the visible rows shown in the screenshots."],
  ["27", "Campaigns in view", "The Ads Manager views show 27 campaigns in the reporting table."],
  ["$9.76", "Lowest visible CPL", "Best visible campaign row from the July screenshot."],
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Exterior Cleaning Business Lead Generation Case Study",
  description:
    "A Meta Ads case study for an exterior cleaning business using service-specific campaigns for window cleaning and pressure washing.",
  mainEntityOfPage: pageUrl,
  author: {
    "@type": "Organization",
    name: "Markit Media",
    url: "https://themarkitmedia.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Markit Media",
    url: "https://themarkitmedia.com",
  },
};

export default function ExteriorCleaningCaseStudyPage() {
  return (
    <article>
      <JsonLd data={schema} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: "Exterior Cleaning", href: "/industries/exterior-cleaning" },
          { label: "Case Study" },
        ]}
      />

      <section className="px-6 lg:px-12 pt-24 pb-16 bg-black text-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <Animate animation="fade-up">
            <SectionLabel><span className="text-gray-400">Exterior Cleaning Case Study</span></SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.3rem,5vw,4.75rem)] font-extrabold tracking-tight leading-[1.02] mt-4">
              448 Visible Meta Ads Leads for an Exterior Cleaning Business
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mt-6 max-w-3xl">
              A service-specific Meta Ads lead generation build for window cleaning, pressure washing and exterior cleaning enquiries, supported by redacted Ads Manager screenshots from June, July and August 2026.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              {["Window Cleaning", "Pressure Washing", "Meta Lead Forms", "Home Services", "Local Lead Gen"].map((item) => (
                <span key={item} className="border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white">
                  {item}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-9">
              <Link href="/en/get-a-quote" className="bg-white text-black px-8 py-4 font-bold hover:bg-gray-100">
                Request a Similar Campaign →
              </Link>
              <Link href="/en/industries/exterior-cleaning" className="border border-white/30 px-8 py-4 font-bold hover:bg-white hover:text-black">
                Exterior Cleaning Marketing →
              </Link>
            </div>
          </Animate>

          <Animate animation="fade-in" delay={160}>
            <div className="grid grid-cols-2 gap-3">
              {resultCards.map(([value, label, note]) => (
                <div key={label} className="border border-white/10 bg-white/[0.04] p-6">
                  <div className="font-[family-name:var(--font-display)] text-4xl font-extrabold">{value}</div>
                  <div className="font-bold mt-2">{label}</div>
                  <p className="text-sm text-gray-400 leading-relaxed mt-3">{note}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mt-4">
              Note: figures are described as visible because they are calculated from the campaign rows visible in the uploaded screenshots, not from a full exported account report.
            </p>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-10 bg-white" aria-label="Case study thumbnail">
        <div className="max-w-6xl mx-auto overflow-hidden border border-gray-100">
          <CaseStudyThumbnail title="448 Visible Meta Ads Leads for an Exterior Cleaning Business" priority />
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Executive Summary</SectionLabel>
            <SectionTitle>Service-Specific Campaigns Beat a Generic Home Services Approach</SectionTitle>
            <SectionDesc>
              The campaign was built for an exterior cleaning account where the offer mix mattered. Window cleaning and pressure washing were treated as distinct campaigns with their own tests, budgets and performance reads.
            </SectionDesc>
          </Animate>

          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 mt-12">
            <Animate animation="fade-up">
              <div className="bg-white border border-gray-200 p-8 h-full">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold">The Challenge</h2>
                <p className="text-gray-500 leading-relaxed mt-5">
                  The business needed predictable homeowner enquiries without blending every cleaning service into one broad campaign. A homeowner looking for pressure washing may respond differently from someone asking for window cleaning or roof washing, so the account needed a structure that could make those differences visible.
                </p>
                <p className="text-gray-500 leading-relaxed mt-5">
                  The second challenge was measurement. Low CPL alone is not enough for a local service business. The campaign had to be judged by whether it could create a repeatable flow of leads at a cost that gave the business room to quote, follow up and book jobs.
                </p>
              </div>
            </Animate>
            <Animate animation="fade-up" delay={100}>
              <div className="bg-black text-white p-8 h-full">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold">The Outcome</h2>
                <p className="text-gray-300 leading-relaxed mt-5">
                  Across the visible June, July and August 2026 rows, the uploaded screenshots show 448 visible leads at an estimated visible average CPL of about $13.32. Multiple campaign rows produced leads in the $9-$15 CPL range.
                </p>
                <p className="text-gray-400 leading-relaxed mt-5">
                  The result was a cleaner campaign structure for exterior cleaning lead generation and a better foundation for deciding which service offers deserved continued budget.
                </p>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Monthly Evidence</SectionLabel>
            <SectionTitle>June to August 2026 Performance View</SectionTitle>
            <SectionDesc>
              The public screenshots were redacted to protect the client account while keeping service names, results, reach, frequency and cost-per-result evidence visible.
            </SectionDesc>
          </Animate>

          <Stagger stagger={90} animation="fade-up" className="grid lg:grid-cols-3 gap-6 mt-12">
            {monthlyStats.map((month) => (
              <figure key={month.month} className="border border-gray-200 bg-white overflow-hidden">
                <img src={month.image} alt={`${month.month} exterior cleaning Meta Ads performance summary`} className="w-full h-auto border-b border-gray-200" />
                <figcaption className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold">{month.month}</h2>
                      <p className="text-sm text-gray-500 mt-1">{month.highlight}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-2xl">{month.leads}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Visible leads</div>
                    </div>
                  </div>
                  <div className="mt-5 bg-gray-50 border border-gray-200 p-4">
                    <div className="text-sm text-gray-500">Estimated visible average CPL</div>
                    <div className="font-[family-name:var(--font-display)] text-3xl font-extrabold mt-1">{month.avgCpl}</div>
                  </div>
                  <ul className="mt-5 space-y-2">
                    {month.rows.map((row) => (
                      <li key={row} className="flex gap-2 text-sm text-gray-600">
                        <CheckCircle2 size={16} className="text-black mt-0.5 flex-shrink-0" aria-hidden="true" />
                        {row}
                      </li>
                    ))}
                  </ul>
                </figcaption>
              </figure>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel><span className="text-gray-400">Campaign Strategy</span></SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight">
              What Made the Account Easier to Optimise
            </h2>
          </Animate>
          <Stagger stagger={70} animation="fade-up" className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 mt-12">
            {campaignPrinciples.map((item) => (
              <div key={item.title} className="bg-black p-7">
                <item.icon size={28} strokeWidth={2} aria-hidden="true" />
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold mt-5">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mt-3">{item.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-14">
          <Animate animation="fade-up">
            <div>
              <SectionLabel>Optimisation Notes</SectionLabel>
              <SectionTitle>From Campaign Rows to Better Decisions</SectionTitle>
              <p className="text-lg text-gray-500 leading-relaxed mt-6">
                A good exterior cleaning account should be easy to read. Service type, budget, date, test angle and result should be visible enough for the media buyer to know what is working without guessing.
              </p>
              <p className="text-base text-gray-500 leading-relaxed mt-5">
                That is why the structure matters. The screenshots show campaign names tied to window cleaning, pressure washing, retargeting and test variations, making the account more useful for ongoing optimisation.
              </p>
            </div>
          </Animate>
          <Stagger stagger={50} animation="fade-up" className="space-y-3">
            {optimisationLog.map((item, i) => (
              <div key={item} className="bg-white border border-gray-200 p-5 flex gap-4">
                <span className="font-bold text-gray-400">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-base text-gray-600 leading-relaxed">{item}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Results Breakdown</SectionLabel>
            <SectionTitle>Visible Leads Increased Across the Three Uploaded Months</SectionTitle>
          </Animate>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {monthlyStats.map((month) => (
              <div key={month.month} className="border-t-4 border-black bg-gray-50 p-7">
                <div className="text-sm font-bold uppercase tracking-wide text-gray-500">{month.month}</div>
                <div className="font-[family-name:var(--font-display)] text-5xl font-extrabold mt-4">{month.leads}</div>
                <p className="text-gray-500 mt-3">visible leads at an estimated visible average CPL of {month.avgCpl}.</p>
              </div>
            ))}
          </div>
          <Animate animation="fade-up" delay={120}>
            <div className="bg-black text-white p-8 mt-10 grid md:grid-cols-[0.8fr_1.2fr] gap-8 items-center">
              <div>
                <div className="flex items-center gap-3">
                  <TrendingUp size={30} aria-hidden="true" />
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold">Why This Matters</h3>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Exterior cleaning companies often judge marketing too late, after the calendar is either empty or overloaded with low-quality enquiries. This account gave the business a month-by-month view of which services and campaign structures were producing efficient leads, making budget allocation more practical.
              </p>
            </div>
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Client-Safe Reporting</SectionLabel>
            <SectionTitle>What Was Redacted and What Stayed Visible</SectionTitle>
            <SectionDesc>
              For public portfolio use, the account name and identifying details were removed. The useful campaign evidence stayed visible: dates, campaign service labels, results, reach, frequency and cost per result.
            </SectionDesc>
          </Animate>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-white border border-gray-200 p-7">
              <ShieldCheck size={28} aria-hidden="true" />
              <h3 className="font-extrabold text-xl mt-5">Protected</h3>
              <p className="text-gray-500 leading-relaxed mt-3">
                Client name, account name, browser-level identifiers and sensitive business/account information.
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-7">
              <LineChart size={28} aria-hidden="true" />
              <h3 className="font-extrabold text-xl mt-5">Kept for proof</h3>
              <p className="text-gray-500 leading-relaxed mt-3">
                Campaign service category, visible leads, CPL, reach, frequency, date range and campaign testing structure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight">
              Want a Similar Lead Generation System?
            </h2>
            <p className="text-gray-400 leading-relaxed mt-5">
              If you run a window cleaning, pressure washing, soft washing, roof washing or exterior cleaning business, we can map your service mix, market, campaign structure and tracking before scaling spend.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link href="/en/get-a-quote" className="bg-white text-black px-9 py-4 font-bold hover:bg-gray-100">
                Request a Quote →
              </Link>
              <Link href="/en/services/performance-marketing/meta-ads" className="border border-white/30 px-9 py-4 font-bold hover:bg-white hover:text-black">
                Explore Meta Ads →
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    </article>
  );
}
