import type { NationalityOverlay } from "../types";

/**
 * Brazil — nationality overlay (Tier A).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "student": {
    "documents": {
      US: {
        callouts: [
          {
            afterBlockId: "us-docs-identity",
            blocks: [{ type: "paragraph", text: "A Brazilian under 18 leaving Brazil alone or without one of the parents needs an **Autorização de Viagem Internacional**, which the Federal Police check only on departure from Brazil, not on return. It is separate from the authorisation to issue the passport, but can be printed on the passport's identification page (Type 1 for travel with one parent, Type 2 also covering travel unaccompanied). The cited page is in Portuguese. [CITE: gov.br/pf/autorizacao-para-menor]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-identity",
            blocks: [{ type: "paragraph", text: "A Brazilian under 18 leaving Brazil alone or without one of the parents needs an **Autorização de Viagem Internacional**, which the Federal Police check only on departure from Brazil, not on return. It is separate from the authorisation to issue the passport, but can be printed on the passport's identification page (Type 1 for travel with one parent, Type 2 also covering travel unaccompanied). The cited page is in Portuguese. [CITE: gov.br/pf/autorizacao-para-menor]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-identity",
            blocks: [{ type: "paragraph", text: "A Brazilian under 18 leaving Brazil alone or without one of the parents needs an **Autorização de Viagem Internacional**, which the Federal Police check only on departure from Brazil, not on return. It is separate from the authorisation to issue the passport, but can be printed on the passport's identification page (Type 1 for travel with one parent, Type 2 also covering travel unaccompanied). The cited page is in Portuguese. [CITE: gov.br/pf/autorizacao-para-menor]" }],
          },
        ],
      },
    },
    "after-arrival": {
      US: {
        callouts: [
          {
            afterBlockId: "us-arrival-travel",
            blocks: [{ type: "paragraph", text: "Brazilian men must enlist for military service in the first half of the year they turn 18; those living abroad do so at the Brazilian consular post for their area. [CITE: gov.br/alistar-se-no-servico-militar-no-exterior] A man who turns 19 to 45 in the current year must be in regular standing with military service to be issued a Brazilian passport. [CITE: gov.br/pf/regularidade-servico-militar] Enlisting on time keeps passport renewal abroad possible. The cited pages are in Portuguese." }],
          },
          {
            afterBlockId: "us-arrival-travel",
            blocks: [{ type: "paragraph", text: "For Brazilian income tax, a person who leaves Brazil temporarily becomes non-resident from the day after completing 12 consecutive months abroad. [CITE: gov.br/receitafederal/nao-residente] They must then submit the Comunicação de Saída Definitiva do País by the last day of February of the following year, and also file the Declaração de Saída Definitiva do País. The cited pages are in Portuguese. [CITE: gov.br/comunicar-saida-definitiva-do-pais]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-arrival-intro",
            blocks: [{ type: "paragraph", text: "Brazilian men must enlist for military service in the first half of the year they turn 18; those living abroad do so at the Brazilian consular post for their area. [CITE: gov.br/alistar-se-no-servico-militar-no-exterior] A man who turns 19 to 45 in the current year must be in regular standing with military service to be issued a Brazilian passport. [CITE: gov.br/pf/regularidade-servico-militar] Enlisting on time keeps passport renewal abroad possible. The cited pages are in Portuguese." }],
          },
          {
            afterBlockId: "uk-arrival-intro",
            blocks: [{ type: "paragraph", text: "For Brazilian income tax, a person who leaves Brazil temporarily becomes non-resident from the day after completing 12 consecutive months abroad. [CITE: gov.br/receitafederal/nao-residente] They must then submit the Comunicação de Saída Definitiva do País by the last day of February of the following year, and also file the Declaração de Saída Definitiva do País. The cited pages are in Portuguese. [CITE: gov.br/comunicar-saida-definitiva-do-pais]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-arrival-work",
            blocks: [{ type: "paragraph", text: "Brazilian men must enlist for military service in the first half of the year they turn 18; those living abroad do so at the Brazilian consular post for their area. [CITE: gov.br/alistar-se-no-servico-militar-no-exterior] A man who turns 19 to 45 in the current year must be in regular standing with military service to be issued a Brazilian passport. [CITE: gov.br/pf/regularidade-servico-militar] Enlisting on time keeps passport renewal abroad possible. The cited pages are in Portuguese." }],
          },
          {
            afterBlockId: "au-arrival-work",
            blocks: [{ type: "paragraph", text: "For Brazilian income tax, a person who leaves Brazil temporarily becomes non-resident from the day after completing 12 consecutive months abroad. [CITE: gov.br/receitafederal/nao-residente] They must then submit the Comunicação de Saída Definitiva do País by the last day of February of the following year, and also file the Declaração de Saída Definitiva do País. The cited pages are in Portuguese. [CITE: gov.br/comunicar-saida-definitiva-do-pais]" }],
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
            blocks: [{ type: "paragraph", text: "Brazilians studying abroad on a CAPES scholarship commit to returning to Brazil within 60 days of the scholarship ending and to staying in Brazil at least as long as they held the scholarship abroad. Breaking this commitment obliges them to repay the investment. The cited page is in Portuguese. [CITE: gov.br/capes/ex-bolsistas] Check this before planning post-study work abroad." }],
          },
          {
            afterBlockId: "us-psw-cliff",
            blocks: [{ type: "paragraph", text: "Back in Brazil, a foreign bachelor's degree is revalidated, and a foreign master's or doctorate recognised, through MEC's **Plataforma Carolina Bori**, the federal government's official system for validating diplomas obtained abroad. Its stated purposes include practising a profession in Brazil and continuing studies at Brazilian institutions. The cited page is in Portuguese. [CITE: gov.br/revalidar-diploma]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-psw-transition",
            blocks: [{ type: "paragraph", text: "Brazilians studying abroad on a CAPES scholarship commit to returning to Brazil within 60 days of the scholarship ending and to staying in Brazil at least as long as they held the scholarship abroad. Breaking this commitment obliges them to repay the investment. The cited page is in Portuguese. [CITE: gov.br/capes/ex-bolsistas] Check this before planning post-study work abroad." }],
          },
          {
            afterBlockId: "uk-psw-transition",
            blocks: [{ type: "paragraph", text: "Back in Brazil, a foreign bachelor's degree is revalidated, and a foreign master's or doctorate recognised, through MEC's **Plataforma Carolina Bori**, the federal government's official system for validating diplomas obtained abroad. Its stated purposes include practising a profession in Brazil and continuing studies at Brazilian institutions. The cited page is in Portuguese. [CITE: gov.br/revalidar-diploma]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-psw-application",
            blocks: [{ type: "paragraph", text: "Brazilians studying abroad on a CAPES scholarship commit to returning to Brazil within 60 days of the scholarship ending and to staying in Brazil at least as long as they held the scholarship abroad. Breaking this commitment obliges them to repay the investment. The cited page is in Portuguese. [CITE: gov.br/capes/ex-bolsistas] Check this before planning post-study work abroad." }],
          },
          {
            afterBlockId: "au-psw-application",
            blocks: [{ type: "paragraph", text: "Back in Brazil, a foreign bachelor's degree is revalidated, and a foreign master's or doctorate recognised, through MEC's **Plataforma Carolina Bori**, the federal government's official system for validating diplomas obtained abroad. Its stated purposes include practising a profession in Brazil and continuing studies at Brazilian institutions. The cited page is in Portuguese. [CITE: gov.br/revalidar-diploma]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
