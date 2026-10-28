"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { PhoneField } from "@/components/phone-field";

const inp = "w-full border border-gray-300 bg-white px-4 py-3.5 text-base min-h-[48px] focus:outline-2 focus:outline-black focus:border-black";
const lab = "block text-sm font-bold mb-1.5";
const SERVICES = ["Performance Marketing", "SEO", "Social Media", "Website Development", "Shopify / Ecommerce", "Branding & Design", "Video Production", "Content Marketing", "Email Marketing", "CRM Development", "App Development", "AI Services", "BPO", "White Label", "Not sure yet"];

/** Services-page quote form (demo): multi-select services, same required fields and phone rule as the live form. NEVER posts: the preview shares live bindings. */
export function ServicesQuoteForm() {
  const [phone, setPhone] = useState("");
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) || "").trim();
    const er: Record<string, string> = {};
    if (v("name").length < 2) er.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) er.email = "Please enter a valid email address.";
    const numEl = document.getElementById("sq-phone-number") as HTMLInputElement | null;
    if (!phone) er.phone = numEl && numEl.value.trim() ? "invalid" : "Please enter a valid phone number for the selected country.";
    if (f.getAll("services").length === 0) er.services = "Please choose at least one service.";
    if (v("message").length < 10) er.message = "Please tell us a little about the project.";
    setErrs(er);
    const first = Object.keys(er)[0];
    if (first) {
      const el = first === "phone" ? numEl : first === "services" ? (document.querySelector("#sq-services input") as HTMLElement | null) : (e.currentTarget.elements.namedItem(first) as HTMLElement | null);
      el?.focus();
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
  const err = (k: string) => errs[k] && errs[k] !== "invalid" && <p id={`sq-${k}-err`} className="text-red-700 text-sm mt-1.5">{errs[k]}</p>;
  const bad = (k: string) => (errs[k] ? { "aria-invalid": true as const, "aria-describedby": `sq-${k}-err` } : {});
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5" aria-label="Request a quote">
      <p className="text-sm text-gray-500">Fields marked * are required.</p>
      <div className="grid sm:grid-cols-2 gap-5">
        <div><label htmlFor="sq-name" className={lab}>Name *</label><input id="sq-name" name="name" autoComplete="name" required maxLength={120} className={inp} {...bad("name")} />{err("name")}</div>
        <div><label htmlFor="sq-email" className={lab}>Email *</label><input id="sq-email" name="email" type="email" autoComplete="email" required maxLength={254} className={inp} {...bad("email")} />{err("email")}</div>
        <div><PhoneField id="sq-phone" name="phone" label="Phone *" className={inp} labelClassName={lab} onChange={(e164) => setPhone(e164)} />{err("phone")}</div>
        <div><label htmlFor="sq-company" className={lab}>Company</label><input id="sq-company" name="company" autoComplete="organization" maxLength={160} className={inp} /></div>
      </div>
      <fieldset id="sq-services" className="border-0 p-0 m-0" aria-describedby={errs.services ? "sq-services-err" : undefined}>
        <legend className={lab}>Services needed * <span className="font-normal text-gray-500">(choose any)</span></legend>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <label key={s} className="relative cursor-pointer">
              <input type="checkbox" name="services" value={s} className="peer absolute opacity-0 inset-0 w-full h-full cursor-pointer" />
              <span className="inline-flex items-center min-h-11 border border-gray-300 px-4 text-sm font-semibold peer-checked:bg-black peer-checked:text-white peer-checked:border-black peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-black hover:border-black">{s}</span>
            </label>
          ))}
        </div>
        {err("services")}
      </fieldset>
      <div>
        <label htmlFor="sq-budget" className={lab}>Approximate monthly budget</label>
        <select id="sq-budget" name="budget" defaultValue="" className={`${inp} appearance-none`}>
          <option value="" disabled>Select range</option>
          <option>Under $2,000</option><option>$2,000 to $5,000</option><option>$5,000 to $10,000</option><option>$10,000 to $25,000</option><option>$25,000+</option><option>One-time project</option>
        </select>
      </div>
      <div><label htmlFor="sq-message" className={lab}>Project details *</label><textarea id="sq-message" name="message" rows={5} required maxLength={5000} className={`${inp} resize-y`} placeholder="Goals, current setup, priority market, timeline." {...bad("message")} />{err("message")}</div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="bg-black text-white px-9 py-4 font-bold min-h-[52px] hover:bg-[#5A3ED6] transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Request a Quote →</button>
        <Link href="/en/contact" className="font-bold border-b border-black pb-1 min-h-11 inline-flex items-center focus-visible:outline-2 focus-visible:outline-black">Talk to Our Team</Link>
      </div>
      <p className="text-xs text-gray-500">Demo page: checked in your browser but not connected, so no lead is created. By submitting the live form you agree to our <Link href="/en/privacy-policy" className="underline">privacy policy</Link>.</p>
    </form>
  );
}
