"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { YouTubeEmbed } from "@/components/youtube-embed";

export interface HeroSlide { key: string; name: string; href: string; image: string; alt: string; tag: string; video?: { id: string; title: string; poster: string } }

/**
 * Hero slider for the V1.5 demo: one slide per piece of real work. Light by design:
 * opacity-only transitions, no animation library, autoplay stops on hover, focus, any interaction, hidden tab and reduced motion.
 * Slides that are not visible are `inert`, so keyboard and screen-reader users only meet the current one.
 */
export function HeroSlider({ slides, intervalMs = 6500 }: { slides: HeroSlide[]; intervalMs?: number }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [reduced, setReduced] = useState(true);
  const box = useRef<HTMLDivElement>(null);
  const n = slides.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const go = useCallback((i: number) => setIdx(((i % n) + n) % n), [n]);

  useEffect(() => {
    if (reduced || paused || stopped) return;
    const t = setInterval(() => {
      if (document.hidden) return;
      setIdx((i) => (i + 1) % n);
    }, intervalMs);
    return () => clearInterval(t);
  }, [reduced, paused, stopped, n, intervalMs]);

  return (
    <div
      ref={box}
      role="group"
      aria-roledescription="carousel"
      aria-label="Selected work"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onPointerDown={() => setStopped(true)}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900">
        {slides.map((s, i) => {
          const active = i === idx;
          return (
            <div
              key={s.key}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}: ${s.name}`}
              inert={active ? undefined : true}
              className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${active ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
            >
              {s.video ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <div className="w-[min(100%,300px)] sm:w-[330px]">
                    <YouTubeEmbed videoId={s.video.id} title={s.video.title} alt={s.video.title} aspect="short" poster={s.video.poster} noCookie />
                  </div>
                </div>
              ) : (
                <Link href={s.href} tabIndex={active ? 0 : -1} className="group block absolute inset-0 focus-visible:outline-2 focus-visible:outline-white focus-visible:-outline-offset-4">
                  <Image unoptimized src={s.image} alt={s.alt} fill sizes="(max-width: 1024px) 92vw, 44vw" priority={i < 2} className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04] motion-reduce:transition-none" />
                </Link>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-5 pb-5 pt-16 pointer-events-none">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">{s.tag}</p>
                <p className="font-[family-name:var(--font-display)] text-xl font-extrabold mt-1">{s.name}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="flex gap-2" role="group" aria-label="Choose a slide">
          {slides.map((s, i) => (
            <button key={s.key} type="button" onClick={() => { setStopped(true); go(i); }} aria-label={`Show ${s.name}`} aria-current={i === idx} className="h-11 w-8 flex items-center focus-visible:outline-2 focus-visible:outline-white">
              <span className={`block h-[3px] w-full transition-colors ${i === idx ? "bg-white" : "bg-white/30"}`} />
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          <button type="button" onClick={() => { setStopped(true); go(idx - 1); }} aria-label="Previous slide" className="h-11 w-11 flex items-center justify-center border border-white/25 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white"><ArrowLeft size={16} aria-hidden="true" /></button>
          <button type="button" onClick={() => { setStopped(true); go(idx + 1); }} aria-label="Next slide" className="h-11 w-11 flex items-center justify-center border border-white/25 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white"><ArrowRight size={16} aria-hidden="true" /></button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{stopped || paused || reduced ? `Slide ${idx + 1} of ${n}: ${slides[idx].name}` : ""}</p>
    </div>
  );
}
