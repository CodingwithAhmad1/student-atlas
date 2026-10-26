import type { NationalityOverlay } from "../types";

/**
 * Algeria — nationality overlay (Tier B).
 *
 * Visa-free travel profiles and nationality-dependent callouts are generated
 * from traits/nationality-traits.ts. Only hand-written extras live here: every
 * callout needs a [CITE: id] or `practical: true` (then no numbers).
 */
const overlay: NationalityOverlay = {
  "student": {
    "after-arrival": {
      US: {
        callouts: [
          {
            afterBlockId: "us-arrival-travel",
            blocks: [{ type: "paragraph", text: "National service is an obligation for Algerian nationals aged 19 and over. Nationals living abroad register for it at an Algerian diplomatic or consular post in the year they turn 17, and a student can ask for a **deferral (sursis)** for studies, renewable until the studies end, or for an exemption [CITE: joradp.dz/loi-14-06-service-national]. Algerian students should keep their national service status current through the consulate covering where they study." }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-arrival-intro",
            blocks: [{ type: "paragraph", text: "National service is an obligation for Algerian nationals aged 19 and over. Nationals living abroad register for it at an Algerian diplomatic or consular post in the year they turn 17, and a student can ask for a **deferral (sursis)** for studies, renewable until the studies end, or for an exemption [CITE: joradp.dz/loi-14-06-service-national]. Algerian students should keep their national service status current through the consulate covering where they study." }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-arrival-work",
            blocks: [{ type: "paragraph", text: "National service is an obligation for Algerian nationals aged 19 and over. Nationals living abroad register for it at an Algerian diplomatic or consular post in the year they turn 17, and a student can ask for a **deferral (sursis)** for studies, renewable until the studies end, or for an exemption [CITE: joradp.dz/loi-14-06-service-national]. Algerian students should keep their national service status current through the consulate covering where they study." }],
          },
        ],
      },
    },
  },
};

export default overlay;
