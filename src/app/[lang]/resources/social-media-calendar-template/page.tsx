"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

type Platform = "Instagram" | "LinkedIn" | "Twitter/X" | "TikTok" | "Facebook" | "Pinterest";
type ContentType = "Image" | "Carousel" | "Video" | "Story" | "Text" | "Reel/Short";
type TimeSlot = "Morning" | "Afternoon" | "Evening";
type PostStatus = "Draft" | "Scheduled" | "Published";
type ViewMode = "calendar" | "list";
type SortKey = "day" | "platform" | "contentType" | "timeSlot" | "status";
type SortDir = "asc" | "desc";

interface CalendarPost {
  id: string;
  day: number;
  platform: Platform;
  contentType: ContentType;
  caption: string;
  timeSlot: TimeSlot;
  status: PostStatus;
}

interface WeekTheme {
  weekIndex: number;
  theme: string;
}

const PLATFORMS: Platform[] = ["Instagram", "LinkedIn", "Twitter/X", "TikTok", "Facebook", "Pinterest"];
const CONTENT_TYPES: ContentType[] = ["Image", "Carousel", "Video", "Story", "Text", "Reel/Short"];
const TIME_SLOTS: TimeSlot[] = ["Morning", "Afternoon", "Evening"];
const STATUSES: PostStatus[] = ["Draft", "Scheduled", "Published"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* Platform shading: different grays from black to light */
const PLATFORM_STYLES: Record<Platform, { bg: string; text: string; label: string }> = {
  Instagram:  { bg: "bg-black",       text: "text-white",    label: "IG" },
  LinkedIn:   { bg: "bg-neutral-700", text: "text-white",    label: "LI" },
  "Twitter/X": { bg: "bg-neutral-500", text: "text-white",   label: "X" },
  TikTok:     { bg: "bg-neutral-400", text: "text-black",    label: "TT" },
  Facebook:   { bg: "bg-neutral-300", text: "text-black",    label: "FB" },
  Pinterest:  { bg: "bg-neutral-200", text: "text-black",    label: "Pin" },
};

const STATUS_BORDER: Record<PostStatus, string> = {
  Draft:     "border-neutral-300",
  Scheduled: "border-neutral-500",
  Published: "border-black",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function getWeekOfMonth(day: number, firstDayOfWeek: number): number {
  return Math.floor((day - 1 + firstDayOfWeek) / 7);
}

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SocialMediaCalendarTemplatePage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [posts, setPosts] = useState<CalendarPost[]>([]);
  const [weekThemes, setWeekThemes] = useState<WeekTheme[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [editingPost, setEditingPost] = useState<CalendarPost | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  /* Sort state for list view */
  const [sortKey, setSortKey] = useState<SortKey>("day");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  /* Form state for adding / editing posts */
  const [formPlatform, setFormPlatform] = useState<Platform>("Instagram");
  const [formContentType, setFormContentType] = useState<ContentType>("Image");
  const [formCaption, setFormCaption] = useState("");
  const [formTimeSlot, setFormTimeSlot] = useState<TimeSlot>("Morning");
  const [formStatus, setFormStatus] = useState<PostStatus>("Draft");

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfWeek(year, month);
  const totalWeeks = getWeekOfMonth(daysInMonth, firstDayOfWeek) + 1;

  /* ---- Navigation ---- */
  const goToPrevMonth = useCallback(() => {
    setMonth((prev) => {
      if (prev === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
    setPosts([]);
    setWeekThemes([]);
  }, []);

  const goToNextMonth = useCallback(() => {
    setMonth((prev) => {
      if (prev === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
    setPosts([]);
    setWeekThemes([]);
  }, []);

  /* ---- Post CRUD ---- */
  const openAddForm = useCallback((day: number) => {
    setEditingDay(day);
    setEditingPost(null);
    setFormPlatform("Instagram");
    setFormContentType("Image");
    setFormCaption("");
    setFormTimeSlot("Morning");
    setFormStatus("Draft");
  }, []);

  const openEditForm = useCallback((post: CalendarPost) => {
    setEditingDay(post.day);
    setEditingPost(post);
    setFormPlatform(post.platform);
    setFormContentType(post.contentType);
    setFormCaption(post.caption);
    setFormTimeSlot(post.timeSlot);
    setFormStatus(post.status);
  }, []);

  const savePost = useCallback(() => {
    if (editingDay === null) return;
    if (editingPost) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingPost.id
            ? { ...p, platform: formPlatform, contentType: formContentType, caption: formCaption, timeSlot: formTimeSlot, status: formStatus }
            : p
        )
      );
    } else {
      const newPost: CalendarPost = {
        id: uid(),
        day: editingDay,
        platform: formPlatform,
        contentType: formContentType,
        caption: formCaption,
        timeSlot: formTimeSlot,
        status: formStatus,
      };
      setPosts((prev) => [...prev, newPost]);
    }
    setEditingDay(null);
    setEditingPost(null);
  }, [editingDay, editingPost, formPlatform, formContentType, formCaption, formTimeSlot, formStatus]);

  const deletePost = useCallback((id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setEditingDay(null);
    setEditingPost(null);
  }, []);

  const closeForm = useCallback(() => {
    setEditingDay(null);
    setEditingPost(null);
  }, []);

  /* ---- Week themes ---- */
  const getWeekTheme = useCallback(
    (weekIndex: number) => weekThemes.find((w) => w.weekIndex === weekIndex)?.theme ?? "",
    [weekThemes]
  );

  const setWeekTheme = useCallback((weekIndex: number, theme: string) => {
    setWeekThemes((prev) => {
      const exists = prev.find((w) => w.weekIndex === weekIndex);
      if (exists) return prev.map((w) => (w.weekIndex === weekIndex ? { ...w, theme } : w));
      return [...prev, { weekIndex, theme }];
    });
  }, []);

  /* ---- Stats ---- */
  const stats = useMemo(() => {
    const byPlatform: Record<string, number> = {};
    const byContentType: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    for (const p of posts) {
      byPlatform[p.platform] = (byPlatform[p.platform] ?? 0) + 1;
      byContentType[p.contentType] = (byContentType[p.contentType] ?? 0) + 1;
      byStatus[p.status] = (byStatus[p.status] ?? 0) + 1;
    }
    return { total: posts.length, byPlatform, byContentType, byStatus };
  }, [posts]);

  /* ---- Sorted posts for list view ---- */
  const sortedPosts = useMemo(() => {
    const copy = [...posts];
    copy.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "day") cmp = a.day - b.day;
      else cmp = (a[sortKey] as string).localeCompare(b[sortKey] as string);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [posts, sortKey, sortDir]);

  const toggleSort = useCallback(
    (key: SortKey) => {
      if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      else {
        setSortKey(key);
        setSortDir("asc");
      }
    },
    [sortKey]
  );

  /* ---- Export ---- */
  const exportTxt = useCallback(() => {
    const lines: string[] = [];
    lines.push(`Social Media Calendar: ${MONTH_NAMES[month]} ${year}`);
    lines.push("=".repeat(50));
    lines.push("");

    for (let w = 0; w < totalWeeks; w++) {
      const theme = getWeekTheme(w);
      if (theme) {
        lines.push(`Week ${w + 1} Theme: ${theme}`);
        lines.push("-".repeat(40));
      }
    }
    if (weekThemes.length > 0) lines.push("");

    for (let d = 1; d <= daysInMonth; d++) {
      const dayPosts = posts.filter((p) => p.day === d);
      if (dayPosts.length === 0) continue;
      const date = new Date(year, month, d);
      const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];
      lines.push(`${dayName}, ${MONTH_NAMES[month]} ${d}`);
      for (const p of dayPosts) {
        lines.push(`  [${p.status}] ${p.platform} - ${p.contentType} (${p.timeSlot})`);
        if (p.caption) lines.push(`    "${p.caption}"`);
      }
      lines.push("");
    }

    lines.push(`Total posts planned: ${posts.length}`);

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `social-calendar-${MONTH_NAMES[month].toLowerCase()}-${year}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [posts, month, year, daysInMonth, totalWeeks, getWeekTheme, weekThemes.length]);

  /* ---- Clear month ---- */
  const clearMonth = useCallback(() => {
    setPosts([]);
    setWeekThemes([]);
    setShowClearConfirm(false);
  }, []);

  /* ---- Build calendar grid ---- */
  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);
  while (calendarCells.length % 7 !== 0) calendarCells.push(null);

  const sortArrow = (key: SortKey) => {
    if (sortKey !== key) return "";
    return sortDir === "asc" ? " ↑" : " ↓";
  };

  /* ---- JSON-LD ---- */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Social Media Calendar Template",
    description: "Plan your social media content with this interactive calendar. Schedule posts, set themes, track progress across platforms.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <article>
      <JsonLd data={jsonLd} />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Social Media Calendar Template" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-32 pb-16">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-tight">
              Social Media Calendar Template
            </h1>
            <SectionDesc>
              Plan and organize your social media content month by month. Add posts to any day,
              set weekly themes, track your publishing status, and export your plan.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Month Navigation + Actions ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Month nav */}
            <div className="flex items-center gap-3">
              <button
                onClick={goToPrevMonth}
                aria-label="Previous month"
                className="w-10 h-10 flex items-center justify-center border border-neutral-300 hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                &larr;
              </button>
              <span className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black min-w-[200px] text-center">
                {MONTH_NAMES[month]} {year}
              </span>
              <button
                onClick={goToNextMonth}
                aria-label="Next month"
                className="w-10 h-10 flex items-center justify-center border border-neutral-300 hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                &rarr;
              </button>
            </div>

            {/* View toggle + actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setViewMode("calendar")}
                className={`px-4 py-2 text-base font-bold border transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                  viewMode === "calendar"
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-neutral-300 hover:bg-neutral-100"
                }`}
              >
                Calendar
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 text-base font-bold border transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                  viewMode === "list"
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-neutral-300 hover:bg-neutral-100"
                }`}
              >
                List
              </button>
              <button
                onClick={exportTxt}
                disabled={posts.length === 0}
                className="px-4 py-2 text-base font-bold border border-neutral-300 bg-white text-black hover:bg-neutral-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Export .txt
              </button>
              <button
                onClick={() => setShowClearConfirm(true)}
                disabled={posts.length === 0 && weekThemes.length === 0}
                className="px-4 py-2 text-base font-bold border border-neutral-300 bg-white text-black hover:bg-neutral-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Clear Month
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Clear Confirmation ---- */}
      {showClearConfirm && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-6">
          <div className="max-w-5xl mx-auto">
            <div className="border-2 border-black p-6 flex flex-wrap items-center gap-4">
              <p className="text-base font-bold text-black">
                Clear all posts and weekly themes for {MONTH_NAMES[month]} {year}?
              </p>
              <button
                onClick={clearMonth}
                className="px-4 py-2 text-base font-bold bg-black text-white hover:bg-neutral-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Yes, Clear
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 text-base font-bold border border-neutral-300 bg-white text-black hover:bg-neutral-100 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ---- Main content: Calendar/List + Sidebar ---- */}
      <section aria-label="Weekly Themes" className="px-6 lg:px-12 pb-16">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-8">
          {/* Left: Calendar or List */}
          <div className="flex-1 min-w-0">
            {viewMode === "calendar" ? (
              <Animate animation="fade-up">
                {/* Weekly themes */}
                <div className="mb-6 space-y-3">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                    Weekly Themes
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Array.from({ length: totalWeeks }, (_, w) => (
                      <div key={w} className="flex items-center gap-2">
                        <label
                          htmlFor={`week-theme-${w}`}
                          className="text-base font-bold text-black whitespace-nowrap"
                        >
                          Wk {w + 1}:
                        </label>
                        <input
                          id={`week-theme-${w}`}
                          type="text"
                          value={getWeekTheme(w)}
                          onChange={(e) => setWeekTheme(w, e.target.value)}
                          placeholder="Enter theme..."
                          className="flex-1 border border-neutral-300 px-3 py-2 text-base text-black bg-white placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calendar grid */}
                <div className="border border-neutral-300">
                  {/* Day headers */}
                  <div className="grid grid-cols-7 border-b border-neutral-300">
                    {DAYS_OF_WEEK.map((day) => (
                      <div
                        key={day}
                        className="px-2 py-3 text-center text-base font-bold text-black bg-neutral-100 border-r border-neutral-300 last:border-r-0"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Day cells */}
                  <div className="grid grid-cols-7">
                    {calendarCells.map((day, i) => {
                      const dayPosts = day ? posts.filter((p) => p.day === day) : [];
                      return (
                        <div
                          key={i}
                          className={`min-h-[100px] border-r border-b border-neutral-300 last:border-r-0 p-1.5 ${
                            day ? "bg-white cursor-pointer hover:bg-neutral-50" : "bg-neutral-50"
                          }`}
                          onClick={() => day && openAddForm(day)}
                          role={day ? "button" : undefined}
                          tabIndex={day ? 0 : undefined}
                          aria-label={day ? `Add post on ${MONTH_NAMES[month]} ${day}` : undefined}
                          onKeyDown={(e) => {
                            if (day && (e.key === "Enter" || e.key === " ")) {
                              e.preventDefault();
                              openAddForm(day);
                            }
                          }}
                        >
                          {day && (
                            <>
                              <div className="text-base font-bold text-black mb-1">{day}</div>
                              <div className="space-y-1">
                                {dayPosts.map((post) => (
                                  <button
                                    key={post.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openEditForm(post);
                                    }}
                                    className={`block w-full text-left px-1.5 py-0.5 text-base leading-tight border-l-2 ${STATUS_BORDER[post.status]} ${PLATFORM_STYLES[post.platform].bg} ${PLATFORM_STYLES[post.platform].text} truncate focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-1`}
                                    title={`${post.platform} - ${post.contentType} (${post.status})`}
                                  >
                                    {PLATFORM_STYLES[post.platform].label} &middot; {post.status[0]}
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-4 flex flex-wrap gap-4">
                  {PLATFORMS.map((pl) => (
                    <div key={pl} className="flex items-center gap-2">
                      <span className={`inline-block w-4 h-4 ${PLATFORM_STYLES[pl].bg}`} />
                      <span className="text-base text-black">{pl}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex flex-wrap gap-4">
                  {STATUSES.map((st) => (
                    <div key={st} className="flex items-center gap-2">
                      <span className={`inline-block w-4 h-4 border-l-4 ${STATUS_BORDER[st]} bg-neutral-100`} />
                      <span className="text-base text-black">{st}</span>
                    </div>
                  ))}
                </div>
              </Animate>
            ) : (
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                  All Posts &mdash; {MONTH_NAMES[month]} {year}
                </h2>
                {posts.length === 0 ? (
                  <p className="text-base text-neutral-500">
                    No posts yet. Switch to calendar view and click on a day to add posts.
                  </p>
                ) : (
                  <div className="overflow-x-auto border border-neutral-300">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-black text-white">
                          {([
                            ["day", "Day"],
                            ["platform", "Platform"],
                            ["contentType", "Type"],
                            ["timeSlot", "Time"],
                            ["status", "Status"],
                          ] as [SortKey, string][]).map(([key, label]) => (
                            <th
                              key={key}
                              className="px-4 py-3 text-base font-bold cursor-pointer select-none hover:bg-neutral-800 transition-colors"
                              onClick={() => toggleSort(key)}
                            >
                              {label}{sortArrow(key)}
                            </th>
                          ))}
                          <th className="px-4 py-3 text-base font-bold">Caption</th>
                          <th className="px-4 py-3 text-base font-bold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedPosts.map((post) => (
                          <tr key={post.id} className="border-t border-neutral-200 hover:bg-neutral-50">
                            <td className="px-4 py-3 text-base text-black font-bold">{post.day}</td>
                            <td className="px-4 py-3 text-base text-black">
                              <span className={`inline-block px-2 py-0.5 ${PLATFORM_STYLES[post.platform].bg} ${PLATFORM_STYLES[post.platform].text} text-base`}>
                                {post.platform}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-base text-black">{post.contentType}</td>
                            <td className="px-4 py-3 text-base text-black">{post.timeSlot}</td>
                            <td className="px-4 py-3 text-base text-black">{post.status}</td>
                            <td className="px-4 py-3 text-base text-neutral-600 max-w-[200px] truncate">
                              {post.caption || "—"}
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => openEditForm(post)}
                                className="text-base font-bold text-black underline hover:no-underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Animate>
            )}
          </div>

          {/* Right: Stats sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <Animate animation="fade-up">
              <div className="border border-neutral-300 sticky top-24">
                <div className="bg-black text-white px-5 py-4">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                    Month Stats
                  </h2>
                </div>
                <div className="p-5 space-y-5">
                  {/* Total */}
                  <div>
                    <p className="text-base text-neutral-500">Total Posts Planned</p>
                    <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black">{stats.total}</p>
                  </div>

                  {/* By platform */}
                  <div>
                    <p className="text-base font-bold text-black mb-2">By Platform</p>
                    {PLATFORMS.map((pl) => (
                      <div key={pl} className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-2">
                          <span className={`inline-block w-3 h-3 ${PLATFORM_STYLES[pl].bg}`} />
                          <span className="text-base text-black">{pl}</span>
                        </div>
                        <span className="text-base font-bold text-black">{stats.byPlatform[pl] ?? 0}</span>
                      </div>
                    ))}
                  </div>

                  {/* By content type */}
                  <div>
                    <p className="text-base font-bold text-black mb-2">By Content Type</p>
                    {CONTENT_TYPES.map((ct) => (
                      <div key={ct} className="flex items-center justify-between py-1">
                        <span className="text-base text-black">{ct}</span>
                        <span className="text-base font-bold text-black">{stats.byContentType[ct] ?? 0}</span>
                      </div>
                    ))}
                  </div>

                  {/* By status */}
                  <div>
                    <p className="text-base font-bold text-black mb-2">By Status</p>
                    {STATUSES.map((st) => (
                      <div key={st} className="flex items-center justify-between py-1">
                        <span className="text-base text-black">{st}</span>
                        <span className="text-base font-bold text-black">{stats.byStatus[st] ?? 0}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Animate>
          </aside>
        </div>
      </section>

      {/* ---- Post Add/Edit Modal ---- */}
      {editingDay !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={closeForm}
          role="dialog"
          aria-modal="true"
          aria-label={editingPost ? `Edit post on ${MONTH_NAMES[month]} ${editingDay}` : `Add post on ${MONTH_NAMES[month]} ${editingDay}`}
        >
          <div
            className="bg-white w-full max-w-lg mx-4 border-2 border-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
                {editingPost ? "Edit Post" : "Add Post"} &mdash; {MONTH_NAMES[month]} {editingDay}
              </h3>
              <button
                onClick={closeForm}
                aria-label="Close dialog"
                className="text-white hover:text-neutral-300 text-xl font-bold focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                &times;
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Platform */}
              <div>
                <label htmlFor="post-platform" className="block text-base font-bold text-black mb-1">
                  Platform
                </label>
                <select
                  id="post-platform"
                  value={formPlatform}
                  onChange={(e) => setFormPlatform(e.target.value as Platform)}
                  className="w-full border border-neutral-300 px-3 py-2 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-1"
                >
                  {PLATFORMS.map((pl) => (
                    <option key={pl} value={pl}>{pl}</option>
                  ))}
                </select>
              </div>

              {/* Content type */}
              <div>
                <label htmlFor="post-content-type" className="block text-base font-bold text-black mb-1">
                  Content Type
                </label>
                <select
                  id="post-content-type"
                  value={formContentType}
                  onChange={(e) => setFormContentType(e.target.value as ContentType)}
                  className="w-full border border-neutral-300 px-3 py-2 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-1"
                >
                  {CONTENT_TYPES.map((ct) => (
                    <option key={ct} value={ct}>{ct}</option>
                  ))}
                </select>
              </div>

              {/* Caption / topic */}
              <div>
                <label htmlFor="post-caption" className="block text-base font-bold text-black mb-1">
                  Caption / Topic
                </label>
                <textarea
                  id="post-caption"
                  value={formCaption}
                  onChange={(e) => setFormCaption(e.target.value)}
                  rows={3}
                  placeholder="What is this post about?"
                  className="w-full border border-neutral-300 px-3 py-2 text-base text-black bg-white placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-1 resize-y"
                />
              </div>

              {/* Time slot */}
              <div>
                <label htmlFor="post-time-slot" className="block text-base font-bold text-black mb-1">
                  Time Slot
                </label>
                <select
                  id="post-time-slot"
                  value={formTimeSlot}
                  onChange={(e) => setFormTimeSlot(e.target.value as TimeSlot)}
                  className="w-full border border-neutral-300 px-3 py-2 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-1"
                >
                  {TIME_SLOTS.map((ts) => (
                    <option key={ts} value={ts}>{ts}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label htmlFor="post-status" className="block text-base font-bold text-black mb-1">
                  Status
                </label>
                <select
                  id="post-status"
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as PostStatus)}
                  className="w-full border border-neutral-300 px-3 py-2 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-1"
                >
                  {STATUSES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={savePost}
                  className="px-6 py-3 text-base font-bold bg-black text-white hover:bg-neutral-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  {editingPost ? "Save Changes" : "Add Post"}
                </button>
                {editingPost && (
                  <button
                    onClick={() => deletePost(editingPost.id)}
                    className="px-6 py-3 text-base font-bold border border-neutral-300 bg-white text-black hover:bg-neutral-100 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    Delete
                  </button>
                )}
                <button
                  onClick={closeForm}
                  className="px-6 py-3 text-base font-bold border border-neutral-300 bg-white text-black hover:bg-neutral-100 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---- How to Use ---- */}
      <section aria-label="How to Use This Calendar" className="px-6 lg:px-12 py-16 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-8">
              How to Use This Calendar
            </h2>
          </Animate>
          <Stagger stagger={100} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Navigate months", description: "Use the arrows to move between months. Each month starts fresh so you can plan ahead." },
              { title: "Click a day to add posts", description: "Select any day on the calendar to open the post form. Choose the platform, content type, time slot, and status." },
              { title: "Set weekly themes", description: "Enter a theme for each week to keep your content aligned with campaigns, holidays, or promotions." },
              { title: "Track with the sidebar", description: "The stats panel updates live as you add posts, showing breakdowns by platform, type, and status." },
              { title: "Switch to list view", description: "Toggle to list view for a sortable table of all posts. Click column headers to sort." },
              { title: "Export your plan", description: "Download your calendar as a .txt file to share with your team or import into other tools." },
            ].map((step, i) => (
              <div key={i} className="border border-neutral-200 p-6">
                <div className="flex items-start gap-4">
                  <span className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-neutral-300">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                      {step.title}
                    </h3>
                    <p className="text-base text-neutral-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Bottom CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need a Full Social Media Strategy?
            </h2>
            <p className="text-lg text-neutral-400 mt-4 mb-8">
              A calendar is a great start. Our team builds complete social media strategies
              with audience research, content production, scheduling, and performance reporting
              to grow your brand across every platform.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Work With Our Social Team &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Social Media Calendar Template"
        services={[
          { title: "Social Media Marketing", desc: "Strategy, content, and community management across all platforms.", href: "/services/social-media-marketing" },
          { title: "Content Marketing", desc: "Engaging content that builds brand authority and drives engagement.", href: "/services/content-marketing" },
          { title: "Digital Marketing", desc: "Integrated digital strategy connecting social to business results.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Social Content Rater", href: "/resources/social-content-rater" },
          { title: "Social Media Audit", href: "/resources/social-media-audit" },
          { title: "Social Media Bio Generator", href: "/resources/social-media-bio-generator" },
          { title: "Social Media Planner", href: "/resources/social-media-planner" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
