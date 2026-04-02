import type { Profile } from "../types";

/** Visa Waiver Program (ESTA) — replaces US tourist visa base content
 *  for nationalities eligible for the VWP (UK, Japan, Germany, etc.) */
export const touristVisaUsVwp: Profile = {
  "entry-requirement": [
    {
      id: "us-vwp-intro",
      block: {
        type: "paragraph",
        text: "As a national of a **Visa Waiver Program (VWP)** country, you do not need a B-1/B-2 visitor visa to enter the United States for tourism or business visits of up to 90 days. Instead, you need an [TERM: esta|Electronic System for Travel Authorization (ESTA)] before travelling. [CITE: travel.state.gov/esta-countries]",
      },
    },
    {
      id: "us-vwp-context",
      block: {
        type: "paragraph",
        text: "ESTA is not a visa — it is a pre-travel authorisation linked to your passport. It does not require a consular interview, an appointment, or a visit to an embassy. The application is completed entirely online and is typically approved within minutes, though it can take up to 72 hours. Once approved, ESTA is valid for two years or until your passport expires (whichever is sooner) and allows multiple trips of up to 90 days each.",
      },
    },
    {
      id: "us-vwp-details",
      block: {
        type: "key-value-list",
        items: [
          {
            label: "ESTA fee",
            value: "$21 [CITE: travel.state.gov/esta-countries]",
          },
          {
            label: "Application",
            value: "online only at esta.cbp.dhs.gov, no appointment needed",
          },
          {
            label: "Processing time",
            value: "usually minutes, up to 72 hours",
          },
          {
            label: "Validity",
            value: "2 years or passport expiry, whichever is sooner",
          },
          {
            label: "Maximum stay",
            value: "90 days per visit (cannot be extended)",
          },
        ],
      },
    },
    {
      id: "us-vwp-important",
      block: {
        type: "paragraph",
        text: "Important: The 90-day VWP stay **cannot be extended** and you cannot change immigration status (e.g. to a student or work visa) while in the US on ESTA. If you anticipate needing to stay longer than 90 days, you should apply for a B-1/B-2 visa instead. For parents visiting a child at university, a 90-day stay is typically sufficient for each visit, and the 2-year ESTA validity allows for multiple trips.",
      },
    },
  ],
  "how-to-apply": [
    {
      block: {
        type: "paragraph",
        text: "Applying for ESTA is straightforward and can be done from home at any time before travel. Apply at least 72 hours before departure, though earlier is recommended.",
      },
    },
    {
      block: {
        type: "heading",
        level: 3,
        text: "ESTA application process",
      },
    },
    {
      id: "us-vwp-apply-process",
      block: {
        type: "ordered-list",
        items: [
          "Visit the official ESTA website at esta.cbp.dhs.gov. Be cautious of unofficial third-party sites that charge higher fees.",
          "Complete the application form with your passport details, travel information, and eligibility questions.",
          "Pay the $21 fee by credit or debit card.",
          "Receive your authorization — usually approved within minutes. Check the status online if not immediate.",
          "Print or save a copy of your approval (though airlines can verify electronically).",
        ],
      },
    },
    {
      block: {
        type: "heading",
        level: 3,
        text: "What if ESTA is denied?",
      },
    },
    {
      id: "us-vwp-denied",
      block: {
        type: "paragraph",
        text: "If your ESTA application is denied, you will need to apply for a regular B-1/B-2 visitor visa at a US Embassy or Consulate. Common reasons for denial include prior visa overstays, certain criminal convictions, or travel to specific countries. An ESTA denial does not prevent you from obtaining a visa through the standard application process.",
      },
    },
    {
      block: {
        type: "heading",
        level: 3,
        text: "Documents to carry when travelling",
      },
    },
    {
      block: {
        type: "bullet-list",
        items: [
          "Valid passport (must be an e-Passport with a chip for VWP travel)",
          "ESTA approval confirmation (printed or digital)",
          "Return or onward flight ticket (required for VWP entry)",
          "Evidence of accommodation and travel plans",
          "Evidence of sufficient funds for the visit",
        ],
      },
    },
  ],
};
