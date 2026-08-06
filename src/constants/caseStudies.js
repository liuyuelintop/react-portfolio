// Single source of truth for case-study copy. The homepage project entry in
// projects.js references this file rather than restating it.

const SITE_URL = "https://www.liuyuelin.dev";

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

  sample: {
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

  problem: [
    "The input is a photograph of an industrial timecard. The data it has to be reasoned against is a local JSON ledger of personal line items — rent, insurance, subscriptions, groceries — each carrying tags and a monthly or weekly cadence.",
    "For the CLI and library form factor the design goal was to keep those line items on the machine running the pipeline while still letting a text model reason about real figures rather than placeholders. MoneyGuard resolves that by doing the ledger math in the local process and sending only selected values and aggregates upstream.",
  ],

  constraints: [
    "Node 22 or newer, and exactly two runtime dependencies: @google/genai and zod.",
    "The whole pipeline has to run, and be tested, with no API keys and no network — through deterministic mock providers.",
    "TypeScript under strict with noUncheckedIndexedAccess. CI runs typecheck, the test suite and the build on every push and pull request to main.",
    "Vision output arrives as model output, not as a typed API response, so it is untrusted at the boundary.",
    "The original transport was a Telegram bot, whose message edits are rate limited, so streamed re-renders have to be paced by the transport rather than by the pipeline.",
    "The local ledger is read from finance.json in the process working directory.",
  ],

  workflow: [
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

  architecture: [
    "runMoneyGuardPipeline(imageBuffer, { onReportUpdate }) is the end-to-end CLI/library orchestration entry point. It is channel-agnostic: streaming is handed back through a callback, so the caller owns transport and pacing.",
    "Two interfaces — VisionProvider and AuditProvider — sit between the pipeline and any SDK. The live adapters are Gemini for vision and DeepSeek for audit; the offline path uses a deterministic mock pair.",
    "OCR and the local ledger read are independent, so they run in a single Promise.all.",
    "The pipeline returns { ok: true } or { ok: false, kind, message }, where kind is config, vision or model. Transports render message and never inspect internals.",
    "The Markdown report skeleton is built in code from the computed metrics; the model supplies only the prose inside it.",
    "A second entry point, extractMoneyGuardTotals, stops after vision plus local math and never calls the audit provider. The hosted /extract endpoint is built on it.",
    "loadConfig builds the pipeline's configuration object, while live provider adapters and the transport/server boundaries still read their own credentials, model, debug or listener values from process.env.",
  ],

  decisions: [
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

  privacy: {
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

  verification: {
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
    gaps:
      "Not covered: real Gemini or DeepSeek responses — every provider in the suite is a stub or the mock — and whether the aggregate payload can be re-identified in practice, which no test attempts.",
  },

  limitations: [
    "The audit payload still carries hours and gross income together. Making it genuinely non-derivable means bucketing or dropping one of them, which changes what the model is able to say. That decision is still open.",
    "Three of the six accepted cost tags — liability, subscription and variable — validate but receive no weekly subtotal. Surfacing one of those existing tags needs a new Metrics field, its computation in metrics.ts and an output line in payload.ts; a brand-new tag would also need a schema enum entry.",
    "The 1000 ms throttle is declared separately in the CLI and the Telegram adapter. Keeping pacing in the transport is deliberate; duplicating the constant is not, and a shared export would preserve the property without the copy.",
    "The hosted endpoint returns hourlyRate because the response contract says so. Removing it would be a coordinated change across the endpoint and its client.",
    "The ledger path is fixed to finance.json in the process working directory, with no flag or environment override; the CLI only falls back to finance.example.json.",
    "Currency is hard-coded to AUD in the payload strings and in the totals response, even though the ledger schema already carries a currency field.",
  ],
};

export const CASE_STUDIES = {
  [MONEYGUARD_CASE_STUDY.slug]: MONEYGUARD_CASE_STUDY,
};

export const CASE_STUDY_SLUGS = Object.keys(CASE_STUDIES);

export const caseStudyHref = (slug) => `/work/${slug}/`;
