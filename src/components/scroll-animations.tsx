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

    function setup() {
      document.querySelectorAll<HTMLElement>("[data-animate]").forEach((el) => {
        const stagger = el.dataset.stagger;
        if (stagger) {
          const items = Array.from(el.children) as HTMLElement[];
          items.forEach((child, i) => {
            child.style.setProperty("--anim-delay", `${Math.min(i * Number(stagger), 240)}ms`);
            child.classList.add("animate-on-scroll", `animate-${el.dataset.animate}`);
            observer.observe(child);
          });
        } else {
          el.style.setProperty("--anim-delay", `${el.dataset.delay || 0}ms`);
          el.style.setProperty("--anim-duration", `${el.dataset.duration || 700}ms`);
          el.classList.add("animate-on-scroll", `animate-${el.dataset.animate}`);
          observer.observe(el);
        }
      });
    }

    setup();

    const mo = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>("[data-animate]:not(.animate-on-scroll)").forEach((el) => {
        if (el.dataset.stagger) {
          const items = Array.from(el.children) as HTMLElement[];
          items.forEach((child, i) => {
            if (child.classList.contains("animate-on-scroll")) return;
            child.style.setProperty("--anim-delay", `${Math.min(i * Number(el.dataset.stagger), 240)}ms`);
            child.classList.add("animate-on-scroll", `animate-${el.dataset.animate}`);
            observer.observe(child);
          });
        } else {
          el.style.setProperty("--anim-delay", `${el.dataset.delay || 0}ms`);
          el.style.setProperty("--anim-duration", `${el.dataset.duration || 700}ms`);
          el.classList.add("animate-on-scroll", `animate-${el.dataset.animate}`);
          observer.observe(el);
        }
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => { observer.disconnect(); mo.disconnect(); };
  }, []);

  return null;
}
