# Student Atlas — Content Specification

**Nationality context:** UAE  
**Destinations covered:** United States, United Kingdom, Australia  
**Status:** Content spec for frontend population and testing  
**Note on callouts:** Where a UAE-specific callout appears, it is shown as `[UAE CALLOUT: ...]`. Where content is fully replaced by nationality-specific content rather than supplemented, this is marked `[UAE REPLACEMENT]`. All citations are marked `[CITE: ...]` and should render as inline clickable footnote-style links.

---

## Home page

### Setup flow

On first visit, the user sees a clean setup prompt before any content is shown. This is not a modal — it is the home page itself in its pre-configured state.

**Nationality input**
Label: "Your nationality"
Input type: Searchable dropdown from a fixed list of countries. The user types and the list filters. This is a single-select field.
Placeholder text: "Search your country..."

**Destination selection**
Label: "Where are you considering studying?"
Input type: Three clickable toggle buttons arranged horizontally: "United States", "United Kingdom", "Australia". The user can select one, two, or all three. At least one must be selected before proceeding. Each button has a clear selected/unselected visual state.
Below the buttons, a small text reads: "You can compare countries side by side once selected."

**Save button**
Label: "Save my preferences"
On save, the home page transitions to its configured state (see below). Preferences are stored in localStorage and persist across sessions. The user can always change them by returning to the home page.

---

### Home page — configured state

Once preferences are saved, the home page displays the following in order. This page is always accessible and always shows this content — it is not a one-time onboarding screen that disappears.

**Preference bar**
Shows current selections as editable chips: nationality flag + name, and destination flags + names. An edit icon on each chip opens the respective dropdown/toggle to change the selection. Changes take effect immediately and update all content across the app.

**Welcome heading**
"Your guide to studying abroad — and everything that comes after."

**Subheading**
"Tailored for [nationality] nationals exploring [destination list]."
Example: "Tailored for UAE nationals exploring the United States, United Kingdom, and Australia."

---

### How this guide works

This section is always visible on the home page below the preference bar. It explains the app clearly for a parent who has never used it before.

**What this guide covers**

Student Atlas is built for parents navigating one of the most consequential decisions a family makes. We cover the full journey — from visiting your child during their studies, to understanding how they can build a career and eventually settle in the country they choose. There are five sections:

- **Tourist visa** — whether you need a visa to visit your child, how to apply, and how long you can stay.
- **Student visa** — what your child needs to apply, the full process step by step, and what they must do to remain compliant after they arrive.
- **Work visa** — the options available after graduation, including the work rights that come with the student visa itself, and the path to employer sponsorship.
- **Residency pathway** — how permanent residency works in each country, the realistic timeline from student visa to settled status, and the path to citizenship.
- **Generate report** — download a complete PDF covering all of the above for your specific nationality and chosen destinations, with all sources included.

**How the information is organised**

Each section is a single page. Within it, the topics are grouped under clear headings — you can scroll through continuously or click a heading in the left sidebar to jump directly to it.

If you have selected more than one destination country, each section displays the countries side by side so you can compare directly. You can control which countries are shown using the column selector at the top of each page — click the + button to add a destination column, or remove one you no longer want to compare.

**Tailored to your nationality**

Most visa rules are the same regardless of where you come from. Where your nationality makes a material difference — for example, whether you need a visa at all, or how long a consulate typically takes to process your application — we highlight this clearly in a callout block within the relevant section. The rest of the content applies universally.

**Citations and sources**

Every piece of information in this guide is sourced from official government websites, immigration authority publications, or primary legal instruments. Sources are cited inline throughout each section. You will see numbered citation links — clicking them opens the source in a new tab. We review and update content regularly. Each section displays the date it was last verified. If something has changed and we have not yet updated it, we want to know — there is a feedback link at the bottom of every page.

**What this guide is not**

This is an information resource, not legal advice. Immigration rules change, individual circumstances vary, and for complex situations — particularly where a visa has been refused or where the student's immigration history is complicated — a qualified immigration solicitor or adviser should be consulted. We aim to give you the clearest possible picture so that any professional advice you seek is better informed.

---

## Tourist visa

*Single scrollable page. Two sub-sections: Entry requirement, How to apply. Sidebar links scroll to each.*

*Nature of this section: highly nationality-dependent. Entry requirement is often a full UAE replacement (not supplementary) because the answer is categorically different per nationality. How to apply is mostly standard with UAE callouts.*

---

### Entry requirement

#### United States

To visit the United States as a UAE national, you need a **B-2 Tourist Visa**. The UAE is not part of the US Visa Waiver Program, which means UAE passport holders cannot use ESTA and must obtain a visa before travelling. [CITE: travel.state.gov/B-visa]

The B-2 visa is issued for tourism, visiting family, and medical treatment. It does not permit you to work or study. When issued, it is typically valid for **ten years** with multiple entries, meaning you do not need to reapply on every trip. However, each individual visit is limited — the border officer determines how long you may stay, typically granting **up to six months** per entry.

There is no restriction on how many times you visit during the visa's validity. You can travel to see your child at the start of term, return for graduation, and visit during holidays — all on the same visa, as long as each stay does not overstay the period granted at the border.

[UAE REPLACEMENT]
UAE nationals applying for a B-2 visa are generally considered lower-risk applicants by US consular officers. The UAE-US bilateral relationship is strong, and UAE passport holders have a high approval rate for B-2 applications. However, approval is never guaranteed and the application must demonstrate clear intent to return to the UAE.

Visa fee: $185 (non-refundable, applies whether approved or refused) [CITE: travel.state.gov/fees]  
Typical validity on issue: 10 years, multiple entry  
Maximum stay per visit: determined at port of entry, typically up to 6 months  
ESTA eligible: No [CITE: travel.state.gov/esta-countries]

---

#### United Kingdom

UAE nationals benefit from the UK's **Electronic Travel Authorisation (ETA)** scheme, which came into effect for UAE passport holders in 2024. This means you do not need a full visitor visa to enter the UK — you need an ETA, which is a pre-travel authorisation linked electronically to your passport. [CITE: gov.uk/uk-eta]

The ETA is not a visa. It does not require an appointment, a visit to a visa application centre, or an interview. It is applied for entirely online and is typically approved within minutes, though it can take up to three working days. Once approved, it is valid for two years or until your passport expires (whichever is sooner) and allows multiple trips of up to six months each.

[UAE REPLACEMENT]
UAE nationals were among the first Gulf nationals included in the UK ETA scheme. The process is straightforward and refusals are uncommon for UAE passport holders. The main reasons for refusal are undisclosed criminal history or prior UK immigration violations.

ETA fee: £10 [CITE: gov.uk/uk-eta]  
Application: online only, no appointment needed  
Processing time: usually minutes, up to 3 working days  
Validity: 2 years or passport expiry, whichever is sooner  
Maximum stay per visit: 6 months  
Multiple entries: yes

---

#### Australia

UAE nationals require an **Electronic Travel Authority (ETA) — Subclass 601** to visit Australia. Like the UK ETA, this is a pre-travel authorisation applied for electronically, not a visa label in your passport. It is available to UAE passport holders and is typically approved instantly. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601]

The ETA is valid for 12 months from the date of issue (or until passport expiry) and allows multiple visits of up to three months each. If you need to stay longer than three months on a single trip — for example, to be present around your child's graduation period and travel within Australia — you would need to apply for a **Visitor visa (Subclass 600)** instead, which allows stays of up to 12 months.

[UAE REPLACEMENT]
UAE passport holders have a straightforward path to the Australian ETA. The application is made through the Australian ETA app or through a registered travel agent. It is not available directly through the Australian government website for all nationalities, so using the official app (available on iOS and Android) is the recommended route. Fee: AUD $20.

ETA fee: AUD $20 [CITE: immi.homeaffairs.gov.au/eta]  
Application: via Australian ETA app or registered travel agent  
Processing: typically instant  
Validity: 12 months from issue or passport expiry  
Maximum stay per visit: 3 months  
Multiple entries: yes  
Alternative if longer stay needed: Visitor visa Subclass 600 (up to 12 months)

---

### How to apply

#### United States

The B-2 visa application is a multi-step process that requires an in-person interview at the US Embassy or Consulate. For UAE nationals, the relevant post is the **US Embassy in Abu Dhabi** or the **US Consulate General in Dubai**. [CITE: ae.usembassy.gov]

**Step 1 — Complete the DS-160 form**
The DS-160 is the online nonimmigrant visa application form. It must be completed in full before an appointment can be booked. The form collects biographical information, travel history, and the purpose of the visit. Save the confirmation page — the barcode is required at the interview. [CITE: ceac.state.gov/genniv]

**Step 2 — Pay the visa fee**
The $185 MRV fee is paid online before booking the appointment. Keep the receipt. [CITE: travel.state.gov/fees]

**Step 3 — Book the interview appointment**
Appointments are booked through the US Travel Docs system. [CITE: ustraveldocs.com/ae]

[UAE CALLOUT: Interview wait times at both Abu Dhabi and Dubai posts are typically shorter than at many other global posts — usually 2 to 6 weeks during normal periods, though this extends to 8 to 12 weeks during peak summer months (May to August) when demand from the Gulf region is highest. Book as early as possible if the visit is tied to a fixed date such as a graduation or term start.]

**Step 4 — Attend the interview**
Bring the DS-160 confirmation page, your passport (and any previous passports), the fee receipt, one photograph meeting State Department specifications, and supporting documents (see below). The interview itself is typically brief — 2 to 5 minutes. The officer assesses whether you have strong ties to the UAE and a clear, credible reason to visit.

**Documents to bring to the interview**
- Valid UAE passport with at least six months' validity beyond intended stay
- DS-160 confirmation barcode page
- MRV fee payment receipt
- One photograph (5cm x 5cm, white background, taken within six months) [CITE: travel.state.gov/photos]
- Evidence of your child's enrollment at a US institution (acceptance letter, I-20, or current enrollment confirmation)
- Evidence of your financial means (recent bank statements, salary slips, or evidence of assets)
- Evidence of ties to the UAE (employment letter, property ownership, family ties, return ticket)
- Any previous US visas

**What the officer is assessing**
The core question in a B-2 interview is whether the applicant intends to return home. The officer wants to see that you have meaningful reasons to return to the UAE — employment, family, property, or other obligations. Having a child studying in the US is not considered a negative factor; it is a well-understood and common reason for a B-2 application.

[UAE CALLOUT: UAE nationals are generally viewed favourably at B-2 interviews. The most common reason for refusal among UAE applicants is insufficient evidence of ties to the UAE — particularly for applicants who are retired or self-employed and do not have an employment letter to provide. If this applies, provide additional evidence: property deeds, evidence of business ownership, family photographs, and a clearly written letter of intent.]

---

#### United Kingdom

The UK ETA application is made entirely online — there is no interview, no visa application centre visit, and no document upload required. [CITE: gov.uk/uk-eta]

**How to apply**
Apply through the official UK ETA app (available on iOS and Android) or via the GOV.UK website. You will need:
- Your UAE passport
- A photograph taken on your phone using the app's face-scan feature
- A valid email address
- Payment of £10 by card

The application takes approximately 10 minutes. Approval is typically received within minutes by email, though it can take up to three working days. The ETA is linked electronically to your passport — there is no document to print or carry. Border officers can see it when they scan your passport.

**If your ETA is refused**
ETA refusals for UAE nationals are uncommon but do occur, usually due to an undisclosed criminal record or a previous UK immigration violation. If refused, you can apply for a standard **UK Standard Visitor Visa** instead, which requires a full application with supporting documents and a fee of £115. [CITE: gov.uk/standard-visitor-visa]

[UAE CALLOUT: UAE nationals do not need to visit a visa application centre for standard UK visits. The ETA fully replaces the previous requirement for UAE nationals to obtain a visit visa, which previously required a VAC appointment and a processing wait of 15 working days. This is a significant change that came into effect in 2024 and dramatically simplifies UK visits for UAE families.]

---

#### Australia

The Australian ETA (Subclass 601) is applied for through the **Australian ETA app**, available on iOS and Android. It is not available directly through the Department of Home Affairs website for UAE passport holders — the app is the correct channel. [CITE: immi.homeaffairs.gov.au/eta]

**How to apply**
Download the Australian ETA app. You will need:
- Your UAE passport (scan the biodata page using the app)
- A valid email address
- Payment of AUD $20 by card

Approval is typically instant. The ETA is linked electronically to your passport.

**If you need to stay longer than 3 months**
Apply for a **Visitor visa — Subclass 600** instead. This allows stays of up to 12 months and requires a standard online application with supporting documents. Fee: AUD $190. Processing time: typically 20 to 30 days. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600]

**Documents recommended to carry when travelling**
Although the ETA is electronic, it is advisable to carry a printed copy of your ETA approval email, your child's Australian enrollment confirmation, and evidence of onward travel. Australian border officers occasionally ask for these at the primary inspection point.

[UAE CALLOUT: UAE nationals have a high ETA approval rate for Australia. The most common complication is if the applicant has previously overstayed a visa in any country — this must be disclosed during the ETA application. Non-disclosure of a prior overstay is the most frequent cause of ETA cancellation for Gulf nationals.]

---

## Student visa

*Single scrollable page. Four sub-sections: Overview, Documents, Application process, After arrival. Sidebar links scroll to each.*

*Nature of this section: largely universal with nationality callouts in specific places. The overview, documents list, and compliance requirements are standard. UAE-specific callouts appear for consulate experience, financial proof nuance, and interview preparation.*

---

### Overview

#### United States

The primary visa for international students studying at accredited US universities is the **F-1 Student Visa**. It is issued by the US Department of State and administered, once in the US, by the Student and Exchange Visitor Program (SEVP) within the Department of Homeland Security. [CITE: studyinthestates.dhs.gov]

The F-1 visa does not have a fixed expiry date in the way a tourist visa does. It is issued with "D/S" (Duration of Status) notation, meaning it remains valid for as long as the student is enrolled full-time in an approved program and complying with the conditions of their status. The physical visa stamp in the passport may expire, but the student can remain in the US as long as their SEVIS record and I-20 are valid.

**Visa fee:** $185 application fee (MRV fee) [CITE: travel.state.gov/fees]  
**SEVIS fee:** $350 (paid separately, before the visa interview) [CITE: fmjfee.com]  
**Work rights:** On-campus employment up to 20 hours per week during term; full-time during official breaks. Off-campus work is generally not permitted except through specific programs (CPT, OPT) authorised by the institution.  
**Dependants:** A spouse and unmarried children under 21 may accompany on an F-2 dependent visa. F-2 dependants may not work and may not study full-time.  
**Program types covered:** Bachelor's, Master's, PhD, and certain English language programs at SEVP-certified institutions.

[UAE CALLOUT: UAE nationals applying for an F-1 visa are not subject to any additional security checks or administrative processing delays that affect some other nationalities. The consular interview is the standard process, and approval rates for UAE nationals at the Abu Dhabi and Dubai posts are high for well-prepared applicants. The most common reason for F-1 refusal among UAE applicants is insufficient financial documentation — see the Documents section for detail.]

---

#### United Kingdom

The visa for international students in the UK is the **Student visa**, previously known as the Tier 4 (General) Student visa. It is issued by UK Visas and Immigration (UKVI), a department of the Home Office. [CITE: gov.uk/student-visa]

Unlike the US F-1, the UK Student visa has a fixed expiry date. It is typically granted for the length of the course plus an additional period (4 months for courses of 12 months or more; 2 months for shorter courses). When the visa expires, the student must either apply for an extension, switch to another visa category, or leave the UK.

**Visa fee:** £490 (applying from outside the UK) [CITE: gov.uk/student-visa/apply]  
**Immigration Health Surcharge (IHS):** £776 per year of study. For a three-year degree, this amounts to £2,328 paid upfront at the time of application. This is a significant and often unexpected cost for families. [CITE: gov.uk/healthcare-immigration-application]  
**Work rights:** Up to 20 hours per week during term for degree-level students; full-time during official vacations.  
**Dependants:** Dependants are permitted for postgraduate students on courses of nine months or more if the student is government-sponsored or studying at a higher education provider. For most undergraduate students, dependants are not permitted. Where permitted, a dependent spouse can work in the UK without restriction.  
**Program types covered:** Degree-level courses (Bachelor's, Master's, PhD) and below-degree courses at licensed student sponsors.

[UAE CALLOUT: UAE nationals applying for a UK Student visa do not need to attend a visa application centre for biometrics if they hold a UAE biometric passport and are applying under the UK's digital identity scheme. Standard applicants do need to attend a UKVI-approved VAC. Confirm current requirements at the time of application as this policy has been evolving. The IHS surcharge is frequently cited as a surprise cost by UAE families — factor this into the total cost of studying in the UK from the outset.]

---

#### Australia

The visa for international students in Australia is the **Student visa — Subclass 500**. It is issued by the Australian Department of Home Affairs. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500]

The Subclass 500 visa is typically granted for the duration of the course plus an additional period. Like the UK, the visa has a fixed expiry date, not a duration-of-status system like the US.

**Visa fee:** AUD $710 [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/fees]  
**Overseas Student Health Cover (OSHC):** Mandatory health insurance that must be purchased before the visa is granted. Cost varies by provider and duration — approximately AUD $600 to $700 per year for a single student. This is different from the UK IHS in that it is purchased from a private insurer, not paid to the government. [CITE: privatehealth.gov.au/healthinsurance/overseas]  
**Work rights:** Up to 48 hours per fortnight during term; unlimited during official vacation periods. This is the most generous work right among the three countries.  
**Dependants:** A spouse or de facto partner and dependent children may be included in the application as secondary applicants. A spouse of a student visa holder can work up to 48 hours per fortnight (or unlimited if the student is undertaking a masters or doctoral degree).  
**Program types covered:** Bachelor's, Master's, PhD, and registered vocational courses at registered education providers (CRICOS-registered institutions).

[UAE CALLOUT: UAE nationals applying for an Australian Subclass 500 visa typically experience straightforward processing. Australia does not require an in-person interview for student visa applications — the entire process is done online. Processing times for UAE applicants are typically 4 to 6 weeks, though this can extend during peak periods. Having comprehensive financial documentation prepared from the outset is the single most effective way to avoid delays.]

---

### Documents

#### United States

The following documents are required to apply for and attend the F-1 visa interview. All must be original or certified copies unless otherwise stated.

**From the institution**
- **Form I-20** — issued by the Designated School Official (DSO) at the university after the student has been accepted and paid a deposit or confirmed enrollment. This is the foundational document — no other part of the application can proceed without it. The I-20 states the program start date, the program end date, and the estimated annual cost of attendance. [CITE: studyinthestates.dhs.gov/students/the-form-i-20]

**Financial documents**
- Bank statements for the primary funding account covering the most recent six months, showing sufficient funds to cover the first year's costs as stated on the I-20. The US government does not publish a fixed threshold — the amount on the I-20 is the benchmark.
- If funds are held by a parent or sponsor (as is standard for UAE families), a signed financial support letter from the sponsor stating they will fund the student's education, along with the sponsor's own bank statements and evidence of income (salary slips or equivalent).
- If funding comes from a scholarship, the official scholarship award letter.

[UAE CALLOUT: This is the area where UAE applicants most commonly encounter refusals or requests for additional evidence. The consular officer is looking for funds that are clearly available, clearly accessible by the student or their sponsor, and clearly sufficient. Common issues include: bank statements showing very recent large deposits (which officers view as money temporarily placed to meet a threshold, not genuine available funds), accounts that are primarily in investment products rather than liquid savings, and sponsor letters that are vague about the duration or amount of support. Statements should show a consistent pattern over six months, not a lump sum deposited shortly before the application.]

**Identity and travel documents**
- Valid UAE passport with at least six months' validity beyond the intended program start date
- Previous passports containing US visas or travel to the US, if any
- One photograph meeting State Department specifications [CITE: travel.state.gov/photos]
- DS-160 confirmation page with barcode
- SEVIS fee (I-901) payment receipt [CITE: fmjfee.com]
- MRV (visa application) fee payment receipt

**Supporting documents (to bring to interview)**
- Proof of ties to the UAE — for a student this typically means family ties, property owned by parents, and evidence of intent to return after study. The concept of "non-immigrant intent" is particularly important for F-1 applicants: the student must demonstrate they do not intend to permanently immigrate to the US, even though the F-1 pathway does not preclude later applying to do so.
- Academic transcripts and standardised test scores (SAT, ACT, or equivalent where applicable)
- Evidence of English language proficiency if not already demonstrated through the institution's admission process

---

#### United Kingdom

**From the institution**
- **Confirmation of Acceptance for Studies (CAS)** — a unique reference number issued by the university once the student has accepted their offer. It is the UK equivalent of the I-20 and is required before the application can be submitted. The CAS contains the course details, start date, fees, and the institution's sponsor licence number. [CITE: gov.uk/student-visa/cas]

**Financial documents**
The UK has fixed financial thresholds that must be met. As of the current guidance: [CITE: gov.uk/student-visa/money]
- For courses in London: £1,334 per month for up to 9 months (i.e. £12,006 if 9 months of funds must be shown)
- For courses outside London: £1,023 per month for up to 9 months (i.e. £9,207)
- Additionally, the first year's tuition fees must be shown if not already paid

Funds must have been held continuously for at least 28 days prior to the application date. The 28-day rule is strict — the balance must not drop below the required amount at any point during that 28-day period.

Bank statements covering the full 28-day period are required, typically in the form of an official bank letter or printed statements on headed paper. Online statements are accepted if they include the bank's security features.

[UAE CALLOUT: UAE families commonly hold funds across multiple accounts or in investment portfolios. For the UK application, only funds held in a bank account (not stocks, bonds, or real estate equity) count toward the financial threshold. If funds need to be consolidated into a single account to meet the threshold, this should be done well before the 28-day window begins — not within it. A transfer made within the 28-day period that artificially inflates the balance will be visible on statements and may trigger a refusal.]

**Identity and other documents**
- Valid UAE passport
- CAS reference number (entered into the online application)
- Proof of English language proficiency — typically IELTS Academic with a minimum score of 6.0 overall (some universities and visa categories require higher). IELTS for UKVI is a specific version required for visa purposes; standard IELTS is not always accepted. [CITE: gov.uk/student-visa/english-language]
- Proof of parental or guardian consent if the student is under 18
- Tuberculosis test results — UAE nationals travelling to the UK for more than six months must provide a certificate from an approved clinic confirming they do not have active tuberculosis [CITE: gov.uk/tb-test-visa/united-arab-emirates]

[UAE CALLOUT: The tuberculosis test requirement catches many UAE families off guard. It is mandatory for UAE nationals applying for a UK visa of more than 6 months, including all student visas for degree courses. The test must be done at an approved clinic — in the UAE, the approved clinic is the SYNLAB clinic in Dubai. Allow 3 to 5 working days for results. Book this early as part of the application timeline.]

---

#### Australia

**From the institution**
- **Confirmation of Enrolment (CoE)** — issued by the university or college after the student has accepted their offer and paid a deposit. The CoE contains the provider's CRICOS registration number, the course details, and the start and end dates. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500]

**Financial documents**
Australia requires evidence that the student (or their sponsor) has sufficient funds to cover:
- Tuition fees for the first year of the course
- Living costs: AUD $29,710 per year for the student [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/student-visa-500-how-to-apply]
- School costs if bringing school-age dependants
- Travel costs

Unlike the UK, there is no strict 28-day holding period requirement, but funds must be genuinely available and demonstrably accessible. Bank statements, term deposit certificates, or evidence of a scholarship are all accepted.

[UAE CALLOUT: Australia is more flexible than the UK on the form that financial evidence takes. A UAE family that holds wealth in investment accounts, fixed deposits, or property can provide a broader range of financial documents. A letter from a UAE bank confirming the family's overall financial position is often accepted alongside bank statements. This is a meaningful practical difference for high-net-worth UAE families who do not keep large sums in liquid current accounts.]

**Health and character documents**
- **Overseas Student Health Cover (OSHC)** — proof of purchase is required as part of the visa application. The student must purchase OSHC from an approved provider before submitting. [CITE: privatehealth.gov.au]
- **Health examination** — may be required depending on the length of stay and country of origin. UAE nationals applying for courses longer than 12 months are typically required to undergo an upfront health examination at an approved panel physician. In the UAE, approved physicians are listed on the ImmiAccount portal. [CITE: immi.homeaffairs.gov.au/help-support/meeting-our-requirements/health]

**Identity documents**
- Valid UAE passport
- Genuine Temporary Entrant (GTE) statement — a written statement explaining why the student wants to study in Australia and why they intend to return home afterwards. This is unique to the Australian application and is taken seriously by processing officers. It should be well-written and specific — generic statements about "gaining an education" are insufficient.

[UAE CALLOUT: The GTE statement is the element UAE applicants most frequently underestimate. Australian immigration officers use it to assess whether the applicant genuinely intends to be a temporary student or is using the student visa as a migration pathway. A strong GTE statement for a UAE student explains: what they will study and why this specific course and institution, what career opportunity this creates in the UAE or the region, and why they intend to return. Mentioning family ties, career prospects in the UAE, and any existing professional context strengthens the statement considerably.]

---

### Application process

#### United States

The F-1 application follows a fixed sequence. Steps cannot be reordered — each depends on the previous.

**Step 1 — Receive the I-20**
The university issues the I-20 after the student has accepted their offer and, in most cases, paid a SEVIS deposit or enrollment confirmation fee. The student receives it by email as a PDF. It must be signed by both the DSO and the student before it is valid. [CITE: studyinthestates.dhs.gov/students/the-form-i-20]

**Step 2 — Pay the SEVIS I-901 fee**
The $350 SEVIS fee is paid at fmjfee.com using the SEVIS ID number on the I-20. Payment must be made before the DS-160 is submitted and before the visa interview. Keep the payment receipt. [CITE: fmjfee.com]

**Step 3 — Complete the DS-160**
The DS-160 online application is completed at ceac.state.gov. It takes approximately 90 minutes. Save progress frequently using the application ID — the session times out after 20 minutes of inactivity. Upload a photograph meeting the specifications. On completion, print the confirmation page with the barcode. [CITE: ceac.state.gov/genniv]

**Step 4 — Pay the MRV fee**
The $185 visa application fee is paid through the US Travel Docs portal for UAE applicants. [CITE: ustraveldocs.com/ae]

**Step 5 — Book the interview appointment**
Appointments are available at the US Embassy Abu Dhabi and the US Consulate General Dubai. Book through ustraveldocs.com. [CITE: ustraveldocs.com/ae]

[UAE CALLOUT: For F-1 applicants, the recommended post is whichever has the earlier available appointment. Both posts process F-1 visas. During peak season (April to July, when students are preparing for September starts), appointments fill quickly. Check availability on both posts simultaneously and book as soon as the I-20 is received — ideally no later than 8 weeks before the intended travel date.]

**Step 6 — Attend the interview**
Arrive 15 minutes early. Electronic devices are not permitted inside the consulate. Bring all required documents in a single organised folder. The interview itself is typically 2 to 5 minutes — the officer will ask about the course, the institution, funding, and plans after graduation. Answer directly and confidently.

**Step 7 — Passport collection**
If approved, the passport with the visa stamp is returned by courier within 3 to 5 working days. If additional administrative processing is required (uncommon for UAE nationals), this can extend to several weeks. The applicant is notified by email.

**Step 8 — Travel and entry**
The student may enter the US no earlier than 30 days before the program start date listed on the I-20. At the port of entry, the CBP officer will stamp the passport and create an I-94 arrival record. The student must check their I-94 online within a few days of arrival to confirm the admission class is F-1 and the admitted-until date shows D/S. [CITE: cbp.gov/i94]

---

#### United Kingdom

The UK Student visa application is done entirely online — there is no in-person interview in most cases.

**Step 1 — Receive the CAS**
The university issues the CAS after the student has firmly accepted their offer and, typically, paid a deposit. The CAS is a reference number sent by the university — it is entered into the online application rather than uploaded as a document. [CITE: gov.uk/student-visa/cas]

**Step 2 — Complete the tuberculosis test (UAE nationals only)**
UAE nationals must complete a TB test at an approved clinic before submitting the visa application if the course is longer than six months. Book the test at the SYNLAB clinic in Dubai and allow 3 to 5 working days for the certificate. [CITE: gov.uk/tb-test-visa/united-arab-emirates]

**Step 3 — Submit the online application**
The application is submitted at gov.uk/student-visa. The CAS number, personal details, financial information, and English language test results are entered online. The Immigration Health Surcharge is paid as part of this step. [CITE: gov.uk/student-visa/apply]

**Step 4 — Biometrics appointment**
After submitting online, applicants must attend a UK Visa and Citizenship Application Services (UKVCAS) centre to provide biometrics (fingerprints and photograph). In the UAE, UKVCAS service points are available in Abu Dhabi and Dubai. Appointments must be booked through the UKVCAS portal after the online application is submitted. [CITE: ukvcas.co.uk]

[UAE CALLOUT: Biometrics appointments at the UAE UKVCAS centres are generally available within 1 to 2 weeks during normal periods. During July and August, demand peaks significantly and wait times can extend to 3 to 4 weeks. Factor this into the overall timeline — biometrics cannot be completed before the online application is submitted, so the total time from submission to decision should be planned as: biometrics appointment (up to 4 weeks in peak) + processing time (up to 3 weeks) = allow 6 to 8 weeks total from application submission in peak season.]

**Step 5 — Decision**
The standard processing time after biometrics is within 3 weeks. Priority and super-priority services are available at additional cost for faster processing. The decision is communicated by email. If approved, a vignette (entry clearance sticker) is placed in the passport, allowing a single entry into the UK within 30 days of the visa start date.

**Step 6 — Collect the BRP**
Within 10 days of arriving in the UK, the student must collect their **Biometric Residence Permit (BRP)** from the post office specified in their visa decision letter. The BRP is the document that serves as proof of immigration status in the UK for the duration of the course. [CITE: gov.uk/biometric-residence-permits]

---

#### Australia

The Australian student visa application is entirely online through the ImmiAccount portal. There is no interview.

**Step 1 — Receive the CoE**
The university issues the CoE after the student accepts their offer and pays any required deposit. [CITE: immi.homeaffairs.gov.au]

**Step 2 — Purchase OSHC**
Overseas Student Health Cover must be purchased from an approved provider before submitting the application. Approved providers include Medibank, Bupa, Allianz, and others. The OSHC certificate is uploaded as part of the application. [CITE: privatehealth.gov.au]

**Step 3 — Complete the health examination if required**
UAE nationals applying for courses longer than 12 months are typically required to undergo a health examination at an approved panel physician before or shortly after submitting the visa application. In the UAE, check the current list of approved physicians on ImmiAccount. [CITE: immi.homeaffairs.gov.au/help-support/meeting-our-requirements/health]

**Step 4 — Submit the online application**
The application is submitted through ImmiAccount at immi.homeaffairs.gov.au. The CoE number, GTE statement, financial evidence, OSHC certificate, and identity documents are uploaded. The visa fee of AUD $710 is paid online. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500]

**Step 5 — Decision**
Processing times for UAE nationals are typically 4 to 6 weeks from submission of a complete application. The visa is granted electronically — there is no sticker in the passport. The student receives a grant letter by email, which they should print and carry when travelling.

[UAE CALLOUT: Australia's visa grant is electronic, which occasionally causes confusion at airports. The student does not receive a stamp or sticker — their visa status is confirmed when the airline checks their travel document electronically at check-in. The grant letter is not an official travel document but it is strongly recommended to carry it. The student can also check their visa status at any time using the Visa Entitlement Verification Online (VEVO) service. [CITE: immi.homeaffairs.gov.au/visas/already-have-a-visa/check-visa-details-and-conditions/check-conditions-online]]

**Step 6 — Entry into Australia**
UAE passport holders use SmartGates at Australian airports for automated border clearance, which is typically faster than the staffed lane. The student's visa will be confirmed automatically. Carry the OSHC certificate and CoE at entry — customs officers occasionally ask for these.

---

### After arrival

#### United States

Compliance with F-1 status requirements is the student's ongoing responsibility. The consequences of non-compliance — including termination of SEVIS record and potential bars on re-entry — are serious. The following are the key obligations.

**Report to the DSO**
Within 30 days of arriving in the US, the student must report to the international students office and confirm their presence. This activates their SEVIS record and confirms the program start date. [CITE: studyinthestates.dhs.gov/students/maintaining-your-status]

**Maintain full-time enrollment**
F-1 students must be enrolled full-time every semester (minimum 12 credit hours for undergraduates). Dropping below full-time without prior authorisation from the DSO is a status violation. Exceptions exist for medical reasons or final semester requirements but must be approved in advance.

**Address registration**
The student must report any change of address to their DSO within 10 days. The DSO updates SEVIS accordingly. Failure to maintain a current address in SEVIS is a technical violation.

**Work authorisation**
On-campus employment (up to 20 hours per week during term) is permitted without any additional authorisation. Off-campus work requires explicit authorisation — either Curricular Practical Training (CPT) for work integral to the curriculum, or Optional Practical Training (OPT) for work in the student's field of study. Working without authorisation is a serious violation and can result in immediate status termination. [CITE: studyinthestates.dhs.gov/students/working]

**Travel outside the US**
Before travelling internationally, the student must have a valid F-1 visa stamp (not just an active SEVIS record) to re-enter the US. The visa stamp in the passport may expire during the course of study — if it does, the student must obtain a new visa at a US consulate abroad before returning. The DSO must also sign the travel section of the I-20 within the past twelve months before international travel. [CITE: studyinthestates.dhs.gov/students/travel]

[UAE CALLOUT: UAE students returning home for summer or winter breaks and planning to re-enter the US should check the expiry date of their F-1 visa stamp before purchasing return tickets. If the stamp expires before the return travel date, they must apply for a new F-1 visa at the Abu Dhabi Embassy or Dubai Consulate before returning. This is a routine process but requires planning — allow the same lead time as the original application.]

**Renewing the visa vs extending the I-20**
The F-1 visa stamp in the passport and the I-20 are separate documents. If the student's program extends (for example, due to a program change or leave of absence), they need an updated I-20 from the DSO — not a new visa. A new visa is only required if the student travels internationally while the current stamp has expired.

---

#### United Kingdom

**Collect the BRP**
As noted in the application process, the BRP must be collected from the designated post office within 10 days of arrival. The BRP is the student's primary proof of right to study and work in the UK. Without it, the student cannot open a bank account, register with a GP, or provide proof of status to an employer. [CITE: gov.uk/biometric-residence-permits]

**Register with the university's international office**
Universities require international students to register formally with the international students or compliance team within the first week. This confirms the student's arrival and activates their record under the university's sponsor licence obligations.

**Register with a GP**
Students are entitled to use the NHS during their studies — this is what the IHS surcharge pays for. Registering with a local GP near the university should be done within the first two weeks.

**Maintain enrollment and attendance**
The university is legally obligated to monitor attendance and report absences to UKVI. A student who repeatedly misses classes or withdraws without notifying UKVI can have their leave curtailed (cancelled before the visa expiry date). This is a real risk and not merely theoretical — UK universities actively manage sponsor compliance. [CITE: gov.uk/sponsor-migrants/sponsor-a-student]

**Working**
The 20 hours per week limit during term is strictly enforced and is measured across all employment — including multiple part-time jobs. Exceeding the limit is a visa condition breach.

**Changing courses**
If the student changes course or university, a new CAS is required from the new institution and a new visa application may be necessary depending on the circumstances. Students should not change courses without first consulting the international office.

**Visa expiry and extension**
The BRP expiry date is the leave expiry date. If the student needs to remain in the UK beyond this date (for a dissertation extension, resits, or a further qualification), they must apply for a visa extension before the current visa expires. Applications made after expiry are overstay applications and are treated differently. [CITE: gov.uk/student-visa/extend-your-visa]

---

#### Australia

**Confirm enrollment**
The student must confirm their enrollment with the institution after arrival. The institution is required to report non-arriving students to the Department of Home Affairs.

**OSHC activation**
Ensure the OSHC policy is active from the date of arrival. The OSHC card and membership details are used to access healthcare during the stay.

**Work rights — 48 hours per fortnight**
The 48-hour per fortnight limit applies during term time. This is 48 hours across any two-week period — it does not reset weekly. During official university vacation periods, there is no work restriction for Subclass 500 holders.

[UAE CALLOUT: The Australian work rights are notably more generous than the US and UK. 48 hours per fortnight equates to approximately 24 hours per week — significantly more than the UK's 20 hours. For families where the student is expected to contribute to living costs through part-time work, this is a meaningful practical difference.]

**Maintain satisfactory course progress**
Australian institutions are required to report students who are not meeting satisfactory course progress requirements. Failure to meet academic requirements can result in the institution cancelling the student's enrollment, which in turn triggers a visa cancellation process. This is called a "section 20 notice" and the student has 28 days to respond before cancellation proceeds. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500]

**Changing institutions**
In the first six months of the principal course (the main qualification being studied), a student cannot transfer to a different provider except in limited circumstances. After six months, transfers are permitted with a new CoE from the new institution. A new visa is generally not required if the course level and duration are comparable.

**VEVO checks**
The student's visa conditions can be checked at any time through VEVO (Visa Entitlement Verification Online). Employers, landlords, and banks may request a VEVO check. Students can share their VEVO status directly rather than carrying physical documentation. [CITE: immi.homeaffairs.gov.au/visas/already-have-a-visa/check-visa-details-and-conditions/check-conditions-online]

---

## Work visa

*Single scrollable page. Two sub-sections: Post-study work, Getting sponsored. Sidebar links scroll to each.*

*Nature of this section: Post-study work is largely universal per country, with UAE callouts where relevant. Getting sponsored is written independently per country because the mechanisms differ fundamentally. Nationality callouts are integrated inline.*

---

### Post-study work

#### United States

The US does not have a standalone post-study work visa. Instead, the mechanism for working after graduation is called **Optional Practical Training (OPT)** — a period of authorised work experience that remains part of the F-1 status. [CITE: studyinthestates.dhs.gov/students/working/optional-practical-training]

**Standard OPT**
All F-1 graduates are eligible for 12 months of OPT. It must be in a job directly related to the student's field of study. The student applies for OPT through their DSO, who submits the request in SEVIS. The USCIS then issues an Employment Authorisation Document (EAD) — the physical card the student needs before they can legally start work. The student must apply for OPT no earlier than 90 days before graduation and no later than 60 days after. Processing currently takes 3 to 5 months, so the application must be submitted before graduation. [CITE: uscis.gov/opt]

**STEM OPT Extension**
Students who graduate with a qualifying STEM degree (Science, Technology, Engineering, or Mathematics) can apply for a 24-month extension of OPT, giving a total of 36 months. The employer must be enrolled in the E-Verify system. This 36-month window is critical because it overlaps with two or three H-1B lottery cycles — significantly improving the probability of securing H-1B sponsorship before OPT expires. [CITE: studyinthestates.dhs.gov/students/working/stem-opt]

**The cliff: what happens when OPT ends**
If the student does not secure H-1B sponsorship (or another qualifying visa status) before their OPT period ends, they must leave the US. There is no extension or grace category available. This is a hard stop. The unpredictability of the H-1B lottery means this is a genuine risk that students and families should plan around from the outset — not treat as a future problem.

[UAE CALLOUT: UAE nationals on OPT are not subject to any nationality-specific work restrictions. The OPT experience for a UAE graduate in the US is the same as for any other nationality. The H-1B lottery — the primary path to remaining after OPT — also treats all nationalities equally in the lottery itself. The Green Card backlog, however, differs significantly by nationality and is discussed in the Getting sponsored section.]

---

#### United Kingdom

The UK has a dedicated post-study work visa called the **Graduate Route**. It is a straightforward extension of stay specifically designed to allow international students to work after completing their degree. [CITE: gov.uk/graduate-visa]

The Graduate Route gives two years of open work permission for bachelor's and master's graduates, and three years for PhD graduates. There is no requirement to have a job offer, no salary threshold, and no employer sponsorship. The student can work in any job, at any level, for any employer. They can also be self-employed.

The Graduate Route is applied for online before the Student visa expires. The application fee is £822. There is no points requirement and no cap on numbers. [CITE: gov.uk/graduate-visa/apply]

**What the Graduate Route does not do**
The Graduate Route does not lead to permanent residency on its own. Time spent on the Graduate Route counts toward the five-year continuous residence requirement for ILR, but only if the student subsequently switches to a qualifying visa (such as the Skilled Worker visa) that also counts. Two years on Graduate Route followed by three years on Skilled Worker = five years = eligible for ILR. [CITE: gov.uk/indefinite-leave-to-remain]

**The transition point**
The two to three year window of the Graduate Route is the period in which the student needs to secure employer sponsorship for the Skilled Worker visa if they intend to stay beyond the Graduate Route. Unlike the US H-1B, there is no annual lottery — the Skilled Worker visa is available year-round as long as an eligible employer is willing to sponsor.

---

#### Australia

Australia has a post-study work stream built into the **Temporary Graduate visa — Subclass 485**. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-graduate-485]

The duration of the post-study work stream depends on the qualification level and, uniquely, where in Australia the student studied. This regional incentive is a deliberate government policy to encourage international graduates to work in regional areas.

**Duration by qualification and location:**
- Bachelor's degree or higher, studied in a major city: 2 years
- Bachelor's degree or higher, studied in a regional area: 3 years
- Master's by coursework: 3 years
- Master's by research: 3 years
- Doctoral degree (PhD): 4 years
- Doctoral degree, studied in a regional area: 5 years
[CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-graduate-485]

Like the UK Graduate Route, there is no job offer required, no salary threshold, and no employer restriction. The student can work in any role.

**Application**
The Subclass 485 application must be made within six months of course completion. It is applied for online through ImmiAccount. The fee is AUD $1,895. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-graduate-485/fees-and-charges]

[UAE CALLOUT: The Australian post-study work period is the most generous of the three countries — up to 4 or 5 years for PhD graduates. For UAE families whose child is pursuing a research degree, Australia's Subclass 485 provides an extended runway to secure permanent residency without the lottery uncertainty of the US or the time pressure of the UK's 2-year Graduate Route.]

---

### Getting sponsored

#### United States

Employer sponsorship in the US for an international graduate means, in practical terms, **H-1B visa sponsorship**. The H-1B is the primary work visa for specialty occupations — defined broadly as roles requiring at least a bachelor's degree or equivalent in a specific field. Almost all professional roles in technology, finance, consulting, healthcare, and academia qualify. [CITE: uscis.gov/h-1b]

**The lottery — how it works**
The H-1B has an annual numerical cap of 65,000 visas, with an additional 20,000 for those holding a US master's degree or higher (the master's cap). Since demand has consistently exceeded supply — typically by a factor of three to five in recent years — USCIS selects registrations by lottery.

The process runs annually:
- **March:** Employers submit electronic registrations during a registration window (typically the first two weeks of March). A registration fee of $215 is paid per registration.
- **Late March:** USCIS conducts the lottery and notifies selected registrations.
- **April to June:** Selected registrations proceed to file the full H-1B petition with supporting documentation.
- **October 1:** The H-1B employment start date. The fiscal year cap H-1B cannot start before October 1.

A student on 12-month standard OPT who graduates in May needs their employer to submit a registration the following March — approximately 10 months after graduation. If selected and approved, work begins October 1 of that year, about 17 months after graduation. The student must remain on OPT until the H-1B starts. For STEM OPT students, the 36-month window allows participation in up to three lottery cycles, significantly improving overall selection probability.

**Lottery odds**
In recent years (2022–2024), the overall selection rate has been approximately 25% to 35% in a given year for master's cap registrants, and lower for bachelor's cap registrants. These numbers fluctuate with demand. There is no guarantee of selection regardless of qualifications or employer.

**What employers actually sponsor**
Large employers in technology (Google, Microsoft, Amazon, Meta), finance (Goldman Sachs, JP Morgan), consulting (McKinsey, Deloitte, Accenture), and pharmaceuticals routinely sponsor H-1B visas. Most mid-size and small employers do not — either because of cost, administrative complexity, or risk aversion. The total cost of an H-1B petition to an employer is typically $5,000 to $15,000 in legal and filing fees, plus the prevailing wage obligation.

Students should assess their employer's sponsorship track record before accepting a job offer — publicly available H-1B disclosure data from the Department of Labor shows which employers sponsor, how many, and in which roles. [CITE: dol.gov/agencies/eta/foreign-labor/performance]

**The Green Card question and nationality**
Securing H-1B sponsorship is only the beginning of the US pathway. Most professional immigrants eventually pursue employment-based permanent residency (the Green Card) through their employer. The timeline from H-1B to Green Card approval depends heavily on nationality due to the per-country cap system.

For UAE nationals, the wait for an employment-based Green Card (EB-2 or EB-3 category) is currently estimated at 3 to 8 years from the time a petition is approved — which is manageable and broadly similar to most nationalities other than India and China.

[UAE CALLOUT: UAE nationals are in the "rest of the world" category for employment-based Green Card purposes, which means they face no nationality-specific backlog. The current wait time for UAE nationals in the EB-2 category is approximately 2 to 5 years from petition approval — significantly shorter than the decades-long waits faced by Indian nationals in the same category. This is an important consideration when comparing the US to UK or Australia: for UAE nationals specifically, the Green Card backlog is not a major deterrent, unlike for Indian or Chinese nationals. If your child is Indian or Chinese, the Green Card timeline calculation is entirely different and should be researched separately.]

---

#### United Kingdom

The primary employer-sponsored work visa in the UK is the **Skilled Worker visa**. It replaces the old Tier 2 General visa and operates on a points-based system. [CITE: gov.uk/skilled-worker-visa]

**How it works**
There is no lottery. An employer who wishes to hire an international graduate must hold a sponsor licence issued by the Home Office. The employee applies for the visa themselves, but needs a **Certificate of Sponsorship (CoS)** from the employer before they can apply. The process is employer-led but not employer-exclusive — there are thousands of licensed sponsors across the UK, and the number has grown significantly since 2021.

**Points requirements**
The application earns points for: having a job offer from a licensed sponsor (mandatory), the job meeting the skill threshold (RQF Level 3 or above, which covers most graduate roles), meeting the minimum salary threshold, and English language proficiency.

**Salary thresholds (as of April 2024):** [CITE: gov.uk/skilled-worker-visa/your-job]
- General threshold: £38,700 per year, or the going rate for the specific occupation code, whichever is higher
- New entrant rate (for recent graduates, under-26, or switching from Graduate Route): £30,960 per year

The new entrant rate is particularly relevant for recent graduates on the Graduate Route transitioning to the Skilled Worker visa — the lower threshold acknowledges that early-career salaries are typically below the general threshold.

**No annual cap on numbers**
Unlike the H-1B, there is no annual cap on Skilled Worker visas. Applications can be made at any time of year. There is no lottery. If the application meets the criteria, it will be approved.

**Visa duration and renewal**
The Skilled Worker visa is typically granted for up to five years and can be extended. After five years of continuous lawful residence in the UK (combining time on the Student visa, Graduate Route, and Skilled Worker visa), the applicant becomes eligible for Indefinite Leave to Remain (ILR). [CITE: gov.uk/indefinite-leave-to-remain]

[UAE CALLOUT: The Skilled Worker visa salary threshold of £38,700 translates to approximately AED 181,000 per year at current exchange rates. For UAE families benchmarking against local salaries, UK graduate salaries in most sectors — particularly outside London — may initially fall below this threshold for entry-level roles. The new entrant rate of £30,960 mitigates this for the first few years. Students intending to remain in the UK after graduation should target roles at employers with active sponsor licences and salaries that meet the threshold — London-based roles in technology, finance, and professional services most reliably meet this bar.]

---

#### Australia

The primary employer-sponsored work visas in Australia for skilled graduates are the **Temporary Skill Shortage visa (Subclass 482)** and the **Employer Nomination Scheme (Subclass 186)**. The 482 is the temporary route; the 186 leads directly to permanent residency. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-skill-shortage-482] [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/employer-nomination-scheme-186]

**Subclass 482 — Temporary Skill Shortage**
The employer must be an approved sponsor. The role must be on the relevant skilled occupation list. The salary must meet the Temporary Skilled Migration Income Threshold (TSMIT), currently AUD $70,000 per year. [CITE: immi.homeaffairs.gov.au/tsmit]

The 482 is granted for up to four years (or two years for occupations on the short-term list). After three years on a 482 in a medium-term occupation, the applicant can apply for permanent residency through the Subclass 186.

**Subclass 186 — Employer Nomination Scheme**
This is the direct employer-sponsored permanent residency route. The employer nominates the employee, and the employee applies for the visa. No lottery. Approval rates are high for applicants who meet the requirements. The key requirements are: at least two years of relevant work experience, occupation on the relevant list, skills assessment (for some occupations), English language proficiency, and health and character checks.

**Skills-independent permanent residency — Subclass 189**
Australia is the only one of the three countries offering a points-tested, employer-independent permanent residency pathway. The Subclass 189 allows skilled graduates to apply for PR without needing an employer to nominate them, based on a points test covering age, qualifications, work experience, English proficiency, and Australian study. An Australian bachelor's degree (studied in Australia) contributes points to the test, making this a viable parallel pathway for strong candidates.

[UAE CALLOUT: For UAE graduates, Australia offers the most straightforward path to permanent residency of the three countries — particularly through the Subclass 189 points-tested route, which requires no employer sponsor and is not subject to a lottery. A UAE graduate with a strong academic record, high English proficiency, and Australian study experience is well-positioned to achieve a competitive points score. The absence of a nationality-based queue (unlike the US EB categories) means the timeline is predictable. This is a meaningful advantage that is frequently overlooked by Gulf families who default to comparing the US and UK.]

---

## Residency pathway

*Single scrollable page. Three sub-sections: Permanent residency, Citizenship, Dual nationality. Sidebar links scroll to each.*

*Nature of this section: largely universal — residency rules apply the same regardless of nationality. UAE callouts appear for dual nationality (which is a UAE-specific and high-stakes topic) and for the Green Card backlog (which is favourable for UAE nationals). Citizenship requirements are standard.*

---

### Permanent residency

#### United States

Permanent residency in the US — commonly called the **Green Card** — confers the right to live and work in the US indefinitely, without employer sponsorship or visa renewal. It is the most valuable immigration status short of citizenship. [CITE: uscis.gov/green-card]

**Employment-based routes (most relevant for student-to-graduate pathway)**

The employment-based (EB) preference categories are the primary route for international graduates who enter the US on an F-1 and then work on H-1B sponsorship.

- **EB-1A:** Extraordinary ability — no employer needed, self-petition. Requires international recognition in the field. Very high bar.
- **EB-1B:** Outstanding researcher or professor — employer required. Requires recognised international standing in academic or research field.
- **EB-2:** Advanced degree professionals or exceptional ability. Requires a master's degree or bachelor's plus five years' progressive experience, and typically employer sponsorship through the PERM labor certification process. There is a sub-category, the **National Interest Waiver (NIW)**, which allows self-petition without employer sponsorship if the applicant can demonstrate their work is in the national interest.
- **EB-3:** Skilled workers and professionals. Requires a bachelor's degree and employer sponsorship. Lower bar than EB-2 but longer queues for high-demand nationalities.
[CITE: uscis.gov/green-card/green-card-eligibility/green-card-through-employment]

**The PERM process**
For most EB-2 and EB-3 applicants, the employer must first complete a **PERM Labor Certification** through the Department of Labor — a process demonstrating that no qualified US worker was available for the role. PERM takes 8 to 18 months currently. After PERM approval, the employer files an I-140 petition. After I-140 approval, the applicant must wait for a visa number to become available — determined by their priority date and nationality category. [CITE: dol.gov/agencies/eta/foreign-labor/programs/perm]

**Priority dates and the visa bulletin**
Each month, the State Department publishes the Visa Bulletin, which shows the "priority date" that is currently being processed for each EB category and nationality. An applicant can only proceed to the final step (adjustment of status or consular processing) when their priority date is "current." [CITE: travel.state.gov/visa-bulletin]

[UAE CALLOUT: UAE nationals fall into the "rest of the world" (ROW) category for employment-based Green Card purposes. The ROW queue is significantly shorter than the India and China queues. Currently, ROW priority dates for EB-2 are approximately 1 to 4 years behind the filing date, meaning a UAE national who files an I-140 today can expect the priority date to become current within a few years. This is in stark contrast to Indian nationals, for whom the EB-2 and EB-3 wait currently extends to decades. For UAE families evaluating the US as a long-term destination, the Green Card timeline is not a significant deterrent — it is a manageable multi-year process, not an indefinite one.]

**Total realistic timeline from student arrival to Green Card**
Student visa arrival → OPT (1–3 years) → H-1B (3 years, renewable) → PERM and I-140 (1–2 years) → wait for priority date (1–4 years for UAE) → Green Card.
Realistic total: **8 to 14 years** from arrival for a UAE national in an EB-2 or EB-3 category.

---

#### United Kingdom

Permanent residency in the UK is called **Indefinite Leave to Remain (ILR)**. It is the right to live and work in the UK without any time restriction or visa condition. [CITE: gov.uk/indefinite-leave-to-remain]

**The five-year continuous residence requirement**
ILR requires five years of continuous lawful residence in the UK. The five years can be made up of time on different visa categories, provided they are all qualifying categories. The Student visa, Graduate Route, and Skilled Worker visa all count. There is no lottery and no nationality-based queue — every applicant who meets the requirements is approved.

**Continuity requirements**
The applicant must not have been outside the UK for more than 180 days in any 12-month period during the five years. This is strictly counted and can affect applicants who travel frequently. [CITE: gov.uk/indefinite-leave-to-remain/eligibility]

**Knowledge of Life in the UK test**
Applicants must pass the Life in the UK test — a 24-question multiple-choice test covering British history, culture, and values. The test is taken at an approved test centre and costs £50. [CITE: gov.uk/life-in-uk-test]

**English language requirement**
Applicants must demonstrate English language proficiency at B1 level or above. This is typically already satisfied from the original Student visa application.

**Total realistic timeline from student arrival to ILR**
Student visa (3–4 years for a bachelor's degree) → Graduate Route (2 years) → potentially one year of Skilled Worker visa if additional time is needed → apply for ILR.
Realistic total: **5 to 7 years** from arrival.

---

#### Australia

Permanent residency in Australia is called **Permanent Residency (PR)** and is typically acquired through one of several visa subclasses, the most relevant of which are the Subclass 189 (skills-independent) and Subclass 186 (employer nomination). [CITE: immi.homeaffairs.gov.au/visas/permanent-residency]

**Subclass 189 — Skilled Independent**
The points-tested, employer-independent route. The applicant submits an Expression of Interest (EOI) through SkillSelect. Points are awarded for age, English proficiency, skilled work experience, qualifications, Australian study, and partner skills. When a sufficient points score is achieved, the applicant may receive an invitation to apply. The score required fluctuates by occupation and changes quarterly. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189]

**Subclass 190 — Skilled Nominated**
Similar to the 189 but requires nomination from a state or territory government. State nomination typically requires working or living in that state and meeting state-specific skills needs. Nomination adds 5 points to the EOI score. [CITE: immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-nominated-190]

**Subclass 186 — Employer Nomination Scheme**
Employer-nominated PR, discussed in the Work visa section. After two years of work in the role, the employer nominates and the employee applies.

**Total realistic timeline from student arrival to PR**
Student visa (3–4 years) → Subclass 485 post-study work (2–4 years) → points-test PR application (typically 6 to 12 months processing) or ENS 186 after 2 years employment.
Realistic total: **5 to 8 years** from arrival.

[UAE CALLOUT: Australia's points-tested system benefits UAE nationals who study well and have strong English. There is no nationality-based queue — an Australian PR application for a UAE national is assessed on the same basis as any other nationality. The combination of Australian study bonus points, strong English language skills, and a professional qualification means a well-prepared UAE graduate can be in a competitive position for a Subclass 189 invitation.]

---

### Citizenship

#### United States

US citizenship through naturalisation requires the applicant to first hold a Green Card (permanent residency) and then meet the following requirements: [CITE: uscis.gov/citizenship/apply-for-citizenship]

- **Five years** as a permanent resident (three years if married to a US citizen throughout that period)
- Continuous residence — must not have been outside the US for more than 30 months total during the five years, and no single trip longer than six months
- Physical presence — must have been physically present in the US for at least 30 months of the five-year period
- Good moral character — no serious criminal convictions during the qualifying period
- English language proficiency — ability to read, write, speak, and understand basic English
- Civics knowledge — pass a civics test covering US history and government (100 possible questions; 10 are asked; 6 must be answered correctly)
- Oath of allegiance

**Total from student visa arrival to citizenship:** 
Adding the Green Card timeline (8 to 14 years for a UAE national) plus the 5-year naturalisation period: **13 to 19 years** from arrival.

---

#### United Kingdom

British citizenship through naturalisation requires: [CITE: gov.uk/apply-citizenship-indefinite-leave-to-remain]

- Holding ILR (or qualifying as the spouse of a British citizen)
- **One year** as a permanent resident (ILR holder) immediately before applying
- Five years of continuous lawful residence prior to the application (the ILR period counts as the final year)
- Not having been outside the UK for more than 450 days during the five years, and no more than 90 days in the 12 months immediately before applying
- Good character requirement
- English language proficiency (typically already demonstrated)
- Life in the UK test (same as for ILR — if already passed for ILR, not required again)

**Total from student visa arrival to citizenship:**
Five years of continuous residence leading to ILR, plus one year as ILR holder: **6 to 8 years** from arrival.

---

#### Australia

Australian citizenship by conferral (naturalisation) requires: [CITE: homeaffairs.gov.au/citizenship/become-a-citizen/permanent-resident]

- **Four years** of lawful residence in Australia, of which at least **12 months** must be as a permanent resident
- Presence in Australia — the applicant must have been present in Australia for 4 years (1,460 days), with no more than 12 months total outside Australia during that period, and no more than 90 days outside Australia in the year before applying
- Good character
- Basic English proficiency
- Pass the citizenship test — a 20-question online test covering Australian values, history, government, and the responsibilities and privileges of citizenship
- Intention to reside or maintain a close and continuing association with Australia

**Total from student visa arrival to citizenship:**
Approximately 3 to 4 years on temporary visas leading to PR, plus 1 year as a permanent resident: **6 to 8 years** from arrival — comparable to the UK and significantly faster than the US pathway.

---

### Dual nationality

*This sub-section is written differently from the others. It does not vary by destination country in the same way — it is primarily a question of whether the home country permits its nationals to hold foreign citizenship. The destination country's position is noted but the UAE-specific content is the critical information here.*

---

**What dual nationality means in this context**

When a student eventually naturalises as a citizen of the US, UK, or Australia, the question arises: do they retain their UAE nationality, or do they formally lose it? The answer depends not on the destination country's rules but on the UAE's position on dual nationality.

**The UAE's position**

The UAE does not recognise dual nationality for its citizens. A UAE national who acquires foreign citizenship is considered by the UAE to have forfeited their UAE citizenship. In practice, this means:
- The UAE passport would no longer be valid
- The right to reside and work in the UAE as a national, access UAE public services as a citizen, and hold UAE property under national ownership rules would be affected
- Family law and inheritance rights governed by UAE personal status law may be affected

This is not merely a theoretical risk — the UAE government does enforce this. UAE nationals who naturalise abroad without prior disclosure and explicit permission from the UAE authorities risk having their citizenship formally revoked. [CITE: uaecabinet.ae/en/details/federal-laws]

**The destination countries' positions**

All three destination countries — the US, UK, and Australia — permit dual nationality. None of them require applicants for naturalisation to renounce their existing citizenship. The legal obligation to renounce, if any, sits entirely on the UAE side.

[UAE CALLOUT: This is one of the most significant and emotionally difficult realities for UAE families to confront. A child who builds their career, settles, and eventually naturalises in the US, UK, or Australia will, under current UAE law, do so at the cost of their UAE citizenship — unless the UAE government has granted explicit prior permission. Permission can in some cases be obtained, particularly where there is a compelling professional or national interest reason. Families considering this pathway long in advance should seek legal advice from a UAE-qualified lawyer with experience in nationality law, not immigration consultants. This is a decision with generational consequences and should not be addressed only when naturalisation is imminent.]

**Other nationalities for reference**

For families reading this guide who are not UAE nationals:
- **India** does not permit dual nationality. Indian nationals who naturalise abroad must surrender their Indian passport. The Overseas Citizen of India (OCI) card is available as a long-term residency card for former Indian citizens but it is not citizenship.
- **Pakistan** does not officially permit dual nationality with all countries but has bilateral agreements allowing it with a specific list of countries including the US, UK, and Australia. Pakistani nationals naturalising in these three countries may in practice retain Pakistani nationality.
- **Saudi Arabia** does not permit dual nationality.
- **Egypt** does not permit dual nationality in most circumstances.

---

## Citations section

*This section appears as a dedicated page or panel accessible from the footer of every page.*

**How we source information**

Every piece of information in Student Atlas is drawn from official government sources — immigration authority websites, primary legislation, and official guidance documents published by the relevant departments. We do not draw on third-party aggregators, immigration consultancy marketing material, or forum-based guidance.

The main sources we use for each country are:

**United States:** U.S. Department of State (travel.state.gov), U.S. Citizenship and Immigration Services (uscis.gov), Study in the States — Department of Homeland Security (studyinthestates.dhs.gov), U.S. Customs and Border Protection (cbp.gov), Department of Labor (dol.gov)

**United Kingdom:** GOV.UK — UK Visas and Immigration (gov.uk/browse/visas-immigration), UK Visa and Citizenship Application Services (ukvcas.co.uk)

**Australia:** Department of Home Affairs (immi.homeaffairs.gov.au), Home Affairs citizenship portal (homeaffairs.gov.au/citizenship)

**How we keep information current**

We review all content on a rolling basis. Each section displays a "last verified" date. When official guidance changes, we update the relevant section and log the change. We also monitor official government announcements and the monthly US Visa Bulletin for time-sensitive updates.

**What citations look like in the app**

Within each section of Student Atlas, numbered citation markers appear inline next to specific facts and figures. Clicking a citation marker opens the source document in a new tab. Citations open the most specific page of the source document available — not just the homepage of the government website.

**A note on accuracy**

Immigration rules change frequently. A policy that is current when we write it may have changed by the time you read it. We make every effort to keep content accurate but we are an information resource, not a legal authority. Where rules have changed and we have not yet updated our content, we want to know — use the feedback link at the bottom of any page to flag a discrepancy.

**We are not legal advisers**

Nothing in Student Atlas constitutes legal advice. For complex individual situations — including visa refusals, prior immigration violations, or nationality questions involving dual citizenship — a qualified immigration lawyer should be consulted.
