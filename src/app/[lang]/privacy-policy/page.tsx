import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Markit Media collects, uses, shares and protects personal data, which cookies and tracking tools we use, how long we keep data, and how to exercise your privacy rights.",
  alternates: { canonical: "https://themarkitmedia.com/en/privacy-policy" },
  openGraph: {
    url: "https://themarkitmedia.com/en/privacy-policy",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Privacy Policy",
    description: "How Markit Media collects, uses, and protects your data, and the choices you have.",
  },
};

const EFFECTIVE = "15 October 2026";
const EMAIL = "ciao@themarkitmedia.com";

const toc: [string, string][] = [
  ["who-we-are", "Who we are"],
  ["information-we-collect", "Information we collect"],
  ["cookies", "Cookies and tracking technologies"],
  ["how-we-use", "How we use information"],
  ["sharing", "Who we share information with"],
  ["advertising", "Advertising and 'sale' or 'sharing'"],
  ["transfers", "International transfers"],
  ["retention", "How long we keep information"],
  ["rights", "Your rights and choices"],
  ["gpc", "Global Privacy Control and Do Not Track"],
  ["security", "Security"],
  ["children", "Children"],
  ["links", "Third-party links and embeds"],
  ["changes", "Changes to this policy"],
  ["contact", "Contact us"],
];

const H2 = "font-[family-name:var(--font-display)] text-xl font-bold text-black mt-12 scroll-mt-28";
const P = "text-base leading-relaxed";
const UL = "list-disc pl-6 space-y-2 text-base leading-relaxed";
const TH = "text-left font-bold text-black bg-gray-50 border border-gray-200 px-3 py-2 align-top";
const TD = "border border-gray-200 px-3 py-2 align-top text-sm leading-relaxed";

function Mail() {
  return (
    <a href={`mailto:${EMAIL}`} className="text-black font-bold hover:underline">
      {EMAIL}
    </a>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <>
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h} scope="col" className={TH}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]}>
                {r.map((c, i) => (
                  <td key={i} className={TD}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Small screens: one card per row instead of a cramped table. */}
      <div className="sm:hidden space-y-3">
        {rows.map((r) => (
          <div key={r[0]} className="border border-gray-200 p-4 text-sm leading-relaxed">
            <p className="font-bold text-black">{r[0]}</p>
            {r.slice(1).map((c, i) => (
              <p key={i} className="mt-2">
                <span className="font-semibold text-gray-800">{head[i + 1]}: </span>
                {c}
              </p>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <article>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <section aria-label="Privacy Policy" className="px-6 lg:px-12 pt-24 pb-20">
        <div className="max-w-3xl mx-auto text-gray-600">
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-extrabold text-black tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className={P}>
            <strong>Effective date:</strong> {EFFECTIVE} &nbsp;|&nbsp; <strong>Last updated:</strong> {EFFECTIVE}
          </p>

          <div className="mt-8 border border-gray-200 bg-gray-50 p-6">
            <h2 className="font-[family-name:var(--font-display)] text-base font-bold text-black">Summary</h2>
            <ul className={`${UL} mt-3`}>
              <li>We collect what you send us (forms, emails, WhatsApp) and standard analytics and advertising data when you browse.</li>
              <li>We use it to answer you, deliver and improve our services, measure our marketing and keep the site secure.</li>
              <li>We do not sell your personal data for money. Advertising tools such as the Meta Pixel and Google tags may count as &ldquo;sharing&rdquo; for advertising in some laws; you can opt out at any time (see <a href="#advertising" className="text-black font-bold hover:underline">Advertising</a>).</li>
              <li>You can ask us to access, correct or delete your data by emailing <Mail />.</li>
            </ul>
          </div>

          <nav aria-label="Contents" className="mt-8">
            <h2 className="font-[family-name:var(--font-display)] text-base font-bold text-black">Contents</h2>
            <ol className="mt-3 grid sm:grid-cols-2 gap-x-8 gap-y-1 list-decimal pl-6 text-base">
              {toc.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="hover:text-black hover:underline">
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-6">
            <h2 id="who-we-are" className={H2}>1. Who we are</h2>
            <p className={P}>
              Markit Media (&ldquo;Markit Media&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a digital marketing, website development and creative agency based in Karachi, Pakistan. We operate the website
              themarkitmedia.com (the &ldquo;Site&rdquo;) and serve businesses in the USA, Canada, UAE, UK, Australia, Saudi Arabia and elsewhere. For the personal data described in this policy, Markit Media is
              the controller (or &ldquo;business&rdquo;) and decides how and why it is used.
            </p>
            <p className={P}>
              This policy covers the Site, our forms and email addresses, our WhatsApp and phone contact details, and our client dashboard. It does not cover third-party websites we link to, or the personal
              data we handle on behalf of clients when we run their campaigns, websites or accounts; for that work the client is responsible and we act as their processor under our agreement with them.
            </p>

            <h2 id="information-we-collect" className={H2}>2. Information we collect</h2>
            <Table
              head={["Category", "What it includes", "How we get it"]}
              rows={[
                ["Enquiry and quote requests", "Name, email, phone or WhatsApp number, company, service of interest, budget, timeline and the message you write.", "You submit the contact or quote form, or email, call or message us."],
                ["Discovery briefs", "Brand and business details you choose to share: website or social links, launch stage, markets, goals, audiences, platforms, advertising budget, notes and references.", "You complete the discovery brief form."],
                ["Newsletter and tool sign-ups", "Email address and the page or tool you signed up from.", "You submit an email address on the Site."],
                ["Marketing source details", "The page you landed on, the referring site and campaign (UTM) parameters, saved with your enquiry so we know which marketing works.", "Collected automatically when you submit a form."],
                ["Technical and usage data", "IP address, browser and device type, approximate location (country or city), pages viewed, clicks, form starts and other events, and cookie or device identifiers.", "Collected automatically by the Site and our analytics and advertising tools."],
                ["Account and security data", "For people with dashboard accounts: name, email address, login codes, sign-in activity and IP address.", "You or our team create the account; collected when you sign in."],
                ["Communications", "The content of emails, WhatsApp messages and calls (notes) between you and us.", "When you contact us or we contact you."],
              ]}
            />
            <p className={P}>
              We do not ask for sensitive categories of personal data (for example health, financial account or government ID numbers). Please do not include them in forms or messages.
            </p>

            <h2 id="cookies" className={H2}>3. Cookies and tracking technologies</h2>
            <p className={P}>
              The Site uses cookies and similar technologies (such as local storage and tracking pixels) for analytics, advertising measurement and to remember your choices. They load automatically when you
              visit. You can change or withdraw your choice at any time with the <strong>Cookie settings</strong> link in the footer, with a Global Privacy Control signal (see section 10), or in your browser
              settings.
            </p>
            <Table
              head={["Provider", "Purpose", "Examples", "Typical lifetime"]}
              rows={[
                ["Google Analytics 4 (via Google Tag Manager, loaded through Cloudflare Zaraz)", "Measures traffic and how the Site is used. Google signals are enabled on our property.", "_ga, _ga_*", "Up to 2 years"],
                ["Google Ads and Tag Manager", "Measures ad conversions and supports remarketing.", "_gcl_au, _gcl_aw and similar", "About 90 days"],
                ["Meta Pixel (Meta Platforms)", "Measures visits and ad performance on Facebook and Instagram and builds advertising audiences.", "_fbp, _fbc", "About 90 days"],
                ["Cloudflare", "Hosting, content delivery, security and privacy-friendly traffic statistics (Web Analytics).", "Security and performance cookies set as needed", "Session to a few days"],
                ["YouTube (Google)", "Plays embedded videos. Google receives your IP address and may set cookies when you play a video.", "Set by youtube.com", "Varies"],
                ["Our Site", "Remembers your cookie preference.", "cookie-consent, cookie-consent-source (local storage)", "Until you clear your browser data"],
              ]}
            />
            <p className={P}>
              Lifetimes are the providers&rsquo; typical defaults and can change. We do not use cookies to make decisions that have legal or similarly significant effects on you.
            </p>

            <h2 id="how-we-use" className={H2}>4. How we use information</h2>
            <Table
              head={["Purpose", "Examples", "Legal basis (UK and EU/EEA GDPR)"]}
              rows={[
                ["Respond to you and provide services", "Answer enquiries, prepare proposals, run projects, send invoices, support clients.", "Steps at your request before a contract; performance of a contract"],
                ["Run and secure the Site", "Prevent spam and abuse, rate-limit forms, protect accounts, fix errors.", "Legitimate interests (keeping the Site and our systems safe)"],
                ["Understand and improve the Site", "Analytics, testing, content and performance improvements.", "Legitimate interests; consent where the law requires it"],
                ["Market our services", "Measure and improve our advertising, remarketing, send newsletters or follow-ups to people who asked for them.", "Legitimate interests; consent where the law requires it. You can object or opt out at any time"],
                ["Meet legal obligations", "Tax, accounting, responding to lawful requests, enforcing our rights.", "Legal obligation; legitimate interests"],
              ]}
            />
            <p className={P}>We do not use automated decision-making that produces legal or similarly significant effects about you.</p>

            <h2 id="sharing" className={H2}>5. Who we share information with</h2>
            <p className={P}>We share personal data only as needed, with these types of recipient:</p>
            <Table
              head={["Recipient", "What for"]}
              rows={[
                ["Cloudflare", "Website hosting, content delivery, security, our site database and file storage, tag loading and traffic statistics."],
                ["MongoDB (Atlas)", "Database that stores enquiries, briefs, newsletter sign-ups and dashboard records."],
                ["Resend", "Sending transactional email such as enquiry notifications, acknowledgements and dashboard sign-in codes."],
                ["Zoho", "Business email and communications."],
                ["Google (Analytics, Tag Manager, Ads, YouTube)", "Analytics, advertising measurement and embedded video."],
                ["Meta Platforms (Meta Pixel, WhatsApp)", "Advertising measurement and audiences; messaging if you contact us on WhatsApp."],
                ["Team messaging and project tools", "Internal notifications about new enquiries so we can reply quickly."],
                ["Professional advisers, authorities and successors", "Lawyers, accountants and insurers; public authorities where the law requires; a buyer or successor if our business changes hands."],
              ]}
            />
            <p className={P}>
              These providers process data under their own terms and policies, and, where they act for us, under data-processing terms. We do not sell personal data for money.
            </p>

            <h2 id="advertising" className={H2}>6. Advertising and &ldquo;sale&rdquo; or &ldquo;sharing&rdquo;</h2>
            <p className={P}>
              We use Google advertising tools and the Meta Pixel to measure our own advertising and to show our ads to people who visited the Site. Under some laws (for example California&rsquo;s CCPA/CPRA),
              disclosing identifiers and internet activity (such as cookie IDs, IP address and pages viewed) to advertising partners for this purpose can be called &ldquo;sharing&rdquo; for cross-context
              behavioural advertising. In the last 12 months we have shared those categories with Google and Meta for that purpose. We do not knowingly sell or share the personal data of anyone under 16.
            </p>
            <p className={P}>
              <strong>To opt out:</strong> click <strong>Cookie settings</strong> in the footer and choose Dismiss, or use a browser or extension that sends a Global Privacy Control signal. You can also email{" "}
              <Mail />. Opting out stops the Meta Pixel and Google tracking on this device; it does not affect ads you see elsewhere.
            </p>

            <h2 id="transfers" className={H2}>7. International transfers</h2>
            <p className={P}>
              We are based in Pakistan and our providers operate globally, so your information may be processed in Pakistan, the United States, the European Union and other countries. Where the law
              requires, we rely on safeguards such as standard contractual clauses offered by our providers, or other lawful transfer mechanisms.
            </p>

            <h2 id="retention" className={H2}>8. How long we keep information</h2>
            <Table
              head={["Data", "How long"]}
              rows={[
                ["Enquiries, briefs and project correspondence", "For as long as needed to deal with your enquiry, deliver services and keep our business and legal records, then deleted or anonymised. You can ask us to delete it sooner."],
                ["Newsletter sign-ups", "Until you unsubscribe or ask us to delete your address."],
                ["Google Analytics data", "14 months (the retention period configured on our Google Analytics property)."],
                ["Security and anti-spam counters (IP-based)", "Short-lived: from about one minute up to 24 hours."],
                ["Dashboard account and activity records", "While the account is active and for a reasonable period afterwards for security and audit purposes."],
                ["Cookie preference", "Stored on your device until you clear your browser data."],
              ]}
            />
            <p className={P}>We may keep information longer where the law requires it or where it is needed to establish, exercise or defend legal claims.</p>

            <h2 id="rights" className={H2}>9. Your rights and choices</h2>
            <p className={P}>Depending on where you live, you may have the right to:</p>
            <ul className={UL}>
              <li>access the personal data we hold about you and receive a copy;</li>
              <li>correct inaccurate or incomplete data;</li>
              <li>delete your data (&ldquo;erasure&rdquo;);</li>
              <li>restrict or object to certain processing, including direct marketing and profiling for advertising;</li>
              <li>receive your data in a portable format;</li>
              <li>withdraw consent at any time where we rely on consent (this does not affect earlier processing);</li>
              <li>opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal data, and not be discriminated against for exercising your rights (California and similar laws); and</li>
              <li>lodge a complaint with your data-protection authority (for example the ICO in the UK, your national authority in the EU/EEA, the Office of the Privacy Commissioner of Canada, or the OAIC in Australia).</li>
            </ul>
            <p className={P}>
              These rights come from laws such as the UK GDPR and EU GDPR, the California Consumer Privacy Act (as amended), Canada&rsquo;s PIPEDA and Quebec&rsquo;s Law 25, the Australian Privacy Act, and the
              personal data protection laws of the UAE and Saudi Arabia.
            </p>
            <p className={P}>
              <strong>How to exercise them:</strong> email <Mail /> with &ldquo;Privacy request&rdquo; in the subject and tell us what you want. We may need to verify your identity, and an authorised agent can
              act for you with your written permission. We respond within the time the law allows (generally one month in the UK and EU, and 45 days in California). You can unsubscribe from newsletters at any
              time using the link in the email.
            </p>

            <h2 id="gpc" className={H2}>10. Global Privacy Control and Do Not Track</h2>
            <p className={P}>
              We treat a Global Privacy Control (GPC) signal from your browser as a request to opt out of advertising and analytics tracking on this device, unless you have chosen otherwise using Cookie
              settings. We do not respond to the older &ldquo;Do Not Track&rdquo; header because there is no agreed standard for it.
            </p>

            <h2 id="security" className={H2}>11. Security</h2>
            <p className={P}>
              We use measures that include encrypted connections (HTTPS), access controls, two-step sign-in (password plus an emailed code) for the dashboard, and rate limiting against abuse. No system is
              completely secure, and we cannot guarantee absolute security. If a breach affects your data we will notify you and the relevant authorities as the law requires.
            </p>

            <h2 id="children" className={H2}>12. Children</h2>
            <p className={P}>
              The Site and our services are for businesses and are not directed to children under 16. We do not knowingly collect personal data from children. If you believe a child has given us data,
              email <Mail /> and we will delete it.
            </p>

            <h2 id="links" className={H2}>13. Third-party links and embeds</h2>
            <p className={P}>
              The Site links to and embeds third-party services such as YouTube, WhatsApp and social networks. Their privacy practices are their own; please read their policies before you use them.
            </p>

            <h2 id="changes" className={H2}>14. Changes to this policy</h2>
            <p className={P}>
              We may update this policy to reflect changes to the Site, our tools or the law. The effective date at the top shows the latest version. If a change is significant we will make it clear on the
              Site.
            </p>

            <h2 id="contact" className={H2}>15. Contact us</h2>
            <p className={P}>
              Markit Media, Karachi, Pakistan<br />
              Email: <Mail /><br />
              Phone / WhatsApp: <a href="tel:+923002086081" className="text-black font-bold hover:underline">+92 300 2086081</a> <br />US phone: <a href="tel:+16065177561" className="text-black font-bold hover:underline">+1 (606) 517-7561</a>
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
