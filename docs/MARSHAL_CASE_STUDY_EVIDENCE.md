# Marshal portfolio evidence

Reviewed 12 October 2026. This supersedes the 2 October source snapshot and its
retired workflow claims. The previous record remains in Git history.

## Source and release boundary

- Private repository `liuyuelintop/marshal`.
- Merged `main`: `67379b5368dd5f911a58045881f9cb50b8f87113`, confirmed via GitHub
  API as well as local refs. Its GitHub Actions run concluded `success`.
- The active checkout was on `work/triage-repair` at `cc7d697`, with changing
  uncommitted triage edits during the investigation. That branch was unmerged at entry; main subsequently advanced to `dcb0e7a`
  during the task. The case study deliberately remains pinned to `67379b5`.
  Neither the newer triage work nor dirty work supports the public claims here. Source reads used merged main.
- Source tests were inspected, not executed. Earlier 220/58 counts were removed:
  they described `5230d26`, not the current implementation.
- Earlier GCP/iPhone deployment records remain historical. The current deployed
  SHA, current live-provider quality and off-machine restore rehearsal were not
  verified. Successful CI does not establish any of those results.

## Claim map at the merged SHA

| Public claim | Source / verification boundary |
| --- | --- |
| Assessment is optional; letter and résumé generate independently without audit/waiver/Accept | `domain/draft-step.ts`, `domain/materials.ts`, `server/draft-step.ts`, `server/resume-step.ts`, `web/src/jobs/MatchReference.tsx`; `test/materials.contract.test.ts` MC1/MC2 |
| Editing, failed second generation, retry and concurrent edits preserve work | `web/src/jobs/Draft.tsx`, `web/src/jobs/Resume.tsx`, `test/e2e/materials.e2e.ts` ME1–ME3 |
| Debounced autosave, local recovery, stale-revision conflicts, atomic writes and 20 retained revisions | `web/src/App.tsx`, `web/src/sync/use-sync.ts`, `server/stores/revisioned-put.ts`, `server/stores/revisioned-document.ts` |
| Only confirmed/current/permitted/unexpired claims enter the relevant model step | `domain/profile.ts`, `domain/ai-inputs.ts` |
| Bounded citation/numeric validation and export permission/guard checks | `domain/draft.ts`, `domain/materials.ts`, `server/draft-step.ts`, `server/resume-step.ts`, `server/render.ts`; not semantic verification of every sentence |
| Supported SEEK/LinkedIn fetching, editable preview and paste fallback | `domain/capture.ts`, `server/capture/index.ts`, `web/src/jobs/AddJobDialog.tsx`, `test/e2e/capture.e2e.ts`; no live extraction claimed |
| Loopback-bound single-owner Compose service, Tailscale recipe | `docker-compose.yml`, `docs/SELF_HOSTING.md`; intended deployment configuration, not a current VPS observation |
| Earlier owner GCP deployment and phone check | `docs/DEPLOY_GCP.md`, historical entries in `docs/ROADMAP.md`; explicitly historical |
| Live-model quality and deployment still need separate checks | `docs/ROADMAP.md` r11; off-machine backup rehearsal also noted in `docs/SELF_HOSTING.md` |

## Editorial decision

Lead with removing a compulsory chain of AI and approval steps. This demonstrates
product judgement while making the retained integrity boundaries concrete. Do
not describe the removed pursuit/time-budget/audit/Accept flow as current, or
claim that fewer gates establish improved application outcomes.

The public case study names a short baseline SHA for auditability but has no
private repository link, personal record, prompt, credential or applicant data.

## Visual

`public/images/marshal-workflow.svg` is a code-authored implementation diagram,
explicitly labelled as not a product screenshot in the image, caption and alt
text. It replaces the previously bundled AI-generated cover, whose pursuit and
time-budget motifs no longer describe the merged product. The old asset is
preserved in the repository but is no longer imported into the site.
