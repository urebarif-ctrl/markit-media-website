"use client";

import { useState, useRef, type FormEvent } from "react";
import { useRouter } from "next/navigation";

interface FormState {
  status: "idle" | "sending" | "sent" | "error";
  message: string;
}

export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ status: "sending", message: "" });

    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get("website")) {
      setState({ status: "sent", message: "Thank you! We'll be in touch." });
      return;
    }

    const body = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      company: String(data.get("company") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      service: String(data.get("service") || "").trim(),
      budget: String(data.get("budget") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };

    if (!body.name || !body.email || !body.message) {
      setState({ status: "error", message: "Please fill in all required fields." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      setState({ status: "error", message: "Please enter a valid email address." });
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Something went wrong." }));
        setState({ status: "error", message: err.error || "Something went wrong." });
        return;
      }

      formRef.current?.reset();
      router.push("/thank-you");
    } catch {
      setState({ status: "error", message: "Network error. Please try again." });
    }
  }

  const inputClass = "w-full border border-gray-300 px-4 py-3 text-base text-black placeholder:text-gray-400 focus:border-black focus:outline-none transition-colors";
  const labelClass = "block text-sm font-bold text-black uppercase tracking-wide mb-2";

  return (
    <div className="bg-gray-50 p-8 lg:p-10">
      <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-8">
        Request a Free Consultation
      </h2>

      {state.status === "sent" ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-4 text-2xl">&#10003;</div>
          <p className="text-lg font-bold text-black">{state.message}</p>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} noValidate>
          {/* Honeypot */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className={labelClass}>Name *</label>
              <input type="text" id="name" name="name" required className={inputClass} placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Email *</label>
              <input type="email" id="email" name="email" required className={inputClass} placeholder="you@company.com" />
            </div>
            <div>
              <label htmlFor="company" className={labelClass}>Company</label>
              <input type="text" id="company" name="company" className={inputClass} placeholder="Your company" />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>Phone</label>
              <input type="tel" id="phone" name="phone" className={inputClass} placeholder="+1 (555) 123-4567" />
            </div>
            <div>
              <label htmlFor="service" className={labelClass}>Service Needed</label>
              <select id="service" name="service" className={inputClass + " appearance-none bg-white"} defaultValue="">
                <option value="" disabled>Select a service</option>
                <option value="performance-marketing">Performance Marketing</option>
                <option value="seo">SEO</option>
                <option value="social-media">Social Media</option>
                <option value="website-development">Website Development</option>
                <option value="branding">Branding</option>
                <option value="video-production">Video Production</option>
                <option value="ai-solutions">AI Solutions</option>
                <option value="email-marketing">Email Marketing</option>
                <option value="content-marketing">Content Marketing</option>
                <option value="digital-marketing">Digital Marketing</option>
                <option value="bpo">BPO Services</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="budget" className={labelClass}>Monthly Budget</label>
              <select id="budget" name="budget" className={inputClass + " appearance-none bg-white"} defaultValue="">
                <option value="" disabled>Select range</option>
                <option value="under-2k">Under $2,000</option>
                <option value="2k-5k">$2,000 — $5,000</option>
                <option value="5k-10k">$5,000 — $10,000</option>
                <option value="10k-25k">$10,000 — $25,000</option>
                <option value="25k-plus">$25,000+</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="message" className={labelClass}>Message *</label>
            <textarea id="message" name="message" rows={5} required className={inputClass + " resize-y"} placeholder="Tell us about your project and goals..." />
          </div>

          {state.status === "error" && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm" role="alert">
              {state.message}
            </div>
          )}

          <button
            type="submit"
            disabled={state.status === "sending"}
            className="mt-6 w-full bg-black text-white px-8 py-4 font-bold text-base hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
          >
            {state.status === "sending" ? "Sending..." : "Send Message"}
          </button>

          <p className="text-sm text-gray-400 mt-4">
            By submitting this form, you agree to our privacy policy.
          </p>
        </form>
      )}
    </div>
  );
}
