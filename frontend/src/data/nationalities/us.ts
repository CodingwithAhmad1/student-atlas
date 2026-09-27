import type { NationalityOverlay } from "../types";
import { touristVisaAuEta } from "../profiles/tourist-visa-au-eta";
import { touristVisaUkEta } from "../profiles/tourist-visa-uk-eta";
import { domesticUsVisit } from "../profiles/domestic-us-visit";
import { domesticUsStudent } from "../profiles/domestic-us-student";
import { domesticUsWork } from "../profiles/domestic-us-work";
import { domesticUsResidency } from "../profiles/domestic-us-residency";

/**
 * United States — nationality overlay.
 *
 * Home-country columns use the domestic profiles (no visa needed); visits to the
 * other destinations use the visa-free travel profiles.
 */
const overlay: NationalityOverlay = {
  visit: {
    "entry-requirement": {
      US: { profile: domesticUsVisit["entry-requirement"], callouts: [] },
      UK: { profile: touristVisaUkEta["entry-requirement"], callouts: [] },
      AU: { profile: touristVisaAuEta["entry-requirement"], callouts: [] },
    },
    "how-to-apply": {
      US: { profile: domesticUsVisit["how-to-apply"], callouts: [] },
      UK: { profile: touristVisaUkEta["how-to-apply"], callouts: [] },
      AU: { profile: touristVisaAuEta["how-to-apply"], callouts: [] },
    },
  },
  student: {
    overview: {
      US: { profile: domesticUsStudent["overview"], callouts: [] },
    },
    documents: {
      US: { profile: domesticUsStudent["documents"], callouts: [] },
    },
    "application-process": {
      US: { profile: domesticUsStudent["application-process"], callouts: [] },
    },
    "after-arrival": {
      US: { profile: domesticUsStudent["after-arrival"], callouts: [] },
    },
  },
  work: {
    "post-study-work": {
      US: { profile: domesticUsWork["post-study-work"], callouts: [] },
    },
    "getting-sponsored": {
      US: { profile: domesticUsWork["getting-sponsored"], callouts: [] },
    },
  },
  residency: {
    "permanent-residency": {
      US: { profile: domesticUsResidency["permanent-residency"], callouts: [] },
    },
    "dual-nationality": {
      _crossCutting: {
        callouts: [
          {
            afterBlockId: "dual-origin-position",
            blocks: [
              {
                type: "paragraph",
                text: "The United States **permits dual nationality**. US law does not require American citizens who naturalise in the UK or Australia to give up their US citizenship \u2014 although naturalising abroad with the intention of relinquishing US citizenship can lead to its loss. Two obligations stay with you wherever you live: US citizens must enter and leave the United States on a US passport, and must file US tax returns on their worldwide income.",
              },
            ],
          },
        ],
      },
    },
  },
};

export default overlay;
