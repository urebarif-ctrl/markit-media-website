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

  if (!shouldShow) return null;

  return (
    <div
      data-nosnippet
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(100%)",
        opacity: isVisible ? 1 : 0,
        transition: reducedMotion
          ? "none"
          : "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div className="max-w-4xl mx-auto bg-black text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 shadow-2xl">
        <p className="text-base text-gray-300 leading-relaxed flex-1">
          We use cookies to improve your experience and analyze site traffic. By continuing to use this site, you agree to our use of cookies.
        </p>
        <div className="flex gap-3 shrink-0">
          <button onClick={() => dismiss("accepted")} className="bg-white text-black px-6 py-3 min-h-[44px] text-base font-bold hover:bg-gray-100 transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
            Accept
          </button>
          <button onClick={() => dismiss("dismissed")} className="border border-gray-600 text-gray-300 px-6 py-3 min-h-[44px] text-base font-medium hover:border-white hover:text-white transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
