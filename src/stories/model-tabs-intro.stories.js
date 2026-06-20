import { modelTabsIntroSection } from "../sections/templates.js";
import { renderHtml } from "./render.js";

export default {
  title: "Groov/Sections/Product Discovery/Fit Process Intro",
  render: () => renderHtml(modelTabsIntroSection(), { init: false }),
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
