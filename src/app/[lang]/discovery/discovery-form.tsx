"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

type Brief = {
  brandName: string;
  link: string;
  stage: string;
  launchDate: string;
  launchTbd: boolean;
  categories: string[];
  description: string;
  positioning: string;
  audiences: string[];
  markets: string[];
  city: string;
  assets: string[];
  needs: string[];
  platforms: string[];
  paidAds: string;
  adBudget: string;
  goals: string[];
  notes: string;
  referenceBrand: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  communication: string;
  website: string;
};

const initialBrief: Brief = {
  brandName: "",
  link: "",
  stage: "",
  launchDate: "",
  launchTbd: false,
  categories: [],
  description: "",
  positioning: "",
  audiences: [],
  markets: [],
  city: "",
  assets: [],
  needs: [],
  platforms: [],
  paidAds: "",
  adBudget: "",
  goals: [],
  notes: "",
  referenceBrand: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  communication: "",
  website: "",
};

const steps = ["Brand", "Audience", "Marketing", "Goals", "Contact"];

function Choice({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-12 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
        active
          ? "border-black bg-black text-white shadow-sm"
          : "border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50"
      }`}
    >
      <span className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[11px] ${
            active ? "border-white bg-white text-black" : "border-gray-300"
          }`}
        >
          {active ? "✓" : ""}
        </span>
        {children}
      </span>
    </button>
  );
}

function SectionHeading({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <div className="mb-7">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">{eyebrow}</p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight text-black sm:text-3xl">
        {title}
      </h2>
      {note ? <p className="mt-2 text-sm leading-relaxed text-gray-500">{note}</p> : null}
    </div>
  );
}

export function DiscoveryForm() {
  const router = useRouter();
  const [brief, setBrief] = useState<Brief>(initialBrief);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const update = <K extends keyof Brief>(key: K, value: Brief[K]) =>
    setBrief((current) => ({ ...current, [key]: value }));

  const toggle = (key: keyof Pick<Brief, "categories" | "audiences" | "markets" | "assets" | "needs" | "platforms" | "goals">, value: string, max?: number) => {
    setBrief((current) => {
      const values = current[key];
      if (values.includes(value)) return { ...current, [key]: values.filter((item) => item !== value) };
      if (max && values.length >= max) return current;
      return { ...current, [key]: [...values, value] };
    });
  };

  function validateCurrentStep() {
    if (step === 0 && (!brief.brandName.trim() || !brief.stage || brief.categories.length === 0)) {
      return "Add your brand name, stage, and business category to continue.";
    }
    if (step === 1 && brief.markets.length === 0) {
      return "Choose at least one initial target market.";
    }
    if (step === 2 && brief.needs.length === 0) {
      return "Choose at least one area where you need Markit Media.";
    }
    if (step === 3 && brief.goals.length === 0) {
      return "Choose at least one goal for the first 90 days.";
    }
    if (step === 4) {
      if (!brief.name.trim() || !brief.company.trim() || !brief.email.trim()) {
        return "Please add your name, company, and email.";
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(brief.email.trim())) {
        return "Please enter a valid email address.";
      }
    }
    return "";
  }

  function next() {
    const message = validateCurrentStep();
    if (message) {
      setError(message);
      return;
    }
    setError("");
    setStep((value) => Math.min(value + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setError("");
    setStep((value) => Math.max(value - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit() {
    const message = validateCurrentStep();
    if (message) {
      setError(message);
      return;
    }
    setStatus("sending");
    setError("");

    try {
      const params = new URLSearchParams(window.location.search);
      const response = await fetch("/api/discovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...brief,
          source: "Brand Discovery Brief",
          landingPage: window.location.pathname,
          referrer: document.referrer,
          utmSource: params.get("utm_source") || "",
          utmMedium: params.get("utm_medium") || "",
          utmCampaign: params.get("utm_campaign") || "",
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({ error: "We could not save your brief. Please try again." }));
        setError(body.error || "We could not save your brief. Please try again.");
        setStatus("idle");
        return;
      }

      setStatus("sent");
      router.push("/thank-you?from=discovery");
    } catch {
      setError("Network error. Please try again.");
      setStatus("idle");
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-base text-black placeholder:text-gray-400 focus:border-black focus:outline-none";
  const gridClass = "grid grid-cols-1 gap-3 sm:grid-cols-2";

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-[0_24px_80px_rgba(0,0,0,0.08)] sm:p-10">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-black text-2xl text-white">✓</div>
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Brief received</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-black">
          Your brief is with us.
        </h2>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-500">
          We&apos;ll review your brand, market, goals, and launch needs before the discovery conversation so we can spend the meeting on strategy rather than paperwork.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {["Brief reviewed", "Category researched", "Discussion points prepared"].map((item) => (
            <div key={item} className="rounded-2xl bg-gray-50 p-4 text-sm font-semibold text-gray-700">
              <span className="mr-2 text-black">✓</span>{item}
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/en/" className="rounded-full bg-black px-6 py-3 text-sm font-bold text-white hover:bg-gray-800">
            Return to Markit Media
          </a>
          <a href="https://wa.me/923002086081" target="_blank" rel="noopener noreferrer" className="rounded-full border border-gray-200 px-6 py-3 text-sm font-bold text-black hover:border-black">
            WhatsApp us
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-gray-200 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
      <div className="border-b border-gray-100 px-5 py-5 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-black">Step {step + 1} of {steps.length}</p>
            <p className="mt-0.5 text-xs text-gray-400">{steps[step]}</p>
          </div>
          <div className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">3–4 min</div>
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-gray-100" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={step + 1}>
          <div className="h-full rounded-full bg-black transition-all duration-300 motion-reduce:transition-none" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
      </div>

      <div className="p-5 sm:p-8 lg:p-10">
        {step === 0 ? (
          <div>
            <SectionHeading eyebrow="01 / Brand" title="Tell us what you're building." note="Just the essentials. We’ll unpack the rest together." />
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-bold text-black" htmlFor="brandName">Brand name *</label>
                <input id="brandName" value={brief.brandName} onChange={(e) => update("brandName", e.target.value)} className={fieldClass} placeholder="Your brand" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-black" htmlFor="brandLink">Website or social link</label>
                <input id="brandLink" value={brief.link} onChange={(e) => update("link", e.target.value)} className={fieldClass} placeholder="Optional" />
              </div>
              <div>
                <p className="mb-3 text-sm font-bold text-black">Current stage *</p>
                <div className={gridClass}>
                  {["Planning / Idea", "Pre-launch", "Launching soon", "Soft launch", "Already live", "Re-launching"].map((item) => (
                    <Choice key={item} active={brief.stage === item} onClick={() => update("stage", item)}>{item}</Choice>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <label className="text-sm font-bold text-black" htmlFor="launchDate">Expected launch</label>
                  <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-gray-500">
                    <input type="checkbox" checked={brief.launchTbd} onChange={(e) => update("launchTbd", e.target.checked)} />
                    Not finalized
                  </label>
                </div>
                <input id="launchDate" type="date" disabled={brief.launchTbd} value={brief.launchDate} onChange={(e) => update("launchDate", e.target.value)} className={fieldClass + " disabled:bg-gray-50 disabled:text-gray-400"} />
              </div>
              <div>
                <p className="mb-3 text-sm font-bold text-black">What are you selling? *</p>
                <div className={gridClass}>
                  {["Fashion", "Beauty", "Food & Beverage", "Home & Lifestyle", "Health & Wellness", "Technology", "Services", "E-commerce", "Other"].map((item) => (
                    <Choice key={item} active={brief.categories.includes(item)} onClick={() => toggle("categories", item)}>{item}</Choice>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-black" htmlFor="description">One-line description</label>
                <input id="description" value={brief.description} onChange={(e) => update("description", e.target.value)} className={fieldClass} placeholder="Optional: what makes the brand different?" />
              </div>
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div>
            <SectionHeading eyebrow="02 / Audience" title="Who are we trying to reach?" note="Tap what fits. You can choose more than one." />
            <div className="space-y-7">
              <div>
                <p className="mb-3 text-sm font-bold text-black">Brand positioning</p>
                <div className={gridClass}>
                  {["Affordable", "Mid-market", "Premium", "Luxury", "Not decided yet"].map((item) => (
                    <Choice key={item} active={brief.positioning === item} onClick={() => update("positioning", item)}>{item}</Choice>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm font-bold text-black">Ideal customers</p>
                <div className={gridClass}>
                  {["Men", "Women", "Both", "Businesses", "Retailers / Distributors", "Families", "Gen Z", "Millennials", "Premium / High-income", "Not sure yet"].map((item) => (
                    <Choice key={item} active={brief.audiences.includes(item)} onClick={() => toggle("audiences", item)}>{item}</Choice>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm font-bold text-black">Initial target markets *</p>
                <div className={gridClass}>
                  {["Pakistan", "USA", "UAE", "Saudi Arabia", "UK", "Canada", "Australia", "Worldwide", "Other"].map((item) => (
                    <Choice key={item} active={brief.markets.includes(item)} onClick={() => toggle("markets", item)}>{item}</Choice>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-black" htmlFor="city">Priority city or area</label>
                <input id="city" value={brief.city} onChange={(e) => update("city", e.target.value)} className={fieldClass} placeholder="Optional" />
              </div>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div>
            <SectionHeading eyebrow="03 / Marketing" title="What do you already have?" note="This helps us arrive with the right recommendations." />
            <div className="space-y-7">
              <div>
                <p className="mb-3 text-sm font-bold text-black">Existing assets</p>
                <div className={gridClass}>
                  {["Logo", "Brand guidelines", "Product photography", "Videos / Reels", "Packaging", "Website / Shopify", "Existing social pages", "None yet"].map((item) => (
                    <Choice key={item} active={brief.assets.includes(item)} onClick={() => toggle("assets", item)}>{item}</Choice>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm font-bold text-black">What do you need from Markit Media? *</p>
                <div className={gridClass}>
                  {["Launch strategy", "Social media management", "Content creation", "Photography / Videography", "Creative direction", "Meta Ads", "Google Ads", "Website / Shopify", "Branding", "Complete launch support", "Recommend the right plan"].map((item) => (
                    <Choice key={item} active={brief.needs.includes(item)} onClick={() => toggle("needs", item)}>{item}</Choice>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm font-bold text-black">Platforms you’re considering</p>
                <div className={gridClass}>
                  {["Instagram", "Facebook", "TikTok", "Google", "Pinterest", "Shopify", "YouTube", "Recommend for me"].map((item) => (
                    <Choice key={item} active={brief.platforms.includes(item)} onClick={() => toggle("platforms", item)}>{item}</Choice>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div>
            <SectionHeading eyebrow="04 / Goals" title="What should the first 90 days achieve?" note="Choose up to three priorities." />
            <div className="space-y-7">
              <div>
                <p className="mb-3 text-sm font-bold text-black">Paid advertising</p>
                <div className={gridClass}>
                  {["Yes, from launch", "Later", "Maybe", "No", "Recommend for me"].map((item) => (
                    <Choice key={item} active={brief.paidAds === item} onClick={() => update("paidAds", item)}>{item}</Choice>
                  ))}
                </div>
              </div>
              {brief.paidAds && brief.paidAds !== "No" ? (
                <div>
                  <p className="mb-3 text-sm font-bold text-black">Monthly ad budget</p>
                  <div className={gridClass}>
                    {["Under $1,000", "$1,000–$3,000", "$3,000–$5,000", "$5,000+", "Not decided"].map((item) => (
                      <Choice key={item} active={brief.adBudget === item} onClick={() => update("adBudget", item)}>{item}</Choice>
                    ))}
                  </div>
                </div>
              ) : null}
              <div>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-bold text-black">First 90-day goals *</p>
                  <span className="text-xs font-semibold text-gray-400">{brief.goals.length}/3 selected</span>
                </div>
                <div className={gridClass}>
                  {["Brand awareness", "Sales", "Followers / Community", "Website traffic", "Leads / Inquiries", "Strong launch content", "Premium brand positioning", "Retail partnerships", "Build customer database"].map((item) => (
                    <Choice key={item} active={brief.goals.includes(item)} onClick={() => toggle("goals", item, 3)}>{item}</Choice>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div>
            <SectionHeading eyebrow="05 / Contact" title="Last step. Where should we reply?" note="We’ll use this brief to prepare before the discovery conversation." />
            <div className="space-y-6">
              <div className={gridClass}>
                <div>
                  <label className="mb-2 block text-sm font-bold text-black" htmlFor="name">Your name *</label>
                  <input id="name" value={brief.name} onChange={(e) => update("name", e.target.value)} className={fieldClass} placeholder="Full name" autoComplete="name" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-black" htmlFor="company">Company *</label>
                  <input id="company" value={brief.company} onChange={(e) => update("company", e.target.value)} className={fieldClass} placeholder="Company name" autoComplete="organization" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-black" htmlFor="email">Email *</label>
                  <input id="email" type="email" value={brief.email} onChange={(e) => update("email", e.target.value)} className={fieldClass} placeholder="you@company.com" autoComplete="email" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-black" htmlFor="phone">WhatsApp / Phone</label>
                  <input id="phone" type="tel" value={brief.phone} onChange={(e) => update("phone", e.target.value)} className={fieldClass} placeholder="+1..." autoComplete="tel" />
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm font-bold text-black">Preferred communication</p>
                <div className={gridClass}>
                  {["WhatsApp", "Email", "Phone"].map((item) => (
                    <Choice key={item} active={brief.communication === item} onClick={() => update("communication", item)}>{item}</Choice>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-black" htmlFor="referenceBrand">Reference brand you like</label>
                <input id="referenceBrand" value={brief.referenceBrand} onChange={(e) => update("referenceBrand", e.target.value)} className={fieldClass} placeholder="Optional: name or link" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-black" htmlFor="notes">Anything we should know before we meet?</label>
                <textarea id="notes" rows={3} value={brief.notes} onChange={(e) => update("notes", e.target.value)} className={fieldClass + " resize-y"} placeholder="Optional" />
              </div>
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" value={brief.website} onChange={(e) => update("website", e.target.value)} tabIndex={-1} autoComplete="off" />
              </div>
            </div>
          </div>
        ) : null}

        {error ? (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
            {error}
          </div>
        ) : null}

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-gray-100 pt-6">
          <button
            type="button"
            onClick={back}
            disabled={step === 0 || status === "sending"}
            className="rounded-full px-4 py-3 text-sm font-bold text-gray-500 hover:text-black disabled:invisible"
          >
            ← Back
          </button>
          {step < steps.length - 1 ? (
            <button type="button" onClick={next} className="rounded-full bg-black px-7 py-3.5 text-sm font-bold text-white hover:bg-gray-800">
              Continue →
            </button>
          ) : (
            <button type="button" onClick={submit} disabled={status === "sending"} className="rounded-full bg-black px-7 py-3.5 text-sm font-bold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50">
              {status === "sending" ? "Sending brief..." : "Send My Brand Brief →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
