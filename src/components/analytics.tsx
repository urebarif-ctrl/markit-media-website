"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "cookie-consent";

export function Analytics() {
  const [consentGiven, setConsentGiven] = useState(false);

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

  return null;
}
