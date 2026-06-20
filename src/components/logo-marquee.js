const html = String.raw;

function logoList(logos, hidden = false) {
  return html`
    <div class="flex min-w-max items-center gap-16 pr-16 md:gap-24 md:pr-24" aria-hidden="${hidden}">
      ${logos
        .map(
          (logo) => html`
            <div class="flex h-16 w-[160px] items-center justify-center" data-logo-item data-logo-name="${logo.name}">
              <img src="${logo.image}" alt="${hidden ? "" : logo.name}" class="${logo.className}" />
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

export function logoMarquee({ logos, ariaLabel = "Trusted partner logos", className = "" }) {
  return html`
    <div class="trusted-marquee mx-auto overflow-hidden ${className}" aria-label="${ariaLabel}">
      <div class="trusted-marquee-track flex items-center">
        ${logoList(logos)}
        ${logoList(logos, true)}
      </div>
    </div>
  `;
}
