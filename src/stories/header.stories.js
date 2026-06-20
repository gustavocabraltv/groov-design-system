import { header } from "../sections/templates.js";
import { renderHtml } from "./render.js";

export default {
  title: "Groov/Navigation/Header",
};

export const Default = {
  render: () => renderHtml(`<div class="bg-white">${header()}</div>`),
};
