import { trustedExpertsProofSection, trustedExpertsSection } from "../sections/templates.js";
import { renderHtml } from "./render.js";

export default {
  title: "Groov/Sections/Trusted Experts Proof",
  render: () => renderHtml(trustedExpertsProofSection(), { init: false }),
};

export const Desktop = {
  globals: {
    viewport: { value: "desktop" },
  },
};

export const Mobile = {
  globals: {
    viewport: { value: "mobile" },
  },
};

export const WithVideoTestimonials = {
  render: () => renderHtml(trustedExpertsSection(), { init: false }),
};
