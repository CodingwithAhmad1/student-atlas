import type { NationalityOverlay } from "../types";

/**
 * Saudi Arabia — nationality overlay (Tier A).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "student": {
    "documents": {
      US: {
        callouts: [
          {
            afterBlockId: "us-docs-identity",
            blocks: [{ type: "paragraph", text: "Whether a foreign degree is recognised in Saudi Arabia (**equivalency**) depends on the Ministry of Education's prior approval to study abroad for self-funded students and on the institution and programme being on the Ministry's recommended list; a branch campus must itself be on the list [CITE: eqs.moe.gov.sa/equivalency-rules-summary]. Study is expected to be full-time with residence in the country of study (part-time is possible at master's and doctoral level), and the documents must be authenticated by the Saudi cultural attaché in the country that issued the degree [CITE: eqs.moe.gov.sa/equivalency-rules-summary]." }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-identity",
            blocks: [{ type: "paragraph", text: "Whether a foreign degree is recognised in Saudi Arabia (**equivalency**) depends on the Ministry of Education's prior approval to study abroad for self-funded students and on the institution and programme being on the Ministry's recommended list; a branch campus must itself be on the list [CITE: eqs.moe.gov.sa/equivalency-rules-summary]. Study is expected to be full-time with residence in the country of study (part-time is possible at master's and doctoral level), and the documents must be authenticated by the Saudi cultural attaché in the country that issued the degree [CITE: eqs.moe.gov.sa/equivalency-rules-summary]." }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-identity",
            blocks: [{ type: "paragraph", text: "Whether a foreign degree is recognised in Saudi Arabia (**equivalency**) depends on the Ministry of Education's prior approval to study abroad for self-funded students and on the institution and programme being on the Ministry's recommended list; a branch campus must itself be on the list [CITE: eqs.moe.gov.sa/equivalency-rules-summary]. Study is expected to be full-time with residence in the country of study (part-time is possible at master's and doctoral level), and the documents must be authenticated by the Saudi cultural attaché in the country that issued the degree [CITE: eqs.moe.gov.sa/equivalency-rules-summary]." }],
          },
        ],
      },
    },
    "overview": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-overview-kvlist",
            blocks: [{ type: "paragraph", text: "Saudi Arabia's Ministry of Education equates a three-year UK bachelor's degree with a full bachelor's only if the student first completed a Foundation Year and graduated with an honours degree; otherwise it counts as a three-year bachelor's, and an engineering degree counts as a technology bachelor's rather than engineering [CITE: eqs.moe.gov.sa/equivalency-rules-summary]. Medicine and dentistry need five years of study plus an internship year [CITE: eqs.moe.gov.sa/equivalency-rules-summary]." }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-overview-kvlist",
            blocks: [{ type: "paragraph", text: "Saudi Arabia's Ministry of Education equates a three-year Australian bachelor's degree with a full bachelor's only if the student first completed a Foundation Year and graduated with an honours degree; otherwise it counts as a three-year bachelor's, and an engineering degree counts as a technology bachelor's rather than engineering [CITE: eqs.moe.gov.sa/equivalency-rules-summary]. Medicine and dentistry need five years of study plus an internship year [CITE: eqs.moe.gov.sa/equivalency-rules-summary]." }],
          },
        ],
      },
      US: {
        callouts: [
          {
            afterBlockId: "us-overview-kvlist",
            blocks: [{ type: "paragraph", text: "Saudi Arabia's Ministry of Education equates US professional doctorates such as the MD, PharmD, JD, DPT and DVM with a bachelor's degree only, not a doctorate [CITE: eqs.moe.gov.sa/equivalency-rules-summary]. It also does not equate a master's designed for non-specialists with a specialist master's in that field [CITE: eqs.moe.gov.sa/equivalency-rules-summary]." }],
          },
        ],
      },
    },
  },
};

export default overlay;
