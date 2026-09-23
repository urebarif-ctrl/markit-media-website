"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

interface SearchResult {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  reading_time: number;
  published_at: string | null;
}

export function BlogSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/blog/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results || []);
      setIsOpen(true);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  function handleChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(value), 300);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative max-w-xl">
      <label htmlFor="blog-search" className="sr-only">
        Search articles
      </label>
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          id="blog-search"
          type="search"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          onKeyDown={(e) => { if (e.key === "Escape") setIsOpen(false); }}
          placeholder="Search 4,000+ articles..."
          className="w-full pl-10 pr-4 py-3 text-base border border-gray-300 text-black placeholder:text-gray-400 focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none min-h-[44px]"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="blog-search-results"
          autoComplete="off"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
          </div>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div id="blog-search-results" role="listbox" className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-xl z-50 max-h-96 overflow-y-auto">
          {results.map((r) => (
            <Link
              key={r.slug}
              href={`/blog/${r.slug}`}
              onClick={() => setIsOpen(false)}
              role="option"
              className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-[-2px]"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base font-bold text-gray-500 uppercase tracking-wide">
                  {r.category}
                </span>
                <span className="text-base text-gray-400">{r.reading_time} min</span>
              </div>
              <p className="text-base font-semibold text-black leading-snug">{r.title}</p>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && !loading && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-xl z-50 px-4 py-6 text-center">
          <p className="text-base text-gray-500">No articles found for &ldquo;{query}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
