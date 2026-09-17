# Job Search Dispatch portfolio evidence

Reviewed 17 September 2026. Placement: first in Selected Work, a dedicated
`/work/job-search-dispatch/` case study, and two evidence examples in How I Build.

## Source boundary

Repository: `liuyuelintop/job-search-dispatch-browser-bridge` (private).
Reviewed local main: `f2a75dd7a077f18d40abcfacbbccefe05cd88067`, the accepted
Dispatch UI v1 implementation following the Vite/TypeScript migration.

The source was exported with `git archive` into an isolated temporary directory.
Untracked migration bundles, research documents and audit screenshots in the
user checkout were excluded. No source-project files or personal data changed.
The current code and accepted UI verification take precedence over stale
"future UI" wording still present in the source README. The public portfolio
emits no private repository CTA.

Paths below refer to the [pinned source tree](https://github.com/liuyuelintop/job-search-dispatch-browser-bridge/tree/f2a75dd7a077f18d40abcfacbbccefe05cd88067), accessible only to repository collaborators.

| Portfolio claim | Source files |
| --- | --- |
| React/Vite frontend, strict TypeScript application/server, JavaScript extension, shared Zod contracts | `app/package.json`, `app/tsconfig.json`, `app/frontend/main.ts`, `app/shared/contracts/`, `app/extension/manifest.json` |
| Jobs / My profile / Settings; ticket sections and separate document reading/editing | `app/src/shell/App.tsx`, `app/src/features/ticket/Ticket.tsx`, `app/src/features/assets/Assets.tsx`, `docs/verification/ui-v1/README.md` |
| Creation ordering, progress, contextual continuation, filters and no required APPLY choice | `app/src/features/pipeline/Pipeline.tsx`, `app/src/domain/jobs/pipeline.ts`, `app/pipeline-attention.test.mjs` |
| Matching open-tab SEEK capture; public LinkedIn request and bridge fallback | `app/extension/README.md`, `app/extension/background.js`, `app/server/fetch-url.ts` |
| Confirmed, scoped evidence and fragment references | `app/src/domain/evidence/policy.ts`, `app/src/core/cover-letter-prompt.ts`, `app/evidence-policy.test.mjs` |
| Writer-only default; optional Verifier/Repair, independent role routes, frozen run configuration and at most three calls | `app/src/core/cover-letter-settings.ts`, `app/src/core/cover-letter-production.ts`, `app/src/features/ticket/cover-letter-action.ts`, `app/cover-letter-role-controls.test.mjs` |
| Numeric and percentage support comes from cited evidence, with quantity/unit matching | `app/src/core/cover-letter-prompt.ts`, `app/cover-letter-number-support.test.mjs`, `app/cover-letter-percent-support.test.mjs` |
| Failed-generation diagnostics, preserved saved letters, timeout and cancellation | `app/src/core/cover-letter-diagnostics.ts`, `app/src/core/operation-lifecycle.ts`, `app/server/chat.ts`, `app/server/providers.ts`, `app/model-call.test.mjs` |
| External owner-only profile storage, browser-local tickets/keys, serialized profile writes and persisted compatibility | `app/server/canonical-assets.ts`, `app/src/state/`, `app/src/lib/persistence/`, `app/README.md` |
| Production startup rejects stale/missing output; no CDN runtime | `app/build-vite.mjs`, `app/vite-build-state.ts`, `app/server/frontend.ts`, `app/frontend/index.html` |
| Capped 50-attempt history, no prompts/keys in records, estimated costs | `app/src/core/generation-log.ts`, `app/generation-log.test.mjs` |
| Built-in fixture isolation and visible demo disclosure | `app/src/core/fixture-data.ts`, `app/src/shell/App.tsx`, `app/fixture-isolation.test.mjs` |

## Fresh source verification and screenshot

Executed on the isolated committed snapshot, 17 September 2026:

- `npm run verify`: strict typecheck and 104 JavaScript syntax checks passed;
  **371 tests passed, 0 failed, 0 skipped, 0 cancelled**.
- `npm run build`: passed; existing bundle-size advisory remains.
- `node --test scripts/dispatch-ui-v1.browser.mjs`: **3 passed**, no failures,
  skips or cancellations, at 1440 / 390 / 320 px. The production-browser harness
  uses disposable Canonical storage and fictional records; no live model calls.
- Screenshot `src/assets/projects/job-search-dispatch.png`: freshly captured at
  1440 × 810 from the production bundle, `?fixture=1&view=pipe`, with a disposable
  data root and browser context. The visible "Demo data · nothing is saved"
  banner and homepage caption disclose synthetic data. No fabricated UI or
  real applicant data is included.
- Initial sandbox checks could not bind loopback ports; an unrestricted rerun
  passed. Dependencies were copied into the temporary snapshot before the final
  checks, avoiding writes to the source checkout's dependency cache.

Logs for this session: `/private/tmp/dispatch-portfolio-refresh/source-verify.log`,
`source-build.log`, `source-ui.log`, and `capture.log`. These are temporary local
execution records, not permanent repository artifacts.

No live-provider, live SEEK/LinkedIn extraction, real extension or full source
release-gate claim is made. No adoption, conversion or time-saving metrics are
asserted. The separate Profile v2 experiment remains parked.

## Portfolio verification

- `npm run lint`: passed with zero warnings.
- `npm run verify`: lint passed; default Turbopack build hit the existing local
  CSS-worker port restriction, including with tool escalation.
- `npm run build -- --webpack`: passed; all five case studies exported.
- `npm run verify:static`: passed after refreshing the expected Dispatch copy
  and stack; existing private-source and unsupported-claim guards remain.
- `npm run verify:journeys`: 23 passed, 3 existing conditional skips.
- `npm run dev -- --webpack`: inspected the refreshed card and case study at
  1440 and 390 px. Images loaded, navigation worked, and no horizontal overflow
  or browser page errors were observed.

No build/deployment configuration was changed. The existing GitHub/Vercel
integration publishes main; GitHub checks and deployment status record the
cloud result for the resulting portfolio commit.
