import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { fullServiceCatalog } from "@/components/location-landing";

export const metadata: Metadata = {
  title: "Digital Marketing Agency Locations",
  description: "Explore Markit Media digital marketing services across the United States, Pakistan, Canada, UAE, UK, Australia and Saudi Arabia.",
  alternates: { canonical: "https://themarkitmedia.com/en/locations" },
};

const countries = [
  ["United States","/locations/united-states","Our highest-priority market, with dedicated city and local-service pages across major US metros."],
  ["Pakistan","/locations/pakistan","Pakistan market coverage with Karachi as the primary city hub and full local service ecosystem."],
  ["Canada","/locations/canada","Integrated digital marketing for Canadian companies across acquisition, search, social, web and content."],
  ["United Arab Emirates","/locations/uae","Performance, social, web, brand and search marketing for a fast-moving international market."],
  ["United Kingdom","/locations/uk","Full-stack marketing support for UK businesses competing in local, national and international markets."],
  ["Australia","/locations/australia","Digital growth services across paid media, SEO, web, content, creative and analytics."],
  ["Saudi Arabia","/locations/saudi-arabia","Digital marketing built for a rapidly expanding, mobile-first business environment."],
] as const;

export default function LocationsPage(){
  return <article>
    <Breadcrumb items={[{label:"Home",href:"/"},{label:"Locations"}]}/>
    <section className="px-6 lg:px-12 pt-24 pb-16"><div className="max-w-5xl mx-auto"><Animate animation="fade-up"><SectionLabel>Markets We Serve</SectionLabel><h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.75rem)] font-extrabold tracking-tight mt-3">Digital Marketing Agency Locations</h1><p className="text-lg text-gray-600 leading-relaxed mt-6">Our location pages are built to show what Markit Media can actually deliver in each market: the complete service stack, relevant local service hubs, market context, industries and direct paths to deeper service pages.</p></Animate></div></section>
    <section className="px-6 lg:px-12 py-20 bg-gray-50"><div className="max-w-7xl mx-auto"><Animate animation="fade-up"><SectionLabel>Countries</SectionLabel><SectionTitle>Explore our priority markets</SectionTitle></Animate><Stagger stagger={60} animation="fade-up" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">{countries.map(([t,h,d])=><Link key={h} href={h} className="bg-white border border-gray-200 p-7 hover:border-black hover:shadow-lg transition-all"><h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold">{t}</h2><p className="text-base text-gray-500 leading-relaxed mt-3">{d}</p><span className="inline-block font-bold mt-5">Explore market →</span></Link>)}</Stagger></div></section>
    <section className="px-6 lg:px-12 py-20"><div className="max-w-7xl mx-auto"><Animate animation="fade-up"><SectionLabel>Full Service Capability</SectionLabel><SectionTitle>Every market can access the full Markit Media stack</SectionTitle></Animate><Stagger stagger={30} animation="fade-up" className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">{fullServiceCatalog.map(([t,h,d])=><Link key={h} href={h} className="border border-gray-200 p-6 hover:border-black transition-colors"><h3 className="font-bold text-lg">{t}</h3><p className="text-base text-gray-500 mt-2 leading-relaxed">{d}</p></Link>)}</Stagger></div></section>
    <section className="px-6 lg:px-12 py-20 bg-black text-white text-center"><div className="max-w-3xl mx-auto"><h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold">Need a market-specific growth plan?</h2><p className="text-lg text-gray-300 mt-4">Tell us where you are competing and what you want to grow. We will recommend the right service mix.</p><Link href="/contact" className="inline-block mt-8 bg-white text-black px-9 py-4 font-bold">Request a Quote →</Link></div></section>
  </article>;
}
