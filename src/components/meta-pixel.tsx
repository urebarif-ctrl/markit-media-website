"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

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

/** Meta's standard base code, unchanged in behaviour, run only after cookie consent. */
function loadPixel() {
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
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  fbq("init", PIXEL_ID);
  fbq("track", "PageView");
}

export function MetaPixel() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!ALLOWED_HOSTS.has(window.location.hostname)) return;

    function sync() {
      if (localStorage.getItem(CONSENT_KEY) !== "accepted") return;
      const first = !window.fbq;
      loadPixel();
      // loadPixel() already sent the first PageView; later route changes send their own below.
      if (first) lastPath.current = window.location.pathname;
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
    window.fbq("track", "PageView");
  }, [pathname]);

  return null;
}
