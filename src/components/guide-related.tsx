import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { legacySeoPageById } from "@/data/legacy-seo-pages";
import { legacyTitle } from "@/data/legacy-interim-copy";
import { guideRelated } from "@/data/guide-hub";
import { SectionLabel } from "@/components/section";

/**
 * "Related guides" block at the end of a guide: sibling guides on the same topic, a matching free tool where one exists,
 * and a link to the guides hub. Guides are served at root paths (no locale prefix); tools and the hub are localized.
 */
export function GuideRelated({ guideId, locale }: { guideId: string; locale: string }) {
  const data = guideRelated[guideId];
  const l = (path: string) => (path.startsWith(`/${locale}`) ? path : `/${locale}${path}`);
  const siblings = (data?.siblings ?? [])
    .map((id) => legacySeoPageById.get(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="px-6 lg:px-12 py-16 bg-white border-t border-gray-200" aria-label="Related guides">
      <div className="max-w-5xl mx-auto">
        <SectionLabel>Keep Reading</SectionLabel>
        {siblings.length > 0 && (
          <>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight mt-3">Related guides</h2>
            <ul className="grid gap-3 mt-6 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((p) => (
                <li key={p.id} className="bg-white border border-gray-200">
                  <Link href={p.path} className="group flex items-center justify-between gap-4 p-5 h-full hover:bg-gray-50 transition-colors motion-reduce:transition-none">
                    <span className="font-semibold text-sm leading-snug">{legacyTitle(p)}</span>
                    <span className="text-gray-300 group-hover:text-black transition-colors" aria-hidden="true">&rarr;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
        {data?.tool && (
          <Link
            href={l(data.tool.href)}
            className="group mt-6 flex items-center gap-4 border border-gray-200 p-5 hover:border-black transition-colors motion-reduce:transition-none"
          >
            <Wrench size={20} aria-hidden="true" />
            <span className="font-semibold">
              Free tool: <span className="underline underline-offset-4">{data.tool.label}</span>
            </span>
          </Link>
        )}
        <Link href="/en/guides" className="inline-flex items-center gap-2 mt-6 font-bold border-b border-black pb-1">
          Browse all guides <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
