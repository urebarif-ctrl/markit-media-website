"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { onTrackingReady } from "@/lib/deferred-tracking";

const PIXEL_ID = "488175816004115";
const CONSENT_KEY = "cookie-consent";
// Only the public site. Never the dashboard host, workers.dev, previews or staging clones.
const ALLOWED_HOSTS = new Set(["themarkitmedia.com", "www.themarkitmedia.com"]);
// Local development only: NODE_ENV is replaced at build time, so this is absent from production bundles.
if (process.env.NODE_ENV !== "production") ALLOWED_HOSTS.add("localhost");

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: unknown;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/**
 * Meta's standard base code, split in two so the page is not slowed down:
 *  - createQueue(): the tiny fbq() stub that queues calls. No network. Runs as soon as consent is given, so GTM's
 *    "Meta - Lead" / "Meta - Contact" tags (which only call fbq when it is a function) always have something to call.
 *  - loadScript(): downloads fbevents.js and sends the first PageView. Deferred until the page has loaded and is idle,
 *    or until the visitor starts a form / converts (see lib/deferred-tracking.ts). Queued calls are replayed in order.
 */
let scriptRequested = false;

function createQueue() {
  if (window.fbq) return;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  fbq("init", PIXEL_ID);
}

function loadScript() {
  if (scriptRequested || !window.fbq) return;
  scriptRequested = true;
  window.fbq("track", "PageView");
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
}

const consentAccepted = () => localStorage.getItem(CONSENT_KEY) === "accepted";

export function MetaPixel() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);
  const registered = useRef(false);

  useEffect(() => {
    if (!ALLOWED_HOSTS.has(window.location.hostname)) return;

    function sync() {
      if (!consentAccepted()) return;
      const first = !window.fbq;
      createQueue();
      // The first PageView is sent by loadScript(); later route changes send their own below.
      if (first) lastPath.current = window.location.pathname;
      if (!registered.current) {
        registered.current = true;
        // Re-check consent at the moment of loading: it may have been withdrawn while we waited.
        onTrackingReady(() => {
          if (consentAccepted()) loadScript();
        });
      }
    }

    sync();
    window.addEventListener("cookie-consent-update", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("cookie-consent-update", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // Single-page navigations: Next.js changes the route without a full page load.
  useEffect(() => {
    if (!window.fbq || lastPath.current === null) return;
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    // Until the pixel script has been requested, the PageView queued by loadScript() covers the page being viewed.
    if (!scriptRequested) return;
    window.fbq("track", "PageView");
  }, [pathname]);

  return null;
}
