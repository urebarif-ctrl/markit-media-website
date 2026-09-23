"use client";

import { useState, type FormEvent } from "react";

export function NewsletterCta({ source = "footer" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center">
        <p className="text-base font-bold text-black">Thanks for subscribing.</p>
        <p className="text-base text-gray-500 mt-1">You will hear from us soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        type="email"
        id="newsletter-email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 border border-gray-300 px-4 py-3 text-base text-black placeholder:text-gray-400 focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none min-h-[44px]"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-black text-white px-8 py-3 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 whitespace-nowrap min-h-[44px] disabled:opacity-60"
      >
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="text-base text-red-600 sm:col-span-2">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
