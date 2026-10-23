# Case Studies SEO & Indexing: change log (preview branch)

Branch `seo/case-studies-indexing` (git worktree `~/cs-seo-work`, cut from origin/main 0d39148). **Nothing is deployed, pushed or changed in any external account.** Status date: 21 Oct 2026 (second checkpoint).

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
| QA script problems on 66 work pages + sitemap + robots | **343** | **0** unheld, **10 held** (exception requests, section 6) |
| Work URLs in sitemap | 42 (+2 hubs) | 42 (+2 hubs): unchanged. 0 of the 24 noindex pages qualified, ArchPoint included |
| Pages with Article schema | 10 of 66 | 66 of 66 |
| Pages with a default OG image | 17 | 0 |
| Pages with 4 related links | 50 of 66 | 66 of 66 |
| Generic (numbered) alt texts on work pages | 316 images on 37 pages | **0** (all 481 media alts rewritten, unique per image, 125 characters or fewer) |
| Pages under 300 words of copy | not measured | 19 of 66 (median 426, range 139 to 693) |
| Non-work pages: title/description/canonical/robots/H1 | n/a | **0 differences on 84 sampled pages** (random sample of the sitemap + service, industry and location pages) |
| All 66 work URLs, slugs, canonicals | n/a | unchanged, no redirect added (except `/sitemap.xml`) |

Per-page title, H1 and meta before and after: `docs/seo/before-after-metadata.csv`. Screenshots of the new pages: `screens/` in the package.

## 4. What changed in this round

1. **Copy and alt texts for the remaining pages**: about 55 client pages and 5 collections now have page-specific copy built only from verified facts (client sites checked on 21 Oct, artwork read at full size, existing owner copy). Pages that could not be verified keep the owner's existing text and are in the held list. Where a city could not be verified, the title, H1 and meta use a no-location wording.
2. **Keyword differentiation**: every page has a unique primary keyword; collections and full case studies target different phrases (`keyword-differentiation.csv`, `service-keyword-map.csv`). No cannibalisation pairs remain.
3. **Service pages link to real projects**: social media, branding and website development lists now include Tourão, Chefiality, Thermex, Pakhlanze and Wild Game Jerky where the work matches the service. No forced links.
4. **Indexing-readiness framework** (`scripts/seo/indexing-readiness.mjs`, gates G1 to G7, output `indexing-reconciliation.csv/.json`): see section 5.
5. **Everest Snacks**: proposed structure only (`everest-snacks-proposal.md`). Nothing published.
6. **Preview deployment**: configuration prepared, not deployed (`docs/seo/preview/PREVIEW-DEPLOYMENT.md`, `wrangler.preview.jsonc.example`): separate Worker, D1 and R2, `PRODUCTION_DEPLOY=false` (noindex everywhere), Cloudflare Access in front, no credentials in the repo.
7. **Cloudflare**: documentation only. New section: the country block must be a WAF custom rule that runs before any cache; the cache-rule exclusion of IN and NG is not accepted as proof. Trace-based test plan included.
8. **Uncertainty ledger** rebuilt: 388 rows, one place for every open question.

## 5. Indexing-readiness reconciliation (66 pages)

- 42 pages are indexable and in the sitemap (preserved), 24 are noindex and out of the sitemap (preserved). **0 promoted.**
- Of the 42 indexable: **12 pass every gate**, **30 are flagged "review"** (mostly no verified website or city, or under 250 words of unique copy). None was set to noindex: that is an owner decision.
- ArchPoint stays noindex: one image, about 300 words, no verified website or city. The conditional approval is not met.
- Of the 24 noindex pages: most lack a second distinct piece, a verified website/city or enough verified copy; two are political-campaign pages that need an explicit owner decision.

## 6. QA and build results

- `next build` (Turbopack), `CIRCLE_NODE_TOTAL=2`, `PRODUCTION_DEPLOY=true`: success, peak 1.39 GB (cap 25% of RAM). `tsc --noEmit` clean.
- `docs/seo/qa-case-studies.mjs` on the local production server: **66 pages checked, 0 problems, 10 held**.
- **The 10 held items are unresolved, not passed.** Each is an exception REQUEST waiting for approval (`qa-exceptions.json`): HUBCO (meta 101 characters, 262 words), Vuse, NoorShad, One Homes, Pur Health, American Auto Parts, MeezoTech (480 words vs 600 featured minimum), Minhaz Couture (561 words), My Fresh Fruits (139 words). Cause in every case: not enough verifiable facts, or an attribution hold.
- 84 non-work pages compared with live on title, description, canonical, robots and H1: no differences.
- Not tested: a real device, Google's Rich Results Test (needs a public URL), production cache behaviour, Search Console behaviour.

## 7. Not-found performance fix (separate branch `fix/not-found-static-rendering`, not applied here)

- Cause: `headers()` in `src/app/[lang]/not-found.tsx` made all 433 routes render per request. Fix: client component with `useParams`; plus `connection()` on pages that read D1 and `force-dynamic` on the free-tools layout, search and thank-you.
- Local build: 433 dynamic before, 230 dynamic after (38 API, 155 free-tool, 37 other), 618 prerendered.
- A/B against a baseline build over 1,575 sitemap URLs and 990 prerendered routes: 0 SEO-metadata differences, 0 analytics/consent script differences, 357 redirects and 106 rewrites identical, 404 probes identical, forms, auth and dashboards identical, country block identical. Differences: `Cache-Control` becomes `s-maxage=31536000` (so purge on deploy), 9 routes carry an extra streaming script, and one legacy home-decor URL now shows the industry strip.
- Hazards found and fixed on the way: stale blog data on D1 pages, wrong free-tool language links via the proxy rewrite, search/thank-you placeholders, and build-time `PRODUCTION_DEPLOY` baking into HTML (a build without it ships noindex,nofollow; `scripts/verify-prerendered-build.mjs` checks for it).
- **Not deployed. Needs separate approval.** Report: `docs/NOT-FOUND-FIX.md` on that branch.

## 8. Information needed from the owner

See `docs/seo/uncertainty-ledger.csv` (388 rows). Headline items: project years; real results or quotes (none exist); client websites and cities for many brands; first-publication dates for the 17 older pages; YouTube upload dates and durations (YouTube blocks this server, so VideoObject is omitted); Everest Snacks authorship, scope and assets; HUBCO and Vuse wording; Pur Health vs PUUR; third-party likeness rights for in-house pages; confirm `icon-512.png` as the logo.

## 9. Postponed on purpose

- Everest Snacks page: built as a draft on 23 Oct 2026 (section 10); not indexed or in the sitemap until the owner approves.
- Branding & Visual Identity: kept separate, no merge or redirect. All 21 of its boards also appear in Logo Folio's 32; proposal only (needs approval).
- Blog links: 14 proposals in `docs/seo/blog-links/`; nothing written to D1. Backup and rollback scripts ready.
- Cloudflare cache rule, Crawler Hints, WAF country rule: documented, not activated.
- Not-found fix: prepared and tested, not deployed.
- Site-wide `/ar` `/ur` self-canonical outside the work pages.

## 10. Expected benefits and remaining risks

**Benefits (not promises):** indexable work pages carry real dates and images in the sitemap; Google can read the noindex on `/ar` `/ur`; valid entity data; unique titles and keywords; descriptive alts on every image; wrong-fit links replaced; no regressions on 84 sampled pages.

**Risks:**
- Titles changed on 63 pages and H1s on 62. Only 7 work pages had impressions in 90 days (100 impressions, 0 clicks in total); HUBCO's title and H1 were left as they are.
- Opening `/ar` `/ur` to crawling adds crawl load before those URLs drop out.
- 19 pages are under 300 words and 30 indexed pages are flagged for review: thin-content risk until facts arrive. Nothing was padded.
- Copy is unreviewed by the owner; the 4 sample pages in particular are not approved.
- Rich-result eligibility and rankings cannot be tested until a public, access-controlled preview exists.

## 10. Everest Snacks case study built (23 Oct 2026)

Draft, noindex, out of the sitemap. Authorship is evidenced by the client's own footer credit and the Markit Media author on its blog posts; scope is website design and development (footer credit); three blog articles are published from a Markit Media account; no shop exists; year 2026; no results published. Details and the resolved confirmations are in `everest-snacks-proposal.md`. Files: `src/app/[lang]/work/everest-snacks/page.tsx`, `src/components/work-screens.tsx`, records, editorial, indexing and linking data, cover in `src/lib/covers.ts`, images in `public/images/work/everest-snacks/`.

## 11. Indexing, SEO tags and industry links (23 Oct 2026, owner request)

- **Indexable**: every case study except the two political-candidate pages (Brittanye Morris, Dr Jason Hayes), which keep their explicit-approval hold. 23 pages changed from noindex to index (indexing.json); they enter the work sitemap automatically. 12 of them are under the plan's 300-word floor, so they are listed in `qa-exceptions.json` with the owner decision as the reason.
- **SEO-only meta tags on every case-study page** (not visible on the page): `keywords` now include "<client> case study", "Markit Media case study", "Markit Media work" and "<industry> case study / work"; `category` and `article:section` carry the industry name; `article:tag` carries "Case study", "Work", the industry and the matching industry pages; the Article schema's `articleSection` and `keywords` match. Placeholder industries ("CONFIRM...", "In-house brand", "Portfolio") are never published as tags; collections get "Work"/"Portfolio" tags.
- **Industry interlinking**: industry pages show up to 12 matching case studies (was 6) and gained Pakhlanze (restaurants), Cambridge Electrical, Easywear, Elf and Santa Videos and Find My Apparel (e-commerce) and H University (education, which had none). Each case study now links to all its industries (up to 3), not only the first. New "Case studies by industry" block on the case-studies hub links every industry page and its case studies (held and political pages excluded).
- **QWENCH**: added the website, reels and Meta ads to the services and a short "More of what we did" section, without touching the existing copy, title or meta description.
- Industries still without a matching case study: Home Services, Finance, Fitness, Freelancers & Agencies, Legal, Travel, Interior Design and Exterior Cleaning (which has its own separate case-study page).

## 12. Everest Snacks case study rewritten (23 Oct 2026, owner request)

Full rewrite with the owner-stated scope added: social media, photography, AI enhancement of photos, animation. Title, H1, meta description, keywords, services and the cards on the hub, work page and Website Development page updated. Scope beyond the website rests on the owner's statement only; no image or post is individually credited. See `everest-snacks-proposal.md`.

## 13. Everest Snacks go-live confirmations (23 Oct 2026)

Owner confirmed screenshots (founder photo, retailer logos), the Shahi wording, that Markit Media wrote the three articles and indexing, and approved the release. Added the Content Marketing tag, "we wrote them" wording, the publication date and the indexing basis.

