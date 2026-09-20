"use client";

import { Counter } from "@/components/counter";

const stats = [
  { end: 100, suffix: "+", label: "Clients Served" },
  { end: 7, suffix: "", label: "Countries" },
  { end: 6, suffix: "+", label: "Years Experience" },
];

export function HeroStats() {
  return (
    <div className="flex flex-wrap items-center gap-8 mt-16 pt-8 border-t border-gray-200">
      {stats.map((stat) => (
        <div key={stat.label}>
          <div className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-black">
            <Counter end={stat.end} suffix={stat.suffix} />
          </div>
          <div className="text-base text-gray-500 mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
