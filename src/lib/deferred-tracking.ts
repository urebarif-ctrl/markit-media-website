// Advertising tags (Meta Pixel, Google Ads remarketing) start after the page has loaded.
//
// Why: together they are ~440 KB of JavaScript. They used to start while the page was still hydrating, which pushed the
// browser's `load` event to 7-9 s on a slow phone. Nothing on the page needs them to render or respond, so they now
// start once the page has loaded and the main thread is idle.
//
// How it fits together:
//   - startDeferredTracking() is called once per full page load (from <Analytics />).
//   - Code that needs the "go" signal registers with onTrackingReady(cb); cb runs once.
//   - The Google tag in GTM listens for the dataLayer event "tags_idle", which is pushed once, at the same moment.
//   - flushDeferredTracking() fires immediately. trackEvent() calls it for conversion-type events, and it also runs when a
//     visitor starts filling in a form, so the tags are already loaded before a lead can be submitted.
//
// GA4 and the Conversion Linker are not deferred (they stay on "All Pages" in GTM).

type Callback = () => void;

/** Never earlier than this after the load event: lets hydration finish first. */
const MIN_AFTER_LOAD_MS = 1500;
/** Never later than this after the load event, even if the browser never reports idle. */
const MAX_AFTER_LOAD_MS = 5000;

const waiters: Callback[] = [];
const cleanups: Callback[] = [];
let started = false;
let fired = false;
let timers: number[] = [];

type IdleWindow = { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };

/** Run `cb` once the page has loaded and gone idle (or immediately if that already happened). */
export function onTrackingReady(cb: Callback) {
  if (fired) {
    cb();
    return;
  }
  waiters.push(cb);
}

/** Start the deferred tags now. Safe to call many times. */
export function flushDeferredTracking() {
  if (fired || typeof window === "undefined") return;
  fired = true;
  timers.forEach((t) => window.clearTimeout(t));
  timers = [];
  cleanups.splice(0).forEach((fn) => fn());
  // GTM replays anything already in the dataLayer when it initialises, so this is safe even before GTM has loaded.
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "tags_idle" });
  waiters.splice(0).forEach((cb) => {
    try {
      cb();
    } catch {
      /* one failing tag must not stop the others */
    }
  });
}

/** Schedule the deferred start. Idempotent; call once per full page load. */
export function startDeferredTracking() {
  if (started || fired || typeof window === "undefined") return;
  started = true;

  // A visitor who starts a form is about to convert: make sure the tags are loaded first.
  const onFocus = (e: Event) => {
    const el = e.target as HTMLElement | null;
    if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) flushDeferredTracking();
  };
  document.addEventListener("focusin", onFocus, true);
  document.addEventListener("submit", flushDeferredTracking, true);
  cleanups.push(() => {
    document.removeEventListener("focusin", onFocus, true);
    document.removeEventListener("submit", flushDeferredTracking, true);
  });

  const arm = () => {
    timers.push(window.setTimeout(flushDeferredTracking, MAX_AFTER_LOAD_MS));
    timers.push(
      window.setTimeout(() => {
        const ric = (window as unknown as IdleWindow).requestIdleCallback;
        if (typeof ric === "function") {
          ric.call(window, flushDeferredTracking, { timeout: MAX_AFTER_LOAD_MS - MIN_AFTER_LOAD_MS });
        } else {
          flushDeferredTracking();
        }
      }, MIN_AFTER_LOAD_MS),
    );
  };
  if (document.readyState === "complete") arm();
  else window.addEventListener("load", arm, { once: true });
}
