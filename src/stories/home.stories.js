import { homePage, homePageV2 } from "../sections/templates.js";
import { renderHtml } from "./render.js";

export default {
  title: "Groov/Home Page",
  render: () => renderHtml(homePage()),
};

export const CurrentPrototype = {};

export const HomeV2 = {
  render: () => renderHtml(homePageV2()),
  globals: {
    viewport: { value: "desktop" },
  },
};
