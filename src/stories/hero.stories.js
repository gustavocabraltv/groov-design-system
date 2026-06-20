import { heroSection } from "../sections/templates.js";
import { renderHtml } from "./render.js";

export default {
  title: "Groov/Sections/Hero/Editorial Cards",
  render: () => renderHtml(heroSection()),
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
