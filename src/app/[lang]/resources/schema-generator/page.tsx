"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { ToolCTA } from "@/components/tool-cta";

/* ---------- types ---------- */

type SchemaType =
  | "LocalBusiness"
  | "Organization"
  | "Product"
  | "FAQPage"
  | "Article"
  | "BreadcrumbList";

interface FAQPair {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

/* ---------- helpers ---------- */

function strip(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === "" || v === undefined || v === null) continue;
    if (typeof v === "object" && !Array.isArray(v)) {
      const nested = strip(v as Record<string, unknown>);
      if (Object.keys(nested).length > 0) out[k] = nested;
    } else {
      out[k] = v;
    }
  }
  return out;
}

/* ---------- sub-forms ---------- */

function InputField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-base font-bold text-black mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
      />
      {hint && <p className="text-base text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

/* --- LocalBusiness --- */

function LocalBusinessForm({
  data,
  setData,
}: {
  data: Record<string, string>;
  setData: (d: Record<string, string>) => void;
}) {
  const set = (k: string) => (v: string) => setData({ ...data, [k]: v });
  return (
    <div className="space-y-6">
      <InputField id="lb-name" label="Business Name" value={data.name ?? ""} onChange={set("name")} placeholder="Acme Plumbing" />
      <InputField id="lb-desc" label="Description" value={data.description ?? ""} onChange={set("description")} placeholder="Full-service plumbing company..." />
      <InputField id="lb-url" label="Website URL" value={data.url ?? ""} onChange={set("url")} placeholder="https://example.com" type="url" />
      <InputField id="lb-phone" label="Phone" value={data.phone ?? ""} onChange={set("phone")} placeholder="+1-555-123-4567" type="tel" />
      <InputField id="lb-email" label="Email" value={data.email ?? ""} onChange={set("email")} placeholder="info@example.com" type="email" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField id="lb-street" label="Street Address" value={data.street ?? ""} onChange={set("street")} placeholder="123 Main St" />
        <InputField id="lb-city" label="City" value={data.city ?? ""} onChange={set("city")} placeholder="New York" />
        <InputField id="lb-state" label="State / Region" value={data.state ?? ""} onChange={set("state")} placeholder="NY" />
        <InputField id="lb-zip" label="Postal Code" value={data.zip ?? ""} onChange={set("zip")} placeholder="10001" />
        <InputField id="lb-country" label="Country" value={data.country ?? ""} onChange={set("country")} placeholder="US" />
      </div>
      <InputField id="lb-hours" label="Opening Hours" value={data.openingHours ?? ""} onChange={set("openingHours")} placeholder="Mo-Fr 09:00-17:00" hint="Use ISO 8601 format, e.g. Mo-Fr 09:00-17:00" />
      <InputField id="lb-price" label="Price Range" value={data.priceRange ?? ""} onChange={set("priceRange")} placeholder="$$" hint="Use $ signs or a text range" />
      <InputField id="lb-image" label="Image URL" value={data.image ?? ""} onChange={set("image")} placeholder="https://example.com/photo.jpg" type="url" />
    </div>
  );
}

function buildLocalBusiness(data: Record<string, string>) {
  const address =
    data.street || data.city || data.state || data.zip || data.country
      ? {
          "@type": "PostalAddress",
          streetAddress: data.street,
          addressLocality: data.city,
          addressRegion: data.state,
          postalCode: data.zip,
          addressCountry: data.country,
        }
      : undefined;
  return strip({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: data.name,
    description: data.description,
    url: data.url,
    telephone: data.phone,
    email: data.email,
    address: address ? strip(address as unknown as Record<string, unknown>) : undefined,
    openingHours: data.openingHours,
    priceRange: data.priceRange,
    image: data.image,
  });
}

/* --- Organization --- */

function OrganizationForm({
  data,
  setData,
  sameAs,
  setSameAs,
}: {
  data: Record<string, string>;
  setData: (d: Record<string, string>) => void;
  sameAs: string[];
  setSameAs: (s: string[]) => void;
}) {
  const set = (k: string) => (v: string) => setData({ ...data, [k]: v });
  return (
    <div className="space-y-6">
      <InputField id="org-name" label="Organization Name" value={data.name ?? ""} onChange={set("name")} placeholder="Acme Inc." />
      <InputField id="org-desc" label="Description" value={data.description ?? ""} onChange={set("description")} placeholder="Leading provider of..." />
      <InputField id="org-url" label="Website URL" value={data.url ?? ""} onChange={set("url")} placeholder="https://example.com" type="url" />
      <InputField id="org-logo" label="Logo URL" value={data.logo ?? ""} onChange={set("logo")} placeholder="https://example.com/logo.png" type="url" />
      <InputField id="org-email" label="Email" value={data.email ?? ""} onChange={set("email")} placeholder="info@example.com" type="email" />
      <InputField id="org-phone" label="Phone" value={data.phone ?? ""} onChange={set("phone")} placeholder="+1-555-123-4567" type="tel" />
      <div>
        <p className="block text-base font-bold text-black mb-2">Social Links</p>
        {sameAs.map((link, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="url"
              value={link}
              onChange={(e) => {
                const updated = [...sameAs];
                updated[i] = e.target.value;
                setSameAs(updated);
              }}
              placeholder="https://twitter.com/yourcompany"
              className="flex-1 border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            />
            {sameAs.length > 1 && (
              <button
                type="button"
                onClick={() => setSameAs(sameAs.filter((_, idx) => idx !== i))}
                className="min-w-[44px] min-h-[44px] border border-gray-300 px-3 py-3 text-base font-bold text-black hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => setSameAs([...sameAs, ""])}
          className="min-h-[44px] border border-black px-4 py-3 text-base font-bold text-black hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 mt-1"
        >
          + Add Social Link
        </button>
      </div>
    </div>
  );
}

function buildOrganization(data: Record<string, string>, sameAs: string[]) {
  const filtered = sameAs.filter((s) => s.trim() !== "");
  return strip({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    description: data.description,
    url: data.url,
    logo: data.logo,
    email: data.email,
    telephone: data.phone,
    sameAs: filtered.length > 0 ? filtered : undefined,
  } as unknown as Record<string, unknown>);
}

/* --- Product --- */

function ProductForm({
  data,
  setData,
}: {
  data: Record<string, string>;
  setData: (d: Record<string, string>) => void;
}) {
  const set = (k: string) => (v: string) => setData({ ...data, [k]: v });
  return (
    <div className="space-y-6">
      <InputField id="prod-name" label="Product Name" value={data.name ?? ""} onChange={set("name")} placeholder="Running Shoes Pro" />
      <InputField id="prod-desc" label="Description" value={data.description ?? ""} onChange={set("description")} placeholder="High-performance running shoes..." />
      <InputField id="prod-brand" label="Brand" value={data.brand ?? ""} onChange={set("brand")} placeholder="Nike" />
      <InputField id="prod-sku" label="SKU" value={data.sku ?? ""} onChange={set("sku")} placeholder="SKU-12345" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField id="prod-price" label="Price" value={data.price ?? ""} onChange={set("price")} placeholder="99.99" />
        <InputField id="prod-currency" label="Currency" value={data.currency ?? ""} onChange={set("currency")} placeholder="USD" />
      </div>
      <div>
        <label htmlFor="prod-avail" className="block text-base font-bold text-black mb-2">
          Availability
        </label>
        <select
          id="prod-avail"
          value={data.availability ?? ""}
          onChange={(e) => set("availability")(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 bg-white min-h-[44px]"
        >
          <option value="">Select availability</option>
          <option value="https://schema.org/InStock">In Stock</option>
          <option value="https://schema.org/OutOfStock">Out of Stock</option>
          <option value="https://schema.org/PreOrder">Pre-Order</option>
        </select>
      </div>
      <InputField id="prod-image" label="Image URL" value={data.image ?? ""} onChange={set("image")} placeholder="https://example.com/product.jpg" type="url" />
      <InputField id="prod-url" label="Product URL" value={data.url ?? ""} onChange={set("url")} placeholder="https://example.com/product" type="url" />
    </div>
  );
}

function buildProduct(data: Record<string, string>) {
  const offers =
    data.price || data.currency || data.availability
      ? strip({
          "@type": "Offer",
          price: data.price,
          priceCurrency: data.currency,
          availability: data.availability,
          url: data.url,
        })
      : undefined;
  return strip({
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.name,
    description: data.description,
    brand: data.brand ? { "@type": "Brand", name: data.brand } : undefined,
    sku: data.sku,
    image: data.image,
    url: data.url,
    offers,
  } as unknown as Record<string, unknown>);
}

/* --- FAQPage --- */

function FAQForm({
  items,
  setItems,
}: {
  items: FAQPair[];
  setItems: (p: FAQPair[]) => void;
}) {
  return (
    <div className="space-y-6">
      {items.map((pair, i) => (
        <div key={i} className="border border-gray-200 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-base font-bold text-black">Q&A Pair {i + 1}</p>
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => setItems(items.filter((_, idx) => idx !== i))}
                className="min-w-[44px] min-h-[44px] px-3 py-2 text-base font-bold text-black border border-gray-300 hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Remove
              </button>
            )}
          </div>
          <InputField
            id={`faq-q-${i}`}
            label="Question"
            value={pair.question}
            onChange={(v) => {
              const updated = [...items];
              updated[i] = { ...updated[i], question: v };
              setItems(updated);
            }}
            placeholder="What is your return policy?"
          />
          <div>
            <label htmlFor={`faq-a-${i}`} className="block text-base font-bold text-black mb-2">
              Answer
            </label>
            <textarea
              id={`faq-a-${i}`}
              value={pair.answer}
              onChange={(e) => {
                const updated = [...items];
                updated[i] = { ...updated[i], answer: e.target.value };
                setItems(updated);
              }}
              placeholder="We offer a 30-day return policy..."
              rows={3}
              className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
            />
          </div>
        </div>
      ))}
      {items.length < 10 && (
        <button
          type="button"
          onClick={() => setItems([...items, { question: "", answer: "" }])}
          className="min-h-[44px] border border-black px-4 py-3 text-base font-bold text-black hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
        >
          + Add Q&A Pair
        </button>
      )}
    </div>
  );
}

function buildFAQ(items: FAQPair[]) {
  const valid = items.filter((p) => p.question.trim() && p.answer.trim());
  if (valid.length === 0) return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [] };
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: valid.map((p) => ({
      "@type": "Question",
      name: p.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: p.answer,
      },
    })),
  };
}

/* --- Article --- */

function ArticleForm({
  data,
  setData,
}: {
  data: Record<string, string>;
  setData: (d: Record<string, string>) => void;
}) {
  const set = (k: string) => (v: string) => setData({ ...data, [k]: v });
  return (
    <div className="space-y-6">
      <InputField id="art-headline" label="Headline" value={data.headline ?? ""} onChange={set("headline")} placeholder="How to Boost Your SEO in 2026" />
      <InputField id="art-author" label="Author Name" value={data.author ?? ""} onChange={set("author")} placeholder="Jane Smith" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField id="art-pub" label="Date Published" value={data.datePublished ?? ""} onChange={set("datePublished")} placeholder="2026-01-15" type="date" />
        <InputField id="art-mod" label="Date Modified" value={data.dateModified ?? ""} onChange={set("dateModified")} placeholder="2026-03-20" type="date" />
      </div>
      <InputField id="art-desc" label="Description" value={data.description ?? ""} onChange={set("description")} placeholder="A comprehensive guide to..." />
      <InputField id="art-image" label="Image URL" value={data.image ?? ""} onChange={set("image")} placeholder="https://example.com/article.jpg" type="url" />
      <InputField id="art-pub-name" label="Publisher Name" value={data.publisherName ?? ""} onChange={set("publisherName")} placeholder="Acme Media" />
      <InputField id="art-pub-logo" label="Publisher Logo URL" value={data.publisherLogo ?? ""} onChange={set("publisherLogo")} placeholder="https://example.com/logo.png" type="url" />
    </div>
  );
}

function buildArticle(data: Record<string, string>) {
  const publisher =
    data.publisherName || data.publisherLogo
      ? strip({
          "@type": "Organization",
          name: data.publisherName,
          logo: data.publisherLogo ? { "@type": "ImageObject", url: data.publisherLogo } : undefined,
        } as unknown as Record<string, unknown>)
      : undefined;
  return strip({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.headline,
    author: data.author ? { "@type": "Person", name: data.author } : undefined,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    description: data.description,
    image: data.image,
    publisher,
  } as unknown as Record<string, unknown>);
}

/* --- BreadcrumbList --- */

function BreadcrumbForm({
  items,
  setItems,
}: {
  items: BreadcrumbItem[];
  setItems: (b: BreadcrumbItem[]) => void;
}) {
  return (
    <div className="space-y-6">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-base font-bold text-black">Item {i + 1}</p>
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => setItems(items.filter((_, idx) => idx !== i))}
                className="min-w-[44px] min-h-[44px] px-3 py-2 text-base font-bold text-black border border-gray-300 hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Remove
              </button>
            )}
          </div>
          <InputField
            id={`bc-name-${i}`}
            label="Name"
            value={item.name}
            onChange={(v) => {
              const updated = [...items];
              updated[i] = { ...updated[i], name: v };
              setItems(updated);
            }}
            placeholder="Home"
          />
          <InputField
            id={`bc-url-${i}`}
            label="URL"
            value={item.url}
            onChange={(v) => {
              const updated = [...items];
              updated[i] = { ...updated[i], url: v };
              setItems(updated);
            }}
            placeholder="https://example.com"
            type="url"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => setItems([...items, { name: "", url: "" }])}
        className="min-h-[44px] border border-black px-4 py-3 text-base font-bold text-black hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
      >
        + Add Breadcrumb Item
      </button>
    </div>
  );
}

function buildBreadcrumb(items: BreadcrumbItem[]) {
  const valid = items.filter((b) => b.name.trim());
  if (valid.length === 0)
    return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [] };
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: valid.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      ...(b.url.trim() ? { item: b.url } : {}),
    })),
  };
}

/* ---------- schema tabs ---------- */

const SCHEMA_TYPES: { key: SchemaType; label: string }[] = [
  { key: "LocalBusiness", label: "Local Business" },
  { key: "Organization", label: "Organization" },
  { key: "Product", label: "Product" },
  { key: "FAQPage", label: "FAQ Page" },
  { key: "Article", label: "Article" },
  { key: "BreadcrumbList", label: "Breadcrumb" },
];

/* ---------- main page ---------- */

export default function SchemaGeneratorPage() {
  const [activeType, setActiveType] = useState<SchemaType>("LocalBusiness");
  const [copied, setCopied] = useState(false);

  /* per-type state */
  const [lbData, setLbData] = useState<Record<string, string>>({});
  const [orgData, setOrgData] = useState<Record<string, string>>({});
  const [orgSameAs, setOrgSameAs] = useState<string[]>([""]);
  const [prodData, setProdData] = useState<Record<string, string>>({});
  const [faqItems, setFaqItems] = useState<FAQPair[]>([{ question: "", answer: "" }]);
  const [artData, setArtData] = useState<Record<string, string>>({});
  const [bcItems, setBcItems] = useState<BreadcrumbItem[]>([
    { name: "", url: "" },
    { name: "", url: "" },
  ]);

  const jsonLd = useMemo(() => {
    switch (activeType) {
      case "LocalBusiness":
        return buildLocalBusiness(lbData);
      case "Organization":
        return buildOrganization(orgData, orgSameAs);
      case "Product":
        return buildProduct(prodData);
      case "FAQPage":
        return buildFAQ(faqItems);
      case "Article":
        return buildArticle(artData);
      case "BreadcrumbList":
        return buildBreadcrumb(bcItems);
    }
  }, [activeType, lbData, orgData, orgSameAs, prodData, faqItems, artData, bcItems]);

  const jsonString = JSON.stringify(jsonLd, null, 2);

  function handleCopy() {
    const scriptTag = `<script type="application/ld+json">\n${jsonString}\n</script>`;
    navigator.clipboard.writeText(scriptTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <article>
      {/* --- Hero --- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Schema Markup Generator
            </h1>
            <SectionDesc>
              Generate JSON-LD structured data for your website. Choose a schema type, fill in
              your details, and copy the ready-to-use markup directly into your site.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* --- Type Tabs --- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-4">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Schema type">
              {SCHEMA_TYPES.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={activeType === t.key}
                  onClick={() => setActiveType(t.key)}
                  className={`min-h-[44px] px-4 py-3 text-base font-bold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                    activeType === t.key
                      ? "bg-black text-white"
                      : "border border-gray-300 text-black hover:bg-gray-100"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* --- Form --- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            {activeType === "LocalBusiness" && <LocalBusinessForm data={lbData} setData={setLbData} />}
            {activeType === "Organization" && (
              <OrganizationForm data={orgData} setData={setOrgData} sameAs={orgSameAs} setSameAs={setOrgSameAs} />
            )}
            {activeType === "Product" && <ProductForm data={prodData} setData={setProdData} />}
            {activeType === "FAQPage" && <FAQForm items={faqItems} setItems={setFaqItems} />}
            {activeType === "Article" && <ArticleForm data={artData} setData={setArtData} />}
            {activeType === "BreadcrumbList" && <BreadcrumbForm items={bcItems} setItems={setBcItems} />}
          </Animate>
        </div>
      </section>

      {/* --- JSON-LD Preview --- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-16">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="border border-gray-200 overflow-hidden">
              <div className="bg-black text-white p-4 flex items-center justify-between">
                <p className="text-base font-bold">Generated JSON-LD</p>
                <button
                  onClick={handleCopy}
                  className="min-h-[44px] min-w-[44px] bg-white text-black px-4 py-2 text-base font-bold hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="bg-black text-white p-6 text-base overflow-x-auto leading-relaxed">
                <code>{`<script type="application/ld+json">\n${jsonString}\n</script>`}</code>
              </pre>
            </div>
          </Animate>
        </div>
      </section>

      {/* --- Educational Section --- */}
      <section aria-label="Why structured data matters for SEO" className="px-6 lg:px-12 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-black tracking-tight mb-8">
              What Is Structured Data?
            </h2>
          </Animate>

          <Stagger stagger={80} animation="fade-up" className="space-y-8">
            <div>
              <h3 className="text-base font-bold text-black mb-2">Why structured data matters for SEO</h3>
              <p className="text-base text-gray-500 leading-relaxed">
                Structured data is a standardized format (JSON-LD) that tells search engines exactly what your
                content is about. When Google understands your page structure, it can display rich results --
                star ratings, FAQ dropdowns, product prices, breadcrumb trails, and more -- directly in the
                search results. Pages with rich results typically see higher click-through rates because they
                stand out visually and provide immediate value to searchers.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-black mb-2">How to add JSON-LD to your website</h3>
              <p className="text-base text-gray-500 leading-relaxed mb-4">
                Copy the generated script tag and paste it into the <code className="bg-gray-200 px-1">&lt;head&gt;</code> section
                of your HTML page. If you use a CMS like WordPress, you can add it via a plugin such as Yoast SEO or
                directly in your theme&apos;s header template. For Next.js sites, place it inside a <code className="bg-gray-200 px-1">&lt;Script&gt;</code> component
                or the <code className="bg-gray-200 px-1">&lt;head&gt;</code> of your layout.
              </p>
              <pre className="bg-black text-white p-4 text-base overflow-x-auto">
                <code>{`<head>\n  <script type="application/ld+json">\n    { "@context": "https://schema.org", ... }\n  </script>\n</head>`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-base font-bold text-black mb-2">Test with Google&apos;s Rich Results Test</h3>
              <p className="text-base text-gray-500 leading-relaxed">
                After adding structured data to your page, validate it using{" "}
                <a
                  href="https://search.google.com/test/rich-results"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-black font-bold hover:text-gray-600 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Google&apos;s Rich Results Test
                </a>
                . Paste your page URL or the JSON-LD code directly. The tool checks whether your markup
                is valid and eligible for rich results. Fix any errors or warnings before publishing.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-black mb-2">Common mistakes to avoid</h3>
              <div className="space-y-3 text-base text-gray-500 leading-relaxed">
                <div className="border-l-4 border-black pl-4">
                  <p className="font-bold text-black">Missing required fields</p>
                  <p>Each schema type has required properties. A LocalBusiness needs a name at minimum; a Product needs a name and an offer. Omitting required fields means Google ignores the markup entirely.</p>
                </div>
                <div className="border-l-4 border-black pl-4">
                  <p className="font-bold text-black">Marking up content not visible on the page</p>
                  <p>Google expects structured data to reflect what users actually see. If your FAQ markup has answers that do not appear on the page, Google may penalize or ignore it.</p>
                </div>
                <div className="border-l-4 border-black pl-4">
                  <p className="font-bold text-black">Using multiple conflicting types</p>
                  <p>Do not add both LocalBusiness and Organization markup to the same page unless one is nested inside the other. Conflicting types confuse search engines.</p>
                </div>
                <div className="border-l-4 border-black pl-4">
                  <p className="font-bold text-black">Not updating dates</p>
                  <p>For Article schema, keep dateModified accurate. Stale or incorrect dates reduce trust signals and can hurt your ranking.</p>
                </div>
              </div>
            </div>
          </Stagger>
        </div>
      </section>

      {/* --- CTA --- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help With Technical SEO?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Structured data is just one piece of the puzzle. Our SEO team can audit your site, fix
              technical issues, and build a strategy that drives organic growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services/seo"
                className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
              >
                SEO Services &rarr;
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 border border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
              >
                Get in Touch &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/seo-checklist" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">SEO Checklist</Link>
                <Link href="/resources/keyword-density-checker" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Keyword Density Checker</Link>
                <Link href="/resources/seo-content-optimizer" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">SEO Content Optimizer</Link>
                <Link href="/resources/seo-audit-score" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">SEO Audit Score</Link>
          </div>
        </div>
      </section>
    
      <ToolCTA
        toolName="Schema Generator"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Scope Of Work Generator", href: "/resources/scope-of-work-generator" },
          { title: "Retention Calculator", href: "/resources/retention-calculator" },
          { title: "Risk Assessment", href: "/resources/risk-assessment" },
          { title: "Roi Calculator", href: "/resources/roi-calculator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
