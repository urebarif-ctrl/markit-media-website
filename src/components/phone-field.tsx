"use client";

import { useId, useState } from "react";
import { COUNTRIES, DEFAULT_COUNTRY, normalizePhone } from "@/lib/phone";

type Props = {
  /** Name of the hidden field that carries the validated E.164 number (read by FormData-based forms). */
  name?: string;
  id?: string;
  label?: string;
  className?: string; // classes for the number input (and select)
  labelClassName?: string;
  placeholder?: string;
  defaultCountry?: string;
  /** Controlled usage: called with the E.164 number ("" while invalid) and the chosen country. */
  onChange?: (e164: string, iso: string) => void;
  compact?: boolean; // hides the visible label (screen-reader label stays)
};

/**
 * Required phone field with a country picker (default United States).
 * The visible number input is validated per country; the hidden `phone` field only ever holds a valid E.164 number.
 */
export function PhoneField({ name = "phone", id, label = "Phone *", className = "", labelClassName = "", placeholder, defaultCountry = DEFAULT_COUNTRY, onChange, compact }: Props) {
  const auto = useId();
  const base = id ?? auto;
  const [iso, setIso] = useState(defaultCountry);
  const [national, setNational] = useState("");
  const [touched, setTouched] = useState(false);
  const result = normalizePhone(iso, national);
  const e164 = result.ok ? result.e164 : "";
  const showError = touched && !result.ok;
  const sample = iso === "US" || iso === "CA" ? "(555) 123-4567" : "Phone number";

  const emit = (nextIso: string, nextNational: string) => {
    const r = normalizePhone(nextIso, nextNational);
    onChange?.(r.ok ? r.e164 : "", nextIso);
  };

  return (
    <div>
      <label htmlFor={`${base}-number`} className={compact ? "sr-only" : labelClassName}>{label}</label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <select
          aria-label="Country code"
          id={`${base}-country`}
          value={iso}
          onChange={(e) => { setIso(e.target.value); emit(e.target.value, national); }}
          className={`${className} w-full shrink-0 appearance-none bg-white sm:w-[11.5rem]`}
        >
          <optgroup label="Where we work">
            {COUNTRIES.filter((x) => x.group === "serving").map((x) => <option key={x.iso} value={x.iso}>{x.iso} +{x.dial} · {x.name}</option>)}
          </optgroup>
          <optgroup label="Other countries">
            {COUNTRIES.filter((x) => x.group === "other").map((x) => <option key={x.iso} value={x.iso}>{x.iso} +{x.dial} · {x.name}</option>)}
          </optgroup>
        </select>
        <input
          type="tel"
          id={`${base}-number`}
          inputMode="tel"
          autoComplete="tel-national"
          required
          value={national}
          placeholder={placeholder ?? sample}
          aria-invalid={showError || undefined}
          aria-describedby={showError ? `${base}-err` : undefined}
          onChange={(e) => { setNational(e.target.value); emit(iso, e.target.value); }}
          onBlur={() => setTouched(true)}
          className={`${className} w-full min-w-0 sm:flex-1`}
        />
      </div>
      <input type="hidden" name={name} value={e164} />
      <input type="hidden" name={`${name}Country`} value={iso} />
      {showError && !result.ok && <p id={`${base}-err`} role="alert" className="mt-1.5 text-sm font-medium text-red-700">{result.error}</p>}
      {!showError && !compact && <p className="mt-1 text-xs text-gray-500">We may reach you by call or WhatsApp.</p>}
    </div>
  );
}
