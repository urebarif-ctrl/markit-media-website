# Case Studies SEO & Indexing: change log (preview branch)

Branch `seo/case-studies-indexing` (git worktree `~/cs-seo-work`, cut from origin/main 0d39148). **Nothing is deployed, pushed or changed in any external account.** Status date: 21 Oct 2026.

## 1. What the audit got right and wrong (Phase 0, verified)

| Plan said | Reality (checked live, 21 Oct 2026) |
|---|---|
| 40 or 44 work URLs in the sitemap | `/sitemaps/work.xml` lists **44 URLs = 42 work pages + `/en/work` + `/en/case-studies`**. The real work universe is **66 pages** (64 linked from the hub + My Fresh Fruits + Branding & Visual Identity). 24 of the 66 are missing from the sitemap. |
| The 24 missing pages are an omission | They are exactly the **24 compact client pages set to `noindex,follow` on purpose on 17 Oct** (fewer than 6 pieces). Listing them in the sitemap while they are noindex would send Google a conflict, so a page now enters the sitemap only when it is indexable. |
| No JSON-LD on any work page | Live pages already had thin `Article`/`CreativeWork` + `BreadcrumbList`. They lacked an `@id` graph, dates, client node, image, author/publisher links. |
| `/en/case-studies` and 64 work pages "not indexed" | Search Console inspection of 68 URLs: 12 indexed, 13 discovered-not-indexed, 36 unknown to Google, 7 excluded by noindex. 90-day `/en/work/*` total: 7 pages with impressions, **100 impressions, 0 clicks**. |

Baselines saved: `~/cs_seo_work/phase0/` (URL inspection, 90-day performance, queries, sitemaps list), `~/cs_seo_work/qa/baseline_live_rerun.*`.

## 2. SEO problems fixed in this branch

| Problem | Fix | Where |
|---|---|---|
| Sitemap: work pages missing, identical build-date `lastmod`, no images | Work group now built from the case-study data source: every indexable page, real modification date, `image:image` entries (up to 1,000 per URL); `work` lastmod in the index is real | `src/app/sitemap.ts`, `src/lib/sitemap-xml.ts`, `src/app/sitemap-index.xml/route.ts` |
| Two sitemap sources | `/sitemap.xml` 301 to `/sitemap-index.xml` (only the index is submitted in Search Console) | `next.config.ts` |
| `/ar/` `/ur/` blocked in robots.txt so Google cannot see their noindex; header said nofollow while meta said follow | Disallow removed from every user-agent group; header now `noindex, follow`; the 66 work pages are self-canonical in `/ar` and `/ur` | `src/app/robots.ts`, `next.config.ts`, `src/lib/case-studies.ts` |
| Organization had no `@id`, 1200x630 image as logo | `@id` `#organization`, WebSite `@id` `#website`, logo = existing 512x512 `icon-512.png` | `src/app/[lang]/page.tsx` |
| Thin Article schema | One `@graph` per page: WebPage, Article (author/publisher `@id`, dates), client Organization (url/address only when verified), hero ImageObject, BreadcrumbList, Services; hub: CollectionPage + ItemList of all 66 + BreadcrumbList. No Review/FAQPage/AggregateRating | `src/lib/case-studies.ts`, `case-study-extras.tsx` |
| Two different breadcrumb trails | One trail everywhere: Home / Work / Case Studies / Brand (collections: Home / Work / Collection); one BreadcrumbList node per page | `breadcrumb.tsx`, templates |
| Default OG image on 17 pages, no `og:type` | Per-page OG image (the page's own hero artwork), `og:type=article`, `twitter:card=summary_large_image` | `caseStudyMetadata()` |
| Titles/H1/meta | From the plan's section 9 (length-checked: all 66 titles 30-60 characters, metas 120-160 except one held), with unverified places removed (see ledger) | `src/data/case-studies/records.json` |
| Client website never linked; no snapshot facts | Snapshot box on every page; website linked only when verified live (12 clients + MustCare) | `CaseStudySnapshot` |
| Unrelated "related" cards, none on featured pages | 4 hand-picked related cards on all 66 pages, descriptive anchors | `RelatedCaseStudies` |
| Wrong-fit industry links (HUBCO on EV chargers/finance, Pur Health on rehab; a link to `/work` for nonprofits) | Industry strip is now data-driven: removed wrong fits; 17 industries link to real case studies | `industry-project-strip.tsx`, `linking.ts` |
| Location pages linked no case study | Houston (+2 service pages), Pakistan, Karachi branding, Australia get a "Work for ... businesses" block, verified clients only | `location-landing.tsx` |
| Collection pages did not link their clients | Each collection lists every client page in its category | `CollectionClientList` |
| `/en/work` and `/en/case-studies` competed | Distinct jobs, titles, H1s and a link each way; `/en/work` now links all 66 pages by service; hub gets a proof strip, industry + location filters, "Featured" tag, city/service on cards | `work/page.tsx`, `case-studies/page.tsx`, `client-directory.tsx` |
| "2 min read" labels were guesses | Shown only when computed from real copy | `case-study-page.tsx` |
| Data hygiene | Alias "Crescent Health System" removed from the Cheap Hardware Store record (verified from artwork: separate brands) | `site-data.json` |

## 3. Before and after

| Measure | Live (21 Oct) | This branch (local production build) |
|---|---|---|
| QA script problems on 66 work pages + sitemap + robots | **343** | **0** unheld, 66 held (below) |
| Work URLs in sitemap | 42 (+2 hubs) | 43 (+2 hubs): the 4 rewritten pages that qualify; the other noindex pages stay out until they qualify |
| Pages with Article schema | 10 of 66 | 66 of 66 |
| Pages with a default OG image | 17 | 0 |
| Pages with 4 related links | 50 of 66 | 66 of 66 |
| Generic (numbered) alt texts on work pages | 316 images on 37 pages | 290 images on 34 pages (50 alts rewritten for the 4 representative clients; the rest of the drop comes from images shared across pages) |
| Non-work pages: title/description/canonical/robots/H1 | n/a | **0 differences on 47 sampled pages** |
| All 66 work URLs, slugs, canonicals | n/a | unchanged, no redirect added (except `/sitemap.xml`) |

Side-by-side screenshots: `~/cs_seo_work/shots/cmp_elite.jpg`, `cmp_arch.jpg`, `cmp_hub.jpg`. Per-page title/H1/meta before and after: `docs/seo/before-after-metadata.csv`.

**Inbound links.** Target "every page has 3+ links from non-hub pages" is **not met**: 22 of 66 reach it through industry + location + collection links alone, 58 of 66 when related-card links are counted, 8 have fewer. Left as is rather than forcing links. The 14-post blog proposal and the service-page block (postponed) would add to this.

## 4. QA and build results

- `tsc --noEmit`: clean (the two unused-import warnings left are older files).
- `next build` (Turbopack), `CIRCLE_NODE_TOTAL=2`: success in 45 s, **peak 1.6 GB** (cap 25% of available = 4.2 GB). The default 7 workers exceed the cap, so use that variable.
- `docs/seo/qa-case-studies.mjs` rebuilt from the plan (the plan's copy was a wrapped PDF listing; it was rewritten, syntax-checked and run). Extended: checks every work page (not only those already in the sitemap), indexable-but-not-in-sitemap and the reverse, robots.txt, `/ar` copy, schema graph, forbidden schema types. Held items need `docs/seo/flagged-pages.json` and only for named problem kinds.
- Held (66 messages): 34 generic-alt pages, 31 pages under the word minimum (copy not rewritten yet), 1 short meta on HUBCO (attribution hold).
- Lighthouse on the local server (not comparable to live: no CDN or Zaraz): Elite, ArchPoint, hub all accessibility 100, SEO 100, CLS 0.
- Not tested: a real device, Google's Rich Results Test (needs a public URL), production caching behaviour.

## 5. Representative pages rewritten (quality check before expanding)

| Page | Real copy | Alt texts | Notes |
|---|---|---|---|
| Elite (featured) | ~510 words, below the 600 featured minimum | 12 | no brief, results, year: not invented |
| Cambridge Electrical (featured) | ~480 words, below 600 | 31 | same |
| ArchPoint Pain Institute (client, was noindex) | ~300 words | 1 | now qualifies as indexable in the preview: **owner approval needed** |
| Tourão (client, already indexable) | ~255 words, below 300 | 6 | kept indexable only through the existing 6-pieces rule |

Facts come from the client's own site (checked 21 Oct), the artwork seen at full size, and the existing page copy. Sources are stored in `editorial.ts`.

## 6. Information needed from the owner

See `docs/seo/uncertainty-ledger.csv` (310 rows). Headline items: client websites and cities for 50+ brands; project years; real results or quotes (none exist in the repo); first-publication dates for the 17 older pages (only the 49 pages released 17 Oct have a verified date); YouTube upload dates and durations (YouTube blocks this server) so VideoObject can be added; Everest Snacks assets; HUBCO/Vuse wording approval; Pur Health vs PUUR; confirm `icon-512.png` as the logo.

## 7. Postponed on purpose

- Rest of the copy and alt texts (60 pages), pending review of the 4 samples (tool: `~/cs_seo_work/img/sheet.py` makes a labelled contact sheet per client).
- Everest Snacks page (no assets or verified facts).
- Branding & Visual Identity: kept separate. All **21** of its boards also appear in Logo Folio's 32; proposal, no change made: give Logo Folio the animations and the 11 boards that are not shown on the identity page, and keep the 21 full identity systems only on Branding & Visual Identity.
- Service-page blocks (plan 8.4): those pages have a curated registry from the earlier service-pages release, left untouched to avoid conflicts.
- Blog links: proposal only (see below). No write to D1.
- Cloudflare cache rule and Crawler Hints: documented, not activated (`cloudflare-cache-and-crawler-hints.md`).
- Static rendering (plan 4.3): see finding below.
- Site-wide `/ar` `/ur` self-canonical outside the work pages.
- Hero `fetchpriority`/AVIF changes: the existing templates already prioritise the hero; no further change.

## 8. Findings outside the plan

1. **Every one of 433 routes renders per request** because `src/app/[lang]/not-found.tsx` calls `headers()`. Removing that call in a local build left 45 dynamic routes (reverted, not applied). It is the reason pages are `Cache-Control: private, no-store`, and fixing it is a site-wide change.
2. **Caching hazard:** `src/proxy.ts` returns 403 for visitors from IN and NG; an edge cache would bypass it unless the rule excludes those countries (done in the prepared rule).
3. `pk.vuse.com` opens a German EUR site, `binarygrid.io` and `screws.pk` do not resolve, `kemahpalms.com` and `har.com` block automated checks. None of those were linked.
4. The blog has 4,000 rows in D1 but only 975 are published and indexable; their text is largely templated, so only **14** posts are topically close enough for a real contextual link (`docs/seo/blog-links/`). A full read-only export is saved at `~/backups/blog_posts_export_2026-10-21.jsonl` (the rollback baseline). `apply_blog_links.py` is dry-run by default and applies nothing until rows are marked `approved: true`; `rollback_blog_links.py` restores from the backup it writes.

## 9. Expected benefits and remaining risks

**Benefits (not promises):** every indexable work page is in the sitemap with a real date and its images; Google can finally read the noindex on `/ar` `/ur`; richer, valid entity data for Google and AI search (client, image, services, dates); correct internal links in place of wrong-fit ones; clearer split between portfolio and case studies; no regressions on 47 sampled pages.

**Risks:**
- Titles changed on 63 pages and H1s on 62. Only 7 work pages had any impressions in the last 90 days (largest: HUBCO for "hubco logo", position 5.8, whose title and H1 were deliberately left as they are; the others have 1 to 29 impressions, mostly `site:` queries).
- Opening `/ar` `/ur` to crawling will add crawl load (about 1,500 noindexed URLs each, some 404) before they drop out.
- Indexing ArchPoint (one image, ~300 words) is a thin-content risk; reverse by leaving `indexReady` false.
- 60 pages still carry numbered alt text and short copy until the rollout continues.
- Rich-result eligibility and rankings are not testable until a public preview exists.
