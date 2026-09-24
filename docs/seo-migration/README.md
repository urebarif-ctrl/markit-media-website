# Markit Media SEO Migration — Search Console Workstream

Status: IN PROGRESS
Branch: seo-migration-gsc
Production: DO NOT MODIFY until preview validation is complete.

## Non-negotiables
- Preserve the complete blog/resource library. Do not mass-delete or mass-noindex informational content.
- Existing organic equity is preserved by intent, not by blindly restoring the old website.
- High-value legacy URLs must be kept, rebuilt, or redirected to the closest equivalent page.
- Never mass-redirect unrelated URLs to the homepage.
- Redirects should be direct permanent one-hop mappings.
- Priority 300 is an operational crawl/indexing/optimization priority set, not an exclusion list for all other URLs.
- English is currently the indexable locale. Arabic and Urdu remain blocked until their content/localization is production-ready.
- Production deployment happens only after build, preview, redirect, canonical, robots, sitemap, and 404 verification.

## Search Console findings (15-month available window)
Examples of assets requiring explicit preservation decisions:
- / — 593 clicks / 11,225 impressions
- /22-best-augmented-reality-games-you-must-try/ — 143 / 19,090
- /social-media-phone-vs-desktop-use/ — 88 / 15,871
- /top-web-design-companies-in-the-usa/ — 79 / 22,311
- /service-meta-ads-facebook-ads/ — 53 / 6,449
- /best-personal-website-examples-to-inspire-your-own-brand/ — 48 / 16,522
- /top-web-development-companies-in-the-usa/ — 34 / 10,267
- /service-video-editing/ — 28 / 638
- /home-decor-interior-design-online-digital-marketing-agency/ — 25 / 4,505
- /service-youtube-thumbnail-design/ — 25 / 2,956
- /service-company-profile-design/ — 18 / 3,706
- /how-much-does-website-development-cost-in-the-usa/ — 13 / 8,218

Geography opportunity:
- United States: 218 clicks / 235,289 impressions / ~30.65 avg position
- Pakistan: 715 clicks / 18,149 impressions / ~10.33 avg position
The US footprint is therefore a major optimization opportunity, especially high-impression queries/pages already ranking in positions 5–30.

## Work phases
1. Inventory all GSC URLs and queries.
2. Audit existing redirect map against GSC evidence.
3. Build Priority 300 scoring/mapping.
4. Verify destination pages actually exist and match legacy intent.
5. Correct unsafe/broad redirects and duplicate URL families.
6. Preserve/rebuild high-value legacy articles and commercial pages where a redirect would lose intent.
7. Strengthen Service <-> Industry <-> Case Study <-> Insight internal linking.
8. Review canonicals, metadata, structured data, hreflang, robots and sitemap behavior.
9. Build and deploy preview only.
10. Crawl/verify preview; production promotion only after validation.

## Current technical observations
- next.config.ts already contains a substantial legacy redirect map.
- Several redirects are broad patterns and need to be checked against GSC before release.
- sitemap.ts already includes the full blog library plus static/service/industry/location/resource URLs.
- robots.ts blocks previews and currently keeps Arabic/Urdu out of the production index.
- The sitemap should continue to expose legitimate informational content; the Priority 300 should be used for optimization/monitoring rather than deleting the rest.

## Priority 300 scoring model
Priority score should consider:
1. Existing clicks.
2. Existing impressions.
3. Current average position / attainable ranking band.
4. Commercial relevance.
5. US relevance.
6. Strategic service/industry relevance.
7. Case-study/proof value.
8. Internal-link importance.
9. Migration risk if URL disappears.
10. Duplicate/cannibalization risk.

## Safety gate
Do not merge this branch or promote its Vercel deployment to production until:
- redirect destinations return expected successful status,
- no redirect loops/chains are introduced,
- priority legacy URLs are accounted for,
- sitemap uses canonical destinations,
- robots does not accidentally block production English pages,
- important pages are not accidentally noindexed,
- canonical URLs point to production URLs,
- build succeeds,
- preview has no material runtime errors,
- key mobile/desktop routes render correctly.
