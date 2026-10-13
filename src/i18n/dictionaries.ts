export type Locale = "en" | "ar" | "ur";
export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "ar", "ur"];
export const rtlLocales: Locale[] = ["ar", "ur"];

const dictionaries: Record<Locale, () => Promise<Record<string, any>>> = {
  en: () => import("./en.json").then((m) => m.default),
  ar: () => import("./ar.json").then((m) => m.default),
  ur: () => import("./ur.json").then((m) => m.default),
};

/**
 * WARNING: Module-level mutable state.
 *
 * In serverless / edge environments, concurrent requests may share this
 * module instance, so one request's setLocale() can overwrite another's
 * value before getLocale() is read.  This is currently safe because:
 *   1. setLocale() is only called from the root layout (layout.tsx),
 *   2. getDictionary() always receives an explicit `locale` argument
 *      from the [lang] route param, so it never falls back to this value
 *      in practice.
 *
 * If locale resolution is ever needed outside the layout→component prop
 * chain, replace this with React cache() or AsyncLocalStorage to avoid
 * cross-request contamination.
 */
let currentLocale: Locale = defaultLocale;

export function setLocale(locale: Locale) {
  currentLocale = locale;
}

export function getLocale(): Locale {
  return currentLocale;
}

export async function getDictionary(locale?: Locale) {
  const l = locale || currentLocale;
  return dictionaries[l]();
}

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}
