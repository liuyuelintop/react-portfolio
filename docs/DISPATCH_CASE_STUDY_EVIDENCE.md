# Job Search Dispatch portfolio evidence

Reviewed 8 September 2026. Placement: first in Selected Work, a dedicated
`/work/job-search-dispatch/` case study, and two evidence examples in How I Build.
Employment history is unchanged because this is a personal project.

## Source boundary

Repository: `liuyuelintop/job-search-dispatch-browser-bridge` (private, confirmed
through GitHub). Local HEAD and GitHub main both resolved to
`cf4f52f0572d9c240fa13856e0fd454a76c09fe0`.

The reviewed source is an isolated `git archive` of that commit. Uncommitted
percentage-support work in the source checkout is excluded. `PROJECT_STATUS.md`
predates the newer verifier and numeric-support changes; current committed code
and `app/README.md` take precedence for those claims. No source-project files were
changed. The portfolio deliberately emits no private repository CTA.

Paths below refer to that source commit. Reviewers with repository access can
inspect the [pinned tree](https://github.com/liuyuelintop/job-search-dispatch-browser-bridge/tree/cf4f52f0572d9c240fa13856e0fd454a76c09fe0).

| Portfolio claim | Source files |
| --- | --- |
| Developed from an AI-generated React MVP; local runner with CDN React/Babel | `app/README.md`, `app/index.html` |
| Matching open-tab SEEK capture; public LinkedIn request and bridge fallback; no crawling or submission | `app/extension/README.md`, `app/extension/manifest.json`, `app/extension/background.js`, `app/extension/job-extractor.js`, `app/server.mjs`, `app/job-search-dispatch.jsx` |
| Ticket workflow, human route choice, queues, editable letters and manual submission | `app/job-search-dispatch.jsx`, `app/pipeline-attention.test.mjs`, `app/ticket-recovery.test.mjs` |
| Confirmed and scoped evidence; fragment references and triage-match intersection | `app/evidence-policy.js`, `app/cover-letter-prompt.js`, `app/evidence-policy.test.mjs` |
| Writer, verifier, deterministic checks, at most one repair, fixed review credential | `app/cover-letter-production.js`, `app/cover-letter-review.js`, `app/cover-letter-production.test.mjs` |
| Numeric support comes from cited paragraph evidence claims, not job-ad numbers; exact token matching is not semantic proof | `app/cover-letter-prompt.js` (`deterministicChecks`), `app/cover-letter-number-support.test.mjs` |
| Failed-letter stage, blocking checks, numeric sentence findings and previous-letter preservation | `app/cover-letter-diagnostics.js`, `app/cover-letter-diagnostics.test.mjs`, `app/job-search-dispatch.jsx`, `app/failed-receipt.test.mjs` |
| Server deadlines, upstream cancellation, trace diagnostics | `app/server.mjs`, `app/operation-lifecycle.js`, `app/model-call.test.mjs` |
| External profile, owner-only storage, backups; browser-local keys and tickets; provider-bound prompts | `app/canonical-assets.mjs`, `app/job-search-dispatch.jsx`, `app/server.mjs`, `app/README.md` |
| Capped 50-attempt history, no full prompts/keys in records, estimated rather than invoiced costs | `app/generation-log.js`, `app/generation-log.test.mjs`, `app/cover-letter-transparency.test.mjs` |
| Fixture mode blocks model calls and persistent writes | `app/fixture-data.js`, `app/fixture-isolation.test.mjs`, fixture guards in `app/job-search-dispatch.jsx` |

## Verification and screenshot

- Ran `npm run verify` in the isolated source snapshot's `app/` directory:
  **210 tests passed, 0 failed, 0 skipped**. Initial sandboxed execution could not
  bind loopback test servers; the unrestricted rerun passed.
- Captured `src/assets/projects/job-search-dispatch.png` from the running snapshot
  on loopback port 4176 with `?fixture=1&view=pipe`. Used a disposable external data
  root and an isolated browser. The screenshot retains the visible FIXTURE ON
  badge; the homepage caption also identifies synthetic data.
- Screenshot companies, numbers and scores are fixtures, not product results.
- No provider calls, real application submissions or live SEEK/LinkedIn bridge
  checks were performed for this portfolio update. No adoption, conversion or
  time-saving metrics are asserted.

## Portfolio verification

- `npm run lint`: passed with zero warnings.
- `npm run verify` / default `npm run build`: Turbopack failed while binding a
  local port for its CSS worker, including the direct unrestricted retry.
- `npm run build -- --webpack`: passed; all five case-study routes exported.
- `npm run verify:static`: passed, including Dispatch's metadata, private-source
  boundary, synthetic-data disclosure, sitemap and unsupported-claim checks.
- `npm run verify:journeys`: 23 passed, 3 existing conditional skips. Dispatch is
  included in no-JavaScript rendering, entry/return navigation and the responsive
  width matrix.
- Manual `npm run dev` review: desktop and 390 px homepage/case-study layouts,
  image loading, case-study entry and return. No horizontal overflow at 390 px.

No build configuration was changed to work around the Turbopack environment
failure. This update is local and has not been deployed.
