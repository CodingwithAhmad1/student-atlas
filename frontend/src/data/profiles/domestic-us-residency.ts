import type { Profile } from "../types";

/** Domestic US profile — replaces US residency content for US citizens */
export const domesticUsResidency: Profile = {
  "permanent-residency": [
    {
      id: "us-domestic-pr",
      block: {
        type: "paragraph",
        text: "As a **United States citizen**, you already hold the highest form of immigration status. You do not need a Green Card or any residency permit. Your right to live in the United States is permanent and constitutionally protected. US citizenship can only be lost through voluntary renunciation before a consular officer abroad — it cannot be involuntarily revoked under normal circumstances.",
      },
    },
    {
      id: "us-domestic-pr-details",
      block: {
        type: "key-value-list",
        items: [
          { label: "Residency status", value: "Citizen — no application needed" },
          { label: "Right to vote", value: "Yes — in all federal, state, and local elections" },
          { label: "Healthcare", value: "Eligible for Medicare (65+), Medicaid, ACA marketplace" },
          { label: "Benefits eligibility", value: "Full access to federal and state programs" },
        ],
      },
    },
  ],
};
