import Link from "next/link";
import { JsonLd } from "@/components/json-ld";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const filtered = items.filter((item) => item.label !== "Home" || item.href !== "/");

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://themarkitmedia.com/en" },
      ...filtered.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.label,
        ...(item.href ? { item: `https://themarkitmedia.com/en${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav aria-label="Breadcrumb" className="px-6 lg:px-12 pt-20 -mb-14">
        <ol className="flex flex-wrap items-center gap-1.5 text-base text-gray-500 max-w-7xl mx-auto">
          <li>
            <Link href="/" className="hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
              Home
            </Link>
          </li>
          {filtered.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5">
              <span aria-hidden="true">/</span>
              {item.href ? (
                <Link href={item.href} className="hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
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
