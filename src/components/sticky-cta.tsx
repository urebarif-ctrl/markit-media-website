"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function StickyCta() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <>
      {/* Mobile: full-width bottom bar */}
      <div
        className="fixed bottom-0 inset-x-0 z-40 flex items-center bg-black md:hidden motion-reduce:transition-none transition-transform duration-300"
        style={{
          transform: visible ? "translateY(0)" : "translateY(100%)",
        }}
        role="complementary"
        aria-label="Get a free consultation"
      >
        <Link
          href="/contact"
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 min-h-[56px] text-white text-base font-[family-name:var(--font-display)] font-semibold no-underline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          Get a Free Consultation
          <span aria-hidden="true" className="text-lg">&rarr;</span>
        </Link>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss consultation banner"
          className="shrink-0 w-[44px] h-[44px] flex items-center justify-center text-white/70 hover:text-white transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Desktop: floating button bottom-right */}
      <div
        className="fixed bottom-24 right-8 z-40 hidden md:block motion-reduce:transition-none transition-opacity duration-300"
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
        }}
        role="complementary"
        aria-label="Get a quote"
      >
        <div className="relative">
          <Link
            href="/get-a-quote"
            className="flex items-center justify-center bg-black text-white px-6 py-4 min-h-[48px] text-base font-[family-name:var(--font-display)] font-semibold shadow-lg hover:bg-gray-900 transition-colors motion-reduce:transition-none no-underline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Get a Quote
          </Link>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss quote button"
            className="absolute -top-2 -right-2 w-[44px] h-[44px] flex items-center justify-center bg-black text-white/70 hover:text-white shadow-md transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
