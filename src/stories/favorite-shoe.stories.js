import { favoriteShoeSection } from "../sections/templates.js";
import { renderHtml } from "./render.js";

export default {
  title: "Groov/Sections/Conversion/Favorite Shoe Carousel",
  render: () => renderHtml(favoriteShoeSection()),
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
