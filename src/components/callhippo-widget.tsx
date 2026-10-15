"use client";

import { useEffect } from "react";
import { CONSENT_KEY } from "@/lib/consent";

// CallHippo "Website Call Button" (call-back widget). Public identifiers, as in CallHippo's own snippet.
const USER_ID = "6acd634c3f0689997b7612e6";
const NUMBER_ID = "6acd63b73f0689997b762e92";
const SCRIPT_SRC = "https://d1x9dsge91xf6g.cloudfront.net/callhippo/files/ch-webcall.min.js";

const CONTAINER_ID = "callhippo-widget-container";
const STYLE_ID = "callhippo-position";
// Only the public site (never the dashboard host, workers.dev, previews or staging clones).
const ALLOWED_HOSTS = new Set(["themarkitmedia.com", "www.themarkitmedia.com"]);
if (process.env.NODE_ENV !== "production") ALLOWED_HOSTS.add("localhost");

// The widget's default button position sits on top of our WhatsApp button, so lift it (and its popup) above it.
const POSITION_CSS = ".open-button{bottom:168px!important}.ch-callme-popup{bottom:128px!important}";

function load() {
  if (document.getElementById(CONTAINER_ID)) return;
  const container = document.createElement("div");
  container.id = CONTAINER_ID;
  document.body.appendChild(container);
  const w = window as unknown as Record<string, string>;
  w.USERID = USER_ID;
  w.NUMBERID = NUMBER_ID;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = POSITION_CSS;
  document.head.appendChild(style);
  const script = document.createElement("script");
  script.async = true;
  script.src = SCRIPT_SRC;
  script.dataset.callhippo = "1";
  document.head.appendChild(script);
}

function unload() {
  document.getElementById(CONTAINER_ID)?.remove();
  document.getElementById(STYLE_ID)?.remove();
  document.querySelectorAll(".open-button, .ch-callme-popup, script[data-callhippo]").forEach((el) => el.remove());
}

/** Renders nothing; adds the call-back button while mounted (US pages) and the visitor has not opted out. */
export function CallHippoWidget() {
  useEffect(() => {
    if (!ALLOWED_HOSTS.has(window.location.hostname)) return;

    function sync() {
      if (localStorage.getItem(CONSENT_KEY) === "accepted") load();
      else unload();
    }
    sync();
    window.addEventListener("cookie-consent-update", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("cookie-consent-update", sync);
      window.removeEventListener("storage", sync);
      unload(); // leaving a US page removes the widget
    };
  }, []);

  return null;
}
