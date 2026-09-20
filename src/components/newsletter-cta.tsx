"use client";

import { useState, type FormEvent } from "react";

export function NewsletterCta() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("success");
    setEmail("");
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
        className="bg-black text-white px-8 py-3 font-bold text-base hover:bg-gray-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 whitespace-nowrap min-h-[44px]"
      >
        Subscribe
      </button>
    </form>
  );
}
