import type { Section } from "../types";

export const touristVisa: Section = {
  slug: "visit",
  title: "Tourist visa",
  subSections: [
    {
      slug: "entry-requirement",
      title: "Entry requirement",
      countries: [
        {
          country: "US",
          blocks: [
            {
              id: "us-entry-intro",
              block: {
                type: "paragraph",
                text: "To visit the United States, most nationalities require a **B-2 Tourist Visa**. The US Visa Waiver Program (VWP) covers some nationalities, but the majority must obtain a visa before travelling. [CITE: travel.state.gov/B-visa]",
              },
            },
            {
              id: "us-entry-visa-description",
              block: {
                type: "paragraph",
                text: "The B-2 visa is issued for tourism, visiting family, and medical treatment. It does not permit you to work or study. When issued, it is typically valid for **ten years** with multiple entries, so you will not need to reapply on every trip. However, each individual visit is limited \u2014 the border officer determines how long you may stay, typically granting **up to six months** per entry.",
              },
            },
            {
              id: "us-entry-no-restriction",
              block: {
                type: "paragraph",
                text: "There's no limit on how many times you visit during the visa\u2019s validity. You can travel to see your child at the start of term, come back for graduation, and visit during holidays \u2014 all on the same visa, as long as each stay does not overstay the period granted at the border.",
              },
            },
            {
              id: "us-entry-kvlist",
              block: {
                type: "key-value-list",
                items: [
                  {
                    label: "Visa fee",
                    value:
                      "$185 (non-refundable, applies whether approved or refused) [CITE: travel.state.gov/fees]",
                  },
                  {
                    label: "Typical validity on issue",
                    value: "10 years, multiple entry",
                  },
                  {
                    label: "Maximum stay per visit",
                    value:
                      "determined at port of entry, typically up to 6 months",
                  },
                  {
                    label: "[TERM: esta|ESTA] eligible",
                    value:
                      "Not for most nationalities \u2014 check VWP eligibility list [CITE: travel.state.gov/esta-countries]",
                  },
                ],
              },
            },
          ],
        },
        {
          country: "UK",
          blocks: [
            {
              id: "uk-svv-intro",
              block: {
                type: "paragraph",
                text: "To visit the United Kingdom, most nationalities require a **Standard Visitor Visa**. Some nationalities are eligible for the [TERM: eta|Electronic Travel Authorisation (ETA)], a simpler online process \u2014 if your nationality is shown as ETA-eligible when you select it above, you will see ETA-specific guidance instead. [CITE: gov.uk/standard-visitor-visa]",
              },
            },
            {
              id: "uk-svv-description",
              block: {
                type: "paragraph",
                text: "The Standard Visitor Visa allows stays of up to 6 months per visit. You apply online and then attend a [TERM: vac|Visa Application Centre (VAC)] to provide biometrics (fingerprints and a photograph). The standard fee is \u00A3135 for a visa of up to 6 months. Long-term visas are also available: 2-year (\u00A3506), 5-year (\u00A3903), and 10-year (\u00A31,128). Standard processing takes 15 working days; priority processing (5 working days) is available for an additional fee.",
              },
            },
            {
              id: "uk-svv-kvlist",
              block: {
                type: "key-value-list",
                items: [
                  {
                    label: "Visa fee",
                    value: "\u00A3135 (standard, up to 6 months) [CITE: gov.uk/standard-visitor-visa]",
                  },
                  {
                    label: "5-year visa fee",
                    value: "\u00A3903",
                  },
                  {
                    label: "10-year visa fee",
                    value: "\u00A31,128",
                  },
                  {
                    label: "Application",
                    value: "online form + in-person VAC appointment for biometrics",
                  },
                  {
                    label: "Processing time",
                    value: "15 working days (standard), 5 working days (priority, additional fee)",
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
        },
        {
          country: "AU",
          blocks: [
            {
              id: "au-600-intro",
              block: {
                type: "paragraph",
                text: "To visit Australia, most nationalities require a **Visitor visa (Subclass 600)**. Some nationalities are eligible for the [TERM: eta|Electronic Travel Authority (ETA)], Subclass 601, a simpler electronic process \u2014 if your nationality is ETA-eligible, you will see ETA-specific guidance instead. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600]",
              },
            },
            {
              id: "au-600-description",
              block: {
                type: "paragraph",
                text: "The Subclass 600 visa is applied for online through the ImmiAccount portal. No interview is required. It allows stays of up to 12 months, though visas are typically granted for 3 or 6 months. The application fee is AUD $250 when applying from outside Australia, and processing typically takes 20 to 30 working days.",
              },
            },
            {
              id: "au-600-kvlist",
              block: {
                type: "key-value-list",
                items: [
                  {
                    label: "Visa fee",
                    value: "AUD $250 (outside Australia) [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600]",
                  },
                  {
                    label: "Application",
                    value: "online via ImmiAccount",
                  },
                  {
                    label: "Processing time",
                    value: "typically 20 to 30 working days",
                  },
                  {
                    label: "Maximum stay",
                    value: "up to 12 months (typically granted 3 or 6 months)",
                  },
                  {
                    label: "Interview required",
                    value: "no",
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      slug: "how-to-apply",
      title: "How to apply",
      countries: [
        {
          country: "US",
          blocks: [
            {
              block: {
                type: "paragraph",
                text: "The B-2 visa application is a multi-step process that requires an in-person interview at the US Embassy or Consulate. [CITE: travel.state.gov/B-visa]",
              },
            },
            {
              id: "us-apply-ds160",
              block: {
                type: "step",
                number: 1,
                title: "Complete the [TERM: ds-160|DS-160] form",
                body: "The DS-160 is the online nonimmigrant visa application form. It must be completed in full before an appointment can be booked. The form collects biographical information, travel history, and the purpose of the visit. Save the confirmation page \u2014 the barcode is required at the interview. [CITE: ceac.state.gov/genniv]",
              },
            },
            {
              id: "us-apply-pay",
              block: {
                type: "step",
                number: 2,
                title: "Pay the visa fee",
                body: "The $185 [TERM: mrv-fee|MRV fee] is paid online before booking the appointment. Keep the receipt. [CITE: travel.state.gov/fees]",
              },
            },
            {
              id: "us-apply-book",
              block: {
                type: "step",
                number: 3,
                title: "Book the interview appointment",
                body: "Appointments are booked through the appointment system linked from the relevant US embassy website. [CITE: travel.state.gov/B-visa]",
              },
            },
            {
              id: "us-apply-interview",
              block: {
                type: "step",
                number: 4,
                title: "Attend the interview",
                body: "Bring the DS-160 confirmation page, your passport (and any previous passports), the fee receipt, one photograph meeting State Department specifications, and supporting documents (see below).",
              },
            },
            {
              id: "us-apply-documents-heading",
              block: {
                type: "heading",
                level: 4,
                text: "Documents to bring to the interview",
              },
            },
            {
              id: "us-apply-documents",
              block: {
                type: "bullet-list",
                items: [
                  "Valid passport with at least six months\u2019 validity beyond intended stay",
                  "DS-160 confirmation barcode page",
                  "MRV fee payment receipt",
                  "One photograph (5cm \u00d7 5cm, white background, taken within six months) [CITE: travel.state.gov/photos]",
                  "Evidence of your child\u2019s enrollment at a US institution (acceptance letter, [TERM: i-20], or current enrollment confirmation)",
                  "Evidence of your financial means (recent bank statements, salary slips, or evidence of assets)",
                  "Evidence of ties to your home country (employment letter, property ownership, family ties, return ticket)",
                  "Any previous US visas",
                ],
              },
            },
            {
              id: "us-apply-assessment-heading",
              block: {
                type: "heading",
                level: 4,
                text: "What the officer is assessing",
              },
            },
            {
              id: "us-apply-assessment",
              block: {
                type: "paragraph",
                text: "The key question in a B-2 interview is whether you intend to return home. The officer wants to see that you have meaningful reasons to go back \u2014 employment, family, property, or other obligations. Having a child studying in the US is not a negative factor — it's actually a well-understood and common reason for a B-2 application.",
              },
            },
          ],
        },
        {
          country: "UK",
          blocks: [
            {
              id: "uk-svv-apply-intro",
              block: {
                type: "paragraph",
                text: "The Standard Visitor Visa application involves an online form followed by an in-person appointment at a [TERM: vac|Visa Application Centre (VAC)]. [CITE: gov.uk/standard-visitor-visa]",
              },
            },
            {
              id: "uk-svv-apply-online",
              block: {
                type: "step",
                number: 1,
                title: "Complete the online application",
                body: "Apply online at gov.uk. You will need your passport details, travel dates, purpose of visit, accommodation details, and financial information.",
              },
            },
            {
              id: "uk-svv-apply-pay",
              block: {
                type: "step",
                number: 2,
                title: "Pay the visa fee",
                body: "The standard fee is \u00A3135. Optional priority processing is available for an additional fee.",
              },
            },
            {
              id: "uk-svv-apply-vac",
              block: {
                type: "step",
                number: 3,
                title: "Book a VAC appointment",
                body: "Book an appointment at a Visa Application Centre for biometrics (fingerprints and photograph). VACs are operated by VFS Global or TLScontact depending on your country.",
              },
            },
            {
              id: "uk-svv-apply-attend",
              block: {
                type: "step",
                number: 4,
                title: "Attend the VAC appointment",
                body: "Bring your passport, printed application confirmation, and supporting documents.",
              },
            },
            {
              block: {
                type: "heading",
                level: 4,
                text: "Documents to provide",
              },
            },
            {
              id: "uk-svv-apply-documents",
              block: {
                type: "bullet-list",
                items: [
                  "Valid passport",
                  "Printed application confirmation",
                  "Financial evidence (bank statements covering at least 6 months)",
                  "Evidence of your child\u2019s UK enrollment",
                  "Evidence of ties to your home country (employment letter, property ownership, family ties)",
                  "Accommodation details in the UK",
                  "Travel itinerary",
                ],
              },
            },
            {
              id: "uk-svv-apply-processing",
              block: {
                type: "paragraph",
                text: "A decision is typically made within 15 working days (standard) or 5 working days (priority). Your passport is returned with the visa vignette by courier.",
              },
            },
          ],
        },
        {
          country: "AU",
          blocks: [
            {
              id: "au-600-apply-intro",
              block: {
                type: "paragraph",
                text: "The Subclass 600 application is submitted online through the ImmiAccount portal. There is no interview. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600]",
              },
            },
            {
              id: "au-600-apply-account",
              block: {
                type: "step",
                number: 1,
                title: "Create an ImmiAccount",
                body: "Register for an ImmiAccount at immi.homeaffairs.gov.au.",
              },
            },
            {
              id: "au-600-apply-form",
              block: {
                type: "step",
                number: 2,
                title: "Complete the online application",
                body: "Fill in the application form and upload supporting documents: passport, financial evidence, purpose of visit, evidence of your child\u2019s Australian enrollment, and evidence of ties to your home country.",
              },
            },
            {
              id: "au-600-apply-health",
              block: {
                type: "step",
                number: 3,
                title: "Health examination",
                body: "A health examination may be required depending on your nationality and the length of your intended stay. Check the requirements during the application process.",
              },
            },
            {
              id: "au-600-apply-pay",
              block: {
                type: "step",
                number: 4,
                title: "Pay the application fee",
                body: "The fee is AUD $250 when applying from outside Australia, payable online.",
              },
            },
            {
              id: "au-600-apply-decision",
              block: {
                type: "step",
                number: 5,
                title: "Wait for the decision",
                body: "Processing typically takes 20 to 30 working days. The visa is granted electronically \u2014 there is no sticker in your passport. A grant letter is sent by email.",
              },
            },
            {
              block: {
                type: "heading",
                level: 4,
                text: "Documents to provide",
              },
            },
            {
              id: "au-600-apply-documents",
              block: {
                type: "bullet-list",
                items: [
                  "Valid passport",
                  "Financial evidence (bank statements)",
                  "Evidence of your child\u2019s enrollment at an Australian institution",
                  "Evidence of ties to your home country",
                  "Travel itinerary",
                  "Health insurance (recommended)",
                ],
              },
            },
          ],
        },
      ],
    },
  ],
};
