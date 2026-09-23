"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

interface ChecklistItem {
  id: string;
  label: string;
}

interface ChecklistCategory {
  name: string;
  items: ChecklistItem[];
}

const categories: ChecklistCategory[] = [
  {
    name: "Content",
    items: [
      { id: "content-1", label: "All pages written and finalized" },
      { id: "content-2", label: "Content proofread for spelling and grammar" },
      { id: "content-3", label: "Images optimized for web (compressed, correct dimensions)" },
      { id: "content-4", label: "Alt text added to all images" },
      { id: "content-5", label: "Contact information accurate and up to date" },
      { id: "content-6", label: "Call-to-action buttons working and clearly labeled" },
      { id: "content-7", label: "Blog posts or news articles published" },
      { id: "content-8", label: "Downloadable files (PDFs, resources) tested" },
      { id: "content-9", label: "Video and media embeds loading correctly" },
      { id: "content-10", label: "Copyright year and footer content updated" },
    ],
  },
  {
    name: "SEO",
    items: [
      { id: "seo-1", label: "Meta titles set for all pages (under 60 characters)" },
      { id: "seo-2", label: "Meta descriptions written for all pages (under 160 characters)" },
      { id: "seo-3", label: "XML sitemap generated and submitted" },
      { id: "seo-4", label: "Robots.txt file configured correctly" },
      { id: "seo-5", label: "Google Analytics or other analytics installed" },
      { id: "seo-6", label: "Google Search Console verified" },
      { id: "seo-7", label: "Canonical URLs set to prevent duplicate content" },
      { id: "seo-8", label: "Open Graph and social sharing tags configured" },
    ],
  },
  {
    name: "Design",
    items: [
      { id: "design-1", label: "Mobile responsive on all screen sizes" },
      { id: "design-2", label: "Cross-browser tested (Chrome, Firefox, Safari, Edge)" },
      { id: "design-3", label: "Favicon and app icons uploaded" },
      { id: "design-4", label: "Typography consistent across all pages" },
      { id: "design-5", label: "Color scheme consistent with brand guidelines" },
      { id: "design-6", label: "Spacing and alignment reviewed for visual consistency" },
      { id: "design-7", label: "Print stylesheet tested (if applicable)" },
    ],
  },
  {
    name: "Technical",
    items: [
      { id: "tech-1", label: "SSL certificate installed and HTTPS enforced" },
      { id: "tech-2", label: "301 redirects configured for old URLs" },
      { id: "tech-3", label: "Custom 404 error page created" },
      { id: "tech-4", label: "Page load speed under 3 seconds on mobile" },
      { id: "tech-5", label: "Database and files backed up" },
      { id: "tech-6", label: "Forms tested (submission, validation, email delivery)" },
      { id: "tech-7", label: "Broken links checked and fixed" },
      { id: "tech-8", label: "Caching and CDN configured for performance" },
    ],
  },
  {
    name: "Legal",
    items: [
      { id: "legal-1", label: "Privacy policy page published" },
      { id: "legal-2", label: "Terms of service page published" },
      { id: "legal-3", label: "Cookie consent banner implemented" },
      { id: "legal-4", label: "Accessibility compliance reviewed (WCAG 2.1 AA)" },
      { id: "legal-5", label: "GDPR or regional data compliance addressed" },
    ],
  },
  {
    name: "Marketing",
    items: [
      { id: "marketing-1", label: "Social media profiles linked from website" },
      { id: "marketing-2", label: "Email capture or newsletter signup working" },
      { id: "marketing-3", label: "Launch announcement draft prepared" },
      { id: "marketing-4", label: "Google Business Profile updated with website URL" },
      { id: "marketing-5", label: "UTM tracking parameters set up for campaigns" },
      { id: "marketing-6", label: "Post-launch monitoring plan documented" },
    ],
  },
];

const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);

/* ------------------------------------------------------------------ */
/*  Utility functions                                                  */
/* ------------------------------------------------------------------ */

function getDaysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + "T00:00:00");
  const diff = target.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getStatusLabel(percentage: number): {
  label: string;
  color: string;
  bgColor: string;
} {
  if (percentage >= 100) {
    return { label: "Launch Ready", color: "text-black", bgColor: "bg-black" };
  }
  if (percentage >= 70) {
    return {
      label: "Almost Ready",
      color: "text-gray-700",
      bgColor: "bg-gray-700",
    };
  }
  return {
    label: "Not Ready",
    color: "text-gray-400",
    bgColor: "bg-gray-400",
  };
}

function formatExportText(
  launchDate: string,
  checked: Set<string>,
  percentage: number
): string {
  const lines: string[] = [];
  const status = getStatusLabel(percentage);

  lines.push("WEBSITE LAUNCH CHECKLIST");
  lines.push("=".repeat(50));
  lines.push("");

  if (launchDate) {
    const days = getDaysUntil(launchDate);
    lines.push(`Launch Date: ${launchDate}`);
    lines.push(
      `Days Until Launch: ${days > 0 ? days : days === 0 ? "Today" : "Passed"}`
    );
    lines.push("");
  }

  lines.push(`Overall Readiness: ${percentage}% - ${status.label}`);
  lines.push(`Completed: ${checked.size} of ${totalItems} items`);
  lines.push("");

  categories.forEach((category) => {
    const catChecked = category.items.filter((item) =>
      checked.has(item.id)
    ).length;
    const catPercent = Math.round((catChecked / category.items.length) * 100);
    lines.push(`${category.name} (${catPercent}%)`);
    lines.push("-".repeat(30));
    category.items.forEach((item) => {
      const mark = checked.has(item.id) ? "x" : " ";
      lines.push(`[${mark}] ${item.label}`);
    });
    lines.push("");
  });

  lines.push("Generated with the Markit Media Launch Checklist Tool");
  lines.push("https://themarkitmedia.com/resources/launch-countdown");

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function CountdownDisplay({ launchDate }: { launchDate: string }) {
  const days = getDaysUntil(launchDate);

  let message: string;
  if (days > 1) {
    message = `${days} days until launch`;
  } else if (days === 1) {
    message = "1 day until launch";
  } else if (days === 0) {
    message = "Launch day is today";
  } else {
    message = `Launch date was ${Math.abs(days)} day${Math.abs(days) !== 1 ? "s" : ""} ago`;
  }

  return (
    <div className="border border-gray-200 p-6 text-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Website Launch Checklist &amp; Countdown",
          description: "Enter your target launch date to start the countdown. This helps you track how much time remains to complete all checklist items.",
          url: "https://themarkitmedia.com/en/resources/launch-countdown",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <p className="text-base text-gray-500 mb-2">Countdown</p>
      <p className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black leading-none">
        {days > 0 ? days : 0}
      </p>
      <p className="text-lg text-gray-700 mt-2">{message}</p>
    </div>
  );
}

function ProgressBar({
  percentage,
  label,
}: {
  percentage: number;
  label?: string;
}) {
  return (
    <div>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-base font-bold text-black">{label}</span>
          <span className="text-base text-gray-500">{percentage}%</span>
        </div>
      )}
      <div
        className="w-full h-3 bg-gray-100 overflow-hidden"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ? `${label} progress` : "Overall progress"}
      >
        <div
          className="h-full bg-black transition-all duration-300 motion-reduce:transition-none"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function StatusBadge({ percentage }: { percentage: number }) {
  const status = getStatusLabel(percentage);
  return (
    <span
      className={`inline-flex items-center px-4 py-2 text-base font-bold text-white ${status.bgColor}`}
    >
      {status.label}
    </span>
  );
}

function CategorySection({
  category,
  checked,
  onToggle,
}: {
  category: ChecklistCategory;
  checked: Set<string>;
  onToggle: (id: string) => void;
}) {
  const catChecked = category.items.filter((item) =>
    checked.has(item.id)
  ).length;
  const catPercent = Math.round((catChecked / category.items.length) * 100);

  return (
    <div className="border border-gray-200">
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold">
          {category.name}
        </h3>
        <span className="text-base">
          {catChecked}/{category.items.length}
        </span>
      </div>
      <div className="px-6 pt-4 pb-2">
        <ProgressBar percentage={catPercent} />
      </div>
      <div className="divide-y divide-gray-100">
        {category.items.map((item) => {
          const isChecked = checked.has(item.id);
          return (
            <label
              key={item.id}
              htmlFor={item.id}
              className="flex items-start gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors motion-reduce:transition-none"
            >
              <span className="flex items-center justify-center min-w-[44px] min-h-[44px] -mt-2.5 -ml-2.5">
                <input
                  id={item.id}
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggle(item.id)}
                  className="w-5 h-5 accent-black cursor-pointer focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                />
              </span>
              <span
                className={`text-base leading-relaxed pt-0.5 ${
                  isChecked ? "line-through text-gray-400" : "text-black"
                }`}
              >
                {item.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard API unavailable */
    }
  }, [text]);

  return (
    <button
      onClick={copy}
      aria-label="Copy checklist to clipboard"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      {copied ? "Copied" : "Copy to Clipboard"}
    </button>
  );
}

function DownloadButton({
  text,
  filename,
}: {
  text: string;
  filename: string;
}) {
  const download = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [text, filename]);

  return (
    <button
      onClick={download}
      aria-label="Download checklist as text file"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      Download as Text
    </button>
  );
}

const howToSteps = [
  {
    title: "Set Your Launch Date",
    description:
      "Enter your target launch date to start the countdown. This helps you track how much time remains to complete all checklist items.",
  },
  {
    title: "Work Through Each Category",
    description:
      "Review and check off items across Content, SEO, Design, Technical, Legal, and Marketing categories as you complete them.",
  },
  {
    title: "Track Your Progress",
    description:
      "Monitor your overall readiness score and per-category progress bars to identify areas that still need attention before launch.",
  },
  {
    title: "Export and Share",
    description:
      "Download or copy your checklist to share with your team, keep a record of completed items, or hand off remaining tasks.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function LaunchCountdownPage() {
  const [launchDate, setLaunchDate] = useState("");
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggleItem = useCallback((id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const checkAll = useCallback(() => {
    setChecked(
      new Set(categories.flatMap((cat) => cat.items.map((item) => item.id)))
    );
  }, []);

  const uncheckAll = useCallback(() => {
    setChecked(new Set());
  }, []);

  const percentage = useMemo(
    () => Math.round((checked.size / totalItems) * 100),
    [checked.size]
  );

  const exportText = useMemo(
    () => formatExportText(launchDate, checked, percentage),
    [launchDate, checked, percentage]
  );

  /* today in YYYY-MM-DD for the date input min */
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <article className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Website Launch Checklist & Countdown",
          description:
            "Free website launch checklist tool. Set a launch date, track progress across 44 items in 6 categories, and export your checklist to share with your team.",
          applicationCategory: "WebApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Launch Checklist & Countdown" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Website Launch Checklist &amp; Countdown
            </h1>
            <SectionDesc>
              Prepare for a successful website launch. Set your target date,
              work through 44 items across six categories, and track your
              readiness in real time. Export your checklist when you are done.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Launch Date & Status ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <div className="border border-gray-200 p-6 space-y-6">
              <div>
                <label
                  htmlFor="launch-date"
                  className="block text-base font-bold text-black mb-2"
                >
                  Launch Date
                </label>
                <input
                  id="launch-date"
                  type="date"
                  min={todayStr}
                  value={launchDate}
                  onChange={(e) => setLaunchDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black min-h-[44px] focus-visible:border-black focus-visible:outline-none motion-reduce:transition-none"
                />
              </div>

              {launchDate && <CountdownDisplay launchDate={launchDate} />}

              {/* Overall readiness */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
                    Overall Readiness
                  </h2>
                  <StatusBadge percentage={percentage} />
                </div>
                <ProgressBar percentage={percentage} />
                <p className="text-base text-gray-500">
                  {checked.size} of {totalItems} items completed
                </p>
              </div>

              {/* Bulk actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={checkAll}
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Check All
                </button>
                {checked.size > 0 && (
                  <button
                    onClick={uncheckAll}
                    className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    Uncheck All
                  </button>
                )}
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Checklist Categories ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-16">
        <div className="max-w-3xl mx-auto">
          <Stagger stagger={100} className="space-y-8">
            {categories.map((category) => (
              <CategorySection
                key={category.name}
                category={category}
                checked={checked}
                onToggle={toggleItem}
              />
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Export ---- */}
      <section aria-label="Export Your Checklist" className="px-6 lg:px-12 pb-16">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
              Export Your Checklist
            </h2>
            <div className="flex flex-wrap gap-3">
              <CopyButton text={exportText} />
              <DownloadButton
                text={exportText}
                filename="website-launch-checklist.txt"
              />
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- How to Use ---- */}
      <section aria-label="How to Use This Tool" className="px-6 lg:px-12 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-8">
              How to Use This Tool
            </h2>
          </Animate>
          <Stagger
            stagger={100}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {howToSteps.map((step, i) => (
              <div key={i} className="border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <span className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-gray-300">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                      {step.title}
                    </h3>
                    <p className="text-base text-gray-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Bottom CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help Launching Your Website?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              A successful launch is more than a checklist. Our team handles the
              technical details, design polish, and marketing setup so you can
              focus on your business. Let us take your website from checklist to
              live with confidence.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Talk to Our Launch Team &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Launch Countdown"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Lead Magnet Generator", href: "/resources/lead-magnet-generator" },
          { title: "Lead Scoring Calculator", href: "/resources/lead-scoring-calculator" },
          { title: "Influencer Roi", href: "/resources/influencer-roi" },
          { title: "Keyword Density Checker", href: "/resources/keyword-density-checker" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
