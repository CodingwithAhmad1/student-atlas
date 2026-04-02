import type { Profile } from "../types";

export const touristVisaAuEta: Profile = {
  "entry-requirement": [
    {
      id: "au-eta-intro",
      block: {
        type: "paragraph",
        text: "The [TERM: eta|Electronic Travel Authority (ETA)] \u2014 Subclass 601 \u2014 allows eligible nationals to visit Australia without a full visitor visa. The ETA is a pre-travel authorisation applied for electronically and linked to your passport. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601]",
      },
    },
    {
      id: "au-eta-details",
      block: {
        type: "paragraph",
        text: "The ETA is valid for 12 months from the date of issue (or until passport expiry, whichever is sooner) and allows multiple visits of up to three months each. If you need to stay longer than three months on a single trip \u2014 for example, to be present around your child\u2019s graduation period and travel within Australia \u2014 you would need to apply for a **Visitor visa (Subclass 600)** instead, which allows stays of up to 12 months. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600]",
      },
    },
    {
      id: "au-eta-kvlist",
      block: {
        type: "key-value-list",
        items: [
          {
            label: "ETA fee",
            value: "AUD $20 [CITE: immi.homeaffairs.gov.au/eta]",
          },
          {
            label: "Application",
            value: "via Australian ETA app (iOS/Android)",
          },
          {
            label: "Processing",
            value: "typically instant",
          },
          {
            label: "Validity",
            value: "12 months from issue or passport expiry",
          },
          {
            label: "Maximum stay per visit",
            value: "3 months",
          },
          {
            label: "Multiple entries",
            value: "yes",
          },
          {
            label: "Alternative if longer stay needed",
            value: "Visitor visa Subclass 600 (up to 12 months)",
          },
        ],
      },
    },
  ],
  "how-to-apply": [
    {
      block: {
        type: "paragraph",
        text: "The Australian ETA (Subclass 601) is applied for through the **Australian ETA app**, available on iOS and Android. [CITE: immi.homeaffairs.gov.au/eta]",
      },
    },
    {
      block: {
        type: "heading",
        level: 4,
        text: "How to apply",
      },
    },
    {
      id: "au-eta-apply-process",
      block: {
        type: "paragraph",
        text: "Download the Australian ETA app. Scan your passport\u2019s biodata page using the app, provide a valid email address, and pay AUD $20 by card. Approval is typically instant. The ETA is linked electronically to your passport \u2014 there is no document to print or carry. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601]",
      },
    },
    {
      block: {
        type: "bullet-list",
        items: [
          "Valid passport (scan the biodata page using the app)",
          "A valid email address",
          "Payment of AUD $20 by card",
        ],
      },
    },
    {
      block: {
        type: "heading",
        level: 4,
        text: "If you need to stay longer than 3 months",
      },
    },
    {
      id: "au-eta-longer-stay",
      block: {
        type: "paragraph",
        text: "Apply for a **Visitor visa \u2014 Subclass 600** instead. This allows stays of up to 12 months and requires a standard online application with supporting documents. Fee: AUD $190. Processing time: typically 20 to 30 days. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600]",
      },
    },
    {
      block: {
        type: "heading",
        level: 4,
        text: "Documents recommended to carry when travelling",
      },
    },
    {
      block: {
        type: "bullet-list",
        items: [
          "Printed copy of your ETA approval email",
          "Child\u2019s enrollment confirmation at their Australian institution",
          "Evidence of onward travel",
        ],
      },
    },
  ],
};
