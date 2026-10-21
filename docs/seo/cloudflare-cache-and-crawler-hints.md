# Cloudflare caching and Crawler Hints: preparation only

Status: **PREPARED, NOT ACTIVATED.** No Cloudflare setting has been changed. Owner decision (21 Oct 2026): prepare and document; activate only on explicit approval.

## What the audit found (checked 21 Oct 2026)

- `/en/work/*`, `/en/case-studies` and the sitemaps are sent with `Cache-Control: private, no-cache, no-store`, and Cloudflare does not cache HTML unless a Cache Rule says so.
- Root cause on the origin: every page route renders per request because `src/app/[lang]/not-found.tsx` calls `headers()`. In a tested local build without that call (and with the pages that need D1 or request-time data kept dynamic) 618 route entries prerender and 230 stay dynamic (433 dynamic before). That is a site-wide change: it is prepared as an isolated branch with its own regression report and was **not** applied here. Until it is, an edge cache must override the origin header; origin-respecting rules will not cache anything.

## Hazards that the rule must avoid

| Hazard | Why it matters | How the rule avoids it |
|---|---|---|
| **Country block bypassed** | `src/proxy.ts` returns 403 to visitors from IN and NG, but only for pages: the proxy does not cover `/api/*`, `/robots.txt` or the sitemaps. A cache HIT never reaches the Worker, so cached pages would be served to those countries. | Excluding IN and NG in the cache rule is **defence in depth only, not the control** (see "Country restriction must not depend on the cache" below). The control is a WAF custom rule. |
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


## Country restriction must not depend on the cache (owner requirement, 21 Oct 2026)

Excluding India and Nigeria from the cache rule does not prove the geographic block cannot be bypassed: it only stops those requests from being served *from this rule's cache*. The block has to be enforced by something that runs before any cache and that no application cache can skip.

**Proposed control (documentation only, not created):** a Cloudflare WAF custom rule on the zone.

- Expression: `ip.geoip.country in {"IN" "NG"}` (add `and not starts_with(http.request.uri.path, "/api/")` only if the owner wants forms left open, which is the case today).
- Action: Block. Where the owner prefers the current behaviour (a plain 403 page from the Worker), use Block with a custom response.
- Why it holds: Cloudflare runs WAF custom rules before Cache Rules in its phase order, and a request stopped by a terminating custom rule never reaches the cache ([phases list](https://developers.cloudflare.com/ruleset-engine/reference/phases-list/), [cache and WAF](https://developers.cloudflare.com/cache/interaction-cloudflare-products/waf-snippets/)). The docs describe the order, and they do not state in so many words that a cached object is re-checked on every request, so this is verified by test, not assumed.
- Things that could still bypass it, to check: an IP Access rule with Allow (runs earlier), a URL rewrite or transform rule that changes the path before the custom rule is evaluated, and a Skip action on the rule.
- Keep `src/proxy.ts` as the second layer.

**Gaps in today's control** (found in the local test): `/api/*`, `/robots.txt` and the sitemaps are not covered by the proxy, so blocked countries can still submit forms and read the sitemaps. Decide whether that is intended; if not, extend the WAF rule rather than the cache rule.

**Test plan after approval, on the isolated preview Worker first, then production:**
1. Cloudflare's Trace tool (Security > Trace) with country set to IN and NG, for `/en`, `/en/work/elite`, `/en/blog`, `/api/contact`, `/robots.txt`: must show the custom rule as the terminating phase and no cache phase.
2. Request the same pages once from an allowed country so they are cached, then request again from IN or NG (a VPN exit, or Trace with a spoofed country): expect the block, not a cache HIT. `CF-IPCountry` cannot be spoofed by header on Cloudflare, so a header test is not valid evidence.
3. Security > Events must log the blocks with no `cf-cache-status`.
4. Confirm US and PK visitors still get the pages.
