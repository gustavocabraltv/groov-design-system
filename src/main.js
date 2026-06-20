import "./styles/groov.css";

import { initGroovSections } from "./behaviors/groov.js";
import { homePage } from "./sections/templates.js";

const app = document.querySelector("#app");

if (app) {
  app.innerHTML = homePage();
  requestAnimationFrame(() => initGroovSections(app));
}
