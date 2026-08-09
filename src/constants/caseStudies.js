// Single source of truth for case-study copy. The homepage project entry in
// projects.js references this file rather than restating it.
//
// A case study is a title, its metadata, and an ordered `sections` array. Each
// section names a `kind` that app/work/[slug]/page.jsx knows how to render, so
// a study only carries the sections it can actually support — a study of
// someone else's architecture has no "Decisions I can defend" to offer.

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
      kind: "prose",
      id: "why-revisited",
      heading: "Why I revisited it",
      paragraphs: [
        "It was built in July 2025 and then left alone. I came back to it in August 2026 to check whether what I had been saying about it was actually true, on the assumption that anyone reading a portfolio can open the repository and check for themselves.",
        "It was not. The README described features the schemas did not support, and the authorization I believed was in place turned out to rest on a call that quietly returned the wrong thing. The work below is what that review turned into.",
      ],
    },
    {
      kind: "details",
      id: "finding-01",
      heading: "Finding 01 — route groups hid the real URLs",
      intro:
        "Next.js route-group folder names are wrapped in parentheses and do not appear in the URL. That is documented behaviour, not a bug. Reading the folder tree as though it were the URL tree is what caused both of the following.",
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
      heading: "Finding 02 — valid sessions, missing roles",
      intro:
        "This was fixed in the August 2026 work; what follows describes the state before that fix. It is the finding I would most want to be asked about, because the mechanism is not guessable from the symptom.",
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
        "TypeScript runs under strict, with a single explicit any remaining in roughly 15,000 lines — checkable in seconds, unlike a percentage.",
        "Supporting structure: a serverless-safe cached Mongoose connection, and a generic useApi/useCrud pair that 13 resource hooks are built on.",
      ],
    },
    {
      kind: "bullets",
      id: "unverified",
      heading: "What remains unverified",
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
  [MONEYGUARD_CASE_STUDY.slug]: MONEYGUARD_CASE_STUDY,
  [MELBOURNE_CASE_STUDY.slug]: MELBOURNE_CASE_STUDY,
  [ALEX_CASE_STUDY.slug]: ALEX_CASE_STUDY,
};

export const CASE_STUDY_SLUGS = Object.keys(CASE_STUDIES);

export const caseStudyHref = (slug) => `/work/${slug}/`;
