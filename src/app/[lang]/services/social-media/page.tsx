import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Share2,
  Compass,
  CalendarDays,
  Palette,
  Video,
  Camera,
  PenTool,
  MessageCircle,
  Users,
  BarChart3,
  Megaphone,
  UserRoundSearch,
  LayoutGrid,
  Send,
  Target,
  Sparkles,
  PlaySquare,
  BriefcaseBusiness,
} from "lucide-react";
import { Animate, Stagger } from "@/components/animate";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { QuoteForm } from "@/components/quote-form";
import { SectionLabel, SectionTitle } from "@/components/section";

export const metadata: Metadata = {
  title: "Social Media Marketing",
  description:
    "Complete social media marketing and management services including strategy, content creation, graphic design, reels, video editing, community management, influencer marketing, paid social, scheduling, analytics, and reporting.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/social-media" },
  openGraph: {
    title: "Social Media Marketing",
    description:
      "Strategy, content, management, creative production, community, paid social, influencer marketing, and analytics for brands that want a stronger social presence.",
  },
};

const platforms = [
  "Instagram",
  "Facebook",
  "TikTok",
  "LinkedIn",
  "YouTube",
  "X",
  "Pinterest",
];

type ServiceItem = {
  title: string;
  desc: string;
  icon: LucideIcon;
  href?: string;
};

const strategyServices: ServiceItem[] = [
  {
    title: "Social Media Strategy",
    desc: "Platform selection, audience direction, content pillars, brand voice, goals, KPIs, and a practical plan for how social supports the business.",
    icon: Compass,
    href: "/services/social-media/social-strategy",
  },
  {
    title: "Account Audit & Optimization",
    desc: "Review existing profiles, content, positioning, visual consistency, posting patterns, competitors, and opportunities before changing the plan.",
    icon: Target,
  },
  {
    title: "Content Calendar & Planning",
    desc: "Monthly or campaign based planning for posts, carousels, stories, reels, launches, promotions, events, and seasonal content.",
    icon: CalendarDays,
  },
  {
    title: "Campaign & Launch Planning",
    desc: "Social rollouts for product launches, offers, events, openings, campaigns, announcements, and always on brand activity.",
    icon: Megaphone,
  },
];

const creativeServices: ServiceItem[] = [
  {
    title: "Social Content Creation",
    desc: "End to end content development built around the platform, audience, objective, and brand instead of posting for the sake of activity.",
    icon: Sparkles,
    href: "/services/social-media/content-creation",
  },
  {
    title: "Graphic Design & Carousels",
    desc: "Static posts, branded templates, carousels, story layouts, campaign graphics, promotional creatives, and social first visual systems.",
    icon: Palette,
    href: "/work/social-media-designs",
  },
  {
    title: "Reels & Short Form Video",
    desc: "Concepts, hooks, shot direction, editing, pacing, captions, and platform ready vertical content for Reels, Shorts, and TikTok.",
    icon: PlaySquare,
    href: "/services/video-production/reels-short-form",
  },
  {
    title: "Video Editing",
    desc: "Editing for social campaigns, brand content, interviews, events, product videos, ads, testimonials, and short form cutdowns.",
    icon: Video,
    href: "/services/video-production/video-editing",
  },
  {
    title: "Photography & Videography",
    desc: "Product, food, lifestyle, corporate, event, and campaign production when original visual assets are needed for the content plan.",
    icon: Camera,
    href: "/services/photography",
  },
  {
    title: "Copywriting & Captions",
    desc: "Captions, hooks, CTAs, campaign messaging, social copy, brand voice development, and copy adapted to different platforms.",
    icon: PenTool,
    href: "/services/content-marketing/copywriting",
  },
  {
    title: "Motion Graphics",
    desc: "Animated social assets, typography, explainers, transitions, product motion, and branded graphics for campaigns that need more movement than a static post.",
    icon: Video,
    href: "/services/video-production/motion-design",
  },
  {
    title: "AI Assisted Content",
    desc: "AI supported ideation, visual concepts, copy variations, and creative workflows used with human review to increase output without losing brand direction.",
    icon: Sparkles,
    href: "/services/ai/ai-marketing",
  },
];

const managementServices: ServiceItem[] = [
  {
    title: "Social Media Management",
    desc: "Ongoing coordination of the content plan, approvals, publishing, platform activity, creative requirements, and monthly priorities.",
    icon: Share2,
  },
  {
    title: "Scheduling & Publishing",
    desc: "Approved content is organized and published according to the agreed calendar, platform format, timing, and campaign priorities.",
    icon: Send,
  },
  {
    title: "Community Management",
    desc: "Comment monitoring, audience interaction, moderation, response guidance, and escalation of enquiries that need client attention.",
    icon: MessageCircle,
    href: "/services/social-media/community-management",
  },
  {
    title: "Profile & Presence Optimization",
    desc: "Improve bios, profile information, highlights, pinned content, visual consistency, links, CTAs, and the overall first impression of each account.",
    icon: LayoutGrid,
  },
];

const growthServices: ServiceItem[] = [
  {
    title: "Influencer Marketing",
    desc: "Creator research, outreach, coordination, briefing, content alignment, campaign management, and performance review.",
    icon: UserRoundSearch,
    href: "/services/social-media/influencer-marketing",
  },
  {
    title: "Paid Social & Meta Ads",
    desc: "Connect organic content with Facebook and Instagram advertising for reach, leads, messages, retargeting, sales, and campaign amplification.",
    icon: Megaphone,
    href: "/services/performance-marketing/meta-ads",
  },
  {
    title: "TikTok Advertising",
    desc: "Paid TikTok campaigns designed around native creative, audience behavior, campaign objectives, testing, and measurable actions.",
    icon: PlaySquare,
    href: "/services/performance-marketing/tiktok-ads",
  },
  {
    title: "LinkedIn Advertising",
    desc: "B2B paid social campaigns for professional audiences, lead generation, company visibility, and targeted decision maker reach.",
    icon: BriefcaseBusiness,
    href: "/services/performance-marketing/linkedin-ads",
  },
  {
    title: "Social Analytics & Reporting",
    desc: "Track reach, engagement, audience growth, traffic, content performance, conversions, and the metrics that matter to the agreed goal.",
    icon: BarChart3,
    href: "/services/social-media/social-analytics",
  },
  {
    title: "Personal Brand Social Strategy",
    desc: "Content direction, positioning, profile optimization, thought leadership, and consistent publishing for founders, executives, and professionals.",
    icon: Users,
    href: "/industries/personal-branding",
  },
];

const process = [
  ["01", "Understand", "We learn the brand, offer, audience, competitors, current channels, approval process, and what social media needs to achieve."],
  ["02", "Plan", "We define platforms, content pillars, formats, posting rhythm, campaigns, production needs, and the monthly content calendar."],
  ["03", "Create", "Our team develops copy, designs, reels, video, photography, and campaign assets based on the approved direction."],
  ["04", "Approve", "Content is organized for review so feedback, revisions, and final approvals stay clear before anything is published."],
  ["05", "Publish & Manage", "We schedule content, manage the agreed channels, support community activity, and coordinate live campaign requirements."],
  ["06", "Measure & Improve", "Reporting shows what worked, what did not, and what we should change in the next content and campaign cycle."],
];

const deliverables = [
  "Social media strategy and platform direction",
  "Monthly content calendar",
  "Content pillars and campaign themes",
  "Post and carousel design",
  "Reels and short form video",
  "Captions, hooks, and CTAs",
  "Stories and campaign assets",
  "Scheduling and publishing",
  "Community management",
  "Profile and highlight optimization",
  "Influencer campaign coordination",
  "Paid social support when included",
  "Monthly analytics and recommendations",
];

const work = [
  { title: "Vuse", desc: "Ongoing social media content for a global consumer brand.", href: "/work/vuse" },
  { title: "Minhaz Couture", desc: "Fashion social media and web content production.", href: "/work/minhaz-couture" },
  { title: "Fashion Feed", desc: "Social media design and visual content for fashion and lifestyle.", href: "/work/fashion-feed" },
  { title: "Social Media Designs", desc: "A broader look at creative work produced across social channels and industries.", href: "/work/social-media-designs" },
  { title: "Cambridge Electrical", desc: "Creative and video work produced for an established consumer brand.", href: "/work/cambridge-electrical" },
  { title: "Pur Health", desc: "Healthcare social media and wider digital presence work.", href: "/work/pur-health" },
];

const faq = [
  {
    q: "What is included in social media management?",
    a: "The exact scope depends on the account, but it can include strategy, content planning, graphic design, captions, reels, scheduling, publishing, community management, reporting, campaign coordination, and profile optimization. Paid advertising and production can be included when required.",
  },
  {
    q: "Do you only manage Facebook and Instagram?",
    a: "No. We work across Instagram, Facebook, TikTok, LinkedIn, YouTube, X, and Pinterest. We recommend the channels that make sense for the audience and business instead of forcing every brand onto every platform.",
  },
  {
    q: "Do you create the content as well as manage the accounts?",
    a: "Yes. We can handle content planning, copywriting, graphic design, carousels, reels, video editing, photography, and videography. The production mix depends on the brand and the agreed scope.",
  },
  {
    q: "Can you handle Reels and short form video?",
    a: "Yes. We can support concepts, hooks, shot direction, editing, subtitles, pacing, cutdowns, and platform ready vertical videos for Instagram Reels, TikTok, and YouTube Shorts.",
  },
  {
    q: "Do you run paid social campaigns too?",
    a: "Yes. Paid social is handled as part of our performance marketing capability. We manage Meta Ads and can also support TikTok and LinkedIn advertising. Organic management and paid media can work together or be scoped separately.",
  },
  {
    q: "Can you work with content our internal team already produces?",
    a: "Yes. We can work as the full social team or plug into an existing marketing setup. For example, your team can provide raw footage while we handle planning, editing, copy, publishing, community management, and reporting.",
  },
  {
    q: "How do approvals work?",
    a: "We agree on an approval workflow at the start. Content is planned and shared before publishing so your team can review messaging, creative, offers, and any sensitive information.",
  },
  {
    q: "How do you measure social media performance?",
    a: "We report against the purpose of the channel. That can include reach, engagement, audience growth, profile activity, website traffic, enquiries, leads, sales, or paid campaign outcomes. We do not treat follower growth as the only measure of success.",
  },
];

function ServiceCard({ item }: { item: ServiceItem }) {
  const Icon = item.icon;
  const body = (
    <>
      <div className="w-11 h-11 bg-black text-white flex items-center justify-center mb-5">
        <Icon size={21} strokeWidth={2} aria-hidden="true" />
      </div>
      <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">{item.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mt-3">{item.desc}</p>
      {item.href && <span className="inline-block text-sm font-bold mt-5 group-hover:underline">Explore service →</span>}
    </>
  );

  return item.href ? (
    <Link href={item.href} className="group bg-white border border-gray-200 p-6 hover:border-black hover:shadow-lg hover:-translate-y-0.5 transition-all focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">
      {body}
    </Link>
  ) : (
    <div className="bg-white border border-gray-200 p-6">{body}</div>
  );
}

export default function SocialMediaPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Social Media Marketing",
    description:
      "Social media strategy, management, content creation, design, video, community management, influencer marketing, paid social, analytics, and reporting.",
    provider: {
      "@type": "Organization",
      name: "Markit Media",
      url: "https://themarkitmedia.com",
    },
    areaServed: ["United States", "Canada", "United Arab Emirates", "United Kingdom", "Australia", "Saudi Arabia"],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <article>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Social Media Marketing" }]} />

      <section className="px-6 lg:px-12 pt-20 pb-16" aria-label="Social Media Marketing">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.08fr_0.92fr] gap-12 items-center">
          <Animate animation="fade-up">
            <div>
              <div className="inline-flex items-center gap-2 border border-gray-200 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-gray-600 mb-6">
                <Share2 size={15} aria-hidden="true" />
                Strategy • Content • Management • Growth
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.3rem,5vw,4.2rem)] font-extrabold text-black tracking-tight leading-[1.02]">
                Social Media Marketing
              </h1>
              <p className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,2.5vw,2rem)] font-bold text-gray-700 leading-tight mt-5">
                More than posting. We plan, create, manage, publish, engage, advertise, and measure.
              </p>
              <p className="text-lg text-gray-500 leading-relaxed mt-6 max-w-3xl">
                Markit Media can work as your complete social media team or support the parts your internal team needs. Our scope can cover strategy, content calendars, design, reels, video, photography, copywriting, community management, influencer campaigns, paid social, analytics, and ongoing account management.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="#social-services" className="inline-flex items-center bg-black text-white px-7 py-4 font-bold text-base hover:bg-gray-800 transition-colors">
                  Explore All Services ↓
                </Link>
                <Link href="#social-quote" className="inline-flex items-center border border-black text-black px-7 py-4 font-bold text-base hover:bg-black hover:text-white transition-colors">
                  Request a Quote →
                </Link>
              </div>
            </div>
          </Animate>
          <Animate animation="fade-in" delay={150}>
            <div className="relative">
              <Image
                src="/images/services/social-media.jpg"
                alt="Social media marketing and content services"
                width={900}
                height={700}
                className="w-full aspect-[4/3] object-cover"
                priority
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-gray-200 border border-gray-200 mt-4">
                {["Strategy", "Content", "Reels", "Community", "Paid Social", "Reporting"].map((item) => (
                  <div key={item} className="bg-white px-4 py-4 text-center text-sm font-bold">{item}</div>
                ))}
              </div>
            </div>
          </Animate>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-gray-50 px-6 lg:px-12 py-8" aria-label="Social platforms">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500 text-center">Platforms we work with</p>
          <div className="flex flex-wrap justify-center gap-3 mt-5">
            {platforms.map((platform) => (
              <span key={platform} className="bg-white border border-gray-200 px-5 py-3 text-sm font-bold text-black">{platform}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="social-services" className="px-6 lg:px-12 py-20 scroll-mt-24" aria-label="Complete social media services">
        <div className="max-w-7xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Complete Capability</SectionLabel>
            <SectionTitle>Everything We Can Handle for Social Media</SectionTitle>
            <p className="text-lg text-gray-500 leading-relaxed mt-5 max-w-3xl">
              Choose a complete management setup or only the services you need. The scope can be built around one platform, multiple channels, a campaign, or ongoing monthly support.
            </p>
          </Animate>

          <div className="mt-14">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold">Strategy & Planning</h2>
            <p className="text-gray-500 mt-2 max-w-2xl">The thinking that decides what to publish, where to publish it, and what the channel is supposed to achieve.</p>
            <Stagger stagger={50} animation="fade-up" className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
              {strategyServices.map((item) => <ServiceCard key={item.title} item={item} />)}
            </Stagger>
          </div>

          <div className="mt-16">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold">Content & Creative Production</h2>
            <p className="text-gray-500 mt-2 max-w-2xl">The actual content people see, watch, read, save, share, and respond to.</p>
            <Stagger stagger={50} animation="fade-up" className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
              {creativeServices.map((item) => <ServiceCard key={item.title} item={item} />)}
            </Stagger>
          </div>

          <div className="mt-16">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold">Management & Community</h2>
            <p className="text-gray-500 mt-2 max-w-2xl">The ongoing operational work that keeps social channels active, organized, responsive, and consistent.</p>
            <Stagger stagger={50} animation="fade-up" className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
              {managementServices.map((item) => <ServiceCard key={item.title} item={item} />)}
            </Stagger>
          </div>

          <div className="mt-16">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold">Growth, Paid Social & Measurement</h2>
            <p className="text-gray-500 mt-2 max-w-2xl">Extend strong organic content with creators, advertising, audience growth, and reporting tied to real objectives.</p>
            <Stagger stagger={50} animation="fade-up" className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
              {growthServices.map((item) => <ServiceCard key={item.title} item={item} />)}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white" aria-label="Social media deliverables">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-12">
          <div>
            <SectionLabel><span className="text-gray-400">What You Can Get</span></SectionLabel>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight mt-3">
              A scope built around what your brand actually needs
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mt-5">
              Not every client needs every deliverable. We define the right mix based on the platforms, available assets, content volume, campaign goals, production requirements, and internal resources.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-white/15 border border-white/15">
            {deliverables.map((item) => (
              <div key={item} className="bg-black p-5 flex gap-3 items-start">
                <span className="text-white font-bold">✓</span>
                <span className="text-sm text-gray-300 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="Social media process">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>How We Work</SectionLabel>
          <SectionTitle>From Strategy to Publishing to Improvement</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {process.map(([number, title, desc]) => (
              <div key={number} className="border border-gray-200 p-6">
                <span className="text-xs font-bold tracking-[0.18em] text-gray-400">{number}</span>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold mt-3">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mt-3">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="social-quote" className="px-6 lg:px-12 py-20 bg-gray-50 scroll-mt-24" aria-label="Request a social media quote">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <SectionLabel>Request a Quote</SectionLabel>
            <SectionTitle>Tell Us What You Need Help With</SectionTitle>
            <p className="text-lg text-gray-500 leading-relaxed mt-5">
              You do not need to know the exact package. Tell us which channels you use, what content you already have, what your team can handle internally, and what you want us to take ownership of.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mt-7">
              {["Full social management", "Content creation", "Reels & video", "Design & carousels", "Community management", "Paid social", "Influencer marketing", "Strategy & reporting"].map((item) => (
                <div key={item} className="bg-white border border-gray-200 px-4 py-3 text-sm font-semibold">{item}</div>
              ))}
            </div>
          </div>
          <QuoteForm
            service="Social Media Marketing"
            title="Request a Social Media Quote"
            buttonText="Send Social Media Request"
            messagePlaceholder="Platforms, current setup, content needs, posting volume, paid ads, and what you want us to handle..."
          />
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" aria-label="Featured social media work">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>Our Work</SectionLabel>
          <SectionTitle>Social, Creative & Content Projects</SectionTitle>
          <p className="text-lg text-gray-500 leading-relaxed mt-5 max-w-3xl">
            Explore examples of social creative, content production, video, and digital work across different industries and brand styles.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {work.map((item) => (
              <Link key={item.href} href={item.href} className="group border border-gray-200 p-6 hover:border-black hover:shadow-lg transition-all">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold group-hover:underline">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mt-3">{item.desc}</p>
                <span className="inline-block mt-5 text-sm font-bold">View project →</span>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-5 mt-8">
            <Link href="/work" className="font-bold underline underline-offset-4 hover:no-underline">View all work →</Link>
            <Link href="/case-studies" className="font-bold text-gray-500 hover:text-black underline underline-offset-4 hover:no-underline">Explore case studies →</Link>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-gray-50" aria-label="Social media FAQ">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>FAQ</SectionLabel>
          <SectionTitle>Common Questions</SectionTitle>
          <div className="mt-9">
            {faq.map((item) => (
              <details key={item.q} className="group border-b border-gray-200">
                <summary className="flex justify-between items-center py-5 cursor-pointer text-base font-bold text-black list-none">
                  {item.q}
                  <span className="text-xl text-gray-500 group-open:rotate-45 transition-transform ml-4" aria-hidden="true">+</span>
                </summary>
                <div className="pb-5 text-base text-gray-500 leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center" aria-label="Social media call to action">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold tracking-tight">
            Need a complete social team or just one part of it?
          </h2>
          <p className="text-lg text-gray-400 mt-5 mb-8">
            Tell us what your team already handles and where you need support. We can build the scope around the gap.
          </p>
          <Link href="#social-quote" className="inline-flex items-center bg-white text-black px-9 py-5 font-bold text-base hover:bg-gray-100 transition-colors">
            Request a Social Media Quote →
          </Link>
        </div>
      </section>
    </article>
  );
}
