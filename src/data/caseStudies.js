// src/data/caseStudies.js
// The three featured case studies. `diff` is the signature element: it cannot
// be filled in without stating a before AND an after, which is the discipline
// the rest of the portfolio was missing.
export const caseStudies = [
  {
    id: "fuse-ai",
    path: "work/siemens-eda/fuse-ai",
    name: "Fuse AI — prompt router",
    org: "Siemens EDA",
    role: "Engineering Intern",
    dates: "Jan 2026 – Apr 2026",
    domain: "Chip design",
    status: "shipped internally",
    stack: ["LLM tool classification", "RAG", "internal tool APIs"],
    diff: {
      before: ["500+ internal tools, and a prompt chose among them blind"],
      after: ["20% fewer irrelevant tool calls, routed automatically"],
    },
    body: [
      "Fuse AI is an internal assistant for Siemens engineers. My piece was the router: the layer that reads a user's prompt and decides which of a 500+ tool toolchain should answer it.",
      "The engineering was dispatch logic. The actual work was upstream of that — you cannot route a request until you know what people ask for and how their words map onto the tools available. That meant learning how chip designers describe their own problems, which is not how the tools are named.",
      "At that number of tools, a classifier someone has to correct by hand is not a classifier, so the pipeline is self-healing rather than static. Irrelevant tool calls fell 20%.",
      "The same argument applied to failures. Root-causing a broken run meant reading logs by hand, so I replaced manual triage with an LLM/RAG pass over them — an engineer starts from a hypothesis instead of a scrollback.",
    ],
  },
  {
    id: "zebramd",
    path: "work/dali-lab/zebramd",
    name: "ZebraMD — clinical retrieval",
    org: "DALI Lab",
    role: "Fullstack Developer",
    dates: "Mar 2026 – present",
    domain: "Rare disease",
    status: "in development",
    stack: ["NestJS", "Next.js", "Postgres + pgvector", "Claude API", "Deepgram", "AWS HealthLake"],
    // The one study with a public URL — Fuse AI and Ask-in-Context are
    // internal tools. Rendered as an extra metadata row; leave the key off
    // entirely when there is nothing to link to.
    link: "https://www.zebramd.org/",
    // Drop an 840×525 .webp into public/ and point this at it (e.g.
    // "/zebramd.webp"); `imageAlt` describes what the picture shows. Left null
    // until the file exists — a broken <img> is worse than no picture. Fuse AI
    // and Ask-in-Context stay null: both are internal tools.
    image: null,
    imageAlt: "",
    diff: {
      before: ["rare disease information spread across 213 separate entries"],
      after: ["one clinical chatbot answers across all 213"],
    },
    body: [
      "ZebraMD is a rare disease patient platform. I built the clinical assistant on the Claude API: hybrid retrieval over a 213-condition corpus, combining pgvector similarity with lexical scoring, streamed back over SSE.",
      "Rare disease is a domain where being confidently wrong is not a neutral outcome, so the retrieval design was as much about what the system refuses to answer as what it returns. Answers are grounded in the patient's own record — labs, vitals, diagnoses, read from AWS HealthLake as the FHIR store — rather than in whatever the model remembers of the literature.",
      "The part I would not have predicted came from leaving the code. I interviewed about ten patients and parents; several could not type comfortably, which makes a chat box the wrong interface for exactly the people who need it most. So the assistant also listens and speaks, through a Deepgram speech-to-text and text-to-speech layer, and in before/after testing they preferred it.",
    ],
  },
  {
    id: "ask-in-context",
    path: "work/visa/ask-in-context",
    name: "Ask-in-Context — generated docs",
    org: "Visa",
    role: "SWE Intern",
    dates: "Jun 2026 – Aug 2026",
    domain: "Developer tooling",
    status: "shipped",
    stack: ["code knowledge graph", "GitHub Actions CI", "Angular/TypeScript"],
    diff: {
      before: ["product documentation lived outside the product"],
      after: ["docs generate from a knowledge graph, in context, on every build"],
    },
    body: [
      "Ask-in-Context is a contextual help system: a three-stage GenAI pipeline running in CI that regenerates developer documentation from the live codebase across 12 microservices, so an answer appears where someone is already stuck rather than in a separate doc site that quietly goes stale.",
      "Generated documentation is only useful if it stays correct, which makes the pipeline's grounding — not its output — the part that matters.",
      "So the grounding is a code knowledge graph. Architectural questions resolve against a structured graph of the codebase instead of loading whole repositories into a context window; across 11 repositories that cut inference token usage 12%.",
      "That number is what settled the argument. I ran a token-cost parity test benchmarking the graph against raw-code grounding, and the result is what moved the team to standardize on the graph — the pipeline was later picked up as the scaling model for other teams.",
    ],
  },
];
