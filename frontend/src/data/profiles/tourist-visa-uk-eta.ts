import type { Profile } from "../types";

export const touristVisaUkEta: Profile = {
  "entry-requirement": [
    {
      id: "uk-eta-intro",
      block: {
        type: "paragraph",
        text: "The UK [TERM: eta|Electronic Travel Authorisation (ETA)] scheme allows eligible nationals to visit the United Kingdom without a full visitor visa. The ETA is a pre-travel authorisation linked electronically to your passport. [CITE: gov.uk/uk-eta]",
      },
    },
    {
      id: "uk-eta-context",
      block: {
        type: "paragraph",
        text: "The ETA is not a visa. It does not require an appointment, a visit to a visa application centre, or an interview. It is applied for entirely online and is typically approved within minutes, though it can take up to three working days. Once approved, it is valid for two years or until your passport expires (whichever is sooner) and allows multiple trips of up to six months each.",
      },
    },
    {
      id: "uk-eta-details",
      block: {
        type: "key-value-list",
        items: [
          {
            label: "ETA fee",
            value: "\u00A320 [CITE: gov.uk/uk-eta]",
          },
          {
            label: "Application",
            value: "online only, no appointment needed",
          },
          {
            label: "Processing time",
            value: "usually minutes, up to 3 working days",
          },
          {
            label: "Validity",
            value: "2 years or passport expiry, whichever is sooner",
          },
          {
            label: "Maximum stay per visit",
            value: "6 months",
          },
          {
            label: "Multiple entries",
            value: "yes",
          },
        ],
      },
    },
  ],
  "how-to-apply": [
    {
      block: {
        type: "paragraph",
        text: "The UK ETA application is made entirely online \u2014 there is no interview, no visa application centre visit, and no document upload required. [CITE: gov.uk/uk-eta]",
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
      id: "uk-eta-apply-process",
      block: {
        type: "paragraph",
        text: "Apply through the official UK ETA app (available on iOS and Android) or via the GOV.UK website. You will need your passport, a photograph taken using the app\u2019s face-scan feature, a valid email address, and \u00A310 payment by card. The application takes approximately 10 minutes. Approval is typically received within minutes by email, though it can take up to three working days. The ETA is linked electronically to your passport \u2014 there is no document to print or carry. Border officers can see it when they scan your passport. [CITE: gov.uk/uk-eta]",
      },
    },
    {
      block: {
        type: "bullet-list",
        items: [
          "Valid passport",
          "A photograph taken using the app\u2019s face-scan feature",
          "A valid email address",
          "Payment of \u00A320 by card",
        ],
      },
    },
    {
      block: {
        type: "heading",
        level: 4,
        text: "If your ETA is refused",
      },
    },
    {
      id: "uk-eta-refused",
      block: {
        type: "paragraph",
        text: "If your ETA application is refused, you can apply for a **UK Standard Visitor Visa** instead. This requires a full application with supporting documents and a fee of \u00A3135. [CITE: gov.uk/standard-visitor-visa]",
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
          "Child\u2019s enrollment confirmation at their UK institution",
          "Evidence of onward travel",
        ],
      },
    },
  ],
};
