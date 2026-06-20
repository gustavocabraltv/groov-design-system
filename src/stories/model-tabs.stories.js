import { modelCard, modelTabsSection } from "../sections/templates.js";
import { assets } from "../sections/data.js";
import { renderHtml } from "./render.js";

export default {
  title: "Groov/Sections/Steps Tabs",
  render: () => renderHtml(modelTabsSection()),
};

export const Desktop = {
  globals: {
    viewport: { value: "desktop" },
  },
};

export const MobileSlider = {
  globals: {
    viewport: { value: "mobile" },
  },
};

export const ModelCardSelected = {
  render: () =>
    renderHtml(
      `<section class="bg-[#17212b] p-8"><div class="max-w-[292px]">${modelCard({ ...assets.modelCards[1], selected: true })}</div></section>`,
      { init: false },
    ),
};
