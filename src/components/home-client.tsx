"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Counts up to `to` once, when scrolled into view. The server HTML already contains the final number (crawlable, no-JS safe). */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1300;
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / dur);
        setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      setV(0);
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

export interface ProcessStep { n: string; t: string; c: string; d: string; visual: ReactNode }

/**
 * Sticky process story. Left: a progress line and the six step names (active one highlighted). Right: six tall panels, each with its own visual.
 * All text is server-rendered in the panels. The active step is tracked with one IntersectionObserver (no scroll listener).
 */
export function ProcessStory({ steps }: { steps: ProcessStep[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((es) => {
      for (const e of es) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
    }, { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  const cur = steps[active];
  return (
    <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-10 lg:gap-24">
      <div className="hidden lg:block">
        <div className="sticky top-32">
          <ol className="relative list-none p-0 m-0 pl-8" aria-label="Process steps">
            <span className="absolute left-[9px] top-2 bottom-2 w-px bg-black/15" aria-hidden="true" />
            <span className="absolute left-[9px] top-2 w-px origin-top transition-[height,background-color] duration-700 ease-out motion-reduce:transition-none" style={{ height: `calc((100% - 1rem) * ${active / (steps.length - 1)})`, background: cur.c }} aria-hidden="true" />
            {steps.map((s, i) => (
              <li key={s.n} className="relative py-3">
                <span className="absolute -left-8 top-1/2 -translate-y-1/2 h-[19px] w-[19px] rounded-full border-2 bg-white transition-colors duration-500 motion-reduce:transition-none" style={{ borderColor: i <= active ? s.c : "#d4d4d8", background: i <= active ? s.c : "#fff" }} aria-hidden="true" />
                <a href={`#step-${s.n}`} aria-current={i === active ? "step" : undefined} className={`font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight transition-[color,transform] duration-500 motion-reduce:transition-none inline-block min-h-11 ${i === active ? "translate-x-2" : "text-black/30 hover:text-black/60"}`} style={i === active ? { color: s.c } : undefined}>{s.t}</a>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <ol className="list-none p-0 m-0 space-y-6 lg:space-y-10">
        {steps.map((s, i) => (
          <li key={s.n} id={`step-${s.n}`} data-i={i} ref={(el) => { refs.current[i] = el; }} className="scroll-mt-28">
            <div className="rounded-3xl p-6 md:p-10 lg:min-h-[62vh] flex flex-col justify-between gap-8 text-white overflow-hidden" style={{ background: `linear-gradient(145deg, ${s.c}, ${s.c}cc 55%, #0b0a1a)` }}>
              <div>
                <p className="font-[family-name:var(--font-display)] text-[5.5rem] md:text-[7rem] leading-none font-extrabold text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,.75)" }} aria-hidden="true">{s.n}</p>
                <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold tracking-tight mt-2"><span className="sr-only">Step {s.n}: </span>{s.t}</h3>
                <p className="text-lg text-white/85 leading-relaxed mt-3 max-w-md">{s.d}</p>
              </div>
              <div className="rounded-2xl bg-white/10 ring-1 ring-white/20 p-4 backdrop-blur-[2px]">{s.visual}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
