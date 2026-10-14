"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "cookie-consent";

export function CookieConsent() {
  const [shouldShow, setShouldShow] = useState<boolean | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) { setShouldShow(false); return; }
    setShouldShow(true);
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = useCallback((value: "accepted" | "dismissed") => {
    localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new Event("cookie-consent-update"));
    setIsVisible(false);
    setTimeout(() => setShouldShow(false), 400);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss("dismissed");
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isVisible, dismiss]);

  if (!shouldShow) return null;

  return (
    <div
      data-nosnippet
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[9999] p-3 sm:p-6"
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(100%)",
        opacity: isVisible ? 1 : 0,
        transition: reducedMotion
          ? "none"
          : "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div className="max-w-4xl mx-auto bg-black text-white p-4 sm:p-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-8 shadow-2xl">
        <p className="text-sm sm:text-base text-gray-300 leading-snug sm:leading-relaxed flex-1">
          We use cookies to measure site traffic and improve your experience. Choose Accept to allow analytics and advertising cookies, or Dismiss to continue without them.
        </p>
        <div className="flex gap-3 shrink-0 [&>button]:flex-1 sm:[&>button]:flex-none">
          <button onClick={() => dismiss("accepted")} className="bg-white text-black px-5 sm:px-6 py-2.5 sm:py-3 min-h-[44px] text-base font-bold hover:bg-gray-100 transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
            Accept
          </button>
          <button onClick={() => dismiss("dismissed")} className="border border-gray-600 text-gray-300 px-5 sm:px-6 py-2.5 sm:py-3 min-h-[44px] text-base font-medium hover:border-white hover:text-white transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
