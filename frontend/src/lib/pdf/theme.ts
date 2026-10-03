// Colours, page geometry and type scale for the PDF report. All lengths in mm,
// font sizes in pt.

export type RGB = readonly [number, number, number];

export const NAVY: RGB = [27, 45, 79];
export const NAVY_SOFT: RGB = [62, 80, 114];
export const GOLD: RGB = [200, 150, 62];
export const GOLD_LIGHT: RGB = [212, 168, 83];
export const GOLD_DARK: RGB = [150, 104, 28];
export const WHITE: RGB = [255, 255, 255];
export const ON_NAVY_MUTED: RGB = [168, 180, 202];
export const TEXT: RGB = [33, 37, 41];
export const TEXT_MUTED: RGB = [108, 117, 125];
export const HAIRLINE: RGB = [222, 226, 230];
export const RED: RGB = [192, 57, 43];
export const RED_LIGHT: RGB = [231, 76, 60];
export const CALLOUT_BG: RGB = [253, 246, 230];
export const PANEL_BG: RGB = [246, 247, 250];

export const PAGE_W = 210;
export const PAGE_H = 297;
export const MARGIN_X = 22;
export const CONTENT_W = PAGE_W - MARGIN_X * 2;
/** First baseline area on content pages, below the running header. */
export const CONTENT_TOP = 26;
/** Content never runs below this; the footer sits underneath. */
export const CONTENT_BOTTOM = PAGE_H - 22;
export const HEADER_Y = 13;
export const FOOTER_Y = PAGE_H - 11;

/** pt → mm */
export const PT = 0.3528;

export const TYPE = {
  pageTitle: 22,
  subsection: 16,
  h2: 13,
  h3: 11.5,
  h4: 10.5,
  body: 9.5,
  small: 8,
  tiny: 7,
} as const;

/** Line height as a multiple of the font size. */
export const LEADING = 1.45;

export function lineHeight(size: number): number {
  return size * PT * LEADING;
}

/** Vertical gaps between blocks. */
export const GAP = {
  block: 3,
  item: 1.2,
  beforeHeading: 3,
  afterHeading: 1.5,
  country: 6,
  subsection: 10,
} as const;
