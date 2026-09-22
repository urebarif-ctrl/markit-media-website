import type { Metadata } from "next";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionTitle } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Branding Agency in Karachi — Markit Media",
  description:
    "Markit Media is a branding agency in Karachi offering brand strategy, visual identity design, logo creation, and brand guidelines for businesses looking to stand out in a competitive market.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Markit Media",
  description:
    "Branding agency in Karachi offering brand strategy, visual identity design, and logo creation for businesses looking to stand out in a competitive market.",
  areaServed: { "@type": "City", name: "Karachi" },
  url: "https://themarkitmedia.com/en/locations/karachi/branding",
};

const services = [
  {
    title: "Brand Strategy & Positioning",
    description:
      "We define where your brand sits in the market relative to competitors, identify the audience segments that matter most, and build a positioning platform that guides every decision — from messaging to product naming to market entry.",
  },
  {
    title: "Logo Design & Visual Identity",
    description:
      "Your logo is the most compressed version of your brand. We design marks that are distinctive at every scale — from a favicon to a billboard — and build out the full visual system: colour palette, typography, iconography, and imagery direction.",
  },
  {
    title: "Brand Guidelines & Systems",
    description:
      "A brand without documented standards drifts. We create comprehensive guidelines that cover logo usage, colour specifications, typography rules, tone of voice, and application templates so every team member and vendor stays on-brand.",
  },
  {
    title: "Packaging Design",
    description:
      "For product-based businesses, packaging is the first physical interaction a customer has with your brand. We design packaging that communicates value, differentiates on shelf, and reinforces the broader visual identity system.",
  },
  {
    title: "Brand Messaging & Voice",
    description:
      "Visual identity gets attention. Messaging holds it. We develop your brand&apos;s verbal identity — taglines, value propositions, tone guidelines, and key narratives — so your communication sounds as intentional as it looks.",
  },
  {
    title: "Brand Refresh & Rebranding",
    description:
      "Markets evolve, and brands need to keep pace. Whether you need a complete rebrand or a measured refresh that modernises without losing existing equity, we manage the transition from audit through rollout.",
  },
];

const reasons = [
  {
    title: "Strategic Foundation First",
    description:
      "We don&apos;t open a design tool until the strategy is locked. Every visual decision — colour, type, layout — traces back to a documented rationale rooted in your market position and audience research. This means fewer subjective revisions and a brand that works for business reasons, not just aesthetic ones.",
  },
  {
    title: "Design With Purpose",
    description:
      "A logo that looks good in a presentation but falls apart on a mobile screen or printed invoice is a liability. We stress-test every element across the touchpoints your business actually uses, so the identity performs in the real world — not just in a mood board.",
  },
  {
    title: "Consistency Across Channels",
    description:
      "Your brand shows up on social media, your website, printed materials, proposals, and packaging. We build systems — not just assets — so your brand stays coherent whether it&apos;s being applied by your marketing team, a freelancer, or a print vendor.",
  },
  {
    title: "Local Market Understanding",
    description:
      "Karachi is our home market. We understand the visual language that resonates here, the cultural context that influences perception, and the competitive landscape your brand needs to cut through. That local fluency shapes every recommendation we make.",
  },
];

const steps = [
  {
    number: "01",
    title: "Brand Discovery & Research",
    description:
      "We audit your current brand presence, study your competitors, and interview key stakeholders to understand your business goals, audience expectations, and market position. This phase produces the brief that anchors everything that follows.",
  },
  {
    number: "02",
    title: "Strategy & Positioning",
    description:
      "Using the research findings, we define your brand&apos;s positioning statement, personality attributes, and messaging hierarchy. You sign off on the strategic direction before any design work begins.",
  },
  {
    number: "03",
    title: "Visual Identity Design",
    description:
      "We develop logo concepts, explore colour systems, select typography, and build out the visual language. Each option is presented with rationale tied to the strategy, and we refine the chosen direction through structured feedback rounds.",
  },
  {
    number: "04",
    title: "Brand Guidelines & Rollout",
    description:
      "The final identity is documented in a comprehensive brand guidelines package. We provide production-ready files for every format and support your team through the initial rollout across priority touchpoints.",
  },
];

export default function KarachiBrandingPage() {
  return (
    <>
      <JsonLd data={schema} />

      {/* Breadcrumb */}
      <section className="bg-white pt-28 pb-4">
        <div className="mx-auto max-w-7xl px-6">
          <Breadcrumb
            items={[
              { label: "Locations", href: "/locations" },
              { label: "Karachi", href: "/locations/karachi" },
              { label: "Branding" },
            ]}
          />
        </div>
      </section>

      {/* Hero */}
      <section className="bg-white pt-12 pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Branding in Karachi</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-tight max-w-4xl mt-4">
              Branding Agency in Karachi
            </h1>
          </Animate>
          <Animate animation="fade-up" delay={200}>
            <p className="mt-6 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Karachi&apos;s market is crowded. Thousands of businesses compete for
              the same customers across overlapping channels, and the ones that
              get remembered are the ones with a brand that means something beyond
              a logo on a business card. Differentiation starts with identity —
              visual, verbal, and strategic.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={300}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Markit Media builds brands for businesses in Karachi that are ready
              to move past generic design templates and invest in an identity
              system that holds up across every customer touchpoint. From
              positioning strategy to final brand guidelines, we handle the full
              scope of brand development.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={400}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Whether you&apos;re launching a new venture into Karachi&apos;s
              growing economy or repositioning an established business to capture
              a shifting market, a well-built brand is the asset that compounds
              over time — making every marketing rupee work harder.
            </p>
          </Animate>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Branding Services</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              What our branding engagements cover
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Each service can be engaged individually or as part of a complete
              brand build. Most businesses in Karachi that come to us for a logo
              end up investing in the full system once they see how the pieces
              connect.
            </p>
          </Animate>

          <Stagger stagger={100} animation="fade-up" className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-gray-200 bg-white p-8"
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-black">
                  {service.title}
                </h3>
                <p
                  className="mt-3 text-base text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              </div>
            ))}
          </Stagger>

          <Animate animation="fade-up" delay={200}>
            <p className="mt-10 text-base text-gray-600">
              Looking for full details on our branding methodology?{" "}
              <Link
                href="/services/branding"
                className="font-semibold text-black underline underline-offset-4 hover:no-underline"
              >
                View our branding service page &rarr;
              </Link>
            </p>
          </Animate>
        </div>
      </section>

      {/* Why Markit Media */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Why Markit Media</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              Why Karachi businesses choose Markit Media for branding
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Karachi has no shortage of graphic designers. The difference between
              a design service and a branding agency is the thinking that happens
              before anyone opens a design file. Here&apos;s what that looks like
              in practice.
            </p>
          </Animate>

          <Stagger stagger={100} animation="fade-up" className="mt-14 grid gap-10 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason.title} className="border-l-4 border-black pl-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-black">
                  {reason.title}
                </h3>
                <p
                  className="mt-3 text-base text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: reason.description }}
                />
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Animate animation="fade-up">
            <SectionLabel>Our Process</SectionLabel>
          </Animate>
          <Animate animation="fade-up" delay={100}>
            <SectionTitle>
              How we build brands from the ground up
            </SectionTitle>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mt-4 max-w-2xl text-lg text-gray-700 leading-relaxed">
              Branding is not a weekend project. A brand identity that actually
              differentiates requires structured research, strategic thinking, and
              disciplined design execution. Here&apos;s how we move from blank
              page to finished brand.
            </p>
          </Animate>

          <Stagger stagger={120} animation="fade-up" className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="rounded-2xl border border-gray-200 bg-white p-8">
                <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-gray-200">
                  {step.number}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold text-black">
                  {step.title}
                </h3>
                <p
                  className="mt-3 text-base text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: step.description }}
                />
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Related Services */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div>
            <Animate animation="fade-right">
              <SectionLabel>Beyond Branding</SectionLabel>
            </Animate>
            <Animate animation="fade-right" delay={100}>
              <SectionTitle>
                A brand only works if it&apos;s applied everywhere
              </SectionTitle>
            </Animate>
          </div>
          <div>
            <Animate animation="fade-left" delay={150}>
              <p className="text-lg text-gray-700 leading-relaxed">
                Your brand identity needs to live on your website, across your
                social media channels, in your advertising creative, and on every
                piece of collateral your team produces. Branding in isolation
                creates a beautiful guidelines document that gathers dust. Branding
                integrated with execution creates market impact.
              </p>
            </Animate>
            <Animate animation="fade-left" delay={250}>
              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                Because Markit Media handles branding alongside digital marketing,
                web development, and social media, the brand system we build for
                you gets applied immediately and consistently — not handed off to
                a separate team that interprets it differently.
              </p>
            </Animate>
            <Animate animation="fade-left" delay={350}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/locations/karachi"
                  className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
                >
                  All Karachi Services
                </Link>
                <Link
                  href="/locations/karachi/website-development"
                  className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
                >
                  Website Development
                </Link>
                <Link
                  href="/locations/karachi/social-media-marketing"
                  className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
                >
                  Social Media Marketing
                </Link>
                <Link
                  href="/services/branding"
                  className="text-base font-semibold text-black underline underline-offset-4 hover:no-underline"
                >
                  Branding Services
                </Link>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Animate animation="scale-in">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-white tracking-tight leading-tight">
              Ready to build a brand that stands out in Karachi?
            </h2>
          </Animate>
          <Animate animation="fade-up" delay={150}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300 leading-relaxed">
              Tell us about your business and where you want to take it. We&apos;ll
              assess your current brand position and outline a clear path to an
              identity that differentiates — no obligation, no generic proposals.
            </p>
          </Animate>
          <Animate animation="fade-up" delay={300}>
            <Link
              href="/contact"
              className="mt-10 inline-block rounded-full bg-white px-10 py-4 text-base font-bold text-black transition-opacity hover:opacity-90"
            >
              Start a Branding Conversation
            </Link>
          </Animate>
        </div>
      </section>
    </>
  );
}
