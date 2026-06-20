import { assets } from "../sections/data.js";
import { modelCard } from "../sections/templates.js";
import { renderHtml } from "./render.js";

export default {
  title: "Groov/Components/Product Model Card",
  render: () =>
    renderHtml(
      `<section class="bg-[#17212b] p-8"><div class="max-w-[292px]">${modelCard(assets.modelCards[1])}</div></section>`,
      { init: false },
    ),
};

export const Default = {};

export const Selected = {
  render: () =>
    renderHtml(
      `<section class="bg-[#17212b] p-8"><div class="max-w-[292px]">${modelCard({ ...assets.modelCards[1], selected: true })}</div></section>`,
      { init: false },
    ),
};
