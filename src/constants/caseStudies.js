// Single source of truth for case-study copy. The homepage project entry in
// projects.js references this file rather than restating it.
//
// A case study is a title, its metadata, and an ordered `sections` array. Each
// section names a `kind` that app/work/[slug]/page.jsx knows how to render, so
// a study only carries the sections it can actually support — a study of
// someone else's architecture has no "Decisions I can defend" to offer.

const SITE_URL = "https://www.liuyuelin.dev";

// Claims and the synthetic screenshot are traced in docs/DISPATCH_CASE_STUDY_EVIDENCE.md.
export const DISPATCH_CASE_STUDY = {
  slug: "job-search-dispatch",
  title: "Job Search Dispatch",
  summary:
    "A local job-search workspace that turns a captured job ad into an evidence-grounded application draft, with the applicant in control of every decision and submission.",
  ownership: "Built and iterated as a personal project · 2026 · Private source repository",
  metaTitle: "Job Search Dispatch case study | Yuelin Liu",
  metaDescription:
    "How I connected a browser bridge, evidence-scoped drafting and recoverable model operations into a local job-search workflow, with human review before submission.",
  canonical: `${SITE_URL}/work/job-search-dispatch/`,
  sections: [
    {
      kind: "prose",
      id: "problem",
      heading: "The problem: continuity between finding a job and applying",
      paragraphs: [
        "A job-search workflow crosses several disconnected surfaces: the job board, a record of past work, a model conversation, an application draft and a follow-up list. The difficult part is carrying the right facts and decisions between them without losing the original ad or letting a fluent draft overstate the applicant's experience.",
        "I developed Job Search Dispatch from an AI-generated React MVP into an integrated local application. The work spans a Node.js server, a Chrome browser bridge, reusable evidence records, model routing and the review experience. A ticket holds the job, the model's recommendation, the applicant's decision and the resulting materials together.",
      ],
    },
    {
      kind: "steps",
      id: "workflow",
      heading: "One ticket, from capture to review",
      items: [
        {
          step: "01",
          label: "Capture the job the applicant is already reading",
          detail:
            "For SEEK, the extension reads visible metadata and the complete job description from a matching open tab. LinkedIn first tries a credential-free public request, then falls back to the bridge. Imported text remains editable; the applicant confirms whether the ad is still open.",
          source: "Open job tab → browser bridge → editable job ticket",
        },
        {
          step: "02",
          label: "Separate a recommendation from a decision",
          detail:
            "Triage returns structured job details, fit, gaps and an APPLY, NETWORK or SKIP suggestion using confirmed candidate records. The applicant chooses the route. Pipeline queues surface tickets awaiting a decision, drafts in progress and follow-ups due.",
          source: "Confirmed evidence → model suggestion → human route choice",
        },
        {
          step: "03",
          label: "Draft with evidence, then check the result",
          detail:
            "Application drafting uses confirmed evidence explicitly allowed for that purpose. The cover-letter writer is followed by a separate verifier call and deterministic validation. A hard validation failure permits one targeted repair; a result that still fails is not saved as the new letter.",
          source: "Writer → verifier → validation → at most one repair",
        },
        {
          step: "04",
          label: "Keep the last mile human",
          detail:
            "The applicant can inspect paragraph evidence, edit the letter, review model-call details and copy clean text. Submission stays manual. The workspace keeps the ticket and next action available for the follow-up.",
          source: "Review → edit → copy → manual submission",
        },
      ],
    },
    {
      kind: "decisions",
      id: "decisions",
      heading: "Decisions I can defend",
      items: [
        {
          decision: "Read an existing browser tab instead of building a crawler",
          reason:
            "The applicant already has the rendered job page. A narrowly scoped extension can bring that content into the same Fetch from URL flow while preserving an editable full description and a shared trace ID for failures.",
          tradeoff:
            "The extension must be installed and a matching job tab must remain open. It does not open pages, crawl in the background, autofill forms or submit applications.",
        },
        {
          decision: "Make candidate evidence an explicit drafting input",
          reason:
            "Each evidence record carries confirmation, permitted uses and a claim boundary. Triage matches are intersected with confirmed application-draft evidence before entering the cover-letter prompt. Reusable fragments must resolve to that same allow-list.",
          tradeoff:
            "Preparing evidence takes effort. Valid references establish eligibility, not whether every sentence is true; model verification and final human review still have distinct jobs.",
        },
        {
          decision: "Treat model calls as operations that can fail",
          reason:
            "Stage and trace diagnostics, server-owned deadlines and cancellation make a long-running call inspectable. Failed or cancelled attempts preserve existing work. Writer, verifier and optional repair receipts explain which calls ran and what cost information is available.",
          tradeoff:
            "A successful cover-letter run uses two model calls, or three with repair. The fixed Anthropic review route requires its own credential even when the writer uses a custom provider; available cost figures are estimates rather than invoices.",
        },
      ],
    },
    {
      kind: "prose",
      id: "iteration",
      heading: "A concrete iteration: whose number is it?",
      paragraphs: [
        "A job ad can contain numbers that say nothing about the applicant's achievements. The numeric check needed to distinguish a number present in the ad from one supported by the evidence cited in a letter paragraph. I tightened the check so numeric support comes from that paragraph's cited, confirmed application-draft evidence claims, rather than the job description or unrelated profile text.",
        "I also made a failed generation explain its stage and blocking checks instead of leaving the user with a generic failure. Numeric findings identify the paragraph, sentence and unsupported token while keeping the previous saved letter intact. Regression cases cover the source boundary and the failure diagnostics.",
        "This remains a deterministic token check, not a proof of meaning: finding the same number in an eligible claim does not establish that a generated sentence describes it correctly. That distinction is why the verifier and human review remain part of the workflow.",
      ],
    },
    {
      kind: "bullets",
      id: "data-boundaries",
      heading: "Where the data goes",
      items: [
        "Canonical candidate records live in a versioned profile file outside the repository, with owner-only storage and backups. Tickets, provider settings, keys and a capped model-attempt history persist in browser localStorage.",
        "Model calls leave the machine: the local server sends the selected credential and operation-specific job context plus eligible candidate data to the relevant provider. Local storage does not make generation an offline operation.",
        "Prompt builders exclude contact details, raw attachments and full extracted résumé text. Operation-specific evidence selection happens in the browser; it is not a separate server-authoritative projection service.",
        "Attempt history can contain generated personal application text. It retains at most 50 attempts and excludes full prompts and API keys; the user can export or clear it explicitly.",
      ],
    },
    {
      kind: "prose",
      id: "verification",
      heading: "What I verified",
      paragraphs: [
        "For this case study, I ran npm run verify against an isolated copy of the committed source on 8 September 2026: all 210 deterministic tests passed. The suite covers evidence eligibility, provider routing, cancellation and timeout behavior, cover-letter validation, failure receipts and fixture isolation.",
        "The portfolio screenshot shows the running application's built-in synthetic fixture data. Its example companies, ticket counts and fit scores illustrate the interface; they are not real applications or outcome metrics. Fixture mode prevents model calls and persistent writes.",
      ],
    },
    {
      kind: "bullets",
      id: "limitations",
      heading: "Current scope and limitations",
      items: [
        "This is a personal local application with a private source repository. No user-adoption, interview-conversion or time-saved result is claimed.",
        "The verification above does not establish live model quality or re-test SEEK and LinkedIn extraction against current job-board pages. Provider responses and page structures can change.",
        "Later human edits are not semantically re-verified. Every final claim still needs review before the applicant uses it.",
        "There is no automatic submission, cloud sync or résumé upload/parser workflow. React and Babel load from a CDN, so the no-build local runner still needs internet access.",
      ],
    },
  ],
};

export const DSH_CASE_STUDY = {
  slug: "dsh-conversation-exporter",
  title: "DSH Conversation Exporter",
  summary:
    "A DeepSeek Harness Web plugin that exports a full conversation or selected whole turns as clean Markdown for reading, Git and cross-assistant handoff.",
  ownership: "Built and packaged as a DSH Web plugin · 2026",
  metaTitle: "DSH Conversation Exporter case study | Yuelin Liu",
  metaDescription:
    "How DSH Conversation Exporter filters a local Harness session into clean Markdown, keeps selective export bounded, and stays distinct from DSH's official Session Log.",
  canonical: `${SITE_URL}/work/dsh-conversation-exporter/`,
  sourceUrl: "https://github.com/liuyuelintop/dsh-conversation-exporter",
  sourceLabel: "View the source on GitHub",

  sections: [
    {
      kind: "prose",
      id: "problem",
      heading: "The problem",
      paragraphs: [
        "DeepSeek Harness preserves a detailed session record for debugging, recovery and replay. That official Session Log includes raw events, tool activity, metadata and attachments, which is the right boundary for a lossless record but not for a transcript someone wants to read, version in Git or hand to another assistant.",
        "DSH Conversation Exporter adds a separate clean-export path for that second job. It is an additive plugin beside DSH's official Session Log; the official function belongs to DSH and is not functionality I built or replaced.",
      ],
    },
    {
      kind: "prose",
      id: "export-chat",
      heading: "What Export Chat does",
      paragraphs: [
        "Export Chat reads the current session through DSH's local session-query service, keeps the human-authored messages and the final visible assistant answer from each turn, then downloads one Markdown file in the browser. The final usable session title becomes the document heading and filename; message Markdown and Unicode are preserved.",
        "The renderer owns the transcript structure. It labels Human and Assistant sections, closes an otherwise unterminated code fence before the next section, marks an unanswered turn as incomplete and represents an image-only human message with a neutral placeholder instead of dropping the turn.",
      ],
    },
    {
      kind: "bullets",
      id: "selective-export",
      heading: "What selective whole-turn export adds",
      items: [
        "Select turns… lists the conversation chronologically and starts with every whole Human-plus-final-Assistant turn selected.",
        "Selection filters the same canonical conversation data used by full export, so request order cannot reorder or duplicate turns and unselected turns never reach the rendered Markdown.",
        "The selector receives opaque indexes and previews capped at 180 characters from already-filtered text. Large selections switch from include/exclude arrays to a compact bitset, and the host rejects a stale selection if the turn count changed.",
        "Human and Assistant bubbles cannot be selected independently; the unit is deliberately one whole conversation turn.",
      ],
    },
    {
      kind: "bullets",
      id: "excluded-content",
      heading: "What exported content deliberately excludes",
      items: [
        "Reasoning blocks, tool calls and results, intermediate assistant responses and streamed chunk fragments.",
        "Plugin-injected context, goal and skill-catalog messages, subagent logs and other non-human user-message sources.",
        "Runtime metadata such as paths, ids, timestamps and token accounting.",
        "Attachments and image data. An image-only human turn remains visible as [Image omitted], but the asset itself is not embedded.",
      ],
    },
    {
      kind: "bullets",
      id: "boundaries",
      heading: "Host and request boundaries",
      items: [
        "The production path reads only the current session identified by DSH's framework-supplied session id and returns filtered data to the same local Web application. The plugin has no upload, cloud-storage, telemetry or analytics path.",
        "The plugin owns two exact routes — /api/conversation.export and /api/conversation.turns — and leaves DSH's official /api/session.export route untouched.",
        "Both plugin routes accept JSON POST requests only, enforce a 4 KiB body limit, mirror DSH Web's Host, Origin and Fetch Metadata trust checks, return no-store responses and keep operational error details out of browser responses.",
        "Turn previews are derived after transcript filtering and contain only an index plus bounded Human and final-Assistant text; raw events, session ids and runtime metadata stay host-side.",
      ],
    },
    {
      kind: "bullets",
      id: "package-verification",
      heading: "How the npm package is verified",
      items: [
        "The package declares the DSH bundle patch, Web client entry, Node.js 20 minimum and the exact source files included in the published payload.",
        "npm run verify runs the complete Node test suite, syntax-checks every JavaScript file and finishes with npm pack --dry-run so the installable package contents are checked as part of the same verification command.",
        "Golden-file tests cover Markdown, Unicode, injected context, multi-step tool activity, incomplete and image-only turns, malformed fences and selective export. Production-boundary tests cover the local routes, trust checks, bounded bodies and generic failures.",
      ],
    },
    {
      kind: "bullets",
      id: "limitations",
      heading: "Current limitations",
      items: [
        "Only the current DSH session can be exported, and Markdown is the only output format.",
        "Selection is whole-turn only; individual Human or Assistant bubbles are not selectable.",
        "Attachments, image data, reasoning, tools, injected context, subagent logs and intermediate responses are intentionally omitted rather than archived elsewhere by the plugin.",
        "Message Markdown is preserved except for one deterministic closing fence added when a message would otherwise leave a fenced code block open.",
        "Version 0.3 targets @deepseek-ai/dsh@0.1.0-rc.6. DSH is developer-preview software, so later plugin API changes may require an exporter update.",
      ],
    },
  ],
};

export const MONEYGUARD_CASE_STUDY = {
  slug: "moneyguard",
  title: "MoneyGuard",
  summary:
    "A TypeScript pipeline that reads a timecard photo with a vision model, computes the week's wage and burn figures locally, then streams a written audit from a separate text model.",
  metaTitle: "MoneyGuard case study | Yuelin Liu",
  metaDescription:
    "How MoneyGuard splits OCR from reasoning, validates untrusted model output with Zod, and where its data boundary actually sits — with the tradeoffs stated.",
  canonical: `${SITE_URL}/work/moneyguard/`,
  sourceUrl: "https://github.com/liuyuelintop/moneyguard-pipeline",
  sourceLabel: "View the source on GitHub",

  sections: [
    {
      kind: "sample",
      caption:
        "Output of the deterministic mock providers: moneyguard --mock fixtures/timecard.png, run against the sample ledger. The code owns every line except the audit prose.",
      lines: [
        "📊 Wage Audit (2026-W26)",
        "---",
        "🕒 Labor:   38 hrs",
        "💰 Gross:   $950.00 AUD",
        "📉 Burn:    $552.38 AUD",
        "💎 Surplus: $397.62 AUD | STABLE",
        "---",
        "🧠 Audit:",
        "先停下来给自己一个肯定——一周四十多个小时的体力活扛下来…",
      ],
    },
    {
      kind: "prose",
      id: "problem",
      heading: "The problem",
      paragraphs: [
        "The input is a photograph of an industrial timecard. The data it has to be reasoned against is a local JSON ledger of personal line items — rent, insurance, subscriptions, groceries — each carrying tags and a monthly or weekly cadence.",
        "For the CLI and library form factor the design goal was to keep those line items on the machine running the pipeline while still letting a text model reason about real figures rather than placeholders. MoneyGuard resolves that by doing the ledger math in the local process and sending only selected values and aggregates upstream.",
      ],
    },
    {
      kind: "bullets",
      id: "constraints",
      heading: "Constraints",
      items: [
        "Node 22 or newer, and exactly two runtime dependencies: @google/genai and zod.",
        "The whole pipeline has to run, and be tested, with no API keys and no network — through deterministic mock providers.",
        "TypeScript under strict with noUncheckedIndexedAccess. CI runs typecheck, the test suite and the build on every push and pull request to main.",
        "Vision output arrives as model output, not as a typed API response, so it is untrusted at the boundary.",
        "The original transport was a Telegram bot, whose message edits are rate limited, so streamed re-renders have to be paced by the transport rather than by the pipeline.",
        "The local ledger is read from finance.json in the process working directory.",
      ],
    },
    {
      kind: "steps",
      id: "workflow",
      heading: "Workflow",
      items: [
        {
          step: "01",
          label: "Timecard image",
          detail:
            "Read from disk by the CLI, or accepted as a size-bounded multipart upload by the hosted endpoint.",
          source: "src/cli/main.ts · src/http/extract.ts",
        },
        {
          step: "02",
          label: "Vision OCR",
          detail:
            "The image and a fixed OCR prompt go to the vision provider, wrapped in a bounded retry with exponential backoff and equal jitter.",
          source: "src/pipeline.ts · src/prompts.ts",
        },
        {
          step: "03",
          label: "Zod validation",
          detail:
            "safeParse coerces hours from a possible string, constrains them to the interval (0, 168], and rejects an unexpected confidence value instead of casting.",
          source: "src/schemas.ts",
        },
        {
          step: "04",
          label: "Local financial computation",
          detail:
            "computeMetrics normalizes every ledger item to a weekly amount, sums three tag subtotals, and classifies a health tier. Pure function, no I/O.",
          source: "src/metrics.ts",
        },
        {
          step: "05",
          label: "Minimized audit payload",
          detail:
            "buildAuditPayload composes fixed sections from the metrics, the hours and the pay period. Ledger line items and the raw role string are not part of it.",
          source: "src/payload.ts",
        },
        {
          step: "06",
          label: "Streamed report",
          detail:
            "The audit provider streams tokens into a report skeleton the code owns — a cursor frame per chunk, then one clean final frame.",
          source: "src/pipeline.ts · src/report.ts",
        },
      ],
    },
    {
      kind: "bullets",
      id: "architecture",
      heading: "Architecture",
      items: [
        "runMoneyGuardPipeline(imageBuffer, { onReportUpdate }) is the end-to-end CLI/library orchestration entry point. It is channel-agnostic: streaming is handed back through a callback, so the caller owns transport and pacing.",
        "Two interfaces — VisionProvider and AuditProvider — sit between the pipeline and any SDK. The live adapters are Gemini for vision and DeepSeek for audit; the offline path uses a deterministic mock pair.",
        "OCR and the local ledger read are independent, so they run in a single Promise.all.",
        "The pipeline returns { ok: true } or { ok: false, kind, message }, where kind is config, vision or model. Transports render message and never inspect internals.",
        "The Markdown report skeleton is built in code from the computed metrics; the model supplies only the prose inside it.",
        "A second entry point, extractMoneyGuardTotals, stops after vision plus local math and never calls the audit provider. The hosted /extract endpoint is built on it.",
        "loadConfig builds the pipeline's configuration object, while live provider adapters and the transport/server boundaries still read their own credentials, model, debug or listener values from process.env.",
      ],
    },
    {
      kind: "decisions",
      id: "decisions",
      heading: "Decisions I can defend",
      items: [
        {
          decision: "Separate the vision provider from the reasoning provider",
          reason:
            "OCR and empathetic copywriting are different jobs. Each stage gets a model suited to it, and neither is trusted to do the other's work.",
          tradeoff:
            "Live mode needs two API credentials and carries two vendor contracts and two failure surfaces instead of one.",
        },
        {
          decision: "Treat model output as untrusted and validate it with Zod",
          reason:
            "OCR output is generated text, not a typed API response. It is parsed at the boundary rather than cast.",
          tradeoff:
            "The schema is strict enough to reject readable results. A confidence of \"medium\" fails rather than degrading, and hours outside (0, 168] fail even when the photo was legible — so some recoverable reads surface as a vision error.",
        },
        {
          decision: "Compute ledger metrics locally for the CLI and library workflow",
          reason:
            "computeMetrics is a pure function over the in-memory ledger, which keeps line-item names, amounts and per-item tags out of the outbound prompt.",
          tradeoff:
            "The model can only reason over aggregates the code chose to expose. It cannot notice an individual line item, so any per-item insight has to be added as new code.",
        },
        {
          decision: "Send selected OCR values and aggregate metrics instead of ledger line items",
          reason:
            "The audit prompt is assembled from computed figures and fixed directive strings, so the ledger file itself never has to cross the network.",
          tradeoff:
            "The payload still carries hours worked and weekly gross income together, and an hourly rate follows from those two numbers. This buys minimization, not de-identification.",
        },
        {
          decision: "Retry a stream only before its first emitted chunk",
          reason:
            "Re-running a live stream would replay tokens the reader has already seen, so streamWithConnectRetry retries connection establishment and nothing after it.",
          tradeoff:
            "A failure after the first token is terminal. There is no resume path, so the reader is left with a partial report and an error.",
        },
        {
          decision: "Keep transport throttling outside the core pipeline",
          reason:
            "Edit rate limits belong to the channel, not to the domain. The pipeline calls onReportUpdate per chunk and each transport paces re-renders to one per 1000 ms while always applying the final frame.",
          tradeoff:
            "The contract is restated in every transport rather than enforced once. The same constant is declared separately in the CLI and the Telegram adapter, and a new transport that omits it gets no pacing at all.",
        },
        {
          decision: "Inject providers, and ship a deterministic mock pair",
          reason:
            "Providers are constructor arguments to the pipeline, so the suite injects stubs directly and the mock pair runs the full path with no keys and no network.",
          tradeoff:
            "Nothing in the suite exercises a real Gemini or DeepSeek response. Live-provider behaviour is only covered where a stub models it, so a wire-format change is not caught by tests.",
        },
        {
          decision: "Distinguish local configuration failures from vision and model failures",
          reason:
            "A malformed finance.json is the operator's problem and a 429 is not, so the discriminated result separates them and the error message is mapped before it reaches a transport.",
          tradeoff:
            "The discrimination is deliberately coarse — three kinds and one user-facing string. A transport cannot tell a rate limit from an auth failure, because the finer category only reaches the log.",
        },
      ],
    },
    {
      kind: "groups",
      id: "privacy",
      heading: "Privacy boundaries",
      intro:
        "The two form factors have different postures. They are described separately here because blending them would misrepresent both.",
      groups: [
        {
          heading: "CLI and library",
          points: [
            "finance.json is read into memory on the machine running the pipeline. Line-item names, amounts, cadences and per-item tags are not placed in the audit payload — buildAuditPayload composes fixed sections from the computed metrics instead.",
            "currentRole never reaches the prompt as a string. Its only effect is to select one of two fixed directive sentences.",
            "An unrecognised marketCondition value is normalized to neutral during validation, so an arbitrary string cannot be forwarded into a prompt.",
            "What does cross the network in live mode: the vision provider receives the timecard image, and the audit provider receives hours worked, the pay period, weekly gross income, weekly burn with essential, strategic and discretionary subtotals, net surplus, and the health tier.",
          ],
          note:
            "The audit payload is not anonymous. It carries hours worked and weekly gross income in the same message, and an hourly rate follows directly from those two numbers. What the boundary provides is data minimization, not de-identification.",
        },
        {
          heading: "Hosted /extract endpoint",
          points: [
            "This form factor sends data across the network by design. The uploaded image goes to the vision provider, and the response returns hourlyRate to the authenticated caller as part of the documented contract. It is not a local-only workflow.",
            "POST /extract requires a bearer credential compared with a constant-time comparison, and authorization is checked before the request body is read.",
            "Uploads are capped at 5 MiB for the image and 5 MiB plus 256 KiB for the whole request. The declared MIME type must be PNG or JPEG and must match a bounded container-structure check — which is a structural check, not a full image decode.",
            "Responses carry Cache-Control: no-store and are fixed to a source field plus a totals-only extraction object. Raw image bytes, OCR text, filenames and shift rows are not part of the response shape.",
            "Milestone logs carry a stage, a result, an elapsed time, an optional attempt ordinal and a validated correlation id — not payloads, headers or environment values.",
          ],
        },
      ],
    },
    {
      kind: "details",
      id: "verification",
      heading: "Verification",
      intro:
        "Eleven Vitest files run entirely offline through mock and stub providers, and CI runs typecheck, the suite and the build on every push and pull request to main. What each group asserts, and by what method:",
      items: [
        {
          heading: "The privacy assertion is a substring check on sentinel values",
          detail:
            "The test ledger uses an hourly rate of 99.99, a rent item of 7777.77 and a currentRole of PRIVATE_ROLE_SENTINEL, chosen so that none of them appear in any computed output string. The captured audit prompt is then asserted not to contain those substrings, the field name hourlyRate, the line-item names, or the tag string strategic_weapon. That establishes those exact strings are absent from that payload. It does not establish that the payload is non-derivable — the same prompt still contains hours and gross income.",
        },
        {
          heading: "Stream retry semantics",
          detail:
            "One test makes the stream throw before its first chunk and asserts the retry re-establishes it and yields the full sequence. A second makes it throw after one chunk, then asserts the error propagates, the stream factory was called exactly once, and only that one chunk was ever emitted.",
        },
        {
          heading: "Finance math",
          detail:
            "Monthly-to-weekly normalization at a factor of 12/52, per-tag subtotals over only the items carrying a tag, and examples spanning the tiers defined by the greater-than-500, greater-than-200 and greater-than-zero surplus thresholds.",
        },
        {
          heading: "Ledger schema rejection",
          detail:
            "Missing fields, a non-positive hourly rate, an empty item list, an unknown tag and an invalid cadence each return a config failure, and the audit provider is asserted to have been called zero times.",
        },
        {
          heading: "OCR failure paths",
          detail:
            "A null OCR response and a zero-hours response each return a vision failure with no audit call, and an unknown marketCondition is asserted not to appear in the outbound prompt.",
        },
        {
          heading: "Streaming frames",
          detail:
            "The final frame is asserted to be marked final and free of the trailing cursor character, and at least one earlier frame is asserted to carry it.",
        },
        {
          heading: "HTTP endpoint",
          detail:
            "Auth rejection before any provider work, request and image size caps, MIME-signature mismatches, provider-failure mapping, and an assertion that a successful body's keys are exactly source and extraction with a fixed totals-only key list inside.",
        },
        {
          heading: "Log shape",
          detail:
            "Milestone events are checked against an allow-list of permitted keys, so a payload cannot reach a log line by being added to an event object.",
        },
      ],
      note:
        "Not covered: real Gemini or DeepSeek responses — every provider in the suite is a stub or the mock — and whether the aggregate payload can be re-identified in practice, which no test attempts.",
    },
    {
      kind: "bullets",
      id: "limitations",
      heading: "Current limitations and what I would change",
      items: [
        "The audit payload still carries hours and gross income together. Making it genuinely non-derivable means bucketing or dropping one of them, which changes what the model is able to say. That decision is still open.",
        "Three of the six accepted cost tags — liability, subscription and variable — validate but receive no weekly subtotal. Surfacing one of those existing tags needs a new Metrics field, its computation in metrics.ts and an output line in payload.ts; a brand-new tag would also need a schema enum entry.",
        "The 1000 ms throttle is declared separately in the CLI and the Telegram adapter. Keeping pacing in the transport is deliberate; duplicating the constant is not, and a shared export would preserve the property without the copy.",
        "The hosted endpoint returns hourlyRate because the response contract says so. Removing it would be a coordinated change across the endpoint and its client.",
        "The ledger path is fixed to finance.json in the process working directory, with no flag or environment override; the CLI only falls back to finance.example.json.",
        "Currency is hard-coded to AUD in the payload strings and in the totals response, even though the ledger schema already carries a currency field.",
      ],
    },
  ],
};

// ALEX is not owned work. It is Ed Donner's MIT-licensed capstone from his
// "AI in Production" Udemy course, and this study describes it as such. Every
// architectural statement below was read out of the fork at
// github.com/liuyuelintop/ed-ai-in-production-alex rather than out of the
// course material, because the two disagree on how the specialist agents run.
const ALEX_FORK_URL = "https://github.com/liuyuelintop/ed-ai-in-production-alex";
const alexBranch = (branch) => `${ALEX_FORK_URL}/compare/main...${branch}`;

export const ALEX_CASE_STUDY = {
  slug: "alex",
  title: "ALEX — AWS Multi-Agent Architecture Study",
  summary:
    "A month spent building out, running and reading someone else's distributed agent system on AWS: what it actually does, what I deployed, what I sent back upstream, and what I am not claiming.",
  metaTitle: "ALEX architecture study | Yuelin Liu",
  metaDescription:
    "A study of Ed Donner's ALEX capstone — the real SQS-to-Lambda agent topology read from its Terraform and handlers, what I deployed and tore down, and the four corrections I contributed upstream.",
  canonical: `${SITE_URL}/work/alex/`,
  sourceUrl: ALEX_FORK_URL,
  sourceLabel: "View my fork on GitHub",

  sections: [
    {
      kind: "prose",
      id: "attribution",
      heading: "Whose project this is",
      paragraphs: [
        "ALEX is the capstone of Ed Donner's “AI in Production” Udemy course. The architecture, the agent prompts and the Terraform are his work, published under the MIT licence; my copy is a fork. I did not design this system and this page does not present it as mine.",
        "What this page is: a record of a system I spent about a month building out, deploying and reading line by line — the topology as it actually runs, the AWS services I stood up and then destroyed, the four corrections I sent back upstream, and an explicit list of the things this experience does not qualify me to claim.",
      ],
    },
    {
      kind: "bullets",
      id: "goals",
      heading: "What I set out to learn",
      items: [
        "How a queue decouples an HTTP request from an agent run that takes minutes rather than milliseconds, and what the dead-letter path is for.",
        "What an agent orchestrator looks like once the framework glue is stripped away — which steps are genuinely model decisions, and which are ordinary deterministic code that just happens to sit next to a model.",
        "How Terraform splits a system this size into separately applied stages, and what breaks when the ordering assumptions between them are not met.",
        "How a model hosted by Bedrock is driven from inside a Lambda, and where AWS region boundaries stop being an abstraction.",
        "What managed AWS services cost while idle — which is the lesson that ended the deployment.",
      ],
    },
    {
      kind: "diagram",
      id: "architecture",
      heading: "The architecture, as it actually runs",
      diagram: "alex",
      intro:
        "Redrawn from the Terraform and the Lambda handlers rather than from the course diagrams, because on one point the two do not agree: the three specialist agents are exposed to the orchestrator as function tools and invoked with InvocationType=\"RequestResponse\", so the planner blocks on each one. They run one after another, in whatever order the model asks for them — not simultaneously.",
      caption:
        "Read from terraform/6_agents/main.tf for the queue, its redrive policy and the event source mapping; backend/planner/agent.py for the deterministic pre-pass and the three tool invocations; terraform/4_researcher and terraform/5_database for the App Runner service and the Aurora cluster.",
    },
    {
      kind: "steps",
      id: "request-path",
      heading: "Request path",
      items: [
        {
          step: "01",
          label: "The job is created and the request ends",
          detail:
            "The Next.js frontend calls API Gateway, which invokes the API Lambda. It writes a job row to Aurora and puts a message on the analysis_jobs queue. The HTTP response returns immediately; nothing holds a connection open for the analysis.",
          source: "backend/api · terraform/6_agents/main.tf",
        },
        {
          step: "02",
          label: "The queue hands off to the planner",
          detail:
            "An aws_lambda_event_source_mapping wires analysis_jobs to the planner Lambda. A redrive policy diverts messages that keep failing to a dead-letter queue rather than retrying them forever.",
          source: "terraform/6_agents/main.tf — analysis_jobs, analysis_jobs_dlq, planner_sqs",
        },
        {
          step: "03",
          label: "A deterministic pre-pass runs before any model does",
          detail:
            "The planner fills in unclassified instruments by invoking the tagger Lambda, refreshes instrument prices, and loads the portfolio summary. This is ordinary Python control flow — no model chooses whether these steps happen.",
          source:
            "backend/planner/agent.py — handle_missing_instruments, update_instrument_prices, load_portfolio_summary",
        },
        {
          step: "04",
          label: "Only then is the orchestrator agent built",
          detail:
            "create_agent constructs the planner agent against a Bedrock-hosted Claude model through LiteLLM, with the reporter, charter and retirement agents attached as three function tools.",
          source: "backend/planner/agent.py — create_agent",
        },
        {
          step: "05",
          label: "Each specialist is a blocking Lambda call",
          detail:
            "Every tool call is a boto3 Lambda invoke with InvocationType=\"RequestResponse\". The planner waits for that agent to return before the model can choose the next tool, so the three specialists execute in sequence.",
          source: "backend/planner/agent.py — invoke_lambda_agent",
        },
        {
          step: "06",
          label: "Results are exchanged through the database",
          detail:
            "Each agent writes its own output back to Aurora Serverless v2 through the RDS Data API instead of returning results up a call chain, and the frontend polls the job row to find out when the run is finished.",
          source: "backend/*/agent.py · terraform/5_database/main.tf",
        },
      ],
    },
    {
      kind: "bullets",
      id: "deployment",
      heading: "What I deployed, and what I tore down",
      items: [
        "I applied the Terraform against my own AWS account and ran the system end to end: the queue and its dead-letter queue, the five agent Lambdas, the Aurora Serverless v2 cluster, the SageMaker embedding endpoint, the S3 Vectors index and the Dockerised researcher service on App Runner.",
        "The repository holds seven Terraform root configurations, numbered 2_sagemaker through 8_enterprise. The first guide provisions IAM through the console and has no Terraform of its own, which is why the guide count and the stage count do not match — a detail I had previously got wrong on this site.",
        "The SageMaker step fails outside us-east-1, because the Deep Learning Container image is pulled from a registry account that differs per region. Working that out is what produced one of the notes I sent upstream.",
        "Then I destroyed all of it. A SageMaker endpoint and an Aurora Serverless v2 cluster bill for being available rather than for being used, and this was a study project with exactly one user. Nothing described on this page is running today.",
      ],
    },
    {
      kind: "links",
      id: "contributions",
      heading: "What I contributed upstream",
      intro:
        "Four changes, each on a public branch of my fork. All of them came from running the guides against the real code and finding a place where the two disagreed. The linked comparisons are the diffs.",
      items: [
        {
          label: "A database-integrity verification step in guide 5",
          detail:
            "The verification script itself is Ed's — it predates my fork. What I added is the guide step that has a reader run it at the moment the schema is created, so a bad apply surfaces there instead of three stages later.",
          href: alexBranch("add-verify-database-step6"),
          linkLabel: "Compare add-verify-database-step6",
        },
        {
          label: "A fix to the planner's local test harness",
          detail:
            "The harness created an analysis job for a user id that did not exist in the database, and handed a Pydantic model to code that expected a dict. It failed for anyone who reached that step.",
          href: alexBranch("fix-guide8-undefined-accounts"),
          linkLabel: "Compare fix-guide8-undefined-accounts",
        },
        {
          label: "Corrections to guide 8's logging and validation sections",
          detail:
            "The sample code referred to fields — asset_class_allocation, region_allocation — that are not on the InstrumentClassification schema the agents actually use. I rewrote the Charter validation and Tagger explainability sections against the agent code as written.",
          href: alexBranch("fix-guide8-undefined-accounts"),
          linkLabel: "Compare fix-guide8-undefined-accounts",
        },
        {
          label: "A cross-region note for SageMaker deployments",
          detail:
            "Deploying the embedding endpoint outside us-east-1 requires resolving the Deep Learning Container image from the registry account AWS publishes for that region. The note records where that value has to be set.",
          href: alexBranch("docs/sagemaker-region-note"),
          linkLabel: "Compare docs/sagemaker-region-note",
        },
      ],
    },
    {
      kind: "bullets",
      id: "limits",
      heading: "What this is not",
      items: [
        "Not my architecture. Every design decision described here is Ed Donner's. I can explain why the system is shaped this way; I cannot take credit for choosing it.",
        "Not a running deployment. It ran in my AWS account during the study and was destroyed afterwards, deliberately.",
        "Not evidence that I can operate this at scale. I ran it with my own test data, alone, with no traffic, no incidents and no on-call.",
        "Not a source of cost or latency figures. I measured neither, so I quote neither.",
        "Not a security review. The IAM policies, secrets handling and network boundaries are as the course ships them. I neither audited nor hardened them.",
      ],
    },
  ],
};

// Owned work, unlike ALEX. Every figure below was re-derived from the source at
// commit b85d7f0 rather than carried over from an earlier draft of this page:
// the project's own README had drifted, and a study that trusts a README
// repeats its mistakes. Where a number could not be reproduced it was dropped
// rather than softened. The "13 of 16" figure is measured at the pre-fix commit
// d993b5f, because measuring it at b85d7f0 would only ever return zero.
const MELBOURNE_SOURCE_URL = "https://github.com/liuyuelintop/melb-uni-ultimate";

export const MELBOURNE_CASE_STUDY = {
  slug: "melbourne-ultimate",
  title: "Melbourne University Ultimate Club Platform",
  summary:
    "A Next.js 15 and MongoDB club-management application revisited and hardened around server-side authorization, database-backed roles, automated regression tests and CI.",
  ownership: "Sole developer · Built July 2025 · Revisited and hardened August 2026",
  metaTitle: "Melbourne University Ultimate case study | Yuelin Liu",
  metaDescription:
    "How a club-management app's authorization was traced to a silent session bug, centralised into one guard, and held in place by the project's first regression tests and CI — with the unverified parts stated.",
  canonical: `${SITE_URL}/work/melbourne-ultimate/`,
  sourceUrl: MELBOURNE_SOURCE_URL,
  sourceLabel: "View the source on GitHub",

  sections: [
    {
      kind: "prose",
      id: "what-it-is",
      heading: "What the application is",
      paragraphs: [
        "A website for a university Ultimate Frisbee club: announcements, events, a player roster, an alumni directory and club videos on the public side, with a single admin dashboard behind them for managing all of it. It runs on the Next.js 15 App Router with MongoDB through Mongoose, and has two roles — user and admin.",
        "The one piece of real domain modelling is tournament selection. Players are attached to tournaments through a join collection rather than an array on either document, so a selection is its own record with its own constraints.",
      ],
    },
    {
      kind: "bullets",
      id: "what-changed",
      heading: "What changed",
      items: [
        "Authorization moved behind a single choke point: getServerSession is now called in exactly one module, and 23 of the 24 mutating handlers require a session.",
        "Roles are read from the database per request rather than trusted from the token, so removing an admin takes effect immediately instead of at token expiry.",
        "73 tests across 3 files, in a repository that had none — including one that discovers routes from the filesystem, so an unguarded endpoint fails CI rather than review.",
        "Four update handlers stopped writing whatever the client sent and now name the fields they will write.",
        "GitHub Actions runs typecheck, lint, tests and a build on every push, with the build deliberately run without database credentials.",
      ],
    },
    {
      kind: "prose",
      id: "why-revisited",
      heading: "Why I went back",
      paragraphs: [
        "It was built in July 2025 and then left alone. I went back in August 2026 to audit it against its own claims, on the assumption that anyone reading a portfolio can open the repository and check — so the only claims worth making are the ones that survive that.",
        "The audit found two things worth fixing, and both are below. Neither was visible from the outside: the application ran, the pages loaded, and the failure modes were quiet ones. Finding them is the part of this project I would most want to be asked about.",
      ],
    },
    {
      kind: "details",
      id: "finding-01",
      heading: "Tracing a “network error” to a URL that never existed",
      intro:
        "The symptom pointed at the network. The cause was a documented Next.js behaviour being read wrongly: route-group folder names are wrapped in parentheses and do not appear in the URL, so the folder tree and the URL tree are not the same tree. That one misreading produced both of the following.",
      items: [
        {
          heading: "Signup posted to a URL that was never the handler",
          detail:
            "The page posted to /api/auth/signup. The handler lives at /api/signup, because the (auth) folder around it is invisible in the URL. The request reached the NextAuth catch-all instead, which answered 400 with a plain-text body, and the client called response.json() unconditionally — so the parse error surfaced as “Network error”, blaming the network for a routing mistake.",
        },
        {
          heading: "Middleware guarded a path that does not exist",
          detail:
            "The same misreading put the dashboard at /dashboard while the middleware matcher checked /admin, the folder name. Matching a URL that is never requested is indistinguishable from matching nothing at all.",
        },
      ],
      note: "This is one specific documented behaviour being read wrongly in two places, not a general failure of the routing architecture.",
    },
    {
      kind: "details",
      id: "finding-02",
      heading: "Why a valid session carried no role",
      intro:
        "Fixed in the August 2026 work; what follows is the state before that fix. It is worth reading closely because the mechanism is not guessable from the symptom — the call that caused it looks correct, and typechecks.",
      items: [
        {
          heading: "The call succeeded and still returned nothing useful",
          detail:
            "getServerSession() returned a valid session when its options were omitted — the secret still resolved, the cookie still decoded — but NextAuth ran its own default session callback instead of the project's, so role came back undefined. Established by reading the next-auth 4.24.11 source rather than inferred from the symptom.",
        },
        {
          heading: "It was the common case, not an outlier",
          detail:
            "At the pre-fix commit, 13 of the 16 files that read a session called it without the project's auth options. A role check against an undefined role rejects everyone, including real admins — which also explained a seed route whose admin check had been commented out with a TODO rather than repaired.",
        },
        {
          heading: "The type system could not have caught it",
          detail:
            "The options parameter is optional, so the correct call and the broken one both typecheck. That ruled out fixing it by convention or by review, and is why the remediation is structural rather than a set of corrected call sites.",
        },
      ],
    },
    {
      kind: "bullets",
      id: "authorization",
      heading: "Structural authorization redesign",
      items: [
        "Session reading is centralised: getServerSession is called in exactly one module, so its options cannot be omitted at a call site that no longer exists.",
        "23 of the 24 mutating handlers require a session. POST /api/signup is the one anonymous mutating endpoint, by design — without it no account could ever be created.",
        "Role is read from the database on each request rather than taken from the JWT claim, so removing an admin takes effect on their next request instead of when their token expires. Anonymous callers skip the query.",
        "The admin dashboard has a server-side gate in its route group's layout, redirecting unauthenticated visitors to /login and non-admins to /unauthorized. Middleware also checks the token, as a second layer rather than the deciding one.",
        "Alumni contact and employment fields are removed on the server for non-admin callers, so they are absent from the response rather than hidden in the interface.",
      ],
    },
    {
      kind: "prose",
      id: "mass-assignment",
      heading: "Mass-assignment remediation",
      paragraphs: [
        "Four update handlers built their database update by spreading the raw request body, which made every field the schema accepts writable by the client — including audit fields, and a publish timestamp the server is supposed to set itself. Each now selects by name the fields it is willing to write.",
        "Naming the fields also settled a question the create path had already answered and the update path had not: what a blank value means. Absent means leave it alone; a deliberately cleared optional field is removed from the document rather than stored as null, because a unique index treats every null as the same value and two records cleared the same way would collide with each other.",
        "A test scans the route files for the original pattern, so the suite fails if that shape returns rather than relying on the next reviewer to notice it.",
      ],
    },
    {
      kind: "bullets",
      id: "tests-ci",
      heading: "Findings turned into regression tests and CI",
      items: [
        "73 tests across 3 files, in a repository that previously had none.",
        "The authorization test discovers route files from the filesystem rather than from a hand-written list, so a newly added mutating route is included the moment it exists and has to either reject anonymous callers or be added to an explicit allowlist. That allowlist holds one entry.",
        "Reaching the database is treated as a failure inside those tests rather than as a fixture, so a handler that queries before it authorises fails with a named error instead of hanging until the driver times out.",
        "A second test scans every route file for the mass-assignment pattern described above.",
        "GitHub Actions runs typecheck, lint, the tests and a build on every push and pull request.",
        "The CI build runs with MONGODB_URI deliberately unset. Needing a database credential in order to build is a regression this project has had twice, so the pipeline fails on it rather than a deployment discovering it later.",
      ],
    },
    {
      kind: "decisions",
      id: "data-model",
      heading: "Data model decision",
      items: [
        {
          decision: "Tournament selection is a join collection with a compound unique index",
          reason:
            "A selection is a relationship between a tournament, a team and a player, so it is stored as its own document under a unique index across those three fields. Selecting the same player twice for the same tournament and team is rejected by the database rather than by whichever code path happens to run.",
          tradeoff:
            "Reading a roster costs a join rather than reading an array off the tournament document, and the rule lives in an index rather than in application code — so it holds whether or not the caller remembered it, but it is no longer visible in the handler that writes the selection.",
        },
      ],
    },
    {
      kind: "bullets",
      id: "verified",
      heading: "What is verified",
      items: [
        "Typecheck, lint, the 73 tests and a production build all pass, and CI runs the same four on every push.",
        "The authorization tests were falsified before being trusted: removing a guard from a handler makes the suite fail and name the file, rather than passing quietly.",
        "An unauthenticated write to a mutating endpoint was observed returning 401 against a locally running server.",
        "23 of the 24 mutating handlers were enumerated from the source and confirmed to require a session, with POST /api/signup the single deliberate exception.",
        "getServerSession resolves to exactly one call site in the codebase, which is what makes the omission that caused the role bug unwritable rather than merely discouraged.",
        "The compound unique index on tournamentId, teamId and playerId was read from the schema, so the duplicate-selection rule is enforced by the database rather than asserted in prose.",
        "The production build succeeds with no database credentials present, and every API route is emitted as dynamic rather than prerendered.",
        "TypeScript runs under strict, with a single explicit any remaining in roughly 15,000 lines — checkable in seconds, unlike a percentage.",
        "Supporting structure: a serverless-safe cached Mongoose connection, and a generic useApi/useCrud pair that 13 resource hooks are built on.",
      ],
    },
    {
      kind: "bullets",
      id: "unverified",
      // Retitled, not softened: the six items below are unchanged in substance.
      // "Scope of verification" describes what this is — a statement of how far
      // the evidence reaches — where the previous heading read as a warning.
      heading: "Scope of verification",
      items: [
        "No real MongoDB end-to-end verification was performed in the latest evidence audit.",
        "Duplicate-key and field-clearing behaviour was verified at the level of the query that gets constructed, not against a real database.",
        "Anonymous rejection is tested across every mutating handler, but a signed-in non-admin session against a real database has not been fully exercised.",
        "The live deployment was not independently observed during the audit.",
        "Historical seeded admin credentials remain in the Git history and would need rotation if they were ever used.",
        "Possible stale MongoDB indexes remain an operational check rather than a settled question.",
      ],
    },
  ],
};

export const CASE_STUDIES = {
  [DISPATCH_CASE_STUDY.slug]: DISPATCH_CASE_STUDY,
  [DSH_CASE_STUDY.slug]: DSH_CASE_STUDY,
  [MONEYGUARD_CASE_STUDY.slug]: MONEYGUARD_CASE_STUDY,
  [MELBOURNE_CASE_STUDY.slug]: MELBOURNE_CASE_STUDY,
  [ALEX_CASE_STUDY.slug]: ALEX_CASE_STUDY,
};

export const CASE_STUDY_SLUGS = Object.keys(CASE_STUDIES);

export const caseStudyHref = (slug) => `/work/${slug}/`;
