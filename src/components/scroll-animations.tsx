"use client";

import { useEffect } from "react";

export function ScrollAnimations() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).classList.add("animate-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -24px 0px" }
    );

    // Content already on screen when scripts run must stay visible: hiding it and
    // fading it back in after hydration delays the Largest Contentful Paint.
    function onScreenNow(el: HTMLElement) {
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight;
    }

    function prepare(el: HTMLElement, delay: string, duration: string | null, animation: string | undefined) {
      if (el.classList.contains("animate-on-scroll") || el.dataset.animateSkip) return;
      if (onScreenNow(el)) {
        el.dataset.animateSkip = "1";
        return;
      }
      el.style.setProperty("--anim-delay", delay);
      if (duration) el.style.setProperty("--anim-duration", duration);
      el.classList.add("animate-on-scroll", `animate-${animation}`);
      observer.observe(el);
    }

    function setup() {
      document.querySelectorAll<HTMLElement>("[data-animate]").forEach((el) => {
        const stagger = el.dataset.stagger;
        if (stagger) {
          const items = Array.from(el.children) as HTMLElement[];
          items.forEach((child, i) => {
            prepare(child, `${Math.min(i * Number(stagger), 240)}ms`, null, el.dataset.animate);
          });
        } else {
          prepare(el, `${el.dataset.delay || 0}ms`, `${el.dataset.duration || 700}ms`, el.dataset.animate);
        }
      });
    }

    setup();

    const mo = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>("[data-animate]:not(.animate-on-scroll):not([data-animate-skip])").forEach((el) => {
        const stagger = el.dataset.stagger;
        if (stagger) {
          const items = Array.from(el.children) as HTMLElement[];
          items.forEach((child, i) => {
            prepare(child, `${Math.min(i * Number(stagger), 240)}ms`, null, el.dataset.animate);
          });
        } else {
          prepare(el, `${el.dataset.delay || 0}ms`, `${el.dataset.duration || 700}ms`, el.dataset.animate);
        }
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => { observer.disconnect(); mo.disconnect(); };
  }, []);

  return null;
}
