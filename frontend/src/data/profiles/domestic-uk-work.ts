import type { Profile } from "../types";

/** Domestic UK profile — replaces UK work visa content for British citizens */
export const domesticUkWork: Profile = {
  "post-study-work": [
    {
      id: "uk-domestic-work-psw",
      block: {
        type: "paragraph",
        text: "As a **British citizen**, you have the unrestricted right to work in the United Kingdom. You do not need a Graduate visa, Skilled Worker visa, or any form of work authorisation. You can begin working immediately upon completing your studies — part-time or full-time, in any field, for any employer. There are no salary thresholds, sponsorship requirements, or time limits on your employment.",
      },
    },
    {
      id: "uk-domestic-work-psw-details",
      block: {
        type: "key-value-list",
        items: [
          { label: "Work visa required", value: "No — full work rights as a citizen" },
          { label: "Employer sponsorship", value: "Not required" },
          { label: "Salary threshold", value: "None" },
          { label: "Time limit", value: "None — work indefinitely" },
        ],
      },
    },
  ],
  "getting-sponsored": [
    {
      id: "uk-domestic-work-sponsor",
      block: {
        type: "paragraph",
        text: "British citizens do not require employer sponsorship to work in the UK. You can apply for any job, change employers freely, and work in any sector without restriction. This is a significant advantage — international students must secure a sponsoring employer willing to hold a Home Office sponsor licence, but as a citizen you face no such requirement.",
      },
    },
  ],
};
