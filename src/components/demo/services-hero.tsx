import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { L } from "@/components/demo/demo-parts";

/** H1 and intro copy are the live page's own words (title/H1 stay unchanged for SEO unless the owner decides otherwise). */
export function ServicesHero({ children }: { children?: React.ReactNode }) {
  return (
    <section className="px-6 lg:px-12 pt-28 lg:pt-32 pb-12" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_.95fr] gap-10 lg:gap-20 items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Digital Marketing Services</p>
          <h1 id="services-heading" className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,6.5vw,5.4rem)] font-extrabold tracking-[-0.045em] leading-[0.95] mt-4">
            Strategy, creative and growth under one roof.
          </h1>
        </div>
        <div>
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl">
            Markit Media brings paid media, SEO, social, websites, branding, video, AI and analytics into one practical growth system. Start with one service or build an integrated team around the channels that matter most.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <Link href="#services-quote" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3.5 font-bold text-sm hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Discuss your project <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link href={L("/services/finder")} className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3.5 font-bold text-sm hover:border-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Find the right service</Link>
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}
