"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types & Options                                                    */
/* ------------------------------------------------------------------ */

interface PersonaData {
  name: string;
  ageRange: string;
  gender: string;
  location: string;
  jobTitle: string;
  incomeRange: string;
  education: string;
  goals: string;
  challenges: string;
  values: string[];
  contentFormats: string[];
  decisionFactors: string;
  researchChannels: string[];
  budgetAuthority: string;
  buyingCycle: string;
  socialPlatforms: string[];
  communicationPref: string;
  brandTone: string;
}

const emptyPersona: PersonaData = {
  name: "",
  ageRange: "",
  gender: "",
  location: "",
  jobTitle: "",
  incomeRange: "",
  education: "",
  goals: "",
  challenges: "",
  values: [],
  contentFormats: [],
  decisionFactors: "",
  researchChannels: [],
  budgetAuthority: "",
  buyingCycle: "",
  socialPlatforms: [],
  communicationPref: "",
  brandTone: "",
};

const ageRanges = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"];

const genders = ["Male", "Female", "Non-binary", "All"];

const incomeRanges = [
  "Under $30k",
  "$30k-$50k",
  "$50k-$75k",
  "$75k-$100k",
  "$100k-$150k",
  "$150k+",
];

const educationLevels = [
  "High School",
  "Some College",
  "Bachelor's",
  "Master's",
  "PhD",
];

const valueOptions = [
  "Quality",
  "Price",
  "Convenience",
  "Status",
  "Sustainability",
  "Innovation",
  "Security",
  "Community",
];

const contentFormatOptions = [
  "Blog posts",
  "Videos",
  "Podcasts",
  "Social media",
  "Email newsletters",
  "Webinars",
  "Case studies",
  "Infographics",
];

const researchChannelOptions = [
  "Google",
  "Social media",
  "Review sites",
  "Word of mouth",
  "Industry publications",
  "YouTube",
  "Reddit",
  "Podcasts",
];

const budgetAuthorityOptions = [
  "Full authority",
  "Shared decision",
  "Influencer only",
  "Need approval",
];

const buyingCycleOptions = [
  "Impulse",
  "1-2 weeks",
  "1-3 months",
  "3-6 months",
  "6+ months",
];

const socialPlatformOptions = [
  "Instagram",
  "Facebook",
  "LinkedIn",
  "TikTok",
  "Twitter/X",
  "YouTube",
  "Pinterest",
];

const communicationPrefOptions = [
  "Email",
  "Phone",
  "Chat",
  "In-person",
  "Social DM",
];

const brandToneOptions = [
  "Professional",
  "Casual",
  "Technical",
  "Inspirational",
  "Humorous",
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function toggleItem(arr: string[], item: string): string[] {
  return arr.includes(item) ? arr.filter((v) => v !== item) : [...arr, item];
}

function formatPersonaText(p: PersonaData): string {
  const lines: string[] = [];
  lines.push(`BUYER PERSONA: ${p.name}`);
  lines.push("=".repeat(40));
  lines.push("");

  lines.push("DEMOGRAPHICS");
  lines.push("-".repeat(20));
  if (p.ageRange) lines.push(`Age Range: ${p.ageRange}`);
  if (p.gender) lines.push(`Gender: ${p.gender}`);
  if (p.location) lines.push(`Location: ${p.location}`);
  if (p.jobTitle) lines.push(`Job Title: ${p.jobTitle}`);
  if (p.incomeRange) lines.push(`Income Range: ${p.incomeRange}`);
  if (p.education) lines.push(`Education: ${p.education}`);
  lines.push("");

  lines.push("PSYCHOGRAPHICS");
  lines.push("-".repeat(20));
  if (p.goals) lines.push(`Goals: ${p.goals}`);
  if (p.challenges) lines.push(`Challenges: ${p.challenges}`);
  if (p.values.length > 0) lines.push(`Values: ${p.values.join(", ")}`);
  if (p.contentFormats.length > 0)
    lines.push(`Preferred Content: ${p.contentFormats.join(", ")}`);
  lines.push("");

  lines.push("BUYING BEHAVIOR");
  lines.push("-".repeat(20));
  if (p.decisionFactors) lines.push(`Decision Factors: ${p.decisionFactors}`);
  if (p.researchChannels.length > 0)
    lines.push(`Research Channels: ${p.researchChannels.join(", ")}`);
  if (p.budgetAuthority) lines.push(`Budget Authority: ${p.budgetAuthority}`);
  if (p.buyingCycle) lines.push(`Buying Cycle: ${p.buyingCycle}`);
  lines.push("");

  lines.push("BRAND INTERACTION");
  lines.push("-".repeat(20));
  if (p.socialPlatforms.length > 0)
    lines.push(`Social Platforms: ${p.socialPlatforms.join(", ")}`);
  if (p.communicationPref)
    lines.push(`Communication Preference: ${p.communicationPref}`);
  if (p.brandTone) lines.push(`Brand Tone Preference: ${p.brandTone}`);

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Reusable sub-components                                            */
/* ------------------------------------------------------------------ */

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Buyer Persona Builder",
          description: "Build detailed buyer personas for your marketing strategy. Fill in demographics, psychographics, and buying behavior to generate a formatted persona document.",
          url: "https://themarkitmedia.com/en/resources/persona-builder",
          applicationCategory: "Marketing Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>Buyer Persona Builder | Free Marketing Tool — Markit Media</title>
      <link rel="canonical" href="https://themarkitmedia.com/en/resources/persona-builder" />
      <meta name="description" content="Build detailed buyer personas for your marketing strategy. Fill in demographics, psychographics, and buying behavior to generate a formatted persona document." />
      <label htmlFor={id} className="block text-base font-bold text-black mb-2">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-200 text-base bg-white text-black focus-visible:border-black focus-visible:outline-none appearance-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
      >
        <option value="">{placeholder || "Select..."}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-base font-bold text-black mb-2">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-200 text-base min-h-[44px] focus-visible:border-black focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
      />
    </div>
  );
}

function TextareaField({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-base font-bold text-black mb-2">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-4 py-3 border border-gray-200 text-base min-h-[88px] focus-visible:border-black focus-visible:outline-none resize-y focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
      />
    </div>
  );
}

function CheckboxGroup({
  legend,
  options,
  selected,
  onChange,
}: {
  legend: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <fieldset>
      <legend className="text-base font-bold text-black mb-3">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = selected.includes(option);
          return (
            <label
              key={option}
              className={`inline-flex items-center gap-2 px-4 py-3 min-h-[44px] text-base cursor-pointer border transition-colors motion-reduce:transition-none select-none focus-within:outline-2 focus-within:outline-black focus-within:outline-offset-2 ${
                checked
                  ? "bg-black text-white border-black"
                  : "border-gray-200 text-gray-600 hover:border-black"
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onChange(toggleItem(selected, option))}
                className="sr-only"
              />
              {option}
            </label>
          );
        })}
      </div>
    </fieldset>
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
      aria-label="Copy persona to clipboard"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      {copied ? "Copied" : "Copy to Clipboard"}
    </button>
  );
}

function DownloadButton({ text, filename }: { text: string; filename: string }) {
  const download = useCallback(() => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [text, filename]);

  return (
    <button
      onClick={download}
      aria-label="Download persona as text file"
      className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-base font-bold bg-black text-white hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
    >
      Download .txt
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Persona card                                                       */
/* ------------------------------------------------------------------ */

function PersonaCard({ persona }: { persona: PersonaData }) {
  const plainText = formatPersonaText(persona);
  const filename = `${persona.name.toLowerCase().replace(/\s+/g, "-")}-persona.txt`;

  return (
    <Animate animation="fade-up">
      <div className="border border-gray-200">
        {/* Header */}
        <div className="bg-black text-white p-6">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold">
            {persona.name}
          </h2>
          <p className="text-base text-gray-400 mt-1">Buyer Persona Profile</p>
        </div>

        <div className="p-6 space-y-8">
          {/* Demographics */}
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
              Demographics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {persona.ageRange && (
                <div>
                  <p className="text-base font-bold text-black">Age Range</p>
                  <p className="text-base text-gray-500">{persona.ageRange}</p>
                </div>
              )}
              {persona.gender && (
                <div>
                  <p className="text-base font-bold text-black">Gender</p>
                  <p className="text-base text-gray-500">{persona.gender}</p>
                </div>
              )}
              {persona.location && (
                <div>
                  <p className="text-base font-bold text-black">Location</p>
                  <p className="text-base text-gray-500">{persona.location}</p>
                </div>
              )}
              {persona.jobTitle && (
                <div>
                  <p className="text-base font-bold text-black">Job Title</p>
                  <p className="text-base text-gray-500">{persona.jobTitle}</p>
                </div>
              )}
              {persona.incomeRange && (
                <div>
                  <p className="text-base font-bold text-black">Income Range</p>
                  <p className="text-base text-gray-500">{persona.incomeRange}</p>
                </div>
              )}
              {persona.education && (
                <div>
                  <p className="text-base font-bold text-black">Education</p>
                  <p className="text-base text-gray-500">{persona.education}</p>
                </div>
              )}
            </div>
          </div>

          {/* Psychographics */}
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
              Psychographics
            </h3>
            <div className="space-y-4">
              {persona.goals && (
                <div>
                  <p className="text-base font-bold text-black">Goals</p>
                  <p className="text-base text-gray-500 whitespace-pre-line">{persona.goals}</p>
                </div>
              )}
              {persona.challenges && (
                <div>
                  <p className="text-base font-bold text-black">Challenges</p>
                  <p className="text-base text-gray-500 whitespace-pre-line">{persona.challenges}</p>
                </div>
              )}
              {persona.values.length > 0 && (
                <div>
                  <p className="text-base font-bold text-black">Values</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {persona.values.map((v) => (
                      <span key={v} className="px-3 py-1 border border-gray-200 text-base text-gray-600">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {persona.contentFormats.length > 0 && (
                <div>
                  <p className="text-base font-bold text-black">Preferred Content</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {persona.contentFormats.map((v) => (
                      <span key={v} className="px-3 py-1 border border-gray-200 text-base text-gray-600">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Buying Behavior */}
          {(persona.decisionFactors ||
            persona.researchChannels.length > 0 ||
            persona.budgetAuthority ||
            persona.buyingCycle) && (
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                Buying Behavior
              </h3>
              <div className="space-y-4">
                {persona.decisionFactors && (
                  <div>
                    <p className="text-base font-bold text-black">Decision Factors</p>
                    <p className="text-base text-gray-500 whitespace-pre-line">
                      {persona.decisionFactors}
                    </p>
                  </div>
                )}
                {persona.researchChannels.length > 0 && (
                  <div>
                    <p className="text-base font-bold text-black">Research Channels</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {persona.researchChannels.map((v) => (
                        <span key={v} className="px-3 py-1 border border-gray-200 text-base text-gray-600">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {persona.budgetAuthority && (
                  <div>
                    <p className="text-base font-bold text-black">Budget Authority</p>
                    <p className="text-base text-gray-500">{persona.budgetAuthority}</p>
                  </div>
                )}
                {persona.buyingCycle && (
                  <div>
                    <p className="text-base font-bold text-black">Buying Cycle</p>
                    <p className="text-base text-gray-500">{persona.buyingCycle}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Brand Interaction */}
          {(persona.socialPlatforms.length > 0 ||
            persona.communicationPref ||
            persona.brandTone) && (
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
                Brand Interaction
              </h3>
              <div className="space-y-4">
                {persona.socialPlatforms.length > 0 && (
                  <div>
                    <p className="text-base font-bold text-black">Social Platforms</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {persona.socialPlatforms.map((v) => (
                        <span key={v} className="px-3 py-1 border border-gray-200 text-base text-gray-600">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {persona.communicationPref && (
                  <div>
                    <p className="text-base font-bold text-black">Communication Preference</p>
                    <p className="text-base text-gray-500">{persona.communicationPref}</p>
                  </div>
                )}
                {persona.brandTone && (
                  <div>
                    <p className="text-base font-bold text-black">Brand Tone Preference</p>
                    <p className="text-base text-gray-500">{persona.brandTone}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 p-6 flex flex-wrap gap-3">
          <CopyButton text={plainText} />
          <DownloadButton text={plainText} filename={filename} />
        </div>
      </div>
    </Animate>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */



export default function PersonaBuilderPage() {
  const [persona, setPersona] = useState<PersonaData>({ ...emptyPersona });
  const [generated, setGenerated] = useState<PersonaData | null>(null);

  function update<K extends keyof PersonaData>(key: K, value: PersonaData[K]) {
    setPersona((prev) => ({ ...prev, [key]: value }));
  }

  const canGenerate =
    persona.name.trim().length > 0 &&
    persona.goals.trim().length > 0 &&
    persona.challenges.trim().length > 0;

  function handleGenerate() {
    if (canGenerate) {
      setGenerated({ ...persona });
    }
  }

  function handleReset() {
    setPersona({ ...emptyPersona });
    setGenerated(null);
  }

  return (
    <article className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Buyer Persona Builder",
          description:
            "Build detailed buyer personas for your marketing strategy. Fill in demographics, psychographics, and buying behavior to generate a formatted persona document.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Buyer Persona Builder" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Buyer Persona Builder
            </h1>
            <SectionDesc>
              Define your ideal customer in detail. Fill in demographics, motivations, and buying behavior to generate a structured buyer persona you can share with your team.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Form ---- */}
      <section aria-label="Demographics" className="px-6 lg:px-12 pb-12">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Demographics */}
          <Animate animation="fade-up">
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                Demographics
              </h2>

              <TextField
                id="persona-name"
                label="Persona Name"
                value={persona.name}
                onChange={(v) => update("name", v)}
                placeholder='e.g. "Marketing Mary" or "Startup Steve"'
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <SelectField
                  id="age-range"
                  label="Age Range"
                  value={persona.ageRange}
                  onChange={(v) => update("ageRange", v)}
                  options={ageRanges}
                />
                <SelectField
                  id="gender"
                  label="Gender"
                  value={persona.gender}
                  onChange={(v) => update("gender", v)}
                  options={genders}
                />
              </div>

              <TextField
                id="location"
                label="Location"
                value={persona.location}
                onChange={(v) => update("location", v)}
                placeholder="e.g. New York, USA"
              />

              <TextField
                id="job-title"
                label="Job Title"
                value={persona.jobTitle}
                onChange={(v) => update("jobTitle", v)}
                placeholder="e.g. Marketing Manager"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <SelectField
                  id="income-range"
                  label="Income Range"
                  value={persona.incomeRange}
                  onChange={(v) => update("incomeRange", v)}
                  options={incomeRanges}
                />
                <SelectField
                  id="education"
                  label="Education"
                  value={persona.education}
                  onChange={(v) => update("education", v)}
                  options={educationLevels}
                />
              </div>
            </div>
          </Animate>

          {/* Psychographics */}
          <Animate animation="fade-up">
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                Psychographics
              </h2>

              <TextareaField
                id="goals"
                label="Goals"
                value={persona.goals}
                onChange={(v) => update("goals", v)}
                placeholder="What does this persona want to achieve? What outcomes matter to them?"
              />

              <TextareaField
                id="challenges"
                label="Challenges"
                value={persona.challenges}
                onChange={(v) => update("challenges", v)}
                placeholder="What pain points and frustrations do they face? What keeps them up at night?"
              />

              <CheckboxGroup
                legend="Values"
                options={valueOptions}
                selected={persona.values}
                onChange={(v) => update("values", v)}
              />

              <CheckboxGroup
                legend="Preferred Content Formats"
                options={contentFormatOptions}
                selected={persona.contentFormats}
                onChange={(v) => update("contentFormats", v)}
              />
            </div>
          </Animate>

          {/* Buying Behavior */}
          <Animate animation="fade-up">
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                Buying Behavior
              </h2>

              <TextareaField
                id="decision-factors"
                label="Decision Factors"
                value={persona.decisionFactors}
                onChange={(v) => update("decisionFactors", v)}
                placeholder="What influences their purchase decisions? Price, reviews, brand reputation, recommendations?"
              />

              <CheckboxGroup
                legend="Where They Research"
                options={researchChannelOptions}
                selected={persona.researchChannels}
                onChange={(v) => update("researchChannels", v)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <SelectField
                  id="budget-authority"
                  label="Budget Authority"
                  value={persona.budgetAuthority}
                  onChange={(v) => update("budgetAuthority", v)}
                  options={budgetAuthorityOptions}
                />
                <SelectField
                  id="buying-cycle"
                  label="Buying Cycle"
                  value={persona.buyingCycle}
                  onChange={(v) => update("buyingCycle", v)}
                  options={buyingCycleOptions}
                />
              </div>
            </div>
          </Animate>

          {/* Brand Interaction */}
          <Animate animation="fade-up">
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black">
                Brand Interaction
              </h2>

              <CheckboxGroup
                legend="Preferred Social Platforms"
                options={socialPlatformOptions}
                selected={persona.socialPlatforms}
                onChange={(v) => update("socialPlatforms", v)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <SelectField
                  id="communication-pref"
                  label="Communication Preference"
                  value={persona.communicationPref}
                  onChange={(v) => update("communicationPref", v)}
                  options={communicationPrefOptions}
                />
                <SelectField
                  id="brand-tone"
                  label="Brand Tone Preference"
                  value={persona.brandTone}
                  onChange={(v) => update("brandTone", v)}
                  options={brandToneOptions}
                />
              </div>
            </div>
          </Animate>

          {/* Generate / Reset */}
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3">
              {canGenerate && (
                <button
                  onClick={handleGenerate}
                  className="bg-black text-white px-8 py-4 min-h-[44px] text-base font-bold hover:bg-gray-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Generate Persona
                </button>
              )}
              {(persona.name || persona.goals || persona.challenges) && (
                <button
                  onClick={handleReset}
                  className="px-8 py-4 min-h-[44px] text-base font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Reset
                </button>
              )}
              {!canGenerate && (
                <p className="text-base text-gray-400 self-center">
                  Fill in at least the persona name, goals, and challenges to generate.
                </p>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Generated Persona ---- */}
      {generated && (
        <section aria-label="How to Use Buyer Personas" className="px-6 lg:px-12 pb-16">
          <div className="max-w-3xl mx-auto">
            <PersonaCard persona={generated} />
          </div>
        </section>
      )}

      {/* ---- How to Use Buyer Personas ---- */}
      <section aria-label="Align your content strategy" className="px-6 lg:px-12 py-16 border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
              How to Use Buyer Personas
            </h2>
            <Stagger stagger={80} className="space-y-6 text-base text-gray-500 leading-relaxed">
              <div>
                <h3 className="font-bold text-black mb-2">Align your content strategy</h3>
                <p>
                  Use your persona&apos;s preferred content formats and research channels to decide where to publish and what topics to cover. A persona who relies on YouTube and podcasts needs video and audio content, not just blog posts.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Sharpen your ad targeting</h3>
                <p>
                  Demographics like age range, income, and job title map directly to ad platform targeting options. Use your persona to set up audience segments in Google Ads, Meta Ads, or LinkedIn Campaign Manager.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Craft better messaging</h3>
                <p>
                  Your persona&apos;s goals and challenges tell you what to lead with in headlines, email subject lines, and landing page copy. Address their specific pain points and they will pay attention.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Improve your sales process</h3>
                <p>
                  Share personas with your sales team so they understand the buying cycle length, budget authority level, and decision factors. This shortens sales conversations and improves close rates.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black mb-2">Build multiple personas</h3>
                <p>
                  Most businesses serve two to four distinct buyer types. Create a persona for each segment and tailor your marketing to speak to each one differently rather than trying to reach everyone with the same message.
                </p>
              </div>
            </Stagger>
          </Animate>
        </div>
      </section>

      {/* ---- Bottom CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Turn Personas Into Results
            </h2>
            <p className="text-lg text-gray-400 mt-4 mb-8">
              Knowing your audience is the first step. Let our team build a marketing strategy that reaches the right people with the right message at the right time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services/digital-marketing"
                className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-gray-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Our Marketing Services &rarr;
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 border border-white text-white px-10 py-5 min-h-[44px] font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Get in Touch &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Persona Builder"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Migration Checklist", href: "/resources/migration-checklist" },
          { title: "Og Preview", href: "/resources/og-preview" },
          { title: "Okr Planner", href: "/resources/okr-planner" },
          { title: "Persona Workshop", href: "/resources/persona-workshop" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
