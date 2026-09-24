"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";

type Animation = "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-in" | "slide-up";

interface AnimateProps {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function Animate({ children, animation = "fade-up", delay = 0, duration = 650, className = "", once = true }: AnimateProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !('IntersectionObserver' in window)) return;
    el.style.setProperty("--anim-delay", `${delay}ms`);
    el.style.setProperty("--anim-duration", `${duration}ms`);
    el.classList.add("animate-on-scroll", `animate-${animation}`);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add("animate-visible");
        if (once) observer.unobserve(el);
      } else if (!once) el.classList.remove("animate-visible");
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });
    observer.observe(el);
    return () => {
      observer.disconnect();
      el.classList.remove("animate-on-scroll", `animate-${animation}`, "animate-visible");
    };
  }, [animation, delay, duration, once]);
  return <div ref={ref} className={className}>{children}</div>;
}

interface StaggerProps {
  children: ReactNode;
  stagger?: number;
  animation?: Animation;
  className?: string;
}

export function Stagger({ children, stagger = 80, animation = "fade-up", className = "" }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !('IntersectionObserver' in window)) return;
    const items = Array.from(el.children) as HTMLElement[];
    const observer = new IntersectionObserver(entries => {
      // Reveal each card as it enters the viewport, including long mobile grids.
      entries.filter(entry => entry.isIntersecting).forEach((entry, index) => {
        const card = entry.target as HTMLElement;
        card.style.setProperty("--anim-delay", `${Math.min(index * stagger, 240)}ms`);
        card.classList.add("animate-visible");
        observer.unobserve(card);
      });
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });
    items.forEach(card => {
      card.classList.add("animate-on-scroll", `animate-${animation}`);
      observer.observe(card);
    });
    return () => {
      observer.disconnect();
      items.forEach(card => card.classList.remove("animate-on-scroll", `animate-${animation}`, "animate-visible"));
    };
  }, [stagger, animation, children]);
  return <div ref={ref} className={className}>{Children.map(children, child => <div className="stagger-child">{child}</div>)}</div>;
}
