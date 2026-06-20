import { testimonialRevealSection } from "../sections/templates.js";
import { renderHtml } from "./render.js";

export default {
  title: "Groov/Sections/Testimonial Reveal",
  render: () => renderHtml(testimonialRevealSection()),
};

export const Default = {};
