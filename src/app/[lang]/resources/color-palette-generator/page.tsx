"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Color utilities                                                    */
/* ------------------------------------------------------------------ */

function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return null;
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return (
    "#" +
    [clamp(r), clamp(g), clamp(b)]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
  );
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / d + 2) / 6;
    else h = ((rn - gn) / d + 4) / 6;
  }

  return [h * 360, s * 100, l * 100];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const hn = h / 360;
  const sn = s / 100;
  const ln = l / 100;

  if (sn === 0) {
    const v = Math.round(ln * 255);
    return [v, v, v];
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tn = t;
    if (tn < 0) tn += 1;
    if (tn > 1) tn -= 1;
    if (tn < 1 / 6) return p + (q - p) * 6 * tn;
    if (tn < 1 / 2) return q;
    if (tn < 2 / 3) return p + (q - p) * (2 / 3 - tn) * 6;
    return p;
  };

  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;

  return [
    Math.round(hue2rgb(p, q, hn + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, hn) * 255),
    Math.round(hue2rgb(p, q, hn - 1 / 3) * 255),
  ];
}

function hslToHex(h: number, s: number, l: number): string {
  const [r, g, b] = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}

/* ------------------------------------------------------------------ */
/*  Contrast ratio (WCAG 2.1)                                         */
/* ------------------------------------------------------------------ */

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r / 255, g / 255, b / 255].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1: string, hex2: string): number | null {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return null;
  const l1 = relativeLuminance(...rgb1);
  const l2 = relativeLuminance(...rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function wcagLabel(ratio: number): string {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA Large";
  return "Fail";
}

/* ------------------------------------------------------------------ */
/*  Palette generation                                                 */
/* ------------------------------------------------------------------ */

type PaletteType =
  | "complementary"
  | "analogous"
  | "triadic"
  | "split-complementary"
  | "monochromatic";

interface PaletteColor {
  hex: string;
  label: string;
}

function generatePalette(hex: string, type: PaletteType): PaletteColor[] {
  const rgb = hexToRgb(hex);
  if (!rgb) return [];
  const [h, s, l] = rgbToHsl(...rgb);

  switch (type) {
    case "complementary":
      return [
        { hex, label: "Primary" },
        { hex: hslToHex((h + 180) % 360, s, l), label: "Complement" },
        { hex: hslToHex(h, s, Math.min(l + 15, 95)), label: "Primary Light" },
        { hex: hslToHex((h + 180) % 360, s, Math.min(l + 15, 95)), label: "Complement Light" },
        { hex: hslToHex(h, s, Math.max(l - 15, 5)), label: "Primary Dark" },
      ];

    case "analogous":
      return [
        { hex: hslToHex((h - 30 + 360) % 360, s, l), label: "Analogous -30" },
        { hex: hslToHex((h - 15 + 360) % 360, s, l), label: "Analogous -15" },
        { hex, label: "Primary" },
        { hex: hslToHex((h + 15) % 360, s, l), label: "Analogous +15" },
        { hex: hslToHex((h + 30) % 360, s, l), label: "Analogous +30" },
      ];

    case "triadic":
      return [
        { hex, label: "Primary" },
        { hex: hslToHex((h + 120) % 360, s, l), label: "Triadic 2" },
        { hex: hslToHex((h + 240) % 360, s, l), label: "Triadic 3" },
        { hex: hslToHex(h, s, Math.min(l + 20, 95)), label: "Primary Light" },
        { hex: hslToHex(h, s, Math.max(l - 20, 5)), label: "Primary Dark" },
      ];

    case "split-complementary":
      return [
        { hex, label: "Primary" },
        { hex: hslToHex((h + 150) % 360, s, l), label: "Split 1" },
        { hex: hslToHex((h + 210) % 360, s, l), label: "Split 2" },
        { hex: hslToHex(h, s, Math.min(l + 20, 95)), label: "Primary Light" },
        { hex: hslToHex(h, s, Math.max(l - 20, 5)), label: "Primary Dark" },
      ];

    case "monochromatic":
      return [
        { hex: hslToHex(h, s, Math.max(l - 30, 5)), label: "Darkest" },
        { hex: hslToHex(h, s, Math.max(l - 15, 10)), label: "Dark" },
        { hex, label: "Base" },
        { hex: hslToHex(h, s, Math.min(l + 15, 90)), label: "Light" },
        { hex: hslToHex(h, s, Math.min(l + 30, 95)), label: "Lightest" },
      ];
  }
}

const paletteTypes: { id: PaletteType; label: string; description: string }[] = [
  {
    id: "complementary",
    label: "Complementary",
    description: "Opposite on the color wheel. High contrast, great for CTAs and emphasis.",
  },
  {
    id: "analogous",
    label: "Analogous",
    description: "Adjacent colors. Harmonious and calming, ideal for cohesive brand palettes.",
  },
  {
    id: "triadic",
    label: "Triadic",
    description: "Three evenly spaced colors. Vibrant and balanced, perfect for dynamic brands.",
  },
  {
    id: "split-complementary",
    label: "Split-Complementary",
    description: "Two colors adjacent to the complement. Strong contrast with less tension.",
  },
  {
    id: "monochromatic",
    label: "Monochromatic",
    description: "Shades and tints of one hue. Elegant and minimal, ideal for professional brands.",
  },
];

/* ------------------------------------------------------------------ */
/*  Color psychology data                                              */
/* ------------------------------------------------------------------ */

const colorPsychology = [
  {
    color: "Red",
    swatch: "#DC2626",
    associations: "Energy, urgency, passion, excitement",
    marketing: "Clearance sales, food brands, CTAs. Creates urgency and grabs attention. Used by Coca-Cola, YouTube, and Netflix to evoke excitement.",
  },
  {
    color: "Blue",
    swatch: "#2563EB",
    associations: "Trust, stability, professionalism, calm",
    marketing: "Finance, healthcare, tech, B2B. Builds credibility and reliability. Used by Facebook, IBM, and PayPal to signal trustworthiness.",
  },
  {
    color: "Green",
    swatch: "#16A34A",
    associations: "Growth, health, nature, wealth",
    marketing: "Wellness, organic products, finance, sustainability. Communicates health and prosperity. Used by Whole Foods and Spotify.",
  },
  {
    color: "Yellow",
    swatch: "#EAB308",
    associations: "Optimism, warmth, clarity, caution",
    marketing: "Attention-grabbing accents, youth brands, food. Conveys cheerfulness. Used by McDonald's and Snapchat to feel approachable.",
  },
  {
    color: "Orange",
    swatch: "#EA580C",
    associations: "Creativity, enthusiasm, confidence, fun",
    marketing: "E-commerce CTAs, entertainment, food. Drives action without the intensity of red. Used by Amazon and Fanta.",
  },
  {
    color: "Purple",
    swatch: "#9333EA",
    associations: "Luxury, wisdom, creativity, royalty",
    marketing: "Premium brands, beauty, education. Suggests sophistication and imagination. Used by Cadbury and Hallmark.",
  },
  {
    color: "Black",
    swatch: "#171717",
    associations: "Sophistication, power, elegance, authority",
    marketing: "Luxury goods, fashion, high-end services. Communicates exclusivity and timelessness. Used by Chanel and Nike.",
  },
  {
    color: "White",
    swatch: "#F5F5F5",
    associations: "Simplicity, purity, cleanliness, space",
    marketing: "Minimalist brands, tech, healthcare. Creates breathing room and focuses attention on content. Used by Apple and Tesla.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */



export default function ColorPaletteGeneratorPage() {
  const [primaryHex, setPrimaryHex] = useState("#2563EB");
  const [inputValue, setInputValue] = useState("#2563EB");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const isValidHex = hexToRgb(inputValue) !== null;

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (hexToRgb(value) !== null) {
      setPrimaryHex(value);
    }
  };

  const handlePickerChange = (value: string) => {
    setPrimaryHex(value);
    setInputValue(value);
  };

  const copyToClipboard = useCallback(
    async (text: string, key: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 1500);
      } catch {
        /* clipboard not available */
      }
    },
    []
  );

  const copyFullPalette = useCallback(
    async (colors: PaletteColor[], label: string) => {
      const text = colors.map((c) => `${c.label}: ${c.hex}`).join("\n");
      try {
        await navigator.clipboard.writeText(text);
        setCopiedKey(`palette-${label}`);
        setTimeout(() => setCopiedKey(null), 1500);
      } catch {
        /* clipboard not available */
      }
    },
    []
  );

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Color Palette Generator",
          description: "Opposite on the color wheel. High contrast, great for CTAs and emphasis.",
          url: "https://themarkitmedia.com/en/resources/color-palette-generator",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Color Palette Generator | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/color-palette-generator" />
      <meta name="description" content="Opposite on the color wheel. High contrast, great for CTAs and emphasis." />
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/brand-name-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Name Generator</Link>
                <Link href="/resources/brand-name-evaluator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Name Evaluator</Link>
                <Link href="/resources/brand-voice-generator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Voice Generator</Link>
                <Link href="/resources/brand-voice-checker" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Brand Voice Checker</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Color Palette Generator",
          description:
            "Generate complementary, analogous, triadic, split-complementary, and monochromatic color palettes for branding and marketing with WCAG contrast ratios.",
          applicationCategory: "DesignApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Color Palette Generator" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Color Palette Generator
            </h1>
            <SectionDesc>
              Generate brand-ready color palettes from any primary color. See complementary, analogous, triadic, split-complementary, and monochromatic schemes with WCAG contrast ratios.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Color Input ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <label
              htmlFor="primary-color"
              className="block text-base font-bold text-black mb-2"
            >
              Primary Color
            </label>
            <div className="flex items-center gap-3 mb-2">
              <input
                type="color"
                value={isValidHex ? inputValue : primaryHex}
                onChange={(e) => handlePickerChange(e.target.value)}
                className="w-14 h-14 min-h-[44px] border border-gray-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                aria-label="Color picker"
              />
              <input
                id="primary-color"
                type="text"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="#2563EB"
                className={`flex-1 border px-4 py-3 text-base font-mono min-h-[44px] transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                  isValidHex ? "border-gray-300" : "border-gray-400"
                }`}
              />
            </div>
            {!isValidHex && inputValue.length > 0 && (
              <p className="text-base text-gray-500 mt-1">
                Enter a valid 6-digit hex code (e.g. #2563EB)
              </p>
            )}
          </Animate>
        </div>
      </section>

      {/* ---- Generated Palettes ---- */}
      {isValidHex && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-16">
          <div className="max-w-5xl mx-auto">
            <Stagger stagger={120} animation="fade-up" className="space-y-12">
              {paletteTypes.map((pt) => {
                const colors = generatePalette(primaryHex, pt.id);
                return (
                  <div key={pt.id}>
                    <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
                      <div>
                        <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                          {pt.label}
                        </h2>
                        <p className="text-base text-gray-500 mt-1">
                          {pt.description}
                        </p>
                      </div>
                      <button
                        onClick={() => copyFullPalette(colors, pt.id)}
                        className="border border-gray-200 px-4 py-2 text-base font-medium text-black min-h-[44px] hover:bg-gray-50 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                      >
                        {copiedKey === `palette-${pt.id}`
                          ? "Copied!"
                          : "Copy Palette"}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                      {colors.map((color, ci) => {
                        const whiteRatio = contrastRatio(color.hex, "#ffffff");
                        const blackRatio = contrastRatio(color.hex, "#000000");
                        const swatchKey = `${pt.id}-${ci}`;
                        return (
                          <button
                            key={ci}
                            onClick={() =>
                              copyToClipboard(color.hex, swatchKey)
                            }
                            className="group text-left border border-gray-200 overflow-hidden min-h-[44px] transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 hover:border-black"
                            aria-label={`Copy ${color.hex}`}
                          >
                            <div
                              className="h-24 w-full"
                              style={{ backgroundColor: color.hex }}
                            />
                            <div className="p-3">
                              <p className="text-base font-bold font-mono text-black">
                                {copiedKey === swatchKey
                                  ? "Copied!"
                                  : color.hex}
                              </p>
                              <p className="text-base text-gray-500 mt-0.5">
                                {color.label}
                              </p>
                              <div className="mt-2 space-y-1">
                                <p className="text-base text-gray-500">
                                  <span className="font-medium text-black">
                                    vs White:
                                  </span>{" "}
                                  {whiteRatio
                                    ? `${whiteRatio.toFixed(1)}:1 (${wcagLabel(whiteRatio)})`
                                    : "--"}
                                </p>
                                <p className="text-base text-gray-500">
                                  <span className="font-medium text-black">
                                    vs Black:
                                  </span>{" "}
                                  {blackRatio
                                    ? `${blackRatio.toFixed(1)}:1 (${wcagLabel(blackRatio)})`
                                    : "--"}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}

      {/* ---- Color Psychology Section ---- */}
      <section aria-label="Education" className="px-6 lg:px-12 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Education</SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight mt-3">
              Color Psychology in Marketing
            </h2>
            <SectionDesc>
              Colors influence perception, trust, and buying decisions. Here is how each color is used strategically in branding and advertising.
            </SectionDesc>
          </Animate>

          <Stagger stagger={80} animation="fade-up" className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {colorPsychology.map((item) => (
              <div
                key={item.color}
                className="border border-gray-200 bg-white p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-8 h-8 border border-gray-200 flex-shrink-0"
                    style={{ backgroundColor: item.swatch }}
                  />
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black">
                    {item.color}
                  </h3>
                </div>
                <p className="text-base text-gray-500 mb-2">
                  <span className="font-medium text-black">Associations:</span>{" "}
                  {item.associations}
                </p>
                <p className="text-base text-gray-500">
                  <span className="font-medium text-black">In marketing:</span>{" "}
                  {item.marketing}
                </p>
              </div>
            ))}
          </Stagger>

          <Animate animation="fade-up">
            <div className="mt-10 border border-gray-200 bg-white p-6">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-3">
                Tips for Choosing Brand Colors
              </h3>
              <ul className="space-y-3 text-base text-gray-500">
                <li>
                  <span className="font-medium text-black">Start with one primary color</span>{" "}
                  that reflects your brand personality and industry. Every other color in your palette should support it.
                </li>
                <li>
                  <span className="font-medium text-black">Limit your palette to 3-5 colors.</span>{" "}
                  A primary, a secondary, and 1-3 accent or neutral tones cover most brand needs.
                </li>
                <li>
                  <span className="font-medium text-black">Always check contrast ratios.</span>{" "}
                  A beautiful palette that fails accessibility standards will cost you audience reach and can create legal risk.
                </li>
                <li>
                  <span className="font-medium text-black">Test across contexts.</span>{" "}
                  Colors look different on screens, in print, and at different sizes. Verify your palette in real usage before committing.
                </li>
                <li>
                  <span className="font-medium text-black">Consider cultural context.</span>{" "}
                  Color meanings vary across cultures. If your brand is global, research how your chosen colors are perceived in target markets.
                </li>
              </ul>
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- CTA Section ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need a Complete Brand Identity?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our design team builds cohesive brand systems -- from color palettes and typography to full visual identities that convert.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base min-h-[44px] hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Start Your Brand Project &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Color Palette Generator"
        services={[
          { title: "Branding", desc: "Strategic brand identity that differentiates you in your market.", href: "/services/branding" },
          { title: "Website Development", desc: "Websites that bring your brand to life with exceptional UX.", href: "/services/website-development" },
          { title: "Digital Marketing", desc: "Amplify your brand across every digital touchpoint.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Channel Recommender", href: "/resources/channel-recommender" },
          { title: "Channel Selector", href: "/resources/channel-selector" },
          { title: "Client Onboarding Checklist", href: "/resources/client-onboarding-checklist" },
          { title: "Client Reporting Dashboard", href: "/resources/client-reporting-dashboard" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
