import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { BackToTop } from "@/components/back-to-top";
import { CookieConsent } from "@/components/cookie-consent";
import { Analytics } from "@/components/analytics";

import { getDictionary, setLocale, isRtl, type Locale, locales } from "@/i18n/dictionaries";
import "../globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Markit Media — Full-Stack Digital Marketing Agency",
    template: "%s | Markit Media",
  },
  description: "Full-stack digital marketing, website development, and creative services for businesses across the USA, Canada, UAE, UK, Australia, and Saudi Arabia.",
  metadataBase: new URL("https://themarkitmedia.com"),
  robots: process.env.PRODUCTION_DEPLOY === "true"
    ? { index: true, follow: true }
    : { index: false, follow: false },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : "en") as Locale;
  setLocale(locale);
  const dir = isRtl(locale) ? "rtl" : "ltr";
  const t = await getDictionary(locale);

  return (
    <html lang={locale} dir={dir} className={`${plusJakarta.variable} ${inter.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Markit Media",
          url: "https://themarkitmedia.com",
          logo: "https://themarkitmedia.com/images/branding/og-image.png",
          sameAs: [],
          contactPoint: { "@type": "ContactPoint", email: "ciao@themarkitmedia.com", contactType: "customer service" },
        }} />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Markit Media",
          url: "https://themarkitmedia.com",
          potentialAction: {
            "@type": "SearchAction",
            target: { "@type": "EntryPoint", urlTemplate: "https://themarkitmedia.com/en/blog?q={search_term_string}" },
            "query-input": "required name=search_term_string",
          },
        }} />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-black focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold">
          {t.common.skipToMainContent}
        </a>
        <Nav locale={locale} translations={{ nav: t.nav, common: t.common, accessibility: t.accessibility }} />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer locale={locale} translations={{ footer: t.footer, nav: t.nav, common: t.common, cta: t.cta, accessibility: t.accessibility }} />
        <BackToTop />

        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
