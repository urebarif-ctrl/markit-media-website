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
        className="flex-1 border border-gray-300 px-4 py-3 text-base text-black placeholder:text-gray-400 focus:border-black focus:outline-none transition-colors"
      />
      <button
        type="submit"
        className="bg-black text-white px-8 py-3 font-bold text-base hover:bg-gray-800 transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}
