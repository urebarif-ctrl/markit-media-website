"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { Animate, Stagger } from "@/components/animate";
import { SectionLabel, SectionDesc } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { JsonLd } from "@/components/json-ld";
import { ToolCTA } from "@/components/tool-cta";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface AnalysisInput {
  targetKeyword: string;
  secondaryKeywords: string;
  pageTitle: string;
  metaDescription: string;
  contentBody: string;
}

interface CheckResult {
  label: string;
  passed: boolean;
  detail: string;
}

interface CategoryResult {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  checks: CheckResult[];
  suggestions: string[];
}

interface AnalysisResult {
  categories: CategoryResult[];
  overallScore: number;
  grade: string;
}

/* ------------------------------------------------------------------ */
/*  Analysis engine                                                    */
/* ------------------------------------------------------------------ */

function countWords(text: string): number {
  return text
    .replace(/<[^>]*>/g, " ")
    .replace(/[#*_\[\]()!`~>|]/g, " ")
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

function countSentences(text: string): number {
  const cleaned = text.replace(/<[^>]*>/g, " ").replace(/[#*_`~>|]/g, " ");
  const sentences = cleaned.split(/[.!?]+/).filter((s) => s.trim().length > 3);
  return Math.max(sentences.length, 1);
}

function countParagraphs(text: string): number {
  return text
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0).length || 1;
}

function extractHeadings(text: string): { level: number; text: string }[] {
  const headings: { level: number; text: string }[] = [];
  // Markdown headings
  const mdRegex = /^(#{1,6})\s+(.+)$/gm;
  let match;
  while ((match = mdRegex.exec(text)) !== null) {
    headings.push({ level: match[1].length, text: match[2] });
  }
  // HTML headings
  const htmlRegex = /<h([1-6])[^>]*>(.*?)<\/h\1>/gi;
  while ((match = htmlRegex.exec(text)) !== null) {
    headings.push({ level: parseInt(match[1]), text: match[2].replace(/<[^>]*>/g, "") });
  }
  return headings;
}

function containsKeyword(text: string, keyword: string): boolean {
  if (!keyword.trim()) return false;
  return text.toLowerCase().includes(keyword.toLowerCase());
}

function getKeywordDensity(text: string, keyword: string): number {
  if (!keyword.trim() || !text.trim()) return 0;
  const words = countWords(text);
  if (words === 0) return 0;
  const kwLower = keyword.toLowerCase();
  const textLower = text.toLowerCase();
  let count = 0;
  let pos = 0;
  while ((pos = textLower.indexOf(kwLower, pos)) !== -1) {
    count++;
    pos += kwLower.length;
  }
  const kwWords = kwLower.split(/\s+/).length;
  return (count * kwWords) / words * 100;
}

function getFirst100Words(text: string): string {
  const cleaned = text.replace(/<[^>]*>/g, " ").replace(/[#*_\[\]()!`~>|]/g, " ");
  return cleaned.trim().split(/\s+/).slice(0, 100).join(" ");
}

function countLinks(text: string): { internal: number; external: number } {
  let internal = 0;
  let external = 0;
  // Markdown links
  const mdLinks = text.match(/\[([^\]]*)\]\(([^)]+)\)/g) || [];
  for (const link of mdLinks) {
    const urlMatch = link.match(/\]\(([^)]+)\)/);
    if (urlMatch) {
      const url = urlMatch[1];
      if (url.startsWith("http://") || url.startsWith("https://")) {
        external++;
      } else {
        internal++;
      }
    }
  }
  // HTML links
  const htmlLinks = text.match(/<a\s[^>]*href=["']([^"']+)["'][^>]*>/gi) || [];
  for (const link of htmlLinks) {
    const hrefMatch = link.match(/href=["']([^"']+)["']/i);
    if (hrefMatch) {
      const url = hrefMatch[1];
      if (url.startsWith("http://") || url.startsWith("https://")) {
        external++;
      } else {
        internal++;
      }
    }
  }
  return { internal, external };
}

function countImages(text: string): number {
  const mdImages = (text.match(/!\[([^\]]*)\]\(([^)]+)\)/g) || []).length;
  const htmlImages = (text.match(/<img\s/gi) || []).length;
  return mdImages + htmlImages;
}

function countLists(text: string): { bulleted: number; numbered: number } {
  const bulletLines = (text.match(/^[\s]*[-*+]\s+/gm) || []).length;
  const numberedLines = (text.match(/^[\s]*\d+[.)]\s+/gm) || []).length;
  const htmlUl = (text.match(/<ul/gi) || []).length;
  const htmlOl = (text.match(/<ol/gi) || []).length;
  return { bulleted: bulletLines + htmlUl, numbered: numberedLines + htmlOl };
}

function countBoldItalic(text: string): { bold: number; italic: number } {
  const mdBold = (text.match(/\*\*[^*]+\*\*/g) || []).length + (text.match(/__[^_]+__/g) || []).length;
  const mdItalic = (text.match(/(?<!\*)\*(?!\*)[^*]+\*(?!\*)/g) || []).length + (text.match(/(?<!_)_(?!_)[^_]+_(?!_)/g) || []).length;
  const htmlBold = (text.match(/<(strong|b)\b/gi) || []).length;
  const htmlItalic = (text.match(/<(em|i)\b/gi) || []).length;
  return { bold: mdBold + htmlBold, italic: mdItalic + htmlItalic };
}

function countTables(text: string): number {
  const mdTables = (text.match(/\|.*\|.*\n\|[\s:|-]+\|/g) || []).length;
  const htmlTables = (text.match(/<table/gi) || []).length;
  return mdTables + htmlTables;
}

function runAnalysis(input: AnalysisInput): AnalysisResult {
  const { targetKeyword, secondaryKeywords, pageTitle, metaDescription, contentBody } = input;
  const kw = targetKeyword.trim();
  const words = countWords(contentBody);
  const sentences = countSentences(contentBody);
  const paragraphs = countParagraphs(contentBody);
  const headings = extractHeadings(contentBody);
  const first100 = getFirst100Words(contentBody);
  const density = getKeywordDensity(contentBody, kw);
  const links = countLinks(contentBody);
  const images = countImages(contentBody);
  const lists = countLists(contentBody);
  const boldItalic = countBoldItalic(contentBody);
  const tables = countTables(contentBody);
  const secKws = secondaryKeywords
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const categories: CategoryResult[] = [];

  /* 1. Keyword Usage */
  {
    const checks: CheckResult[] = [];
    const suggestions: string[] = [];
    const kwInTitle = containsKeyword(pageTitle, kw);
    checks.push({ label: "Keyword in page title", passed: kwInTitle, detail: kwInTitle ? "Target keyword found in page title." : "Target keyword not found in page title." });
    if (!kwInTitle) suggestions.push("Add your target keyword to the page title, ideally near the beginning.");

    const kwInFirst100 = containsKeyword(first100, kw);
    checks.push({ label: "Keyword in first 100 words", passed: kwInFirst100, detail: kwInFirst100 ? "Target keyword appears in the first 100 words." : "Target keyword not found in the first 100 words." });
    if (!kwInFirst100) suggestions.push("Introduce your target keyword within the first 100 words of your content.");

    const densityOk = density >= 0.5 && density <= 2.5;
    checks.push({ label: "Keyword density (0.5-2.5%)", passed: densityOk, detail: `Current density: ${density.toFixed(2)}%. Ideal range is 0.5-2.5%.` });
    if (density < 0.5) suggestions.push("Your keyword density is too low. Use the target keyword more naturally throughout the content.");
    if (density > 2.5) suggestions.push("Your keyword density is too high. Reduce keyword repetition to avoid appearing spammy to search engines.");

    const kwInHeadings = headings.some((h) => containsKeyword(h.text, kw));
    checks.push({ label: "Keyword in headings", passed: kwInHeadings, detail: kwInHeadings ? "Target keyword found in at least one heading." : "Target keyword not found in any headings." });
    if (!kwInHeadings) suggestions.push("Include your target keyword in at least one H2 or H3 heading.");

    const exactMatch = contentBody.toLowerCase().includes(kw.toLowerCase());
    checks.push({ label: "Exact match keyword present", passed: exactMatch, detail: exactMatch ? "Exact match of target keyword found in content." : "No exact match of target keyword found in content." });
    if (!exactMatch) suggestions.push("Include the exact target keyword phrase at least once in your content.");

    const passed = checks.filter((c) => c.passed).length;
    categories.push({ id: "keyword-usage", title: "Keyword Usage", score: Math.round((passed / checks.length) * 100), maxScore: 100, checks, suggestions });
  }

  /* 2. Content Length */
  {
    const checks: CheckResult[] = [];
    const suggestions: string[] = [];
    const readingTime = Math.max(1, Math.ceil(words / 250));

    let benchmark = "thin";
    if (words >= 2500) benchmark = "pillar";
    else if (words >= 1500) benchmark = "comprehensive";
    else if (words >= 1000) benchmark = "good";
    else if (words >= 600) benchmark = "short";

    checks.push({ label: "Word count", passed: words >= 300, detail: `${words} words. Content below 300 words is considered thin by search engines.` });
    if (words < 300) suggestions.push("Your content is very thin. Aim for at least 600 words for basic coverage, or 1,500+ for comprehensive content.");

    checks.push({ label: "Minimum viable length (600+)", passed: words >= 600, detail: words >= 600 ? "Content meets minimum viable length for SEO." : "Content is below 600 words, which search engines consider short." });
    if (words < 600 && words >= 300) suggestions.push("Expand your content to at least 600 words for better search engine coverage.");

    checks.push({ label: "Good length (1,000+)", passed: words >= 1000, detail: words >= 1000 ? "Content is at a good length for search rankings." : "Consider expanding to 1,000+ words for stronger rankings." });
    if (words >= 600 && words < 1000) suggestions.push("For competitive keywords, aim for 1,000+ words with in-depth coverage of the topic.");

    checks.push({ label: "Comprehensive length (1,500+)", passed: words >= 1500, detail: words >= 1500 ? "Content is comprehensive enough for most topics." : "Content could be more comprehensive at 1,500+ words." });

    checks.push({ label: "Reading time appropriate", passed: readingTime >= 3, detail: `Estimated reading time: ${readingTime} minute${readingTime === 1 ? "" : "s"}. SEO benchmark: ${benchmark}.` });

    const passed = checks.filter((c) => c.passed).length;
    categories.push({ id: "content-length", title: "Content Length", score: Math.round((passed / checks.length) * 100), maxScore: 100, checks, suggestions });
  }

  /* 3. Readability */
  {
    const checks: CheckResult[] = [];
    const suggestions: string[] = [];
    const avgSentenceLen = words / sentences;
    const avgParaLen = sentences / paragraphs;

    // Flesch-like score using sentence/word ratio (simplified)
    // Lower avg sentence length = better readability
    // Score: 100 - (avgSentenceLen - 10) * 3, clamped 0-100
    const fleschLike = Math.max(0, Math.min(100, Math.round(100 - (avgSentenceLen - 10) * 3)));

    checks.push({ label: "Sentence count", passed: sentences >= 5, detail: `${sentences} sentence${sentences === 1 ? "" : "s"} detected.` });
    if (sentences < 5) suggestions.push("Your content has very few sentences. Expand the content for better engagement and SEO.");

    const sentLenOk = avgSentenceLen >= 10 && avgSentenceLen <= 25;
    checks.push({ label: "Average sentence length (10-25 words)", passed: sentLenOk, detail: `Average: ${avgSentenceLen.toFixed(1)} words per sentence.` });
    if (avgSentenceLen > 25) suggestions.push("Your sentences are too long on average. Break them into shorter sentences for better readability.");
    if (avgSentenceLen < 10 && sentences >= 3) suggestions.push("Your sentences are very short. Consider varying sentence length for a more natural reading experience.");

    checks.push({ label: "Paragraph count (3+)", passed: paragraphs >= 3, detail: `${paragraphs} paragraph${paragraphs === 1 ? "" : "s"} detected.` });
    if (paragraphs < 3) suggestions.push("Break your content into more paragraphs. Short paragraphs are easier to scan and read online.");

    const paraLenOk = avgParaLen <= 5;
    checks.push({ label: "Average paragraph length (under 5 sentences)", passed: paraLenOk, detail: `Average: ${avgParaLen.toFixed(1)} sentences per paragraph.` });
    if (!paraLenOk) suggestions.push("Your paragraphs are too long. Aim for 2-4 sentences per paragraph for web readability.");

    const readabilityOk = fleschLike >= 50;
    checks.push({ label: "Readability score (50+ target)", passed: readabilityOk, detail: `Readability score: ${fleschLike}/100. ${fleschLike >= 70 ? "Easy to read." : fleschLike >= 50 ? "Fairly readable." : "Difficult to read."}` });
    if (!readabilityOk) suggestions.push("Your content is difficult to read. Use shorter sentences, simpler words, and break up long paragraphs.");

    const passed = checks.filter((c) => c.passed).length;
    categories.push({ id: "readability", title: "Readability", score: Math.round((passed / checks.length) * 100), maxScore: 100, checks, suggestions });
  }

  /* 4. Heading Structure */
  {
    const checks: CheckResult[] = [];
    const suggestions: string[] = [];
    const h1s = headings.filter((h) => h.level === 1);
    const h2s = headings.filter((h) => h.level === 2);
    const h3s = headings.filter((h) => h.level === 3);

    const hasOneH1 = h1s.length === 1;
    checks.push({ label: "Single H1 tag", passed: hasOneH1, detail: `Found ${h1s.length} H1 heading${h1s.length === 1 ? "" : "s"}. Every page should have exactly one H1.` });
    if (h1s.length === 0) suggestions.push("Add an H1 heading to your content. This is the main topic heading for search engines.");
    if (h1s.length > 1) suggestions.push("Remove extra H1 headings. Each page should have only one H1 tag.");

    const hasH2s = h2s.length >= 2;
    checks.push({ label: "H2 subheadings (2+)", passed: hasH2s, detail: `Found ${h2s.length} H2 heading${h2s.length === 1 ? "" : "s"}.` });
    if (!hasH2s) suggestions.push("Add at least two H2 subheadings to organize your content into clear sections.");

    const hasH3s = h3s.length > 0;
    checks.push({ label: "H3 sub-subheadings present", passed: hasH3s, detail: `Found ${h3s.length} H3 heading${h3s.length === 1 ? "" : "s"}.` });
    if (!hasH3s && h2s.length >= 2) suggestions.push("Consider adding H3 subheadings under your H2 sections for deeper content organization.");

    const kwInH = headings.some((h) => containsKeyword(h.text, kw));
    checks.push({ label: "Keyword in headings", passed: kwInH, detail: kwInH ? "Target keyword found in at least one heading." : "Target keyword not found in any heading." });
    if (!kwInH) suggestions.push("Include your target keyword in at least one heading, preferably the H1 or an H2.");

    // Proper hierarchy: no skipping levels (e.g., H1 -> H3 without H2)
    let hierarchyOk = true;
    let maxSeen = 0;
    for (const h of headings) {
      if (h.level > maxSeen + 1 && maxSeen > 0) {
        hierarchyOk = false;
        break;
      }
      if (h.level > maxSeen) maxSeen = h.level;
    }
    checks.push({ label: "Proper heading hierarchy", passed: hierarchyOk, detail: hierarchyOk ? "Heading levels follow a logical hierarchy." : "Heading levels skip levels (e.g., H1 to H3 without H2)." });
    if (!hierarchyOk) suggestions.push("Fix heading hierarchy. Do not skip levels, for example do not jump from H1 to H3 without an H2 in between.");

    const passed = checks.filter((c) => c.passed).length;
    categories.push({ id: "heading-structure", title: "Heading Structure", score: Math.round((passed / checks.length) * 100), maxScore: 100, checks, suggestions });
  }

  /* 5. Meta Tags */
  {
    const checks: CheckResult[] = [];
    const suggestions: string[] = [];
    const titleLen = pageTitle.length;
    const descLen = metaDescription.length;

    const titleLenOk = titleLen >= 50 && titleLen <= 60;
    checks.push({ label: "Title length (50-60 characters)", passed: titleLenOk, detail: `Title is ${titleLen} characters. Ideal range: 50-60.` });
    if (titleLen < 50) suggestions.push(`Your title is ${titleLen} characters. Expand it to 50-60 characters for optimal display in search results.`);
    if (titleLen > 60) suggestions.push(`Your title is ${titleLen} characters. Shorten it to 50-60 characters to avoid truncation in search results.`);

    const descLenOk = descLen >= 150 && descLen <= 160;
    checks.push({ label: "Description length (150-160 characters)", passed: descLenOk, detail: `Description is ${descLen} characters. Ideal range: 150-160.` });
    if (descLen < 150) suggestions.push(`Your meta description is ${descLen} characters. Expand it to 150-160 characters for maximum visibility.`);
    if (descLen > 160) suggestions.push(`Your meta description is ${descLen} characters. Shorten it to 150-160 characters to avoid truncation.`);

    const kwInTitleMeta = containsKeyword(pageTitle, kw);
    checks.push({ label: "Keyword in title", passed: kwInTitleMeta, detail: kwInTitleMeta ? "Target keyword found in page title." : "Target keyword missing from page title." });
    if (!kwInTitleMeta) suggestions.push("Add your target keyword to the page title for stronger relevance signals.");

    const kwInDesc = containsKeyword(metaDescription, kw);
    checks.push({ label: "Keyword in meta description", passed: kwInDesc, detail: kwInDesc ? "Target keyword found in meta description." : "Target keyword missing from meta description." });
    if (!kwInDesc) suggestions.push("Include your target keyword in the meta description to improve click-through rates from search results.");

    const passed = checks.filter((c) => c.passed).length;
    categories.push({ id: "meta-tags", title: "Meta Tags", score: Math.round((passed / checks.length) * 100), maxScore: 100, checks, suggestions });
  }

  /* 6. Internal Linking */
  {
    const checks: CheckResult[] = [];
    const suggestions: string[] = [];
    const totalLinks = links.internal + links.external;
    const recommendedLinks = Math.max(2, Math.ceil(words / 1000) * 2);

    checks.push({ label: "Links detected", passed: totalLinks > 0, detail: `Found ${totalLinks} total link${totalLinks === 1 ? "" : "s"} (${links.internal} internal, ${links.external} external).` });
    if (totalLinks === 0) suggestions.push("Add both internal and external links to your content. Links help search engines understand your site structure and content relationships.");

    checks.push({ label: "Internal links present", passed: links.internal > 0, detail: links.internal > 0 ? `${links.internal} internal link${links.internal === 1 ? "" : "s"} found.` : "No internal links detected." });
    if (links.internal === 0) suggestions.push("Add internal links to other relevant pages on your site. This helps distribute page authority and keeps visitors engaged.");

    checks.push({ label: "External links present", passed: links.external > 0, detail: links.external > 0 ? `${links.external} external link${links.external === 1 ? "" : "s"} found.` : "No external links detected." });
    if (links.external === 0) suggestions.push("Add external links to authoritative sources. Outbound links to quality resources signal credibility to search engines.");

    const meetsMinimum = totalLinks >= recommendedLinks;
    checks.push({ label: `Minimum links per 1,000 words (${recommendedLinks}+)`, passed: meetsMinimum, detail: `You have ${totalLinks} links. Recommended minimum: ${recommendedLinks} for ${words} words.` });
    if (!meetsMinimum) suggestions.push(`Add more links. For ${words} words, aim for at least ${recommendedLinks} links (mix of internal and external).`);

    const passed = checks.filter((c) => c.passed).length;
    categories.push({ id: "internal-linking", title: "Internal Linking", score: Math.round((passed / checks.length) * 100), maxScore: 100, checks, suggestions });
  }

  /* 7. Media & Formatting */
  {
    const checks: CheckResult[] = [];
    const suggestions: string[] = [];

    const hasImages = images > 0;
    checks.push({ label: "Image references", passed: hasImages, detail: hasImages ? `${images} image${images === 1 ? "" : "s"} detected.` : "No images detected." });
    if (!hasImages) suggestions.push("Add at least one image to your content. Visual content improves engagement and can appear in image search results.");

    const hasBullets = lists.bulleted > 0;
    checks.push({ label: "Bulleted lists", passed: hasBullets, detail: hasBullets ? `${lists.bulleted} bulleted list item${lists.bulleted === 1 ? "" : "s"} detected.` : "No bulleted lists detected." });
    if (!hasBullets) suggestions.push("Add bulleted lists to break up content and improve scannability. Lists are favored for featured snippets.");

    const hasNumbered = lists.numbered > 0;
    checks.push({ label: "Numbered lists", passed: hasNumbered, detail: hasNumbered ? `${lists.numbered} numbered list item${lists.numbered === 1 ? "" : "s"} detected.` : "No numbered lists detected." });
    if (!hasNumbered) suggestions.push("Consider adding numbered lists for step-by-step instructions or ranked information.");

    const hasBold = boldItalic.bold > 0;
    checks.push({ label: "Bold text emphasis", passed: hasBold, detail: hasBold ? `${boldItalic.bold} bold emphasis instance${boldItalic.bold === 1 ? "" : "s"} detected.` : "No bold text detected." });
    if (!hasBold) suggestions.push("Use bold text to emphasize key points and important terms. This helps both readers and search engines identify important content.");

    const hasTables = tables > 0;
    checks.push({ label: "Tables", passed: hasTables, detail: hasTables ? `${tables} table${tables === 1 ? "" : "s"} detected.` : "No tables detected." });

    const passed = checks.filter((c) => c.passed).length;
    categories.push({ id: "media-formatting", title: "Media & Formatting", score: Math.round((passed / checks.length) * 100), maxScore: 100, checks, suggestions });
  }

  /* 8. Secondary Keywords */
  {
    const checks: CheckResult[] = [];
    const suggestions: string[] = [];

    if (secKws.length === 0) {
      checks.push({ label: "Secondary keywords provided", passed: false, detail: "No secondary keywords were entered." });
      suggestions.push("Add secondary keywords (related terms, synonyms, long-tail variations) to broaden your content's search relevance.");
    } else {
      for (const skw of secKws) {
        const found = containsKeyword(contentBody, skw);
        checks.push({ label: `"${skw}" in content`, passed: found, detail: found ? `Secondary keyword "${skw}" found in content.` : `Secondary keyword "${skw}" not found in content.` });
        if (!found) suggestions.push(`Include the secondary keyword "${skw}" naturally in your content to capture related search queries.`);
      }
    }

    const passed = checks.filter((c) => c.passed).length;
    categories.push({ id: "secondary-keywords", title: "Secondary Keywords", score: Math.round((passed / checks.length) * 100), maxScore: 100, checks, suggestions });
  }

  /* Overall score */
  const overallScore = Math.round(categories.reduce((sum, c) => sum + c.score, 0) / categories.length);
  let grade = "F";
  if (overallScore >= 90) grade = "A";
  else if (overallScore >= 80) grade = "B";
  else if (overallScore >= 70) grade = "C";
  else if (overallScore >= 60) grade = "D";

  return { categories, overallScore, grade };
}

/* ------------------------------------------------------------------ */
/*  Format plain text export                                           */
/* ------------------------------------------------------------------ */

function formatExportText(input: AnalysisInput, result: AnalysisResult): string {
  const lines: string[] = [];
  lines.push("SEO CONTENT OPTIMIZER ANALYSIS");
  lines.push("=".repeat(50));
  lines.push(`Target Keyword: ${input.targetKeyword}`);
  if (input.secondaryKeywords) lines.push(`Secondary Keywords: ${input.secondaryKeywords}`);
  lines.push(`Page Title: ${input.pageTitle}`);
  lines.push(`Overall Score: ${result.overallScore}/100 (Grade: ${result.grade})`);
  lines.push("");

  for (const cat of result.categories) {
    lines.push(`${cat.title}: ${cat.score}/100`);
    lines.push("-".repeat(30));
    for (const check of cat.checks) {
      lines.push(`  [${check.passed ? "PASS" : "FAIL"}] ${check.label}`);
      lines.push(`         ${check.detail}`);
    }
    if (cat.suggestions.length > 0) {
      lines.push("  Suggestions:");
      for (const s of cat.suggestions) {
        lines.push(`    - ${s}`);
      }
    }
    lines.push("");
  }

  lines.push("Generated by SEO Content Optimizer | Markit Media");
  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function ScoreBar({ score, label }: { score: number; label: string }) {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "SEO Content Optimizer",
          description: "Each page should focus on one primary keyword and a handful of closely related secondary keywords. This helps search engines understand the page",
          url: "https://themarkitmedia.com/en/resources/seo-content-optimizer",
          applicationCategory: "SEO Tool",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          provider: { "@type": "Organization", name: "Markit Media", url: "https://themarkitmedia.com" },
        }) }}
      />
      <title>SEO Content Optimizer | Free Marketing Tool — Markit Media</title>
      <meta name="description" content="Each page should focus on one primary keyword and a handful of closely related secondary keywords. This helps search engines understand the page" />
      <div className="flex justify-between mb-2">
        <span className="text-base font-bold text-black">{label}</span>
        <span className="text-base text-neutral-500">{score}/100</span>
      </div>
      <div className="w-full bg-neutral-100 h-4">
        <div
          className="bg-black h-4 transition-all duration-500 motion-reduce:transition-none"
          style={{ width: `${score}%` }}
          role="presentation"
        />
      </div>
    </div>
  );
}

function CategoryCard({ category }: { category: CategoryResult }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-neutral-200">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-neutral-50 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
      >
        <div className="flex-1 min-w-0 pr-4">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black">
            {category.title}
          </h3>
          <div className="mt-2 w-full max-w-xs">
            <div className="w-full bg-neutral-100 h-3">
              <div
                className="bg-black h-3 transition-all duration-500 motion-reduce:transition-none"
                style={{ width: `${category.score}%` }}
                role="presentation"
              />
            </div>
          </div>
        </div>
        <span className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,2vw,1.5rem)] font-extrabold text-black shrink-0">
          {category.score}
        </span>
      </button>
      {expanded && (
        <div className="border-t border-neutral-200 px-6 py-5 space-y-4">
          {category.checks.map((check, i) => (
            <div key={i} className="flex items-start gap-3">
              <span
                className={`shrink-0 mt-1 w-5 h-5 flex items-center justify-center text-base font-bold ${
                  check.passed ? "text-black" : "text-neutral-400"
                }`}
                aria-hidden="true"
              >
                {check.passed ? "✓" : "✗"}
              </span>
              <div>
                <p className="text-base font-bold text-black">{check.label}</p>
                <p className="text-base text-neutral-500">{check.detail}</p>
              </div>
            </div>
          ))}
          {category.suggestions.length > 0 && (
            <div className="mt-4 border-t border-neutral-200 pt-4">
              <p className="text-base font-bold text-black mb-2">Suggestions</p>
              <ul className="space-y-2">
                {category.suggestions.map((s, i) => (
                  <li key={i} className="text-base text-neutral-600 pl-4 border-l-2 border-black">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function OverallScoreCard({ result }: { result: AnalysisResult }) {
  const gradeDescriptions: Record<string, string> = {
    A: "Excellent on-page SEO. Your content is well-optimized across all major ranking factors.",
    B: "Strong optimization with some areas to improve. Address the suggestions below to reach the next level.",
    C: "Moderate optimization. Several factors need attention to compete effectively in search results.",
    D: "Below average optimization. Significant improvements are needed across multiple categories.",
    F: "Major optimization gaps exist. Addressing the suggestions below will substantially improve your search visibility.",
  };

  return (
    <div className="border border-neutral-200 p-6">
      <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">
        Overall SEO Score
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <p className="text-base text-neutral-500 mb-1">Score</p>
          <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
            {result.overallScore}/100
          </p>
        </div>
        <div>
          <p className="text-base text-neutral-500 mb-1">Grade</p>
          <p className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black font-[family-name:var(--font-display)]">
            {result.grade}
          </p>
        </div>
        <div className="sm:col-span-1">
          <p className="text-base text-neutral-500 mb-1">Assessment</p>
          <p className="text-base text-neutral-700 leading-relaxed">
            {gradeDescriptions[result.grade] || gradeDescriptions.F}
          </p>
        </div>
      </div>
    </div>
  );
}

const bestPractices = [
  {
    title: "Target One Primary Keyword Per Page",
    description:
      "Each page should focus on one primary keyword and a handful of closely related secondary keywords. This helps search engines understand the page's topic clearly.",
  },
  {
    title: "Write for Humans First",
    description:
      "Search engines reward content that satisfies user intent. Write naturally, answer questions thoroughly, and provide genuine value before worrying about keyword placement.",
  },
  {
    title: "Use a Clear Heading Hierarchy",
    description:
      "Structure your content with a single H1, multiple H2 section headings, and H3 subheadings where appropriate. This helps both readers and crawlers navigate the page.",
  },
  {
    title: "Optimize Title Tags and Meta Descriptions",
    description:
      "Keep titles between 50 and 60 characters and descriptions between 150 and 160 characters. Include your primary keyword in both. These are what appear in search results.",
  },
  {
    title: "Add Internal and External Links",
    description:
      "Internal links help search engines discover and rank your pages. External links to authoritative sources signal credibility. Aim for at least 2 links per 1,000 words.",
  },
  {
    title: "Use Formatting for Scannability",
    description:
      "Break up content with short paragraphs, bullet points, numbered lists, bold text, and images. Well-formatted content earns more engagement and keeps visitors on the page.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */



export default function SEOContentOptimizerPage() {
  const [input, setInput] = useState<AnalysisInput>({
    targetKeyword: "",
    secondaryKeywords: "",
    pageTitle: "",
    metaDescription: "",
    contentBody: "",
  });
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const canAnalyze = input.targetKeyword.trim().length > 0 && input.contentBody.trim().length > 0;

  const handleAnalyze = useCallback(() => {
    if (!canAnalyze) return;
    setResult(runAnalysis(input));
  }, [canAnalyze, input]);

  const handleReset = useCallback(() => {
    setInput({
      targetKeyword: "",
      secondaryKeywords: "",
      pageTitle: "",
      metaDescription: "",
      contentBody: "",
    });
    setResult(null);
  }, []);

  const exportText = useMemo(() => {
    if (!result) return "";
    return formatExportText(input, result);
  }, [result, input]);

  const handleExport = useCallback(() => {
    if (!exportText) return;
    const blob = new Blob([exportText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "seo-analysis.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [exportText]);

  const updateField = useCallback(
    (field: keyof AnalysisInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInput((prev) => ({ ...prev, [field]: e.target.value }));
    },
    []
  );

  const liveWordCount = useMemo(() => countWords(input.contentBody), [input.contentBody]);

  return (
    <article className="min-h-screen">
      
      {/* Related Tools */}
      <section className="px-6 lg:px-12 py-12" aria-label="Related tools">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
                <Link href="/resources/seo-checklist" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">SEO Checklist</Link>
                <Link href="/resources/keyword-density-checker" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">Keyword Density Checker</Link>
                <Link href="/resources/seo-audit-score" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">SEO Audit Score</Link>
                <Link href="/resources/seo-gap-finder" className="border border-neutral-200 px-4 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2">SEO Gap Finder</Link>
          </div>
        </div>
      </section>
<JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "SEO Content Optimizer",
          description:
            "Free on-page SEO analysis tool. Analyze keyword usage, readability, heading structure, meta tags, internal linking, and media formatting for any content.",
          applicationCategory: "MarketingApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <Breadcrumb
        items={[
          { label: "Resources", href: "/resources" },
          { label: "SEO Content Optimizer" },
        ]}
      />

      {/* ---- Hero ---- */}
      <section aria-label="Free Tool" className="px-6 lg:px-12 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <SectionLabel>Free Tool</SectionLabel>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-black tracking-tight leading-[1.1] mt-3">
              SEO Content Optimizer
            </h1>
            <SectionDesc>
              Analyze your content for on-page SEO factors. Enter your target
              keyword, page title, meta description, and content body to receive
              a detailed breakdown across eight optimization categories with
              specific improvement suggestions.
            </SectionDesc>
          </Animate>
        </div>
      </section>

      {/* ---- Input Form ---- */}
      <section aria-label="Content section" className="px-6 lg:px-12 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <Animate animation="fade-up">
            <div className="border border-neutral-200">
              <div className="bg-black text-white px-6 py-4">
                <span className="font-[family-name:var(--font-display)] text-base font-extrabold">
                  Content Details
                </span>
              </div>
              <div className="p-6 space-y-6">
                {/* Target Keyword */}
                <div>
                  <label htmlFor="target-keyword" className="block text-base font-bold text-black mb-2">
                    Target Keyword <span className="text-neutral-400 font-normal">(required)</span>
                  </label>
                  <input
                    id="target-keyword"
                    type="text"
                    value={input.targetKeyword}
                    onChange={updateField("targetKeyword")}
                    placeholder="e.g. digital marketing strategy"
                    className="w-full border border-neutral-200 px-4 py-3 text-base text-black placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  />
                </div>

                {/* Secondary Keywords */}
                <div>
                  <label htmlFor="secondary-keywords" className="block text-base font-bold text-black mb-2">
                    Secondary Keywords <span className="text-neutral-400 font-normal">(comma-separated)</span>
                  </label>
                  <input
                    id="secondary-keywords"
                    type="text"
                    value={input.secondaryKeywords}
                    onChange={updateField("secondaryKeywords")}
                    placeholder="e.g. online marketing, content strategy, SEO tips"
                    className="w-full border border-neutral-200 px-4 py-3 text-base text-black placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  />
                </div>

                {/* Page Title */}
                <div>
                  <label htmlFor="page-title" className="block text-base font-bold text-black mb-2">
                    Page Title
                    <span className="text-neutral-400 font-normal ml-2">
                      {input.pageTitle.length}/60 characters
                    </span>
                  </label>
                  <input
                    id="page-title"
                    type="text"
                    value={input.pageTitle}
                    onChange={updateField("pageTitle")}
                    placeholder="e.g. 10 Digital Marketing Strategies That Drive Growth"
                    className="w-full border border-neutral-200 px-4 py-3 text-base text-black placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  />
                </div>

                {/* Meta Description */}
                <div>
                  <label htmlFor="meta-description" className="block text-base font-bold text-black mb-2">
                    Meta Description
                    <span className="text-neutral-400 font-normal ml-2">
                      {input.metaDescription.length}/160 characters
                    </span>
                  </label>
                  <textarea
                    id="meta-description"
                    value={input.metaDescription}
                    onChange={updateField("metaDescription")}
                    placeholder="e.g. Learn the top digital marketing strategies that help businesses grow online. Covers SEO, content marketing, paid ads, and more."
                    rows={3}
                    className="w-full border border-neutral-200 px-4 py-3 text-base text-black placeholder:text-neutral-400 resize-y focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  />
                </div>

                {/* Content Body */}
                <div>
                  <label htmlFor="content-body" className="block text-base font-bold text-black mb-2">
                    Content Body <span className="text-neutral-400 font-normal">(required)</span>
                    <span className="text-neutral-400 font-normal ml-2">
                      {liveWordCount} words
                    </span>
                  </label>
                  <p className="text-base text-neutral-500 mb-2">
                    Paste your full content including headings. Supports Markdown and HTML formatting.
                  </p>
                  <textarea
                    id="content-body"
                    value={input.contentBody}
                    onChange={updateField("contentBody")}
                    placeholder={"# Your Article Title\n\nIntroduction paragraph with your target keyword...\n\n## First Section Heading\n\nContent with **bold text**, bullet points, and [links](https://example.com)..."}
                    rows={16}
                    className="w-full border border-neutral-200 px-4 py-3 text-base text-black font-mono placeholder:text-neutral-400 resize-y focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                  />
                </div>
              </div>
            </div>
          </Animate>

          {/* Actions */}
          <Animate animation="fade-up">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAnalyze}
                disabled={!canAnalyze}
                className="bg-black text-white px-8 py-4 min-h-[44px] text-base font-bold hover:bg-neutral-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:bg-neutral-300 disabled:cursor-not-allowed"
              >
                Analyze Content
              </button>
              {(input.targetKeyword || input.contentBody) && (
                <button
                  onClick={handleReset}
                  className="px-8 py-4 min-h-[44px] text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
                >
                  Clear All
                </button>
              )}
              {!canAnalyze && (
                <p className="text-base text-neutral-400 self-center">
                  Enter a target keyword and content body to run the analysis.
                </p>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* ---- Results ---- */}
      {result && (
        <section aria-label="Category Scores" className="px-6 lg:px-12 pb-16">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Overall score */}
            <Animate animation="fade-up">
              <OverallScoreCard result={result} />
            </Animate>

            {/* Category scores overview */}
            <Animate animation="fade-up">
              <div className="border border-neutral-200 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-6">
                  Category Scores
                </h3>
                <div className="space-y-5">
                  {result.categories.map((cat) => (
                    <ScoreBar key={cat.id} score={cat.score} label={cat.title} />
                  ))}
                </div>
              </div>
            </Animate>

            {/* Detailed category cards */}
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-6">
                Detailed Analysis
              </h3>
              <p className="text-base text-neutral-500 mb-6">
                Expand each category to see individual checks and improvement suggestions.
              </p>
              <div className="space-y-4">
                {result.categories.map((cat) => (
                  <Animate key={cat.id} animation="fade-up">
                    <CategoryCard category={cat} />
                  </Animate>
                ))}
              </div>
            </div>

            {/* Export actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleExport}
                className="bg-black text-white px-8 py-4 min-h-[44px] text-base font-bold hover:bg-neutral-900 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Export Analysis as .txt
              </button>
              <button
                onClick={handleReset}
                className="px-8 py-4 min-h-[44px] text-base font-bold border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
              >
                Start Over
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ---- Educational Section ---- */}
      <section aria-label="On-Page SEO Best Practices" className="px-6 lg:px-12 py-16 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-black mb-8">
              On-Page SEO Best Practices
            </h2>
          </Animate>
          <Stagger stagger={100} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {bestPractices.map((item, i) => (
              <div key={i} className="border border-neutral-200 p-6">
                <div className="flex items-start gap-4">
                  <span className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-extrabold text-neutral-300">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-black mb-2">
                      {item.title}
                    </h3>
                    <p className="text-base text-neutral-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---- Bottom CTA ---- */}
      <section aria-label="Call to action" className="px-6 lg:px-12 py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Animate animation="fade-up">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight">
              Get Expert SEO Content Strategy
            </h2>
            <p className="text-lg text-neutral-400 mt-4 mb-8">
              This tool gives you a snapshot of your on-page optimization. Our
              team builds comprehensive SEO strategies backed by keyword
              research, competitive analysis, and technical audits to help your
              content rank and convert.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 min-h-[44px] font-bold text-base hover:bg-neutral-100 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Talk to Our SEO Team &rarr;
            </Link>
          </Animate>
        </div>
      </section>
    
      <ToolCTA
        toolName="Seo Content Optimizer"
        services={[
          { title: "SEO", desc: "Data-driven SEO strategies that drive organic traffic and revenue growth.", href: "/services/seo" },
          { title: "Content Marketing", desc: "Content that ranks, engages, and converts your target audience.", href: "/services/content-marketing" },
          { title: "Digital Marketing", desc: "Full-stack digital marketing strategy tailored to your business goals.", href: "/services/digital-marketing" },
        ]}
        relatedTools={[
          { title: "Seo Audit Score", href: "/resources/seo-audit-score" },
          { title: "Seo Checklist", href: "/resources/seo-checklist" },
          { title: "Seo Gap Finder", href: "/resources/seo-gap-finder" },
          { title: "Seo Vs Ppc", href: "/resources/seo-vs-ppc" },
        ]}
        relatedBlog={[
          { title: "Digital Marketing Strategy Guide", href: "/blog" },
          { title: "How to Measure Marketing ROI", href: "/blog" },
        ]}
      />
    </article>
  );
}
