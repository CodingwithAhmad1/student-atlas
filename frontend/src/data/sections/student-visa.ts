import type { Section } from "../types";

export const studentVisa: Section = {
  slug: "student",
  title: "Student visa",
  subSections: [
    // ── Overview ──────────────────────────────────────────────────────
    {
      slug: "overview",
      title: "Overview",
      countries: [
        {
          country: "US",
          blocks: [
            {
              block: {
                type: "paragraph",
                text: "The primary visa for international students studying at accredited US universities is the [TERM: f-1|F-1 Student Visa]. It is issued by the US Department of State and administered, once in the US, by the [TERM: sevp|Student and Exchange Visitor Program (SEVP)] within the Department of Homeland Security. [CITE: studyinthestates.dhs.gov]",
              },
            },
            {
              block: {
                type: "paragraph",
                text: 'The F-1 visa does not have a fixed expiry date in the way a tourist visa does. It is issued with [TERM: d-s|"D/S" (Duration of Status)] notation, meaning it remains valid for as long as the student is enrolled full-time in an approved program and complying with the conditions of their status. The physical visa stamp in the passport may expire, but the student can remain in the US as long as their [TERM: sevis|SEVIS] record and [TERM: i-20] are valid. A DHS final rule published in July 2026 would replace D/S with a fixed admission period (the program length on the I-20, capped at four years, plus 30 days to arrive and 30 days to depart), but a federal court blocked it the day before it was due to take effect on 15 September 2026. For now D/S still applies — check Study in the States for the latest position before you travel.',
              },
            },
            {
              id: "us-overview-kvlist",
              block: {
                type: "key-value-list",
                items: [
                  {
                    label: "Visa fee",
                    value:
                      "$185 application fee ([TERM: mrv-fee]) [CITE: travel.state.gov/fees]",
                  },
                  {
                    label: "SEVIS fee",
                    value:
                      "$350 (paid separately, before the visa interview) [CITE: fmjfee.com]",
                  },
                  {
                    label: "Work rights",
                    value:
                      "On-campus employment up to 20 hours per week during term; full-time during official breaks. Off-campus work is generally not permitted except through specific programs ([TERM: cpt], [TERM: opt]) authorised by the institution.",
                  },
                  {
                    label: "Dependants",
                    value:
                      "A spouse and unmarried children under 21 may accompany on an F-2 dependent visa. F-2 dependants may not work and may not study full-time.",
                  },
                  {
                    label: "Program types covered",
                    value:
                      "Bachelor's, Master's, PhD, and certain English language programs at SEVP-certified institutions.",
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
              block: {
                type: "paragraph",
                text: "The visa for international students in the UK is the **Student visa**, previously known as the Tier 4 (General) Student visa. It is issued by [TERM: ukvi|UK Visas and Immigration (UKVI)], a department of the Home Office. [CITE: gov.uk/student-visa]",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "Unlike the US F-1, the UK Student visa has a fixed expiry date. It is typically granted for the length of the course plus an additional period (4 months for courses of 12 months or more; 2 months for shorter courses). When the visa expires, the student must either apply for an extension, switch to another visa category, or leave the UK.",
              },
            },
            {
              id: "uk-overview-kvlist",
              block: {
                type: "key-value-list",
                items: [
                  {
                    label: "Visa fee",
                    value:
                      "\u00A3558 (applying from inside or outside the UK) [CITE: gov.uk/student-visa/apply]",
                  },
                  {
                    label: "[TERM: ihs|Immigration Health Surcharge (IHS)]",
                    value:
                      "\u00A3776 per year of study. For a three-year degree (charged on the course plus 4 months), this amounts to about \u00A32,716 paid upfront at the time of application. This is a significant and often unexpected cost for families. [CITE: gov.uk/healthcare-immigration-application]",
                  },
                  {
                    label: "Work rights",
                    value:
                      "Up to 20 hours per week during term for degree-level students; full-time during official vacations.",
                  },
                  {
                    label: "Dependants",
                    value:
                      "Dependants are permitted for postgraduate students on courses of nine months or more if the student is government-sponsored or studying at a higher education provider. For most undergraduate students, dependants are not permitted. Where permitted, a dependent spouse can work in the UK without restriction.",
                  },
                  {
                    label: "Program types covered",
                    value:
                      "Degree-level courses (Bachelor's, Master's, PhD) and below-degree courses at licensed student sponsors.",
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
              block: {
                type: "paragraph",
                text: "The visa for international students in Australia is the [TERM: subclass-500|Student visa \u2014 Subclass 500]. It is issued by the Australian Department of Home Affairs. From 2 October 2026, most applicants must apply from outside Australia: a Student visa holder can apply for a further Student visa in Australia only if they meet an exemption. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500]",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "The Subclass 500 visa is typically granted for the duration of the course plus an additional period. Like the UK, the visa has a fixed expiry date, not a duration-of-status system like the US.",
              },
            },
            {
              id: "au-overview-kvlist",
              block: {
                type: "key-value-list",
                items: [
                  {
                    label: "Visa fee",
                    value:
                      "AUD $2,500 (from 1 July 2026) [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/fees]",
                  },
                  {
                    label: "[TERM: oshc|Overseas Student Health Cover (OSHC)]",
                    value:
                      "Mandatory health insurance that must be purchased before the visa is granted. Cost varies by provider and duration \u2014 approximately AUD $600 to $700 per year for a single student. This is different from the UK IHS in that it is purchased from a private insurer, not paid to the government. [CITE: privatehealth.gov.au/healthinsurance/overseas]",
                  },
                  {
                    label: "Work rights",
                    value:
                      "Up to 48 hours per fortnight during term; unlimited during official vacation periods. This is the most generous work right among the three countries.",
                  },
                  {
                    label: "Dependants",
                    value:
                      "From 2 October 2026, most Student visa applicants can no longer include family members (partners and children). Exemptions include Doctoral (PhD) students, students sponsored by DFAT or Defence, fully funded foreign government scholarship recipients, and nationals of listed Pacific Island and ASEAN countries. Family members can no longer apply later, separately, as subsequent entrants. Family members on a Student visa can work up to 48 hours a fortnight while the course is in session, or more if the student is studying a master's or doctoral degree. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500]",
                  },
                  {
                    label: "Program types covered",
                    value:
                      "Bachelor's, Master's, PhD, and registered vocational courses at registered education providers ([TERM: cricos|CRICOS]-registered institutions).",
                  },
                ],
              },
            },
          ],
        },
      ],
    },

    // ── Documents ─────────────────────────────────────────────────────
    {
      slug: "documents",
      title: "Documents",
      countries: [
        {
          country: "US",
          blocks: [
            {
              block: {
                type: "paragraph",
                text: "You will need the following documents to apply for and attend the F-1 visa interview. Bring originals or certified copies unless noted otherwise.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "From the institution",
              },
            },
            {
              block: {
                type: "bullet-list",
                items: [
                  "[TERM: i-20|Form I-20] \u2014 issued by the [TERM: dso|Designated School Official (DSO)] at the university after the student has been accepted and paid a deposit or confirmed enrollment. This is the foundational document \u2014 no other part of the application can proceed without it. The I-20 states the program start date, the program end date, and the estimated annual cost of attendance. [CITE: studyinthestates.dhs.gov/students/the-form-i-20]",
                ],
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Financial documents",
              },
            },
            {
              id: "us-docs-financial",
              block: {
                type: "bullet-list",
                items: [
                  "Bank statements for the primary funding account covering the most recent six months, showing sufficient funds to cover the first year's costs as stated on the I-20. The US government does not publish a fixed threshold \u2014 the amount on the I-20 is the benchmark.",
                  "If funds are held by a parent or sponsor (as is common for many families), a signed financial support letter from the sponsor stating they will fund the student's education, along with the sponsor's own bank statements and evidence of income (salary slips or equivalent).",
                  "If funding comes from a scholarship, the official scholarship award letter.",
                ],
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Identity and travel documents",
              },
            },
            {
              id: "us-docs-identity",
              block: {
                type: "bullet-list",
                items: [
                  "Valid passport with at least six months' validity beyond the intended program start date",
                  "Previous passports containing US visas or travel to the US, if any",
                  "One photograph meeting State Department specifications [CITE: travel.state.gov/photos]",
                  "[TERM: ds-160] confirmation page with barcode",
                  "[TERM: sevis|SEVIS] fee (I-901) payment receipt [CITE: fmjfee.com]",
                  "[TERM: mrv-fee|MRV] (visa application) fee payment receipt",
                ],
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Supporting documents (to bring to interview)",
              },
            },
            {
              id: "us-docs-supporting",
              block: {
                type: "bullet-list",
                items: [
                  'Proof of ties to your home country \u2014 for a student this typically means family ties, property owned by parents, and evidence of intent to return after study. The concept of "non-immigrant intent" is particularly important for F-1 applicants: the student must show they do not intend to permanently immigrate to the US, even though the F-1 pathway does not preclude later applying to do so.',
                  "Academic transcripts and standardised test scores (SAT, ACT, or equivalent where applicable)",
                  "Evidence of English language proficiency if not already demonstrated through the institution's admission process",
                ],
              },
            },
          ],
        },
        {
          country: "UK",
          blocks: [
            {
              block: {
                type: "heading",
                level: 3,
                text: "From the institution",
              },
            },
            {
              block: {
                type: "bullet-list",
                items: [
                  "[TERM: cas|Confirmation of Acceptance for Studies (CAS)] \u2014 a unique reference number issued by the university once the student has accepted their offer. It is the UK equivalent of the I-20 and is required before the application can be submitted. The CAS contains the course details, start date, fees, and the institution's sponsor licence number. [CITE: gov.uk/student-visa/cas]",
                ],
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Financial documents",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "The UK has fixed financial thresholds that must be met. As of the current guidance: [CITE: gov.uk/student-visa/money]",
              },
            },
            {
              block: {
                type: "bullet-list",
                items: [
                  "For courses in London: \u00A31,529 per month for up to 9 months (i.e. \u00A313,761 if 9 months of funds must be shown)",
                  "For courses outside London: \u00A31,171 per month for up to 9 months (i.e. \u00A310,539)",
                  "Additionally, the first year's tuition fees must be shown if not already paid",
                ],
              },
            },
            {
              id: "uk-docs-financial-rule",
              block: {
                type: "paragraph",
                text: "Funds must have been held continuously for at least 28 days before the application date. The 28-day rule is strict \u2014 the balance must not drop below the required amount at any point during that 28-day period.",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "Bank statements covering the full 28-day period are required, typically in the form of an official bank letter or printed statements on headed paper. Online statements are accepted if they include the bank's security features.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Identity and other documents",
              },
            },
            {
              id: "uk-docs-identity",
              block: {
                type: "bullet-list",
                items: [
                  "Valid passport",
                  "CAS reference number (entered into the online application)",
                  "Proof of English language proficiency \u2014 typically [TERM: ielts|IELTS] Academic with a minimum score of 6.0 overall (some universities and visa categories require higher). IELTS for [TERM: ukvi|UKVI] is a specific version required for visa purposes; standard IELTS is not always accepted. [CITE: gov.uk/student-visa/english-language]",
                  "Proof of parental or guardian consent if the student is under 18",
                  "Tuberculosis test results \u2014 if you're travelling to the UK for more than six months, you'll need a certificate from an approved clinic in your country of residence confirming you do not have active tuberculosis [CITE: gov.uk/tb-test-visa/united-arab-emirates]",
                ],
              },
            },
          ],
        },
        {
          country: "AU",
          blocks: [
            {
              block: {
                type: "heading",
                level: 3,
                text: "From the institution",
              },
            },
            {
              block: {
                type: "bullet-list",
                items: [
                  "[TERM: coe|Confirmation of Enrolment (CoE)] \u2014 issued by the university or college after the student has accepted their offer and paid a deposit. The CoE contains the provider's [TERM: cricos|CRICOS] registration number, the course details, and the start and end dates. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500]",
                ],
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Financial documents",
              },
            },
            {
              id: "au-docs-financial",
              block: {
                type: "paragraph",
                text: "Australia requires evidence that the student (or their sponsor) has sufficient funds to cover:",
              },
            },
            {
              block: {
                type: "bullet-list",
                items: [
                  "Tuition fees for the first year of the course",
                  "Living costs: AUD $29,710 per year for the student [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/student-visa-500-how-to-apply]",
                  "School costs if bringing school-age dependants",
                  "Travel costs",
                ],
              },
            },
            {
              block: {
                type: "paragraph",
                text: "Unlike the UK, there is no strict 28-day holding period requirement, but funds must be genuinely available and demonstrably accessible. Bank statements, term deposit certificates, or evidence of a scholarship are all accepted.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Health and character documents",
              },
            },
            {
              id: "au-docs-health",
              block: {
                type: "bullet-list",
                items: [
                  "[TERM: oshc|Overseas Student Health Cover (OSHC)] \u2014 proof of purchase is required as part of the visa application. The student must purchase OSHC from an approved provider before submitting. [CITE: privatehealth.gov.au]",
                  "**Health examination** \u2014 may be required depending on the length of stay and country of origin. Applicants for courses longer than 12 months are typically required to undergo an upfront health examination at an approved panel physician. Approved physicians are listed on the ImmiAccount portal. [CITE: immi.homeaffairs.gov.au/help-support/meeting-our-requirements/health]",
                ],
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Identity documents",
              },
            },
            {
              id: "au-docs-identity",
              block: {
                type: "bullet-list",
                items: [
                  "Valid passport",
                ],
              },
            },
            {
              id: "au-docs-genuine-student",
              block: {
                type: "bullet-list",
                items: [
                  '[TERM: genuine-student|Genuine Student] answers \u2014 written answers in English, of up to 150 words each, to the Genuine Student questions in the online application, showing that studying in Australia is the main reason for the visa, plus supporting documents. There is an extra question for anyone who has held a Student visa before or is applying in Australia from another visa. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500]',
                ],
              },
            },
          ],
        },
      ],
    },

    // ── Application process ───────────────────────────────────────────
    {
      slug: "application-process",
      title: "Application process",
      countries: [
        {
          country: "US",
          blocks: [
            {
              block: {
                type: "paragraph",
                text: "The F-1 application follows a fixed sequence. Steps cannot be reordered \u2014 each depends on the previous.",
              },
            },
            {
              block: {
                type: "step",
                number: 1,
                title: "Receive the I-20",
                body: "The university issues the [TERM: i-20] after the student has accepted their offer and, in most cases, paid a [TERM: sevis|SEVIS] deposit or enrollment confirmation fee. The student receives it by email as a PDF. It must be signed by both the [TERM: dso|DSO] and the student before it is valid. [CITE: studyinthestates.dhs.gov/students/the-form-i-20]",
              },
            },
            {
              block: {
                type: "step",
                number: 2,
                title: "Pay the SEVIS I-901 fee",
                body: "The $350 SEVIS fee is paid at fmjfee.com using the SEVIS ID number on the I-20. Payment must be made before the [TERM: ds-160] is submitted and before the visa interview. Keep the payment receipt. [CITE: fmjfee.com]",
              },
            },
            {
              block: {
                type: "step",
                number: 3,
                title: "Complete the DS-160",
                body: "The DS-160 online application is completed at ceac.state.gov. It takes approximately 90 minutes. Save progress frequently using the application ID \u2014 the session times out after 20 minutes of inactivity. Upload a photograph meeting the specifications. On completion, print the confirmation page with the barcode. [CITE: ceac.state.gov/genniv]",
              },
            },
            {
              block: {
                type: "step",
                number: 4,
                title: "Pay the MRV fee",
                body: "The $185 visa application fee ([TERM: mrv-fee]) is paid through the appointment and payment system used by the US Embassy or Consulate in your country. [CITE: travel.state.gov/fees]",
              },
            },
            {
              id: "us-process-book-interview",
              block: {
                type: "step",
                number: 5,
                title: "Book the interview appointment",
                body: "Appointments are available at the nearest US Embassy or Consulate. Book through the appointment system linked from that embassy's website. [CITE: travel.state.gov/student-visa]",
              },
            },
            {
              block: {
                type: "step",
                number: 6,
                title: "Attend the interview",
                body: "Arrive 15 minutes early. Electronic devices are not permitted inside the consulate. Bring all required documents in a single organised folder. The interview itself is typically 2 to 5 minutes \u2014 the officer will ask about the course, the institution, funding, and plans after graduation. Answer directly and confidently.",
              },
            },
            {
              id: "us-process-passport",
              block: {
                type: "step",
                number: 7,
                title: "Passport collection",
                body: "If approved, the passport with the visa stamp is returned by courier within 3 to 5 working days. If additional administrative processing is required (frequency varies by nationality), this can extend to several weeks. The applicant is notified by email.",
              },
            },
            {
              block: {
                type: "step",
                number: 8,
                title: "Travel and entry",
                body: "The student may enter the US no earlier than 30 days before the program start date listed on the I-20. At the port of entry, the CBP officer will stamp the passport and create an [TERM: i-94] arrival record. The student should check their I-94 online within a few days of arrival to confirm the admission class is F-1 and the admitted-until date shows [TERM: d-s|D/S]. [CITE: cbp.gov/i94]",
              },
            },
          ],
        },
        {
          country: "UK",
          blocks: [
            {
              block: {
                type: "paragraph",
                text: "The UK Student visa application is done entirely online \u2014 there is no in-person interview in most cases.",
              },
            },
            {
              block: {
                type: "step",
                number: 1,
                title: "Receive the CAS",
                body: "The university issues the [TERM: cas|CAS] after the student has firmly accepted their offer and, typically, paid a deposit. The CAS is a reference number sent by the university \u2014 it is entered into the online application rather than uploaded as a document. [CITE: gov.uk/student-visa/cas]",
              },
            },
            {
              id: "uk-process-tb",
              block: {
                type: "step",
                number: 2,
                title: "Complete the tuberculosis test (if required)",
                body: "Applicants from countries where TB screening is required must complete a TB test at an approved clinic before submitting the visa application. Check whether your country requires this test at gov.uk/tb-test-visa.",
              },
            },
            {
              block: {
                type: "step",
                number: 3,
                title: "Submit the online application",
                body: "The application is submitted at gov.uk/student-visa. The CAS number, personal details, financial information, and English language test results are entered online. The [TERM: ihs|Immigration Health Surcharge] is paid as part of this step. [CITE: gov.uk/student-visa/apply]",
              },
            },
            {
              id: "uk-process-biometrics",
              block: {
                type: "step",
                number: 4,
                title: "Biometrics appointment",
                body: "After submitting online, applicants must attend a UK Visa and Citizenship Application Services (UKVCAS) centre to provide biometrics (fingerprints and photograph). Attend the nearest UKVCAS centre. Appointments must be booked through the UKVCAS portal after the online application is submitted. [CITE: ukvcas.co.uk]",
              },
            },
            {
              block: {
                type: "step",
                number: 5,
                title: "Decision",
                body: "The standard processing time after biometrics is within 3 weeks. Priority and super-priority services are available at additional cost for faster processing. The decision is communicated by email. If approved, a vignette (entry clearance sticker) is placed in the passport, allowing a single entry into the UK within 30 days of the visa start date.",
              },
            },
            {
              block: {
                type: "step",
                number: 6,
                title: "Collect the BRP",
                body: "Within 10 days of arriving in the UK, the student must collect their [TERM: brp|Biometric Residence Permit (BRP)] from the post office specified in their visa decision letter. The BRP is the document that serves as proof of immigration status in the UK for the duration of the course. [CITE: gov.uk/biometric-residence-permits]",
              },
            },
          ],
        },
        {
          country: "AU",
          blocks: [
            {
              block: {
                type: "paragraph",
                text: "The Australian student visa application is entirely online through the ImmiAccount portal. There is no interview.",
              },
            },
            {
              block: {
                type: "step",
                number: 1,
                title: "Receive the CoE",
                body: "The university issues the [TERM: coe|CoE] after the student accepts their offer and pays any required deposit. [CITE: immi.homeaffairs.gov.au]",
              },
            },
            {
              block: {
                type: "step",
                number: 2,
                title: "Purchase OSHC",
                body: "[TERM: oshc|OSHC] must be purchased from an approved provider before submitting the application. Approved providers include Medibank, Bupa, Allianz, and others. The OSHC certificate is uploaded as part of the application. [CITE: privatehealth.gov.au]",
              },
            },
            {
              id: "au-process-health",
              block: {
                type: "step",
                number: 3,
                title: "Complete the health examination if required",
                body: "Applicants for courses longer than 12 months are typically required to undergo a health examination at an approved panel physician before or shortly after submitting the visa application. Check the current list of approved physicians on ImmiAccount. [CITE: immi.homeaffairs.gov.au/help-support/meeting-our-requirements/health]",
              },
            },
            {
              block: {
                type: "step",
                number: 4,
                title: "Submit the online application",
                body: "The application is submitted through ImmiAccount at immi.homeaffairs.gov.au. The CoE number, [TERM: genuine-student|Genuine Student] answers, financial evidence, OSHC certificate, and identity documents are uploaded. The visa fee of AUD $2,500 is paid online. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500]",
              },
            },
            {
              id: "au-process-decision",
              block: {
                type: "step",
                number: 5,
                title: "Decision",
                body: "Processing times are typically 4 to 6 weeks from submission of a complete application. The visa is granted electronically \u2014 there is no sticker in the passport. The student receives a grant letter by email, which they should print and carry when travelling.",
              },
            },
            {
              id: "au-process-entry",
              block: {
                type: "step",
                number: 6,
                title: "Entry into Australia",
                body: "Passport holders from eligible countries may use [TERM: smartgates|SmartGates] at Australian airports for automated border clearance, which is typically faster than the staffed lane. The student's visa will be confirmed automatically. Carry the OSHC certificate and CoE at entry \u2014 customs officers occasionally ask for these.",
              },
            },
          ],
        },
      ],
    },

    // ── After arrival ─────────────────────────────────────────────────
    {
      slug: "after-arrival",
      title: "After arrival",
      countries: [
        {
          country: "US",
          blocks: [
            {
              block: {
                type: "paragraph",
                text: "Staying in good standing with F-1 status is the student's ongoing responsibility. The consequences of non-compliance \u2014 including termination of [TERM: sevis|SEVIS] record and potential bars on re-entry \u2014 are serious. The following are the key obligations.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Report to the DSO",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "Within 30 days of arriving in the US, the student must report to the international students office and confirm their presence. This activates their SEVIS record and confirms the program start date. [CITE: studyinthestates.dhs.gov/students/maintaining-your-status]",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Maintain full-time enrollment",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "F-1 students must be enrolled full-time every semester (minimum 12 credit hours for undergraduates). Dropping below full-time without prior authorisation from the DSO is a status violation. Exceptions exist for medical reasons or final semester requirements but must be approved in advance.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Address registration",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "The student must report any change of address to their DSO within 10 days. The DSO updates SEVIS accordingly. Failing to keep a current address in SEVIS is a technical violation.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Work authorisation",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "On-campus employment (up to 20 hours per week during term) is permitted without any additional authorisation. Off-campus work requires explicit authorisation \u2014 either [TERM: cpt|Curricular Practical Training (CPT)] for work integral to the curriculum, or [TERM: opt|Optional Practical Training (OPT)] for work in the student's field of study. Working without authorisation is a serious violation and can result in immediate status termination. [CITE: studyinthestates.dhs.gov/students/working]",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Travel outside the US",
              },
            },
            {
              id: "us-arrival-travel",
              block: {
                type: "paragraph",
                text: "Before travelling internationally, the student must have a valid F-1 visa stamp (not just an active SEVIS record) to re-enter the US. The visa stamp in the passport may expire during the course of study \u2014 if it does, the student must obtain a new visa at a US consulate abroad before returning. The DSO must also sign the travel section of the I-20 within the past twelve months before international travel. [CITE: studyinthestates.dhs.gov/students/travel]",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Renewing the visa vs extending the I-20",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "The F-1 visa stamp in the passport and the I-20 are separate documents. If the student's program extends (for example, due to a program change or leave of absence), they need an updated I-20 from the DSO \u2014 not a new visa. A new visa is only required if the student travels internationally while the current stamp has expired.",
              },
            },
          ],
        },
        {
          country: "UK",
          blocks: [
            {
              id: "uk-arrival-intro",
              block: {
                type: "heading",
                level: 3,
                text: "Collect the BRP",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "As noted in the application process, the [TERM: brp|BRP] must be collected from the designated post office within 10 days of arrival. The BRP is the student's primary proof of right to study and work in the UK. Without it, the student cannot open a bank account, register with a GP, or provide proof of status to an employer. [CITE: gov.uk/biometric-residence-permits]",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Register with the university's international office",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "Universities require international students to register formally with the international students or compliance team within the first week. This confirms the student's arrival and activates their record under the university's sponsor licence obligations.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Register with a GP",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "Students are entitled to use the NHS during their studies \u2014 this is what the [TERM: ihs|IHS] surcharge pays for. Registering with a local GP near the university should be done within the first two weeks.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Maintain enrollment and attendance",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "The university is legally obligated to monitor attendance and report absences to [TERM: ukvi|UKVI]. A student who repeatedly misses classes or withdraws without notifying UKVI can have their leave curtailed (cancelled before the visa expiry date). This is a real risk and not merely theoretical \u2014 UK universities actively manage sponsor compliance. [CITE: gov.uk/sponsor-migrants/sponsor-a-student]",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Working",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "The 20 hours per week limit during term is strictly enforced and is measured across all employment \u2014 including multiple part-time jobs. Exceeding the limit is a visa condition breach.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Changing courses",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "If the student changes course or university, a new CAS is required from the new institution and a new visa application may be necessary depending on the circumstances. Students should not change courses without first consulting the international office.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Visa expiry and extension",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "The BRP expiry date is the leave expiry date. If the student needs to remain in the UK beyond this date (for a dissertation extension, resits, or a further qualification), they must apply for a visa extension before the current visa expires. Applications made after expiry are overstay applications and are treated differently. [CITE: gov.uk/student-visa/extend-your-visa]",
              },
            },
          ],
        },
        {
          country: "AU",
          blocks: [
            {
              block: {
                type: "heading",
                level: 3,
                text: "Confirm enrollment",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "The student must confirm their enrollment with the institution after arrival. The institution is required to report non-arriving students to the Department of Home Affairs.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "OSHC activation",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "Make sure the [TERM: oshc|OSHC] policy is active from the date of arrival. The OSHC card and membership details are used to access healthcare during the stay.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Work rights \u2014 48 hours per fortnight",
              },
            },
            {
              id: "au-arrival-work",
              block: {
                type: "paragraph",
                text: "The 48-hour per fortnight limit applies during term time. This is 48 hours across any two-week period \u2014 it does not reset weekly. During official university vacation periods, there is no work restriction for Subclass 500 holders.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Maintain satisfactory course progress",
              },
            },
            {
              block: {
                type: "paragraph",
                text: 'Australian institutions are required to report students who are not meeting satisfactory course progress requirements. Falling behind on academic requirements can result in the institution cancelling the student\'s enrollment, which in turn triggers a visa cancellation process. This is called a "section 20 notice" and the student has 28 days to respond before cancellation proceeds. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500]',
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "Changing institutions",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "In the first six months of the principal course (the main qualification being studied), a student cannot transfer to a different provider except in limited circumstances. After six months, transfers are permitted with a new CoE from the new institution. A new visa is generally not required if the course level and duration are comparable.",
              },
            },
            {
              block: {
                type: "heading",
                level: 3,
                text: "VEVO checks",
              },
            },
            {
              block: {
                type: "paragraph",
                text: "The student's visa conditions can be checked at any time through [TERM: vevo|VEVO (Visa Entitlement Verification Online)]. Employers, landlords, and banks may request a VEVO check. Students can share their VEVO status directly rather than carrying physical documentation. [CITE: immi.homeaffairs.gov.au/visas/already-have-a-visa/check-visa-details-and-conditions/check-conditions-online]",
              },
            },
          ],
        },
      ],
    },
  ],
};
