import PropTypes from "prop-types";

// Drawn from the repository, not from the course diagrams. Two facts this
// picture is careful about: the three specialist agents are invoked with
// InvocationType="RequestResponse", so they are sequential rather than
// simultaneous; and the retrieval side is not wired into the analysis path at
// the commit this was read from, so no arrow joins them.
//
// Presentation uses SVG attributes rather than Tailwind classes so the drawing
// does not depend on utility generation. The site ships one fixed dark theme,
// so these literals have no light-mode counterpart to track.
const SURFACE = "#171717";
const EDGE = "#404040";
const ACCENT = "#22d3ee";
const LINE = "#525252";
const TITLE_FILL = "#e5e5e5";
const SUBTITLE_FILL = "#a3a3a3";
const NOTE_FILL = "#737373";

function Box({ x, y, width, height, title, subtitle, accent = false }) {
  const centerX = x + width / 2;
  const titleY = subtitle ? y + height / 2 - 2 : y + height / 2 + 5;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="6"
        fill={SURFACE}
        stroke={accent ? ACCENT : EDGE}
        strokeWidth="1"
      />
      <text
        x={centerX}
        y={titleY}
        textAnchor="middle"
        fill={TITLE_FILL}
        fontSize="13"
        fontWeight="500"
      >
        {title}
      </text>
      {subtitle && (
        <text
          x={centerX}
          y={y + height / 2 + 16}
          textAnchor="middle"
          fill={SUBTITLE_FILL}
          fontSize="11"
        >
          {subtitle}
        </text>
      )}
    </g>
  );
}

Box.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  accent: PropTypes.bool,
};

function Note({ x, y, children }) {
  return (
    <text x={x} y={y} fill={NOTE_FILL} fontSize="11">
      {children}
    </text>
  );
}

Note.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default function AlexArchitectureDiagram() {
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-900 p-4 md:p-6">
      <svg
        viewBox="0 0 880 880"
        role="img"
        aria-labelledby="alex-diagram-title alex-diagram-desc"
        className="h-auto w-full min-w-[720px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <title id="alex-diagram-title">
          The ALEX analysis path, from the Next.js frontend to the specialist agent Lambdas
        </title>
        <desc id="alex-diagram-desc">
          A request from the Next.js frontend reaches API Gateway and the API Lambda, which writes a
          job row to Aurora and enqueues a message on the analysis_jobs SQS queue, backed by a
          dead-letter queue. An event source mapping delivers the message to the planner Lambda,
          which runs a deterministic pre-pass — tagging missing instruments, updating prices and
          loading the portfolio summary — before constructing a Bedrock-backed orchestrator agent.
          That agent invokes the reporter, charter and retirement Lambdas one at a time as
          synchronous RequestResponse calls. A separate retrieval path — an ingestion Lambda using
          SageMaker embeddings, an S3 Vectors index and a researcher MCP server on App Runner — is
          not invoked by the analysis path in the repository as read.
        </desc>

        <defs>
          <marker
            id="alex-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={LINE} />
          </marker>
        </defs>

        <g stroke={LINE} strokeWidth="1.25" markerEnd="url(#alex-arrow)" fill="none">
          <line x1="190" y1="112" x2="190" y2="140" />
          <line x1="190" y1="200" x2="190" y2="224" />
          <line x1="190" y1="296" x2="190" y2="320" />
          <line x1="190" y1="384" x2="190" y2="408" />
          <line x1="190" y1="480" x2="190" y2="504" />
          <line x1="190" y1="616" x2="190" y2="656" />
          <line x1="340" y1="354" x2="372" y2="354" />
          <line x1="715" y1="168" x2="715" y2="188" />
          <line x1="715" y1="264" x2="715" y2="284" />
        </g>

        {/* The specialist fan-out: one bus, three drops. The bus carries no
            arrowhead so it does not read as a simultaneous broadcast. */}
        <g stroke={LINE} strokeWidth="1.25" fill="none">
          <path d="M 190 728 L 190 752 L 120 752" />
          <line x1="190" y1="752" x2="560" y2="752" />
        </g>
        <g stroke={LINE} strokeWidth="1.25" markerEnd="url(#alex-arrow)" fill="none">
          <line x1="120" y1="752" x2="120" y2="772" />
          <line x1="340" y1="752" x2="340" y2="772" />
          <line x1="560" y1="752" x2="560" y2="772" />
        </g>

        {/* Shared job state: a data dependency, not a step in the sequence. */}
        <line
          x1="340"
          y1="496"
          x2="572"
          y2="496"
          stroke={LINE}
          strokeWidth="1.25"
          strokeDasharray="4 4"
          markerEnd="url(#alex-arrow)"
          fill="none"
        />

        <Box x={40} y={56} width={300} height={56} title="Next.js frontend" subtitle="Clerk auth" />
        <Box x={40} y={144} width={300} height={56} title="API Gateway" />
        <Box
          x={40}
          y={224}
          width={300}
          height={72}
          title="API Lambda"
          subtitle="writes the job row, enqueues, returns"
        />
        <Box
          x={40}
          y={320}
          width={300}
          height={64}
          title="SQS analysis_jobs"
          subtitle="redrive policy"
        />
        <Box x={372} y={320} width={148} height={64} title="DLQ" subtitle="repeated failures" />
        <Box
          x={40}
          y={408}
          width={300}
          height={72}
          title="Planner Lambda"
          subtitle="SQS event source mapping"
          accent
        />

        <g>
          <rect
            x="40"
            y="504"
            width="300"
            height="112"
            rx="6"
            fill={SURFACE}
            stroke={EDGE}
            strokeWidth="1"
          />
          <text
            x="190"
            y="528"
            textAnchor="middle"
            fill={TITLE_FILL}
            fontSize="13"
            fontWeight="500"
          >
            Deterministic pre-pass
          </text>
          <text x="190" y="550" textAnchor="middle" fill={SUBTITLE_FILL} fontSize="11">
            handle_missing_instruments → Tagger Lambda
          </text>
          <text x="190" y="570" textAnchor="middle" fill={SUBTITLE_FILL} fontSize="11">
            update_instrument_prices
          </text>
          <text x="190" y="590" textAnchor="middle" fill={SUBTITLE_FILL} fontSize="11">
            load_portfolio_summary
          </text>
          <text x="190" y="608" textAnchor="middle" fill={NOTE_FILL} fontSize="11">
            no model decides whether these run
          </text>
        </g>

        <Box
          x={40}
          y={656}
          width={300}
          height={72}
          title="Planner agent"
          subtitle="Bedrock Claude via LiteLLM"
          accent
        />

        <Note x={576} y={748}>
          RequestResponse — blocking, one at a time
        </Note>

        <Box x={20} y={772} width={200} height={64} title="Reporter Lambda" subtitle="function tool" />
        <Box x={240} y={772} width={200} height={64} title="Charter Lambda" subtitle="function tool" />
        <Box
          x={460}
          y={772}
          width={200}
          height={64}
          title="Retirement Lambda"
          subtitle="function tool"
        />

        {/* Retrieval side. Deliberately unconnected — see the note inside. */}
        <rect
          x="566"
          y="56"
          width="290"
          height="352"
          rx="8"
          fill="none"
          stroke={EDGE}
          strokeWidth="1"
          strokeDasharray="5 5"
        />
        <Note x={582} y={80}>
          Retrieval path
        </Note>
        <Box
          x={580}
          y={96}
          width={270}
          height={72}
          title="Ingestion Lambda"
          subtitle="SageMaker embeddings"
        />
        <Box x={580} y={188} width={270} height={76} title="S3 Vectors index" />
        <Box
          x={580}
          y={284}
          width={270}
          height={72}
          title="researcher MCP server"
          subtitle="App Runner, Dockerised"
        />
        <Note x={582} y={384}>
          nothing in the analysis path invokes it
        </Note>

        <Box
          x={580}
          y={456}
          width={270}
          height={80}
          title="Aurora Serverless v2"
          subtitle="RDS Data API"
        />
        <Note x={580} y={558}>
          every stage reads and writes the job row here
        </Note>
      </svg>
    </div>
  );
}
