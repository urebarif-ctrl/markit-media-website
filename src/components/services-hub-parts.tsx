import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const D = "font-[family-name:var(--font-display)]";
export const PAD = "px-6 lg:px-12";

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`text-xs font-bold uppercase tracking-[0.2em] ${dark ? "text-white/50" : "text-gray-500"}`}>{children}</p>;
}

/**
 * Image tile that links to the project it shows. Lifts, straightens and zooms on hover; a caption slides up.
 * CSS only (transform/opacity). Hover movement is switched off for reduced-motion users.
 */
export function Tile({ href, label, children, className = "", rotate = "" }: { href: string; label: string; children: React.ReactNode; className?: string; rotate?: string }) {
  return (
    <Link
      href={href}
      className={`group/tile block overflow-hidden ${className.includes("absolute") ? "" : "relative"} transition-[transform,box-shadow] duration-500 ease-out motion-reduce:transition-none motion-safe:hover:-translate-y-1.5 motion-safe:hover:rotate-0 motion-safe:hover:z-30 hover:shadow-2xl focus-visible:z-30 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${rotate} ${className}`}
    >
      <span className="block overflow-hidden [&_img]:transition-transform [&_img]:duration-[900ms] [&_img]:ease-out motion-safe:group-hover/tile:[&_img]:scale-[1.06] motion-safe:group-focus-visible/tile:[&_img]:scale-[1.06]">{children}</span>
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-3.5 pb-3 pt-10 text-white text-[13px] font-bold opacity-0 translate-y-2 transition duration-300 motion-reduce:transition-none group-hover/tile:opacity-100 group-hover/tile:translate-y-0 group-focus-visible/tile:opacity-100 group-focus-visible/tile:translate-y-0">
        <span className="truncate">{label}</span><ArrowRight size={14} aria-hidden="true" className="shrink-0" />
      </span>
    </Link>
  );
}

export function FaqBlock({ items, title, bg = "bg-white" }: { items: [string, string][]; title: string; bg?: string }) {
  return (
    <section className={`${PAD} py-12 md:py-16 ${bg}`} aria-labelledby="services-faq">
      <div className="max-w-3xl mx-auto">
        <Eyebrow>FAQ</Eyebrow>
        <h2 id="services-faq" className={`${D} text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight mt-3`}>{title}</h2>
        <div className="mt-8 border-t border-gray-300">
          {items.map(([q, a]) => (
            <details key={q} className="group border-b border-gray-300">
              <summary className="flex justify-between items-center gap-5 py-5 cursor-pointer text-base font-bold list-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 hover:text-[#5A3ED6] transition-colors motion-reduce:transition-none">
                {q}<span className="text-xl text-gray-500 group-open:rotate-45 transition-transform motion-reduce:transition-none shrink-0" aria-hidden="true">+</span>
              </summary>
              <div className="pb-6 text-gray-600 leading-relaxed">{a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
