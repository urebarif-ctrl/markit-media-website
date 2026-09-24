import type { Metadata } from "next";
import Link from "next/link";
import { YouTubeEmbed } from "@/components/youtube-embed";

export const metadata: Metadata = {
  title: "Indus Foods × Markit Media — Private Proposal",
  description: "Private proposal prepared for Indus Foods.",
  robots: { index: false, follow: false, nocache: true },
};

const packages = [
  {
    name: "Basic", price: "PKR 105,000", recommended: false,
    items: ["8 static / graphic posts","4 reels","12 stories","1 × 3-hour professional shoot","20 edited photos","4 AI graphics","1 AI video / reel","Facebook + Instagram management","Basic community management & reporting","Campaign / offer creatives","Up to 2 hours website support / month"]
  },
  {
    name: "Growth", price: "PKR 150,000", recommended: true,
    items: ["10 static posts","8 reels","20 stories","1 × 6-hour professional shoot","35 edited photos","8 AI graphics","3 AI videos / reels","Facebook + Instagram management","Community management","Detailed reporting","1 strategy review / month","Campaign / offer creatives","Meta Ads management up to PKR 50,000 monthly media spend","Up to 2 hours website support / month"]
  },
  {
    name: "Premium", price: "PKR 225,000", recommended: false,
    items: ["12 static posts","12 reels","30 stories","2 × 5-hour professional shoots","60 edited photos","12 AI graphics","5 AI videos / reels","Facebook + Instagram management","Priority community management","Detailed + strategy reporting","2 strategy reviews / month","Priority campaign / offer creatives","Meta Ads management aligned to the agreed monthly media plan","Up to 2 hours website support / month"]
  }
];

export default function IndusFoodsProposal(){
  return <main className="bg-white text-black">
    <section className="min-h-[72vh] bg-black text-white px-6 lg:px-12 py-20 flex items-end">
      <div className="max-w-6xl mx-auto w-full">
        <p className="uppercase tracking-[.24em] text-xs text-gray-400 mb-8">Private proposal · September 2026</p>
        <p className="text-lg text-gray-300 mb-3">Indus Foods × Markit Media</p>
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,7rem)] leading-[.92] font-extrabold tracking-tight">Social, Content<br/>& Growth.</h1>
        <p className="mt-8 max-w-2xl text-lg text-gray-300 leading-relaxed">A tailored monthly content and social media partnership designed to strengthen Indus Foods' visual presence, build a consistent content engine and support measurable digital growth.</p>
        <div className="mt-10 flex flex-wrap gap-3 text-sm"><span className="border border-white/25 px-4 py-2">Facebook + Instagram</span><span className="border border-white/25 px-4 py-2">Photo + Video</span><span className="border border-white/25 px-4 py-2">AI Content</span><span className="border border-white/25 px-4 py-2">Website Support</span></div>
      </div>
    </section>

    <section className="px-6 lg:px-12 py-20"><div className="max-w-6xl mx-auto grid lg:grid-cols-[.8fr_1.2fr] gap-12">
      <div><p className="uppercase tracking-[.2em] text-xs text-gray-500">01 · The opportunity</p><h2 className="text-3xl lg:text-5xl font-extrabold mt-4">Build a content system, not just a posting calendar.</h2></div>
      <div className="text-lg text-gray-600 leading-relaxed space-y-5"><p>For a food brand, strong social media needs a dependable flow of appetising photography, short-form video, campaign creative and day-to-day community presence. The objective is to make the brand feel active, recognisable and professionally managed across every customer touchpoint.</p><p>Our recommended approach combines planned production with platform management, AI-assisted creative where useful, campaign support and limited website assistance so the brand can move quickly without fragmenting work across multiple vendors.</p></div>
    </div></section>

    <section className="bg-gray-50 px-6 lg:px-12 py-20"><div className="max-w-6xl mx-auto">
      <p className="uppercase tracking-[.2em] text-xs text-gray-500">02 · Monthly options</p><h2 className="text-3xl lg:text-5xl font-extrabold mt-4 mb-12">Choose the level of momentum.</h2>
      <div className="grid lg:grid-cols-3 gap-6">{packages.map(p=><article key={p.name} className={`relative p-7 border ${p.recommended?"bg-black text-white border-black":"bg-white border-gray-200"}`}>
        {p.recommended&&<span className="absolute right-5 top-5 text-[10px] uppercase tracking-[.16em] bg-white text-black px-3 py-1.5 font-bold">Recommended</span>}
        <h3 className="text-2xl font-extrabold">{p.name}</h3><p className="text-3xl font-extrabold mt-5">{p.price}</p><p className={`text-sm mt-1 ${p.recommended?"text-gray-400":"text-gray-500"}`}>per month · excluding applicable taxes</p>
        <ul className="mt-7 space-y-3 text-sm">{p.items.map(x=><li key={x} className="flex gap-2"><span>—</span><span>{x}</span></li>)}</ul>
      </article>)}</div>
      <div className="mt-8 border-l-4 border-black bg-white p-6"><p className="font-extrabold">Our recommendation: Growth</p><p className="text-gray-600 mt-2">It provides enough production volume to materially improve the feed while balancing content, management and campaign support. We recommend a minimum three-month engagement to establish consistency and gather enough performance signal to improve the content mix.</p></div>
    </div></section>

    <section className="px-6 lg:px-12 py-20"><div className="max-w-6xl mx-auto">
      <p className="uppercase tracking-[.2em] text-xs text-gray-500">03 · Relevant work</p><h2 className="text-3xl lg:text-5xl font-extrabold mt-4">Food, hospitality & content experience.</h2>
      <div className="grid md:grid-cols-3 gap-5 mt-10">
        {[["KIADO","Food photography, branding and social creative","/work/kiado"],["Elite Indo-Pak","Restaurant social content and digital ecosystem","/work/elite"],["Chefiality","Food product reels and digital content","/work/logo-folio"]].map(([n,d,h])=><Link key={n} href={h} className="border border-gray-200 p-7 hover:border-black transition-colors"><p className="text-xs uppercase tracking-[.18em] text-gray-400">Selected work</p><h3 className="text-xl font-extrabold mt-3">{n}</h3><p className="text-gray-500 mt-2">{d}</p><p className="font-bold mt-6">Explore →</p></Link>)}
      </div>
      <div className="mt-12 bg-black text-white p-5 lg:p-8"><p className="text-xs uppercase tracking-[.18em] text-gray-400 mb-5">Markit Media showreel · selected work 2024–2025</p><YouTubeEmbed videoId="gP17pGzj85c" title="Markit Media 2024–2025 Agency Showreel"/></div>
    </div></section>

    <section className="bg-black text-white px-6 lg:px-12 py-20"><div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
      <div><p className="uppercase tracking-[.2em] text-xs text-gray-400">04 · Commercial notes</p><h2 className="text-3xl lg:text-5xl font-extrabold mt-4">Clear from the start.</h2></div>
      <div className="space-y-5 text-gray-300"><p><b className="text-white">Taxes.</b> All package prices exclude applicable taxes.</p><p><b className="text-white">Media spend.</b> Advertising media spend is separate and paid by the client. Growth includes Meta Ads management for campaigns with up to PKR 50,000/month in media spend. Premium management is aligned to the agreed monthly media plan.</p><p><b className="text-white">Website support.</b> Every package includes up to two hours of website support per month.</p><p><b className="text-white">Engagement.</b> A minimum three-month engagement is recommended for meaningful content consistency and optimisation.</p></div>
    </div></section>

    <section className="px-6 lg:px-12 py-20"><div className="max-w-3xl mx-auto text-center"><p className="uppercase tracking-[.2em] text-xs text-gray-500">Prepared for Indus Foods</p><h2 className="text-3xl lg:text-5xl font-extrabold mt-4">Questions or changes?</h2><p className="text-gray-500 mt-5">This pilot proposal is designed for review by Indus Foods. We can refine scope, package selection or commercial details before final acceptance.</p><a href="https://wa.me/923002086081" target="_blank" rel="noopener noreferrer" className="inline-flex mt-8 bg-black text-white px-7 py-4 font-bold">Discuss on WhatsApp →</a><p className="text-xs text-gray-400 mt-8">Private proposal · not indexed by search engines · prepared September 2026</p></div></section>
  </main>
}