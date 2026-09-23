"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type MeetingTypeId =
  | "weekly-standup"
  | "monthly-review"
  | "quarterly-planning"
  | "client-kickoff"
  | "campaign-retro"
  | "content-planning"
  | "custom";

interface AgendaItem {
  id: string;
  topic: string;
  duration: number;
  owner: string;
  notes: string;
}

interface MeetingDetails {
  name: string;
  date: string;
  time: string;
  totalDuration: number;
  attendees: string;
  location: string;
}

interface SavedTemplate {
  id: string;
  name: string;
  items: AgendaItem[];
  details: MeetingDetails;
  savedAt: string;
}

/* ------------------------------------------------------------------ */
/*  Template definitions                                               */
/* ------------------------------------------------------------------ */

interface MeetingTemplate {
  id: MeetingTypeId;
  label: string;
  description: string;
  defaultDuration: number;
  items: Omit<AgendaItem, "id">[];
}

let nextId = 1;
function uid(): string {
  return `item-${nextId++}-${Date.now()}`;
}

const meetingTemplates: MeetingTemplate[] = [
  {
    id: "weekly-standup",
    label: "Weekly Marketing Standup",
    description: "15-minute sync on wins, blockers, and priorities",
    defaultDuration: 15,
    items: [
      { topic: "Wins and highlights from the past week", duration: 3, owner: "", notes: "" },
      { topic: "Current blockers and challenges", duration: 4, owner: "", notes: "" },
      { topic: "Priorities for the coming week", duration: 4, owner: "", notes: "" },
      { topic: "Metrics snapshot and quick KPI check", duration: 3, owner: "", notes: "" },
      { topic: "Open floor and quick questions", duration: 1, owner: "", notes: "" },
    ],
  },
  {
    id: "monthly-review",
    label: "Monthly Performance Review",
    description: "60-minute deep dive into KPIs, channels, and budget",
    defaultDuration: 60,
    items: [
      { topic: "KPI review: month-over-month performance", duration: 15, owner: "", notes: "" },
      { topic: "Channel-by-channel analysis", duration: 15, owner: "", notes: "" },
      { topic: "Budget review and spend vs. plan", duration: 10, owner: "", notes: "" },
      { topic: "Campaign highlights and learnings", duration: 10, owner: "", notes: "" },
      { topic: "Next month priorities and action items", duration: 10, owner: "", notes: "" },
    ],
  },
  {
    id: "quarterly-planning",
    label: "Quarterly Strategy Planning",
    description: "90-minute session for goals, competitive review, and OKRs",
    defaultDuration: 90,
    items: [
      { topic: "Previous quarter goals review and scorecard", duration: 15, owner: "", notes: "" },
      { topic: "Competitive landscape analysis", duration: 15, owner: "", notes: "" },
      { topic: "Market trends and opportunities", duration: 10, owner: "", notes: "" },
      { topic: "Strategy adjustments and pivots", duration: 15, owner: "", notes: "" },
      { topic: "Next quarter OKRs and key results", duration: 20, owner: "", notes: "" },
      { topic: "Resource allocation and team capacity", duration: 10, owner: "", notes: "" },
      { topic: "Wrap-up and action items", duration: 5, owner: "", notes: "" },
    ],
  },
  {
    id: "client-kickoff",
    label: "Client Kickoff",
    description: "45-minute meeting for introductions, goals, and scope",
    defaultDuration: 45,
    items: [
      { topic: "Team introductions and roles", duration: 5, owner: "", notes: "" },
      { topic: "Client goals and success criteria", duration: 10, owner: "", notes: "" },
      { topic: "Scope of work review", duration: 10, owner: "", notes: "" },
      { topic: "Timeline and milestones", duration: 8, owner: "", notes: "" },
      { topic: "Communication plan and cadence", duration: 5, owner: "", notes: "" },
      { topic: "Immediate next steps and action items", duration: 5, owner: "", notes: "" },
      { topic: "Questions and open discussion", duration: 2, owner: "", notes: "" },
    ],
  },
  {
    id: "campaign-retro",
    label: "Campaign Retrospective",
    description: "30-minute review of results, learnings, and next steps",
    defaultDuration: 30,
    items: [
      { topic: "Campaign results and performance data", duration: 8, owner: "", notes: "" },
      { topic: "What worked well", duration: 5, owner: "", notes: "" },
      { topic: "What did not work or underperformed", duration: 5, owner: "", notes: "" },
      { topic: "Key learnings and insights", duration: 5, owner: "", notes: "" },
      { topic: "Recommendations and next steps", duration: 5, owner: "", notes: "" },
      { topic: "Action items and owners", duration: 2, owner: "", notes: "" },
    ],
  },
  {
    id: "content-planning",
    label: "Content Planning",
    description: "45-minute session for content audit, brainstorm, and assignments",
    defaultDuration: 45,
    items: [
      { topic: "Content performance audit: what is resonating", duration: 8, owner: "", notes: "" },
      { topic: "Topic brainstorm and ideation", duration: 10, owner: "", notes: "" },
      { topic: "Editorial calendar review and updates", duration: 10, owner: "", notes: "" },
      { topic: "Content assignments and deadlines", duration: 8, owner: "", notes: "" },
      { topic: "Resource needs and production timeline", duration: 5, owner: "", notes: "" },
      { topic: "Wrap-up and next review date", duration: 4, owner: "", notes: "" },
    ],
  },
  {
    id: "custom",
    label: "Custom Meeting",
    description: "Start with a blank template and build your own agenda",
    defaultDuration: 30,
    items: [
      { topic: "Agenda item 1", duration: 10, owner: "", notes: "" },
      { topic: "Agenda item 2", duration: 10, owner: "", notes: "" },
      { topic: "Agenda item 3", duration: 10, owner: "", notes: "" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  LocalStorage helpers                                               */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "markit-meeting-agendas";

function loadSavedTemplates(): SavedTemplate[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistTemplates(templates: SavedTemplate[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  } catch {
    /* quota exceeded — fail silently */
  }
}

/* ------------------------------------------------------------------ */
/*  Export helpers                                                      */
/* ------------------------------------------------------------------ */

function formatAgendaText(details: MeetingDetails, items: AgendaItem[]): string {
  const lines: string[] = [];
  const divider = "=".repeat(56);
  const thinDivider = "-".repeat(56);

  lines.push(divider);
  lines.push(details.name || "Marketing Meeting Agenda");
  lines.push(divider);
  lines.push("");

  if (details.date) lines.push(`Date:       ${details.date}`);
  if (details.time) lines.push(`Time:       ${details.time}`);
  lines.push(`Duration:   ${details.totalDuration} minutes`);
  if (details.attendees) lines.push(`Attendees:  ${details.attendees}`);
  if (details.location) lines.push(`Location:   ${details.location}`);

  lines.push("");
  lines.push(thinDivider);
  lines.push("AGENDA");
  lines.push(thinDivider);
  lines.push("");

  const totalItemMinutes = items.reduce((s, i) => s + i.duration, 0);
  let runningTime = 0;

  items.forEach((item, idx) => {
    const startMin = runningTime;
    runningTime += item.duration;
    lines.push(`${idx + 1}. ${item.topic}`);
    lines.push(`   Time:     ${item.duration} min (${startMin}-${runningTime} min mark)`);
    if (item.owner) lines.push(`   Owner:    ${item.owner}`);
    if (item.notes) lines.push(`   Notes:    ${item.notes}`);
    lines.push("");
  });

  lines.push(thinDivider);
  lines.push(`Total agenda time: ${totalItemMinutes} minutes`);
  if (totalItemMinutes > details.totalDuration) {
    lines.push(`WARNING: Agenda exceeds meeting duration by ${totalItemMinutes - details.totalDuration} minutes`);
  }
  lines.push(thinDivider);
  lines.push("");
  lines.push("Generated with Markit Media Meeting Agenda Builder");
  lines.push("https://themarkitmedia.com/resources/meeting-agenda-builder");

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */



export default function MeetingAgendaBuilderPage() {
  /* ---- State ---- */
  const [selectedType, setSelectedType] = useState<MeetingTypeId | null>(null);
  const [items, setItems] = useState<AgendaItem[]>([]);
  const [details, setDetails] = useState<MeetingDetails>({
    name: "",
    date: "",
    time: "",
    totalDuration: 30,
    attendees: "",
    location: "",
  });
  const [savedTemplates, setSavedTemplates] = useState<SavedTemplate[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [showSaved, setShowSaved] = useState(false);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  /* Load saved templates on mount */
  useEffect(() => {
    setSavedTemplates(loadSavedTemplates());
  }, []);

  /* ---- Select a meeting template ---- */
  const selectTemplate = useCallback((typeId: MeetingTypeId) => {
    const template = meetingTemplates.find((t) => t.id === typeId);
    if (!template) return;
    setSelectedType(typeId);
    setItems(template.items.map((item) => ({ ...item, id: uid() })));
    setDetails((prev) => ({
      ...prev,
      name: template.label,
      totalDuration: template.defaultDuration,
    }));
    setEditingItemId(null);
  }, []);

  /* ---- Load a saved template ---- */
  const loadSaved = useCallback((saved: SavedTemplate) => {
    setItems(saved.items.map((item) => ({ ...item, id: uid() })));
    setDetails(saved.details);
    setSelectedType("custom");
    setShowSaved(false);
    setEditingItemId(null);
  }, []);

  /* ---- Delete a saved template ---- */
  const deleteSaved = useCallback(
    (id: string) => {
      const updated = savedTemplates.filter((t) => t.id !== id);
      setSavedTemplates(updated);
      persistTemplates(updated);
    },
    [savedTemplates],
  );

  /* ---- Item CRUD ---- */
  const updateItem = useCallback((id: string, field: keyof AgendaItem, value: string | number) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  }, []);

  const addItem = useCallback(() => {
    setItems((prev) => [
      ...prev,
      { id: uid(), topic: "New agenda item", duration: 5, owner: "", notes: "" },
    ]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setEditingItemId(null);
  }, []);

  const moveItem = useCallback((fromIndex: number, toIndex: number) => {
    setItems((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  }, []);

  /* ---- Drag and drop ---- */
  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
      moveItem(dragItem.current, dragOverItem.current);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  /* ---- Totals ---- */
  const totalItemMinutes = items.reduce((sum, item) => sum + item.duration, 0);
  const isOverTime = totalItemMinutes > details.totalDuration;

  /* ---- Export ---- */
  const exportTxt = useCallback(() => {
    const text = formatAgendaText(details, items);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(details.name || "meeting-agenda").replace(/\s+/g, "-").toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [details, items]);

  const copyToClipboard = useCallback(async () => {
    const text = formatAgendaText(details, items);
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      /* Fallback */
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  }, [details, items]);

  /* ---- Save ---- */
  const saveTemplate = useCallback(() => {
    const newSaved: SavedTemplate = {
      id: uid(),
      name: details.name || "Untitled Agenda",
      items: [...items],
      details: { ...details },
      savedAt: new Date().toLocaleDateString(),
    };
    const updated = [newSaved, ...savedTemplates];
    setSavedTemplates(updated);
    persistTemplates(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  }, [details, items, savedTemplates]);

  /* ---- Render ---- */
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Meeting Agenda Builder",
          description: "15-minute sync on wins, blockers, and priorities",
          url: "https://themarkitmedia.com/en/resources/meeting-agenda-builder",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Marketing Meeting Agenda Builder | Free Marketing Tool — Markit Media</title>
      <meta name="description" content="15-minute sync on wins, blockers, and priorities" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Meeting Agenda Builder",
          description:
            "Build structured marketing meeting agendas from professional templates. Weekly standups, monthly reviews, quarterly planning, and client calls.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Meeting Agenda Builder" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing Meeting Agenda Builder
            </h1>
            <SectionDesc>
              Choose a meeting template, customize the agenda items, and export a professional
              agenda in seconds. No signup required.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Step 1: Choose Meeting Type ---- */}
      <section aria-label="1. Choose a meeting type" className="px-6 lg:px-12 pb-10">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
              1. Choose a meeting type
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {meetingTemplates.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => selectTemplate(tmpl.id)}
                  className={`text-left px-5 py-4 min-h-[44px] transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    selectedType === tmpl.id
                      ? "bg-black text-white"
                      : "border border-neutral-200 text-neutral-600 hover:border-black"
                  }`}
                >
                  <span className="block text-base font-bold">{tmpl.label}</span>
                  <span className={`block text-base mt-1 ${selectedType === tmpl.id ? "text-neutral-300" : "text-neutral-500"}`}>
                    {tmpl.description}
                  </span>
                </button>
              ))}
            </div>
          </Animate>

          {/* Saved templates toggle */}
          {savedTemplates.length > 0 && (
            <div className="mt-6">
              <button
                onClick={() => setShowSaved(!showSaved)}
                className="text-base font-bold text-black underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
              >
                {showSaved ? "Hide saved agendas" : `Load a saved agenda (${savedTemplates.length})`}
              </button>

              {showSaved && (
                <div className="mt-4 border border-neutral-200 divide-y divide-neutral-100">
                  {savedTemplates.map((saved) => (
                    <div key={saved.id} className="flex items-center justify-between px-5 py-4">
                      <button
                        onClick={() => loadSaved(saved)}
                        className="text-left flex-1 min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                      >
                        <span className="block text-base font-bold text-black">{saved.name}</span>
                        <span className="block text-base text-neutral-500">
                          {saved.items.length} items &middot; Saved {saved.savedAt}
                        </span>
                      </button>
                      <button
                        onClick={() => deleteSaved(saved.id)}
                        aria-label={`Delete saved agenda: ${saved.name}`}
                        className="ml-4 px-3 py-2 text-base font-bold text-neutral-500 hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ---- Step 2: Meeting Details ---- */}
      {selectedType && (
        <section aria-label="2. Meeting details" className="px-6 lg:px-12 pb-10">
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                2. Meeting details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="meeting-name" className="block text-base font-bold text-black mb-1">
                    Meeting name
                  </label>
                  <input
                    id="meeting-name"
                    type="text"
                    value={details.name}
                    onChange={(e) => setDetails({ ...details, name: e.target.value })}
                    className="w-full border border-neutral-200 px-4 py-3 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-0 min-h-[44px]"
                    placeholder="e.g. Weekly Marketing Standup"
                  />
                </div>
                <div>
                  <label htmlFor="meeting-date" className="block text-base font-bold text-black mb-1">
                    Date
                  </label>
                  <input
                    id="meeting-date"
                    type="date"
                    value={details.date}
                    onChange={(e) => setDetails({ ...details, date: e.target.value })}
                    className="w-full border border-neutral-200 px-4 py-3 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-0 min-h-[44px]"
                  />
                </div>
                <div>
                  <label htmlFor="meeting-time" className="block text-base font-bold text-black mb-1">
                    Time
                  </label>
                  <input
                    id="meeting-time"
                    type="time"
                    value={details.time}
                    onChange={(e) => setDetails({ ...details, time: e.target.value })}
                    className="w-full border border-neutral-200 px-4 py-3 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-0 min-h-[44px]"
                  />
                </div>
                <div>
                  <label htmlFor="meeting-duration" className="block text-base font-bold text-black mb-1">
                    Meeting duration (minutes)
                  </label>
                  <input
                    id="meeting-duration"
                    type="number"
                    min={5}
                    max={480}
                    value={details.totalDuration}
                    onChange={(e) => setDetails({ ...details, totalDuration: Math.max(1, parseInt(e.target.value) || 0) })}
                    className="w-full border border-neutral-200 px-4 py-3 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-0 min-h-[44px]"
                  />
                </div>
                <div>
                  <label htmlFor="meeting-attendees" className="block text-base font-bold text-black mb-1">
                    Attendees (comma-separated)
                  </label>
                  <input
                    id="meeting-attendees"
                    type="text"
                    value={details.attendees}
                    onChange={(e) => setDetails({ ...details, attendees: e.target.value })}
                    className="w-full border border-neutral-200 px-4 py-3 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-0 min-h-[44px]"
                    placeholder="e.g. Sarah, Mike, Jordan"
                  />
                </div>
                <div>
                  <label htmlFor="meeting-location" className="block text-base font-bold text-black mb-1">
                    Location or meeting link
                  </label>
                  <input
                    id="meeting-location"
                    type="text"
                    value={details.location}
                    onChange={(e) => setDetails({ ...details, location: e.target.value })}
                    className="w-full border border-neutral-200 px-4 py-3 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-0 min-h-[44px]"
                    placeholder="e.g. Conference Room A or Zoom link"
                  />
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Step 3: Agenda Items ---- */}
      {selectedType && (
        <section aria-label="3. Agenda items" className="px-6 lg:px-12 pb-10">
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-up">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                  3. Agenda items
                </h2>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-base font-bold ${isOverTime ? "text-black" : "text-neutral-600"}`}
                    role="status"
                    aria-live="polite"
                  >
                    {totalItemMinutes} / {details.totalDuration} min
                    {isOverTime && " (over by " + (totalItemMinutes - details.totalDuration) + " min)"}
                  </span>
                </div>
              </div>

              {/* Time warning bar */}
              <div className="w-full h-2 bg-neutral-100 mb-6" role="progressbar" aria-valuenow={totalItemMinutes} aria-valuemin={0} aria-valuemax={details.totalDuration} aria-label="Agenda time used">
                <div
                  className={`h-full transition-all motion-reduce:transition-none ${isOverTime ? "bg-black" : "bg-neutral-400"}`}
                  style={{ width: `${Math.min((totalItemMinutes / details.totalDuration) * 100, 100)}%` }}
                />
              </div>
              {isOverTime && (
                <p className="text-base font-bold text-black mb-4 border border-black px-4 py-3">
                  Your agenda is {totalItemMinutes - details.totalDuration} minutes over the scheduled meeting duration.
                  Consider shortening items or extending the meeting.
                </p>
              )}

              {/* Item list */}
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragEnter={() => handleDragEnter(index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                    className="border border-neutral-200 bg-white transition-colors motion-reduce:transition-none hover:border-neutral-400"
                  >
                    {/* Collapsed row */}
                    <div className="flex items-center gap-3 px-4 py-3">
                      {/* Drag handle */}
                      <span
                        className="cursor-grab text-neutral-400 hover:text-black select-none text-base"
                        aria-hidden="true"
                        title="Drag to reorder"
                      >
                        &#x2630;
                      </span>

                      {/* Item number */}
                      <span className="text-base font-bold text-neutral-400 w-6 text-center shrink-0">
                        {index + 1}
                      </span>

                      {/* Topic */}
                      <button
                        onClick={() => setEditingItemId(editingItemId === item.id ? null : item.id)}
                        className="flex-1 text-left text-base font-bold text-black min-h-[44px] flex items-center focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                        aria-expanded={editingItemId === item.id}
                        aria-controls={`edit-${item.id}`}
                      >
                        {item.topic}
                      </button>

                      {/* Duration badge */}
                      <span className="text-base font-bold text-neutral-600 whitespace-nowrap">
                        {item.duration} min
                      </span>

                      {/* Move up */}
                      <button
                        onClick={() => index > 0 && moveItem(index, index - 1)}
                        disabled={index === 0}
                        aria-label={`Move "${item.topic}" up`}
                        className="px-2 py-1 text-base text-neutral-400 hover:text-black disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        &#x25B2;
                      </button>

                      {/* Move down */}
                      <button
                        onClick={() => index < items.length - 1 && moveItem(index, index + 1)}
                        disabled={index === items.length - 1}
                        aria-label={`Move "${item.topic}" down`}
                        className="px-2 py-1 text-base text-neutral-400 hover:text-black disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        &#x25BC;
                      </button>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove "${item.topic}"`}
                        className="px-2 py-1 text-base font-bold text-neutral-400 hover:text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        &times;
                      </button>
                    </div>

                    {/* Expanded edit form */}
                    {editingItemId === item.id && (
                      <div id={`edit-${item.id}`} className="border-t border-neutral-100 px-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label htmlFor={`topic-${item.id}`} className="block text-base font-bold text-black mb-1">
                              Topic
                            </label>
                            <input
                              id={`topic-${item.id}`}
                              type="text"
                              value={item.topic}
                              onChange={(e) => updateItem(item.id, "topic", e.target.value)}
                              className="w-full border border-neutral-200 px-4 py-3 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-0 min-h-[44px]"
                            />
                          </div>
                          <div>
                            <label htmlFor={`duration-${item.id}`} className="block text-base font-bold text-black mb-1">
                              Duration (minutes)
                            </label>
                            <input
                              id={`duration-${item.id}`}
                              type="number"
                              min={1}
                              max={240}
                              value={item.duration}
                              onChange={(e) => updateItem(item.id, "duration", Math.max(1, parseInt(e.target.value) || 0))}
                              className="w-full border border-neutral-200 px-4 py-3 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-0 min-h-[44px]"
                            />
                          </div>
                          <div>
                            <label htmlFor={`owner-${item.id}`} className="block text-base font-bold text-black mb-1">
                              Owner / Presenter
                            </label>
                            <input
                              id={`owner-${item.id}`}
                              type="text"
                              value={item.owner}
                              onChange={(e) => updateItem(item.id, "owner", e.target.value)}
                              className="w-full border border-neutral-200 px-4 py-3 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-0 min-h-[44px]"
                              placeholder="e.g. Sarah"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label htmlFor={`notes-${item.id}`} className="block text-base font-bold text-black mb-1">
                              Notes
                            </label>
                            <textarea
                              id={`notes-${item.id}`}
                              value={item.notes}
                              onChange={(e) => updateItem(item.id, "notes", e.target.value)}
                              rows={2}
                              className="w-full border border-neutral-200 px-4 py-3 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-0 min-h-[44px] resize-y"
                              placeholder="Any prep notes or talking points"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => setEditingItemId(null)}
                          className="mt-3 px-5 py-2 text-base font-bold text-neutral-600 hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
                        >
                          Done editing
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add item button */}
              <button
                onClick={addItem}
                className="mt-4 w-full border-2 border-dashed border-neutral-300 px-5 py-4 text-base font-bold text-neutral-500 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
              >
                + Add agenda item
              </button>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Step 4: Export and Save ---- */}
      {selectedType && items.length > 0 && (
        <section aria-label="4. Export your agenda" className="px-6 lg:px-12 pb-10">
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                4. Export your agenda
              </h2>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={exportTxt}
                  className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-bold text-base hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
                >
                  Download .txt
                </button>
                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center gap-2 border border-black text-black px-8 py-4 font-bold text-base hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
                >
                  {copySuccess ? "Copied" : "Copy to clipboard"}
                </button>
                <button
                  onClick={saveTemplate}
                  className="inline-flex items-center gap-2 border border-neutral-300 text-neutral-600 px-8 py-4 font-bold text-base hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
                >
                  {saveSuccess ? "Saved" : "Save for later"}
                </button>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Preview ---- */}
      {selectedType && items.length > 0 && (
        <section aria-label="Agenda preview" className="px-6 lg:px-12 pb-20">
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                Agenda preview
              </h2>
              <div className="border border-neutral-200 bg-neutral-50 p-6 md:p-8">
                <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.75rem)] font-extrabold text-black mb-4">
                  {details.name || "Meeting Agenda"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 mb-6 text-base text-neutral-600">
                  {details.date && <p><span className="font-bold text-black">Date:</span> {details.date}</p>}
                  {details.time && <p><span className="font-bold text-black">Time:</span> {details.time}</p>}
                  <p><span className="font-bold text-black">Duration:</span> {details.totalDuration} min</p>
                  {details.attendees && <p><span className="font-bold text-black">Attendees:</span> {details.attendees}</p>}
                  {details.location && <p><span className="font-bold text-black">Location:</span> {details.location}</p>}
                </div>

                <div className="border-t border-neutral-200 pt-4">
                  {(() => {
                    let runningTime = 0;
                    return items.map((item, idx) => {
                      const start = runningTime;
                      runningTime += item.duration;
                      return (
                        <div key={item.id} className={`py-3 ${idx < items.length - 1 ? "border-b border-neutral-100" : ""}`}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <p className="text-base font-bold text-black">
                                {idx + 1}. {item.topic}
                              </p>
                              {item.owner && (
                                <p className="text-base text-neutral-600 mt-1">
                                  Owner: {item.owner}
                                </p>
                              )}
                              {item.notes && (
                                <p className="text-base text-neutral-500 mt-1">
                                  {item.notes}
                                </p>
                              )}
                            </div>
                            <span className="text-base font-bold text-neutral-500 whitespace-nowrap shrink-0">
                              {item.duration} min ({start}&ndash;{runningTime})
                            </span>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>

                <div className={`border-t border-neutral-200 pt-4 mt-2 text-base font-bold ${isOverTime ? "text-black" : "text-neutral-600"}`}>
                  Total: {totalItemMinutes} / {details.totalDuration} min
                  {isOverTime && ` (${totalItemMinutes - details.totalDuration} min over)`}
                </div>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Educational Section ---- */}
      <section aria-label="Meeting Best Practices" className="px-6 lg:px-12 py-20 bg-neutral-50">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Meeting Best Practices</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3 mb-6">
              Run Better Marketing Meetings
            </h2>
          </Animate>

          <Stagger stagger={100} animation="fade-up" className="space-y-8">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                Always send the agenda in advance
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed">
                Share the agenda at least 24 hours before the meeting so attendees can prepare
                talking points, gather data, and come ready to contribute. Meetings with
                pre-distributed agendas are 30% more productive according to Harvard Business Review research.
              </p>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                Assign owners to every item
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed">
                Each agenda item should have a designated presenter or discussion leader. This
                prevents one person from dominating the meeting and ensures preparation is
                distributed across the team. Ownership also creates accountability for follow-through.
              </p>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                Use time boxes to stay on track
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed">
                Allocate specific time limits to each agenda item and stick to them. If a topic
                needs more discussion than its time box allows, note it as a follow-up item rather
                than derailing the rest of the agenda. A visible timer helps everyone stay disciplined.
              </p>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                End with clear action items
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed">
                Reserve the last few minutes of every meeting to recap decisions made and assign
                action items with owners and deadlines. Send these as follow-up notes within an hour
                of the meeting ending. The fastest way to kill meeting momentum is to leave without
                documented next steps.
              </p>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                Keep standups short and focused
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed">
                Weekly standups should stay under 15 minutes. Use a consistent format like wins,
                blockers, and priorities to keep the conversation structured. Save deep dives and
                problem-solving for separate, focused sessions with only the relevant people.
              </p>
            </div>

            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                Audit your meeting cadence quarterly
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed">
                Every quarter, review which recurring meetings are actually valuable. Cancel or
                merge meetings that have become redundant. The average marketing team spends over
                15 hours per week in meetings. Reclaiming even 3 of those hours significantly
                increases the time available for actual execution.
              </p>
            </div>
          </Stagger>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Running Your Marketing?
            </h2>
            <p className="text-lg text-neutral-400 mt-4 mb-8">
              From strategy sessions to execution, our team handles the full marketing stack
              so you can focus on growing your business.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
            >
              Get Marketing Help &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Meeting Agenda Builder"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Marketing Trends 2025", href: "/resources/marketing-trends-2025" },
          { title: "Marketing Trends 2026", href: "/resources/marketing-trends-2026" },
          { title: "Martech Stack Planner", href: "/resources/martech-stack-planner" },
          { title: "Meta Description Generator", href: "/resources/meta-description-generator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
