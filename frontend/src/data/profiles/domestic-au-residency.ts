import type { Profile } from "../types";

/** Domestic AU profile — replaces AU residency content for Australian citizens */
export const domesticAuResidency: Profile = {
  "permanent-residency": [
    {
      id: "au-domestic-pr",
      block: {
        type: "paragraph",
        text: "As an **Australian citizen**, you already hold the highest form of immigration status in Australia. You do not need permanent residency or any residency visa. Your right to live in Australia is permanent. Australian citizenship can only be lost through voluntary renunciation or, in limited circumstances, cancellation where citizenship was obtained by fraud or where a dual citizen engages in certain serious conduct.",
      },
    },
    {
      id: "au-domestic-pr-details",
      block: {
        type: "key-value-list",
        items: [
          { label: "Residency status", value: "Citizen — no application needed" },
          { label: "Right to vote", value: "Yes — compulsory in all Australian elections" },
          { label: "Healthcare", value: "Full Medicare access" },
          { label: "Benefits eligibility", value: "Full access to Centrelink and welfare system" },
        ],
      },
    },
  ],
};
