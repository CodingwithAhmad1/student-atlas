import type { Profile } from "../types";

/** Domestic UK profile — replaces UK tourist visa content for British citizens */
export const domesticUkVisit: Profile = {
  "entry-requirement": [
    {
      id: "uk-domestic-visit-intro",
      block: {
        type: "paragraph",
        text: "As a **British citizen**, you have an automatic and unconditional right to enter, live, and travel freely within the United Kingdom. No visa, travel authorisation, or entry clearance of any kind is required.",
      },
    },
    {
      id: "uk-domestic-visit-details",
      block: {
        type: "key-value-list",
        items: [
          { label: "Visa required", value: "No — full right of entry as a citizen" },
          { label: "Stay limit", value: "None — unlimited" },
          { label: "Fee", value: "None" },
          { label: "Documentation", value: "Valid British passport or proof of citizenship" },
        ],
      },
    },
  ],
  "how-to-apply": [
    {
      id: "uk-domestic-visit-apply",
      block: {
        type: "paragraph",
        text: "No application is needed. As a British citizen, simply present your valid British passport at the border. UK e-Passport holders can use the automated ePassport gates at most UK airports and Eurostar terminals for faster entry. There is no limit on the length or frequency of your stays.",
      },
    },
  ],
};
