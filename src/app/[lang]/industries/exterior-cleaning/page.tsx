import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Camera,
  Droplets,
  Globe,
  MapPin,
  MousePointerClick,
  Phone,
  Search,
} from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Exterior Cleaning Marketing Agency | SEO, Google Ads & Meta Ads",
  description:
    "Digital marketing for exterior cleaning companies: window cleaning, pressure washing, soft washing, roof cleaning, gutters, and commercial exterior services. SEO, Google Ads, Meta Ads, websites, CRM, and lead follow-up.",
  keywords: [
    "exterior cleaning marketing agency",
    "window cleaning marketing",
    "pressure washing marketing",
    "soft washing marketing",
    "roof cleaning marketing",
    "window cleaning SEO",
    "pressure washing SEO",
    "Google Ads for exterior cleaning",
    "Meta Ads for window cleaning",
    "exterior cleaning lead generation",
  ],
  alternates: {
    canonical: "https://themarkitmedia.com/en/industries/exterior-cleaning",
  },
  openGraph: {
    title: "Digital Marketing for Exterior Cleaning Companies",
    description:
      "SEO, paid media, websites, CRM, and follow-up systems for window cleaning, pressure washing, soft washing, roof cleaning, gutter cleaning, and exterior service companies.",
    type: "website",
  },
};

const exteriorServices = [
  "Window Cleaning",
  "Pressure Washing",
  "Soft Washing",
  "Roof Cleaning",
  "House Washing",
  "Gutter Cleaning",
  "Concrete & Driveway Cleaning",
  "Commercial Exterior Cleaning",
  "Solar Panel Cleaning",
  "Pure-Water / Water-Fed Pole Cleaning",
];

const marketingSystems: { icon: LucideIcon; title: string; desc: string; href: string }[] = [
  {
    icon: Search,
    title: "Local SEO",
    desc: "Build visibility for the services and locations that actually generate jobs: dedicated service pages, city and service-area content, on-page SEO, technical cleanup, and local intent targeting.",
    href: "/services/seo/local-seo",
  },
  {
    icon: MapPin,
    title: "Google Business Profile",
    desc: "Strengthen map-pack visibility with accurate categories, service coverage, review momentum, photos, posts, and a local content strategy that supports your core service areas.",
    href: "/services/seo/local-seo",
  },
  {
    icon: MousePointerClick,
    title: "Google Ads",
    desc: "Capture high-intent searches such as window cleaning, pressure washing, roof cleaning, and soft washing near the moment a homeowner or property manager is ready to request a quote.",
    href: "/services/performance-marketing/google-ads",
  },
  {
    icon: Camera,
    title: "Meta Ads & Creative",
    desc: "Turn before-and-after transformations, crews at work, equipment, reviews, and seasonal offers into scroll-stopping campaigns for Facebook and Instagram.",
    href: "/services/performance-marketing/meta-ads",
  },
  {
    icon: Globe,
    title: "Websites & Landing Pages",
    desc: "Create fast, mobile-first pages with clear service areas, strong proof, quote CTAs, click-to-call, FAQs, and separate pages for each major cleaning service.",
    href: "/services/website-development/landing-pages",
  },
  {
    icon: Phone,
    title: "CRM & Speed-to-Lead",
    desc: "Route enquiries into a practical follow-up flow with call tracking, lead status visibility, automated reminders, missed-call recovery, and fast quote follow-up.",
    href: "/services/digital-marketing/crm-consulting",
  },
];

const differences = [
  {
    title: "One company can serve several search markets",
    desc: "A customer searching for roof cleaning is not necessarily using the same words as someone looking for window cleaning or driveway pressure washing. Treating every service as one generic 'exterior cleaning' page leaves high-intent searches uncovered.",
  },
  {
    title: "The work is unusually visual",
    desc: "Before-and-after photography can demonstrate value almost instantly. Creative strategy should capture dirty-to-clean transformations, satisfying process footage, equipment, crew professionalism, and finished-property details.",
  },
  {
    title: "Seasonality changes the offer",
    desc: "Demand can shift with weather, pollen, holidays, property maintenance cycles, and regional seasonality. Budgets, creative, landing pages, and offers should move with the services people are most likely to buy now.",
  },
  {
    title: "Route density matters",
    desc: "Ten jobs spread across a wide region are not the same operationally as ten jobs clustered in profitable neighborhoods. Marketing should support the locations you actually want to serve, not simply maximize raw lead volume.",
  },
  {
    title: "Speed-to-lead can decide who wins the job",
    desc: "Many homeowners request multiple quotes. Fast calls, texts, estimate reminders, and a clear booking process help turn marketing enquiries into estimates and estimates into scheduled work.",
  },
  {
    title: "Residential and commercial buyers behave differently",
    desc: "Residential campaigns can lean on urgency, visual proof, reviews, and simple estimates. Commercial work often needs credibility, scope clarity, recurring-service positioning, and a longer follow-up process.",
  },
];

const searchArchitecture = [
  {
    label: "Core service pages",
    examples: "Window cleaning, pressure washing, soft washing, roof cleaning, gutter cleaning, house washing",
  },
  {
    label: "High-value specialty pages",
    examples: "Commercial exterior cleaning, solar panel cleaning, pure-water window cleaning, multi-story window cleaning",
  },
  {
    label: "Service-area pages",
    examples: "Build around the cities, suburbs, ZIP codes, and neighborhoods you genuinely serve — without duplicating thin location pages",
  },
  {
    label: "Proof content",
    examples: "Before/after projects, FAQs, cleaning-method explainers, maintenance guides, review highlights, and commercial capability pages",
  },
];

const campaignPlays = [
  {
    title: "High-intent search capture",
    desc: "Prioritize Google Search campaigns around service + location intent, keep brand and non-brand traffic distinguishable, and send each ad group to a relevant landing page instead of a generic homepage.",
  },
  {
    title: "Before-and-after paid social",
    desc: "Use short transformation videos, split-screen results, satisfying process clips, customer proof, and seasonal hooks. Meta works best when the creative makes the problem and result immediately obvious.",
  },
  {
    title: "Reactivation & recurring work",
    desc: "Past customers are an asset. Build reminder campaigns around annual window cleaning, seasonal exterior maintenance, gutter schedules, commercial maintenance, and complementary services.",
  },
  {
    title: "Neighborhood expansion",
    desc: "When crews already have jobs in a target area, coordinate local campaigns, remarketing, review requests, and nearby offers to increase route density rather than chasing disconnected leads.",
  },
];

const metrics = [
  "Qualified enquiries by service",
  "Cost per qualified lead",
  "Quote / estimate rate",
  "Booked-job rate",
  "Cost per booked job",
  "Call answer and response speed",
  "Revenue by campaign or channel when trackable",
  "Service-area and route-density performance",
];

const process = [
  {
    num: "01",
    title: "Map the market",
    desc: "We review your service mix, service areas, seasonality, existing website, Google Business Profile, ad accounts, creative library, reviews, CRM, and current lead flow.",
  },
  {
    num: "02",
    title: "Fix the conversion path",
    desc: "Before increasing spend, we make sure the website, landing pages, quote forms, phone tracking, service pages, and follow-up process give the traffic somewhere useful to go.",
  },
  {
    num: "03",
    title: "Launch around intent",
    desc: "Search campaigns focus on active demand. Meta campaigns use visual proof and offers. Local SEO builds durable visibility across services and areas that matter to the business.",
  },
  {
    num: "04",
    title: "Optimize for booked work",
    desc: "We look beyond clicks and form fills. The goal is to understand lead quality, estimates, bookings, service mix, and which campaigns are producing work worth putting on the schedule.",
  },
];

const faq = [
  {
    q: "What types of exterior cleaning companies do you work with?",
    a: "The strategy is designed for window cleaning, pressure washing, power washing, soft washing, roof cleaning, house washing, gutter cleaning, concrete and driveway cleaning, solar panel cleaning, commercial exterior cleaning, and businesses offering several of these services together.",
  },
  {
    q: "Do window cleaning and pressure washing need separate SEO pages?",
    a: "Usually, yes. They represent different search intent and often different customers, job values, equipment, and sales messaging. A strong site gives major services their own useful pages and then supports them with relevant service-area and proof content.",
  },
  {
    q: "Do you understand pure-water and water-fed pole window cleaning?",
    a: "Yes. Pure-water systems and water-fed poles are established professional window-cleaning methods. Marketing should explain the method in customer-friendly language when it is a meaningful differentiator, particularly for exterior glass, multi-story work, and commercial maintenance.",
  },
  {
    q: "Is Google Ads or Meta Ads better for exterior cleaning?",
    a: "They solve different problems. Google Search captures people already looking for a service. Meta can create demand using visual transformations, seasonal offers, and local social proof. Many operators benefit from using both, with budgets weighted according to demand, market size, creative quality, and capacity.",
  },
  {
    q: "How important is Google Business Profile for an exterior cleaning company?",
    a: "Very important for local discovery. A complete profile, accurate service information, fresh photos, review growth, consistent business details, and a strong website all support local visibility. The exact ranking outcome depends on the market and competition.",
  },
  {
    q: "Can marketing help us get more commercial window cleaning or exterior-cleaning accounts?",
    a: "Yes, but commercial acquisition should not simply copy a residential campaign. Commercial pages need to communicate capabilities, service frequency, property types, safety and professionalism, coverage, and a clear way for property managers or facility teams to request a scope or quote.",
  },
  {
    q: "How do you handle seasonal demand?",
    a: "We plan around the services that make sense in each market and season. That may mean shifting budgets, offers, landing pages, or creative between windows, house washing, roofs, gutters, commercial maintenance, or other services instead of running the same campaign all year.",
  },
  {
    q: "What should an exterior cleaning website include?",
    a: "At minimum: separate pages for major services, clear service areas, visible calls to action, phone and quote options, reviews, authentic project photos, before-and-after proof, FAQs, trust information, mobile performance, and analytics that connect enquiries to their source.",
  },
  {
    q: "Can you work with GoHighLevel or our existing CRM?",
    a: "Yes. We can work with an existing CRM and lead workflow, including GoHighLevel-based setups, or recommend a practical tracking and follow-up structure. The priority is that leads are visible, contacted quickly, and moved through a clear pipeline.",
  },
  {
    q: "Do you only work with exterior cleaning companies in one country?",
    a: "No. Markit Media serves businesses internationally, with a strong focus on the United States. The campaign structure, seasonality, terminology, service areas, ad platforms, and local-search strategy are adapted to the market being targeted.",
  },
];

export default function ExteriorCleaningPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing for Exterior Cleaning Companies",
    serviceType: "Digital Marketing",
    description:
      "SEO, Google Ads, Meta Ads, websites, CRM, and lead generation for window cleaning, pressure washing, soft washing, roof cleaning, gutter cleaning, and exterior cleaning companies.",
    provider: {
      "@type": "Organization",
      name: "Markit Media",
      url: "https://themarkitmedia.com",
    },
    areaServed: [
      "United States",
      "Canada",
      "United Kingdom",
      "Australia",
      "United Arab Emirates",
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
          { label: "Exterior Cleaning" },
        ]}
      />

      <section aria-label="Exterior cleaning marketing" className="px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <Animate animation="fade-up">
              <SectionLabel>Exterior Cleaning Marketing</SectionLabel>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.35rem,5vw,4.25rem)] font-extrabold text-black tracking-tight leading-[1.04] mt-3">
                Digital Marketing for Exterior Cleaning Companies
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed mt-6 max-w-2xl">
                Built for window cleaners, pressure washing companies, soft wash operators, roof cleaners, gutter cleaning businesses, and multi-service exterior cleaning teams that want a more predictable flow of qualified jobs.
              </p>
            </Animate>

            <Animate animation="fade-up" delay={120}>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Local SEO", "Google Ads", "Meta Ads", "Websites", "CRM & Follow-Up"].map((item) => (
                  <span key={item} className="border border-gray-200 bg-gray-50 px-4 py-2 text-base font-semibold text-black">
                    {item}
                  </span>
                ))}
              </div>
            </Animate>

            <Animate animation="fade-up" delay={200}>
              <div className="flex flex-wrap gap-4 mt-9">
                <Link
                  href="/get-a-quote"
                  className="inline-flex items-center gap-3 bg-black text-white px-9 py-4 font-bold text-base hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Request a Growth Plan &rarr;
                </Link>
                <a
                  href="https://wa.me/923002086081"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 border-2 border-black text-black px-9 py-4 font-bold text-base hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  WhatsApp Us
                </a>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={280}>
              <p className="text-base text-gray-400 mt-6">
                Hands-on paid-media and growth experience in the exterior cleaning niche, with a focus on practical lead generation, tracking, and booked-job outcomes.
              </p>
            </Animate>
          </div>

          <Animate animation="fade-in" delay={180}>
            <img
              src="/images/industries/exterior-cleaning.svg"
              alt="Exterior cleaning marketing for window cleaning, pressure washing, roof cleaning, and soft washing companies"
              className="w-full aspect-[4/3] object-cover border border-gray-100"
            />
          </Animate>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-10 border-y border-gray-200 bg-gray-50" aria-label="Exterior cleaning services">
        <div className="max-w-7xl mx-auto">
          <p className="text-base font-bold uppercase tracking-[0.14em] text-gray-500 mb-5">Built for the services you actually sell</p>
          <div className="flex flex-wrap gap-2">
            {exteriorServices.map((service) => (
              <span key={service} className="bg-white border border-gray-200 px-4 py-2.5 text-base font-semibold text-black">
                {service}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="Why exterior cleaning marketing is different">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Niche Strategy</SectionLabel>
            <SectionTitle>Exterior Cleaning Is Not Generic Home Services</SectionTitle>
            <SectionDesc>
              The buying journey is local, visual, seasonal, and operationally sensitive. The marketing needs to reflect how an exterior cleaning company actually makes money.
            </SectionDesc>
          </Animate>
          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {differences.map((item, i) => (
              <div key={item.title} className="border border-gray-200 p-7 bg-white">
                <span className="text-base font-bold text-gray-400">0{i + 1}</span>
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mt-4 mb-3">{item.title}</h2>
                <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white" aria-label="Marketing services for exterior cleaning companies">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel><span className="text-gray-400">Growth System</span></SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight max-w-3xl">
              From Search to Scheduled Job
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed mt-5 max-w-3xl">
              The goal is not to bolt random marketing channels together. We connect local visibility, paid acquisition, conversion, follow-up, and measurement into one system.
            </p>
          </Animate>

          <Stagger stagger={60} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 mt-12 border border-white/10">
            {marketingSystems.map((svc) => (
              <Link key={svc.title} href={svc.href} className="group bg-black p-7 hover:bg-white/[0.04] transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                <div className="w-11 h-11 border border-white/20 flex items-center justify-center mb-5">
                  <svc.icon size={21} strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-white group-hover:underline mb-3">{svc.title}</h3>
                <p className="text-base text-gray-400 leading-relaxed">{svc.desc}</p>
                <span className="inline-block text-base font-bold text-white mt-5">Explore service &rarr;</span>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="SEO for exterior cleaning">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16">
          <Animate animation="fade-up">
            <div>
              <SectionLabel>SEO Architecture</SectionLabel>
              <SectionTitle>Rank for the Job, Not Just the Company Name</SectionTitle>
              <p className="text-lg text-gray-500 leading-relaxed mt-6">
                A full-service exterior cleaner can compete for several distinct searches. We structure the site so Google and customers can clearly understand each service, where it is offered, and why your company is a credible choice.
              </p>
              <p className="text-base text-gray-500 leading-relaxed mt-5">
                That means avoiding one overloaded services page. Window cleaning, soft washing, roof cleaning, pressure washing, gutter cleaning, and commercial work deserve enough depth to answer the questions behind each search.
              </p>
              <Link href="/services/seo" className="inline-flex mt-7 font-bold text-black hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                Explore SEO services &rarr;
              </Link>
            </div>
          </Animate>

          <Stagger stagger={70} animation="fade-up" className="space-y-4">
            {searchArchitecture.map((item, i) => (
              <div key={item.label} className="bg-white border border-gray-200 p-6 flex gap-5">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-black mb-2">{item.label}</h3>
                  <p className="text-base text-gray-500 leading-relaxed">{item.examples}</p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="Paid media for exterior cleaning">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Paid Acquisition</SectionLabel>
            <SectionTitle>Campaigns Built Around How Cleaning Jobs Are Bought</SectionTitle>
            <SectionDesc>
              Search captures existing demand. Social creates and recaptures demand. Follow-up turns enquiries into appointments. The mix should match your market, capacity, service mix, and season.
            </SectionDesc>
          </Animate>
          <Stagger stagger={70} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {campaignPlays.map((play) => (
              <div key={play.title} className="border-t-4 border-black bg-gray-50 p-7">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-3">{play.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{play.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Creative strategy">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <Animate animation="fade-up">
            <div>
              <div className="w-14 h-14 bg-black text-white flex items-center justify-center mb-6">
                <Camera size={24} strokeWidth={2} aria-hidden="true" />
              </div>
              <SectionLabel>Creative That Shows the Result</SectionLabel>
              <SectionTitle>Turn the Transformation Into the Ad</SectionTitle>
              <p className="text-lg text-gray-500 leading-relaxed mt-6">
                Exterior cleaning has a built-in creative advantage: the result is visible. The content plan should capture that transformation consistently, not wait until the ad account needs another creative.
              </p>
            </div>
          </Animate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Before-and-after photos from the same angle",
              "Short process clips: glass, siding, roof, concrete, gutters",
              "Crew, vehicle, uniforms, equipment, and professionalism",
              "Customer reviews turned into clean proof-led creative",
              "Neighborhood and seasonal offers without cheapening the brand",
              "Commercial property footage and recurring-maintenance proof",
            ].map((item, i) => (
              <Animate key={item} animation="fade-up" delay={i * 50}>
                <div className="h-full border border-gray-200 bg-white p-6">
                  <span className="text-base font-bold text-gray-400">0{i + 1}</span>
                  <p className="text-base font-semibold text-black leading-relaxed mt-3">{item}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="Residential and commercial marketing">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Two Buying Journeys</SectionLabel>
            <SectionTitle>Residential Leads and Commercial Accounts Need Different Funnels</SectionTitle>
          </Animate>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
            <Animate animation="fade-up">
              <div className="border border-gray-200 p-8 h-full">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-5">Residential</h3>
                <p className="text-base text-gray-500 leading-relaxed mb-6">
                  Make it easy for homeowners to trust you, understand the result, and request a quote without hunting through the site.
                </p>
                <ul className="space-y-3 text-base text-gray-600">
                  {["Local search and map visibility", "Click-to-call and short quote forms", "Before-and-after proof", "Review-led trust", "Fast estimate follow-up", "Cross-sell and annual reminders"].map((x) => (
                    <li key={x} className="flex gap-3"><span aria-hidden="true">—</span>{x}</li>
                  ))}
                </ul>
              </div>
            </Animate>
            <Animate animation="fade-up" delay={100}>
              <div className="bg-black text-white p-8 h-full">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-white mb-5">Commercial</h3>
                <p className="text-base text-gray-400 leading-relaxed mb-6">
                  Give property managers, facility teams, storefronts, HOAs, and multi-site buyers enough confidence to start a real scope conversation.
                </p>
                <ul className="space-y-3 text-base text-gray-300">
                  {["Dedicated commercial capability pages", "Property-type and service coverage", "Recurring maintenance positioning", "Professional project imagery", "Clear request-for-scope CTA", "Longer-term CRM follow-up"].map((x) => (
                    <li key={x} className="flex gap-3"><span aria-hidden="true">—</span>{x}</li>
                  ))}
                </ul>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white" aria-label="Performance measurement">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">
          <Animate animation="fade-up">
            <div>
              <div className="w-14 h-14 border border-white/20 flex items-center justify-center mb-6">
                <BarChart3 size={24} strokeWidth={2} aria-hidden="true" />
              </div>
              <SectionLabel><span className="text-gray-400">Measurement</span></SectionLabel>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight">
                Leads Are Not the Final KPI
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed mt-5">
                An exterior cleaning company does not get paid for form submissions. Whenever the sales data is available, reporting should move closer to estimates, booked jobs, revenue, service mix, and the locations you actually want more work in.
              </p>
            </div>
          </Animate>
          <Stagger stagger={50} animation="fade-up" className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {metrics.map((metric, i) => (
              <div key={metric} className="bg-black p-5 flex gap-3 items-start">
                <span className="text-gray-500 font-bold">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-base font-semibold text-white">{metric}</span>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="Our exterior cleaning marketing process">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>How We Work</SectionLabel>
            <SectionTitle>A Practical Growth Process</SectionTitle>
            <SectionDesc>
              Start with the economics and lead flow, then decide what deserves more traffic.
            </SectionDesc>
          </Animate>
          <Stagger stagger={70} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {process.map((item) => (
              <div key={item.num} className="border border-gray-200 p-6">
                <span className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-gray-200">{item.num}</span>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mt-6 mb-3">{item.title}</h3>
                <p className="text-base text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Exterior cleaning marketing FAQ">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Exterior Cleaning Marketing Questions</SectionTitle>
          </Animate>
          <div className="mt-10">
            {faq.map((item, i) => (
              <Animate key={item.q} animation="fade-up" delay={i * 35}>
                <details className="group border-b border-gray-200">
                  <summary className="flex justify-between items-center py-5 cursor-pointer text-base font-bold text-black list-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                    {item.q}
                    <span className="text-xl text-gray-500 group-open:rotate-45 transition-transform flex-shrink-0 ml-4" aria-hidden="true">+</span>
                  </summary>
                  <div className="pb-5 text-base text-gray-500 leading-relaxed">{item.a}</div>
                </details>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-12" aria-label="Related marketing services">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <p className="text-base font-bold uppercase tracking-[0.14em] text-gray-500 mb-5">Build Your Stack</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Google Ads", href: "/services/performance-marketing/google-ads" },
                { label: "Meta Ads", href: "/services/performance-marketing/meta-ads" },
                { label: "Local SEO", href: "/services/seo/local-seo" },
                { label: "Landing Pages", href: "/services/website-development/landing-pages" },
                { label: "CRM Consulting", href: "/services/digital-marketing/crm-consulting" },
                { label: "Case Studies", href: "/case-studies" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="border border-gray-200 px-5 py-3 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  {link.label}
                </Link>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      <section aria-label="Call to action" className="px-6 lg:px-12 py-24 bg-black text-white text-center">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="w-14 h-14 border border-white/20 flex items-center justify-center mx-auto mb-7">
              <Droplets size={24} strokeWidth={2} aria-hidden="true" />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.25rem)] font-extrabold tracking-tight">
              Want More of the Right Exterior Cleaning Jobs?
            </h2>
            <p className="text-lg text-gray-400 mt-5 mb-9 max-w-2xl mx-auto">
              Tell us what you clean, where you work, and what your best jobs look like. We&apos;ll map the marketing around the business you actually want to build.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/get-a-quote" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                Request a Quote &rarr;
              </Link>
              <a href="https://wa.me/923002086081" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                Chat on WhatsApp
              </a>
            </div>
          </Animate>
        </div>
      </section>
    </article>
  );
}
