"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CONSENT_KEY, applyConsent, regionRequiresConsent } from "@/lib/consent";

export function CookieConsent() {
  const [shouldShow, setShouldShow] = useState<boolean | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const acceptRef = useRef<HTMLButtonElement>(null);
  const dismissRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (localStorage.getItem(CONSENT_KEY)) {
      setShouldShow(false);
    } else {
      // Regions that do not require opt-in are marked as accepted without showing a banner.
      regionRequiresConsent().then((required) => {
        if (cancelled) return;
        if (!required) {
          applyConsent("accepted", "region");
          setShouldShow(false);
          return;
        }
        setShouldShow(true);
        timer = setTimeout(() => setIsVisible(true), 2000);
      });
    }

    function openSettings() {
      setShouldShow(true);
      setTimeout(() => setIsVisible(true), 50);
    }
    window.addEventListener("open-cookie-settings", openSettings);
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      window.removeEventListener("open-cookie-settings", openSettings);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const t = setTimeout(() => acceptRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const first = acceptRef.current;
      const last = dismissRef.current;
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isVisible]);

  const dismiss = useCallback((value: "accepted" | "dismissed") => {
    applyConsent(value, "user");
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
          <button ref={acceptRef} onClick={() => dismiss("accepted")} className="bg-white text-black px-6 py-3 min-h-[44px] text-base font-bold hover:bg-gray-100 transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
            Accept
          </button>
          <button ref={dismissRef} onClick={() => dismiss("dismissed")} className="border border-gray-600 text-gray-300 px-6 py-3 min-h-[44px] text-base font-medium hover:border-white hover:text-white transition-colors motion-reduce:transition-none cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
