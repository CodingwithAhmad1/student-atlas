import type { NationalityOverlay } from "../types";

/**
 * Mexico — nationality overlay (Tier A).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "visit": {
    "entry-requirement": {
      US: {
        callouts: [
          {
            afterBlockId: "us-entry-visa-description",
            blocks: [{ type: "paragraph", text: "A **Border Crossing Card** held by a Mexican parent also serves as a B-1/B-2 visitor visa: with a valid passport it is accepted at all land, air and sea ports of entry, but on its own only for travel from Mexico by land, pleasure vessel or ferry. [CITE: cbp.gov/whti-faqs] Visitors admitted at the land border who travel beyond the border zone (generally 25 miles from the border; 75 miles in Arizona and 55 miles in New Mexico) or stay longer than 30 days also need a Form I-94. [CITE: cbp.gov/cbp-dec-13-09]" }],
          },
        ],
      },
    },
  },
  "student": {
    "documents": {
      US: {
        callouts: [
          {
            afterBlockId: "us-docs-identity",
            blocks: [{ type: "paragraph", text: "A Mexican student under 18 who travels abroad alone or with an adult other than a parent needs a **SAM form** (Formato de Salida de Menores): parents fill it in online at the National Migration Institute (INM), an INM officer stamps it, and it is free and valid for 180 days. A notarised letter or a court authorisation are the alternatives. The rule also applies to minors with dual nationality where one nationality is Mexican. [CITE: gob.mx/inm-formato-sam]" }],
          },
          {
            afterBlockId: "us-docs-financial",
            blocks: [{ type: "paragraph", text: "As of September 2026, the science ministry SECIHTI runs an annual scholarship call for Mexican nationals admitted to in-person master's or doctoral programmes abroad. Applicants selected in the 2026 call had to sign a letter committing to return and work in Mexico's public, social or private sector after the programme, and register a Mexican bank account. [CITE: secihti.mx/bext-2026]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-identity",
            blocks: [{ type: "paragraph", text: "A Mexican student under 18 who travels abroad alone or with an adult other than a parent needs a **SAM form** (Formato de Salida de Menores): parents fill it in online at the National Migration Institute (INM), an INM officer stamps it, and it is free and valid for 180 days. A notarised letter or a court authorisation are the alternatives. The rule also applies to minors with dual nationality where one nationality is Mexican. [CITE: gob.mx/inm-formato-sam]" }],
          },
          {
            afterBlockId: "uk-docs-financial-rule",
            blocks: [{ type: "paragraph", text: "As of September 2026, the science ministry SECIHTI runs an annual scholarship call for Mexican nationals admitted to in-person master's or doctoral programmes abroad. Applicants selected in the 2026 call had to sign a letter committing to return and work in Mexico's public, social or private sector after the programme, and register a Mexican bank account. [CITE: secihti.mx/bext-2026]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-identity",
            blocks: [{ type: "paragraph", text: "A Mexican student under 18 who travels abroad alone or with an adult other than a parent needs a **SAM form** (Formato de Salida de Menores): parents fill it in online at the National Migration Institute (INM), an INM officer stamps it, and it is free and valid for 180 days. A notarised letter or a court authorisation are the alternatives. The rule also applies to minors with dual nationality where one nationality is Mexican. [CITE: gob.mx/inm-formato-sam]" }],
          },
          {
            afterBlockId: "au-docs-financial",
            blocks: [{ type: "paragraph", text: "As of September 2026, the science ministry SECIHTI runs an annual scholarship call for Mexican nationals admitted to in-person master's or doctoral programmes abroad. Applicants selected in the 2026 call had to sign a letter committing to return and work in Mexico's public, social or private sector after the programme, and register a Mexican bank account. [CITE: secihti.mx/bext-2026]" }],
          },
        ],
      },
    },
    "after-arrival": {
      US: {
        callouts: [
          {
            afterBlockId: "us-arrival-travel",
            blocks: [{ type: "paragraph", text: "Mexican men aged 18 to 40 who live abroad can obtain their military service card (Cartilla del Servicio Militar Nacional) free at a Mexican consulate, showing documents such as a study certificate that prove they will stay abroad for at least a year. [CITE: consulmex.sre.gob.mx/nuevayork-cartilla]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-arrival-intro",
            blocks: [{ type: "paragraph", text: "Mexican men aged 18 to 40 who live abroad can obtain their military service card (Cartilla del Servicio Militar Nacional) free at a Mexican consulate, showing documents such as a study certificate that prove they will stay abroad for at least a year. [CITE: consulmex.sre.gob.mx/nuevayork-cartilla]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-arrival-work",
            blocks: [{ type: "paragraph", text: "Mexican men aged 18 to 40 who live abroad can obtain their military service card (Cartilla del Servicio Militar Nacional) free at a Mexican consulate, showing documents such as a study certificate that prove they will stay abroad for at least a year. [CITE: consulmex.sre.gob.mx/nuevayork-cartilla]" }],
          },
        ],
      },
    },
  },
  "work": {
    "post-study-work": {
      US: {
        callouts: [
          {
            afterBlockId: "us-psw-cliff",
            blocks: [{ type: "paragraph", text: "A foreign degree gains official validity in Mexico through **revalidación** by the Secretaría de Educación Pública (SEP); full revalidation is required to obtain a cédula profesional. [CITE: gob.mx/sep-revalidacion-superior]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-psw-transition",
            blocks: [{ type: "paragraph", text: "A foreign degree gains official validity in Mexico through **revalidación** by the Secretaría de Educación Pública (SEP); full revalidation is required to obtain a cédula profesional. [CITE: gob.mx/sep-revalidacion-superior]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-psw-application",
            blocks: [{ type: "paragraph", text: "A foreign degree gains official validity in Mexico through **revalidación** by the Secretaría de Educación Pública (SEP); full revalidation is required to obtain a cédula profesional. [CITE: gob.mx/sep-revalidacion-superior]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
