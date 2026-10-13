"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/tracking";

const CONSENT_KEY = "cookie-consent";

export function Analytics() {
  const [consentGiven, setConsentGiven] = useState(false);
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  useEffect(() => {
    function checkConsent() {
      setConsentGiven(localStorage.getItem(CONSENT_KEY) === "accepted");
    }
    checkConsent();
    window.addEventListener("storage", checkConsent);
    window.addEventListener("cookie-consent-update", checkConsent);
    return () => {
      window.removeEventListener("storage", checkConsent);
      window.removeEventListener("cookie-consent-update", checkConsent);
    };
  }, []);

  useEffect(() => {
    if (!consentGiven) return;
    window.dispatchEvent(new CustomEvent("analytics-consent-granted"));
  }, [consentGiven]);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    trackEvent("page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}
