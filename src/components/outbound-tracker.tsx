"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

export function OutboundTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.href;

      if (href.startsWith("https://wa.me/")) {
        trackEvent("whatsapp_click", { link_url: href });
      } else if (href.startsWith("tel:")) {
        trackEvent("phone_click", { link_url: href });
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click", { link_url: href });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
