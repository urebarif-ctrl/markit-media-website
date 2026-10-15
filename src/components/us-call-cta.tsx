import { Phone } from "lucide-react";
import { PHONE_US } from "@/lib/contact";

/** Inline "Call" button, styled to sit next to the primary and secondary buttons on US pages. */
export function UsCallButton({ dark = false }: { dark?: boolean }) {
  return (
    <a
      href={`tel:${PHONE_US.tel}`}
      className={
        dark
          ? "inline-flex items-center gap-2 mt-8 border-2 border-white text-white px-9 py-4 font-bold hover:bg-white hover:text-black transition-colors"
          : "inline-flex items-center gap-2 border-2 border-black px-8 py-4 font-bold hover:bg-black hover:text-white transition-colors"
      }
    >
      <Phone size={18} aria-hidden="true" /> Call {PHONE_US.display}
    </a>
  );
}

/** Prominent band for US pages: the US number, large and tappable. */
export function UsCallBand() {
  return (
    <section aria-label="Call our US line" className="px-6 lg:px-12 py-8 bg-black text-white">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">US team line</p>
          <p className="text-lg text-gray-200 mt-1">Prefer to talk it through? Call us about your project.</p>
        </div>
        <a
          href={`tel:${PHONE_US.tel}`}
          className="inline-flex items-center gap-3 bg-white text-black px-7 py-4 font-extrabold text-xl hover:bg-gray-200 transition-colors"
        >
          <Phone size={22} aria-hidden="true" /> {PHONE_US.display}
        </a>
      </div>
    </section>
  );
}
