import type { NationalityOverlay } from "../types";

/**
 * Indonesia — nationality overlay (Tier A).
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
            blocks: [{ type: "paragraph", text: "In Indonesia, Home Office-approved TB clinics are in Bali (Kuta), Jakarta, Surabaya and Tangerang, and UKVI does not accept a certificate from any other clinic. [CITE: gov.uk/tb-clinics-indonesia]" }],
          },
        ],
      },
    },
    "documents": {
      US: {
        callouts: [
          {
            afterBlockId: "us-docs-identity",
            blocks: [{ type: "paragraph", text: "Indonesian public documents for use abroad, such as diplomas (ijazah) and transcripts, are legalised by an **apostille** from the Ministry of Law's Directorate General of General Legal Administration (AHU), applied for online at apostille.ahu.go.id. [CITE: portal.ahu.go.id/apostille-kanwil]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-identity",
            blocks: [{ type: "paragraph", text: "Indonesian public documents for use abroad, such as diplomas (ijazah) and transcripts, are legalised by an **apostille** from the Ministry of Law's Directorate General of General Legal Administration (AHU), applied for online at apostille.ahu.go.id. [CITE: portal.ahu.go.id/apostille-kanwil]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-identity",
            blocks: [{ type: "paragraph", text: "Indonesian public documents for use abroad, such as diplomas (ijazah) and transcripts, are legalised by an **apostille** from the Ministry of Law's Directorate General of General Legal Administration (AHU), applied for online at apostille.ahu.go.id. [CITE: portal.ahu.go.id/apostille-kanwil]" }],
          },
        ],
      },
    },
    "after-arrival": {
      US: {
        callouts: [
          {
            afterBlockId: "us-arrival-travel",
            blocks: [{ type: "paragraph", text: "Indonesian citizens who move abroad can report their arrival (**lapor diri**) online through the Foreign Ministry's Peduli WNI portal, which also records moves and the return home, so the embassy can serve and protect them. [CITE: peduliwni.kemlu.go.id]" }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-arrival-intro",
            blocks: [{ type: "paragraph", text: "Indonesian citizens who move abroad can report their arrival (**lapor diri**) online through the Foreign Ministry's Peduli WNI portal, which also records moves and the return home, so the embassy can serve and protect them. [CITE: peduliwni.kemlu.go.id]" }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-arrival-work",
            blocks: [{ type: "paragraph", text: "Indonesian citizens who move abroad can report their arrival (**lapor diri**) online through the Foreign Ministry's Peduli WNI portal, which also records moves and the return home, so the embassy can serve and protect them. [CITE: peduliwni.kemlu.go.id]" }],
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
            blocks: [{ type: "paragraph", text: "Students funded by an Indonesian **LPDP scholarship** must return to Indonesia after their studies and contribute there for twice the length of study plus one year (2N+1), consecutively. [CITE: lpdp.kemenkeu.go.id/beasiswa-reguler-2024] Plan any post-study work visa around that obligation." }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-psw-transition",
            blocks: [{ type: "paragraph", text: "Students funded by an Indonesian **LPDP scholarship** must return to Indonesia after their studies and contribute there for twice the length of study plus one year (2N+1), consecutively. [CITE: lpdp.kemenkeu.go.id/beasiswa-reguler-2024] Plan any post-study work visa around that obligation." }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-psw-application",
            blocks: [{ type: "paragraph", text: "Students funded by an Indonesian **LPDP scholarship** must return to Indonesia after their studies and contribute there for twice the length of study plus one year (2N+1), consecutively. [CITE: lpdp.kemenkeu.go.id/beasiswa-reguler-2024] Plan any post-study work visa around that obligation." }],
          },
          {
            afterBlockId: "au-psw-application",
            blocks: [{ type: "paragraph", text: "Indonesian applicants for the Work and Holiday visa first need a support letter (SDUWHV) from Indonesia's Directorate General of Immigration, applied for online at sduwhv.imigrasi.go.id during intake periods it announces on its website and social media. [CITE: imigrasi.go.id/faq-sduwhv]" }],
          },
        ],
      },
    },
  },
};

export default overlay;
