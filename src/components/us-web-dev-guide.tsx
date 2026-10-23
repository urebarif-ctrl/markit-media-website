import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { SectionLabel } from "@/components/section";
import { UsCallButton } from "@/components/us-call-cta";
import { CallHippoWidget } from "@/components/callhippo-widget";
import { GuideRelated } from "@/components/guide-related";
import { legacySeoPageById } from "@/data/legacy-seo-pages";
import { legacyTitle } from "@/data/legacy-interim-copy";
import { PROJECTS } from "@/data/service-case-studies";
import { PHONE_US } from "@/lib/contact";
import {
  CHANGE_LOG,
  CLUTCH_DIRECTORY,
  CONTACT_EMAIL,
  EVIDENCE,
  FIRMS,
  GROUPS,
  METHOD_COUNTS,
  READ_DATE,
  READ_DATE_ISO,
  US_GUIDE_DESCRIPTION,
  US_GUIDE_H1,
  US_GUIDE_ID,
  type Firm,
} from "@/data/us-web-dev-shortlist";

const BASE_URL = "https://themarkitmedia.com";
const PAGE_PATH = "/top-web-development-companies-in-the-usa";

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-gray-400 hover:decoration-black">
      {children}
    </a>
  );
}

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3.4vw,2.2rem)] font-extrabold tracking-tight leading-tight scroll-mt-24">
      {children}
    </h2>
  );
}

function TableWrap({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <div className="overflow-x-auto mt-6 border border-gray-200">
      <table className="w-full text-sm text-left">
        <caption className="sr-only">{caption}</caption>
        {children}
      </table>
    </div>
  );
}

const th = "px-4 py-3 font-bold bg-gray-50 border-b border-gray-200 align-bottom";
const td = "px-4 py-3 border-b border-gray-100 align-top";

const byName = [...FIRMS].sort((a, b) => a.name.localeCompare(b.name));

function FirmCard({ firm }: { firm: Firm }) {
  const rows: [string, ReactNode][] = [
    ["Where", firm.where],
    ...(firm.founded ? ([["Founded", firm.founded]] as [string, ReactNode][]) : []),
    ["In its own words", <>“{firm.words}”</>],
    ["Web services it lists", firm.webServices.join(" · ")],
    ["Example projects", `${firm.projects.join(", ")} (from its work page)`],
    ["Published pricing", firm.pricing ?? "None found on the pages we read"],
    ["Clutch directory", `${firm.clutch.rating} from ${firm.clutch.reviews} reviews · minimum project ${firm.clutch.minProject} · ${firm.clutch.hourly} an hour`],
  ];
  return (
    <article className="border border-gray-200 p-6" aria-labelledby={`firm-${firm.id}`}>
      <h4 id={`firm-${firm.id}`} className="font-extrabold text-xl">
        <Ext href={firm.site}>{firm.name}</Ext>
      </h4>
      <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-[11rem_1fr]">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="font-bold text-gray-500">{k}</dt>
            <dd className="text-gray-800 leading-6">{v}</dd>
          </div>
        ))}
      </dl>
      {firm.note && <p className="mt-4 text-sm text-gray-600 leading-6">{firm.note}</p>}
      <p className="mt-4 text-xs text-gray-500">
        Sources (read {READ_DATE}):{" "}
        {firm.sources.map((s, i) => (
          <span key={s.href}>
            {i > 0 && " · "}
            <Ext href={s.href}>{s.label}</Ext>
          </span>
        ))}
      </p>
    </article>
  );
}

const QUESTIONS = [
  "Who will actually do the work, in which roles, and who is your day-to-day contact?",
  "Can you open two or three live projects like yours, and speak to those clients?",
  "What exactly is in scope: pages and templates, content, integrations, migration, accessibility, analytics?",
  "Who owns the code, design files, domain, hosting, analytics and ad accounts on day one and at the end?",
  "How is the price built (fixed fee by milestone, time and materials, or retainer) and what triggers a change order?",
  "Which performance and accessibility targets will the site be built and tested against, and how will they be checked before launch?",
  "If you already have a site: what is the migration plan (URL map, 301 redirects, crawl before and after)?",
  "What do launch day and the first 30 days look like: QA, monitoring, a bug-fix window?",
  "Who maintains the site after launch (hosting, updates, backups, security) and what does support cost?",
  "How are feedback and approvals handled: how many revision rounds, and who signs off?",
  "What happens if the relationship ends: handover documentation, repository access, content export?",
  "What does the firm need from you (content, access, decisions) and by when?",
];

const FAQ: [string, ReactNode][] = [
  [
    "How much does a website cost in the USA?",
    <>There is no single figure. Clutch’s reviewer-reported data says projects typically cost {EVIDENCE.clutchDev.typical}, while the average is {EVIDENCE.clutchDev.average} because a few very large projects pull it up. The most common US agency rate is {EVIDENCE.clutchDev.usHourly} an hour. Get written quotes against the same scope; see the cost section above.</>,
  ],
  [
    "Is the shortlist a ranking?",
    <>No. The firms are grouped by how they describe themselves and listed alphabetically within each group. Nothing is scored, and nobody paid to be included. See how the guide was made.</>,
  ],
  [
    "Should I hire an agency, a freelancer or build in-house?",
    <>It depends on scope, who must own the result, and how much ongoing work you expect. The questions above work for all three. As a benchmark for employing someone, the US Bureau of Labor Statistics reports median pay of {EVIDENCE.bls.developerMedian} a year for web developers (May 2025), which excludes the other costs of employing someone.</>,
  ],
  [
    "How do I check an agency’s claims?",
    <>Open the work it names, ask for references you can call, compare what it says on its own site with independent reviews, and ask for scope and price in writing. Google’s own guidance on hiring SEO help is a useful model: ask for examples of previous work, and be careful if a company is secretive or will not explain what it intends to do.</>,
  ],
  [
    "Does Markit Media build websites?",
    <>Yes. See Where Markit Media fits, and the website development service page. We are not part of the shortlist table.</>,
  ],
];

export function UsWebDevGuide({ locale }: { locale: string }) {
  const l = (path: string) => `/${locale}${path}`;
  const canonical = `${BASE_URL}${PAGE_PATH}`;
  const markitProjects = ["elite", "pur-health", "minhaz-couture"].map((k) => PROJECTS[k]).filter(Boolean);
  const relatedGuides = [
    "top-content-management-systems-for-website-development",
    "shopify-vs-woocommerce-vs-magento-which-platform-is-best",
    "how-much-does-website-development-cost-in-the-usa",
  ]
    .map((id) => legacySeoPageById.get(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: US_GUIDE_H1,
    description: US_GUIDE_DESCRIPTION,
    mainEntityOfPage: canonical,
    datePublished: READ_DATE_ISO,
    dateModified: READ_DATE_ISO,
    author: { "@type": "Organization", name: "Markit Media Research Team", url: BASE_URL },
    publisher: { "@type": "Organization", name: "Markit Media", url: BASE_URL },
  };
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Web development firms in the USA (unranked, alphabetical by group)",
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: FIRMS.length,
    itemListElement: byName.map((f, i) => ({ "@type": "ListItem", position: i + 1, name: f.name, url: f.site })),
  };

  return (
    <article>
      <CallHippoWidget />
      <JsonLd data={articleSchema} />
      <JsonLd data={listSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: "Web development companies in the USA" }]} />

      {/* ---------- header ---------- */}
      <section className="px-6 lg:px-12 pt-24 pb-10 bg-white" aria-label="Page header">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex rounded-full bg-black text-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em]">Guide</span>
            <span className="text-sm text-gray-500">Sources read {READ_DATE}</span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.06]">{US_GUIDE_H1}</h1>
          <p className="text-lg md:text-xl text-gray-600 leading-8 mt-6 max-w-3xl">
            How to choose a web development company in the USA: the cost data we could source, a dated shortlist of 12 US firms with every fact linked to the firm’s own website, and a checklist for judging any agency, including us.
          </p>
          <p className="mt-6 text-sm text-gray-700">
            <strong>By the Markit Media Research Team</strong> · Sources read {READ_DATE} · Researched and drafted with AI assistance; every figure and firm fact was checked against the cited page on the date shown.
          </p>
          <p className="mt-4 border-l-4 border-black bg-gray-50 p-4 text-sm leading-6 max-w-3xl">
            <strong>Disclosure.</strong> Markit Media sells web development. We are not in the shortlist table and were not scored; our own entry is in a separate box (<a href="#markit" className="underline underline-offset-4">Where Markit Media fits</a>). No firm paid to be listed and we did not contact any of them.
          </p>
          <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            {[
              ["#quick-answer", "Quick answer"],
              ["#method", "How this was made"],
              ["#shortlist", "The shortlist"],
              ["#markit", "Where Markit Media fits"],
              ["#costs", "Costs"],
              ["#platforms", "Platforms"],
              ["#evaluate", "How to evaluate"],
              ["#faq", "FAQ"],
              ["#sources", "Sources"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="underline underline-offset-4 decoration-gray-300 hover:decoration-black">{label}</a>
            ))}
          </nav>
        </div>
      </section>

      {/* ---------- quick answer ---------- */}
      <section id="quick-answer" className="px-6 lg:px-12 py-14 bg-gray-50 scroll-mt-24" aria-label="Quick answer">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Quick answer</SectionLabel>
          <ul className="grid gap-4 md:grid-cols-2 mt-4">
            <li className="bg-white border border-gray-200 p-5 leading-7">
              <strong>Typical US agency rate:</strong> {EVIDENCE.clutchDev.usHourly} an hour is the most common rate for web development in Clutch’s reviewer-reported data (updated {EVIDENCE.clutchDev.updated}). The global headline on the same page is {EVIDENCE.clutchDev.globalHourly}, so country matters.
            </li>
            <li className="bg-white border border-gray-200 p-5 leading-7">
              <strong>Typical project:</strong> Clutch says web development projects “typically cost {EVIDENCE.clutchDev.typical}”, yet the average is {EVIDENCE.clutchDev.average} and the average timeline is {EVIDENCE.clutchDev.months} months. A few very large projects pull the average up, so use quotes for your own scope, not the average.
            </li>
            <li className="bg-white border border-gray-200 p-5 leading-7">
              <strong>The 12 firms below:</strong> Clutch’s directory shows minimum project sizes from $5,000+ to $50,000+ and hourly bands from $50–$99 to $150–$199. Two of the 12 publish prices on their own sites.
            </li>
            <li className="bg-white border border-gray-200 p-5 leading-7">
              <strong>Hiring in-house instead:</strong> the US Bureau of Labor Statistics reports median pay of {EVIDENCE.bls.developerMedian} a year for web developers (May 2025). That is wages only, not the full cost of employing someone.
            </li>
          </ul>
        </div>
      </section>

      {/* ---------- method ---------- */}
      <section id="method" className="px-6 lg:px-12 py-16 bg-white scroll-mt-24" aria-label="How this guide was made">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Method</SectionLabel>
          <H2 id="method-title">How this guide was made</H2>
          <ol className="mt-8 space-y-5 list-decimal pl-5 leading-7 text-gray-800">
            <li>
              <strong>Candidates.</strong> We took the first {METHOD_COUNTS.listings} entries on <Ext href={CLUTCH_DIRECTORY.href}>Clutch’s US web-developer directory</Ext> as read on {READ_DATE}. Clutch shows paid placements first, so we ignored order, sponsored labels and badges and used the list only to find candidates. {METHOD_COUNTS.withUsLocation} of the {METHOD_COUNTS.listings} show a US location.
            </li>
            <li>
              <strong>Four checks on each firm’s own website.</strong> (1) It states a US headquarters or office. (2) It lists web design or web development as a service. (3) It names at least three client projects. (4) It shows signs of activity in 2025 or 2026. {METHOD_COUNTS.passed} of {METHOD_COUNTS.withUsLocation} passed. Of the {METHOD_COUNTS.withUsLocation - METHOD_COUNTS.passed} that did not: {METHOD_COUNTS.unreadable} had websites our tools could not read (access denied), {METHOD_COUNTS.noWebService} do not list web design or development as a service, {METHOD_COUNTS.noUsOffice} states no US office on the pages we read, and {METHOD_COUNTS.noRecentDate} showed no 2025 or 2026 date on the pages we read. Not passing is not a judgment on a firm.
            </li>
            <li>
              <strong>Facts.</strong> Every fact about a firm was read from its own pages on {READ_DATE} and re-checked in a second pass. If a firm does not publish something, we say “none found on the pages we read”. Clutch figures (rating, review count, minimum project size, hourly band) are as printed on Clutch’s directory page that day; they are reported by reviewers and firms, not by us.
            </li>
            <li>
              <strong>Groups.</strong> Firms are grouped by how they describe themselves and by the work and industries on their own pages. A firm can suit buyers outside its group. Order inside a group is alphabetical.
            </li>
            <li>
              <strong>Limits.</strong> This is not a ranking and not a complete list: there are far more US firms than 12, and a firm’s absence is not a judgment. Websites change, so facts are accurate as of the date shown.
            </li>
            <li>
              <strong>Corrections.</strong> If a fact about your firm is wrong, email <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4">{CONTACT_EMAIL}</a> and we will fix it.
            </li>
          </ol>
        </div>
      </section>

      {/* ---------- shortlist ---------- */}
      <section id="shortlist" className="px-6 lg:px-12 py-16 bg-gray-50 scroll-mt-24" aria-label="The shortlist">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>Shortlist</SectionLabel>
          <H2 id="shortlist-title">Twelve US web development firms, unranked</H2>
          <p className="mt-4 text-gray-600 leading-7 max-w-3xl">
            At a glance, alphabetical. The detail for each firm, with links to the pages every fact came from, follows in three groups.
          </p>
          <TableWrap caption="Shortlisted firms at a glance, with Clutch rating, review count, minimum project size and hourly band">
            <thead>
              <tr>
                <th scope="col" className={th}>Firm</th>
                <th scope="col" className={th}>Where (as stated)</th>
                <th scope="col" className={th}>Clutch rating (reviews)</th>
                <th scope="col" className={th}>Minimum project (Clutch)</th>
                <th scope="col" className={th}>Hourly band (Clutch)</th>
              </tr>
            </thead>
            <tbody>
              {byName.map((f) => (
                <tr key={f.id}>
                  <th scope="row" className={`${td} font-bold`}>{f.name}</th>
                  <td className={td}>{f.city}</td>
                  <td className={td}>{f.clutch.rating} ({f.clutch.reviews})</td>
                  <td className={td}>{f.clutch.minProject}</td>
                  <td className={td}>{f.clutch.hourly}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
          <p className="mt-3 text-xs text-gray-500">
            Clutch figures as printed on <Ext href={CLUTCH_DIRECTORY.href}>Clutch’s directory</Ext> on {READ_DATE}. They are reported by reviewers and firms.
          </p>

          <div className="mt-14 grid gap-14">
            {GROUPS.map((g) => (
              <div key={g.id}>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight">{g.title}</h3>
                <p className="text-gray-600 mt-2 max-w-3xl leading-7">{g.blurb}</p>
                <div className="grid gap-5 mt-6 lg:grid-cols-2">
                  {FIRMS.filter((f) => f.group === g.id)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((f) => (
                      <FirmCard key={f.id} firm={f} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Markit ---------- */}
      <section id="markit" className="px-6 lg:px-12 py-16 bg-white scroll-mt-24" aria-label="Where Markit Media fits">
        <div className="max-w-5xl mx-auto border-2 border-black p-6 md:p-10">
          <SectionLabel>Disclosure</SectionLabel>
          <H2 id="markit-title">Where Markit Media fits</H2>
          <p className="mt-4 leading-7 text-gray-800 max-w-3xl">
            We publish this guide and sell web development, so we are not in the table above and we did not score ourselves. For comparison, this is what we state about ourselves on our own site.
          </p>
          <dl className="mt-6 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-[11rem_1fr]">
            <dt className="font-bold text-gray-500">What we are</dt>
            <dd className="leading-6">A digital marketing and web development agency.</dd>
            <dt className="font-bold text-gray-500">Where we work</dt>
            <dd className="leading-6">We serve clients across the USA, and in Canada, the United Arab Emirates, the United Kingdom, Australia and Saudi Arabia. Our team works remotely. US phone line: <a href={`tel:${PHONE_US.tel}`} className="underline underline-offset-4">{PHONE_US.display}</a>.</dd>
            <dt className="font-bold text-gray-500">Web services</dt>
            <dd className="leading-6">
              <Link href={l("/services/website-development")} className="underline underline-offset-4">Website development</Link> including{" "}
              <Link href={l("/services/website-development/wordpress")} className="underline underline-offset-4">WordPress</Link>,{" "}
              <Link href={l("/services/website-development/shopify")} className="underline underline-offset-4">Shopify</Link>,{" "}
              <Link href={l("/services/website-development/nextjs")} className="underline underline-offset-4">Next.js</Link>,{" "}
              <Link href={l("/services/website-development/webflow")} className="underline underline-offset-4">Webflow</Link>,{" "}
              <Link href={l("/services/website-development/wix")} className="underline underline-offset-4">Wix</Link> and{" "}
              <Link href={l("/services/website-development/squarespace")} className="underline underline-offset-4">Squarespace</Link>.
            </dd>
            <dt className="font-bold text-gray-500">Projects</dt>
            <dd className="leading-6">
              <ul className="space-y-1">
                {markitProjects.map((p) => (
                  <li key={p.href}>
                    <Link href={l(p.href)} className="font-semibold underline underline-offset-4">{p.client}</Link>: {p.summary}
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href={l("/get-a-quote")} className="inline-flex items-center gap-2 bg-black text-white px-6 py-3.5 font-bold hover:bg-gray-800 transition-colors motion-reduce:transition-none">
              Request a quote <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <UsCallButton />
          </div>
        </div>
      </section>

      {/* ---------- costs ---------- */}
      <section id="costs" className="px-6 lg:px-12 py-16 bg-gray-50 scroll-mt-24" aria-label="Costs">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Costs</SectionLabel>
          <H2 id="costs-title">What web development costs: the data we could source</H2>
          <p className="mt-4 text-gray-600 leading-7 max-w-3xl">
            No source gives one price for a website, and these figures measure different things. Use them to sense-check quotes, not to predict one.
          </p>
          <TableWrap caption="Cost evidence with source, what it measures and its caveat">
            <thead>
              <tr>
                <th scope="col" className={th}>Source</th>
                <th scope="col" className={th}>Figure</th>
                <th scope="col" className={th}>Caveat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={td}><Ext href={EVIDENCE.clutchDev.href}>Clutch, web development</Ext><br /><span className="text-gray-500">updated {EVIDENCE.clutchDev.updated}</span></td>
                <td className={td}>Most common US hourly rate {EVIDENCE.clutchDev.usHourly}; global headline {EVIDENCE.clutchDev.globalHourly}. Projects “typically cost {EVIDENCE.clutchDev.typical}”; average {EVIDENCE.clutchDev.average}; average timeline {EVIDENCE.clutchDev.months} months.</td>
                <td className={td}>Reported by verified reviewers; no sample size stated. The page itself shows the gap between typical and average: a few large projects raise the average.</td>
              </tr>
              <tr>
                <td className={td}><Ext href={EVIDENCE.clutchDesign.href}>Clutch, web design</Ext><br /><span className="text-gray-500">updated {EVIDENCE.clutchDesign.updated}</span></td>
                <td className={td}>US average hourly rate {EVIDENCE.clutchDesign.usHourly}. Agencies “typically charge {EVIDENCE.clutchDesign.range}”; average project {EVIDENCE.clutchDesign.average}; average {EVIDENCE.clutchDesign.months} months.</td>
                <td className={td}>From verified reviews across a database of {EVIDENCE.clutchDesign.agencies}+ web design agencies. Design-only work is priced differently from development.</td>
              </tr>
              <tr>
                <td className={td}><Ext href={CLUTCH_DIRECTORY.href}>Clutch directory</Ext>, the 12 firms above<br /><span className="text-gray-500">read {READ_DATE}</span></td>
                <td className={td}>Minimum project sizes from $5,000+ to $50,000+. Hourly bands from $50–$99 to $150–$199.</td>
                <td className={td}>Shown on each firm’s Clutch listing, so firm-reported.</td>
              </tr>
              <tr>
                <td className={td}>The firms’ own sites<br /><span className="text-gray-500">read {READ_DATE}</span></td>
                <td className={td}>DoodleWeb: minimum project $5,000, retainer hours $50 to $99, fixed-scope websites from $12,000. Perpetual: minimum project $25K.</td>
                <td className={td}>The other ten firms show no prices on the pages we read, so expect to request a quote.</td>
              </tr>
              <tr>
                <td className={td}><Ext href={EVIDENCE.bls.href}>US Bureau of Labor Statistics</Ext><br /><span className="text-gray-500">page modified {EVIDENCE.bls.modified}</span></td>
                <td className={td}>Median pay (May 2025): web developers {EVIDENCE.bls.developerMedian}; web and digital interface designers {EVIDENCE.bls.designerMedian}. {EVIDENCE.bls.jobs} web developer jobs; projected growth {EVIDENCE.bls.growth} from 2025 to 2035.</td>
                <td className={td}>Wages for employees, not the total cost of employing someone.</td>
              </tr>
            </tbody>
          </TableWrap>

          <div className="grid gap-6 md:grid-cols-2 mt-10">
            <div className="bg-white border border-gray-200 p-6">
              <h3 className="font-extrabold text-lg">Pricing models</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-800 list-disc pl-5">
                <li><strong>Fixed price:</strong> scope and price are agreed in writing before work starts; changes go through a change order.</li>
                <li><strong>Time and materials:</strong> you pay for the hours or days used against an estimate.</li>
                <li><strong>Retainer or dedicated team:</strong> a monthly fee for a block of hours or a team.</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 p-6">
              <h3 className="font-extrabold text-lg">What usually moves a quote</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-800 list-disc pl-5">
                <li>The number of different page templates, not the number of pages.</li>
                <li>Integrations: CRM, payments, single sign-on, booking.</li>
                <li>Writing and migrating content.</li>
                <li>Accessibility and performance requirements.</li>
                <li>Custom features versus a CMS theme.</li>
                <li>Timeline and how many people must approve.</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm">
            Try our <Link href={l("/free-tools/free-agency-pricing-calculator")} className="underline underline-offset-4 font-semibold">agency pricing calculator</Link> or compare options with the <Link href={l("/free-tools/free-agency-comparison")} className="underline underline-offset-4 font-semibold">agency comparison tool</Link>.
          </p>
        </div>
      </section>

      {/* ---------- platforms ---------- */}
      <section id="platforms" className="px-6 lg:px-12 py-16 bg-white scroll-mt-24" aria-label="Platforms">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Platforms</SectionLabel>
          <H2 id="platforms-title">Which platform? What websites run on</H2>
          <p className="mt-4 text-gray-600 leading-7 max-w-3xl">
            Usage share is not a recommendation. Choose the platform by who will edit the site, what it must connect to and how it must perform.
          </p>
          <TableWrap caption="Content management system usage from W3Techs">
            <thead>
              <tr>
                <th scope="col" className={th}>Platform</th>
                <th scope="col" className={th}>Share of all websites</th>
                <th scope="col" className={th}>Share of sites with a known CMS</th>
              </tr>
            </thead>
            <tbody>
              {EVIDENCE.w3techs.rows.map(([name, all, known]) => (
                <tr key={name}>
                  <th scope="row" className={`${td} font-bold`}>{name}</th>
                  <td className={td}>{all}</td>
                  <td className={td}>{known || "not shown"}</td>
                </tr>
              ))}
              <tr>
                <th scope="row" className={`${td} font-bold`}>No CMS</th>
                <td className={td}>{EVIDENCE.w3techs.noCms}</td>
                <td className={td}>n/a</td>
              </tr>
            </tbody>
          </TableWrap>
          <p className="mt-3 text-xs text-gray-500">
            Source: <Ext href={EVIDENCE.w3techs.href}>W3Techs, content management systems</Ext>, read {EVIDENCE.w3techs.read}.
          </p>
          <p className="mt-6 text-sm leading-7">
            Related: {relatedGuides.map((p, i) => (
              <span key={p.id}>
                {i > 0 && " · "}
                <Link href={p.path} className="underline underline-offset-4 font-semibold">{legacyTitle(p)}</Link>
              </span>
            ))}
            {" · "}
            <Link href={l("/free-tools/free-web-platform-guide")} className="underline underline-offset-4 font-semibold">Web platform guide (tool)</Link>
          </p>
        </div>
      </section>

      {/* ---------- evaluate ---------- */}
      <section id="evaluate" className="px-6 lg:px-12 py-16 bg-gray-50 scroll-mt-24" aria-label="How to evaluate a web development company">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Evaluate</SectionLabel>
          <H2 id="evaluate-title">How to evaluate any web development company</H2>
          <div className="grid gap-8 lg:grid-cols-2 mt-8">
            <div>
              <h3 className="font-extrabold text-lg">Twelve questions to ask</h3>
              <ol className="mt-3 space-y-2 text-sm leading-6 list-decimal pl-5 text-gray-800">
                {QUESTIONS.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ol>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="font-extrabold text-lg">Put it in the contract</h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 list-disc pl-5 text-gray-800">
                  <li>Ownership of code, design files, domain, hosting and analytics accounts.</li>
                  <li>Payments tied to named deliverables and acceptance criteria.</li>
                  <li>A change-order process and a support window after launch.</li>
                  <li>Handover documentation and repository access.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-extrabold text-lg">Targets to ask for</h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 list-disc pl-5 text-gray-800">
                  <li>
                    <Ext href={EVIDENCE.webVitals.href}>Core Web Vitals</Ext> “good” thresholds, measured at the 75th percentile of page loads: Largest Contentful Paint 2.5 seconds or less, Interaction to Next Paint 200 milliseconds or less, Cumulative Layout Shift 0.1 or less (web.dev, updated {EVIDENCE.webVitals.updated}).
                  </li>
                  <li>
                    Accessibility: <Ext href={EVIDENCE.wcag.href}>WCAG 2.2</Ext> ({EVIDENCE.wcag.status}) defines conformance levels A, AA and AAA. Ask which level the site will meet and how it will be tested.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-extrabold text-lg">Red flags</h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 list-disc pl-5 text-gray-800">
                  <li>
                    Promises about search rankings. Google says: “No one can guarantee a #1 ranking on Google.” and “If they guarantee you that their changes will give you first place in search results, find someone else.” (<Ext href={EVIDENCE.google.href}>Google Search Central</Ext>, updated {EVIDENCE.google.updated})
                  </li>
                  <li>No named people, or no live work you can open and check.</li>
                  <li>Reluctance to put scope, price and ownership in writing.</li>
                  <li>Hosting or code owned by the agency with no handover clause.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="px-6 lg:px-12 py-16 bg-white scroll-mt-24" aria-label="FAQ">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>FAQ</SectionLabel>
          <H2 id="faq-title">Questions people ask</H2>
          <div className="mt-8">
            {FAQ.map(([q, a]) => (
              <details key={q} className="group border-b border-gray-200">
                <summary className="flex justify-between gap-5 items-center py-5 cursor-pointer list-none font-bold">
                  {q}
                  <span aria-hidden="true" className="text-xl text-gray-400 group-open:rotate-45 transition-transform motion-reduce:transition-none">+</span>
                </summary>
                <p className="pb-5 text-gray-600 leading-7">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- sources ---------- */}
      <section id="sources" className="px-6 lg:px-12 py-16 bg-gray-50 scroll-mt-24" aria-label="Sources and change log">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Sources</SectionLabel>
          <H2 id="sources-title">Sources and change log</H2>
          <ol className="mt-6 space-y-2 text-sm leading-6 list-decimal pl-5 text-gray-800">
            <li><Ext href={CLUTCH_DIRECTORY.href}>{CLUTCH_DIRECTORY.label}</Ext>, read {READ_DATE} (candidate list and the Clutch figures per firm).</li>
            <li><Ext href={EVIDENCE.clutchDev.href}>Clutch: web developer pricing</Ext>, updated {EVIDENCE.clutchDev.updated}.</li>
            <li><Ext href={EVIDENCE.clutchDesign.href}>Clutch: web designer pricing</Ext>, updated {EVIDENCE.clutchDesign.updated}.</li>
            <li><Ext href={EVIDENCE.bls.href}>US Bureau of Labor Statistics, Occupational Outlook Handbook: web developers and digital designers</Ext>, page modified {EVIDENCE.bls.modified}.</li>
            <li><Ext href={EVIDENCE.w3techs.href}>W3Techs: usage statistics of content management systems</Ext>, read {EVIDENCE.w3techs.read}.</li>
            <li><Ext href={EVIDENCE.webVitals.href}>web.dev: Web Vitals</Ext>, updated {EVIDENCE.webVitals.updated}.</li>
            <li><Ext href={EVIDENCE.wcag.href}>W3C: Web Content Accessibility Guidelines (WCAG) 2.2</Ext>.</li>
            <li><Ext href={EVIDENCE.google.href}>Google Search Central: Do you need an SEO?</Ext>, updated {EVIDENCE.google.updated}.</li>
            <li>Each firm’s own pages, linked in its card above, read {READ_DATE}.</li>
          </ol>
          <h3 className="font-extrabold text-lg mt-8">Change log</h3>
          <ul className="mt-2 space-y-1 text-sm leading-6 list-disc pl-5 text-gray-800">
            {CHANGE_LOG.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <GuideRelated guideId={US_GUIDE_ID} locale={locale} />

      <section className="px-6 lg:px-12 py-20 bg-white" aria-label="Next step">
        <div className="max-w-4xl mx-auto text-center border border-gray-200 p-8 md:p-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold tracking-tight">Need help choosing or scoping a web project?</h2>
          <p className="text-gray-600 leading-7 mt-4 max-w-2xl mx-auto">Tell us what the site must do and we will help you write a scope you can send to any agency, including us.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <Link href={l("/get-a-quote")} className="bg-black text-white px-6 py-3.5 font-bold hover:bg-gray-800 transition-colors motion-reduce:transition-none">Request a quote</Link>
            <Link href={l("/services/website-development")} className="border border-gray-300 px-6 py-3.5 font-bold hover:border-black transition-colors motion-reduce:transition-none">Website development services</Link>
            <UsCallButton />
          </div>
        </div>
      </section>
    </article>
  );
}
