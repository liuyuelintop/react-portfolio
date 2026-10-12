import {
  DISPATCH_CASE_STUDY,
  DSH_CASE_STUDY,
  MARSHAL_CASE_STUDY,
  MELBOURNE_CASE_STUDY,
  MONEYGUARD_CASE_STUDY,
  caseStudyHref,
} from "./caseStudies";

// The work is argued in three chapters, one per working principle. Each chapter
// leads with one story (a decision, and a figure the reader can use) and lists
// further evidence under it, so a project or role appears once on the page.
//
// `figure` names a figure in WORK_FIGURES, drawn by its own component in
// components/sections/Work/figures. `layout: "wide"` stacks the figure under the
// story at full width instead of beside it. Every number a figure shows must
// already be supported by the copy beside it.
export const WORK = {
  hour: "Midday. The work.",
  heading: "Work",
  chapters: [
    {
      principle: "I start with the workflow, not the feature.",
      lead: {
        name: MARSHAL_CASE_STUDY.title,
        context:
          "Self-hosted application workspace for laptop and phone. Personal project, 2026, pre-alpha. MIT-licensed, source private while pre-alpha.",
        headline: "The useful change was removing steps.",
        // The first paragraph is the owner's account of the problem. The hosting
        // and privacy sentences follow Marshal's README and SELF_HOSTING guide;
        // the repository is private, so the story must not call it open source.
        paragraphs: [
          "Applying with a chat assistant meant the same loop for every job: paste in a job ad that arrives garbled, paste my prompts, paste my résumé and background, then ask for a fit analysis, a résumé and a cover letter. Marshal keeps the job, my confirmed background and both documents in one workspace, so most of that repetition is gone. It is still being refined.",
          "Its first workflow repeated the mistake in a new form: an assessment, a pursuit decision, a letter plan, an audit or waiver, and acceptance before export. I removed the mandatory chain. A cover letter and a résumé can each be generated directly from the saved job description and permitted background.",
          "Each person runs their own instance: on one machine, with Docker, or on a server reached over a private Tailscale network from a laptop and a phone. Data is plain files and the model key stays on the server. Model calls still send the selected input to the provider you choose.",
        ],
        stack: "TypeScript, React / Vite, Node.js, Docker. Designed and built end to end.",
        links: [
          {
            label: `Read the ${MARSHAL_CASE_STUDY.title} case study`,
            href: caseStudyHref(MARSHAL_CASE_STUDY.slug),
          },
        ],
        figure: "marshal",
        figureCaption: "An illustration of the change, not the product interface.",
      },
      also: [
        {
          title: "Prospective-client demos",
          summary:
            "Demonstration applications for a specialty coffee retailer and a drone training provider, built from informal briefs with Next.js 15 App Router, Clerk OAuth and Convex.",
          meta: "Sep 2025 to present",
        },
      ],
    },
    {
      principle: "I measure before I optimise.",
      lead: {
        name: "ByteCroniX",
        context: "Full-Stack Developer at an early-stage AI SaaS, Mar to Jun 2025.",
        headline: "From 26.7 seconds to 5.6.",
        // Bounded by the owner's evidence register: BFF/REST, function calling and
        // testing/delivery are first-person; the timing observation is corroborated.
        // Service ownership, coverage figures and production results are not claimed.
        paragraphs: [
          "I worked across the BFF routes and REST integrations behind the web, Android and iOS clients, implemented OpenAI function-calling flows in Node.js/Express, and worked across API testing and delivery workflows using Postman, Jest/Supertest, NGINX and multi-service CI/CD.",
          "One inherited path shows how I work. I added timing instrumentation to a points-summary request and identified the current and proposed scoring services as the dominant latency contributors, then parallelised the independent service calls. The observed local integration-test response went from 26.7s to 5.6s.",
        ],
        stack: "Node.js, Express, BFF and REST integrations, OpenAI Function Calling, Postman, Jest/Supertest, NGINX, Docker.",
        links: [],
        figure: "latency",
        layout: "wide",
        figureCaption:
          "Totals are the observed local integration-test responses; the spans inside them are a sketch. Nothing else is measured here.",
      },
      also: [
        {
          title: MELBOURNE_CASE_STUDY.title,
          summary:
            "Traced silent session-role failures to fragmented authentication usage, and centralised session reads behind one database-verified guard.",
          meta: "Case study, not currently maintained",
          href: caseStudyHref(MELBOURNE_CASE_STUDY.slug),
        },
      ],
    },
    {
      principle: "I turn assumptions into enforceable boundaries.",
      lead: {
        name: MONEYGUARD_CASE_STUDY.title,
        context:
          "Wage planning for hourly workers: an OCR and audit pipeline, then a local-first web workspace. Personal project, 2026. Web source private, pipeline public.",
        headline: "Keep the financial answer in code.",
        paragraphs: [
          "MoneyGuard reads a photographed timecard with a vision model, validates what comes back, computes pay, weekly burn and surplus in local code, and streams an AI-written audit into a report the code lays out. A web workspace builds on that pipeline to answer what is left from this week's work, how much work a purchase costs, and whether cash lasts if payday moves.",
          "Model output is treated as untrusted input. Reviewed inputs feed pure calculation functions, and the optional AI path can explain selected figures; it does not calculate the financial result.",
        ],
        stack:
          "TypeScript, Next.js / React, IndexedDB, Zod, Gemini and DeepSeek providers, Vitest / Playwright. Designed and built.",
        links: [
          {
            label: `Read the ${MONEYGUARD_CASE_STUDY.title} case study`,
            href: caseStudyHref(MONEYGUARD_CASE_STUDY.slug),
          },
          { label: "Pipeline source", href: MONEYGUARD_CASE_STUDY.sourceUrl, external: true },
        ],
        figure: "timecard",
        figureCaption:
          "Sample figures are the pipeline's own mock run on a sample ledger. An illustration, not the product interface.",
      },
      also: [
        {
          title: DISPATCH_CASE_STUDY.title,
          summary:
            "Restricted drafting to confirmed, permitted evidence, with validation, bounded repair and failure diagnostics before a generated letter replaces saved work.",
          meta: "Case study",
          href: caseStudyHref(DISPATCH_CASE_STUDY.slug),
        },
        {
          title: DSH_CASE_STUDY.title,
          summary:
            "Exports full conversations as clean Markdown, and excludes reasoning, tool activity and runtime metadata from the export.",
          meta: "Case study",
          href: caseStudyHref(DSH_CASE_STUDY.slug),
          source: DSH_CASE_STUDY.sourceUrl,
        },
        {
          title: "Client Data Delivery Validator",
          summary:
            "Python/pandas validation workflow for synthetic client-delivery CSV data, with structured validation results and 12 pytest regression cases.",
          meta: "Source",
          href: "https://github.com/liuyuelintop/client-data-delivery-validator",
          external: true,
        },
      ],
    },
  ],
};

// Each lead story has its own kind of figure, chosen to match what the story
// argues: Marshal's is an edited document (the change was removing steps),
// ByteCroniX's is a request trace (measure first), and MoneyGuard's is a report
// whose every line can be traced back to whoever wrote it (keep the answer in
// code). The illustrations restate what the stories and case studies already
// claim; they introduce no new facts.
//
// `actor` is "you", "code" or a model-side role ("model", "chat", "gate"); every
// figure draws you outlined, code solid and a model dashed.
export const WORK_FIGURES = {
  // The workflow as a document under tracked changes. Traced to the Marshal case
  // study (workflow, decisions and simplification sections), which is itself
  // traced in docs/MARSHAL_CASE_STUDY_EVIDENCE.md. "By hand in a chat" is the
  // owner's first-person account of applying before the product existed.
  // Both comparisons accept to the same six lines.
  marshal: {
    title: "One job, with the edits shown",
    how: "Struck lines were removed. Marked lines were added. Open a line to read why.",
    accept: "Accept all changes",
    reject: "Show the changes",
    removedLabel: "Removed",
    addedLabel: "Added",
    acceptedSummary: "What is left: six lines. Two are yours; the checks run in code.",
    comparisons: [
      {
        id: "chat",
        label: "Against: by hand in a chat",
        summary: "Six steps by hand, for every job, struck.",
        open: "filter",
        lines: [
          { id: "copy", change: "del", actor: "you", name: "Copy and paste the job ad", note: "Select the whole ad on the job board and paste it into a chat. It often arrives garbled." },
          { id: "capture", change: "ins", actor: "you", name: "Bring in the job", note: "A supported SEEK or LinkedIn link is fetched into an editable preview, or the description is pasted. Capture it on a phone, finish at a desk." },
          { id: "prompt", change: "del", actor: "chat", name: "Paste the prompt again", note: "The same instructions, found and pasted again." },
          { id: "self", change: "del", actor: "chat", name: "Paste your résumé and background again", note: "For every job." },
          { id: "filter", change: "ins", actor: "code", name: "Filter the background", note: "The confirmed background stays in the workspace. Before a prompt is assembled, the server removes unconfirmed, expired and out-of-scope claims." },
          { id: "ask", change: "del", actor: "chat", name: "Ask three times", note: "For a fit analysis, then a résumé, then a cover letter." },
          { id: "generate", change: "ins", actor: "model", name: "Generate either document", note: "A cover letter and a résumé are each generated on their own, straight from the saved job and that background. A failed run does not erase the other document." },
          { id: "check", change: "ins", actor: "code", name: "Check the reply", note: "Generated text is checked for supported references and numeric quantities. These checks catch bounded errors, not semantic truth." },
          { id: "copy-out", change: "del", actor: "you", name: "Copy the answers out", note: "Into documents, by hand, then read them for work you never did." },
          { id: "edit", change: "ins", actor: "you", name: "Edit and review, on any device", note: "Edits autosave as revisions. The server rejects a stale one and keeps the last 20, so a phone and a laptop cannot silently overwrite each other. You read the current text." },
          { id: "export", change: "ins", actor: "code", name: "Export", note: "Export rechecks permissions and document guards, then copies the text or renders an A4 PDF. No AI acceptance step is required." },
          { id: "again", change: "del", actor: "you", name: "Start again for the next job", note: "From the first step. Marshal keeps the job, the background and the documents, so most of this is gone." },
        ],
      },
      {
        id: "first",
        label: "Against: the first workflow",
        summary: "Five mandatory steps before export, struck. The checks stayed in code.",
        open: "assessment",
        lines: [
          { id: "capture", change: "keep", actor: "you", name: "Bring in the job", note: "Both workflows start from a saved job description." },
          { id: "filter", change: "keep", actor: "code", name: "Filter the background", note: "Kept in code: unconfirmed, expired and out-of-scope claims are removed before a prompt is assembled." },
          { id: "assessment", change: "del", actor: "gate", name: "Assessment", note: "The first workflow began with a mandatory AI assessment of the job. The Match assessment is now optional reference material, not a gate." },
          { id: "pursuit", change: "del", actor: "gate", name: "Pursuit decision", note: "Then a pursuit decision, before any writing." },
          { id: "plan", change: "del", actor: "gate", name: "Letter plan", note: "Then a letter plan, before the letter itself." },
          { id: "generate", change: "ins", actor: "model", name: "Generate either document", note: "Directly from the saved job description and permitted background. Each document has its own editor and generation action." },
          { id: "check", change: "keep", actor: "code", name: "Check the reply", note: "Kept in code: supported references and numeric quantities. These checks catch bounded errors, not semantic truth." },
          { id: "audit", change: "del", actor: "gate", name: "Audit or waiver", note: "The draft then needed a model audit, with its repair stack, or an explicit waiver." },
          { id: "acceptance", change: "del", actor: "gate", name: "Acceptance", note: "And acceptance, before export was allowed. That put the application's process ahead of the task." },
          { id: "edit", change: "ins", actor: "you", name: "Edit and review, on any device", note: "Human review is now an explicit step: you read the current text before it leaves the workspace." },
          { id: "export", change: "keep", actor: "code", name: "Export", note: "Kept in code: export rechecks permissions and document guards. No AI acceptance step is required." },
        ],
      },
    ],
  },

  // Bounded by the owner's evidence register (ByteCroniX claim register and the
  // 3 August 2026 addendum): instrumentation, the dominant scoring services,
  // Promise.all parallelisation and the 26.7s to 5.6s local observation are
  // corroborated first-person. Nothing here claims service ownership, coverage,
  // merge, deployment or a production result.
  //
  // Only the two totals were observed. The spans inside them are a sketch
  // (seconds on the same axis, never printed) that keeps what the logs showed:
  // the two scoring services dominate, and after the change independent calls
  // start together, at the orchestration layer and inside both services.
  latency: {
    title: "One request, opened up",
    how: "Totals are to scale. The spans inside them are a sketch.",
    request: "Points-summary request",
    unmeasured: "Not measured yet",
    blind: "Nothing inside the request is timed yet.",
    dominantLabel: "Dominant",
    speed: 6,
    speedNote: "Replayed at six times speed.",
    totals: { before: 26.7, after: 5.6 },
    spans: [
      { id: "orchestration", label: "Orchestration", before: [0, 0.6], after: [0, 0.6] },
      { id: "current", label: "Current scoring service", dominant: true, before: [0.6, 12.8], after: [0.6, 4.3] },
      { id: "proposed", label: "Proposed scoring service", dominant: true, before: [12.8, 25.7], after: [0.6, 4.6] },
      { id: "mapping", label: "Mapping", before: [25.7, 26.7], after: [4.6, 5.6] },
    ],
    // `view` is what the trace shows at that step: one opaque bar, its spans,
    // the dominant spans picked out, the changed layout unmeasured, or measured.
    next: "Next",
    steps: [
      { id: "inherit", view: "opaque", name: "An inherited path", text: "One request I had not written, the points summary, answered slowly in local integration tests. I measured it before touching it." },
      { id: "instrument", view: "spans", name: "Add timing logs", text: "Timing logs separated orchestration, mapping and downstream service time." },
      { id: "find", view: "dominant", name: "Find where the time goes", text: "The logs showed that the current and proposed scoring services dominated the wait." },
      { id: "change", view: "changed", name: "Parallelise the independent calls", text: "I changed the smallest layer that explained the problem: independent calls were started together with Promise.all, at the orchestration layer and inside the two scoring services. A change is not a result until it is measured." },
      { id: "remeasure", view: "measured", name: "Measure again", text: "The same request in the same local Postman and Docker setup. An observed result, not a production benchmark." },
    ],
    restart: "Start over",
  },

  // One report, every line traced back to whoever wrote it. Traced to
  // liuyuelintop/moneyguard-pipeline: the Telegram adapter in examples/telegram,
  // VisionResultSchema in src/schemas.ts (`z.coerce.number().positive().max(168)`),
  // computeMetrics in src/metrics.ts, the early return in src/pipeline.ts when
  // safeParse fails (and its message), buildAuditPayload, and the mock-run
  // report quoted in the case study.
  timecard: {
    title: "Who wrote each line of the report?",
    how: "Choose a line to trace it back. Solid is code, dashed is a model, outlined is you.",
    report: "Wage Audit (2026-W26)",
    boundary: "The model boundary",
    noModel: "This line never crosses the model boundary.",
    proseLabel: "the model's prose",
    open: "surplus",
    lines: [
      {
        id: "labor",
        label: "Labor",
        value: "38 hrs",
        trace: [
          { actor: "code", name: "Report layout", text: "The code writes this line from the checked reading." },
          { actor: "code", name: "Schema check", text: "A schema coerces a stringified number and refuses hours that no week can hold: above 0 and at most 168. 38 is accepted." },
          { actor: "model", name: "Vision OCR", text: "A vision model reads the running total from the photo, with bounded retries. What comes back is model output, so it is not trusted yet." },
          { actor: "you", name: "Photo arrives", text: "A photo of the week's timecard is sent from a phone, through a Telegram bot or the CLI." },
        ],
      },
      {
        id: "gross",
        label: "Gross",
        value: "$950.00 AUD",
        trace: [
          { actor: "code", name: "Calculation", text: "A pure function computes gross pay from the checked hours. No model takes part." },
          { actor: "code", name: "Schema check", text: "Only a reading that passed the check reaches the calculation." },
          { actor: "model", name: "Vision OCR", text: "The hours began as a vision model's reading of the photo." },
          { actor: "you", name: "Photo arrives", text: "Sent from a phone, through a Telegram bot or the CLI." },
        ],
      },
      {
        id: "burn",
        label: "Burn",
        value: "$552.38 AUD",
        trace: [
          { actor: "code", name: "Calculation", text: "Every item in the local ledger is normalised to a weekly amount and summed. Pure function, no I/O." },
          { actor: "you", name: "Local ledger", text: "A ledger file on the machine that runs the pipeline. Its line items are never sent to a model." },
        ],
      },
      {
        id: "surplus",
        label: "Surplus",
        value: "$397.62 AUD | STABLE",
        trace: [
          { actor: "code", name: "Calculation", text: "Gross pay minus weekly burn, then classified by the same pure function. No model takes part." },
          { actor: "code", name: "Schema check", text: "Gross pay comes from hours that passed the check; burn comes from the local ledger." },
          { actor: "model", name: "Vision OCR", text: "The hours began as a vision model's reading of the photo." },
          { actor: "you", name: "Photo arrives", text: "Sent from a phone, through a Telegram bot or the CLI." },
        ],
      },
      {
        id: "audit",
        label: "Audit",
        prose: true,
        trace: [
          { actor: "model", name: "Audit model", text: "A second model streams prose token by token into the place the code left for it. It explains the figures; it never produces one." },
          { actor: "code", name: "Minimised payload", text: "The audit payload is composed from the metrics, the hours and the pay period. Ledger line items are not part of it." },
          { actor: "code", name: "Calculation", text: "Every figure the prose can refer to was computed before the model was called." },
        ],
      },
    ],
    // A reading the schema rejects goes no further than the check.
    misread: {
      label: "Misread the hours as 380",
      reset: "Back to the report",
      message: "Could not pinpoint the 'Running Total'. Try a clearer shot.",
      trace: [
        { actor: "code", name: "Schema check", text: "Rejected: no week has 380 hours. Nothing further runs: no calculation, no payload, no audit model." },
        { actor: "model", name: "Vision OCR", text: "The vision model read the running total as 380." },
        { actor: "you", name: "Photo arrives", text: "Sent from a phone, through a Telegram bot or the CLI. The sender is asked for a clearer photo." },
      ],
    },
  },
};
