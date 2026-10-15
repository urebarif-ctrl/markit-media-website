# Release and rollback runbook (Cloudflare Workers via OpenNext)

Status: **prepared, not exercised.** Nothing here has been run against production.

## Principles
- Production changes happen only from the **Release to Cloudflare** workflow, started by a person.
- No workflow deploys on push, merge or pull request.
- A required reviewer must approve the `production` environment before the deploy job runs.
- Builds run on GitHub-hosted runners (the maintainer host cannot fit the OpenNext build in its memory budget).

## One-time owner setup (not done by this PR)
1. Settings > Environments > **New environment `production`**; add yourself (or another person) as **Required reviewer**; restrict deployment branches if desired.
2. Add **environment secrets** to `production`:
   - `CLOUDFLARE_API_TOKEN` (least privilege: Workers Scripts:Edit for account; Workers Routes if used; D1/R2 only if the deploy needs them)
   - `CLOUDFLARE_ACCOUNT_ID`
3. Settings > Branches: protect `main` (require pull request and the `Build Check` status).
4. Keep Vercel disconnected from this repository to avoid duplicate build status checks.

No secret values live in the repository. The workflows reference secret **names** only.

## Releasing
1. Merge reviewed changes to `main` (PRs run `Build Check`).
2. Actions > **Release to Cloudflare (manual, approval-gated)** > Run workflow: `ref` = `main` (or a tag/SHA), `confirm` = `DEPLOY`.
3. The workflow: type-checks, builds with `opennextjs-cloudflare`, uploads the build as an artifact, waits for reviewer approval, records the currently deployed version, deploys with `--var GIT_SHA:<commit>`, and smoke-tests `/en`, `/en/contact`, `/en/services`, `/sitemap-index.xml`, `/robots.txt` and a missing blog slug (expects 404).
4. Verify: `curl` the pages above; confirm GA4 Realtime still receives events; check Cloudflare > Workers > markit-media > Deployments shows the new version.

## Rolling back
- Fast path: Actions > **Roll back Cloudflare Worker** with the previous version ID (from the `deployment-record-*` artifact or Cloudflare dashboard), `confirm` = `ROLLBACK`.
- Manual path: `npx wrangler rollback <version-id>` with an authorized token.
- Data: D1 has Time Travel (point-in-time restore) for the blog/rate-limit database; R2 and MongoDB are not changed by a code release.
- Settings that are **outside Git** (Zaraz loader, GTM container, Cloudflare zone settings) are not rolled back by a Worker rollback; backups of their last known good state are kept with the audit export.

## Staging / preview (proposal)
Use `wrangler versions upload` to create a Worker version that receives **no production traffic** and has a preview URL, test it, then promote. Preview URLs must stay non-indexable (the app already disallows indexing when `PRODUCTION_DEPLOY` is not `true`). Because previews share production D1/R2/MongoDB bindings, do not exercise form submissions on previews without a separate test dataset.

## Cost and quota review (estimates)
- GitHub Actions is free and unmetered for public repositories. If the repository becomes private, the Free plan includes 2,000 Linux minutes per month; a release is estimated at 10-15 minutes of build plus 2-3 minutes of deploy, so roughly 100+ releases per month fit, plus PR build checks (about 5-8 minutes each).
- Cloudflare Workers deploys do not add direct cost; staging via version upload uses the existing Worker.
- No new paid services are introduced by these workflows.

## Known limits
- The `Build Check` workflow runs a plain `next build` with placeholder variables; the release workflow runs the full OpenNext build. Neither executes end-to-end form tests.
- Rollback restores code and Worker-level settings only.
- The first run should be a dry rehearsal on a non-production Worker name if available.
