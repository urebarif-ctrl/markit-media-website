"use client";

import { useId, useState, type FormEvent } from "react";

interface QuoteFormProps {
  service?: string;
  title?: string;
  buttonText?: string;
  messagePlaceholder?: string;
}

export function QuoteForm({
  service,
  title = "Get a Free Quote",
  buttonText = "Send Request",
  messagePlaceholder = "Tell us about your project...",
}: QuoteFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formId = useId();
  const nameId = `${formId}-name`;
  const emailId = `${formId}-email`;
  const messageId = `${formId}-message`;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.currentTarget);

    if (data.get("website")) {
      setStatus("sent");
      return;
    }

    const body = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      service: String(data.get("service") || service || "").trim(),
      message: String(data.get("message") || "").trim(),
    };

    if (!body.name || !body.email || !body.message) {
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-gray-50 p-8 text-center">
        <div className="w-12 h-12 bg-black text-white flex items-center justify-center mx-auto mb-3 text-xl">&#10003;</div>
        <p className="text-base font-bold text-black">Thank you! We'll be in touch.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-8 space-y-4" noValidate>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">{title}</h3>
      <div>
        <label htmlFor={nameId} className="sr-only">Your name</label>
        <input type="text" id={nameId} name="name" required placeholder="Your name" className="w-full border border-gray-300 px-4 py-3 text-base min-h-[44px] focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none" />
      </div>
      <div>
        <label htmlFor={emailId} className="sr-only">Email address</label>
        <input type="email" id={emailId} name="email" required placeholder="Email address" className="w-full border border-gray-300 px-4 py-3 text-base min-h-[44px] focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none" />
      </div>
      {service && <input type="hidden" name="service" value={service} />}
      <div>
        <label htmlFor={messageId} className="sr-only">Project details</label>
        <textarea id={messageId} name="message" rows={3} required placeholder={messagePlaceholder} className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none resize-y transition-colors motion-reduce:transition-none" />
      </div>
      {status === "error" && <p className="text-base text-red-600" role="alert">Please fill in all fields and try again.</p>}
      <button type="submit" disabled={status === "sending"} className="w-full bg-black text-white py-4 font-bold text-base min-h-[44px] hover:bg-gray-800 transition-colors motion-reduce:transition-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
        {status === "sending" ? "Sending..." : buttonText}
      </button>
    </form>
  );
}
