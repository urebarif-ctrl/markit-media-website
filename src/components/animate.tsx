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

type VisibilityHandler = (isVisible: boolean) => void;

const visibilityHandlers = new WeakMap<Element, VisibilityHandler>();
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver() {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibilityHandlers.get(entry.target)?.(entry.isIntersecting);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -24px 0px" }
    );
  }
  return sharedObserver;
}

function observeVisibility(element: Element, handler: VisibilityHandler) {
  const observer = getSharedObserver();
  if (!observer) return () => {};

  visibilityHandlers.set(element, handler);
  observer.observe(element);

  return () => {
    observer.unobserve(element);
    visibilityHandlers.delete(element);
  };
}

export function Animate({ children, animation = "fade-up", delay = 0, duration = 650, className = "", once = true }: AnimateProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    el.style.setProperty("--anim-delay", `${delay}ms`);
    el.style.setProperty("--anim-duration", `${duration}ms`);
    el.classList.add("animate-on-scroll", `animate-${animation}`);

    let stopObserving = () => {};
    stopObserving = observeVisibility(el, (isVisible) => {
      if (isVisible) {
        el.classList.add("animate-visible");
        if (once) stopObserving();
      } else if (!once) {
        el.classList.remove("animate-visible");
      }
    });

    return () => {
      stopObserving();
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
  const childCount = Children.count(children);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    const items = Array.from(el.children) as HTMLElement[];
    const cleanups = items.map((card, index) => {
      card.style.setProperty("--anim-delay", `${Math.min(index * stagger, 240)}ms`);
      card.classList.add("animate-on-scroll", `animate-${animation}`);

      let stopObserving = () => {};
      stopObserving = observeVisibility(card, (isVisible) => {
        if (!isVisible) return;
        card.classList.add("animate-visible");
        stopObserving();
      });
      return stopObserving;
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      items.forEach((card) => card.classList.remove("animate-on-scroll", `animate-${animation}`, "animate-visible"));
    };
  }, [stagger, animation, childCount]);

  return <div ref={ref} className={className}>{Children.map(children, child => <div className="stagger-child">{child}</div>)}</div>;
}
