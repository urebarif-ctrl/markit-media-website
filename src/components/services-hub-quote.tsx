"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PhoneField } from "@/components/phone-field";
import { trackEvent } from "@/lib/tracking";

const inp = "w-full border border-gray-300 bg-white px-4 py-3.5 text-base min-h-[48px] focus:outline-2 focus:outline-black focus:border-black transition-colors motion-reduce:transition-none";
const lab = "block text-sm font-bold mb-1.5";
const SERVICES = ["Performance Marketing", "SEO", "Social Media", "Website Development", "Shopify / Ecommerce", "Branding & Design", "Video Production", "Content Marketing", "Email Marketing", "CRM Development", "App Development", "AI Services", "BPO", "White Label", "Not sure yet"];

/** Services-hub quote form. Same endpoint, fields, phone rule and thank-you flow as the site's inline quote form; adds multi-select services and budget. */
export function ServicesHubQuoteForm() {
  const [phone, setPhone] = useState("");
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const router = useRouter();
  const locale = usePathname().split("/")[1] || "en";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    if (f.get("website")) { router.push(`/${locale}/thank-you?from=quote`); return; }
    const v = (k: string) => String(f.get(k) || "").trim();
    const services = f.getAll("services").map(String);
    const er: Record<string, string> = {};
    if (v("name").length < 2) er.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) er.email = "Please enter a valid email address.";
    const numEl = document.getElementById("sq-phone-number") as HTMLInputElement | null;
    if (!phone) er.phone = numEl && numEl.value.trim() ? "invalid" : "Please enter a valid phone number for the selected country.";
    if (services.length === 0) er.services = "Please choose at least one service.";
    if (v("message").length < 10) er.message = "Please tell us a little about the project.";
    setErrs(er);
    const first = Object.keys(er)[0];
    if (first) {
      const el = first === "phone" ? numEl : first === "services" ? (document.querySelector("#sq-services input") as HTMLElement | null) : (form.elements.namedItem(first) as HTMLElement | null);
      el?.focus();
      return;
    }
    setStatus("sending");
    const params = new URLSearchParams(window.location.search);
    const body = {
      name: v("name"), email: v("email"), company: v("company"), phone: v("phone"), phoneCountry: v("phoneCountry"),
      service: services.join(", ").slice(0, 80), budget: v("budget"),
      message: `Services needed: ${services.join(", ")}\n\n${v("message")}`,
      source: "Services Page Quote Form", landingPage: window.location.pathname, referrer: document.referrer,
      utmSource: params.get("utm_source") || "", utmMedium: params.get("utm_medium") || "", utmCampaign: params.get("utm_campaign") || "",
    };
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) {
        trackEvent("generate_lead", { form_name: "services_hub_quote", service: body.service, source: body.source });
        router.push(`/${locale}/thank-you?from=quote`);
      } else setStatus("error");
    } catch { setStatus("error"); }
  }

  const err = (k: string) => errs[k] && errs[k] !== "invalid" && <p id={`sq-${k}-err`} className="text-red-700 text-sm mt-1.5">{errs[k]}</p>;
  const bad = (k: string) => (errs[k] ? { "aria-invalid": true as const, "aria-describedby": `sq-${k}-err` } : {});
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5" aria-label="Request a quote">
      <div className="absolute -left-[9999px]" aria-hidden="true"><input type="text" name="website" tabIndex={-1} autoComplete="off" /></div>
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
              <span className="inline-flex items-center min-h-11 border border-gray-300 px-4 text-sm font-semibold transition-colors motion-reduce:transition-none peer-checked:bg-black peer-checked:text-white peer-checked:border-black peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-black hover:border-black">{s}</span>
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
      <div><label htmlFor="sq-message" className={lab}>Project details *</label><textarea id="sq-message" name="message" rows={5} required maxLength={4800} className={`${inp} resize-y`} placeholder="Goals, current setup, priority market, timeline." {...bad("message")} />{err("message")}</div>
      {status === "error" && <p className="text-base text-red-700" role="alert">We could not send your request. Please try again or email ciao@themarkitmedia.com.</p>}
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className="bg-black text-white px-9 py-4 font-bold min-h-[52px] hover:bg-[#5A3ED6] transition-colors motion-reduce:transition-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">{status === "sending" ? "Sending..." : "Request a Quote →"}</button>
        <Link href={`/${locale}/contact`} className="font-bold border-b border-black pb-1 min-h-11 inline-flex items-center focus-visible:outline-2 focus-visible:outline-black">Talk to Our Team</Link>
      </div>
      <p className="text-xs text-gray-500">By submitting this form you agree to our <Link href={`/${locale}/privacy-policy`} className="underline">privacy policy</Link>.</p>
    </form>
  );
}
