"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Animate } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type QuestionType = "rating-5" | "rating-10" | "multiple-choice" | "yes-no" | "open-text" | "nps";

interface SurveyQuestion {
  id: string;
  type: QuestionType;
  text: string;
  required: boolean;
  options?: string[]; // for multiple-choice
  sectionHeader?: string; // optional group header above this question
}

interface SurveyTemplate {
  id: string;
  name: string;
  description: string;
  questions: SurveyQuestion[];
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  "rating-5": "Rating (1–5)",
  "rating-10": "Rating (1–10)",
  "multiple-choice": "Multiple Choice",
  "yes-no": "Yes / No",
  "open-text": "Open Text",
  nps: "NPS (0–10)",
};

function estimateMinutes(questions: SurveyQuestion[]): number {
  let seconds = 0;
  for (const q of questions) {
    switch (q.type) {
      case "rating-5":
      case "rating-10":
      case "nps":
        seconds += 15;
        break;
      case "yes-no":
        seconds += 10;
        break;
      case "multiple-choice":
        seconds += 20;
        break;
      case "open-text":
        seconds += 45;
        break;
    }
  }
  return Math.max(1, Math.ceil(seconds / 60));
}

/* ------------------------------------------------------------------ */
/*  Templates                                                          */
/* ------------------------------------------------------------------ */

const TEMPLATES: SurveyTemplate[] = [
  {
    id: "nps",
    name: "Net Promoter Score (NPS)",
    description: "The gold-standard loyalty metric. One scored question plus a follow-up.",
    questions: [
      { id: uid(), type: "nps", text: "How likely are you to recommend us to a friend or colleague?", required: true, sectionHeader: "Loyalty" },
      { id: uid(), type: "open-text", text: "What is the primary reason for your score?", required: false },
      { id: uid(), type: "open-text", text: "What could we do to improve your experience?", required: false },
    ],
  },
  {
    id: "csat",
    name: "Customer Satisfaction (CSAT)",
    description: "Measure satisfaction on a 1–5 scale with room for open feedback.",
    questions: [
      { id: uid(), type: "rating-5", text: "How satisfied are you with your overall experience?", required: true, sectionHeader: "Satisfaction" },
      { id: uid(), type: "rating-5", text: "How satisfied are you with the quality of our product/service?", required: true },
      { id: uid(), type: "rating-5", text: "How satisfied are you with the value for money?", required: false },
      { id: uid(), type: "open-text", text: "Is there anything else you would like to share?", required: false },
    ],
  },
  {
    id: "ces",
    name: "Customer Effort Score (CES)",
    description: "Gauge how easy it is for customers to accomplish their goals.",
    questions: [
      { id: uid(), type: "rating-5", text: "How easy was it to get the help you needed today?", required: true, sectionHeader: "Effort" },
      { id: uid(), type: "multiple-choice", text: "What were you trying to accomplish?", required: true, options: ["Make a purchase", "Get support", "Find information", "Return/exchange", "Other"] },
      { id: uid(), type: "rating-5", text: "How easy was it to navigate our website/app?", required: false },
      { id: uid(), type: "open-text", text: "What would have made the process easier?", required: false },
    ],
  },
  {
    id: "post-purchase",
    name: "Post-Purchase Survey",
    description: "Collect insights on product quality, delivery, and support after a purchase.",
    questions: [
      { id: uid(), type: "rating-5", text: "How would you rate the quality of the product/service you received?", required: true, sectionHeader: "Product Quality" },
      { id: uid(), type: "rating-5", text: "How would you rate the ordering process?", required: true },
      { id: uid(), type: "rating-5", text: "How satisfied are you with the delivery/fulfillment time?", required: true, sectionHeader: "Delivery" },
      { id: uid(), type: "yes-no", text: "Did the product/service meet your expectations?", required: true },
      { id: uid(), type: "rating-5", text: "If you contacted support, how would you rate the experience?", required: false, sectionHeader: "Support" },
      { id: uid(), type: "open-text", text: "Any additional comments or suggestions?", required: false },
    ],
  },
  {
    id: "website-feedback",
    name: "Website Feedback",
    description: "Understand how visitors perceive usability, content, and navigation.",
    questions: [
      { id: uid(), type: "rating-5", text: "How easy was it to find what you were looking for?", required: true, sectionHeader: "Navigation" },
      { id: uid(), type: "rating-5", text: "How would you rate the overall design and layout?", required: true },
      { id: uid(), type: "multiple-choice", text: "What best describes the purpose of your visit?", required: true, options: ["Research a product/service", "Make a purchase", "Get support", "Read content/blog", "Other"], sectionHeader: "Context" },
      { id: uid(), type: "rating-5", text: "How useful was the content on the pages you visited?", required: false, sectionHeader: "Content" },
      { id: uid(), type: "yes-no", text: "Were you able to complete your intended task?", required: true },
      { id: uid(), type: "open-text", text: "What improvements would you suggest for our website?", required: false },
    ],
  },
  {
    id: "service-review",
    name: "Service Review",
    description: "Evaluate team communication, quality of work, and perceived value.",
    questions: [
      { id: uid(), type: "rating-5", text: "How would you rate the communication from our team?", required: true, sectionHeader: "Communication" },
      { id: uid(), type: "rating-5", text: "How responsive was our team to your questions?", required: true },
      { id: uid(), type: "rating-5", text: "How would you rate the quality of work delivered?", required: true, sectionHeader: "Quality" },
      { id: uid(), type: "rating-5", text: "How would you rate the value for money?", required: true, sectionHeader: "Value" },
      { id: uid(), type: "yes-no", text: "Would you use our services again?", required: true },
      { id: uid(), type: "nps", text: "How likely are you to recommend our services to others?", required: true },
      { id: uid(), type: "open-text", text: "What did we do well, and where can we improve?", required: false },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Saved-template helpers (localStorage)                              */
/* ------------------------------------------------------------------ */

const LS_KEY = "markit_survey_templates";

function loadSavedTemplates(): SurveyTemplate[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as SurveyTemplate[]) : [];
  } catch {
    return [];
  }
}

function persistTemplates(templates: SurveyTemplate[]): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(templates));
  } catch {
    /* quota exceeded — silently fail */
  }
}

/* ------------------------------------------------------------------ */
/*  Export helper                                                       */
/* ------------------------------------------------------------------ */

function exportAsTxt(name: string, questions: SurveyQuestion[]): void {
  const lines: string[] = [];
  lines.push(`Survey: ${name}`);
  lines.push(`Questions: ${questions.length}`);
  lines.push(`Estimated completion: ~${estimateMinutes(questions)} min`);
  lines.push("=".repeat(50));
  lines.push("");

  let qNum = 1;
  for (const q of questions) {
    if (q.sectionHeader) {
      lines.push(`--- ${q.sectionHeader} ---`);
      lines.push("");
    }
    const req = q.required ? " *" : "";
    lines.push(`Q${qNum}. ${q.text}${req}`);
    lines.push(`   Type: ${QUESTION_TYPE_LABELS[q.type]}`);
    if (q.type === "nps") {
      lines.push("   Scale: 0 (Not at all likely) — 10 (Extremely likely)");
    } else if (q.type === "rating-5") {
      lines.push("   Scale: 1 (Very poor) — 5 (Excellent)");
    } else if (q.type === "rating-10") {
      lines.push("   Scale: 1 (Lowest) — 10 (Highest)");
    } else if (q.type === "yes-no") {
      lines.push("   Options: Yes / No");
    } else if (q.type === "multiple-choice" && q.options) {
      q.options.forEach((o, i) => lines.push(`   ${String.fromCharCode(65 + i)}. ${o}`));
    } else if (q.type === "open-text") {
      lines.push("   [Open text response]");
    }
    lines.push("");
    qNum++;
  }
  lines.push("=".repeat(50));
  lines.push("* = Required question");

  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-survey.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

/* ---------- Template card ---------- */

function TemplateCard({
  template,
  onSelect,
  active,
}: {
  template: SurveyTemplate;
  onSelect: () => void;
  active: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`w-full text-left border p-6 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
        active ? "border-black bg-black text-white" : "border-neutral-300 bg-white text-black hover:border-black"
      }`}
    >
      <span className="block font-[family-name:var(--font-display)] text-lg font-extrabold">{template.name}</span>
      <span className={`block text-base mt-2 leading-relaxed ${active ? "text-neutral-300" : "text-neutral-500"}`}>
        {template.description}
      </span>
      <span className={`block text-base mt-3 font-bold ${active ? "text-neutral-400" : "text-neutral-400"}`}>
        {template.questions.length} questions &middot; ~{estimateMinutes(template.questions)} min
      </span>
    </button>
  );
}

/* ---------- Question editor row ---------- */

function QuestionRow({
  question,
  index,
  total,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  question: SurveyQuestion;
  index: number;
  total: number;
  onChange: (updated: SurveyQuestion) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  return (
    <div className="border border-neutral-200 bg-white p-6 space-y-4">
      {/* Section header (optional) */}
      <div>
        <label htmlFor={`sh-${question.id}`} className="block text-base font-bold text-black mb-1">
          Section Header <span className="font-normal text-neutral-400">(optional)</span>
        </label>
        <input
          id={`sh-${question.id}`}
          type="text"
          value={question.sectionHeader || ""}
          onChange={(e) => onChange({ ...question, sectionHeader: e.target.value || undefined })}
          placeholder="e.g. Communication"
          className="w-full border border-neutral-300 px-4 py-3 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 motion-reduce:transition-none min-h-[44px]"
        />
      </div>

      {/* Question text */}
      <div>
        <label htmlFor={`qt-${question.id}`} className="block text-base font-bold text-black mb-1">
          Question {index + 1}
        </label>
        <input
          id={`qt-${question.id}`}
          type="text"
          value={question.text}
          onChange={(e) => onChange({ ...question, text: e.target.value })}
          placeholder="Enter your question"
          className="w-full border border-neutral-300 px-4 py-3 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 motion-reduce:transition-none min-h-[44px]"
        />
      </div>

      {/* Type + Required row */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[180px]">
          <label htmlFor={`type-${question.id}`} className="block text-base font-bold text-black mb-1">
            Type
          </label>
          <select
            id={`type-${question.id}`}
            value={question.type}
            onChange={(e) => {
              const newType = e.target.value as QuestionType;
              const updated: SurveyQuestion = { ...question, type: newType };
              if (newType === "multiple-choice" && !updated.options?.length) {
                updated.options = ["Option 1", "Option 2", "Option 3"];
              }
              if (newType !== "multiple-choice") {
                updated.options = undefined;
              }
              onChange(updated);
            }}
            className="w-full border border-neutral-300 px-4 py-3 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 motion-reduce:transition-none min-h-[44px]"
          >
            {(Object.keys(QUESTION_TYPE_LABELS) as QuestionType[]).map((t) => (
              <option key={t} value={t}>
                {QUESTION_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2 text-base font-bold text-black cursor-pointer select-none min-h-[44px]">
          <input
            type="checkbox"
            checked={question.required}
            onChange={(e) => onChange({ ...question, required: e.target.checked })}
            className="w-5 h-5 accent-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
          />
          Required
        </label>
      </div>

      {/* Multiple-choice options editor */}
      {question.type === "multiple-choice" && (
        <div className="space-y-2">
          <span className="block text-base font-bold text-black">Options</span>
          {(question.options || []).map((opt, oi) => (
            <div key={oi} className="flex gap-2 items-center">
              <label htmlFor={`opt-${question.id}-${oi}`} className="sr-only">
                Option {oi + 1}
              </label>
              <input
                id={`opt-${question.id}-${oi}`}
                type="text"
                value={opt}
                onChange={(e) => {
                  const newOpts = [...(question.options || [])];
                  newOpts[oi] = e.target.value;
                  onChange({ ...question, options: newOpts });
                }}
                className="flex-1 border border-neutral-300 px-4 py-2 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 motion-reduce:transition-none min-h-[44px]"
              />
              <button
                type="button"
                onClick={() => {
                  const newOpts = (question.options || []).filter((_, i) => i !== oi);
                  onChange({ ...question, options: newOpts });
                }}
                aria-label={`Remove option ${oi + 1}`}
                className="border border-neutral-300 px-3 py-2 text-base text-black hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px] min-w-[44px]"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange({ ...question, options: [...(question.options || []), `Option ${(question.options?.length || 0) + 1}`] })}
            className="border border-neutral-300 px-4 py-2 text-base text-black hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
          >
            + Add Option
          </button>
        </div>
      )}

      {/* Row actions */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-100">
        <button
          type="button"
          onClick={onMoveUp}
          disabled={index === 0}
          aria-label="Move question up"
          className="border border-neutral-300 px-4 py-2 text-base text-black hover:border-black transition-colors motion-reduce:transition-none disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
        >
          Move Up
        </button>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={index === total - 1}
          aria-label="Move question down"
          className="border border-neutral-300 px-4 py-2 text-base text-black hover:border-black transition-colors motion-reduce:transition-none disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
        >
          Move Down
        </button>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove question ${index + 1}`}
          className="ml-auto border border-neutral-300 px-4 py-2 text-base text-black hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
        >
          Remove Question
        </button>
      </div>
    </div>
  );
}

/* ---------- Survey preview ---------- */

function SurveyPreview({ name, questions }: { name: string; questions: SurveyQuestion[] }) {
  return (
    <div className="border border-neutral-200 bg-neutral-50 p-8 space-y-8">
      <div>
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">{name}</h3>
        <p className="text-base text-neutral-500 mt-1">
          {questions.length} question{questions.length !== 1 ? "s" : ""} &middot; ~{estimateMinutes(questions)} min to complete
        </p>
      </div>

      {questions.map((q, i) => (
        <div key={q.id}>
          {q.sectionHeader && (
            <div className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4 mt-2 pb-2 border-b border-neutral-300">
              {q.sectionHeader}
            </div>
          )}
          <fieldset className="space-y-3">
            <legend className="text-base font-bold text-black">
              {i + 1}. {q.text}
              {q.required && <span className="text-neutral-500 ml-1">*</span>}
            </legend>

            {q.type === "nps" && (
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={`Rating for question ${i + 1}`}>
                {Array.from({ length: 11 }, (_, n) => (
                  <span
                    key={n}
                    className="w-10 h-10 flex items-center justify-center border border-neutral-300 text-base text-black bg-white"
                    aria-label={String(n)}
                  >
                    {n}
                  </span>
                ))}
                <div className="w-full flex justify-between text-base text-neutral-400 mt-1">
                  <span>Not at all likely</span>
                  <span>Extremely likely</span>
                </div>
              </div>
            )}

            {q.type === "rating-5" && (
              <div className="flex gap-2" role="radiogroup" aria-label={`Rating for question ${i + 1}`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className="w-10 h-10 flex items-center justify-center border border-neutral-300 text-base text-black bg-white"
                    aria-label={String(n)}
                  >
                    {n}
                  </span>
                ))}
              </div>
            )}

            {q.type === "rating-10" && (
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={`Rating for question ${i + 1}`}>
                {Array.from({ length: 10 }, (_, n) => (
                  <span
                    key={n + 1}
                    className="w-10 h-10 flex items-center justify-center border border-neutral-300 text-base text-black bg-white"
                    aria-label={String(n + 1)}
                  >
                    {n + 1}
                  </span>
                ))}
              </div>
            )}

            {q.type === "yes-no" && (
              <div className="flex gap-4" role="radiogroup" aria-label={`Response for question ${i + 1}`}>
                <span className="border border-neutral-300 px-6 py-2 text-base text-black bg-white">Yes</span>
                <span className="border border-neutral-300 px-6 py-2 text-base text-black bg-white">No</span>
              </div>
            )}

            {q.type === "multiple-choice" && q.options && (
              <div className="space-y-2" role="radiogroup" aria-label={`Options for question ${i + 1}`}>
                {q.options.map((opt, oi) => (
                  <div key={oi} className="flex items-center gap-3">
                    <span className="w-5 h-5 border border-neutral-400 rounded-full shrink-0" aria-hidden="true" />
                    <span className="text-base text-black">{opt}</span>
                  </div>
                ))}
              </div>
            )}

            {q.type === "open-text" && (
              <div className="border border-neutral-300 bg-white px-4 py-3 min-h-[80px] text-base text-neutral-400">
                Type your response here...
              </div>
            )}
          </fieldset>
        </div>
      ))}

      {questions.length === 0 && (
        <p className="text-base text-neutral-400 text-center py-8">No questions added yet.</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page component                                                */
/* ------------------------------------------------------------------ */

export default function CustomerFeedbackSurveyPage() {
  /* --- State --- */
  const [activeTemplateId, setActiveTemplateId] = useState<string | null>(null);
  const [surveyName, setSurveyName] = useState("My Customer Survey");
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [savedTemplates, setSavedTemplates] = useState<SurveyTemplate[]>([]);
  const [saveMsg, setSaveMsg] = useState("");

  /* Load saved templates on mount */
  useEffect(() => {
    setSavedTemplates(loadSavedTemplates());
  }, []);

  /* --- Template selection --- */
  const handleSelectTemplate = useCallback((tpl: SurveyTemplate) => {
    setActiveTemplateId(tpl.id);
    setSurveyName(tpl.name);
    // Deep-clone questions with fresh ids so edits don't mutate the template
    setQuestions(tpl.questions.map((q) => ({ ...q, id: uid(), options: q.options ? [...q.options] : undefined })));
    setMode("edit");
  }, []);

  /* --- Question CRUD --- */
  const handleQuestionChange = useCallback((idx: number, updated: SurveyQuestion) => {
    setQuestions((prev) => prev.map((q, i) => (i === idx ? updated : q)));
  }, []);

  const handleRemoveQuestion = useCallback((idx: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const handleMoveUp = useCallback((idx: number) => {
    if (idx === 0) return;
    setQuestions((prev) => {
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  }, []);

  const handleMoveDown = useCallback((idx: number) => {
    setQuestions((prev) => {
      if (idx >= prev.length - 1) return prev;
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
  }, []);

  const handleAddQuestion = useCallback(() => {
    setQuestions((prev) => [
      ...prev,
      { id: uid(), type: "rating-5", text: "", required: false },
    ]);
  }, []);

  /* --- Save / delete custom template --- */
  const handleSave = useCallback(() => {
    if (!surveyName.trim() || questions.length === 0) return;
    const tpl: SurveyTemplate = {
      id: `custom-${uid()}`,
      name: surveyName.trim(),
      description: `Custom template with ${questions.length} questions`,
      questions: questions.map((q) => ({ ...q })),
    };
    const updated = [...savedTemplates, tpl];
    setSavedTemplates(updated);
    persistTemplates(updated);
    setSaveMsg("Template saved!");
    setTimeout(() => setSaveMsg(""), 2500);
  }, [surveyName, questions, savedTemplates]);

  const handleDeleteSaved = useCallback(
    (id: string) => {
      const updated = savedTemplates.filter((t) => t.id !== id);
      setSavedTemplates(updated);
      persistTemplates(updated);
    },
    [savedTemplates],
  );

  /* --- Derived --- */
  const estMinutes = useMemo(() => estimateMinutes(questions), [questions]);

  return (
    <article className="min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Customer Feedback Survey Builder" },
        ]}
      />

      {/* Hero */}
      <section aria-label="Interactive Tools" className="px-6 lg:px-12 pt-16 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Interactive Tools</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Customer Feedback Survey Builder
            </h1>
            <SectionDesc>
              Choose a proven survey template, customize your questions, preview the result, and export a ready-to-use survey document. No sign-up required.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  Step 1 — Template Selection                                  */}
      {/* ------------------------------------------------------------ */}
      <section className="px-6 lg:px-12 py-8" aria-labelledby="tpl-heading">
        <div className="max-w-6xl mx-auto">
          <Animate animation="fade-up">
            <h2
              id="tpl-heading"
              className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2rem)] font-extrabold text-black tracking-tight mb-2"
            >
              1. Choose a Template
            </h2>
            <p className="text-base text-neutral-500 mb-8 max-w-2xl">
              Start with a research-backed template, then tailor it to your needs.
            </p>
          </Animate>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEMPLATES.map((tpl) => (
              <Animate key={tpl.id} animation="fade-up" delay={100}>
                <TemplateCard
                  template={tpl}
                  onSelect={() => handleSelectTemplate(tpl)}
                  active={activeTemplateId === tpl.id}
                />
              </Animate>
            ))}
          </div>

          {/* Saved custom templates */}
          {savedTemplates.length > 0 && (
            <div className="mt-10">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                Your Saved Templates
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedTemplates.map((tpl) => (
                  <div key={tpl.id} className="relative">
                    <TemplateCard
                      template={tpl}
                      onSelect={() => handleSelectTemplate(tpl)}
                      active={activeTemplateId === tpl.id}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteSaved(tpl.id)}
                      aria-label={`Delete saved template ${tpl.name}`}
                      className="absolute top-2 right-2 bg-white border border-neutral-300 text-black px-2 py-1 text-base hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[36px] min-w-[36px]"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  Step 2 — Question Editor / Preview                           */}
      {/* ------------------------------------------------------------ */}
      {questions.length > 0 && (
        <section className="px-6 lg:px-12 py-8" aria-labelledby="editor-heading">
          <div className="max-w-5xl mx-auto">
            <Animate animation="fade-up">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h2
                  id="editor-heading"
                  className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2rem)] font-extrabold text-black tracking-tight"
                >
                  2. Customize Your Survey
                </h2>

                {/* Mode toggle */}
                <div className="flex gap-2" role="tablist" aria-label="Editor mode">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === "edit"}
                    onClick={() => setMode("edit")}
                    className={`px-6 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px] ${
                      mode === "edit" ? "bg-black text-white" : "border border-neutral-300 text-black hover:border-black"
                    }`}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === "preview"}
                    onClick={() => setMode("preview")}
                    className={`px-6 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px] ${
                      mode === "preview" ? "bg-black text-white" : "border border-neutral-300 text-black hover:border-black"
                    }`}
                  >
                    Preview
                  </button>
                </div>
              </div>
            </Animate>

            {/* Survey name */}
            <Animate animation="fade-up" delay={50}>
              <div className="mb-6">
                <label htmlFor="survey-name" className="block text-base font-bold text-black mb-2">
                  Survey Name
                </label>
                <input
                  id="survey-name"
                  type="text"
                  value={surveyName}
                  onChange={(e) => setSurveyName(e.target.value)}
                  className="w-full max-w-lg border border-neutral-300 px-4 py-3 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 motion-reduce:transition-none min-h-[44px]"
                />
              </div>
            </Animate>

            {/* Stats bar */}
            <Animate animation="fade-up" delay={100}>
              <div className="flex flex-wrap gap-6 mb-8 p-4 bg-neutral-50 border border-neutral-200 text-base">
                <span className="text-black font-bold">{questions.length} question{questions.length !== 1 ? "s" : ""}</span>
                <span className="text-neutral-500">Estimated time: ~{estMinutes} min</span>
                <span className="text-neutral-500">{questions.filter((q) => q.required).length} required</span>
              </div>
            </Animate>

            {/* Edit mode */}
            {mode === "edit" && (
              <div className="space-y-6">
                {questions.map((q, i) => (
                  <Animate key={q.id} animation="fade-up" delay={50}>
                    <QuestionRow
                      question={q}
                      index={i}
                      total={questions.length}
                      onChange={(updated) => handleQuestionChange(i, updated)}
                      onRemove={() => handleRemoveQuestion(i)}
                      onMoveUp={() => handleMoveUp(i)}
                      onMoveDown={() => handleMoveDown(i)}
                    />
                  </Animate>
                ))}

                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="bg-black text-white px-8 py-4 font-bold text-base hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
                  >
                    + Add Question
                  </button>
                  <button
                    type="button"
                    onClick={() => exportAsTxt(surveyName, questions)}
                    className="border border-neutral-300 text-black px-8 py-4 font-bold text-base hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
                  >
                    Export as .txt
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="border border-neutral-300 text-black px-8 py-4 font-bold text-base hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
                  >
                    Save Template
                  </button>
                  {saveMsg && (
                    <span className="self-center text-base font-bold text-black" role="status">
                      {saveMsg}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Preview mode */}
            {mode === "preview" && (
              <Animate animation="fade-in">
                <SurveyPreview name={surveyName} questions={questions} />
                <div className="flex flex-wrap gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => exportAsTxt(surveyName, questions)}
                    className="bg-black text-white px-8 py-4 font-bold text-base hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
                  >
                    Export as .txt
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("edit")}
                    className="border border-neutral-300 text-black px-8 py-4 font-bold text-base hover:border-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
                  >
                    Back to Editor
                  </button>
                </div>
              </Animate>
            )}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------ */}
      {/*  Educational Section — Survey Best Practices                  */}
      {/* ------------------------------------------------------------ */}
      <section className="px-6 lg:px-12 py-16 bg-neutral-50" aria-labelledby="best-practices-heading">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2
              id="best-practices-heading"
              className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight mb-8"
            >
              Survey Best Practices
            </h2>
          </Animate>

          <div className="space-y-12">
            <Animate animation="fade-up" delay={100}>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  Maximizing Response Rates
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Shorter surveys get more completions. Aim for five to ten questions and keep estimated completion under five minutes. Send your survey within 24 hours of the interaction you are asking about, when the experience is still fresh. Personalize the invitation with the respondent&apos;s name and mention the specific product or service they used. Offering a clear reason why their feedback matters increases response rates by 10 to 20 percent on average.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={200}>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  Writing Unbiased Questions
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Avoid leading language. Instead of &quot;How great was our support?&quot; write &quot;How would you rate our support?&quot; Use neutral scales and avoid double-barreled questions that ask about two things at once. Each question should target a single topic. Mix positive and negative framings to prevent pattern responses. Always include a &quot;not applicable&quot; option when the question may not apply to every respondent.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={300}>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  Question Order and Flow
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Start with easy, non-threatening questions to build momentum. Place your most important questions in the first half of the survey since engagement drops toward the end. Group related questions under section headers so the survey feels organized. Save open-ended questions for last because they require more effort and may cause drop-off if placed too early.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={400}>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  Choosing the Right Scale
                </h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Use a 1 to 5 scale for quick satisfaction checks and a 0 to 10 scale when you need finer granularity, such as NPS. Odd-numbered scales include a neutral midpoint, which is useful when you want to allow a &quot;neither satisfied nor dissatisfied&quot; response. Even-numbered scales force a lean toward positive or negative, which can be useful when you specifically want a directional opinion. Be consistent throughout the survey and always label both end-points clearly.
                </p>
              </div>
            </Animate>

            <Animate animation="fade-up" delay={500}>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-3">
                  When to Use Each Survey Type
                </h3>
                <ul className="space-y-3 text-base text-neutral-600 leading-relaxed">
                  <li className="flex gap-3">
                    <span className="text-black font-bold shrink-0">NPS</span>
                    <span>
                      Best for measuring long-term loyalty. Send quarterly or after major milestones to track whether customers would actively recommend you.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-black font-bold shrink-0">CSAT</span>
                    <span>
                      Best for transactional feedback. Send immediately after a specific interaction like a purchase, support ticket, or onboarding session.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-black font-bold shrink-0">CES</span>
                    <span>
                      Best for identifying friction. Send after task completion to understand how much effort customers had to invest to get what they needed.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-black font-bold shrink-0">Post-Purchase</span>
                    <span>
                      Best for product and delivery insights. Send one to three days after delivery so customers have had time to use the product.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-black font-bold shrink-0">Website</span>
                    <span>
                      Best for UX research. Trigger on-site or via exit intent to capture in-the-moment impressions of navigation, content, and design.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-black font-bold shrink-0">Service</span>
                    <span>
                      Best for agency and professional services. Send at project close to evaluate communication, quality, and perceived value.
                    </span>
                  </li>
                </ul>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  CTA                                                          */}
      {/* ------------------------------------------------------------ */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Building a Customer Feedback Program?
            </h2>
            <p className="text-lg text-neutral-400 mt-4 mb-8">
              We design survey strategies, analyze results, and turn feedback into actionable improvements that increase retention and revenue.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
            >
              Get a Free Consultation &rarr;
            </Link>
          </Animate>
        </div>
      </section>
          <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Customer Feedback Survey Builder",
          description: "Build professional customer feedback surveys from proven templates. NPS, CSAT, product feedback, and post-purchase surveys with best-practice questions.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    
      <ToolCTA
        toolName="Customer Feedback Survey"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Customer Journey Builder", href: "/resources/customer-journey-builder" },
          { title: "Customer Journey Mapper", href: "/resources/customer-journey-mapper" },
          { title: "Contrast Checker", href: "/resources/contrast-checker" },
          { title: "Conversion Checklist", href: "/resources/conversion-checklist" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
