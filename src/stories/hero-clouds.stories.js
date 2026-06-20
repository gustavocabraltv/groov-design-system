import { heroCloudsSection } from "../sections/templates.js";
import { renderHtml } from "./render.js";

export default {
  title: "Groov/Hero Header Sections/Hero Clouds",
  render: () => renderHtml(heroCloudsSection()),
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
