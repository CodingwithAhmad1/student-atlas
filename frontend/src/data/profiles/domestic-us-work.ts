import type { Profile } from "../types";

/** Domestic US profile — replaces US work visa content for US citizens */
export const domesticUsWork: Profile = {
  "post-study-work": [
    {
      id: "us-domestic-work-psw",
      block: {
        type: "paragraph",
        text: "As a **United States citizen**, you have the unrestricted right to work anywhere in the United States. You do not need OPT, an H-1B visa, or any form of work authorisation. You can begin working immediately upon graduating — part-time or full-time, in any field, for any employer. There are no lottery systems, sponsorship requirements, or time limits.",
      },
    },
    {
      id: "us-domestic-work-psw-details",
      block: {
        type: "key-value-list",
        items: [
          { label: "Work visa required", value: "No — full work rights as a citizen" },
          { label: "Employer sponsorship", value: "Not required" },
          { label: "H-1B lottery", value: "Not applicable" },
          { label: "Time limit", value: "None — work indefinitely" },
        ],
      },
    },
  ],
  "getting-sponsored": [
    {
      id: "us-domestic-work-sponsor",
      block: {
        type: "paragraph",
        text: "US citizens do not require employer sponsorship to work in the United States. You can apply for any job, change employers freely, and work in any sector without restriction. This is a significant advantage — international graduates must navigate the H-1B lottery and employer sponsorship system, but as a citizen you face no such barriers.",
      },
    },
  ],
};
