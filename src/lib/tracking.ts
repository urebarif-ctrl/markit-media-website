import { flushDeferredTracking } from "@/lib/deferred-tracking";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Events that mean a visitor is converting or reaching out: start any deferred ad tags before reporting them. */
const START_TAGS_FIRST = new Set([
  "generate_lead",
  "conversion",
  "newsletter_signup",
  "phone_click",
  "whatsapp_click",
  "email_click",
  "career_application",
]);

export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (START_TAGS_FIRST.has(event)) flushDeferredTracking();
  if (window.dataLayer) {
    window.dataLayer.push({ event, ...params });
  }
}
