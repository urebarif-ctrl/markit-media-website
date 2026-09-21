"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type EmailProvider =
  | "gmail"
  | "outlook"
  | "sendgrid"
  | "mailgun"
  | "amazon-ses"
  | "other";

type WarmUpPace = "conservative" | "standard" | "aggressive";

type DomainAge = "new" | "under-3m" | "3-6m" | "6-12m" | "1-plus";

type Reputation = "unknown" | "poor" | "average" | "good";

interface ScheduleDay {
  day: number;
  volume: number;
  cumulative: number;
  phase: number;
  phaseLabel: string;
  engagementTarget: string;
  notes: string;
}

interface PhaseInfo {
  number: number;
  label: string;
  description: string;
  startDay: number;
  endDay: number;
  startVolume: number;
  endVolume: number;
  keyActions: string[];
}

/* ------------------------------------------------------------------ */
/*  Option definitions                                                 */
/* ------------------------------------------------------------------ */

const emailProviders: { id: EmailProvider; label: string }[] = [
  { id: "gmail", label: "Gmail / Google Workspace" },
  { id: "outlook", label: "Outlook / Microsoft 365" },
  { id: "sendgrid", label: "SendGrid" },
  { id: "mailgun", label: "Mailgun" },
  { id: "amazon-ses", label: "Amazon SES" },
  { id: "other", label: "Other" },
];

const warmUpPaces: { id: WarmUpPace; label: string; weeks: number; desc: string }[] = [
  { id: "conservative", label: "Conservative", weeks: 6, desc: "6 weeks — safest for new domains" },
  { id: "standard", label: "Standard", weeks: 4, desc: "4 weeks — balanced approach" },
  { id: "aggressive", label: "Aggressive", weeks: 2, desc: "2 weeks — faster but higher risk" },
];

const domainAges: { id: DomainAge; label: string }[] = [
  { id: "new", label: "Brand New" },
  { id: "under-3m", label: "Under 3 Months" },
  { id: "3-6m", label: "3 – 6 Months" },
  { id: "6-12m", label: "6 – 12 Months" },
  { id: "1-plus", label: "1+ Year" },
];

const reputations: { id: Reputation; label: string }[] = [
  { id: "unknown", label: "New / Unknown" },
  { id: "poor", label: "Poor" },
  { id: "average", label: "Average" },
  { id: "good", label: "Good" },
];

/* ------------------------------------------------------------------ */
/*  Provider tips                                                      */
/* ------------------------------------------------------------------ */

function getProviderTips(provider: EmailProvider): string[] {
  switch (provider) {
    case "gmail":
      return [
        "Google uses engagement signals heavily — prioritize sending to contacts who will open and reply during early phases.",
        "Enable SPF, DKIM, and DMARC before sending your first email. Google penalizes unauthenticated senders.",
        "Avoid sending more than 500 emails per day from a new Google Workspace account in the first two weeks.",
        "Use Google Postmaster Tools to monitor your domain reputation and spam rate in real time.",
        "Keep spam complaint rates below 0.1% — Google’s threshold is stricter than most providers.",
      ];
    case "outlook":
      return [
        "Microsoft uses SmartScreen filtering — consistent sending patterns matter more than volume alone.",
        "Register with Microsoft SNDS (Smart Network Data Services) to monitor your IP reputation.",
        "Outlook heavily weighs recipient engagement. Low open rates will trigger junk folder placement quickly.",
        "Avoid URL shorteners in your emails — Microsoft flags them as potential phishing indicators.",
        "Consider joining the Outlook.com Return Path Certification program for improved inbox placement.",
      ];
    case "sendgrid":
      return [
        "Use SendGrid’s automated warm-up feature for dedicated IPs alongside your manual schedule.",
        "Set up event webhooks to track bounces, spam reports, and engagement metrics automatically.",
        "SendGrid recommends starting at 50 emails per day on a new IP and doubling every two days.",
        "Use link branding and domain authentication to align your sending domain with SendGrid.",
        "Monitor your sender reputation score in the SendGrid dashboard — aim to stay above 80.",
      ];
    case "mailgun":
      return [
        "Mailgun provides real-time log access — monitor bounce and complaint events during warm-up daily.",
        "Use Mailgun’s email validation API to verify addresses before adding them to warm-up sends.",
        "Set up dedicated IPs through Mailgun and warm them separately from shared pools.",
        "Configure suppression lists to automatically remove hard bounces and spam complaints.",
        "Use Mailgun’s inbox placement testing to verify deliverability before scaling volume.",
      ];
    case "amazon-ses":
      return [
        "SES starts you in a sandbox environment. Request production access and begin warm-up immediately after.",
        "Use the SES reputation dashboard to monitor bounce rates (keep below 5%) and complaint rates (below 0.1%).",
        "Enable SES configuration sets to track engagement metrics per campaign during warm-up.",
        "Use a dedicated IP through SES rather than the shared pool for more predictable warm-up results.",
        "Set up SES event notifications via SNS to get real-time alerts on bounces and complaints.",
      ];
    default:
      return [
        "Ensure SPF, DKIM, and DMARC are configured before starting your warm-up.",
        "Start with your most engaged contacts — people who have recently opened or replied to your emails.",
        "Monitor bounce rates and spam complaints daily during warm-up. Pause if either spikes.",
        "Keep a consistent sending schedule — irregular patterns can trigger spam filters.",
        "Use a reputable email testing tool to check inbox placement across providers as you scale up.",
      ];
  }
}

/* ------------------------------------------------------------------ */
/*  Schedule generation                                                */
/* ------------------------------------------------------------------ */

function getStartingVolume(reputation: Reputation, domainAge: DomainAge): number {
  let base = 10;
  if (reputation === "good") base = 50;
  else if (reputation === "average") base = 30;
  else if (reputation === "poor") base = 5;

  if (domainAge === "1-plus") base = Math.round(base * 1.5);
  else if (domainAge === "6-12m") base = Math.round(base * 1.3);
  else if (domainAge === "3-6m") base = Math.round(base * 1.1);
  else if (domainAge === "new") base = Math.max(5, Math.round(base * 0.8));

  return base;
}

function getPaceMultiplier(pace: WarmUpPace): number {
  switch (pace) {
    case "conservative":
      return 0.7;
    case "standard":
      return 1.0;
    case "aggressive":
      return 1.5;
  }
}

function generateSchedule(
  targetVolume: number,
  pace: WarmUpPace,
  domainAge: DomainAge,
  reputation: Reputation,
): ScheduleDay[] {
  const paceConfig = warmUpPaces.find((p) => p.id === pace)!;
  const totalDays = paceConfig.weeks * 7;
  const startVolume = getStartingVolume(reputation, domainAge);
  const multiplier = getPaceMultiplier(pace);

  const phaseBoundaries = [
    { end: Math.round(totalDays * 0.25), label: "Foundation", number: 1 },
    { end: Math.round(totalDays * 0.50), label: "Growth", number: 2 },
    { end: Math.round(totalDays * 0.75), label: "Scale", number: 3 },
    { end: totalDays, label: "Full Volume", number: 4 },
  ];

  const schedule: ScheduleDay[] = [];
  let cumulative = 0;

  for (let day = 1; day <= totalDays; day++) {
    const progress = day / totalDays;
    const eased = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    let volume = Math.round(startVolume + (targetVolume - startVolume) * eased * multiplier);
    volume = Math.min(volume, targetVolume);
    volume = Math.max(volume, startVolume);

    cumulative += volume;

    const phase = phaseBoundaries.find((p) => day <= p.end)!;

    let engagementTarget: string;
    let notes: string;

    switch (phase.number) {
      case 1:
        engagementTarget = "50%+ open rate, 10%+ reply rate";
        notes = day <= 3
          ? "Send only to your most engaged contacts — people who opened or replied in the last 30 days."
          : "Continue with highly engaged contacts. Monitor bounce rates closely.";
        break;
      case 2:
        engagementTarget = "35%+ open rate, 5%+ reply rate";
        notes = day <= phaseBoundaries[1].end - 3
          ? "Begin mixing in moderately engaged contacts. Maintain consistent daily sending times."
          : "Gradually expand your audience. Watch for deliverability drops and pause if bounce rate exceeds 3%.";
        break;
      case 3:
        engagementTarget = "25%+ open rate, 3%+ reply rate";
        notes = day <= phaseBoundaries[2].end - 3
          ? "Include less engaged segments. A/B test subject lines to maintain strong open rates."
          : "Scale toward full audience. Segment by engagement to keep metrics above thresholds.";
        break;
      default:
        engagementTarget = "20%+ open rate, 2%+ reply rate";
        notes = day <= phaseBoundaries[3].end - 3
          ? "Approaching full volume. Continue monitoring reputation and engagement metrics."
          : "Warm-up complete. Maintain sending consistency and list hygiene going forward.";
        break;
    }

    schedule.push({
      day,
      volume,
      cumulative,
      phase: phase.number,
      phaseLabel: phase.label,
      engagementTarget,
      notes,
    });
  }

  return schedule;
}

function getPhaseInfo(schedule: ScheduleDay[]): PhaseInfo[] {
  const phases: PhaseInfo[] = [];
  const phaseLabels: Record<number, { label: string; description: string; keyActions: string[] }> = {
    1: {
      label: "Foundation",
      description: "Build initial trust with mailbox providers by sending to your most engaged contacts only.",
      keyActions: [
        "Send exclusively to contacts who have opened or replied in the last 30 days",
        "Monitor bounce rates daily — pause immediately if hard bounces exceed 2%",
        "Send plain-text or minimal HTML emails to avoid spam filter triggers",
        "Establish a consistent sending time each day",
      ],
    },
    2: {
      label: "Growth",
      description: "Gradually expand your audience while maintaining strong engagement signals.",
      keyActions: [
        "Mix in contacts who engaged in the last 60–90 days",
        "Begin A/B testing subject lines to optimize open rates",
        "Add richer HTML templates while keeping image-to-text ratio low",
        "Review Google Postmaster Tools or SNDS data for reputation changes",
      ],
    },
    3: {
      label: "Scale",
      description: "Approach your target volume by including broader audience segments.",
      keyActions: [
        "Include contacts with 90–180 day engagement history",
        "Segment sends by engagement tier to maintain overall metrics",
        "Begin including promotional content alongside value-driven content",
        "Set up automated suppression for unsubscribes and complaints",
      ],
    },
    4: {
      label: "Full Volume",
      description: "Reach your target daily volume while sustaining the reputation you built.",
      keyActions: [
        "Send to your full active list at target volume",
        "Maintain list hygiene with regular bounce and complaint removal",
        "Continue monitoring sender reputation weekly",
        "Run re-engagement campaigns for dormant contacts before adding them back",
      ],
    },
  };

  for (let p = 1; p <= 4; p++) {
    const phaseDays = schedule.filter((d) => d.phase === p);
    if (phaseDays.length === 0) continue;
    const info = phaseLabels[p];
    phases.push({
      number: p,
      label: info.label,
      description: info.description,
      startDay: phaseDays[0].day,
      endDay: phaseDays[phaseDays.length - 1].day,
      startVolume: phaseDays[0].volume,
      endVolume: phaseDays[phaseDays.length - 1].volume,
      keyActions: info.keyActions,
    });
  }

  return phases;
}

/* ------------------------------------------------------------------ */
/*  Export                                                              */
/* ------------------------------------------------------------------ */

function buildExportText(
  schedule: ScheduleDay[],
  phases: PhaseInfo[],
  provider: EmailProvider,
  targetVolume: number,
  pace: WarmUpPace,
  domainAge: DomainAge,
  reputation: Reputation,
): string {
  const providerLabel = emailProviders.find((p) => p.id === provider)?.label ?? provider;
  const paceLabel = warmUpPaces.find((p) => p.id === pace)?.label ?? pace;
  const domainAgeLabel = domainAges.find((d) => d.id === domainAge)?.label ?? domainAge;
  const repLabel = reputations.find((r) => r.id === reputation)?.label ?? reputation;
  const tips = getProviderTips(provider);

  let text = "EMAIL WARM-UP SCHEDULE\n";
  text += "Generated by Markit Media | themarkitmedia.com\n";
  text += "=".repeat(60) + "\n\n";

  text += "CONFIGURATION\n";
  text += "-".repeat(40) + "\n";
  text += `Provider:           ${providerLabel}\n`;
  text += `Target Daily Volume: ${targetVolume.toLocaleString()}\n`;
  text += `Warm-Up Pace:       ${paceLabel}\n`;
  text += `Domain Age:         ${domainAgeLabel}\n`;
  text += `Starting Reputation: ${repLabel}\n`;
  text += `Total Days:         ${schedule.length}\n`;
  text += `Total Emails:       ${schedule[schedule.length - 1].cumulative.toLocaleString()}\n\n`;

  text += "PHASE BREAKDOWN\n";
  text += "-".repeat(40) + "\n";
  for (const phase of phases) {
    text += `\nPhase ${phase.number}: ${phase.label} (Days ${phase.startDay}-${phase.endDay})\n`;
    text += `  Volume: ${phase.startVolume.toLocaleString()} -> ${phase.endVolume.toLocaleString()} emails/day\n`;
    text += `  ${phase.description}\n`;
    text += "  Key Actions:\n";
    for (const action of phase.keyActions) {
      text += `    - ${action}\n`;
    }
  }

  text += "\n\nDAILY SCHEDULE\n";
  text += "-".repeat(90) + "\n";
  text += "Day".padEnd(6) +
    "Volume".padEnd(10) +
    "Cumulative".padEnd(14) +
    "Phase".padEnd(18) +
    "Engagement Target".padEnd(32) +
    "Notes\n";
  text += "-".repeat(90) + "\n";

  for (const day of schedule) {
    text +=
      String(day.day).padEnd(6) +
      day.volume.toLocaleString().padEnd(10) +
      day.cumulative.toLocaleString().padEnd(14) +
      day.phaseLabel.padEnd(18) +
      day.engagementTarget.padEnd(32) +
      day.notes +
      "\n";
  }

  text += "\n\nPROVIDER TIPS (" + providerLabel.toUpperCase() + ")\n";
  text += "-".repeat(40) + "\n";
  for (const tip of tips) {
    text += `- ${tip}\n`;
  }

  text += "\n\n---\nGenerated at themarkitmedia.com/resources/email-warmup-planner\n";
  return text;
}

/* ------------------------------------------------------------------ */
/*  SVG Chart                                                          */
/* ------------------------------------------------------------------ */

function VolumeChart({ schedule }: { schedule: ScheduleDay[] }) {
  const width = 800;
  const height = 300;
  const padTop = 30;
  const padRight = 20;
  const padBottom = 50;
  const padLeft = 65;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const maxVol = Math.max(...schedule.map((d) => d.volume));
  const totalDays = schedule.length;

  const points = schedule.map((d, i) => {
    const x = padLeft + (i / (totalDays - 1)) * chartW;
    const y = padTop + chartH - (d.volume / maxVol) * chartH;
    return { x, y, day: d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = linePath + ` L ${points[points.length - 1].x} ${padTop + chartH} L ${padLeft} ${padTop + chartH} Z`;

  // Y-axis labels
  const yTicks = 5;
  const yLabels: { value: number; y: number }[] = [];
  for (let i = 0; i <= yTicks; i++) {
    const value = Math.round((maxVol / yTicks) * i);
    const y = padTop + chartH - (value / maxVol) * chartH;
    yLabels.push({ value, y });
  }

  // X-axis labels (every 7 days)
  const xLabels: { day: number; x: number }[] = [];
  for (let d = 1; d <= totalDays; d += 7) {
    const x = padLeft + ((d - 1) / (totalDays - 1)) * chartW;
    xLabels.push({ day: d, x });
  }
  // Always include last day
  if (xLabels[xLabels.length - 1].day !== totalDays) {
    const x = padLeft + ((totalDays - 1) / (totalDays - 1)) * chartW;
    xLabels.push({ day: totalDays, x });
  }

  // Phase boundary lines
  const phaseBoundaries: { day: number; x: number }[] = [];
  let currentPhase = 1;
  for (const d of schedule) {
    if (d.phase !== currentPhase) {
      const x = padLeft + ((d.day - 1) / (totalDays - 1)) * chartW;
      phaseBoundaries.push({ day: d.day, x });
      currentPhase = d.phase;
    }
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      role="img"
      aria-label="Line chart showing daily send volume increasing over the warm-up period"
    >
      {/* Grid lines */}
      {yLabels.map((label) => (
        <line
          key={label.value}
          x1={padLeft}
          y1={label.y}
          x2={width - padRight}
          y2={label.y}
          stroke="#e5e5e5"
          strokeWidth="1"
        />
      ))}

      {/* Phase boundaries */}
      {phaseBoundaries.map((b) => (
        <line
          key={b.day}
          x1={b.x}
          y1={padTop}
          x2={b.x}
          y2={padTop + chartH}
          stroke="#d4d4d4"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      ))}

      {/* Area fill */}
      <path d={areaPath} fill="#000" fillOpacity="0.06" />

      {/* Line */}
      <path d={linePath} fill="none" stroke="#000" strokeWidth="2.5" strokeLinejoin="round" />

      {/* Data points at weekly intervals */}
      {points.filter((_, i) => i % 7 === 0 || i === points.length - 1).map((p) => (
        <circle key={p.day.day} cx={p.x} cy={p.y} r="4" fill="#000" />
      ))}

      {/* Y-axis labels */}
      {yLabels.map((label) => (
        <text
          key={label.value}
          x={padLeft - 10}
          y={label.y + 4}
          textAnchor="end"
          fontSize="12"
          fill="#737373"
          fontFamily="Inter, sans-serif"
        >
          {label.value.toLocaleString()}
        </text>
      ))}

      {/* X-axis labels */}
      {xLabels.map((label) => (
        <text
          key={label.day}
          x={label.x}
          y={padTop + chartH + 24}
          textAnchor="middle"
          fontSize="12"
          fill="#737373"
          fontFamily="Inter, sans-serif"
        >
          Day {label.day}
        </text>
      ))}

      {/* Axis labels */}
      <text
        x={padLeft - 45}
        y={padTop + chartH / 2}
        textAnchor="middle"
        fontSize="12"
        fill="#737373"
        fontFamily="Inter, sans-serif"
        transform={`rotate(-90, ${padLeft - 45}, ${padTop + chartH / 2})`}
      >
        Emails / Day
      </text>
      <text
        x={padLeft + chartW / 2}
        y={height - 5}
        textAnchor="middle"
        fontSize="12"
        fill="#737373"
        fontFamily="Inter, sans-serif"
      >
        Warm-Up Timeline
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmt(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function EmailWarmUpPlannerPage() {
  const [provider, setProvider] = useState<EmailProvider>("gmail");
  const [targetVolume, setTargetVolume] = useState(500);
  const [pace, setPace] = useState<WarmUpPace>("standard");
  const [domainAge, setDomainAge] = useState<DomainAge>("new");
  const [reputation, setReputation] = useState<Reputation>("unknown");
  const [generated, setGenerated] = useState(false);

  const schedule = useMemo(
    () => (generated ? generateSchedule(targetVolume, pace, domainAge, reputation) : []),
    [generated, targetVolume, pace, domainAge, reputation],
  );

  const phases = useMemo(() => getPhaseInfo(schedule), [schedule]);
  const tips = useMemo(() => getProviderTips(provider), [provider]);

  const totalEmails = schedule.length > 0 ? schedule[schedule.length - 1].cumulative : 0;
  const peakVolume = schedule.length > 0 ? Math.max(...schedule.map((d) => d.volume)) : 0;

  const handleGenerate = useCallback(() => {
    setGenerated(true);
  }, []);

  const handleExport = useCallback(() => {
    if (schedule.length === 0) return;
    const text = buildExportText(schedule, phases, provider, targetVolume, pace, domainAge, reputation);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email-warmup-schedule.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [schedule, phases, provider, targetVolume, pace, domainAge, reputation]);

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Email Warm-Up Planner",
          description:
            "Plan your email domain warm-up schedule to build sender reputation and improve deliverability. Generates a day-by-day schedule with volume targets and engagement goals.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Email Warm-Up Planner" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Email Warm-Up Planner
            </h1>
            <SectionDesc>
              Build a day-by-day warm-up schedule for your email domain. Configure your provider, target volume, and pace to get a personalized plan that protects your sender reputation while scaling to full volume.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* Input section */}
      <section className="px-6 lg:px-12 pb-12" aria-label="Configuration">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="border-2 border-black p-8">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-6">
                Configure Your Warm-Up
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email provider */}
                <div>
                  <label htmlFor="provider" className="block text-base font-bold text-black mb-1">
                    Email Provider
                  </label>
                  <select
                    id="provider"
                    value={provider}
                    onChange={(e) => {
                      setProvider(e.target.value as EmailProvider);
                      setGenerated(false);
                    }}
                    className="w-full px-4 py-3 border-2 border-neutral-200 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus:border-black transition-colors motion-reduce:transition-none"
                  >
                    {emailProviders.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Target daily volume */}
                <div>
                  <label htmlFor="target-volume" className="block text-base font-bold text-black mb-1">
                    Target Daily Volume
                  </label>
                  <input
                    id="target-volume"
                    type="number"
                    min={10}
                    max={100000}
                    value={targetVolume}
                    onChange={(e) => {
                      setTargetVolume(Math.max(10, Math.min(100000, Number(e.target.value))));
                      setGenerated(false);
                    }}
                    className="w-full px-4 py-3 border-2 border-neutral-200 text-base text-black focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus:border-black transition-colors motion-reduce:transition-none"
                  />
                  <p className="text-base text-neutral-400 mt-1">Maximum emails per day you want to reach</p>
                </div>

                {/* Warm-up pace */}
                <div className="md:col-span-2">
                  <fieldset>
                    <legend className="block text-base font-bold text-black mb-3">
                      Warm-Up Duration
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {warmUpPaces.map((p) => (
                        <label
                          key={p.id}
                          className={`flex flex-col p-4 border-2 cursor-pointer transition-colors motion-reduce:transition-none ${
                            pace === p.id
                              ? "border-black bg-black text-white"
                              : "border-neutral-200 hover:border-neutral-400"
                          }`}
                        >
                          <input
                            type="radio"
                            name="pace"
                            value={p.id}
                            checked={pace === p.id}
                            onChange={() => {
                              setPace(p.id);
                              setGenerated(false);
                            }}
                            className="sr-only"
                          />
                          <span className="text-base font-bold">{p.label}</span>
                          <span className={`text-base mt-1 ${pace === p.id ? "text-neutral-300" : "text-neutral-500"}`}>
                            {p.desc}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                {/* Domain age */}
                <div>
                  <label htmlFor="domain-age" className="block text-base font-bold text-black mb-1">
                    Domain Age
                  </label>
                  <select
                    id="domain-age"
                    value={domainAge}
                    onChange={(e) => {
                      setDomainAge(e.target.value as DomainAge);
                      setGenerated(false);
                    }}
                    className="w-full px-4 py-3 border-2 border-neutral-200 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus:border-black transition-colors motion-reduce:transition-none"
                  >
                    {domainAges.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Starting reputation */}
                <div>
                  <label htmlFor="reputation" className="block text-base font-bold text-black mb-1">
                    Starting Reputation
                  </label>
                  <select
                    id="reputation"
                    value={reputation}
                    onChange={(e) => {
                      setReputation(e.target.value as Reputation);
                      setGenerated(false);
                    }}
                    className="w-full px-4 py-3 border-2 border-neutral-200 text-base text-black bg-white focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 focus:border-black transition-colors motion-reduce:transition-none"
                  >
                    {reputations.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                className="mt-8 bg-black text-white px-10 py-4 font-bold text-base hover:bg-neutral-800 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
              >
                Generate Warm-Up Schedule
              </button>
            </div>
          </Animate>
        </div>
      </section>

      {/* Results */}
      {generated && schedule.length > 0 && (
        <>
          {/* Summary stats */}
          <section className="px-6 lg:px-12 pb-8" aria-label="Summary statistics">
            <div className="max-w-4xl mx-auto">
              <Animate animation="fade-up">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-black text-white p-6">
                    <p className="text-base text-neutral-400">Total Days</p>
                    <p className="font-[family-name:var(--font-display)] text-4xl font-extrabold mt-1">
                      {schedule.length}
                    </p>
                  </div>
                  <div className="bg-black text-white p-6">
                    <p className="text-base text-neutral-400">Total Emails During Warm-Up</p>
                    <p className="font-[family-name:var(--font-display)] text-4xl font-extrabold mt-1">
                      {fmt(totalEmails)}
                    </p>
                  </div>
                  <div className="bg-black text-white p-6">
                    <p className="text-base text-neutral-400">Peak Daily Volume</p>
                    <p className="font-[family-name:var(--font-display)] text-4xl font-extrabold mt-1">
                      {fmt(peakVolume)}
                    </p>
                  </div>
                </div>
              </Animate>
            </div>
          </section>

          {/* Volume ramp-up chart */}
          <section className="px-6 lg:px-12 py-8" aria-label="Volume ramp-up chart">
            <div className="max-w-4xl mx-auto">
              <Animate animation="fade-up">
                <div className="border-2 border-neutral-200 p-6">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-4">
                    Volume Ramp-Up
                  </h2>
                  <VolumeChart schedule={schedule} />
                </div>
              </Animate>
            </div>
          </section>

          {/* Phase breakdown cards */}
          <section className="px-6 lg:px-12 py-8" aria-label="Phase breakdown">
            <div className="max-w-4xl mx-auto">
              <Animate animation="fade-up">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-6">
                  Phase Breakdown
                </h2>
              </Animate>
              <Stagger stagger={100} animation="fade-up" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phases.map((phase) => (
                  <div key={phase.number} className="border-2 border-neutral-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex-shrink-0 w-10 h-10 bg-black text-white flex items-center justify-center font-bold text-base">
                        {phase.number}
                      </span>
                      <div>
                        <p className="text-base font-extrabold text-black font-[family-name:var(--font-display)]">
                          Phase {phase.number}: {phase.label}
                        </p>
                        <p className="text-base text-neutral-500">
                          Days {phase.startDay}–{phase.endDay} &middot; {fmt(phase.startVolume)}–{fmt(phase.endVolume)} emails/day
                        </p>
                      </div>
                    </div>
                    <p className="text-base text-neutral-600 mb-4 leading-relaxed">
                      {phase.description}
                    </p>
                    <ul className="space-y-2">
                      {phase.keyActions.map((action, i) => (
                        <li key={i} className="flex items-start gap-2 text-base text-neutral-600">
                          <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 bg-black rounded-full" aria-hidden="true" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Stagger>
            </div>
          </section>

          {/* Day-by-day schedule table */}
          <section className="px-6 lg:px-12 py-8" aria-label="Daily schedule">
            <div className="max-w-4xl mx-auto">
              <Animate animation="fade-up">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black">
                    Day-by-Day Schedule
                  </h2>
                  <button
                    onClick={handleExport}
                    className="inline-flex items-center gap-2 border-2 border-black text-black px-6 py-3 font-bold text-base hover:bg-black hover:text-white transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 min-h-[44px]"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="flex-shrink-0">
                      <path d="M9 1v10m0 0l-3.5-3.5M9 11l3.5-3.5M3 14v1.5h12V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Export as .txt
                  </button>
                </div>
                <div className="overflow-x-auto border-2 border-neutral-200">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-black text-white">
                        <th className="px-4 py-3 text-base font-bold whitespace-nowrap">Day</th>
                        <th className="px-4 py-3 text-base font-bold whitespace-nowrap">Send Volume</th>
                        <th className="px-4 py-3 text-base font-bold whitespace-nowrap">Cumulative</th>
                        <th className="px-4 py-3 text-base font-bold whitespace-nowrap">Phase</th>
                        <th className="px-4 py-3 text-base font-bold whitespace-nowrap">Engagement Target</th>
                        <th className="px-4 py-3 text-base font-bold">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map((day) => (
                        <tr
                          key={day.day}
                          className={`border-t border-neutral-200 ${
                            day.day % 2 === 0 ? "bg-neutral-50" : "bg-white"
                          }`}
                        >
                          <td className="px-4 py-3 text-base font-bold text-black whitespace-nowrap">
                            {day.day}
                          </td>
                          <td className="px-4 py-3 text-base text-black whitespace-nowrap">
                            {fmt(day.volume)}
                          </td>
                          <td className="px-4 py-3 text-base text-neutral-500 whitespace-nowrap">
                            {fmt(day.cumulative)}
                          </td>
                          <td className="px-4 py-3 text-base text-black whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5">
                              <span
                                className="flex-shrink-0 w-2.5 h-2.5 bg-black rounded-full"
                                style={{ opacity: 0.25 + (day.phase / 4) * 0.75 }}
                                aria-hidden="true"
                              />
                              {day.phaseLabel}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-base text-neutral-600 whitespace-nowrap">
                            {day.engagementTarget}
                          </td>
                          <td className="px-4 py-3 text-base text-neutral-600 leading-relaxed min-w-[280px]">
                            {day.notes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Animate>
            </div>
          </section>

          {/* Provider tips */}
          <section className="px-6 lg:px-12 py-8" aria-label="Provider-specific tips">
            <div className="max-w-4xl mx-auto">
              <Animate animation="fade-up">
                <div className="border-2 border-black p-8">
                  <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-black mb-2">
                    Tips for {emailProviders.find((p) => p.id === provider)?.label}
                  </h2>
                  <p className="text-base text-neutral-500 mb-6">
                    Provider-specific recommendations to maximize your warm-up success.
                  </p>
                  <Stagger stagger={80} animation="fade-up" className="space-y-4">
                    {tips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-black text-white flex items-center justify-center font-bold text-base">
                          {i + 1}
                        </span>
                        <p className="text-base text-neutral-600 leading-relaxed pt-1">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </Stagger>
                </div>
              </Animate>
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <section className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Need Help With Email Deliverability?
            </h2>
            <p className="text-lg text-neutral-400 mt-4 mb-8">
              Our team can set up your email infrastructure, manage your warm-up process, and optimize your sending practices to land in inboxes consistently.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 font-bold text-base hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 min-h-[44px]"
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
    </article>
  );
}
