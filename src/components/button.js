import { type } from "../styles/typography.js";

const html = String.raw;

const baseClasses =
  `inline-flex h-10 items-center justify-center rounded-full px-6 ${type.action} transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--groov-blue)]`;

const variantClasses = {
  primary: "bg-[var(--groov-blue)] text-white shadow-[0_14px_30px_rgba(54,148,243,0.25)] hover:bg-[#2488e8]",
  secondary: "bg-[#303e4d] text-white shadow-[0_12px_24px_rgba(16,26,38,0.18)] hover:bg-[#3a4a59]",
  tertiary: "border border-black/10 bg-white text-black shadow-[0_10px_24px_rgba(10,10,10,0.06)] hover:border-black/20 hover:bg-[#f7f7f7]",
  black: "bg-black text-white shadow-none hover:bg-black/80",
  white: "border border-transparent bg-white text-black shadow-none hover:bg-white/85",
  text: "bg-transparent text-black hover:text-black/55",
  textUnderline: "bg-transparent text-black underline underline-offset-4 hover:text-black/55",
};

const sizeClasses = {
  sm: "",
  md: "",
  lg: "",
};

function attributesToString(attributes = {}) {
  return Object.entries(attributes)
    .filter(([, value]) => value !== false && value !== null && value !== undefined)
    .map(([key, value]) => (value === true ? key : `${key}="${value}"`))
    .join(" ");
}

export function button({
  label,
  href = "#",
  type = "link",
  variant = "primary",
  size = "sm",
  className = "",
  icon,
  iconAlt = "",
  attributes = {},
}) {
  const classes = [baseClasses, variantClasses[variant], sizeClasses[size], className].filter(Boolean).join(" ");
  const iconMarkup = icon ? html`<img src="${icon}" alt="${iconAlt}" class="mr-2 h-5 w-5" />` : "";
  const extraAttributes = attributesToString(attributes);

  if (type === "button") {
    return html`
      <button type="button" class="${classes}" ${extraAttributes}>
        ${iconMarkup}${label}
      </button>
    `;
  }

  return html`
    <a href="${href}" class="${classes}" ${extraAttributes}>
      ${iconMarkup}${label}
    </a>
  `;
}
