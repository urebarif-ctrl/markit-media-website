import { cookies } from "next/headers";

export type Locale = "en" | "ar" | "ur";
export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "ar", "ur"];
export const rtlLocales: Locale[] = ["ar", "ur"];

const dictionaries: Record<Locale, () => Promise<Record<string, any>>> = {
  en: () => import("./en.json").then((m) => m.default),
  ar: () => import("./ar.json").then((m) => m.default),
  ur: () => import("./ur.json").then((m) => m.default),
};

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
