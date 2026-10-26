import type { NationalityOverlay } from "../types";

/**
 * Nigeria — nationality overlay (Tier A).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "student": {
    "application-process": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-process-tb",
            blocks: [{ type: "paragraph", text: "Home Office-approved TB test clinics in Nigeria are in Lagos (four clinics, including IOM), Abuja (IOM) and Benin (IOM). A test from any other clinic is not accepted. [CITE: gov.uk/tb-clinics-nigeria]" }],
          },
        ],
      },
    },
    "documents": {
      US: {
        callouts: [
          {
            afterBlockId: "us-docs-financial",
            blocks: [{ type: "paragraph", text: "The Central Bank of Nigeria lists school fees among the eligible transactions on the Nigerian Foreign Exchange Market (NFEM), with applications processed by deposit money banks. [CITE: cbn.gov.ng/fx-market] Families paying tuition abroad apply through their own bank." }],
          },
          {
            afterBlockId: "us-docs-identity",
            blocks: [{ type: "paragraph", text: "The Federal Ministry of Education authenticates Nigerian academic qualifications for further studies abroad. [CITE: education.gov.ng/education-support-services] As of September 2026, authentication and evaluation requests go through the online portal essverify.education.gov.ng, and transcripts must be emailed to the Ministry directly by the institution. [CITE: fmino.gov.ng/ess-online-verification]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-financial-rule",
            blocks: [{ type: "paragraph", text: "The Central Bank of Nigeria lists school fees among the eligible transactions on the Nigerian Foreign Exchange Market (NFEM), with applications processed by deposit money banks. [CITE: cbn.gov.ng/fx-market] Families paying tuition abroad apply through their own bank." }],
          },
          {
            afterBlockId: "uk-docs-identity",
            blocks: [{ type: "paragraph", text: "The Federal Ministry of Education authenticates Nigerian academic qualifications for further studies abroad. [CITE: education.gov.ng/education-support-services] As of September 2026, authentication and evaluation requests go through the online portal essverify.education.gov.ng, and transcripts must be emailed to the Ministry directly by the institution. [CITE: fmino.gov.ng/ess-online-verification]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-financial",
            blocks: [{ type: "paragraph", text: "The Central Bank of Nigeria lists school fees among the eligible transactions on the Nigerian Foreign Exchange Market (NFEM), with applications processed by deposit money banks. [CITE: cbn.gov.ng/fx-market] Families paying tuition abroad apply through their own bank." }],
          },
          {
            afterBlockId: "au-docs-identity",
            blocks: [{ type: "paragraph", text: "The Federal Ministry of Education authenticates Nigerian academic qualifications for further studies abroad. [CITE: education.gov.ng/education-support-services] As of September 2026, authentication and evaluation requests go through the online portal essverify.education.gov.ng, and transcripts must be emailed to the Ministry directly by the institution. [CITE: fmino.gov.ng/ess-online-verification]" }],
          },
        ],
      },
    },
    "after-arrival": {
      US: {
        callouts: [
          {
            afterBlockId: "us-arrival-travel",
            blocks: [{ type: "paragraph", text: "Nigerian graduates of foreign universities who want NYSC mobilisation must show, in their Nigerian passport, the entry visa for the country of study, departure and return dates, and a residence permit or visa covering the whole period of study, plus the data pages of every passport used. [CITE: nysc.gov.ng/foreign-trained-graduates] Keep old passports and visa pages until NYSC registration is done." }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-arrival-intro",
            blocks: [{ type: "paragraph", text: "Nigerian graduates of foreign universities who want NYSC mobilisation must show, in their Nigerian passport, the entry visa for the country of study, departure and return dates, and a residence permit or visa covering the whole period of study, plus the data pages of every passport used. [CITE: nysc.gov.ng/foreign-trained-graduates] Keep old passports and visa pages until NYSC registration is done." }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-arrival-work",
            blocks: [{ type: "paragraph", text: "Nigerian graduates of foreign universities who want NYSC mobilisation must show, in their Nigerian passport, the entry visa for the country of study, departure and return dates, and a residence permit or visa covering the whole period of study, plus the data pages of every passport used. [CITE: nysc.gov.ng/foreign-trained-graduates] Keep old passports and visa pages until NYSC registration is done." }],
          },
        ],
      },
    },
  },
  "work": {
    "post-study-work": {
      UK: {
        callouts: [
          {
            afterBlockId: "uk-psw-transition",
            blocks: [{ type: "paragraph", text: "Nigerian nationals are eligible for **Commonwealth Master's Scholarships** to study in the UK. Scholars sign an undertaking to return home before their student visa expires, and switching to the Graduate visa or another visa to stay in the UK is not permitted. [CITE: cscuk.fcdo.gov.uk/commonwealth-masters-scholarships]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
