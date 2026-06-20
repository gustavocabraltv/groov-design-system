import { trustedMarqueeSection } from "../sections/templates.js";
import { renderHtml } from "./render.js";

export default {
  title: "Groov/Sections/Trusted Marquee",
  render: () => renderHtml(trustedMarqueeSection(), { init: false }),
};

export const Default = {};
