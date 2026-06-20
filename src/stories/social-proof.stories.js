import { socialProofSection } from "../sections/templates.js";
import { renderHtml } from "./render.js";

export default {
  title: "Groov/Sections/Social Proof",
};

export const CarouselDesktop = {
  name: "Carousel / Desktop",
  globals: {
    viewport: { value: "desktop" },
  },
  render: () => renderHtml(socialProofSection({ variant: "carousel" })),
};

export const CarouselMobile = {
  name: "Carousel / Mobile",
  globals: {
    viewport: { value: "mobile" },
  },
  render: () => renderHtml(socialProofSection({ variant: "carousel" })),
};

export const MarqueeDesktop = {
  name: "Marquee / Desktop",
  globals: {
    viewport: { value: "desktop" },
  },
  render: () => renderHtml(socialProofSection({ variant: "marquee" }), { init: false }),
};

export const MarqueeMobile = {
  name: "Marquee / Mobile",
  globals: {
    viewport: { value: "mobile" },
  },
  render: () => renderHtml(socialProofSection({ variant: "marquee" }), { init: false }),
};
