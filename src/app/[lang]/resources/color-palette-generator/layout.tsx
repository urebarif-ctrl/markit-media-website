import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Palette Generator — Build Harmonious Brand Colors",
  description:
    "Use our free color palette generator to create harmonious brand color schemes from a single base color. Get complementary, analogous, and triadic palettes with hex codes.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/color-palette-generator" },
  openGraph: {
    title: "Free Brand Color Palette Generator",
    description:
      "Generate harmonious color palettes from a base color. Get complementary, analogous, and triadic schemes with hex codes.",
  },
};

export default function ColorPaletteGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
