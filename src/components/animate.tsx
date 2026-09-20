"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

type Animation = "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-in" | "slide-up";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface AnimateProps {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function Animate({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  className = "",
  once = true,
}: AnimateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    setReady(true);
    el.style.setProperty("--anim-delay", `${delay}ms`);
    el.style.setProperty("--anim-duration", `${duration}ms`);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-visible");
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.classList.remove("animate-visible");
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, duration, once]);

  return (
    <div ref={ref} className={`${ready ? `animate-on-scroll animate-${animation}` : ""} ${className}`}>
      {children}
    </div>
  );
}

interface StaggerProps {
  children: ReactNode;
  stagger?: number;
  animation?: Animation;
  className?: string;
}

export function Stagger({ children, stagger = 100, animation = "fade-up", className = "" }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    setReady(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".stagger-child").forEach((child, i) => {
            const htmlChild = child as HTMLElement;
            htmlChild.style.setProperty("--anim-delay", `${i * stagger}ms`);
            htmlChild.classList.add("animate-visible");
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger]);

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div key={i} className={ready ? `stagger-child animate-on-scroll animate-${animation}` : ""}>
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
