import { heroModelCarouselSection } from "../sections/templates.js";
import { renderHtml } from "./render.js";

export default {
  title: "Groov/Sections/Hero/Model Carousel",
  render: () => renderHtml(heroModelCarouselSection()),
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

export const V2StagedLoading = {
  name: "V2 Staged Loading",
  render: () => renderHtml(heroModelCarouselSection({ stagedLoading: true })),
  globals: {
    viewport: { value: "desktop" },
  },
};

export const V2StagedLoadingMobile = {
  name: "V2 Staged Loading Mobile",
  render: () => renderHtml(heroModelCarouselSection({ stagedLoading: true })),
  globals: {
    viewport: { value: "mobile" },
  },
};
