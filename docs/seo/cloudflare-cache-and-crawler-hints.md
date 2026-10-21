# Cloudflare caching and Crawler Hints: preparation only

Status: **PREPARED, NOT ACTIVATED.** No Cloudflare setting has been changed. Owner decision (21 Oct 2026): prepare and document; activate only on explicit approval.

## What the audit found (checked 21 Oct 2026)

- `/en/work/*`, `/en/case-studies` and the sitemaps are sent with `Cache-Control: private, no-cache, no-store`, and Cloudflare does not cache HTML unless a Cache Rule says so.
- Root cause on the origin: every page route renders per request because `src/app/[lang]/not-found.tsx` calls `headers()`. A local build without that call left only 45 routes dynamic (433 before). That is a site-wide change, so it was **not** applied (see `uncertainty-ledger.csv`). Until it is, an edge cache must override the origin header; origin-respecting rules will not cache anything.

## Hazards that the rule must avoid

| Hazard | Why it matters | How the rule avoids it |
|---|---|---|
| **Country block bypassed** | `src/proxy.ts` returns 403 to visitors from IN and NG on every request. A cache HIT never reaches the Worker, so those visitors would be served the page. | The rule only applies when `ip.geoip.country` is not IN or NG; those requests go to the Worker as today. (Alternative: move the block into a WAF custom rule, a separate approved change.) |
| **Forms** | Quote, contact and careers forms POST to `/api/*`. | The rule matches page paths only, GET only. POST and `/api/*` are never cached. |
| **Auth / admin** | `/admin` redirects to dashboard.themarkitmedia.com; `/api/admin/*` is `no-store`. | Not in the rule's path list; add `not starts_with(path, "/admin")` as a belt-and-braces condition. |
| **Dynamic content** | The work pages are the same for every visitor (no cookies, no personalisation). Cookie consent is client-side. | Limit to the listed paths; bypass if a request carries a session cookie (see expression). |
| **Stale after publish** | Edge TTL could show old content after a release. | Purge the listed paths on every deploy (already part of the release routine) and keep the TTL short. |
| **Query strings** | `?utm=` variants would each be cached separately. | Cache key ignores query string for these paths. |

## Proposed Cache Rule (dashboard: Caching > Cache Rules > Create rule)

Name: `Case studies and sitemaps: edge cache`

Expression:

```
(http.host eq "themarkitmedia.com"
 and http.request.method eq "GET"
 and (
      starts_with(http.request.uri.path, "/en/work")
   or http.request.uri.path eq "/en/case-studies"
   or starts_with(http.request.uri.path, "/sitemaps/")
   or http.request.uri.path eq "/sitemap-index.xml"
 )
 and not starts_with(http.request.uri.path, "/admin")
 and not http.cookie contains "session"
 and not ip.geoip.country in {"IN" "NG"})
```

Settings:

- Cache eligibility: **Eligible for cache**
- Edge TTL: **Override origin**, 4 hours (use 1 day only once the not-found fix makes the origin send cacheable headers)
- Browser TTL: **Respect origin** (stays `no-store`/revalidate for browsers)
- Cache key: **Ignore query string**
- Serve stale while revalidating: on

## Crawler Hints / IndexNow

- Dashboard: Caching > Configuration > **Crawler Hints** > On (free). It tells Bing, Yandex and other IndexNow participants when cached content changes, so it only does something once the rule above is active.
- The site already has an IndexNow key file (`public/7aa4ced658fdb7bccfcb099b1917c486.txt`) and the 44 work URLs were submitted manually on 17 Oct 2026.

## Verify after activation (and how to roll back)

1. `curl -sI https://themarkitmedia.com/en/work/elite` twice: second response must show `cf-cache-status: HIT`.
2. From a request with `CF-IPCountry: IN` (or a VPN exit in India): must still return the Worker's 403, `cf-cache-status` not HIT.
3. `curl -sI -X POST https://themarkitmedia.com/api/contact` must stay uncached (`cf-cache-status` absent or DYNAMIC).
4. Submit the quote form on a case-study page; confirm the lead arrives.
5. Rollback: disable (not delete) the rule in the dashboard; then purge the same paths. No code change is involved.

## Not requested, not done

- No change to the existing Cloudflare image-resizing, Zaraz, WAF or DNS settings.
- `media.themarkitmedia.com` (R2 images, `cf-cache-status: DYNAMIC`) could use its own "Cache Everything" rule; noted on 19 Oct, still needs a separate approval.
