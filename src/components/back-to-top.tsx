"use client";

import { useState, useEffect } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    let lastVisible = window.scrollY > 600;
    setVisible(lastVisible);

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const nextVisible = window.scrollY > 600;
        if (nextVisible !== lastVisible) {
          lastVisible = nextVisible;
          setVisible(nextVisible);
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      onClick={() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
      }}
      aria-label="Back to top"
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 bg-black text-white flex items-center justify-center text-lg shadow-lg hover:bg-gray-800 transition-all duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      &uarr;
    </button>
  );
}
