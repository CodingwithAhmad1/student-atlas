import type { Profile } from "../types";

/** Domestic AU profile — replaces AU tourist visa content for Australian citizens */
export const domesticAuVisit: Profile = {
  "entry-requirement": [
    {
      id: "au-domestic-visit-intro",
      block: {
        type: "paragraph",
        text: "As an **Australian citizen**, you have an absolute right to enter and reside in Australia. No visa, ETA, or travel authorisation of any kind is required. Australian citizens cannot be denied entry to Australia.",
      },
    },
    {
      id: "au-domestic-visit-details",
      block: {
        type: "key-value-list",
        items: [
          { label: "Visa required", value: "No — constitutional right of entry" },
          { label: "Stay limit", value: "None — unlimited" },
          { label: "Fee", value: "None" },
          { label: "Documentation", value: "Valid Australian passport" },
        ],
      },
    },
  ],
  "how-to-apply": [
    {
      id: "au-domestic-visit-apply",
      block: {
        type: "paragraph",
        text: "No application is needed. As an Australian citizen, present your valid Australian passport at the border. Australian citizens can use SmartGate automated kiosks at major Australian airports for faster processing. There is no limit on the length or frequency of your stays.",
      },
    },
  ],
};
