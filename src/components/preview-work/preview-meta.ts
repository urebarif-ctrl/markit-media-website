import type { Metadata } from "next";
/** Preview pages: never indexed, never followed, no canonical to a live URL. */
export function previewMeta(title: string, description = "Private preview of the merged portfolio. Not part of the live site."): Metadata {
  return { title: `PREVIEW: ${title}`, description, robots: { index: false, follow: false, nocache: true }, openGraph: { title: `PREVIEW: ${title}`, description } };
}
