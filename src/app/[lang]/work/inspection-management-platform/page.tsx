import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { Animate } from "@/components/animate";
import { Breadcrumb } from "@/components/breadcrumb";
import { CaseStudyGraph, RelatedCaseStudies } from "@/components/case-study-extras";
import { caseStudyMetadata } from "@/lib/case-studies";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return caseStudyMetadata("inspection-management-platform", lang);
}

/** Screens captured from the demonstration (fictional data) on 29 Oct 2026. */
const IMG = "/images/work/inspection-management-platform";
const D = "font-[family-name:var(--font-display)]";
const PAD = "px-6 lg:px-12";

function Shot({ src, w = 1200, h = 750, alt, caption, className = "" }: { src: string; w?: number; h?: number; alt: string; caption?: string; className?: string }) {
  return (
    <figure className={`group/shot ${className}`}>
      <div className="overflow-hidden rounded-xl bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,.45)] ring-1 ring-black/10 transition-[transform,box-shadow] duration-500 ease-out motion-reduce:transition-none motion-safe:group-hover/shot:-translate-y-1.5 motion-safe:group-hover/shot:shadow-[0_40px_90px_-20px_rgba(0,0,0,.55)]">
        <div className="flex items-center gap-1.5 bg-neutral-100 px-3 py-2 border-b border-neutral-200" aria-hidden="true">
          <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${IMG}/${src}`} width={w} height={h} alt={alt} loading="lazy" decoding="async" className="block w-full h-auto transition-transform duration-[900ms] ease-out motion-reduce:transition-none motion-safe:group-hover/shot:scale-[1.02]" />
      </div>
      {caption && <figcaption className="mt-3 text-sm opacity-70 leading-relaxed">{caption}</figcaption>}
    </figure>
  );
}

function Chapter({ n, label, dark = false }: { n: string; label: string; dark?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] ${dark ? "text-white/60" : "text-black/50"}`}>
      <span className={`${D} text-3xl font-extrabold tracking-tight ${dark ? "text-white" : "text-black"}`}>{n}</span>
      <span className="h-px w-10 bg-current opacity-40" aria-hidden="true" />
      {label}
    </p>
  );
}

const STEPS = [
  { n: "01", role: "Operations Manager", color: "#5A3ED6", title: "A job begins", text: "An Operations Manager sets up the job in a minute: shipper, buyer, goods, quantity. Then they assign an inspector. From here the job moves one step at a time, and every screen shows a progress bar and says what to do next.", shots: [{ src: "dashboard.webp", alt: "Inspection platform dashboard: a work queue, four key figures, a monthly tonnage chart and jobs by status", caption: "The dashboard opens on the work queue for whoever is signed in." }] },
  { n: "02", role: "Inspector", color: "#0FA593", title: "On site, the form is the same form", text: "The inspector completes the report we rebuilt field for field: sampling, single and double packing with top and bottom stitching, weighing and tare, lots and seals, remarks and the supervisor's timeline. Containers follow the container sheet, with up to fifteen stack positions, and totals add up as they type.", shots: [{ src: "form.webp", alt: "Inspection form showing the sampling section and the packing, stitching and condition table", caption: "Sampling, then packing, stitching and package condition." }, { src: "containers.webp", alt: "Container editor with fifteen stack positions, total bags and net tonnes, and a check against pack size", caption: "Fifteen stack positions, automatic totals and the tonnage check." }] },
  { n: "03", role: "Operations Manager", color: "#F5A524", title: "Reviewed, then locked", text: "The inspector submits. The manager reviews and approves, with a comment if needed. From that moment the job is locked, so an approved report cannot be changed by accident.", shots: [{ src: "job.webp", alt: "An inspection job in Ops Review with a five-step progress bar and a panel explaining the next step", caption: "Progress bar, next-step guidance and the approvals for the current role." }] },
  { n: "04", role: "Lab Analyst and Lab Approver", color: "#E8463A", title: "The laboratory judges as it goes", text: "A sample is registered against the job and lot. A template pre-fills parameters, methods and limits, and the verdict appears as the result is typed. 14 against a limit of 14 passes; 14.01 fails. A second person approves, and it can never be the person who entered the results.", shots: [{ src: "lab.webp", alt: "Laboratory sample with limits per parameter, results and a red FAIL verdict on moisture", caption: "Limits per parameter and an automatic pass or fail verdict." }] },
  { n: "05", role: "Finance", color: "#2F7BF6", title: "The invoice builds itself", text: "Finance gets a draft built from the job: one line for the inspection, one per container, and sampling and analysis lines for each laboratory sample. They adjust rates, tax and discount and watch the totals update. Money is calculated in whole paisa, so rounding never drifts.", shots: [{ src: "invoice.webp", alt: "Invoice built from a job, with editable lines, tax and discount and live totals", caption: "Lines built from the job, with live totals." }] },
  { n: "06", role: "Certificate Approver", color: "#111111", title: "Only then, a certificate", text: "A certificate can be drafted only from a reviewed job, and a testing certificate also needs an approved sample. Only the Certificate Approver can approve it. An Admin cannot. Every document carries a verification code and a watermark reading \"Demo / not valid for official use\".", shots: [{ src: "cert.webp", alt: "Certificate preview with laboratory results, a diagonal demo watermark and an approval chain", caption: "A watermarked preview with the laboratory results and the approval chain." }] },
] as const;

const NUMBERS: [string, string][] = [
  ["4", "connected modules"], ["8", "user roles"], ["19", "database tables"], ["5", "PDF documents"], ["49", "end-to-end checks"], ["9", "unit tests"],
];

const RULES = [
  "Net tonnes must match bags times pack size within one per cent, or the job cannot go for review.",
  "Container numbers must be four letters and seven digits, with no duplicates in a job.",
  "Loading cannot finish before it starts. Foreign-matter packages cannot exceed packages emptied.",
  "Laboratory results are locked once submitted, and the approver cannot be the submitter.",
  "Approved reports and invoices cannot be edited by accident.",
  "Inspectors can edit only the jobs assigned to them.",
];

export default async function InspectionManagementPlatformPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = ["en", "ar", "ur"].includes(lang) ? lang : "en";
  const l = (p: string) => `/${locale}${p}`;
  return (
    <article>
      <CaseStudyGraph slug="inspection-management-platform" locale={locale} />
      <div className="bg-[#0b0a1a] text-white">
        <Breadcrumb locale={locale} emitSchema={false} items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: "Case Studies", href: "/case-studies" }, { label: "Inspection & Laboratory Management Platform" }]} />
      </div>

      {/* HERO */}
      <section className={`${PAD} relative overflow-hidden bg-[#0b0a1a] text-white pt-10 pb-20 lg:pb-28`} aria-label="Overview">
        <div className="pointer-events-none absolute -top-32 -right-24 h-[520px] w-[520px] rounded-full bg-[#5A3ED6]/50 blur-[120px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-[420px] w-[420px] rounded-full bg-[#0FA593]/30 blur-[120px]" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          <Animate animation="fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">Case study · Software we built · Food &amp; agriculture inspection</p>
            <h1 className={`${D} text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.04] mt-5`}>Inspection and Laboratory Management Software, Designed and Built by Markit Media</h1>
            <p className="text-lg text-white/75 leading-relaxed mt-6 max-w-xl">Five people touch every inspection job. We built one system where a single record flows through all five, every figure is checked by the software and every approval is recorded.</p>
            <ul className="flex flex-wrap gap-2 mt-7 list-none p-0" aria-label="Services">
              {["Website Development", "CRM Development", "Laboratory Software Development"].map((s) => <li key={s} className="rounded-full border border-white/25 px-3.5 py-1.5 text-sm font-medium text-white/85">{s}</li>)}
            </ul>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F5A524] px-3.5 py-1.5 text-xs font-bold text-black">Our own working demonstration · fictional data · not a live deployment</p>
          </Animate>
          <Animate animation="fade-left"><Shot src="dashboard.webp" alt="Inspection platform dashboard: a work queue, four key figures, a monthly tonnage chart and jobs by status" /></Animate>
        </div>
      </section>

      {/* 01 THE PROBLEM */}
      <section className={`${PAD} py-20 md:py-28 bg-[#FFF3E6]`} aria-labelledby="ch1">
        <div className="max-w-7xl mx-auto">
          <Chapter n="01" label="The problem" />
          <h2 id="ch1" className={`${D} text-[clamp(1.9rem,4.4vw,3.4rem)] font-extrabold tracking-tight leading-[1.05] mt-5 max-w-4xl`}>An inspection job passes through five hands. Each keeps its own file.</h2>
          <p className="text-lg text-black/70 leading-relaxed mt-5 max-w-2xl">The inspector on site, the operations team, the laboratory, finance and the person who signs the certificate. The same details get retyped, and the figures drift apart.</p>
          <Animate animation="fade-up">
            <figure className="mt-12">
              <svg viewBox="0 0 960 300" role="img" aria-labelledby="flow-t flow-d" className="w-full h-auto">
                <title id="flow-t">Five separate files become one connected record</title>
                <desc id="flow-d">On the left, five people each hold their own file: inspector, operations, laboratory, finance and certificate approver. On the right, one job record connects all five.</desc>
                {[["Inspector", "#0FA593"], ["Operations", "#F5A524"], ["Laboratory", "#E8463A"], ["Finance", "#2F7BF6"], ["Approver", "#111111"]].map(([t, c], i) => (
                  <g key={t} transform={`translate(${20 + i * 100} ${30 + (i % 2) * 70})`}>
                    <rect width="84" height="104" rx="8" fill="#fff" stroke={c} strokeWidth="3" transform={`rotate(${(i - 2) * 4} 42 52)`} />
                    <rect x="14" y="20" width="56" height="6" rx="3" fill={c} opacity=".8" />
                    <rect x="14" y="36" width="40" height="5" rx="2.5" fill="#d4d4d8" /><rect x="14" y="48" width="50" height="5" rx="2.5" fill="#d4d4d8" /><rect x="14" y="60" width="30" height="5" rx="2.5" fill="#d4d4d8" />
                    <text x="42" y="132" textAnchor="middle" fontSize="13" fontWeight="800" fill="#111">{t}</text>
                  </g>
                ))}
                <path d="M530 150 h80" stroke="#111" strokeWidth="3" strokeLinecap="round" /><path d="M598 138 l14 12 -14 12" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <g transform="translate(640 40)">
                  <rect width="300" height="220" rx="14" fill="#5A3ED6" />
                  <text x="24" y="42" fontSize="14" fontWeight="800" fill="#fff" opacity=".7">ONE JOB RECORD</text>
                  {[["#0FA593", "Inspect"], ["#F5A524", "Review"], ["#E8463A", "Test"], ["#2F7BF6", "Invoice"], ["#ffffff", "Certify"]].map(([c, t], i) => (
                    <g key={t} transform={`translate(24 ${62 + i * 30})`}><circle cx="9" cy="9" r="9" fill={c} /><rect x="26" y="3" width={150 - i * 12} height="12" rx="6" fill="#fff" opacity=".9" /><text x="272" y="14" textAnchor="end" fontSize="11" fontWeight="800" fill="#fff" opacity=".8">{t}</text></g>
                  ))}
                </g>
              </svg>
              <figcaption className="sr-only">Five separate files on the left become one connected job record on the right.</figcaption>
            </figure>
          </Animate>
        </div>
      </section>

      {/* 02 THE IDEA */}
      <section className={`${PAD} py-20 md:py-28 bg-[#5A3ED6] text-white`} aria-labelledby="ch2">
        <div className="max-w-7xl mx-auto">
          <Chapter n="02" label="The idea" dark />
          <h2 id="ch2" className={`${D} text-[clamp(1.9rem,4.4vw,3.4rem)] font-extrabold tracking-tight leading-[1.05] mt-5 max-w-4xl`}>One record. Everyone works from it. The software checks the arithmetic.</h2>
          <p className="text-lg text-white/80 leading-relaxed mt-5 max-w-2xl">We set ourselves the brief and built it ourselves: design, engineering, testing, even the video and pitch deck. From a written brief to a tested, shareable demo within a single working day.</p>
          <dl className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10 border-t border-white/25 pt-10">
            {NUMBERS.map(([v, k]) => (
              <Animate key={k} animation="fade-up"><div><dd className={`${D} text-6xl lg:text-7xl font-extrabold leading-none tracking-tight`}>{v}</dd><dt className="mt-3 text-sm text-white/75">{k}</dt></div></Animate>
            ))}
          </dl>
        </div>
      </section>

      {/* 03 THE JOURNEY */}
      <section className={`${PAD} py-20 md:py-28 bg-white`} aria-labelledby="ch3">
        <div className="max-w-7xl mx-auto">
          <Chapter n="03" label="The journey of a job" />
          <h2 id="ch3" className={`${D} text-[clamp(1.9rem,4.4vw,3.4rem)] font-extrabold tracking-tight leading-[1.05] mt-5 max-w-4xl`}>Follow one job from first click to certificate.</h2>
          <p className="text-lg text-black/65 leading-relaxed mt-5 max-w-2xl">Six steps, six roles. Each person sees and can change only what their role allows.</p>
        </div>
        <div className="mt-16 space-y-24 md:space-y-32">
          {STEPS.map((s, i) => (
            <div key={s.n} className="max-w-7xl mx-auto">
              <div className={`grid lg:grid-cols-2 gap-10 lg:gap-20 items-center ${i % 2 ? "" : ""}`}>
                <Animate animation={i % 2 ? "fade-right" : "fade-left"} className={i % 2 ? "lg:order-2" : ""}>
                  <div className={`rounded-3xl p-5 md:p-8 ${s.shots.length > 1 ? "space-y-6" : ""}`} style={{ background: `linear-gradient(135deg, ${s.color}22, ${s.color}55)` }}>
                    {s.shots.map((sh) => <Shot key={sh.src} src={sh.src} alt={sh.alt} caption={sh.caption} />)}
                  </div>
                </Animate>
                <div>
                  <p className={`${D} text-[7rem] lg:text-[9rem] leading-none font-extrabold text-transparent select-none`} style={{ WebkitTextStroke: `2px ${s.color}` }} aria-hidden="true">{s.n}</p>
                  <p className="-mt-6 inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: s.color }}>{s.role}</p>
                  <h3 className={`${D} text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mt-4`}><span className="sr-only">Step {s.n}: </span>{s.title}</h3>
                  <p className="text-lg text-black/70 leading-relaxed mt-4 max-w-lg">{s.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 04 THE RULES */}
      <section className={`${PAD} py-20 md:py-28 bg-[#06302c] text-white`} aria-labelledby="ch4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[.9fr_1.1fr] gap-12 lg:gap-24">
          <div>
            <Chapter n="04" label="The rules" dark />
            <h2 id="ch4" className={`${D} text-[clamp(1.9rem,4.4vw,3.4rem)] font-extrabold tracking-tight leading-[1.05] mt-5`}>The software says no, so people do not have to.</h2>
            <p className="text-lg text-white/75 leading-relaxed mt-5 max-w-md">Rules sit on the server, where every change is checked against the user&apos;s role and the allowed workflow step.</p>
          </div>
          <ul className="list-none p-0 divide-y divide-white/15 border-y border-white/15">
            {RULES.map((r) => (
              <li key={r} className="flex gap-4 py-5 transition-colors hover:bg-white/5 motion-reduce:transition-none">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3EE0C1] text-[#06302c]" aria-hidden="true"><Check size={14} strokeWidth={3} /></span>
                <span className="text-lg leading-relaxed text-white/90">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 TRUST: roles + audit */}
      <section className={`${PAD} py-20 md:py-28 bg-[#F1EEFF]`} aria-labelledby="ch5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
          <div>
            <Chapter n="05" label="Trust" />
            <h2 id="ch5" className={`${D} text-[clamp(1.9rem,4.4vw,3.4rem)] font-extrabold tracking-tight leading-[1.05] mt-5`}>Eight roles. One audit trail.</h2>
            <p className="text-lg text-black/70 leading-relaxed mt-5 max-w-lg">Admin, Operations Manager, Inspector, Lab Analyst, Lab Approver, Finance, Certificate Approver and Read Only. An audit log records who did what, and when, for every change and approval. Sign-in is private, with hashed passwords, signed session cookies and a limit on failed attempts.</p>
          </div>
          <Animate animation="fade-left"><Shot src="roles.webp" alt="Role permission matrix for eight roles with an audit log beneath" caption="The role matrix and the audit log." /></Animate>
        </div>
      </section>

      {/* 06 IN THE FIELD */}
      <section className={`${PAD} py-20 md:py-28 bg-[#FFB020]`} aria-labelledby="ch6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_.9fr] gap-12 lg:gap-20 items-center">
          <div>
            <Chapter n="06" label="In the field" />
            <h2 id="ch6" className={`${D} text-[clamp(1.9rem,4.4vw,3.4rem)] font-extrabold tracking-tight leading-[1.05] mt-5`}>Designed for the person standing next to the cargo.</h2>
            <p className="text-lg text-black/75 leading-relaxed mt-5 max-w-lg">The dashboard opens on a work queue for the signed-in role, every job explains the next step, and search is always at the top. Long forms warn before unsaved work is lost. We checked the screens at phone and tablet widths with no sideways scrolling, and a scan of the key pages found no form control without an accessible name.</p>
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
              <Shot src="pdf-container.webp" w={1200} h={848} alt="Container sheet PDF with rows of fifteen stack positions per container and a demo watermark" caption="The container sheet as a PDF." />
              <Shot src="pdf-inspection.webp" alt="Top of the inspection and loading report PDF with sampling and packing tables and a demo watermark" caption="The inspection report as a PDF." />
            </div>
          </div>
          <Animate animation="fade-left">
            <figure className="group/ph mx-auto w-[min(100%,300px)]">
              <div className="overflow-hidden rounded-[2.2rem] border-[10px] border-black bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,.5)] transition-transform duration-500 motion-reduce:transition-none motion-safe:group-hover/ph:-translate-y-2 motion-safe:group-hover/ph:-rotate-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${IMG}/mobile-containers.webp`} width={390} height={844} alt="Containers tab of a job on a phone, with progress bar, next-step panel and totals" loading="lazy" decoding="async" className="block w-full h-auto" />
              </div>
              <figcaption className="mt-4 text-sm text-black/70 text-center">The containers tab on a phone.</figcaption>
            </figure>
          </Animate>
        </div>
      </section>

      {/* 07 PROOF */}
      <section className={`${PAD} py-20 md:py-28 bg-[#0b0a1a] text-white`} aria-labelledby="ch7">
        <div className="max-w-7xl mx-auto">
          <Chapter n="07" label="Tested like a product" dark />
          <h2 id="ch7" className={`${D} text-[clamp(1.9rem,4.4vw,3.4rem)] font-extrabold tracking-tight leading-[1.05] mt-5 max-w-4xl`}>Not a prototype that only works in the demo.</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-x-10 gap-y-10">
            {[
              ["#3EE0C1", "9 unit tests", "Stack totals, tonnage tolerance, laboratory limits at their boundaries, invoice arithmetic and workflow permissions."],
              ["#F5A524", "49 end-to-end checks", "A real browser plays each of the eight roles: creating jobs, trying invalid input, pushing work through review, laboratory, invoicing and certification, and confirming a role cannot do what it should not. The same checks also pass over the public link used to share the demo."],
              ["#FF7A6B", "A full crawl", "Every page and PDF, a mobile-width check and an accessibility scan completed the pass."],
            ].map(([c, t, d]) => (
              <div key={t} className="border-t-4 pt-5" style={{ borderColor: c }}>
                <h3 className={`${D} text-2xl font-extrabold`}>{t}</h3>
                <p className="mt-3 text-white/70 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-14 max-w-3xl text-white/70 leading-relaxed">Under the hood: Next.js 15, React 19, TypeScript and Tailwind CSS 4, with every change going through server actions. Data lives in SQLite with a 19-table schema designed to move to PostgreSQL, and PDFs are generated on the server with PDFKit. The whole demonstration runs in about 130 MB of memory. We also wrote a narrated walkthrough and a 14-slide pitch deck so the platform can be judged in minutes.</p>
        </div>
      </section>

      {/* 08 HONEST */}
      <section className={`${PAD} py-20 md:py-28 bg-[#FFF3E6]`} aria-labelledby="ch8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[.9fr_1.1fr] gap-12 lg:gap-20">
          <div>
            <Chapter n="08" label="The honest part" />
            <h2 id="ch8" className={`${D} text-[clamp(1.9rem,4.4vw,3.4rem)] font-extrabold tracking-tight leading-[1.05] mt-5`}>A demonstration, on purpose.</h2>
            <p className="text-lg text-black/70 leading-relaxed mt-5 max-w-md">We built this as our own working proof of what we can deliver, and we are clear about its limits. It is a working demonstration, so we have no usage, time-saving or revenue figures to report, and we do not invent them.</p>
          </div>
          <ul className="list-none p-0 grid sm:grid-cols-2 gap-4">
            {[
              "It runs on fictional data: names, numbers and rates are invented.",
              "It is not a live deployment and is not used by any client.",
              "Approvals are simulated and carry no legal force.",
              "Laboratory, invoice and certificate layouts are our own provisional designs.",
              "No instrument integration, no payments and no email sending.",
              "Attachments are recorded as metadata only; no files are stored.",
            ].map((t) => (
              <li key={t} className="flex gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition-transform duration-300 motion-reduce:transition-none motion-safe:hover:-translate-y-1">
                <X size={18} className="mt-1 shrink-0 text-[#E8463A]" aria-hidden="true" /><span className="leading-relaxed text-black/80">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RelatedCaseStudies slug="inspection-management-platform" locale={locale} />

      {/* CTA */}
      <section className={`${PAD} relative overflow-hidden py-20 md:py-28 bg-gradient-to-br from-[#2a1a6b] via-[#5A3ED6] to-[#0FA593] text-white`} aria-labelledby="ch9">
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 id="ch9" className={`${D} text-[clamp(2rem,5vw,3.8rem)] font-extrabold tracking-tight leading-[1.05]`}>Build something like this with us.</h2>
          <p className="text-lg text-white/85 leading-relaxed mt-5 max-w-2xl mx-auto">If your business runs on jobs, samples, approvals and paperwork, whether that is inspection, a laboratory, quality control or any process that moves through several people, we can build a system around the way you work. Keep one record, not four spreadsheets. Prove it with a working demonstration before committing to a full build.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href={l("/get-a-quote")} className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 font-bold transition-transform duration-300 motion-reduce:transition-none hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Request a Quote <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link href={l("/contact")} className="inline-flex items-center border border-white/60 px-8 py-4 font-bold hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">Talk to our team</Link>
          </div>
          <ul className="mt-10 flex flex-wrap justify-center gap-3 list-none p-0 text-sm" aria-label="Services used in this project">
            {[["Website Development", "/services/website-development"], ["Custom Web Apps", "/services/website-development/custom-web-apps"], ["Custom CRM Development", "/services/crm-development/custom-crm"]].map(([t, h]) => (
              <li key={h}><Link href={l(h)} className="inline-flex items-center min-h-11 rounded-full border border-white/30 px-4 hover:bg-white/15 transition-colors">{t}</Link></li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
