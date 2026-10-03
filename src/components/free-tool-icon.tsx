import { BarChart3, Braces, Calculator, FileText, Globe2, Mail, Megaphone, Palette, Search, Target, Users, Wrench } from "lucide-react";

const iconMap = {
  "SEO & Technical": Search,
  "Content & Copywriting": FileText,
  "Social Media": Users,
  "Email Marketing": Mail,
  "PPC & Advertising": Megaphone,
  "Analytics & Reporting": BarChart3,
  "Branding & Design": Palette,
  "Website & CRO": Globe2,
  "Strategy & Planning": Target,
  "Competitive Analysis": BarChart3,
  "Customer & Lead Generation": Users,
  "Marketing Technology": Braces,
  "Guides & Benchmarks": FileText,
} as const;

export function FreeToolIcon({ category }: { category: string }) {
  const Icon = iconMap[category as keyof typeof iconMap] || Wrench;
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-black transition-colors group-hover:border-black/20 group-hover:bg-black group-hover:text-white" aria-hidden="true">
      <Icon size={18} strokeWidth={1.8} />
    </span>
  );
}

export function FreeToolMiniIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();
  const Icon = lower.includes("calculator") || lower.includes("roi") || lower.includes("budget") ? Calculator : lower.includes("website") || lower.includes("cro") ? Globe2 : lower.includes("seo") || lower.includes("keyword") ? Search : lower.includes("brand") || lower.includes("color") ? Palette : lower.includes("email") ? Mail : lower.includes("social") || lower.includes("hashtag") ? Users : lower.includes("ad ") || lower.includes("ppc") ? Megaphone : FileText;
  return <Icon size={17} strokeWidth={1.8} aria-hidden="true" />;
}
