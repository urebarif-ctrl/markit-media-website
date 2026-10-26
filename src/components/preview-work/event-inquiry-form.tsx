"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";

const input = "w-full border border-gray-300 px-4 py-3 text-base bg-white focus:outline-2 focus:outline-black focus:border-black min-h-[44px]";
const label = "block text-sm font-bold mb-1.5";
type State = { status: "idle" | "sending" | "ok" | "error"; message: string; preview?: boolean };

export function EventInquiryForm() {
  const [state, setState] = useState<State>({ status: "idle", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const opened = useRef(0);
  useEffect(() => { opened.current = Date.now(); }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const d = new FormData(f);
    const v = (k: string) => String(d.get(k) || "").trim();
    const err: Record<string, string> = {};
    if (v("name").length < 2) err.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) err.email = "Please enter a valid email address.";
    if (v("phone") && !/^\+?[0-9 ()\-]{7,20}$/.test(v("phone"))) err.phone = "Use digits, spaces and an optional + only (7 to 20 characters).";
    if (v("eventName").length < 2) err.eventName = "Please tell us the event name.";
    if (!v("collabType")) err.collabType = "Please choose how you would like to collaborate.";
    if (v("message").length < 20) err.message = "Please tell us a little more (at least 20 characters).";
    if (v("message").length > 3000) err.message = "Please keep the message under 3000 characters.";
    if (d.get("consent") !== "on") err.consent = "Please confirm you agree to the privacy policy.";
    setErrors(err);
    if (Object.keys(err).length) {
      setState({ status: "error", message: "Please fix the highlighted fields." });
      const first = Object.keys(err)[0];
      (f.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setState({ status: "sending", message: "" });
    try {
      const res = await fetch("/api/event-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: v("name"), email: v("email"), organisation: v("organisation"), phone: v("phone"), eventName: v("eventName"),
          eventType: v("eventType"), eventDate: v("eventDate"), location: v("location"), attendance: v("attendance"),
          collabType: v("collabType"), message: v("message"), consent: true, marketingConsent: d.get("marketingConsent") === "on",
          website: v("website"), openedAt: opened.current, landingPage: window.location.pathname,
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) { setState({ status: "error", message: j.error || "Something went wrong. Please try again." }); return; }
      setState({ status: "ok", message: "", preview: Boolean(j.preview) });
      f.reset();
    } catch {
      setState({ status: "error", message: "Network error. Please try again." });
    }
  }

  if (state.status === "ok") {
    return (
      <div role="status" aria-live="polite" className="border border-green-300 bg-green-50 p-6">
        <h3 className="font-bold text-lg">{state.preview ? "Test submission checked" : "Thank you"}</h3>
        <p className="mt-2 text-gray-800">
          {state.preview
            ? "This is a private preview. Your entries passed validation and spam checks, but nothing was stored or sent to anyone. The live form will send inquiries to the team once approved."
            : "We have received your inquiry and will get back to you."}
        </p>
        <button type="button" onClick={() => setState({ status: "idle", message: "" })} className="mt-4 border border-gray-400 px-4 py-2 font-bold hover:border-black focus-visible:outline-2 focus-visible:outline-black">Send another test</button>
      </div>
    );
  }
  const ec = (k: string) => (errors[k] ? "border-red-500" : "");
  const em = (k: string) => errors[k] && <p id={`${k}-err`} className="text-red-700 text-sm mt-1">{errors[k]}</p>;
  return (
    <form onSubmit={onSubmit} noValidate aria-describedby="form-status" className="space-y-5">
      <p className="text-sm text-gray-600">Fields marked * are required.</p>
      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div><label htmlFor="name" className={label}>Your name *</label><input id="name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} maxLength={120} className={`${input} ${ec("name")}`} />{em("name")}</div>
        <div><label htmlFor="email" className={label}>Email *</label><input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} maxLength={254} className={`${input} ${ec("email")}`} />{em("email")}</div>
        <div><label htmlFor="organisation" className={label}>Organisation</label><input id="organisation" name="organisation" autoComplete="organization" maxLength={160} className={input} /></div>
        <div><label htmlFor="phone" className={label}>Phone or WhatsApp</label><input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+92 300 0000000" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined} maxLength={20} className={`${input} ${ec("phone")}`} />{em("phone")}</div>
        <div><label htmlFor="eventName" className={label}>Event name *</label><input id="eventName" name="eventName" required aria-invalid={!!errors.eventName} aria-describedby={errors.eventName ? "eventName-err" : undefined} maxLength={160} className={`${input} ${ec("eventName")}`} />{em("eventName")}</div>
        <div><label htmlFor="eventType" className={label}>Type of event</label>
          <select id="eventType" name="eventType" defaultValue="" className={`${input} appearance-none`}>
            <option value="">Select</option><option value="market-bazaar">Market or bazaar</option><option value="exhibition">Exhibition or expo</option><option value="conference">Conference or summit</option><option value="festival">Festival or cultural event</option><option value="corporate">Corporate or career event</option><option value="other">Other</option>
          </select></div>
        <div><label htmlFor="eventDate" className={label}>Event date (if known)</label><input id="eventDate" name="eventDate" type="date" className={input} /></div>
        <div><label htmlFor="location" className={label}>City and country</label><input id="location" name="location" autoComplete="address-level2" maxLength={120} className={input} /></div>
        <div><label htmlFor="attendance" className={label}>Expected attendance</label>
          <select id="attendance" name="attendance" defaultValue="" className={`${input} appearance-none`}>
            <option value="">Select</option><option value="under-500">Under 500</option><option value="500-2000">500 to 2,000</option><option value="2000-10000">2,000 to 10,000</option><option value="10000-plus">10,000+</option>
          </select></div>
        <div><label htmlFor="collabType" className={label}>How would you like to collaborate? *</label>
          <select id="collabType" name="collabType" defaultValue="" required aria-invalid={!!errors.collabType} aria-describedby={errors.collabType ? "collabType-err" : undefined} className={`${input} appearance-none ${ec("collabType")}`}>
            <option value="" disabled>Select</option><option value="media-partner">Media partner</option><option value="creative-partner">Creative and design partner</option><option value="digital-partner">Digital and social partner</option><option value="not-sure">Not sure yet</option>
          </select>{em("collabType")}</div>
      </div>
      <div><label htmlFor="message" className={label}>Tell us about the event and what you have in mind *</label><textarea id="message" name="message" rows={5} required maxLength={3000} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} className={`${input} resize-y ${ec("message")}`} />{em("message")}</div>
      <div className="flex items-start gap-3 text-sm">
        <input type="checkbox" id="consent" name="consent" className="mt-1 h-4 w-4" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "consent-err" : undefined} />
        <label htmlFor="consent">I agree that Markit Media may use these details to reply to my inquiry, as described in the <Link href="/en/privacy-policy" className="underline underline-offset-2">privacy policy</Link>. *</label>
      </div>
      {em("consent")}
      <div className="flex items-start gap-3 text-sm text-gray-600">
        <input type="checkbox" id="marketingConsent" name="marketingConsent" className="mt-1 h-4 w-4" />
        <label htmlFor="marketingConsent">Send me occasional marketing insights and updates from Markit Media. Optional.</label>
      </div>
      <div id="form-status" role="alert" aria-live="assertive">
        {state.status === "error" && <p className="p-3 bg-red-50 border border-red-200 text-red-700">{state.message}</p>}
      </div>
      <button type="submit" disabled={state.status === "sending"} className="w-full sm:w-auto bg-black text-white px-8 py-4 font-bold min-h-[44px] hover:bg-gray-800 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
        {state.status === "sending" ? "Sending..." : "Send event inquiry"}
      </button>
      <p className="text-sm text-gray-500">Preview mode: submissions are checked but not stored or emailed.</p>
    </form>
  );
}
