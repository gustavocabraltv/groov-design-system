import { videoTestimonialsSection } from "../sections/templates.js";
import { renderHtml } from "./render.js";

export default {
  title: "Groov/Sections/Social Proof/Video Testimonials",
  render: () => renderHtml(videoTestimonialsSection(), { init: false }),
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
