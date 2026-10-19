"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import { trackEvent } from "@/lib/tracking";
import { CAREER_ROLES, CV_ACCEPT, CV_EXTENSIONS, CV_MAX_BYTES, cvExtension } from "@/lib/careers";

const field = "w-full border border-gray-300 bg-white px-4 py-3 text-base text-black placeholder:text-gray-500 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-black";
const label = "block text-sm font-bold text-black mb-1.5";

export function CareersForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";
  const id = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) {
      router.push(`/${locale}/careers/thank-you`);
      return;
    }

    const file = data.get("cv");
    if (!(file instanceof File) || file.size === 0) {
      setStatus("error");
      setMessage("Please attach your CV.");
      return;
    }
    if (!(CV_EXTENSIONS as readonly string[]).includes(cvExtension(file.name))) {
      setStatus("error");
      setMessage("Please upload a PDF, DOC or DOCX file.");
      return;
    }
    if (file.size > CV_MAX_BYTES) {
      setStatus("error");
      setMessage("That file is larger than 5 MB. Please upload a smaller one.");
      return;
    }

    data.set("consent", data.get("consent") ? "yes" : "");
    data.set("landingPage", window.location.pathname);
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/careers", { method: "POST", body: data });
      if (response.ok) {
        trackEvent("career_application", { role: String(data.get("role") || "") });
        router.push(`/${locale}/careers/thank-you`);
        return;
      }
      const result = await response.json().catch(() => ({}));
      setStatus("error");
      setMessage(result.error || "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setMessage("We could not reach the server. Please check your connection and try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="text-left bg-white text-black p-6 md:p-10 border border-gray-200" noValidate>
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor={`${id}-name`} className={label}>Full name *</label>
          <input id={`${id}-name`} name="name" type="text" required autoComplete="name" maxLength={120} className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={label}>Email *</label>
          <input id={`${id}-email`} name="email" type="email" required autoComplete="email" maxLength={254} className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className={label}>Phone or WhatsApp</label>
          <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={40} className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-location`} className={label}>City and country</label>
          <input id={`${id}-location`} name="location" type="text" autoComplete="address-level2" maxLength={120} className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-role`} className={label}>Area you are interested in *</label>
          <select id={`${id}-role`} name="role" required defaultValue="" className={field}>
            <option value="" disabled>Choose one</option>
            {CAREER_ROLES.map((role) => <option key={role} value={role}>{role}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-link`} className={label}>Portfolio link (optional)</label>
          <input id={`${id}-link`} name="link" type="url" inputMode="url" placeholder="Behance, GitHub, your website…" maxLength={300} className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-linkedin`} className={label}>LinkedIn profile (optional)</label>
          <input id={`${id}-linkedin`} name="linkedin" type="url" inputMode="url" placeholder="https://linkedin.com/in/…" maxLength={300} className={field} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={`${id}-note`} className={label}>A few words about you</label>
        <textarea id={`${id}-note`} name="note" rows={4} maxLength={2000} placeholder="What excites you about digital marketing? No cover letter needed." className={field} />
      </div>

      <div className="mt-5">
        <label htmlFor={`${id}-cv`} className={label}>CV (PDF, DOC or DOCX, up to 5 MB) *</label>
        <input id={`${id}-cv`} name="cv" type="file" required accept={CV_ACCEPT} className="block w-full text-base text-black file:mr-4 file:border-0 file:bg-black file:px-5 file:py-3 file:font-bold file:text-white hover:file:bg-gray-800" />
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input id={`${id}-consent`} name="consent" type="checkbox" required className="mt-1 h-5 w-5 accent-black" />
        <label htmlFor={`${id}-consent`} className="text-sm text-gray-700 leading-relaxed">
          I agree that Markit Media may store my details and CV to consider me for a role. I can ask for them to be deleted at any time. See the <a href={`/${locale}/privacy-policy`} className="underline font-semibold">privacy policy</a>.
        </label>
      </div>

      <div role="status" aria-live="polite" className="mt-5 min-h-6">
        {status === "error" ? <p className="text-base font-semibold text-red-700">{message}</p> : null}
      </div>

      <button type="submit" disabled={status === "sending"} className="mt-2 inline-flex items-center justify-center gap-3 bg-black text-white px-10 py-4 min-h-12 font-bold text-base hover:bg-gray-800 disabled:opacity-60 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
        {status === "sending" ? "Sending…" : "Submit application"}
      </button>
    </form>
  );
}
