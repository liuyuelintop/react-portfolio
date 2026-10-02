# Marshal portfolio evidence

Reviewed 2 October 2026. Placement: first in Selected Work and a dedicated
`/work/marshal/` case study.

## Source boundary

Repository: `liuyuelintop/marshal` (private, MIT `LICENSE` committed).
Reviewed local main: `5230d26` ("Slice 16c: due queue pipeline panel and 1.0
journeys"), clean working tree. The first commit is dated 29 September 2026.

The source README states the project is pre-alpha, and the page says so. The
public portfolio emits no private repository CTA, and does not call the project
open source while the repository is private.

Paths below refer to the source repository at that commit.

| Portfolio claim | Source files |
| --- | --- |
| Clean-room successor to the Mac-only prototype; concepts carried over, no code or data | `docs/ARCHITECTURE.md` (introduction, D1) |
| Goals: phone use away from the laptop; friends self-host without trusting another server | `docs/ARCHITECTURE.md` §1, §9 "Friends: self-hosting", D2 |
| Paste-only capture, 50,000 character cap, source link kept as text | `README.md`, `docs/ARCHITECTURE.md` D16, `docs/SPEC_PHONE_TRIAGE.md` |
| Triage quotes each requirement and rejects quotes not found in the ad; owner-recorded hard requirements are decided by code and not sent to the model | `docs/SPEC_TRIAGE.md`, `docs/ARCHITECTURE.md` §4, D11, D13 |
| Pursue / explore / clarify / skip decision; drafting only for pursue and explore | `docs/ARCHITECTURE.md` D21, `docs/SPEC_TRIAGE.md` |
| Letter plan computed from triage; per-sentence check of numbers and names against cited facts | `docs/ARCHITECTURE.md` D17, D18, `docs/SPEC_FACT_CHECK.md` |
| Audit required unless waived, waiver recorded, owner acceptance | `docs/ARCHITECTURE.md` D20, `docs/SPEC_AUDIT_STEP.md` |
| One-page A4 letter and two-page A4 résumé rendered by headless Chromium with network blocked; stale downloads refused | `docs/SPEC_PDF.md`, `docs/ARCHITECTURE.md` §8, roadmap slices 15a–15c |
| Four-step board, due queue, append-only status history | `docs/ARCHITECTURE.md` §3.2, D23, D24, `docs/SPEC_PIPELINE.md` |
| Single-tenant by design; no account system | `README.md` design principles, `docs/ARCHITECTURE.md` D2 |
| Loopback-only publish, Tailscale Serve, no public port | `docker-compose.yml`, `docs/ARCHITECTURE.md` §9, D3 |
| Revisioned save/load, conflict instead of overwrite, last 20 revisions kept | `docs/SPEC_USER_STATE.md`, `docs/ARCHITECTURE.md` §6, D4 |
| Server-side projection removes unconfirmed, out-of-scope or expired claims before prompt assembly; confirmation resets when a claim's content changes | `docs/ARCHITECTURE.md` §3.1, §4, D7, D10 |
| One Compose command locally; VPS script; backup and restore with optional encryption | `docs/SELF_HOSTING.md`, `deploy/marshal-vps.sh`, `deploy/backup.sh`, `deploy/restore.sh` |
| Bring-your-own-key for Anthropic or OpenAI-compatible endpoints, key held server-side | `docs/SPEC_MODEL_GATEWAY.md`, `docs/ARCHITECTURE.md` D6, D8, D15 |
| JSON files in one data directory | `README.md`, `docs/ARCHITECTURE.md` §6, D5 |
| Fictional examples only; secret scan over full history on every push | `README.md` privacy section, `.gitignore`, `.github/workflows/ci.yml` |
| e2-micro in Sydney; about 55 MiB idle and about 150 MiB during a two-page render | `docs/DEPLOY_GCP.md` |
| Non-root container with read-only root filesystem; one render at a time | `docker-compose.yml`, `docs/ARCHITECTURE.md` §8, §9 |
| Real iPhone check over Tailscale, 30 September 2026 | `docs/ROADMAP.md` slices 3 and 4b (owner-reported) |

## Verification figures

- `.github/workflows/ci.yml` runs typecheck, `npm test`, `npm run test:e2e`, the
  Docker PDF check and a gitleaks scan on every push. `gh run list` showed the
  run for `5230d26` (2026-10-01T23:47Z, 2 October AEST) completed successfully.
- `docs/ROADMAP.md` status table, slice 16c: unit/contract 220/220, typecheck
  clean, e2e 58/58.
- A local `npm test` on 2 October 2026 reported 220 tests, 210 passing; the 10
  failures were PDF checks that need Poppler, which is not installed on the
  local Mac and is installed in CI. The page therefore cites the CI run and the
  roadmap record rather than a local run.

## Screenshot

`src/assets/projects/marshal.webp` is composed from two captures written by the
source repository's browser journeys into its git-ignored `out/e2e/` directory:
`desktop-pipeline-board.png` (cropped) and `phone-pipeline-applied.png` (top of
the capture, scaled). They are placed side by side on a plain background with a
border; no interface element was drawn or edited. All roles and companies in
the captures are the journeys' fictional fixtures. The homepage caption and the
case study both disclose this.

## Not claimed

No adoption, conversion or time-saving figure. No statement that anyone other
than the owner has self-hosted it. No live-model quality claim. The sharing
path is described as designed and documented, not as proven by other users.
