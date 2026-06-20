import { header } from "../sections/templates.js";
import { renderHtml } from "./render.js";

export default {
  title: "Groov/Navigation/Mega Menu",
};

export const Open = {
  render: () => renderHtml(`<div class="min-h-[420px] bg-white">${header({ megaMenuOpen: true })}</div>`),
};
