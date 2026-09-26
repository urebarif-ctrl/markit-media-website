"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Project = { title: string; service: string; href: string };

const direct: Record<string, Project[]> = {
  "automotive": [{ title: "American Auto Parts", service: "Video Production", href: "/work/american-auto-parts" }],
  "real-estate": [
    { title: "NoorShad", service: "Video Production & Content", href: "/work/noorshad" },
    { title: "One Homes", service: "Video Production", href: "/work/one-homes" },
  ],
  "healthcare": [{ title: "Pur Health", service: "Web Development & Social", href: "/work/pur-health" }],
  "rehab-recovery": [{ title: "Pur Health", service: "Healthcare Digital Presence", href: "/work/pur-health" }],
  "fashion": [
    { title: "Minhaz Couture", service: "Web Development & Social", href: "/work/minhaz-couture" },
    { title: "Fashion Feed", service: "Fashion Creative", href: "/work/fashion-feed" },
  ],
  "ecommerce": [
    { title: "Minhaz Couture", service: "E-commerce Web & Social", href: "/work/minhaz-couture" },
    { title: "Fashion Feed", service: "E-commerce Creative", href: "/work/fashion-feed" },
  ],
  "restaurants": [{ title: "FoodFolio", service: "Food & Beverage Creative", href: "/work/foodfolio" }],
  "hospitality": [{ title: "FoodFolio", service: "Food & Hospitality Creative", href: "/work/foodfolio" }],
  "food-ingredients-ecommerce": [{ title: "FoodFolio", service: "Food Brand Creative", href: "/work/foodfolio" }],
  "saas": [{ title: "MeezoTech", service: "Technology Branding & Motion", href: "/work/meezotech" }],
  "b2b": [{ title: "MeezoTech", service: "B2B Technology Branding", href: "/work/meezotech" }],
  "manufacturing": [{ title: "Cambridge Electrical Appliances", service: "Product Social Campaigns", href: "/work/cambridge-electrical" }],
  "nonprofits": [{ title: "Shahid Afridi Foundation", service: "Video Production", href: "/work" }],
  "professional-services": [{ title: "NoorShad", service: "Personal & Professional Content", href: "/work/noorshad" }],
  "personal-branding": [{ title: "NoorShad", service: "Personal Brand Video Content", href: "/work/noorshad" }],
  "ev-chargers": [{ title: "HUBCO", service: "Energy Brand & Video", href: "/work/hubco" }],
  "finance": [{ title: "HUBCO", service: "Corporate Brand & Video", href: "/work/hubco" }],
};

const fallback: Project[] = [
  { title: "Paid Media & Lead Generation", service: "Performance Marketing", href: "/services/performance-marketing" },
  { title: "Website & Conversion Work", service: "Website Development", href: "/services/website-development" },
  { title: "Creative & Social Portfolio", service: "Social Media & Creative", href: "/work/social-media-designs" },
];

export function IndustryProjectStrip() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const industryIndex = parts.indexOf("industries");
  if (industryIndex < 0 || !parts[industryIndex + 1]) return null;
  const slug = parts[industryIndex + 1];
  const projects = direct[slug] ?? fallback;

  return <section className="px-6 lg:px-12 py-20 bg-[#f7f5ff] border-y border-[#e8e2ff]" aria-label="Relevant projects and proof">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#5A3ED6]">Relevant proof</p><h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold mt-3">Work and capabilities relevant to this industry</h2><p className="text-gray-500 mt-3 max-w-3xl">See public examples where we have a close industry match, plus the delivery capabilities most commonly used for this market.</p></div>
        <Link href="/case-studies" className="font-bold underline shrink-0">Browse all case studies →</Link>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mt-8">{projects.map((project) => <Link key={project.title + project.href} href={project.href} className="group bg-white border border-gray-200 p-6 min-h-40 flex flex-col hover:border-black hover:shadow-lg transition-all"><span className="text-xs font-bold uppercase tracking-[0.12em] text-gray-400">{project.service}</span><h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold mt-4 group-hover:underline">{project.title}</h3><span className="mt-auto pt-5 text-sm font-bold">View relevant work →</span></Link>)}</div>
    </div>
  </section>;
}
