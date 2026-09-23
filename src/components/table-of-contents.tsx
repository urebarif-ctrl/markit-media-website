"use client";

import { useState, useEffect, useRef } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ html }: { html: string }) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const items: TocItem[] = [];
  const regex = /<h([23])[^>]*>([^<]+)<\/h[23]>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    items.push({ id, text, level: parseInt(match[1]) });
  }

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    headings.forEach((h) => observerRef.current?.observe(h));

    return () => observerRef.current?.disconnect();
  }, []);

  if (items.length < 3) return null;

  return (
    <nav aria-label="Table of contents" className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-base font-bold text-black uppercase tracking-wide cursor-pointer focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
        aria-expanded={isOpen}
      >
        <span>In This Article</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`transition-transform motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {isOpen && (
        <ol className="mt-3 space-y-1 border-l-2 border-gray-200">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setIsOpen(false)}
                className={`block py-1 text-base transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                  item.level === 3 ? "pl-6" : "pl-3"
                } ${
                  activeId === item.id
                    ? "text-black font-semibold border-l-2 border-black -ml-[2px]"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
