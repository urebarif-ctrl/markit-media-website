/**
 * Phone numbers: country list, per-country validation and E.164 formatting.
 * Shared by the browser forms and the API routes so both enforce the same rules.
 * India and Nigeria are intentionally absent: the site blocks visitors from those countries (src/proxy.ts).
 * Lengths are national significant numbers (without the country code or a leading trunk 0).
 */
export type Country = { iso: string; name: string; dial: string; min: number; max: number; keepZero?: boolean; group: "serving" | "other" };

const S = "serving" as const;
const O = "other" as const;

export const COUNTRIES: Country[] = [
  // Countries Markit Media serves (shown first). The default is the United States.
  { iso: "US", name: "United States", dial: "1", min: 10, max: 10, group: S },
  { iso: "CA", name: "Canada", dial: "1", min: 10, max: 10, group: S },
  { iso: "GB", name: "United Kingdom", dial: "44", min: 9, max: 10, group: S },
  { iso: "AU", name: "Australia", dial: "61", min: 9, max: 9, group: S },
  { iso: "AE", name: "United Arab Emirates", dial: "971", min: 8, max: 9, group: S },
  { iso: "SA", name: "Saudi Arabia", dial: "966", min: 8, max: 9, group: S },
  { iso: "PK", name: "Pakistan", dial: "92", min: 9, max: 10, group: S },
  // Other widely used countries
  { iso: "BD", name: "Bangladesh", dial: "880", min: 9, max: 10, group: O },
  { iso: "LK", name: "Sri Lanka", dial: "94", min: 9, max: 9, group: O },
  { iso: "QA", name: "Qatar", dial: "974", min: 8, max: 8, group: O },
  { iso: "KW", name: "Kuwait", dial: "965", min: 8, max: 8, group: O },
  { iso: "BH", name: "Bahrain", dial: "973", min: 8, max: 8, group: O },
  { iso: "OM", name: "Oman", dial: "968", min: 8, max: 8, group: O },
  { iso: "TR", name: "Türkiye", dial: "90", min: 10, max: 10, group: O },
  { iso: "EG", name: "Egypt", dial: "20", min: 9, max: 10, group: O },
  { iso: "ZA", name: "South Africa", dial: "27", min: 9, max: 9, group: O },
  { iso: "KE", name: "Kenya", dial: "254", min: 9, max: 9, group: O },
  { iso: "IE", name: "Ireland", dial: "353", min: 7, max: 9, group: O },
  { iso: "NZ", name: "New Zealand", dial: "64", min: 8, max: 10, group: O },
  { iso: "DE", name: "Germany", dial: "49", min: 10, max: 11, group: O },
  { iso: "FR", name: "France", dial: "33", min: 9, max: 9, group: O },
  { iso: "ES", name: "Spain", dial: "34", min: 9, max: 9, group: O },
  { iso: "IT", name: "Italy", dial: "39", min: 9, max: 11, keepZero: true, group: O },
  { iso: "NL", name: "Netherlands", dial: "31", min: 9, max: 9, group: O },
  { iso: "SE", name: "Sweden", dial: "46", min: 7, max: 10, group: O },
  { iso: "CH", name: "Switzerland", dial: "41", min: 9, max: 9, group: O },
  { iso: "SG", name: "Singapore", dial: "65", min: 8, max: 8, group: O },
  { iso: "MY", name: "Malaysia", dial: "60", min: 9, max: 10, group: O },
  { iso: "PH", name: "Philippines", dial: "63", min: 10, max: 10, group: O },
  { iso: "ID", name: "Indonesia", dial: "62", min: 9, max: 12, group: O },
  { iso: "MX", name: "Mexico", dial: "52", min: 10, max: 10, group: O },
  { iso: "BR", name: "Brazil", dial: "55", min: 10, max: 11, group: O },
];

export const DEFAULT_COUNTRY = "US";
export const countryByIso = (iso: string) => COUNTRIES.find((c) => c.iso === iso);

export type PhoneResult = { ok: true; e164: string; iso: string } | { ok: false; error: string };

const MSG = "Enter a valid phone number for the selected country.";

/** Validate a number typed for a chosen country and return it in E.164 (+<dial><digits>). */
export function normalizePhone(iso: string, input: string): PhoneResult {
  const c = countryByIso(iso);
  if (!c) return { ok: false, error: "Choose a country for the phone number." };
  if (/[^\d\s().+\-]/.test(input)) return { ok: false, error: "Use digits only (spaces, dashes and brackets are fine)." };
  let digits = input.replace(/\D/g, "");
  // Allow pasting the full international form: +1 555..., 00 44 ..., or a US/Canada number with a leading 1.
  const intl = /^\s*(\+|00)/.test(input);
  if (intl) { digits = digits.replace(/^00/, ""); if (digits.startsWith(c.dial)) digits = digits.slice(c.dial.length); }
  else if (c.dial === "1" && digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  if (!c.keepZero) digits = digits.replace(/^0+/, "");
  if (digits.length < c.min || digits.length > c.max) return { ok: false, error: MSG };
  if (c.dial === "1" && !/^[2-9]\d{2}[2-9]\d{6}$/.test(digits)) return { ok: false, error: "Enter a valid 10-digit US or Canadian number, area code first." };
  return { ok: true, e164: `+${c.dial}${digits}`, iso: c.iso };
}

/** Server-side check of a number received as E.164, optionally with the chosen country. */
export function validateE164(value: unknown, iso?: unknown): PhoneResult {
  const v = typeof value === "string" ? value.trim() : "";
  if (!/^\+[1-9]\d{7,14}$/.test(v)) return { ok: false, error: "A valid phone number is required." };
  const candidates = typeof iso === "string" && countryByIso(iso) ? [countryByIso(iso)!] : COUNTRIES.filter((c) => v.startsWith(`+${c.dial}`));
  for (const c of candidates) {
    if (!v.startsWith(`+${c.dial}`)) continue;
    const r = normalizePhone(c.iso, v.slice(c.dial.length + 1));
    if (r.ok && r.e164 === v) return r;
  }
  // Numbers from countries not in our list are accepted only when they are plain E.164 with a plausible length.
  if (!iso && !COUNTRIES.some((c) => v.startsWith(`+${c.dial}`)) && v.length >= 9) return { ok: true, e164: v, iso: "" };
  return { ok: false, error: "A valid phone number is required." };
}
