import { logoMarquee } from "../components/logo-marquee.js";
import { assets } from "../sections/data.js";
import { renderHtml } from "./render.js";

export default {
  title: "Groov/Components/Logo Marquee",
  render: () =>
    renderHtml(
      `<div class="bg-white py-16">
        <div class="page-container">${logoMarquee({ logos: assets.trustedLogos, className: "max-w-[1072px]" })}</div>
      </div>`,
      { init: false },
    ),
};

export const TrustedLogos = {};
