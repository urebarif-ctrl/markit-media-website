"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { GalleryItem } from "@/lib/portfolio";

export interface GalleryFilter {
  value: string;
  label: string;
}

/**
 * Accessible filterable gallery with a native <dialog> lightbox.
 * Every tile shows the owning client and links to that client's case study.
 * Receives plain serialisable items (no portfolio data is bundled into the client).
 */
export function GalleryGrid({
  items,
  filters,
  filterBy = "cat",
  initial = 12,
  step = 12,
  label,
  locale = "en",
}: {
  items: GalleryItem[];
  filters?: GalleryFilter[];
  filterBy?: "cat" | "client";
  initial?: number;
  step?: number;
  label: string;
  locale?: string;
}) {
  const [active, setActive] = useState("all");
  const [visible, setVisible] = useState(initial);
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const filtered = useMemo(
    () =>
      active === "all"
        ? items
        : items.filter((i) => (filterBy === "client" ? i.client === active : i.cats.includes(active))),
    [items, active, filterBy],
  );
  const shown = filtered.slice(0, visible);

  const choose = (value: string) => {
    setActive(value);
    setVisible(initial);
  };

  const close = useCallback(() => setOpen(null), []);
  const move = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? i : (i + dir + filtered.length) % filtered.length)),
    [filtered.length],
  );

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  const current = open !== null ? filtered[open] : null;
  const l = (href: string) => `/${locale}${href}`;
  const columns =
    filtered.length <= 1
      ? "max-w-4xl mx-auto"
      : filtered.length === 2
        ? "columns-1 sm:columns-2"
        : "columns-1 sm:columns-2 lg:columns-3";

  return (
    <div>
      {filters && filters.length > 1 && (
        <div role="group" aria-label={`Filter ${label}`} className="flex flex-wrap gap-2 mb-6">
          {[{ value: "all", label: "All" }, ...filters].map((f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={active === f.value}
              onClick={() => choose(f.value)}
              className={`px-4 py-2 text-sm font-bold border transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
                active === f.value ? "bg-black text-white border-black" : "border-gray-300 text-black hover:border-black"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} of {filtered.length} {label}
      </p>

      <ul className={`${columns} [column-gap:1.25rem] list-none p-0`}>
        {shown.map((item, idx) => (
          <li key={item.id} className="mb-5 break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpen(idx)}
              aria-label={`View larger: ${item.alt}`}
              className="block w-full overflow-hidden border border-gray-200 bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                srcSet={item.srcSet}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                width={item.w}
                height={item.h}
                alt={item.alt}
                loading={idx < 3 ? "eager" : "lazy"}
                decoding="async"
                style={{ backgroundColor: item.bg }}
                className="w-full h-auto block transition-transform duration-300 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100"
              />
            </button>
            <p className="text-sm mt-2 text-gray-500">
              {item.href ? (
                <Link href={l(item.href)} className="font-bold text-black hover:underline">
                  {item.clientName}
                </Link>
              ) : (
                <span className="font-bold text-black">{item.clientName}</span>
              )}
            </p>
          </li>
        ))}
      </ul>

      {filtered.length > shown.length && (
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => setVisible((v) => v + step)}
            className="border border-black px-8 py-3 font-bold hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Show more ({filtered.length - shown.length} remaining)
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-label={current ? current.alt : "Image viewer"}
        onClose={close}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
        className="m-auto max-w-[96vw] max-h-[96vh] w-full bg-transparent p-0 backdrop:bg-black/85"
      >
        {current && (
          <div className="flex flex-col items-center gap-3 p-2 sm:p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.full}
              width={current.w}
              height={current.h}
              alt={current.alt}
              className="max-h-[78vh] w-auto max-w-full object-contain bg-white"
            />
            <div className="flex flex-wrap items-center justify-center gap-3 text-white text-sm">
              <button type="button" onClick={() => move(-1)} className="border border-white px-4 py-2 font-bold hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white">
                ← Previous
              </button>
              <span aria-hidden="true">
                {(open ?? 0) + 1} / {filtered.length}
              </span>
              <button type="button" onClick={() => move(1)} className="border border-white px-4 py-2 font-bold hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white">
                Next →
              </button>
              {current.href && (
                <Link href={l(current.href)} className="underline font-bold">
                  View {current.clientName} case study
                </Link>
              )}
              <button type="button" onClick={close} className="border border-white px-4 py-2 font-bold hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white">
                Close
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
