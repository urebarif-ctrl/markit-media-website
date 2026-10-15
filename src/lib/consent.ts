// Cookie consent helpers.
//
// Tracking (Google tag via Zaraz, GA4, Meta Pixel) is granted when localStorage["cookie-consent"] === "accepted".
//
// CONSENT_MODE:
//   "off"       (current, owner decision 15 Oct 2026) no banner for anyone; every visitor is marked "accepted"
//               automatically (source "default"). The footer "Cookie settings" link remains so any visitor can
//               opt out, and an opt-out is respected on later visits.
//   "by-region" banner only for the UK, EEA, Switzerland and Canada (and when the country is unknown).
//
// Note: "off" means UK/EEA/Swiss/Canadian visitors are tracked without prior opt-in consent.
export const CONSENT_MODE: "off" | "by-region" = "off";

export const CONSENT_KEY = "cookie-consent";
export const CONSENT_SOURCE_KEY = "cookie-consent-source";
const REGION_CACHE_KEY = "consent-region-required";

// EU 27, EEA (IS, LI, NO), United Kingdom, Switzerland and Canada (Quebec's Law 25 needs opt-in).
const CONSENT_REQUIRED_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU",
  "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH", "CA",
]);

/** Browser-level opt-out signal (Global Privacy Control). */
export function globalPrivacyControlOn(): boolean {
  return (navigator as unknown as { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

/** True when the visitor's country needs an opt-in banner. Fails safe: unknown means "ask". */
export async function regionRequiresConsent(): Promise<boolean> {
  if (CONSENT_MODE === "off") return false;
  try {
    const cached = sessionStorage.getItem(REGION_CACHE_KEY);
    if (cached === "1" || cached === "0") return cached === "1";
  } catch {
    /* storage unavailable: fall through */
  }
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    const res = await fetch("/cdn-cgi/trace", { cache: "no-store", signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return true;
    const match = (await res.text()).match(/^loc=([A-Z]{2})$/m);
    if (!match) return true;
    const required = CONSENT_REQUIRED_COUNTRIES.has(match[1]);
    try {
      sessionStorage.setItem(REGION_CACHE_KEY, required ? "1" : "0");
    } catch {
      /* ignore */
    }
    return required;
  } catch {
    return true;
  }
}

/** Record a choice and tell the tag loader, analytics and pixel. */
export function applyConsent(value: "accepted" | "dismissed", source: "user" | "default" | "gpc") {
  localStorage.setItem(CONSENT_KEY, value);
  localStorage.setItem(CONSENT_SOURCE_KEY, source);
  if (value === "dismissed") revokeTracking();
  window.dispatchEvent(new Event("cookie-consent-update"));
}

function revokeTracking() {
  const w = window as unknown as {
    dataLayer?: unknown[];
    __mmGranted?: boolean;
  };
  // Allow the loader to grant again if the visitor later changes their mind on the same page.
  w.__mmGranted = false;
  if (w.dataLayer) {
    // gtag() semantics: GTM expects an Arguments object.
    (function gtag(..._unused: unknown[]) {
      void _unused;
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    })("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
  }
  window.fbq?.("consent", "revoke");
}
