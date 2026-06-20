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
    size: "16px / text-base",
    weight: "Medium / 500",
    lineHeight: "100%",
    surface: "light",
  },
  {
    group: "Headings",
    key: "h1",
    label: "H1 Headline",
    classes: type.h1,
    usage: "Primary hero headline",
    preview: "H1 Headline",
    size: "72px / text-7xl",
    weight: "Black / 900",
    lineHeight: "100%",
    surface: "light",
  },
  {
    group: "Headings",
    key: "h2",
    label: "H2 Headline",
    classes: type.h2,
    usage: "Main section heading",
    preview: "H2 Headline",
    size: "48px / text-5xl",
    weight: "Bold / 700",
    lineHeight: "125%",
    surface: "light",
  },
  {
    group: "Headings",
    key: "h3",
    label: "H3 Headline",
    classes: type.h3,
    usage: "Secondary section heading",
    preview: "H3 Headline",
    size: "36px / text-4xl",
    weight: "Bold / 700",
    lineHeight: "125%",
    surface: "light",
  },
  {
    group: "Headings",
    key: "h4",
    label: "H4 Headline",
    classes: type.h4,
    usage: "Card or module heading",
    preview: "H4 Headline",
    size: "24px / text-2xl",
    weight: "Bold / 700",
    lineHeight: "125%",
    surface: "light",
  },
  {
    group: "Headings",
    key: "quote",
    label: "Quote",
    classes: type.quote,
    usage: "Large editorial quote",
    preview: "Quote display text",
    size: "48px / text-5xl",
    weight: "Bold / 700",
    lineHeight: "125%",
    surface: "light",
  },
  {
    group: "Body",
    key: "lead",
    label: "Lead Body",
    classes: type.lead,
    usage: "Hero / lead paragraph",
    preview: "Lead body text for larger supporting paragraphs.",
    size: "20px / text-xl",
    weight: "Medium / 500",
    lineHeight: "137.5%",
    surface: "light",
  },
  {
    group: "Body",
    key: "body",
    label: "Body",
    classes: type.body,
    usage: "Default paragraph",
    preview: "Body text for standard content and section descriptions.",
    size: "18px / text-lg",
    weight: "Regular / 400",
    lineHeight: "162.5%",
    surface: "light",
  },
  {
    group: "Body",
    key: "bodySmall",
    label: "Body Small",
    classes: type.bodySmall,
    usage: "Secondary copy / support text",
    preview: "Small body text",
    size: "16px / text-base",
    weight: "Regular / 400",
    lineHeight: "150%",
    surface: "light",
  },
  {
    group: "Body",
    key: "caption",
    label: "Caption",
    classes: type.caption,
    usage: "Helper / metadata / legal",
    preview: "Caption text",
    size: "14px / text-sm",
    weight: "Regular / 400",
    lineHeight: "137.5%",
    surface: "light",
  },
  {
    group: "UI",
    key: "ui",
    label: "UI Text",
    classes: type.ui,
    usage: "Navigation, tabs, and compact UI labels",
    preview: "UI text",
    size: "14px / text-sm",
    weight: "Medium / 500",
    lineHeight: "100%",
    surface: "light",
  },
  {
    group: "UI",
    key: "action",
    label: "Action Text",
    classes: type.action,
    usage: "Buttons and primary interactive labels",
    preview: "Button text",
    size: "14px / text-sm",
    weight: "Bold / 700",
    lineHeight: "100%",
    surface: "light",
  },
];

function desktopClasses(classString) {
  const classes = classString.trim().split(/\s+/).filter(Boolean);
  const baseClasses = classes.filter((className) => !className.startsWith("md:"));
  const mdClasses = classes.filter((className) => className.startsWith("md:")).map((className) => className.slice(3));

  return [...baseClasses, ...mdClasses].join(" ");
}

function previewCard(item) {
  const frameClass = item.surface === "dark" ? "bg-[#17212b] text-white" : "bg-white text-[#111] border border-black/8";
  const previewTone = item.surface === "dark" ? "text-white/82" : "text-black/78";

  return html`
    <div class="rounded-[22px] ${frameClass} px-5 py-5 shadow-[0_14px_26px_rgba(0,0,0,0.06)]">
      <div class="flex items-center justify-between gap-3">
        <p class="text-xs font-bold uppercase tracking-widest ${item.surface === "dark" ? "text-white/45" : "text-black/45"}">Desktop Preview</p>
        <span class="rounded-full ${item.surface === "dark" ? "bg-white/10 text-white/75" : "bg-[#eef5fc] text-[#24527d]"} px-2.5 py-1 text-xs font-bold">
          md
        </span>
      </div>
      <div class="mt-5 flex min-h-[172px] items-center rounded-[16px] ${item.surface === "dark" ? "bg-white/5" : "bg-[#f8fafc]"} px-6 py-6">
        <p class="${desktopClasses(item.classes)} ${previewTone}">${item.preview}</p>
      </div>
    </div>
  `;
}

function specPill(label, value) {
  return html`
    <div class="rounded-[14px] border border-black/6 bg-white px-3 py-2 shadow-sm">
      <p class="text-xs font-bold uppercase tracking-wider text-black/38">${label}</p>
      <p class="mt-1 text-xs font-bold leading-tight text-[#22272d]">${value}</p>
    </div>
  `;
}

function specStack(item) {
  return html`
    <div class="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
      ${specPill("Size", item.size)}
      ${specPill("Weight", item.weight)}
      ${specPill("Line", item.lineHeight)}
    </div>
  `;
}

function tokenRow(item) {
  return html`
    <div class="rounded-[24px] border border-black/8 bg-white px-5 py-5 shadow-[0_14px_30px_rgba(0,0,0,0.04)] md:px-6 md:py-6">
      <div class="grid gap-5 lg:grid-cols-[280px_1fr]">
        <div>
          <div class="flex flex-col gap-2">
            <span class="w-fit rounded-full bg-[#17212b] px-3 py-1.5 text-xs font-bold text-white">${item.label}</span>
            <code class="w-fit rounded bg-[#eef5fc] px-2.5 py-1 text-xs font-medium text-[#24527d]">type.${item.key}</code>
          </div>
          <p class="mt-3 text-sm leading-6 text-black/58">${item.usage}</p>
          ${specStack(item)}
        </div>

        <div class="rounded-[22px] border border-black/6 bg-[#fbfcfd] p-4 md:p-5">
          <div class="mb-3 flex items-center justify-between gap-3">
            <p class="text-xs font-bold uppercase tracking-widest text-black/42">Desktop Classes</p>
            <span class="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-black/48 shadow-sm">md</span>
          </div>
          <code class="block rounded-[14px] bg-white px-3 py-2 text-xs leading-5 text-black/70 shadow-sm">${desktopClasses(item.classes)}</code>
          <div class="mt-4">${previewCard(item)}</div>
        </div>
      </div>
    </div>
  `;
}

function groupSection(groupName, items) {
  return html`
    <section class="rounded-[32px] border border-black/8 bg-white px-6 py-7 shadow-[0_18px_40px_rgba(0,0,0,0.05)] md:px-8 md:py-8">
      <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-sm font-bold uppercase tracking-widest text-[#5d6d7d]">Implemented Tokens</p>
          <h2 class="mt-2 ${type.h3} text-[#111]">${groupName}</h2>
        </div>
        <p class="max-w-[420px] text-sm leading-6 text-black/58">
          Desktop view only. Each token shows size, weight, line-height, class string, and one clear preview.
        </p>
      </div>
      <div class="mt-6 grid gap-4">${items.map(tokenRow).join("")}</div>
    </section>
  `;
}

function typographyReferenceMarkup() {
  const groups = Array.from(new Set(implementedScale.map((item) => item.group)));

  return html`
    <div class="min-h-screen bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_38%,#f9fafb_100%)] px-5 py-10 text-black md:px-8 md:py-12">
      <div class="mx-auto flex w-full max-w-[1180px] flex-col gap-8">
        <section class="overflow-hidden rounded-[32px] bg-[#17212b] px-6 py-7 text-white shadow-[0_24px_60px_rgba(23,33,43,0.22)] md:px-8 md:py-9">
          <p class="${type.eyebrow} text-white/65">Foundations</p>
          <h1 class="mt-3 ${type.h1} text-white">Desktop Typography Scale</h1>
          <p class="mt-4 max-w-[840px] ${type.body} text-white/78">
            A simpler desktop-only view of the typography tokens currently implemented in the project.
          </p>
        </section>

        ${groups.map((groupName) => groupSection(groupName, implementedScale.filter((item) => item.group === groupName))).join("")}

        <section class="rounded-[32px] border border-[#cfe1f2] bg-[#eef5fc] px-6 py-7 text-[#193b5c] shadow-[0_18px_40px_rgba(63,107,155,0.08)] md:px-8 md:py-8">
          <p class="${type.eyebrow} text-[#4873a0]">Rule of Thumb</p>
          <h2 class="mt-2 ${type.h2} text-[#193b5c]">What Comes Next</h2>
          <p class="mt-4 max-w-[900px] ${type.body} text-[#244a70]">
            From here, the goal is simple: every new section should reuse one of these tokens first. If something needs a one-off type size, we should decide
            whether it deserves a new semantic token before adding arbitrary typography back into the codebase.
          </p>
        </section>
      </div>
    </div>
  `;
}

function tableRow(item) {
  const isDark = item.surface === "dark";
  const previewColor = isDark ? "text-white" : "text-[#32363a]";
  const previewBg = isDark ? "bg-[#17212b]" : "bg-white";

  return html`
    <tr class="border-t border-[#e8eaec] align-middle">
      <td class="w-[240px] py-5 pr-6 text-left align-top">
        <p class="text-xs font-bold leading-tight text-[#22272d]">${item.label}</p>
        <p class="mt-1 text-xs leading-tight text-[#7a828a]">type.${item.key}</p>
        <p class="mt-3 text-xs leading-5 text-[#7a828a]">${item.usage}</p>
        <dl class="mt-4 grid gap-1.5 text-xs leading-tight text-[#22272d]">
          <div class="flex gap-2">
            <dt class="w-12 font-bold text-[#7a828a]">Size</dt>
            <dd>${item.size}</dd>
          </div>
          <div class="flex gap-2">
            <dt class="w-12 font-bold text-[#7a828a]">Weight</dt>
            <dd>${item.weight}</dd>
          </div>
          <div class="flex gap-2">
            <dt class="w-12 font-bold text-[#7a828a]">Line</dt>
            <dd>${item.lineHeight}</dd>
          </div>
        </dl>
      </td>
      <td class="border-l border-dashed border-[#d8dde2] px-6 py-5">
        <div class="${previewBg} ${isDark ? "rounded-[8px] px-5 py-4" : ""}">
          <p class="${desktopClasses(item.classes)} ${previewColor}">${item.preview}</p>
        </div>
      </td>
    </tr>
  `;
}

function typographyTableMarkup() {
  return html`
    <div class="min-h-screen bg-white px-8 py-12 text-[#22272d] md:px-16 md:py-16">
      <div class="mx-auto max-w-[1180px]">
        <header>
          <h1 class="text-2xl font-bold leading-tight text-[#22272d]">Typography system:</h1>
          <p class="mt-4 text-sm leading-5 text-[#22272d]/75">Design system text styles currently implemented in the Groov Storybook sections.</p>
        </header>

        <table class="mt-8 w-full table-fixed border-collapse">
          <thead>
            <tr class="text-xs font-bold uppercase tracking-wider text-[#22272d]">
              <th class="w-[240px] pb-4 pr-6 text-left">Options</th>
              <th class="border-l border-dashed border-[#d8dde2] px-6 pb-4 text-left">Style</th>
            </tr>
          </thead>
          <tbody>
            ${implementedScale.map(tableRow).join("")}
          </tbody>
        </table>
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
        component:
          "Desktop typography reference for the implemented semantic type tokens.",
      },
    },
  },
  render: () => renderHtml(typographyReferenceMarkup(), { init: false }),
};

export const Desktop = {
  name: "Desktop",
};

export const Table = {
  name: "Table",
  render: () => renderHtml(typographyTableMarkup(), { init: false }),
};
