import Link from "next/link";
import { JsonLd } from "@/components/json-ld";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items, locale = "en", emitSchema = true }: { items: BreadcrumbItem[]; locale?: string; emitSchema?: boolean }) {
  const l = (path: string) => path.startsWith(`/${locale}`) ? path : `/${locale}${path}`;
  const filtered = items.filter((item) => item.label !== "Home");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://themarkitmedia.com/${locale}` },
      ...filtered.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.label,
        ...(item.href ? { item: `https://themarkitmedia.com${l(item.href)}` } : {}),
      })),
    ],
  };

  return (
    <>
      {emitSchema && <JsonLd data={breadcrumbSchema} />}
      <nav aria-label="Breadcrumb" className="px-6 lg:px-12 pt-20 -mb-14">
        <ol className="flex flex-wrap items-center gap-1.5 text-base text-gray-500 max-w-7xl mx-auto">
          <li>
            <Link href={`/${locale}/`} className="hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              Home
            </Link>
          </li>
          {filtered.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5">
              <span aria-hidden="true">/</span>
              {item.href ? (
                <Link href={l(item.href)} className="hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
                  {item.label}
                </Link>
              ) : (
                <span className="text-black font-medium" aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
