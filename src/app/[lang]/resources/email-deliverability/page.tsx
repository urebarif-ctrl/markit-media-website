"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

interface CheckItem {
  id: string;
  label: string;
  why: string;
  action: string;
}

interface Section {
  id: string;
  title: string;
  items: CheckItem[];
}

const sections: Section[] = [
  {
    id: "auth",
    title: "Authentication Setup",
    items: [
      {
        id: "auth-spf",
        label: "SPF record configured",
        why: "SPF tells receiving servers which IPs are authorized to send on your behalf. Without it, your emails are more likely to be flagged as spoofed.",
        action: "Add an SPF TXT record to your domain DNS. Include all services that send email for your domain (e.g., your ESP, transactional email service, CRM).",
      },
      {
        id: "auth-dkim",
        label: "DKIM signing enabled",
        why: "DKIM adds a cryptographic signature to your emails, proving they have not been tampered with in transit. Unsigned emails lose trust with major inbox providers.",
        action: "Generate a DKIM key pair through your email service provider and publish the public key as a DNS TXT record. Verify signing is active on test sends.",
      },
      {
        id: "auth-dmarc",
        label: "DMARC policy set",
        why: "DMARC ties SPF and DKIM together and tells receivers what to do with unauthenticated mail. Without it, spoofers can send email that appears to come from your domain.",
        action: "Start with a DMARC policy of p=none to monitor, then move to p=quarantine or p=reject once you confirm all legitimate sources are authenticated.",
      },
      {
        id: "auth-ip",
        label: "Dedicated sending IP",
        why: "On a shared IP, another sender's poor practices can damage your reputation. A dedicated IP means your deliverability depends only on your own behavior.",
        action: "Request a dedicated IP from your ESP if you send more than 50,000 emails per month. For lower volumes, a reputable shared IP pool is usually sufficient.",
      },
      {
        id: "auth-from",
        label: 'Consistent "From" address',
        why: "Frequent changes to your sender name or address confuse recipients and spam filters. Consistency builds recognition and trust over time.",
        action: 'Pick a "From" name and address for each email type (marketing, transactional) and stick with it. Avoid using no-reply addresses for marketing.',
      },
    ],
  },
  {
    id: "hygiene",
    title: "List Hygiene",
    items: [
      {
        id: "hyg-bounce",
        label: "Regular bounce removal",
        why: "Sending to addresses that consistently bounce signals to ISPs that you do not maintain your list, which lowers your sender reputation.",
        action: "Configure your ESP to automatically suppress hard bounces after the first occurrence. Review soft bounces weekly and remove addresses that fail repeatedly.",
      },
      {
        id: "hyg-optin",
        label: "Double opt-in enabled",
        why: "Double opt-in confirms the subscriber actually owns the email address. It reduces typos, spam traps, and complaint rates significantly.",
        action: "Enable confirmed opt-in on all signup forms. Send a simple confirmation email with a single link to verify the subscription.",
      },
      {
        id: "hyg-unsub",
        label: "Easy unsubscribe process",
        why: "If unsubscribing is difficult, recipients will mark your email as spam instead. Spam complaints directly damage your sender reputation.",
        action: "Include a one-click unsubscribe link in every email. Add a List-Unsubscribe header so email clients can show their own unsubscribe button.",
      },
      {
        id: "hyg-purchased",
        label: "No purchased or rented lists",
        why: "Purchased lists contain spam traps, inactive addresses, and people who never consented. Sending to them can get your domain blacklisted.",
        action: "Build your list organically through opt-in forms, lead magnets, and content. Remove any contacts whose origin you cannot verify.",
      },
      {
        id: "hyg-segment",
        label: "Engagement-based segmentation",
        why: "Sending to disengaged subscribers lowers your open rates, which ISPs use as a signal of sender quality. Low engagement drags down deliverability for your entire list.",
        action: "Segment your list by last engagement date. Send more frequently to active subscribers and run re-engagement campaigns for those inactive for 90+ days.",
      },
    ],
  },
  {
    id: "content",
    title: "Content Quality",
    items: [
      {
        id: "cnt-ratio",
        label: "Balanced text-to-image ratio",
        why: "Emails that are mostly images with little text trigger spam filters. Some email clients block images by default, leaving recipients with a blank email.",
        action: "Aim for at least 60% text and no more than 40% images. Always include alt text on images and ensure the email is readable without images loaded.",
      },
      {
        id: "cnt-spam",
        label: "No spam trigger words",
        why: "Certain words and phrases are strongly associated with spam. Overusing them increases the probability of landing in the junk folder.",
        action: 'Avoid words like "free," "guaranteed," "act now," and "no obligation" in subject lines and body copy. Write naturally and focus on value.',
      },
      {
        id: "cnt-mobile",
        label: "Mobile-responsive templates",
        why: "Over half of all emails are opened on mobile devices. Non-responsive emails are hard to read and lead to lower engagement and higher unsubscribes.",
        action: "Use a single-column layout with a max width of 600px. Test every template on both iOS and Android email clients before sending.",
      },
      {
        id: "cnt-personal",
        label: "Personalization in emails",
        why: "Personalized emails see higher open and click rates. Generic emails that look like mass blasts get less engagement, which hurts deliverability over time.",
        action: "At minimum, use the recipient's first name. Better yet, personalize content based on past purchases, browsing behavior, or stated preferences.",
      },
      {
        id: "cnt-subject",
        label: "Clear, descriptive subject lines",
        why: "Misleading or vague subject lines increase spam complaints. Clear subject lines set accurate expectations and improve open rates.",
        action: "Write subject lines that accurately describe the email content. Keep them under 50 characters. Avoid all caps, excessive punctuation, and clickbait.",
      },
    ],
  },
  {
    id: "practices",
    title: "Sending Practices",
    items: [
      {
        id: "prc-schedule",
        label: "Consistent sending schedule",
        why: "Erratic sending patterns — silence for weeks followed by a burst of emails — look suspicious to ISPs and can trigger throttling or filtering.",
        action: "Set a regular cadence (e.g., weekly newsletter, monthly digest) and stick to it. Subscribers should know roughly when to expect your emails.",
      },
      {
        id: "prc-warmup",
        label: "Warm-up for new IPs and domains",
        why: "Sending a large volume from a new IP or domain with no reputation is a strong spam signal. ISPs need to see a gradual build of trust.",
        action: "Start with small volumes (100-500 per day) to your most engaged subscribers and increase by 20-30% daily over 2-4 weeks.",
      },
      {
        id: "prc-volume",
        label: "Volume monitoring in place",
        why: "Sudden spikes in send volume trigger ISP rate limits and can damage your reputation. Monitoring helps you catch anomalies before they cause problems.",
        action: "Set up alerts for send volume changes greater than 30% from your baseline. Review sending logs daily during campaign launches.",
      },
      {
        id: "prc-sunset",
        label: "Sunset policy for inactive subscribers",
        why: "Subscribers who have not opened or clicked in 6-12 months are dead weight. They lower your engagement metrics and may turn into spam traps.",
        action: "Send a final re-engagement email after 90 days of inactivity. If there is no response, suppress or remove the address from your active list.",
      },
      {
        id: "prc-streams",
        label: "Separate transactional and marketing streams",
        why: "Mixing transactional emails (receipts, password resets) with marketing on the same IP or domain means a marketing reputation hit can delay critical transactional emails.",
        action: "Use separate subdomains and, ideally, separate IPs for transactional and marketing email. This isolates reputation for each stream.",
      },
    ],
  },
];

const totalItems = sections.reduce((sum, s) => sum + s.items.length, 0);

function getGrade(score: number): { label: string; description: string } {
  if (score >= 18) return { label: "Excellent", description: "Your email infrastructure is well-configured. Keep monitoring and maintaining these practices." };
  if (score >= 13) return { label: "Good", description: "Solid foundation with a few areas to strengthen. Address the unchecked items to reach top-tier deliverability." };
  if (score >= 7) return { label: "Fair", description: "Several gaps that are likely hurting your inbox placement. Prioritize the unchecked items in your weakest sections." };
  return { label: "Poor", description: "Significant deliverability risks present. Start with authentication setup and list hygiene before tackling other areas." };
}

function getSectionScore(sectionId: string, checked: Set<string>): number {
  const section = sections.find((s) => s.id === sectionId);
  if (!section) return 0;
  return section.items.filter((item) => checked.has(item.id)).length;
}

function getTopRecommendations(checked: Set<string>): { section: string; item: CheckItem }[] {
  const sectionScores = sections.map((s) => ({
    section: s,
    score: s.items.filter((item) => checked.has(item.id)).length / s.items.length,
  }));

  sectionScores.sort((a, b) => a.score - b.score);

  const recommendations: { section: string; item: CheckItem }[] = [];

  for (const { section } of sectionScores) {
    for (const item of section.items) {
      if (!checked.has(item.id) && recommendations.length < 3) {
        recommendations.push({ section: section.title, item });
      }
    }
    if (recommendations.length >= 3) break;
  }

  return recommendations;
}

export default function EmailDeliverabilityPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const score = checked.size;
  const grade = useMemo(() => getGrade(score), [score]);
  const percentage = Math.round((score / totalItems) * 100);
  const recommendations = useMemo(() => getTopRecommendations(checked), [checked]);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Email Deliverability Checker",
          description: "Your email infrastructure is well-configured. Keep monitoring and maintaining these practices.",
          url: "https://themarkitmedia.com/en/resources/email-deliverability",
          applicationCategory: "Email Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/email-subject-tester" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Email Subject Tester</Link>
                <Link href="/resources/email-roi-calculator" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Email ROI Calculator</Link>
                <Link href="/resources/email-campaign-planner" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Email Campaign Planner</Link>
                <Link href="/resources/email-sequence-planner" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Email Sequence Planner</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Email Deliverability Checker",
          description:
            "Interactive checklist tool to assess your email deliverability health across authentication, list hygiene, content quality, and sending practices.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Email Deliverability Checker" },
        ]}
      />

      <section aria-label="Interactive Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Interactive Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Email Deliverability Checker
            </h1>
            <SectionDesc>
              Check off each item that applies to your email setup. Your deliverability score updates in real time, and you will see specific recommendations for any unchecked items.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Overall Score */}
      <section className="px-6 lg:px-12 pb-8" aria-label="Deliverability score">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="bg-black text-white p-8 flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-shrink-0 text-center md:text-left">
                <p className="text-base text-gray-400">Deliverability Grade</p>
                <p className="font-[family-name:var(--font-display)] text-5xl font-extrabold mt-1">
                  {grade.label}
                </p>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-base text-gray-400">{score} of {totalItems} items completed</p>
                  <p className="text-base font-bold">{percentage}%</p>
                </div>
                <div className="w-full bg-white/20 h-3">
                  <div
                    className="bg-white h-3 transition-all duration-300 motion-reduce:transition-none"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-base text-gray-400 mt-2">{grade.description}</p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* Checklist Sections */}
      {sections.map((section) => {
        const sectionScore = getSectionScore(section.id, checked);
        const sectionTotal = section.items.length;

        return (
          <section key={section.id} className="px-6 lg:px-12 py-6" aria-label={section.title}>
            <div className="max-w-4xl mx-auto">
              <Animate animation="fade-up">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                    {section.title}
                  </h2>
                  <span className="text-base text-gray-500 font-bold">
                    {sectionScore}/{sectionTotal}
                  </span>
                </div>

                <Stagger stagger={80} animation="fade-up" className="space-y-3">
                  {section.items.map((item) => {
                    const isChecked = checked.has(item.id);
                    return (
                      <div
                        key={item.id}
                        className="border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none"
                      >
                        <button
                          onClick={() => toggle(item.id)}
                          className="w-full flex items-start gap-4 p-4 text-left min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                          aria-label={`Mark "${item.label}" as ${isChecked ? "incomplete" : "complete"}`}
                        >
                          <span
                            className={`flex-shrink-0 w-6 h-6 border-2 flex items-center justify-center mt-0.5 transition-colors motion-reduce:transition-none ${
                              isChecked ? "bg-black border-black text-white" : "border-gray-300"
                            }`}
                            aria-hidden="true"
                          >
                            {isChecked && <span className="text-base">&#10003;</span>}
                          </span>
                          <span
                            className={`text-base flex-1 ${
                              isChecked ? "text-gray-400 line-through" : "text-black font-medium"
                            }`}
                          >
                            {item.label}
                          </span>
                        </button>

                        {!isChecked && (
                          <div className="px-4 pb-4 pl-14 space-y-2">
                            <p className="text-base text-gray-500 leading-relaxed">
                              <span className="font-bold text-black">Why it matters: </span>
                              {item.why}
                            </p>
                            <p className="text-base text-gray-500 leading-relaxed">
                              <span className="font-bold text-black">What to do: </span>
                              {item.action}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </Stagger>
              </Animate>
            </div>
          </section>
        );
      })}

      {/* Priority Action Plan */}
      {recommendations.length > 0 && (
        <section className="px-6 lg:px-12 py-12" aria-label="Priority action plan">
          <div className="max-w-4xl mx-auto">
            <Animate animation="fade-up">
              <div className="border-2 border-black p-8">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-2">
                  Priority Action Plan
                </h2>
                <p className="text-base text-gray-500 mb-6">
                  Based on your weakest areas, here are the top actions to improve your deliverability.
                </p>

                <Stagger stagger={100} animation="fade-up" className="space-y-4">
                  {recommendations.map((rec, i) => (
                    <div key={rec.item.id} className="flex items-start gap-4 p-4 bg-gray-50">
                      <span className="flex-shrink-0 w-8 h-8 bg-black text-white flex items-center justify-center font-bold text-base">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-base text-gray-500 font-bold uppercase tracking-wide mb-1">
                          {rec.section}
                        </p>
                        <p className="text-base font-bold text-black mb-1">{rec.item.label}</p>
                        <p className="text-base text-gray-500 leading-relaxed">{rec.item.action}</p>
                      </div>
                    </div>
                  ))}
                </Stagger>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* CTA */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help With Email Deliverability?
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Our team can audit your email infrastructure, fix authentication issues, clean your lists, and optimize your sending practices.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
              >
                Get Email Marketing Help &rarr;
              </Link>
              <Link
                href="/services/email-marketing"
                className="inline-flex items-center gap-3 border-2 border-white text-white px-10 py-5 font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
              >
                Email Marketing Services
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Email Deliverability"
        services={[
          { title: "Digital Marketing", desc: "Email marketing integrated with your broader growth strategy.", href: "/services/digital-marketing" },
          { title: "Content Marketing", desc: "Compelling email content that nurtures leads into customers.", href: "/services/content-marketing" },
          { title: "Performance Marketing", desc: "Paid campaigns that fill your email funnel with qualified leads.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Email Campaign Planner", href: "/resources/email-campaign-planner" },
          { title: "Email Health Checker", href: "/resources/email-health-checker" },
          { title: "Email Roi Calculator", href: "/resources/email-roi-calculator" },
          { title: "Email Sequence Planner", href: "/resources/email-sequence-planner" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
