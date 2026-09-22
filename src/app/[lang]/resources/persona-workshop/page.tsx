"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PersonaData {
  id: string;
  name: string;
  /* Demographics */
  ageRange: string;
  gender: string;
  jobTitle: string;
  industry: string;
  companySize: string;
  incomeRange: string;
  location: string;
  education: string;
  /* Psychographics */
  values: string[];
  personalityTraits: string;
  communicationStyle: string;
  decisionApproach: string;
  /* Goals & Challenges */
  professionalGoals: string[];
  personalGoals: string[];
  painPoints: string[];
  frustrations: string;
  successMetrics: string;
  /* Media & Content */
  contentFormats: string[];
  socialPlatforms: string[];
  communicationChannels: string[];
  bestTimeToReach: string;
  /* Buying Behavior */
  budgetAuthority: string;
  researchProcess: string;
  decisionCriteria: string;
  objections: string;
  preferredVendors: string;
}

type Step = 1 | 2 | 3 | 4 | 5;

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "markit-persona-workshop";
const MAX_PERSONAS = 5;

const stepLabels: Record<Step, string> = {
  1: "Demographics",
  2: "Psychographics",
  3: "Goals & Challenges",
  4: "Media & Content",
  5: "Buying Behavior",
};

function createEmptyPersona(): PersonaData {
  return {
    id: crypto.randomUUID(),
    name: "",
    ageRange: "",
    gender: "",
    jobTitle: "",
    industry: "",
    companySize: "",
    incomeRange: "",
    location: "",
    education: "",
    values: [],
    personalityTraits: "",
    communicationStyle: "",
    decisionApproach: "",
    professionalGoals: ["", "", ""],
    personalGoals: ["", "", ""],
    painPoints: [""],
    frustrations: "",
    successMetrics: "",
    contentFormats: [],
    socialPlatforms: [],
    communicationChannels: [],
    bestTimeToReach: "",
    budgetAuthority: "",
    researchProcess: "",
    decisionCriteria: "",
    objections: "",
    preferredVendors: "",
  };
}

const ageRanges = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"];
const genders = ["Male", "Female", "Non-binary", "All"];
const companySizes = ["1-10", "11-50", "51-200", "201-1000", "1000+"];
const incomeRanges = ["Under $30k", "$30k-$50k", "$50k-$75k", "$75k-$100k", "$100k-$150k", "$150k+"];
const educationLevels = ["High School", "Some College", "Bachelor's", "Master's", "PhD"];
const industries = [
  "Technology", "Healthcare", "Finance", "Education", "Real Estate",
  "E-Commerce", "SaaS / Software", "Professional Services",
  "Manufacturing", "Retail", "Non-Profit", "Marketing / Advertising",
];

const valueOptions = [
  "Quality", "Price", "Convenience", "Status", "Sustainability",
  "Innovation", "Security", "Community", "Efficiency", "Growth",
  "Work-Life Balance", "Transparency",
];

const decisionApproaches = ["Analytical", "Emotional", "Consensus", "Impulsive"];
const communicationStyles = ["Formal", "Conversational", "Direct", "Storytelling"];

const contentFormatOptions = [
  "Blog posts", "Videos", "Podcasts", "Social media",
  "Email newsletters", "Webinars", "Case studies", "Whitepapers",
];

const socialPlatformOptions = [
  "LinkedIn", "Instagram", "Facebook", "Twitter/X",
  "TikTok", "YouTube", "Reddit", "Pinterest",
];

const communicationChannelOptions = [
  "Email", "Phone", "Video call", "In-person",
  "Live chat", "Social DM", "SMS",
];

const budgetAuthorityOptions = ["Yes", "No", "Shared"];

/* ------------------------------------------------------------------ */
/*  Industry Templates                                                 */
/* ------------------------------------------------------------------ */

interface IndustryTemplate {
  label: string;
  data: Partial<PersonaData>;
}

const industryTemplates: IndustryTemplate[] = [
  {
    label: "B2B SaaS",
    data: {
      name: "SaaS Decision-Maker",
      ageRange: "35-44",
      gender: "All",
      jobTitle: "VP of Operations",
      industry: "SaaS / Software",
      companySize: "51-200",
      incomeRange: "$100k-$150k",
      education: "Bachelor's",
      values: ["Efficiency", "Innovation", "Growth"],
      personalityTraits: "Analytical, detail-oriented, ROI-focused",
      communicationStyle: "Direct",
      decisionApproach: "Analytical",
      professionalGoals: ["Reduce operational costs by 20%", "Improve team productivity", "Implement scalable systems"],
      personalGoals: ["Career advancement", "Industry recognition", "Work-life balance"],
      painPoints: ["Too many disconnected tools", "Slow onboarding for new software", "Difficulty proving ROI to leadership"],
      frustrations: "Vendors that overpromise, long implementation timelines, lack of integrations",
      successMetrics: "Time saved, cost reduction, user adoption rate, customer satisfaction scores",
      contentFormats: ["Case studies", "Whitepapers", "Webinars"],
      socialPlatforms: ["LinkedIn", "Twitter/X"],
      communicationChannels: ["Email", "Video call"],
      bestTimeToReach: "Tuesday-Thursday, 10am-2pm",
      budgetAuthority: "Shared",
      researchProcess: "Reads G2 reviews, compares 3-5 vendors, requests demos, involves team in trial",
      decisionCriteria: "Integration capabilities, pricing transparency, customer support quality, ease of use",
      objections: "Switching costs, data migration concerns, team adoption resistance",
      preferredVendors: "Established brands with strong customer support and documentation",
    },
  },
  {
    label: "E-Commerce",
    data: {
      name: "Online Shopper",
      ageRange: "25-34",
      gender: "All",
      jobTitle: "Consumer",
      industry: "E-Commerce",
      companySize: "1-10",
      incomeRange: "$50k-$75k",
      education: "Bachelor's",
      values: ["Convenience", "Price", "Quality"],
      personalityTraits: "Impulsive yet research-driven, brand-conscious, social-media savvy",
      communicationStyle: "Conversational",
      decisionApproach: "Emotional",
      professionalGoals: ["Find reliable products quickly", "Get the best value for money", "Discover new brands"],
      personalGoals: ["Simplify daily routines", "Stay on trend", "Feel confident in purchases"],
      painPoints: ["Overwhelming product choices", "Unclear return policies", "Slow shipping"],
      frustrations: "Inaccurate product photos, hidden fees at checkout, poor mobile experience",
      successMetrics: "Fast delivery, product matches description, easy returns, personalized recommendations",
      contentFormats: ["Social media", "Videos", "Email newsletters"],
      socialPlatforms: ["Instagram", "TikTok", "YouTube", "Pinterest"],
      communicationChannels: ["Email", "Live chat", "SMS"],
      bestTimeToReach: "Evenings and weekends",
      budgetAuthority: "Yes",
      researchProcess: "Sees product on social media, reads reviews, checks price comparisons, looks for coupon codes",
      decisionCriteria: "Price, reviews, shipping speed, return policy, brand reputation",
      objections: "Is this worth the price? Will it look like the photos? What if I need to return it?",
      preferredVendors: "Brands with strong social presence and hassle-free returns",
    },
  },
  {
    label: "Professional Services",
    data: {
      name: "Service Buyer",
      ageRange: "35-44",
      gender: "All",
      jobTitle: "Business Owner / CEO",
      industry: "Professional Services",
      companySize: "11-50",
      incomeRange: "$100k-$150k",
      education: "Master's",
      values: ["Quality", "Transparency", "Security"],
      personalityTraits: "Risk-averse, relationship-driven, values expertise and credentials",
      communicationStyle: "Formal",
      decisionApproach: "Consensus",
      professionalGoals: ["Scale business operations", "Reduce compliance risk", "Improve client retention"],
      personalGoals: ["Reduce personal workload", "Build a trusted team", "Achieve long-term stability"],
      painPoints: ["Finding trustworthy service providers", "Managing multiple vendors", "Unpredictable costs"],
      frustrations: "Cookie-cutter proposals, lack of industry expertise, poor communication during projects",
      successMetrics: "Project delivered on time and budget, measurable business impact, long-term partnership value",
      contentFormats: ["Case studies", "Blog posts", "Webinars", "Whitepapers"],
      socialPlatforms: ["LinkedIn", "Facebook"],
      communicationChannels: ["Email", "Phone", "In-person"],
      bestTimeToReach: "Monday-Friday, 9am-12pm",
      budgetAuthority: "Yes",
      researchProcess: "Asks for referrals, reviews case studies, schedules consultations with 2-3 firms",
      decisionCriteria: "Industry experience, client testimonials, pricing clarity, communication style",
      objections: "Will they understand my industry? Are they too large/small for us? What is the true total cost?",
      preferredVendors: "Boutique firms with deep industry expertise and strong references",
    },
  },
  {
    label: "Healthcare",
    data: {
      name: "Healthcare Administrator",
      ageRange: "45-54",
      gender: "All",
      jobTitle: "Practice Manager / Administrator",
      industry: "Healthcare",
      companySize: "11-50",
      incomeRange: "$75k-$100k",
      education: "Master's",
      values: ["Security", "Quality", "Transparency", "Efficiency"],
      personalityTraits: "Compliance-focused, cautious, detail-oriented, patient-centric",
      communicationStyle: "Formal",
      decisionApproach: "Consensus",
      professionalGoals: ["Improve patient satisfaction scores", "Streamline administrative workflows", "Maintain regulatory compliance"],
      personalGoals: ["Reduce burnout", "Stay current with healthcare technology", "Professional development"],
      painPoints: ["HIPAA compliance burden", "Staff turnover", "Outdated systems that do not integrate"],
      frustrations: "Vendors unfamiliar with healthcare regulations, long procurement cycles, change resistance from staff",
      successMetrics: "Patient satisfaction, compliance audit results, staff efficiency, cost per patient",
      contentFormats: ["Whitepapers", "Case studies", "Webinars", "Email newsletters"],
      socialPlatforms: ["LinkedIn", "Facebook"],
      communicationChannels: ["Email", "Phone", "In-person"],
      bestTimeToReach: "Tuesday-Thursday, 11am-1pm",
      budgetAuthority: "Shared",
      researchProcess: "Attends industry conferences, consults peers, reviews compliance documentation, requests pilot programs",
      decisionCriteria: "HIPAA compliance, integration with existing EHR, vendor support, total cost of ownership",
      objections: "Is it HIPAA compliant? Will staff actually use it? What is the implementation timeline?",
      preferredVendors: "Healthcare-specialized vendors with compliance certifications",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function toggleItem(arr: string[], item: string): string[] {
  return arr.includes(item) ? arr.filter((v) => v !== item) : [...arr, item];
}

function formatPersonaText(p: PersonaData): string {
  const lines: string[] = [];
  lines.push(`MARKETING PERSONA: ${p.name || "Untitled"}`);
  lines.push("=".repeat(50));
  lines.push("");

  lines.push("DEMOGRAPHICS");
  lines.push("-".repeat(30));
  if (p.ageRange) lines.push(`Age Range: ${p.ageRange}`);
  if (p.gender) lines.push(`Gender: ${p.gender}`);
  if (p.jobTitle) lines.push(`Job Title: ${p.jobTitle}`);
  if (p.industry) lines.push(`Industry: ${p.industry}`);
  if (p.companySize) lines.push(`Company Size: ${p.companySize}`);
  if (p.incomeRange) lines.push(`Income Range: ${p.incomeRange}`);
  if (p.location) lines.push(`Location: ${p.location}`);
  if (p.education) lines.push(`Education: ${p.education}`);
  lines.push("");

  lines.push("PSYCHOGRAPHICS");
  lines.push("-".repeat(30));
  if (p.values.length > 0) lines.push(`Values: ${p.values.join(", ")}`);
  if (p.personalityTraits) lines.push(`Personality Traits: ${p.personalityTraits}`);
  if (p.communicationStyle) lines.push(`Communication Style: ${p.communicationStyle}`);
  if (p.decisionApproach) lines.push(`Decision-Making Approach: ${p.decisionApproach}`);
  lines.push("");

  lines.push("GOALS & CHALLENGES");
  lines.push("-".repeat(30));
  const profGoals = p.professionalGoals.filter(Boolean);
  if (profGoals.length > 0) lines.push(`Professional Goals:\n${profGoals.map((g, i) => `  ${i + 1}. ${g}`).join("\n")}`);
  const persGoals = p.personalGoals.filter(Boolean);
  if (persGoals.length > 0) lines.push(`Personal Goals:\n${persGoals.map((g, i) => `  ${i + 1}. ${g}`).join("\n")}`);
  const points = p.painPoints.filter(Boolean);
  if (points.length > 0) lines.push(`Pain Points:\n${points.map((pt) => `  - ${pt}`).join("\n")}`);
  if (p.frustrations) lines.push(`Frustrations: ${p.frustrations}`);
  if (p.successMetrics) lines.push(`Success Metrics: ${p.successMetrics}`);
  lines.push("");

  lines.push("MEDIA & CONTENT");
  lines.push("-".repeat(30));
  if (p.contentFormats.length > 0) lines.push(`Preferred Content Formats: ${p.contentFormats.join(", ")}`);
  if (p.socialPlatforms.length > 0) lines.push(`Social Media Platforms: ${p.socialPlatforms.join(", ")}`);
  if (p.communicationChannels.length > 0) lines.push(`Communication Channels: ${p.communicationChannels.join(", ")}`);
  if (p.bestTimeToReach) lines.push(`Best Time to Reach: ${p.bestTimeToReach}`);
  lines.push("");

  lines.push("BUYING BEHAVIOR");
  lines.push("-".repeat(30));
  if (p.budgetAuthority) lines.push(`Budget Authority: ${p.budgetAuthority}`);
  if (p.researchProcess) lines.push(`Research Process: ${p.researchProcess}`);
  if (p.decisionCriteria) lines.push(`Key Decision Criteria: ${p.decisionCriteria}`);
  if (p.objections) lines.push(`Objections to Overcome: ${p.objections}`);
  if (p.preferredVendors) lines.push(`Preferred Vendors/Brands: ${p.preferredVendors}`);

  return lines.join("\n");
}

function formatAllPersonasText(personas: PersonaData[]): string {
  return personas.map((p) => formatPersonaText(p)).join("\n\n" + "=".repeat(50) + "\n\n");
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
      <label htmlFor={id} className="block text-base font-bold text-black mb-2">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-neutral-200 text-base bg-white text-black focus-visible:border-black focus-visible:outline-none appearance-none min-h-[44px] focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
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
        className="w-full px-4 py-3 border border-neutral-200 text-base min-h-[44px] focus-visible:border-black focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
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
        className="w-full px-4 py-3 border border-neutral-200 text-base min-h-[88px] focus-visible:border-black focus-visible:outline-none resize-y focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
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
                  : "border-neutral-200 text-neutral-600 hover:border-black"
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

function RadioGroup({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-base font-bold text-black mb-3">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = value === option;
          return (
            <label
              key={option}
              className={`inline-flex items-center gap-2 px-4 py-3 min-h-[44px] text-base cursor-pointer border transition-colors motion-reduce:transition-none select-none focus-within:outline-2 focus-within:outline-black focus-within:outline-offset-2 ${
                checked
                  ? "bg-black text-white border-black"
                  : "border-neutral-200 text-neutral-600 hover:border-black"
              }`}
            >
              <input
                type="radio"
                name={name}
                checked={checked}
                onChange={() => onChange(option)}
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

/* ------------------------------------------------------------------ */
/*  Step content components                                            */
/* ------------------------------------------------------------------ */

function StepDemographics({
  persona,
  update,
}: {
  persona: PersonaData;
  update: <K extends keyof PersonaData>(key: K, value: PersonaData[K]) => void;
}) {
  return (
    <div className="space-y-6">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <TextField
          id="job-title"
          label="Job Title"
          value={persona.jobTitle}
          onChange={(v) => update("jobTitle", v)}
          placeholder="e.g. Marketing Manager"
        />
        <SelectField
          id="industry"
          label="Industry"
          value={persona.industry}
          onChange={(v) => update("industry", v)}
          options={industries}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <SelectField
          id="company-size"
          label="Company Size (employees)"
          value={persona.companySize}
          onChange={(v) => update("companySize", v)}
          options={companySizes}
        />
        <SelectField
          id="income-range"
          label="Income Range"
          value={persona.incomeRange}
          onChange={(v) => update("incomeRange", v)}
          options={incomeRanges}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <TextField
          id="location"
          label="Location"
          value={persona.location}
          onChange={(v) => update("location", v)}
          placeholder="e.g. New York, USA"
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
  );
}

function StepPsychographics({
  persona,
  update,
}: {
  persona: PersonaData;
  update: <K extends keyof PersonaData>(key: K, value: PersonaData[K]) => void;
}) {
  return (
    <div className="space-y-6">
      <CheckboxGroup
        legend="Core Values (select all that apply)"
        options={valueOptions}
        selected={persona.values}
        onChange={(v) => update("values", v)}
      />
      <TextareaField
        id="personality-traits"
        label="Personality Traits"
        value={persona.personalityTraits}
        onChange={(v) => update("personalityTraits", v)}
        placeholder="Describe their personality. e.g. Analytical, detail-oriented, risk-averse, data-driven"
      />
      <RadioGroup
        legend="Communication Style"
        name="communication-style"
        options={communicationStyles}
        value={persona.communicationStyle}
        onChange={(v) => update("communicationStyle", v)}
      />
      <RadioGroup
        legend="Decision-Making Approach"
        name="decision-approach"
        options={decisionApproaches}
        value={persona.decisionApproach}
        onChange={(v) => update("decisionApproach", v)}
      />
    </div>
  );
}

function StepGoals({
  persona,
  update,
}: {
  persona: PersonaData;
  update: <K extends keyof PersonaData>(key: K, value: PersonaData[K]) => void;
}) {
  function updateGoal(type: "professionalGoals" | "personalGoals", index: number, value: string) {
    const arr = [...persona[type]];
    arr[index] = value;
    update(type, arr);
  }

  function addPainPoint() {
    update("painPoints", [...persona.painPoints, ""]);
  }

  function removePainPoint(index: number) {
    if (persona.painPoints.length <= 1) return;
    update("painPoints", persona.painPoints.filter((_, i) => i !== index));
  }

  function updatePainPoint(index: number, value: string) {
    const arr = [...persona.painPoints];
    arr[index] = value;
    update("painPoints", arr);
  }

  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="text-base font-bold text-black mb-3">Top 3 Professional Goals</legend>
        <div className="space-y-3">
          {persona.professionalGoals.map((goal, i) => (
            <div key={i}>
              <label htmlFor={`prof-goal-${i}`} className="sr-only">
                Professional goal {i + 1}
              </label>
              <input
                id={`prof-goal-${i}`}
                type="text"
                value={goal}
                onChange={(e) => updateGoal("professionalGoals", i, e.target.value)}
                placeholder={`Goal ${i + 1}`}
                className="w-full px-4 py-3 border border-neutral-200 text-base min-h-[44px] focus-visible:border-black focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              />
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-base font-bold text-black mb-3">Top 3 Personal Goals</legend>
        <div className="space-y-3">
          {persona.personalGoals.map((goal, i) => (
            <div key={i}>
              <label htmlFor={`pers-goal-${i}`} className="sr-only">
                Personal goal {i + 1}
              </label>
              <input
                id={`pers-goal-${i}`}
                type="text"
                value={goal}
                onChange={(e) => updateGoal("personalGoals", i, e.target.value)}
                placeholder={`Goal ${i + 1}`}
                className="w-full px-4 py-3 border border-neutral-200 text-base min-h-[44px] focus-visible:border-black focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              />
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-base font-bold text-black mb-3">Pain Points</legend>
        <div className="space-y-3">
          {persona.painPoints.map((point, i) => (
            <div key={i} className="flex gap-2">
              <div className="flex-1">
                <label htmlFor={`pain-point-${i}`} className="sr-only">
                  Pain point {i + 1}
                </label>
                <input
                  id={`pain-point-${i}`}
                  type="text"
                  value={point}
                  onChange={(e) => updatePainPoint(i, e.target.value)}
                  placeholder={`Pain point ${i + 1}`}
                  className="w-full px-4 py-3 border border-neutral-200 text-base min-h-[44px] focus-visible:border-black focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                />
              </div>
              {persona.painPoints.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePainPoint(i)}
                  aria-label={`Remove pain point ${i + 1}`}
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center border border-neutral-200 text-neutral-500 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M4.5 4.5L13.5 13.5M4.5 13.5L13.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addPainPoint}
            className="inline-flex items-center gap-2 px-4 py-3 min-h-[44px] text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
          >
            + Add Pain Point
          </button>
        </div>
      </fieldset>

      <TextareaField
        id="frustrations"
        label="Frustrations"
        value={persona.frustrations}
        onChange={(v) => update("frustrations", v)}
        placeholder="What frustrates them about current solutions or their situation?"
      />

      <TextareaField
        id="success-metrics"
        label="Success Metrics"
        value={persona.successMetrics}
        onChange={(v) => update("successMetrics", v)}
        placeholder="How do they measure success? What KPIs matter to them?"
      />
    </div>
  );
}

function StepMedia({
  persona,
  update,
}: {
  persona: PersonaData;
  update: <K extends keyof PersonaData>(key: K, value: PersonaData[K]) => void;
}) {
  return (
    <div className="space-y-6">
      <CheckboxGroup
        legend="Preferred Content Formats"
        options={contentFormatOptions}
        selected={persona.contentFormats}
        onChange={(v) => update("contentFormats", v)}
      />
      <CheckboxGroup
        legend="Social Media Platforms Used"
        options={socialPlatformOptions}
        selected={persona.socialPlatforms}
        onChange={(v) => update("socialPlatforms", v)}
      />
      <CheckboxGroup
        legend="Preferred Communication Channels"
        options={communicationChannelOptions}
        selected={persona.communicationChannels}
        onChange={(v) => update("communicationChannels", v)}
      />
      <TextField
        id="best-time"
        label="Best Time to Reach Them"
        value={persona.bestTimeToReach}
        onChange={(v) => update("bestTimeToReach", v)}
        placeholder="e.g. Tuesday-Thursday, 10am-2pm"
      />
    </div>
  );
}

function StepBuying({
  persona,
  update,
}: {
  persona: PersonaData;
  update: <K extends keyof PersonaData>(key: K, value: PersonaData[K]) => void;
}) {
  return (
    <div className="space-y-6">
      <RadioGroup
        legend="Budget Authority"
        name="budget-authority"
        options={budgetAuthorityOptions}
        value={persona.budgetAuthority}
        onChange={(v) => update("budgetAuthority", v)}
      />
      <TextareaField
        id="research-process"
        label="Research Process"
        value={persona.researchProcess}
        onChange={(v) => update("researchProcess", v)}
        placeholder="How do they research before buying? What steps do they take?"
      />
      <TextareaField
        id="decision-criteria"
        label="Key Decision Criteria"
        value={persona.decisionCriteria}
        onChange={(v) => update("decisionCriteria", v)}
        placeholder="What factors matter most when they choose a vendor or solution?"
      />
      <TextareaField
        id="objections"
        label="Objections to Overcome"
        value={persona.objections}
        onChange={(v) => update("objections", v)}
        placeholder="What common objections or hesitations do they have?"
      />
      <TextareaField
        id="preferred-vendors"
        label="Preferred Vendors / Brands"
        value={persona.preferredVendors}
        onChange={(v) => update("preferredVendors", v)}
        placeholder="What types of vendors do they gravitate toward? Any specific brands?"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Persona Card Preview                                               */
/* ------------------------------------------------------------------ */

function PersonaCard({ persona }: { persona: PersonaData }) {
  const profGoals = persona.professionalGoals.filter(Boolean);
  const persGoals = persona.personalGoals.filter(Boolean);
  const painPts = persona.painPoints.filter(Boolean);

  return (
    <div className="border border-neutral-200">
      {/* Header */}
      <div className="bg-black text-white p-6">
        <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,3vw,1.75rem)] font-extrabold">
          {persona.name || "Untitled Persona"}
        </h3>
        {persona.jobTitle && (
          <p className="text-base text-neutral-400 mt-1">
            {persona.jobTitle}
            {persona.industry ? ` — ${persona.industry}` : ""}
          </p>
        )}
      </div>

      <div className="p-6 space-y-8">
        {/* Demographics */}
        {(persona.ageRange || persona.gender || persona.companySize || persona.incomeRange || persona.location || persona.education) && (
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Demographics</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {persona.ageRange && <CardField label="Age Range" value={persona.ageRange} />}
              {persona.gender && <CardField label="Gender" value={persona.gender} />}
              {persona.companySize && <CardField label="Company Size" value={persona.companySize} />}
              {persona.incomeRange && <CardField label="Income Range" value={persona.incomeRange} />}
              {persona.location && <CardField label="Location" value={persona.location} />}
              {persona.education && <CardField label="Education" value={persona.education} />}
            </div>
          </div>
        )}

        {/* Psychographics */}
        {(persona.values.length > 0 || persona.personalityTraits || persona.communicationStyle || persona.decisionApproach) && (
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Psychographics</h4>
            <div className="space-y-4">
              {persona.values.length > 0 && (
                <div>
                  <p className="text-base font-bold text-black">Values</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {persona.values.map((v) => (
                      <span key={v} className="px-3 py-1 border border-neutral-200 text-base text-neutral-600">{v}</span>
                    ))}
                  </div>
                </div>
              )}
              {persona.personalityTraits && <CardField label="Personality Traits" value={persona.personalityTraits} />}
              {persona.communicationStyle && <CardField label="Communication Style" value={persona.communicationStyle} />}
              {persona.decisionApproach && <CardField label="Decision-Making" value={persona.decisionApproach} />}
            </div>
          </div>
        )}

        {/* Goals & Challenges */}
        {(profGoals.length > 0 || persGoals.length > 0 || painPts.length > 0 || persona.frustrations || persona.successMetrics) && (
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Goals & Challenges</h4>
            <div className="space-y-4">
              {profGoals.length > 0 && (
                <div>
                  <p className="text-base font-bold text-black">Professional Goals</p>
                  <ol className="list-decimal list-inside text-base text-neutral-500 mt-1 space-y-1">
                    {profGoals.map((g, i) => <li key={i}>{g}</li>)}
                  </ol>
                </div>
              )}
              {persGoals.length > 0 && (
                <div>
                  <p className="text-base font-bold text-black">Personal Goals</p>
                  <ol className="list-decimal list-inside text-base text-neutral-500 mt-1 space-y-1">
                    {persGoals.map((g, i) => <li key={i}>{g}</li>)}
                  </ol>
                </div>
              )}
              {painPts.length > 0 && (
                <div>
                  <p className="text-base font-bold text-black">Pain Points</p>
                  <ul className="list-disc list-inside text-base text-neutral-500 mt-1 space-y-1">
                    {painPts.map((pt, i) => <li key={i}>{pt}</li>)}
                  </ul>
                </div>
              )}
              {persona.frustrations && <CardField label="Frustrations" value={persona.frustrations} />}
              {persona.successMetrics && <CardField label="Success Metrics" value={persona.successMetrics} />}
            </div>
          </div>
        )}

        {/* Media & Content */}
        {(persona.contentFormats.length > 0 || persona.socialPlatforms.length > 0 || persona.communicationChannels.length > 0 || persona.bestTimeToReach) && (
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Media & Content</h4>
            <div className="space-y-4">
              {persona.contentFormats.length > 0 && <TagList label="Content Formats" items={persona.contentFormats} />}
              {persona.socialPlatforms.length > 0 && <TagList label="Social Platforms" items={persona.socialPlatforms} />}
              {persona.communicationChannels.length > 0 && <TagList label="Communication Channels" items={persona.communicationChannels} />}
              {persona.bestTimeToReach && <CardField label="Best Time to Reach" value={persona.bestTimeToReach} />}
            </div>
          </div>
        )}

        {/* Buying Behavior */}
        {(persona.budgetAuthority || persona.researchProcess || persona.decisionCriteria || persona.objections || persona.preferredVendors) && (
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Buying Behavior</h4>
            <div className="space-y-4">
              {persona.budgetAuthority && <CardField label="Budget Authority" value={persona.budgetAuthority} />}
              {persona.researchProcess && <CardField label="Research Process" value={persona.researchProcess} />}
              {persona.decisionCriteria && <CardField label="Decision Criteria" value={persona.decisionCriteria} />}
              {persona.objections && <CardField label="Objections" value={persona.objections} />}
              {persona.preferredVendors && <CardField label="Preferred Vendors" value={persona.preferredVendors} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CardField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-base font-bold text-black">{label}</p>
      <p className="text-base text-neutral-500 whitespace-pre-line">{value}</p>
    </div>
  );
}

function TagList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="text-base font-bold text-black">{label}</p>
      <div className="flex flex-wrap gap-2 mt-1">
        {items.map((v) => (
          <span key={v} className="px-3 py-1 border border-neutral-200 text-base text-neutral-600">{v}</span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Comparison View                                                    */
/* ------------------------------------------------------------------ */

function ComparisonView({
  personas,
  selected,
  onToggle,
}: {
  personas: PersonaData[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  const compared = personas.filter((p) => selected.includes(p.id));

  return (
    <div className="space-y-6">
      {/* Selection */}
      <fieldset>
        <legend className="text-base font-bold text-black mb-3">Select personas to compare</legend>
        <div className="flex flex-wrap gap-2">
          {personas.map((p) => {
            const isSelected = selected.includes(p.id);
            return (
              <label
                key={p.id}
                className={`inline-flex items-center gap-2 px-4 py-3 min-h-[44px] text-base cursor-pointer border transition-colors motion-reduce:transition-none select-none focus-within:outline-2 focus-within:outline-black focus-within:outline-offset-2 ${
                  isSelected
                    ? "bg-black text-white border-black"
                    : "border-neutral-200 text-neutral-600 hover:border-black"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggle(p.id)}
                  className="sr-only"
                />
                {p.name || "Untitled"}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Comparison grid */}
      {compared.length >= 2 && (
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full border-collapse text-base min-w-[600px]">
            <thead>
              <tr>
                <th className="text-left p-4 border border-neutral-200 bg-neutral-50 font-bold text-black w-[180px]">Attribute</th>
                {compared.map((p) => (
                  <th key={p.id} className="text-left p-4 border border-neutral-200 bg-black text-white font-bold">
                    {p.name || "Untitled"}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <CompareRow label="Age Range" personas={compared} field="ageRange" />
              <CompareRow label="Job Title" personas={compared} field="jobTitle" />
              <CompareRow label="Industry" personas={compared} field="industry" />
              <CompareRow label="Company Size" personas={compared} field="companySize" />
              <CompareRow label="Values" personas={compared} field="values" />
              <CompareRow label="Communication Style" personas={compared} field="communicationStyle" />
              <CompareRow label="Decision Approach" personas={compared} field="decisionApproach" />
              <CompareRow label="Pain Points" personas={compared} field="painPoints" />
              <CompareRow label="Content Formats" personas={compared} field="contentFormats" />
              <CompareRow label="Social Platforms" personas={compared} field="socialPlatforms" />
              <CompareRow label="Budget Authority" personas={compared} field="budgetAuthority" />
              <CompareRow label="Decision Criteria" personas={compared} field="decisionCriteria" />
            </tbody>
          </table>
        </div>
      )}

      {compared.length < 2 && (
        <p className="text-base text-neutral-400">Select at least two personas to see a side-by-side comparison.</p>
      )}
    </div>
  );
}

function CompareRow({
  label,
  personas,
  field,
}: {
  label: string;
  personas: PersonaData[];
  field: keyof PersonaData;
}) {
  function renderValue(val: PersonaData[keyof PersonaData]) {
    if (Array.isArray(val)) {
      const filtered = val.filter(Boolean);
      return filtered.length > 0 ? filtered.join(", ") : "—";
    }
    return (val as string) || "—";
  }

  return (
    <tr>
      <td className="p-4 border border-neutral-200 font-bold text-black bg-neutral-50">{label}</td>
      {personas.map((p) => (
        <td key={p.id} className="p-4 border border-neutral-200 text-neutral-600">
          {renderValue(p[field])}
        </td>
      ))}
    </tr>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

type View = "builder" | "preview" | "compare";

export default function PersonaWorkshopPage() {
  const [personas, setPersonas] = useState<PersonaData[]>(() => [createEmptyPersona()]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [step, setStep] = useState<Step>(1);
  const [view, setView] = useState<View>("builder");
  const [compareSelected, setCompareSelected] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  /* Load from localStorage */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as PersonaData[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPersonas(parsed);
        }
      }
    } catch {
      /* ignore parse errors */
    }
    setLoaded(true);
  }, []);

  /* Save to localStorage */
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(personas));
    } catch {
      /* ignore storage errors */
    }
  }, [personas, loaded]);

  const persona = personas[activeIdx];

  function updatePersona<K extends keyof PersonaData>(key: K, value: PersonaData[K]) {
    setPersonas((prev) => {
      const next = [...prev];
      next[activeIdx] = { ...next[activeIdx], [key]: value };
      return next;
    });
  }

  function addPersona() {
    if (personas.length >= MAX_PERSONAS) return;
    const newP = createEmptyPersona();
    setPersonas((prev) => [...prev, newP]);
    setActiveIdx(personas.length);
    setStep(1);
    setView("builder");
  }

  function removePersona(idx: number) {
    if (personas.length <= 1) return;
    setPersonas((prev) => prev.filter((_, i) => i !== idx));
    if (activeIdx >= personas.length - 1) {
      setActiveIdx(Math.max(0, personas.length - 2));
    } else if (idx < activeIdx) {
      setActiveIdx((prev) => prev - 1);
    }
  }

  function applyTemplate(template: IndustryTemplate) {
    setPersonas((prev) => {
      const next = [...prev];
      next[activeIdx] = { ...createEmptyPersona(), ...template.data, id: next[activeIdx].id };
      return next;
    });
    setStep(1);
    setView("builder");
  }

  function toggleCompare(id: string) {
    setCompareSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  }

  const downloadAll = useCallback(() => {
    const text = formatAllPersonasText(personas);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "marketing-personas.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [personas]);

  const downloadSingle = useCallback(() => {
    const text = formatPersonaText(persona);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(persona.name || "persona").toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [persona]);

  return (
    <article className="min-h-screen">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Marketing Persona Workshop",
          description:
            "Build detailed marketing personas with guided exercises. Define demographics, psychographics, goals, pain points, and content preferences.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "Marketing Persona Workshop" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              Marketing Persona Workshop
            </h1>
            <SectionDesc>
              Build detailed marketing personas through guided exercises. Define demographics, psychographics, goals, pain points, and content preferences. Create up to five personas, compare them side by side, and export your work.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Industry Templates ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <fieldset>
              <legend className="text-base font-bold text-black mb-3">Quick Start: Load an Industry Template</legend>
              <div className="flex flex-wrap gap-2">
                {industryTemplates.map((t) => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => applyTemplate(t)}
                    className="px-4 py-3 min-h-[44px] text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </Animate>
        </div>
      </section>

      {/* ---- Persona Tabs ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-4">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Personas">
              {personas.map((p, i) => (
                <div key={p.id} className="flex items-center">
                  <button
                    role="tab"
                    aria-selected={i === activeIdx}
                    aria-controls="persona-panel"
                    onClick={() => {
                      setActiveIdx(i);
                      setView("builder");
                    }}
                    className={`px-4 py-3 min-h-[44px] text-base font-bold border transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                      i === activeIdx
                        ? "bg-black text-white border-black"
                        : "border-neutral-200 text-neutral-600 hover:border-black hover:text-black"
                    }`}
                  >
                    {p.name || `Persona ${i + 1}`}
                  </button>
                  {personas.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePersona(i)}
                      aria-label={`Remove ${p.name || `Persona ${i + 1}`}`}
                      className="ml-1 min-w-[36px] min-h-[36px] inline-flex items-center justify-center text-neutral-400 hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M4 4L12 12M4 12L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              {personas.length < MAX_PERSONAS && (
                <button
                  type="button"
                  onClick={addPersona}
                  className="px-4 py-3 min-h-[44px] text-base font-bold border border-dashed border-neutral-300 text-neutral-500 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  + Add Persona
                </button>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- View Switcher ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="View mode">
            {(["builder", "preview", "compare"] as const).map((v) => (
              <button
                key={v}
                role="tab"
                aria-selected={view === v}
                onClick={() => setView(v)}
                className={`px-4 py-3 min-h-[44px] text-base font-bold border transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                  view === v
                    ? "bg-black text-white border-black"
                    : "border-neutral-200 text-neutral-600 hover:border-black hover:text-black"
                }`}
              >
                {v === "builder" ? "Builder" : v === "preview" ? "Preview Card" : "Compare"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Builder View ---- */}
      {view === "builder" && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-12" id="persona-panel" role="tabpanel">
          <div className="max-w-4xl mx-auto">
            {/* Step navigation */}
            <Animate animation="fade-up">
              <nav aria-label="Builder steps" className="mb-8">
                <ol className="flex flex-wrap gap-2">
                  {([1, 2, 3, 4, 5] as Step[]).map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => setStep(s)}
                        aria-current={step === s ? "step" : undefined}
                        className={`px-4 py-3 min-h-[44px] text-base font-bold border transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 ${
                          step === s
                            ? "bg-black text-white border-black"
                            : "border-neutral-200 text-neutral-600 hover:border-black hover:text-black"
                        }`}
                      >
                        <span className="inline-block mr-2" aria-hidden="true">{s}.</span>
                        {stepLabels[s]}
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
            </Animate>

            {/* Step heading */}
            <Animate animation="fade-up">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-black mb-6">
                Step {step}: {stepLabels[step]}
              </h2>
            </Animate>

            {/* Step form content */}
            <Animate animation="fade-in" key={`${persona.id}-${step}`}>
              {step === 1 && <StepDemographics persona={persona} update={updatePersona} />}
              {step === 2 && <StepPsychographics persona={persona} update={updatePersona} />}
              {step === 3 && <StepGoals persona={persona} update={updatePersona} />}
              {step === 4 && <StepMedia persona={persona} update={updatePersona} />}
              {step === 5 && <StepBuying persona={persona} update={updatePersona} />}
            </Animate>

            {/* Step navigation buttons */}
            <Animate animation="fade-up">
              <div className="flex flex-wrap gap-3 mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep((step - 1) as Step)}
                    className="px-6 py-4 min-h-[44px] text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    &larr; Previous
                  </button>
                )}
                {step < 5 && (
                  <button
                    type="button"
                    onClick={() => setStep((step + 1) as Step)}
                    className="bg-black text-white px-6 py-4 min-h-[44px] text-base font-bold hover:bg-neutral-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    Next: {stepLabels[(step + 1) as Step]} &rarr;
                  </button>
                )}
                {step === 5 && (
                  <button
                    type="button"
                    onClick={() => setView("preview")}
                    className="bg-black text-white px-6 py-4 min-h-[44px] text-base font-bold hover:bg-neutral-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    View Persona Card &rarr;
                  </button>
                )}
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Preview View ---- */}
      {view === "preview" && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-12" id="persona-panel" role="tabpanel">
          <div className="max-w-4xl mx-auto space-y-6">
            <Animate animation="fade-up">
              <PersonaCard persona={persona} />
            </Animate>

            <Animate animation="fade-up">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={downloadSingle}
                  className="bg-black text-white px-6 py-4 min-h-[44px] text-base font-bold hover:bg-neutral-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Download .txt
                </button>
                {personas.length > 1 && (
                  <button
                    type="button"
                    onClick={downloadAll}
                    className="px-6 py-4 min-h-[44px] text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  >
                    Download All Personas (.txt)
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setView("builder")}
                  className="px-6 py-4 min-h-[44px] text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  &larr; Back to Builder
                </button>
              </div>
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Compare View ---- */}
      {view === "compare" && (
        <section aria-label="Content section" className="px-6 lg:px-12 pb-12" id="persona-panel" role="tabpanel">
          <div className="max-w-6xl mx-auto">
            <Animate animation="fade-up">
              <ComparisonView
                personas={personas}
                selected={compareSelected}
                onToggle={toggleCompare}
              />
            </Animate>
          </div>
        </section>
      )}

      {/* ---- Educational Section ---- */}
      <section aria-label="Persona Creation Methodology" className="px-6 lg:px-12 py-16 border-t border-neutral-200">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-4">
              Persona Creation Methodology
            </h2>
            <SectionDesc>
              A well-built persona transforms guesswork into strategy. Here is the framework behind this workshop.
            </SectionDesc>
          </Animate>

          <Stagger stagger={80} className="mt-10 space-y-8 text-base text-neutral-500 leading-relaxed">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-2">
                1. Start with Real Data
              </h3>
              <p>
                Personas built on assumptions fail. Pull from CRM data, website analytics, support tickets, and sales call notes. Interview five to ten actual customers if possible. The demographics section in this tool gives you a structured place to record what you find.
              </p>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-2">
                2. Go Beyond Demographics
              </h3>
              <p>
                Age and job title tell you who someone is. Psychographics tell you why they buy. Values, communication style, and decision-making approach shape every touchpoint from ad copy to sales conversations. This is where personas become actionable.
              </p>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-2">
                3. Articulate Goals and Pain Points
              </h3>
              <p>
                Every purchase solves a problem or moves someone toward a goal. Mapping both professional and personal motivations reveals the emotional drivers behind rational-sounding decisions. Pain points determine your messaging; goals determine your positioning.
              </p>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-2">
                4. Map the Content and Channel Mix
              </h3>
              <p>
                Knowing your persona prefers case studies over blog posts, or LinkedIn over Instagram, prevents wasted effort. Match your content formats and distribution channels to where your persona actually spends time and what formats they trust.
              </p>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-2">
                5. Understand the Buying Process
              </h3>
              <p>
                Budget authority, research habits, and common objections directly shape your sales funnel. A persona with shared budget authority needs content that helps them sell internally. One with full authority needs content that builds confidence in the decision.
              </p>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-2">
                6. Compare and Prioritize
              </h3>
              <p>
                Most businesses serve multiple persona types. Use the comparison view to spot overlapping pain points (shared campaigns) and divergent preferences (segment-specific messaging). Prioritize the persona that represents the highest revenue or growth potential.
              </p>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-black mb-2">
                7. Review and Update Quarterly
              </h3>
              <p>
                Markets shift, products evolve, and customers change. Revisit your personas every quarter. This tool saves your work automatically so you can return, adjust, and keep your personas aligned with reality.
              </p>
            </div>
          </Stagger>
        </div>
      </section>

      {/* ---- Bottom CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Turn Personas Into Revenue
            </h2>
            <p className="text-lg text-neutral-400 mt-4 mb-8">
              Knowing your audience is the first step. Let our team build a marketing strategy that reaches the right people with the right message at the right time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Get in Touch &rarr;
              </Link>
              <Link
                href="/services/digital-marketing"
                className="inline-flex items-center justify-center gap-3 border border-white text-white px-10 py-5 min-h-[44px] font-bold text-base hover:bg-white hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Our Marketing Services &rarr;
              </Link>
            </div>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Persona Workshop"
        services={[
          { title: "Digital Marketing", desc: "Full-service digital marketing strategy for measurable business growth.", href: "/services/digital-marketing" },
          { title: "SEO", desc: "Organic search strategies that deliver compounding traffic over time.", href: "/services/seo" },
          { title: "Performance Marketing", desc: "Paid campaigns optimized for maximum return on ad spend.", href: "/services/performance-marketing" },
        ]}
        relatedTools={[
          { title: "Og Preview", href: "/resources/og-preview" },
          { title: "Okr Planner", href: "/resources/okr-planner" },
          { title: "Persona Builder", href: "/resources/persona-builder" },
          { title: "Pricing Calculator", href: "/resources/pricing-calculator" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
