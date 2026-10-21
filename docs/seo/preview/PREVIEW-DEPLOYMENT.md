# Secure preview deployment: configuration prepared, NOT deployed

Owner decision (21 Oct 2026): do not push or deploy yet; prepare a preview configuration that exposes no credentials, no production database and no sensitive internal information. A future preview must be **isolated, non-indexable and access-controlled.**

## What "isolated" means here

| Concern | Production | Preview (this template) |
|---|---|---|
| Worker name | `markit-media` | `markit-media-preview` (separate Worker, separate versions list) |
| Database | `markit-media-db` (leads, rate limits, blog) | a new, empty D1 database; blog and form routes simply fail there |
| Secrets (Mongo, email, admin JWT) | set on the production Worker | **none are set**, so forms, admin, dashboards and email cannot work and cannot touch real data |
| Cache | R2 `markit-media-cache`, D1 tag cache | its own empty R2 bucket and D1 |
| Cron | daily job | removed |
| Analytics / ads | GTM id, Meta Pixel, Zaraz (zone) | no GTM id; workers.dev is outside the zone, so Zaraz does not run |
| Images | public media host (read only) | same public host, read only |

Note: a "preview version" of the **production** Worker (`wrangler versions upload`) shares production bindings and secrets, so it is NOT used for this.

## Non-indexable

1. Build with `PRODUCTION_DEPLOY` unset or not `true`. The site then serves `robots.txt` with `Disallow: /`, `<meta name="robots" content="noindex, nofollow">` and (new in this branch, `next.config.ts`) `X-Robots-Tag: noindex, nofollow, noarchive` on every response.
2. Do not submit the preview URL anywhere and do not link to it from a public page.

## Access-controlled

Use Cloudflare Access (Zero Trust), which sits in front of the Worker, so unauthenticated requests never reach it:

1. Zero Trust > Access > Applications > Add a self-hosted application.
2. Application domain: the preview hostname (`markit-media-preview.<account-subdomain>.workers.dev`, or a custom subdomain such as `preview.themarkitmedia.com` once DNS is approved).
3. Policy: Allow, include only the owner's email address (one-time PIN login). Default action: deny.
4. Session duration 24 hours. Turn on "Enable Cloudflare Access" for the Worker's workers.dev route in the Worker's settings.
5. Verify from a private browser window and with `curl -I`: expect a 302 to the Access login, never page content.

## Build and deploy steps (for later, each needs approval; none was run)

```
CIRCLE_NODE_TOTAL=2 npx @opennextjs/cloudflare build           # PRODUCTION_DEPLOY unset
cp docs/seo/preview/wrangler.preview.jsonc.example wrangler.preview.jsonc   # fill the two <...> placeholders
npx wrangler deploy --config wrangler.preview.jsonc
```

(Local builds need about 4 GB for the OpenNext step; use the remote GitHub Actions build described in the project notes if the 25% memory cap would be exceeded.)

## Tear-down

`npx wrangler delete --name markit-media-preview`, delete the preview D1 and R2 bucket, and remove the Access application. Nothing in production is touched at any point.

## Checks before sharing the URL

- Access login required (302), then content visible only after login.
- `curl -I` shows `x-robots-tag: noindex, nofollow, noarchive` and `/robots.txt` is `Disallow: /`.
- Submitting a form shows an error and creates nothing (no secrets exist there).
- No cookie banner, tag manager or pixel requests in the network panel.
