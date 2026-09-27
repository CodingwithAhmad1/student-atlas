import type { Profile } from "../types";

/** Domestic AU profile — replaces AU work visa content for Australian citizens */
export const domesticAuWork: Profile = {
  "post-study-work": [
    {
      id: "au-domestic-work-psw",
      block: {
        type: "paragraph",
        text: "As an **Australian citizen**, you have the unrestricted right to work anywhere in Australia. You do not need a Subclass 485 post-study work visa, employer sponsorship, or any form of work authorisation. You can begin working immediately upon graduating — part-time or full-time, in any field, for any employer.",
      },
    },
    {
      id: "au-domestic-work-psw-details",
      block: {
        type: "key-value-list",
        items: [
          { label: "Work visa required", value: "No — full work rights as a citizen" },
          { label: "Employer sponsorship", value: "Not required" },
          { label: "Points test", value: "Not applicable" },
          { label: "Time limit", value: "None — work indefinitely" },
        ],
      },
    },
  ],
  "getting-sponsored": [
    {
      id: "au-domestic-work-sponsor",
      block: {
        type: "paragraph",
        text: "Australian citizens do not require employer sponsorship to work in Australia. You can apply for any job, change employers freely, and work in any sector without restriction. This is a significant advantage — international graduates must navigate the points system or secure employer sponsorship through the Skills in Demand (Subclass 482) visa, but as a citizen you face no such barriers.",
      },
    },
  ],
};
