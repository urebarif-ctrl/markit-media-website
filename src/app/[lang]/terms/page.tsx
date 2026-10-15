import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Markit Media: how you may use our website and free tools, and the terms that apply to our digital marketing, web development, branding and related services.",
  alternates: { canonical: "https://themarkitmedia.com/en/terms" },
  openGraph: {
    url: "https://themarkitmedia.com/en/terms",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Terms of Service",
    description: "The terms for using the Markit Media website and for our digital marketing, web development and creative services.",
  },
};

const EFFECTIVE = "15 October 2026";
const EMAIL = "ciao@themarkitmedia.com";

const toc: [string, string][] = [
  ["about", "About these terms"],
  ["website", "Using our website and free tools"],
  ["services", "Our services"],
  ["responsibilities", "Client responsibilities"],
  ["results", "Third-party platforms and results"],
  ["payment", "Payment terms"],
  ["ip", "Intellectual property"],
  ["confidentiality", "Confidentiality"],
  ["data", "Data protection"],
  ["warranties", "Disclaimers"],
  ["liability", "Limitation of liability"],
  ["indemnity", "Indemnity"],
  ["termination", "Termination"],
  ["law", "Governing law and disputes"],
  ["general", "General"],
  ["changes", "Changes to these terms"],
  ["contact", "Contact"],
];

const H2 = "font-[family-name:var(--font-display)] text-xl font-bold text-black mt-12 scroll-mt-28";
const P = "text-base leading-relaxed";
const UL = "list-disc pl-6 space-y-2 text-base leading-relaxed";

function Mail() {
  return (
    <a href={`mailto:${EMAIL}`} className="text-black font-bold hover:underline">
      {EMAIL}
    </a>
  );
}

export default function TermsPage() {
  return (
    <article>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />
      <section aria-label="Terms of Service" className="px-6 lg:px-12 pt-24 pb-20">
        <div className="max-w-3xl mx-auto text-gray-600">
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-extrabold text-black tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className={P}>
            <strong>Effective date:</strong> {EFFECTIVE} &nbsp;|&nbsp; <strong>Last updated:</strong> {EFFECTIVE}
          </p>

          <div className="mt-8 border border-gray-200 bg-gray-50 p-6">
            <h2 className="font-[family-name:var(--font-display)] text-base font-bold text-black">Summary</h2>
            <ul className={`${UL} mt-3`}>
              <li>Using this website and our free tools is subject to these terms.</li>
              <li>Our client work is governed by the proposal, statement of work or agreement we sign with you; these terms apply alongside it.</li>
              <li>You own the deliverables we create specifically for you once they are paid in full.</li>
              <li>We do not guarantee specific rankings, traffic, leads or sales, because platforms and markets are outside our control.</li>
              <li>Either side can end services with 30 days&rsquo; written notice. See <a href="#termination" className="text-black font-bold hover:underline">Termination</a>.</li>
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
            <h2 id="about" className={H2}>1. About these terms</h2>
            <p className={P}>
              These Terms of Service (&ldquo;Terms&rdquo;) apply to your use of themarkitmedia.com (the &ldquo;Site&rdquo;) and to the digital marketing, website development, branding, creative and
              related services (the &ldquo;Services&rdquo;) that Markit Media (&ldquo;Markit Media&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), based in Karachi, Pakistan, provides to clients
              (&ldquo;you&rdquo; or &ldquo;Client&rdquo;).
            </p>
            <p className={P}>
              By using the Site you accept these Terms. If you engage us for Services, the proposal, statement of work, order or written agreement we sign or accept with you (an
              &ldquo;Agreement&rdquo;) applies together with these Terms. If they conflict, the Agreement prevails for the Services it covers. How we handle personal data is explained in our{" "}
              <a href="/en/privacy-policy" className="text-black font-bold hover:underline">Privacy Policy</a>.
            </p>

            <h2 id="website" className={H2}>2. Using our website and free tools</h2>
            <p className={P}>You may use the Site and our free tools, calculators, checklists and articles for lawful business and personal purposes. You agree not to:</p>
            <ul className={UL}>
              <li>use the Site in a way that breaks any law or the rights of others;</li>
              <li>attempt to gain unauthorised access to the Site, our dashboard, accounts or systems, or probe, scan or test their security without our written permission;</li>
              <li>interfere with or overload the Site, or use bots or scripts to scrape it or to submit forms automatically;</li>
              <li>submit false, misleading or spam information through our forms, or send us malicious code; or</li>
              <li>copy, resell or republish our content at scale without our written permission.</li>
            </ul>
            <p className={P}>
              The articles, tools and calculators on the Site are for general information. Their results are estimates based on the information you enter, and they are not legal, financial, tax or other
              professional advice. You use them at your own risk and should check anything important with a qualified professional.
            </p>

            <h2 id="services" className={H2}>3. Our services</h2>
            <p className={P}>
              Markit Media provides digital marketing, website development, branding, and related services as agreed upon in individual service agreements or proposals. The scope, deliverables, timelines
              and fees for each engagement are set out in the relevant Agreement.
            </p>
            <p className={P}>
              Work outside the agreed scope is handled as a change request. We will tell you in writing if a change affects fees or timelines, and we start the extra work once you agree. We may use
              subcontractors and software providers to deliver the Services, and we remain responsible for their work under the Agreement.
            </p>

            <h2 id="responsibilities" className={H2}>4. Client responsibilities</h2>
            <p className={P}>
              Clients are responsible for providing accurate information, timely feedback, and necessary access to accounts and platforms required for service delivery. You also agree that:
            </p>
            <ul className={UL}>
              <li>you have the right to give us the content, logos, images, data and account access you supply, and that using them as instructed will not infringe anyone&rsquo;s rights;</li>
              <li>your business, products and advertising comply with applicable laws and with the policies of the platforms we use for you (for example advertising and data-use policies); and</li>
              <li>delays in providing information, approvals or access may delay delivery, and we are not responsible for delays caused by them.</li>
            </ul>

            <h2 id="results" className={H2}>5. Third-party platforms and results</h2>
            <p className={P}>
              Many Services depend on third-party platforms such as search engines, social networks, advertising networks, hosting and email providers. Those platforms set their own rules, may change
              algorithms, policies or prices, and may approve, reject or suspend ads and accounts at their discretion. We therefore do not guarantee particular rankings, traffic, leads, sales, return on ad
              spend or platform approvals. Any forecasts or examples we give are estimates and not promises.
            </p>
            <p className={P}>
              Advertising spend paid to platforms is separate from our fees unless an Agreement says otherwise. Your use of third-party platforms is subject to their terms.
            </p>

            <h2 id="payment" className={H2}>6. Payment terms</h2>
            <p className={P}>
              Payment terms are specified in individual service agreements. Invoices are due upon receipt unless otherwise agreed in writing. Unless an Agreement states otherwise, fees exclude applicable
              taxes and bank or payment-processor charges, which you are responsible for.
            </p>
            <p className={P}>
              If an invoice is not paid by its due date, we may, after giving you notice, pause work on the affected Services until payment is received. Fees for work completed remain due.
            </p>

            <h2 id="ip" className={H2}>7. Intellectual property</h2>
            <p className={P}>
              Upon full payment, clients receive ownership of deliverables created specifically for them. Markit Media retains the right to use anonymized work samples in portfolio materials.
            </p>
            <ul className={UL}>
              <li><strong>Your materials.</strong> You keep ownership of the content, brand assets and data you give us, and you allow us to use them to deliver the Services.</li>
              <li><strong>Our tools and know-how.</strong> We keep our pre-existing tools, templates, code libraries, processes and know-how, and any general skills and techniques we develop. Where they are part of a deliverable, you may use them as part of that deliverable.</li>
              <li><strong>Third-party materials.</strong> Stock assets, fonts, plugins, themes and software remain subject to their own licences, which may carry separate costs or conditions.</li>
              <li><strong>The Site.</strong> The Site&rsquo;s design, text, graphics, tools and trademarks belong to Markit Media or its licensors. Nothing on the Site transfers any right in them to you, except the right to use the Site as these Terms allow.</li>
            </ul>

            <h2 id="confidentiality" className={H2}>8. Confidentiality</h2>
            <p className={P}>
              Both parties agree to keep confidential information private and not disclose it to third parties without prior written consent. This does not apply to information that is or becomes public
              without breach of these Terms, was already known to the receiving party, is independently developed, or must be disclosed by law or a legal authority (in which case we will tell you where
              we are allowed to). It also does not prevent us from sharing it with the subcontractors and providers who need it to deliver the Services and who are bound to keep it confidential.
            </p>

            <h2 id="data" className={H2}>9. Data protection</h2>
            <p className={P}>
              Our handling of personal data collected through the Site is described in the{" "}
              <a href="/en/privacy-policy" className="text-black font-bold hover:underline">Privacy Policy</a>. Where we process personal data on your behalf while delivering the Services (for example
              customer lists or advertising audiences), you are responsible for having a lawful basis and any required notices and consents, and we process that data only on your instructions and in line
              with applicable data-protection law. Contact us if you need a data-processing agreement.
            </p>

            <h2 id="warranties" className={H2}>10. Disclaimers</h2>
            <p className={P}>
              The Site and free tools are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. To the fullest extent the law allows, we disclaim all implied warranties, including
              merchantability, fitness for a particular purpose and non-infringement, and we do not promise that the Site will be uninterrupted or error-free. We will deliver the Services with reasonable
              skill and care, but we do not warrant any particular outcome (see section 5). Nothing in these Terms excludes rights you have under consumer or other laws that cannot be excluded.
            </p>

            <h2 id="liability" className={H2}>11. Limitation of liability</h2>
            <p className={P}>
              Markit Media&apos;s liability is limited to the fees paid for the specific services in question. We are not liable for indirect, incidental, or consequential damages, including lost profits,
              lost revenue, lost data or loss of goodwill. Nothing in these Terms limits liability that cannot be limited by law, such as liability for fraud or for death or personal injury caused by
              negligence.
            </p>

            <h2 id="indemnity" className={H2}>12. Indemnity</h2>
            <p className={P}>
              You agree to cover reasonable losses and costs we incur from third-party claims arising from materials, instructions or account access you supplied that infringe rights or break the law,
              or from your breach of these Terms. We will tell you promptly about any such claim and let you take part in handling it.
            </p>

            <h2 id="termination" className={H2}>13. Termination</h2>
            <p className={P}>
              Either party may terminate services with 30 days written notice. Fees for work completed prior to termination remain due. Either party may also end an engagement immediately by written notice
              if the other commits a material breach that is not fixed within a reasonable period after notice. On termination we will return or delete your materials and hand over completed deliverables
              (subject to payment), and any terms that by their nature should continue (such as payment, intellectual property, confidentiality, liability and governing law) will continue.
            </p>
            <p className={P}>We may suspend or restrict access to the Site or our dashboard for anyone who breaches section 2.</p>

            <h2 id="law" className={H2}>14. Governing law and disputes</h2>
            <p className={P}>
              These Terms are governed by the laws of Pakistan, unless an Agreement states a different governing law. We encourage you to contact us first so we can try to resolve any concern in good
              faith. If we cannot, the courts of Karachi, Pakistan have jurisdiction, unless an Agreement states otherwise or the law gives you the right to bring a claim elsewhere.
            </p>

            <h2 id="general" className={H2}>15. General</h2>
            <ul className={UL}>
              <li><strong>Force majeure.</strong> Neither party is liable for delay or failure caused by events beyond its reasonable control, such as outages, platform or network failures, natural events or government action.</li>
              <li><strong>Entire agreement.</strong> These Terms and any Agreement are the whole agreement for the Services and replace earlier discussions about them.</li>
              <li><strong>Severability and waiver.</strong> If a provision is unenforceable, the rest continues. Not enforcing a right is not a waiver of it.</li>
              <li><strong>Assignment.</strong> You may not transfer your rights or obligations without our written consent. We may transfer ours as part of a business transfer or to an affiliate.</li>
              <li><strong>Notices.</strong> Notices may be given by email to the addresses each party uses for the relationship (ours is below).</li>
              <li><strong>Language.</strong> These Terms are written in English, which prevails over any translation.</li>
            </ul>

            <h2 id="changes" className={H2}>16. Changes to these terms</h2>
            <p className={P}>
              We may update these Terms from time to time. The effective date above shows the latest version, and the version in force when you use the Site applies to that use. For active Agreements, changes
              that affect the Services apply only where agreed in writing.
            </p>

            <h2 id="contact" className={H2}>17. Contact</h2>
            <p className={P}>
              For questions about these terms, contact us at <Mail />.<br />
              Markit Media, Karachi, Pakistan &nbsp;|&nbsp; Phone / WhatsApp:{" "}
              <a href="tel:+923002086081" className="text-black font-bold hover:underline">+92 300 2086081</a><br />
              US phone: <a href="tel:+16065177561" className="text-black font-bold hover:underline">+1 (606) 517-7561</a>
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
