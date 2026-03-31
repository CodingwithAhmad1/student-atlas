import type { Profile } from "../types";

/** Domestic US profile — replaces US tourist visa content for US citizens */
export const domesticUsVisit: Profile = {
  "entry-requirement": [
    {
      id: "us-domestic-visit-intro",
      block: {
        type: "paragraph",
        text: "As a **United States citizen**, you have an absolute right to enter and reside in the United States. No visa, ESTA, or travel authorisation of any kind is required. US citizens cannot be denied entry to the United States.",
      },
    },
    {
      id: "us-domestic-visit-details",
      block: {
        type: "key-value-list",
        items: [
          { label: "Visa required", value: "No — constitutional right of entry" },
          { label: "Stay limit", value: "None — unlimited" },
          { label: "Fee", value: "None" },
          { label: "Documentation", value: "Valid US passport" },
        ],
      },
    },
  ],
  "how-to-apply": [
    {
      id: "us-domestic-visit-apply",
      block: {
        type: "paragraph",
        text: "No application is needed. As a US citizen, present your valid US passport at the border. US citizens can use Automated Passport Control (APC) kiosks or Global Entry for faster processing at major airports. There is no limit on the length or frequency of your stays.",
      },
    },
  ],
};
