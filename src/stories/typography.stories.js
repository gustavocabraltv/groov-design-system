import { renderHtml } from "./render.js";
import { type } from "../styles/typography.js";

const html = String.raw;

const implementedScale = [
  {
    group: "Headings",
    key: "eyebrow",
    label: "Eyebrow",
    classes: type.eyebrow,
    usage: "Section label / overline",
    preview: "Eyebrow text",
    mobileSize: "14px / text-sm",
    desktopSize: "16px / text-base",
    weight: "Medium / 500",
    lineHeight: "100%",
  },
  {
    group: "Headings",
    key: "h1",
    label: "H1 Headline",
    classes: type.h1,
    usage: "Primary hero headline",
    preview: "H1 Headline",
    mobileSize: "36px / text-4xl",
    desktopSize: "72px / text-7xl",
    weight: "Medium / 500",
    lineHeight: "100%",
  },
  {
    group: "Headings",
    key: "h2",
    label: "H2 Headline",
    classes: type.h2,
    usage: "Main section heading",
    preview: "H2 Headline",
    mobileSize: "30px / text-3xl",
    desktopSize: "48px / text-5xl",
    weight: "Medium / 500",
    lineHeight: "125%",
  },
  {
    group: "Headings",
    key: "h3",
    label: "H3 Headline",
    classes: type.h3,
    usage: "Secondary section heading",
    preview: "H3 Headline",
    mobileSize: "24px / text-2xl",
    desktopSize: "36px / text-4xl",
    weight: "Semibold / 600",
    lineHeight: "125%",
  },
  {
    group: "Headings",
    key: "h4",
    label: "H4 Headline",
    classes: type.h4,
    usage: "Card or module heading",
    preview: "H4 Headline",
    mobileSize: "20px / text-xl",
    desktopSize: "24px / text-2xl",
    weight: "Semibold / 600",
    lineHeight: "125%",
  },
  {
    group: "Headings",
    key: "quote",
    label: "Quote",
    classes: type.quote,
    usage: "Large editorial quote",
    preview: "Quote display text",
    mobileSize: "36px / text-4xl",
    desktopSize: "48px / text-5xl",
    weight: "Bold / 700",
    lineHeight: "125%",
  },
  {
    group: "Body",
    key: "lead",
    label: "Lead Body",
    classes: type.lead,
    usage: "Hero / lead paragraph",
    preview: "Lead body text for larger supporting paragraphs.",
    mobileSize: "16px / text-base",
    desktopSize: "20px / text-xl",
    weight: "Regular / 400",
    lineHeight: "137.5%",
  },
  {
    group: "Body",
    key: "body",
    label: "Body",
    classes: type.body,
    usage: "Default paragraph",
    preview: "Body text for standard content and section descriptions.",
    mobileSize: "16px / text-base",
    desktopSize: "18px / text-lg",
    weight: "Regular / 400",
    lineHeight: "162.5%",
  },
  {
    group: "Body",
    key: "bodySmall",
    label: "Body Small",
    classes: type.bodySmall,
    usage: "Secondary copy / support text",
    preview: "Small body text",
    mobileSize: "14px / text-sm",
    desktopSize: "16px / text-base",
    weight: "Regular / 400",
    lineHeight: "150%",
  },
  {
    group: "Body",
    key: "caption",
    label: "Caption",
    classes: type.caption,
    usage: "Helper / metadata / legal",
    preview: "Caption text",
    mobileSize: "12px / text-xs",
    desktopSize: "14px / text-sm",
    weight: "Regular / 400",
    lineHeight: "137.5%",
  },
  {
    group: "UI",
    key: "ui",
    label: "UI Text",
    classes: type.ui,
    usage: "Navigation, tabs, and compact UI labels",
    preview: "UI text",
    mobileSize: "14px / text-sm",
    desktopSize: "14px / text-sm",
    weight: "Medium / 500",
    lineHeight: "100%",
  },
  {
    group: "UI",
    key: "action",
    label: "Action Text",
    classes: type.action,
    usage: "Buttons and primary interactive labels",
    preview: "Button text",
    mobileSize: "14px / text-sm",
    desktopSize: "14px / text-sm",
    weight: "Bold / 700",
    lineHeight: "100%",
  },
];

function viewportClasses(classString, viewport) {
  const classes = classString.trim().split(/\s+/).filter(Boolean);
  const baseClasses = classes.filter((className) => !className.startsWith("md:"));

  if (viewport === "mobile") {
    return baseClasses.join(" ");
  }

  const mdClasses = classes.filter((className) => className.startsWith("md:")).map((className) => className.slice(3));
  return [...baseClasses, ...mdClasses].join(" ");
}

function groupLabel(groupName, previousGroupName) {
  if (groupName === previousGroupName) return "";

  return html`
    <tr>
      <td colspan="2" class="pb-3 pt-10 first:pt-0">
        <p class="text-xs font-bold uppercase tracking-wider text-[#6d7780]">${groupName}</p>
      </td>
    </tr>
  `;
}

function typeRow(item, index, viewport) {
  const previous = implementedScale[index - 1];
  const size = viewport === "mobile" ? item.mobileSize : item.desktopSize;
  const classes = viewportClasses(item.classes, viewport);
  const viewportLabel = viewport === "mobile" ? "Mobile" : "Desktop";

  return html`
    ${groupLabel(item.group, previous?.group)}
    <tr class="border-t border-[#e8eaec] align-middle">
      <td class="w-[260px] py-5 pr-6 text-left align-top">
        <p class="text-xs font-bold leading-tight text-[#22272d]">${item.label}</p>
        <p class="mt-1 text-xs leading-tight text-[#7a828a]">type.${item.key}</p>
        <p class="mt-3 text-xs leading-5 text-[#7a828a]">${item.usage}</p>
        <dl class="mt-4 grid gap-1.5 text-xs leading-tight text-[#22272d]">
          <div class="flex gap-2">
            <dt class="w-14 font-bold text-[#7a828a]">Size</dt>
            <dd>${size}</dd>
          </div>
          <div class="flex gap-2">
            <dt class="w-14 font-bold text-[#7a828a]">Weight</dt>
            <dd>${item.weight}</dd>
          </div>
          <div class="flex gap-2">
            <dt class="w-14 font-bold text-[#7a828a]">Line</dt>
            <dd>${item.lineHeight}</dd>
          </div>
        </dl>
      </td>
      <td class="border-l border-dashed border-[#d8dde2] px-6 py-5">
        <div class="mb-4 flex items-center justify-between gap-4">
          <code class="text-xs leading-5 text-[#7a828a]">${classes}</code>
          <span class="shrink-0 rounded-full bg-[#eef5fc] px-2.5 py-1 text-xs font-bold text-[#24527d]">${viewportLabel}</span>
        </div>
        <p class="${classes} text-[#32363a]">${item.preview}</p>
      </td>
    </tr>
  `;
}

function mobileGroupLabel(groupName, previousGroupName) {
  if (groupName === previousGroupName) return "";

  return html`
    <p class="pb-3 pt-8 text-xs font-bold uppercase tracking-wider text-[#6d7780] first:pt-0">${groupName}</p>
  `;
}

function mobileTypeCard(item, index) {
  const previous = implementedScale[index - 1];
  const classes = viewportClasses(item.classes, "mobile");

  return html`
    ${mobileGroupLabel(item.group, previous?.group)}
    <article class="border-t border-[#e8eaec] py-5">
      <div>
        <p class="text-xs font-bold leading-tight text-[#22272d]">${item.label}</p>
        <p class="mt-1 text-xs leading-tight text-[#7a828a]">type.${item.key}</p>
        <p class="mt-3 text-xs leading-5 text-[#7a828a]">${item.usage}</p>
        <dl class="mt-4 grid gap-1.5 text-xs leading-tight text-[#22272d]">
          <div class="flex gap-2">
            <dt class="w-14 font-bold text-[#7a828a]">Size</dt>
            <dd>${item.mobileSize}</dd>
          </div>
          <div class="flex gap-2">
            <dt class="w-14 font-bold text-[#7a828a]">Weight</dt>
            <dd>${item.weight}</dd>
          </div>
          <div class="flex gap-2">
            <dt class="w-14 font-bold text-[#7a828a]">Line</dt>
            <dd>${item.lineHeight}</dd>
          </div>
        </dl>
      </div>
      <div class="mt-5 border-t border-dashed border-[#d8dde2] pt-5">
        <div class="mb-4 flex items-start justify-between gap-4">
          <code class="min-w-0 break-words text-xs leading-5 text-[#7a828a]">${classes}</code>
          <span class="shrink-0 rounded-full bg-[#eef5fc] px-2.5 py-1 text-xs font-bold text-[#24527d]">Mobile</span>
        </div>
        <p class="${classes} text-[#32363a]">${item.preview}</p>
      </div>
    </article>
  `;
}

function typographyMarkup({ viewport = "desktop" } = {}) {
  const viewportLabel = viewport === "mobile" ? "Mobile" : "Desktop";
  const isMobile = viewport === "mobile";

  return html`
    <div class="min-h-screen bg-white px-6 py-10 text-[#22272d] md:px-16 md:py-16">
      <div class="mx-auto max-w-[1180px]">
        <header>
          <p class="text-xs font-bold uppercase tracking-wider text-[#6d7780]">Groov Foundations</p>
          <h1 class="mt-2 text-2xl font-bold leading-tight text-[#22272d]">Typography system: ${viewportLabel}</h1>
          <p class="mt-4 max-w-[680px] text-sm leading-5 text-[#22272d]/75">
            Semantic text styles currently implemented in the Groov sections. This view keeps the specs and rendered style together for quick scanning.
          </p>
        </header>

        ${
          isMobile
            ? html`
                <div class="mt-8">
                  <div class="flex border-b border-[#e8eaec] pb-4 text-xs font-bold uppercase tracking-wider text-[#22272d]">
                    <span>Token and Style</span>
                  </div>
                  ${implementedScale.map(mobileTypeCard).join("")}
                </div>
              `
            : html`
                <table class="mt-8 w-full table-fixed border-collapse">
                  <thead>
                    <tr class="text-xs font-bold uppercase tracking-wider text-[#22272d]">
                      <th class="w-[260px] pb-4 pr-6 text-left">Token</th>
                      <th class="border-l border-dashed border-[#d8dde2] px-6 pb-4 text-left">Style</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${implementedScale.map((item, index) => typeRow(item, index, viewport)).join("")}
                  </tbody>
                </table>
              `
        }
      </div>
    </div>
  `;
}

export default {
  title: "Groov/Foundations/Typography",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Typography reference for the implemented semantic type tokens.",
      },
    },
  },
  render: () => renderHtml(typographyMarkup({ viewport: "desktop" }), { init: false }),
};

export const Desktop = {
  render: () => renderHtml(typographyMarkup({ viewport: "desktop" }), { init: false }),
  globals: {
    viewport: { value: "desktop" },
  },
};

export const Mobile = {
  render: () => renderHtml(typographyMarkup({ viewport: "mobile" }), { init: false }),
  globals: {
    viewport: { value: "mobile" },
  },
};
