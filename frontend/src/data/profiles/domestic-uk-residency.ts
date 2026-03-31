import type { Profile } from "../types";

/** Domestic UK profile — replaces UK residency content for British citizens */
export const domesticUkResidency: Profile = {
  "permanent-residency": [
    {
      id: "uk-domestic-pr",
      block: {
        type: "paragraph",
        text: "As a **British citizen**, you already hold the highest form of immigration status in the UK. You do not need Indefinite Leave to Remain (ILR) or any residency permit. You have a permanent, irrevocable right to live in the United Kingdom. Your citizenship cannot be taken away except in extremely rare circumstances (such as fraud in the naturalisation process or certain national security grounds).",
      },
    },
    {
      id: "uk-domestic-pr-details",
      block: {
        type: "key-value-list",
        items: [
          { label: "Residency status", value: "Citizen — no application needed" },
          { label: "Right to vote", value: "Yes — in all UK elections" },
          { label: "NHS access", value: "Full access, no surcharge" },
          { label: "Benefits eligibility", value: "Full access to UK welfare system" },
        ],
      },
    },
  ],
};
