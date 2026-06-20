import { initGroovSections } from "../behaviors/groov.js";

export function renderHtml(markup, { init = true } = {}) {
  const root = document.createElement("div");
  root.innerHTML = markup;

  if (init) {
    requestAnimationFrame(() => initGroovSections(root));
  }

  return root;
}
