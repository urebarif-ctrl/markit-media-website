"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { PhoneField } from "@/components/phone-field";

const inp = "w-full border border-gray-300 bg-white px-4 py-3.5 text-base min-h-[48px] focus:outline-2 focus:outline-black focus:border-black";
const lab = "block text-sm font-bold mb-1.5";
type Errors = Record<string, string>;

/**
 * Homepage quote form for the V1.5 demo. Same fields and phone rule as the live quote form
 * (name, email, required phone, company, service, budget, details), validated in the browser.
 * DEMO MODE: it never calls /api/contact, because the preview shares the live database and mailbox bindings.
 * Going live = replace `onSubmit`'s body with the same POST the live quote form uses.
 */
export function HomeQuoteForm() {
  const [phone, setPhone] = useState("");
  const [errs, setErrs] = useState<Errors>({});
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) || "").trim();
    const er: Errors = {};
    if (v("name").length < 2) er.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) er.email = "Please enter a valid email address.";
    // An empty number gets our message; a typed-but-invalid one is explained by the phone field itself (shown after blur).
    const numEl = document.getElementById("q-phone-number") as HTMLInputElement | null;
    if (!phone) er.phone = numEl && numEl.value.trim() ? "invalid" : "Please enter a valid phone number for the selected country.";
    if (!v("service")) er.service = "Please choose a service.";
    if (v("message").length < 10) er.message = "Please tell us a little about the project.";
    setErrs(er);
    if (Object.keys(er).length) {
      const first = Object.keys(er)[0];
      if (first === "phone" && er.phone === "invalid") { numEl?.focus(); numEl?.blur(); numEl?.focus(); }
      else (first === "phone" ? document.getElementById("q-phone-number") : (e.currentTarget.elements.namedItem(first) as HTMLElement | null))?.focus();
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div role="status" className="border border-black p-8">
        <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold">Form checked. Nothing was sent.</p>
        <p className="text-gray-600 mt-3 leading-relaxed">This is a demo page, so your details were validated in the browser and then discarded. To send a real request, use the <Link href="/en/get-a-quote" className="underline underline-offset-4">live quote page</Link>.</p>
        <button type="button" onClick={() => setDone(false)} className="mt-6 border border-gray-400 px-5 py-3 font-bold hover:border-black min-h-11 focus-visible:outline-2 focus-visible:outline-black">Edit the form</button>
      </div>
    );
  }
  const err = (k: string) => errs[k] && errs[k] !== "invalid" && <p id={`q-${k}-err`} className="text-red-700 text-sm mt-1.5">{errs[k]}</p>;
  const bad = (k: string) => (errs[k] ? { "aria-invalid": true as const, "aria-describedby": `q-${k}-err` } : {});
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5" aria-label="Request a quote">
      <p className="text-sm text-gray-500">Fields marked * are required.</p>
      <div className="grid sm:grid-cols-2 gap-5">
        <div><label htmlFor="q-name" className={lab}>Name *</label><input id="q-name" name="name" autoComplete="name" required maxLength={120} className={inp} {...bad("name")} />{err("name")}</div>
        <div><label htmlFor="q-email" className={lab}>Email *</label><input id="q-email" name="email" type="email" autoComplete="email" required maxLength={254} className={inp} {...bad("email")} />{err("email")}</div>
        <div>
          <PhoneField id="q-phone" name="phone" label="Phone *" className={inp} labelClassName={lab} onChange={(e164) => setPhone(e164)} />
          {err("phone")}
        </div>
        <div><label htmlFor="q-company" className={lab}>Company</label><input id="q-company" name="company" autoComplete="organization" maxLength={160} className={inp} /></div>
        <div>
          <label htmlFor="q-service" className={lab}>Service needed *</label>
          <select id="q-service" name="service" defaultValue="" required className={`${inp} appearance-none`} {...bad("service")}>
            <option value="" disabled>Select a service</option>
            {["Performance Marketing", "SEO", "Social Media", "Website Development", "Shopify / Ecommerce", "Branding & Design", "Video Production", "Content Marketing", "Email Marketing", "CRM Development", "App Development", "AI Services", "BPO", "White Label", "Not sure yet"].map((s) => <option key={s}>{s}</option>)}
          </select>
          {err("service")}
        </div>
        <div>
          <label htmlFor="q-budget" className={lab}>Approximate budget</label>
          <select id="q-budget" name="budget" defaultValue="" className={`${inp} appearance-none`}>
            <option value="" disabled>Select range</option>
            <option>Under $2,000</option><option>$2,000 to $5,000</option><option>$5,000 to $10,000</option><option>$10,000 to $25,000</option><option>$25,000+</option>
          </select>
        </div>
      </div>
      <div><label htmlFor="q-message" className={lab}>Project details *</label><textarea id="q-message" name="message" rows={5} required maxLength={5000} className={`${inp} resize-y`} placeholder="Goals, current setup, priority market, timeline." {...bad("message")} />{err("message")}</div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="bg-black text-white px-9 py-4 font-bold min-h-[52px] hover:bg-[#5A3ED6] transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Request a Quote →</button>
        <Link href="/en/contact" className="font-bold border-b border-black pb-1 min-h-11 inline-flex items-center focus-visible:outline-2 focus-visible:outline-black">Talk to Our Team</Link>
      </div>
      <p className="text-xs text-gray-500">Demo page: this form is checked in your browser but not connected, so no lead is created. By submitting the live form you agree to our <Link href="/en/privacy-policy" className="underline">privacy policy</Link>.</p>
    </form>
  );
}
