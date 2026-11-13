import {
  DISPATCH_CASE_STUDY,
  DSH_CASE_STUDY,
  FLICKSIDE_CASE_STUDY,
  MARSHAL_CASE_STUDY,
  MELBOURNE_CASE_STUDY,
  MONEYGUARD_CASE_STUDY,
  caseStudyHref,
} from "./caseStudies";

// Work is an overview first: four pieces, each a different kind of work, so a
// reader can compare them before opening one. Flickside leads and takes the
// largest place. Depth lives on the case-study pages; the homepage keeps only
// what a reader needs to decide whether to open one. ByteCroniX is employment,
// not a project with a page of its own, so its account follows the overview
// under `experience`. Smaller evidence is listed once, after that.
//
// A card is a kind, a name, one decision and a small picture: enough to choose
// by. `teaser` names that picture, one kind per piece: the
// app's own screens, two observed totals on one scale, three lines of the
// tracked-changes sheet, and three lines of the receipt. Every number a teaser
// shows must already be supported by the copy or figure it comes from.
export const WORK = {
  heading: "Work",
  intro: "Four pieces of work, four kinds of problem. Each one opens on a decision I made.",
  overviewLabel: "Choose a piece of work",
  overview: [
    {
      id: "flickside",
      kind: "Mobile product",
      name: FLICKSIDE_CASE_STUDY.title,
      lead: true,
      context: "iPhone app and website · 2026",
      line: "Who’s out throwing?",
      summary:
        "I built Flickside so ultimate frisbee players can tell friends they’re at the field with one tap. A friend can ask to join. When the throw ends, the player keeps a dated stamp in their journal.",
      decision:
        "Sharing a precise spot is optional. The backend lets accepted friends see it until the throw ends or two hours pass.",
      status: FLICKSIDE_CASE_STUDY.stack,
      link: { label: "Read the Flickside story", href: caseStudyHref(FLICKSIDE_CASE_STUDY.slug) },
      teaser: "screens",
      // The app's own light, left to right: afternoon, golden hour, under lights.
      screens: [
        {
          src: "/images/flickside/now-idle.webp",
          alt: "The Flickside Now screen in afternoon light: a white disc labelled ‘I’m throwing’, and two friends listed as out now.",
        },
        {
          src: "/images/flickside/place-shared.webp",
          alt: "The Now screen at golden hour: ‘You’re out throwing’, a ring at 1:52 of two hours.",
        },
        {
          src: "/images/flickside/stamps.webp",
          alt: "The My Throws journal at night: four dated stamps for November.",
        },
      ],
      note: "App demo with fictional people.",
    },
    {
      id: "bytecronix",
      kind: "Work experience",
      name: "ByteCroniX",
      context: "Full-Stack Developer, AI SaaS · Mar to Jun 2025",
      headline: "From 26.7 seconds to 5.6.",
      link: { label: "Read about the role", href: "#bytecronix" },
      teaser: "scale",
      scale: { before: "Before", after: "After" },
      note: "One local integration-test observation, drawn to one scale.",
    },
    {
      id: "marshal",
      kind: "Workflow design",
      name: MARSHAL_CASE_STUDY.title,
      context: "Self-hosted workspace · Pre-alpha",
      headline: "The useful change was removing steps.",
      link: {
        label: `Read the ${MARSHAL_CASE_STUDY.title} case study`,
        href: caseStudyHref(MARSHAL_CASE_STUDY.slug),
      },
      teaser: "edits",
      // Three lines of the tracked-changes sheet on the case-study page.
      edits: ["prompt", "ask", "generate"],
      note: "An illustration of the change.",
    },
    {
      id: "moneyguard",
      kind: "Calculation boundary",
      name: MONEYGUARD_CASE_STUDY.title,
      context: "Wage planner · Personal project",
      headline: "Keep the financial answer in code.",
      link: {
        label: `Read the ${MONEYGUARD_CASE_STUDY.title} case study`,
        href: caseStudyHref(MONEYGUARD_CASE_STUDY.slug),
      },
      source: { label: "Pipeline source", href: MONEYGUARD_CASE_STUDY.sourceUrl },
      teaser: "receipt",
      // Three lines of the receipt on the case-study page.
      receipt: ["gross", "surplus", "audit"],
      note: "Sample figures from the pipeline’s own mock run.",
    },
  ],
  // The one account that stays on the homepage in full: a job has no case-study
  // page, and a reader who hires wants the role stated plainly.
  experience: {
    id: "bytecronix",
    label: "Work experience",
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
    figure: "latency",
    figureCaption:
      "Totals are the observed local integration-test responses; the spans inside them are a sketch. Nothing else is measured here.",
  },
  // Further evidence, listed once: case studies first, then public source,
  // then the ongoing demo work.
  evidenceTitle: "More evidence",
  evidence: [
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
        title: MELBOURNE_CASE_STUDY.title,
        summary:
          "Traced silent session-role failures to fragmented authentication usage, and centralised session reads behind one database-verified guard.",
        meta: "Case study, not currently maintained",
        href: caseStudyHref(MELBOURNE_CASE_STUDY.slug),
      },
      {
        title: "Client Data Delivery Validator",
        summary:
          "Python/pandas validation workflow for synthetic client-delivery CSV data, with structured validation results and 12 pytest regression cases.",
        meta: "Source",
        href: "https://github.com/liuyuelintop/client-data-delivery-validator",
        external: true,
      },
      {
        title: "Prospective-client demos",
        summary:
          "Demonstration applications for a specialty coffee retailer and a drone training provider, built from informal briefs with Next.js 15 App Router, Clerk OAuth and Convex.",
        meta: "Sep 2025 to present",
      },
  ],
};

// Each story has its own kind of figure, chosen to match what the story
// argues. Marshal's and MoneyGuard's are drawn on their case-study pages, and
// ByteCroniX's on the homepage beside its account: Marshal's is an edited document (the change was removing steps),
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
