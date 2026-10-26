import type { Metadata } from "next";

/** Demo pages are never indexed, never followed and carry no canonical to the real pages. */
export function demoMeta(title: string, path: string): Metadata {
  return {
    title: `DEMO: ${title}`,
    description: "Design demo, not part of the live site.",
    robots: { index: false, follow: false, nocache: true },
    alternates: { canonical: `https://themarkitmedia.com/en/demo/${path}` },
    openGraph: { title: `DEMO: ${title}`, description: "Design demo, not part of the live site." },
  };
}
