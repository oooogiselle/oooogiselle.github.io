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
    stack: ["LLM tool routing", "internal tool APIs"],
    diff: {
      before: ["a prompt reached Fuse with no way to choose a tool"],
      after: ["prompts route to the right internal tool automatically"],
    },
    body: [
      "Fuse AI is an internal assistant for Siemens engineers. My piece was the router: the layer that reads a user's prompt and decides which internal tool should answer it.",
      "The engineering was dispatch logic. The actual work was upstream of that — you cannot route a request until you know what people ask for and how their words map onto the tools available. That meant learning how chip designers describe their own problems, which is not how the tools are named.",
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
    stack: ["NestJS", "Next.js", "Postgres + pgvector", "Claude API", "Deepgram"],
    diff: {
      before: ["rare disease information spread across 213 separate entries"],
      after: ["one clinical chatbot answers across all 213"],
    },
    body: [
      "ZebraMD is a rare disease patient platform. I built the clinical chatbot on top of a hybrid vector search over 213 disease entries.",
      "Rare disease is a domain where being confidently wrong is not a neutral outcome, so the retrieval design was as much about what the system refuses to answer as what it returns.",
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
    stack: ["knowledge graph", "CI pipeline", "contextual help"],
    diff: {
      before: ["product documentation lived outside the product"],
      after: ["docs generate from a knowledge graph, in context, on every build"],
    },
    body: [
      "Ask-in-Context is a contextual help system: it auto-generates in-product documentation through a CI pipeline grounded in a knowledge graph, so an answer appears where someone is already stuck rather than in a separate doc site.",
      "Generated documentation is only useful if it stays correct, which makes the pipeline's grounding — not its output — the part that matters.",
    ],
  },
];
