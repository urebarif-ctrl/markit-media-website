"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/tracking";

export function ConversionTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const from = searchParams.get("from") || "contact";
    trackEvent("conversion", {
      conversion_type: "lead_form_submit",
      form_source: from,
      page_path: window.location.pathname,
    });
  }, [searchParams]);

  return null;
}
