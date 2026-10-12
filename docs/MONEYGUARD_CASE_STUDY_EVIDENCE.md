# MoneyGuard portfolio evidence

Reviewed 12 October 2026. The public case study now leads with the web product;
the earlier pipeline's detailed architecture and privacy account remain in an
accessible native disclosure below it.

## Source boundary

Local `moneyguard-web` main was `09f44e351ad3332f0fa73be7b889a479ce40532e`.
GitHub API revealed newer remote main
`79848c197f0131244f4f92a05c4c4570c5618793`, containing merged PRs #42 (owner
Real AI) and #44 (delayed-payday comparison). Changed source and test files were
read at that exact remote SHA without fetching into or modifying the checkout.

GitHub metadata confirms the web repository is private. The public CTA remains
`https://github.com/liuyuelintop/moneyguard-pipeline`, now explicitly labelled
as the **earlier pipeline**, not the web product's source. Pipeline technical
claims and their limitations are preserved from the existing evidence review.
No source tests were rerun and no web deployment was observed in this refresh.

## Current web claims

Paths below refer to remote `79848c1` (unchanged core also inspected locally).

| Claim | Source |
| --- | --- |
| Deterministic wage/burn/surplus and cost-to-paid-hours comparisons | `src/features/audit/audit-calculations.ts`, `src/components/app/WeeklyPlanningTools.tsx` |
| Hourly value may fall back to gross wage/hours; no tax or take-home guarantee | `audit-calculations.ts` `netHourlyValue` calculation |
| Integer-cent cash-flow forecast; expenses deducted before optional deposit; pre-deposit low point determines status | `src/features/pay-cycle/pay-cycle-forecast.ts`, adjacent tests |
| Expected/delayed payday use the same forecast; added expenses only in delay interval | `buildPayCycleDelayComparison` in the same module; tests covering status divergence and deposits not erasing shortages |
| Saved base plan versus session-only delay comparison | `src/components/app/PayCyclePlanner.tsx`, `src/features/pay-cycle/pay-cycle-plan.schemas.ts`, storage adapters |
| Audit history in browser IndexedDB; validated JSON export/import excludes images/raw OCR | `src/features/audit/audit-storage.dexie.ts`, `audit-export.ts` and tests |
| Owner AI sends selected metrics and an explicitly consented free-text question (1–500 characters) | `audit-ai-payload.ts`, `audit-ai.schemas.ts`, `audit-ai-prompt.ts`, `src/components/app/AuditChatPanel.tsx` |
| Question text may itself disclose personal information | Free-text is transmitted, not redacted; masking the audit object does not sanitize user-authored text |
| AI restricted to local development or protected Vercel Preview, disabled on Vercel production | `audit-ai-environment.ts`, `src/app/api/audit/explain/route.ts` and rejection tests |
| Public fixture configuration disables real OCR and AI | `src/components/app/WorkspacePrivacyNotice.tsx`, `docs/PORTFOLIO_DEMO.md`; not proof of a presently observed deployment |

## Visual and publication boundaries

The homepage figure (`WORK_FIGURES.timecard` in `src/constants/work.js`, rendered
by `ReceiptFigure`) is a
code-authored illustration of the public pipeline: the mock-run report as a
receipt, where each line can be traced back to whoever wrote it (photo, vision
OCR, schema check, calculation, local ledger, minimised payload, audit model),
with the crossing between code and a model marked, and an optional misread of
the hours as 380 that stops at the schema check with the pipeline's own message. It replaced the static
`moneyguard-planning.svg` diagram in the October 2026 redesign. Its claims trace
to `liuyuelintop/moneyguard-pipeline` as read on 13 October 2026:

- The Telegram transport is `examples/telegram/adapter.ts`, described in the
  README as the original bot transport; the CLI is `src/cli/main.ts`.
- `VisionResultSchema.totalHours` is `z.coerce.number().positive().max(168)`
  (`src/schemas.ts`), so `"38"` is coerced and `380` is rejected.
- On a failed `safeParse`, `runMoneyGuardPipeline` returns before
  `computeMetrics`, `buildAuditPayload` or the audit provider run, with the
  message "Could not pinpoint the 'Running Total'. Try a clearer shot."
  (`src/pipeline.ts`).
- The sample figures (38 hrs, $950.00, $552.38, $397.62, STABLE) are the mock-run
  report already quoted in the case study.

- `buildAuditPayload(metrics, ocr, finance.context)` composes the audit payload;
  the case study already states that ledger line items and the raw role string
  are not part of it. The figure says "minimised", not private or anonymous.
- The report step shows the mock-run layout with a placeholder for the model's
  prose; no model prose is invented.

The caption states that the sample figures are the pipeline's mock run on a
sample ledger and that it is not the product interface. No live-provider result is
shown. The old pipeline cover is retained but no longer imported.

No public-source, user-adoption, financial-advice accuracy, current deployment or
live-model quality claim is added. Browser-local storage is not represented as
cloud sync, encryption or a durable backup. The earlier pipeline's aggregate
payload remains explicitly **not anonymous**.
