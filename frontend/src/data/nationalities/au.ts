import type { NationalityOverlay } from "../types";
import { touristVisaUkEta } from "../profiles/tourist-visa-uk-eta";
import { touristVisaUsVwp } from "../profiles/tourist-visa-us-vwp";
import { domesticAuVisit } from "../profiles/domestic-au-visit";
import { domesticAuStudent } from "../profiles/domestic-au-student";
import { domesticAuWork } from "../profiles/domestic-au-work";
import { domesticAuResidency } from "../profiles/domestic-au-residency";

/**
 * Australia — nationality overlay.
 *
 * Home-country columns use the domestic profiles (no visa needed); visits to the
 * other destinations use the visa-free travel profiles.
 */
const overlay: NationalityOverlay = {
  visit: {
    "entry-requirement": {
      US: { profile: touristVisaUsVwp["entry-requirement"], callouts: [] },
      UK: { profile: touristVisaUkEta["entry-requirement"], callouts: [] },
      AU: { profile: domesticAuVisit["entry-requirement"], callouts: [] },
    },
    "how-to-apply": {
      US: { profile: touristVisaUsVwp["how-to-apply"], callouts: [] },
      UK: { profile: touristVisaUkEta["how-to-apply"], callouts: [] },
      AU: { profile: domesticAuVisit["how-to-apply"], callouts: [] },
    },
  },
  student: {
    overview: {
      AU: { profile: domesticAuStudent["overview"], callouts: [] },
    },
    documents: {
      AU: { profile: domesticAuStudent["documents"], callouts: [] },
    },
    "application-process": {
      AU: { profile: domesticAuStudent["application-process"], callouts: [] },
    },
    "after-arrival": {
      AU: { profile: domesticAuStudent["after-arrival"], callouts: [] },
    },
  },
  work: {
    "post-study-work": {
      AU: { profile: domesticAuWork["post-study-work"], callouts: [] },
    },
    "getting-sponsored": {
      AU: { profile: domesticAuWork["getting-sponsored"], callouts: [] },
    },
  },
  residency: {
    "permanent-residency": {
      AU: { profile: domesticAuResidency["permanent-residency"], callouts: [] },
    },
    "dual-nationality": {
      _crossCutting: {
        callouts: [
          {
            afterBlockId: "dual-origin-position",
            blocks: [
              {
                type: "paragraph",
                text: "Australia has **permitted dual citizenship since 4 April 2002**. Australians who become US or British citizens keep their Australian citizenship automatically, and no notification or permission is required. Australian citizens should enter and leave Australia on their Australian passport.",
              },
            ],
          },
        ],
      },
    },
  },
};

export default overlay;
