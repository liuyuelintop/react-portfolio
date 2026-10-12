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

`public/images/moneyguard-planning.svg` is a code-authored implementation diagram,
not a screenshot or financial forecast. It contains no records or invented
performance figures. The old pipeline cover is retained but no longer imported.

No public-source, user-adoption, financial-advice accuracy, current deployment or
live-model quality claim is added. Browser-local storage is not represented as
cloud sync, encryption or a durable backup. The earlier pipeline's aggregate
payload remains explicitly **not anonymous**.
