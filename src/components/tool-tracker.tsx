"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/tracking";

export function ToolTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const slug = pathname.split("/").filter(Boolean).pop() || "";
    if (!slug || slug === "resources" || slug === "free-tools") return;
    trackEvent("tool_view", { tool_slug: slug, page_path: pathname });

    let interacted = false;
    const onInteract = (e: Event) => {
      if (interacted) return;
      const target = e.target as HTMLElement | null;
      if (!target?.closest("main")) return;
      if (e.type === "click" && !target.closest("button, [role=button], input, select, textarea, label")) return;
      interacted = true;
      trackEvent("tool_interaction", { tool_slug: slug, page_path: pathname });
    };
    document.addEventListener("input", onInteract, true);
    document.addEventListener("change", onInteract, true);
    document.addEventListener("click", onInteract, true);
    return () => {
      document.removeEventListener("input", onInteract, true);
      document.removeEventListener("change", onInteract, true);
      document.removeEventListener("click", onInteract, true);
    };
  }, [pathname]);

  return null;
}
