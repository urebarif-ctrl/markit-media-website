import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="text-base font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">
      {children}
    </div>
  );
}

export function SectionTitle({ children, as: Tag = "h2" }: { children: ReactNode; as?: "h2" | "h3" | "h4" }) {
  return (
    <Tag className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight leading-tight">
      {children}
    </Tag>
  );
}

export function SectionDesc({ children }: { children: ReactNode }) {
  return (
    <p className="text-lg text-gray-500 leading-relaxed mt-4 max-w-2xl">
      {children}
    </p>
  );
}
