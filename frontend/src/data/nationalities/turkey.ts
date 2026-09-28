import type { NationalityOverlay } from "../types";

/**
 * Turkey — nationality overlay (Tier A).
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
            blocks: [{ type: "paragraph", text: "Turkish men studying abroad at their own expense can have military service deferred once Turkish authorities recognise their student status: apply to the Education Counsellor (Eğitim Müşavirliği) at the Turkish embassy with the enrolment or acceptance letter, the previous diploma or its equivalence certificate, and a military status document [CITE: vasington-be.mfa.gov.tr/ogrenci-askerlik-erteleme]. The deferral lasts until graduation but not past the end of the year the student turns 28 for a bachelor's degree, and can run to 32 for a master's and 35 for a doctorate [CITE: mevzuat.gov.tr/7179-askeralma-kanunu]. Enrolling at the same or a lower level than a degree already completed does not earn a deferral [CITE: mevzuat.gov.tr/7179-askeralma-kanunu]." }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-docs-identity",
            blocks: [{ type: "paragraph", text: "Turkish men studying abroad at their own expense can have military service deferred once Turkish authorities recognise their student status: apply to the Education Counsellor (Eğitim Müşavirliği) at the Turkish embassy with the enrolment or acceptance letter, the previous diploma or its equivalence certificate, and a military status document [CITE: vasington-be.mfa.gov.tr/ogrenci-askerlik-erteleme]. The deferral lasts until graduation but not past the end of the year the student turns 28 for a bachelor's degree, and can run to 32 for a master's and 35 for a doctorate [CITE: mevzuat.gov.tr/7179-askeralma-kanunu]. Enrolling at the same or a lower level than a degree already completed does not earn a deferral [CITE: mevzuat.gov.tr/7179-askeralma-kanunu]." }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-docs-identity",
            blocks: [{ type: "paragraph", text: "Turkish men studying abroad at their own expense can have military service deferred once Turkish authorities recognise their student status: apply to the Education Counsellor (Eğitim Müşavirliği) at the Turkish embassy with the enrolment or acceptance letter, the previous diploma or its equivalence certificate, and a military status document [CITE: vasington-be.mfa.gov.tr/ogrenci-askerlik-erteleme]. The deferral lasts until graduation but not past the end of the year the student turns 28 for a bachelor's degree, and can run to 32 for a master's and 35 for a doctorate [CITE: mevzuat.gov.tr/7179-askeralma-kanunu]. Enrolling at the same or a lower level than a degree already completed does not earn a deferral [CITE: mevzuat.gov.tr/7179-askeralma-kanunu]." }],
          },
        ],
      },
    },
    "after-arrival": {
      US: {
        callouts: [
          {
            afterBlockId: "us-arrival-travel",
            blocks: [{ type: "paragraph", text: "YÖK recognises a foreign degree (**denklik**) only if the graduate was physically in the country of study for at least 70% of each teaching term, checked against the passports used and an entry-exit record from the provincial police; time outside teaching periods does not count [CITE: mevzuat.gov.tr/yurtdisi-diploma-denklik-yonetmeligi]. Degrees from institutions that YÖK does not recognise are refused [CITE: mevzuat.gov.tr/yurtdisi-diploma-denklik-yonetmeligi]. Keep every passport used during the degree." }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-arrival-intro",
            blocks: [{ type: "paragraph", text: "YÖK recognises a foreign degree (**denklik**) only if the graduate was physically in the country of study for at least 70% of each teaching term, checked against the passports used and an entry-exit record from the provincial police; time outside teaching periods does not count [CITE: mevzuat.gov.tr/yurtdisi-diploma-denklik-yonetmeligi]. Degrees from institutions that YÖK does not recognise are refused [CITE: mevzuat.gov.tr/yurtdisi-diploma-denklik-yonetmeligi]. Keep every passport used during the degree." }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-arrival-work",
            blocks: [{ type: "paragraph", text: "YÖK recognises a foreign degree (**denklik**) only if the graduate was physically in the country of study for at least 70% of each teaching term, checked against the passports used and an entry-exit record from the provincial police; time outside teaching periods does not count [CITE: mevzuat.gov.tr/yurtdisi-diploma-denklik-yonetmeligi]. Degrees from institutions that YÖK does not recognise are refused [CITE: mevzuat.gov.tr/yurtdisi-diploma-denklik-yonetmeligi]. Keep every passport used during the degree." }],
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
            blocks: [{ type: "paragraph", text: "A Turkish man who graduates abroad can ask for up to one extra year of military service deferral to complete degree recognition, but not past the end of the year he turns 32 [CITE: mevzuat.gov.tr/7179-askeralma-kanunu]. Turkish men who then work abroad for at least three years on a residence permit that includes work rights can complete military service by paying in foreign currency (**dövizle askerlik**) and taking the Ministry of National Defence's remote training, applying through a Turkish consulate [CITE: mevzuat.gov.tr/7179-askeralma-kanunu]." }],
          },
          {
            afterBlockId: "us-psw-cliff",
            blocks: [{ type: "paragraph", text: "Students sent abroad on the Ministry of National Education's YLSY scholarship owe compulsory public service of twice the study period for which fees or stipends were paid [CITE: yyegm.meb.gov.tr/sss]. Those who abandon their studies or do not request a post within two months of finishing must repay the study costs with interest [CITE: yyegm.meb.gov.tr/sss]. Check this obligation before planning to stay on for post-study work." }],
          },
        ],
      },
      UK: {
        callouts: [
          {
            afterBlockId: "uk-psw-transition",
            blocks: [{ type: "paragraph", text: "A Turkish man who graduates abroad can ask for up to one extra year of military service deferral to complete degree recognition, but not past the end of the year he turns 32 [CITE: mevzuat.gov.tr/7179-askeralma-kanunu]. Turkish men who then work abroad for at least three years on a residence permit that includes work rights can complete military service by paying in foreign currency (**dövizle askerlik**) and taking the Ministry of National Defence's remote training, applying through a Turkish consulate [CITE: mevzuat.gov.tr/7179-askeralma-kanunu]." }],
          },
          {
            afterBlockId: "uk-psw-transition",
            blocks: [{ type: "paragraph", text: "Students sent abroad on the Ministry of National Education's YLSY scholarship owe compulsory public service of twice the study period for which fees or stipends were paid [CITE: yyegm.meb.gov.tr/sss]. Those who abandon their studies or do not request a post within two months of finishing must repay the study costs with interest [CITE: yyegm.meb.gov.tr/sss]. Check this obligation before planning to stay on for post-study work." }],
          },
        ],
      },
      AU: {
        callouts: [
          {
            afterBlockId: "au-psw-application",
            blocks: [{ type: "paragraph", text: "A Turkish man who graduates abroad can ask for up to one extra year of military service deferral to complete degree recognition, but not past the end of the year he turns 32 [CITE: mevzuat.gov.tr/7179-askeralma-kanunu]. Turkish men who then work abroad for at least three years on a residence permit that includes work rights can complete military service by paying in foreign currency (**dövizle askerlik**) and taking the Ministry of National Defence's remote training, applying through a Turkish consulate [CITE: mevzuat.gov.tr/7179-askeralma-kanunu]." }],
          },
          {
            afterBlockId: "au-psw-application",
            blocks: [{ type: "paragraph", text: "Students sent abroad on the Ministry of National Education's YLSY scholarship owe compulsory public service of twice the study period for which fees or stipends were paid [CITE: yyegm.meb.gov.tr/sss]. Those who abandon their studies or do not request a post within two months of finishing must repay the study costs with interest [CITE: yyegm.meb.gov.tr/sss]. Check this obligation before planning to stay on for post-study work." }],
          },
        ],
      },
    },
  },
};

export default overlay;
