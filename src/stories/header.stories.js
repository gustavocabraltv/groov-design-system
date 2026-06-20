import { header } from "../sections/templates.js";
import { renderHtml } from "./render.js";

export default {
  title: "Groov/Header",
};

export const Default = {
  render: () => renderHtml(`<div class="bg-white">${header()}</div>`),
};

export const MegaMenuOpen = {
  name: "Mega Menu Open",
  render: () => renderHtml(`<div class="min-h-[420px] bg-white">${header({ megaMenuOpen: true })}</div>`),
};
