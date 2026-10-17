import Link from "next/link";
import { coverFor } from "@/lib/covers";
import { HERO_SHOWCASE } from "@/lib/covers";
import { getMedia, mediaUrl, mediaVariant, srcSet } from "@/lib/portfolio";

/** Image that fills its (relative, overflow-hidden) parent. Uses the shared R2 variants; no layout shift. */
export function PortfolioFill({ id, sizes, priority = false, className = "", alt }: { id: string; sizes: string; priority?: boolean; className?: string; alt?: string }) {
  const m = getMedia(id);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={mediaUrl(id, mediaVariant(id, 960))}
      srcSet={srcSet(id)}
      sizes={sizes}
      width={m.w}
      height={m.h}
      alt={alt ?? m.a}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      style={{ backgroundColor: m.bg }}
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
    />
  );
}

/** 16:9 case-study cover that matches the work shown on the case study's own page. */
export function CaseStudyCover({ k, sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw", priority = false, ratio = "aspect-[16/9]", className = "" }: { k: string | undefined; sizes?: string; priority?: boolean; ratio?: string; className?: string }) {
  const c = coverFor(k);
  if (!c) return null;
  return (
    <div className={`relative w-full ${ratio} overflow-hidden ${className}`} style={{ backgroundColor: c.bg }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={c.src}
        srcSet={c.srcSet}
        sizes={c.srcSet ? sizes : undefined}
        width={c.w}
        height={c.h}
        alt={c.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={`absolute inset-0 w-full h-full ${c.fit === "cover" ? "object-cover" : "object-contain"} transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
        style={c.zoom ? { transform: `scale(${c.zoom})` } : undefined}
      />
    </div>
  );
}

const TILE = "group relative overflow-hidden bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
function Caption({ label, name }: { label: string; name: string }) {
  return (
    <div className="absolute inset-x-0 bottom-0 p-4 pt-12 bg-gradient-to-t from-black/80 via-black/35 to-transparent">
      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/75">{label}</span>
      <p className="text-sm font-bold text-white mt-0.5">{name}</p>
    </div>
  );
}

/** Homepage hero showcase: four real case studies, each a link to its case-study page. */
export function HeroShowcase({ variant, locale = "en" }: { variant: "desktop" | "mobile"; locale?: string }) {
  const l = (p: string) => `/${locale}${p}`;
  const [a, b, c, d] = HERO_SHOWCASE;
  if (variant === "mobile") {
    return (
      <div className="grid grid-cols-2 gap-2">
        {[a, b].map((t) => (
          <Link key={t.href} href={l(t.href)} className={`${TILE} aspect-square`} aria-label={`${t.name}: ${t.label} case study`}>
            <PortfolioFill id={t.id} sizes="45vw" className="transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none" />
            <Caption label={t.label} name={t.name} />
          </Link>
        ))}
      </div>
    );
  }
  const tile = (t: (typeof HERO_SHOWCASE)[number], cls: string, sizes: string, priority: boolean) => (
    <Link href={l(t.href)} className={`${TILE} ${cls}`} aria-label={`${t.name}: ${t.label} case study`}>
      <PortfolioFill id={t.id} sizes={sizes} priority={priority} className="transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none" />
      <Caption label={t.label} name={t.name} />
    </Link>
  );
  return (
    <div className="hero-mosaic grid grid-cols-12 grid-rows-12 gap-2 h-[520px]">
      {tile(a, "col-span-7 row-span-7", "35vw", true)}
      {tile(b, "col-span-5 row-span-5", "25vw", true)}
      {tile(c, "col-span-5 row-span-7", "25vw", true)}
      {tile(d, "col-span-7 row-span-5", "35vw", true)}
    </div>
  );
}
