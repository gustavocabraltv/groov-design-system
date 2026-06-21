import { assets, scrollModels } from "./data.js";
import { button } from "../components/button.js";
import { logoMarquee } from "../components/logo-marquee.js";
import { type } from "../styles/typography.js";

const html = String.raw;

function renderScrollModelMedia(model, index, { hero = false, stagedLoading = false } = {}) {
  const baseAttributes = [
    `class="model-media ${index === 0 ? "is-active" : ""} absolute inset-0 h-full w-full object-cover"`,
    hero ? `data-hero-model-media` : `data-model-media`,
    `data-model-index="${index}"`,
    `data-model-name="${model.name}"`,
  ];

  if (hero) {
    baseAttributes.push(`data-model-duration="${model.duration || 5000}"`);
  }

  if (model.video) {
    return html`
      <video
        ${baseAttributes.join(" ")}
        src="${model.video}"
        ${model.image ? `poster="${model.image}"` : ""}
        muted
        loop
        playsinline
        preload="${stagedLoading && index > 0 ? "metadata" : "auto"}"
        ${index === 0 ? "" : "aria-hidden=\"true\""}
      ></video>
    `;
  }

  return html`
    <img
      src="${model.image}"
      alt=""
      ${baseAttributes.join(" ")}
    />
  `;
}

function megaMenuProductCard(product, index) {
  return html`
    <article class="mega-menu-product flex w-[280px] shrink-0 flex-col items-center justify-center gap-2" data-mega-menu-product data-product-index="${index}" data-product-name="${product.name}">
      <a href="#" class="group block w-full text-center" aria-label="Shop ${product.name}">
        <div class="relative h-[223px] w-full overflow-hidden">
          <img src="${product.image}" alt="${product.name}" class="mx-auto h-full w-full object-contain transition duration-500 group-hover:scale-[1.025]" />
        </div>
        <div class="flex w-full flex-col items-center justify-center gap-3">
          <h3 class="w-full text-center ${type.h4} font-bold leading-none text-black">${product.name}</h3>
          <div class="flex items-center gap-3">
            <span class="${type.caption} text-[#909090]">${product.price}</span>
            <span class="inline-flex h-[21px] items-center gap-[7px] rounded-full border border-[#e2dede] bg-white py-1 pl-1.5 pr-3">
              <img src="${product.tagIcon}" alt="" class="h-[11px] w-[11px] object-contain" />
              <span class="${type.caption} text-[#7e8590]">${product.tag}</span>
            </span>
          </div>
        </div>
      </a>
    </article>
  `;
}

export function megaMenu({ open = false } = {}) {
  return html`
    <div id="groov-mega-menu" class="mega-menu absolute left-0 top-[58px] z-40 w-full bg-white ${open ? "" : "hidden"}" data-mega-menu>
      <div class="mx-auto flex max-w-[1218px] flex-col items-end gap-12 px-5">
        <div class="flex items-center gap-8">
          ${assets.navigationProducts.map(megaMenuProductCard).join("")}
        </div>
        <div class="w-full border-t border-[#e5e6e7] py-6">
          <div class="flex items-center justify-center gap-[61px] ${type.action} text-black">
            <a href="#" class="inline-flex items-center gap-[5px] transition hover:text-black/55">Explore all Models <span aria-hidden="true">&#8599;</span></a>
            <a href="#" class="inline-flex items-center gap-[5px] transition hover:text-black/55">Take the Foot Fit Quiz <span aria-hidden="true">&#8599;</span></a>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function header({ megaMenuOpen = false, transparent = false, tone = "default" } = {}) {
  const isOnDark = tone === "light";

  return html`
    <div class="groov-header relative z-50 ${transparent ? "groov-header-transparent bg-transparent" : "bg-white"} ${isOnDark ? "groov-header-on-dark" : ""} ${megaMenuOpen ? "is-mega-menu-open" : ""}" data-mega-menu-header>
      <header class="page-container relative z-50 flex h-[58px] items-center justify-between gap-6">
        <a href="#" aria-label="Groov home" class="flex items-center text-black">
          <img src="${assets.logo}" alt="Groov logo" class="groov-header-logo h-[33px] w-[108px] object-contain" />
        </a>

        <nav aria-label="Primary navigation" class="hidden items-center gap-[26px] ${type.ui} text-[#707070] md:flex">
          <a href="#" class="mega-menu-nav-item transition hover:text-black" data-label="Shop"><span>Shop</span></a>
          <button type="button" class="mega-menu-trigger mega-menu-nav-item transition hover:text-black" data-mega-menu-trigger data-label="Insoles" aria-expanded="${megaMenuOpen ? "true" : "false"}" aria-controls="groov-mega-menu"><span>Insoles</span></button>
          <a href="#" class="mega-menu-nav-item transition hover:text-black" data-label="Gift Groov"><span>Gift Groov</span></a>
          <a href="#" class="mega-menu-nav-item transition hover:text-black" data-label="Blog"><span>Blog</span></a>
          <a href="#" class="mega-menu-nav-item transition hover:text-black" data-label="Contact Us"><span>Contact Us</span></a>
        </nav>

        <div class="flex items-center gap-3">
          <div class="groov-header-compat hidden items-center gap-[11px] ${type.ui} text-black/90 sm:flex">
            <span>Compatible with</span>
            <img src="${assets.apple}" alt="Apple" class="groov-header-apple h-[18px] w-[15px]" />
          </div>
          ${button({ label: "Get the app" })}
        </div>
      </header>
      <div class="mega-menu-overlay fixed inset-x-0 bottom-0 z-30 bg-black/45 ${megaMenuOpen ? "" : "hidden"}" data-mega-menu-overlay></div>
      ${megaMenu({ open: megaMenuOpen })}
    </div>
  `;
}

export function heroSection() {
  return html`
    <section class="relative bg-white pb-16 pt-4 md:pb-24">
      ${header()}
      <div class="page-container relative z-10 flex flex-col items-center pt-16 text-center md:pt-20">
        <p class="${type.eyebrow} text-[#1b1b1d]">Custom Insoles, Powered By AI</p>
        <h1 class="mt-4 max-w-[1010px] ${type.h1} text-[#111]">
          End pain. Maximize comfort.<br />Optimize performance.
        </h1>
        <p class="mt-6 max-w-[760px] ${type.lead} text-[#737373]">
          Groov custom insoles bridge the gap between off-the-shelf shoes and your unique feet using AI-powered foot scanning technology &mdash; all from your
          <span class="relative top-1 inline-flex items-center gap-1.5 whitespace-nowrap font-bold text-black">
            <img src="${assets.apple}" alt="" class="h-5 w-5" />
            <span class="relative top-0.5">iPhone</span>
          </span>
          in just minutes.
        </p>
        ${button({
          label: "Meet Groov",
          href: "#model-scroll",
          size: "lg",
          className: "mt-8 shadow-[0_18px_36px_rgba(54,148,243,0.28)] hover:-translate-y-0.5",
        })}
        <div class="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-black">
          <div class="flex items-center gap-3 text-[#737373]">
            <img src="${assets.stars}" alt="5 star rating" class="h-[17px] w-[93px]" />
            <span>799 reviews</span>
          </div>
          <span class="hidden h-8 w-px bg-black/12 sm:block"></span>
          <div class="flex items-center gap-2"><img src="${assets.check}" alt="" class="h-[18px] w-[18px]" /><span>Pain Relief</span></div>
          <div class="flex items-center gap-2"><img src="${assets.check}" alt="" class="h-[18px] w-[18px]" /><span>All-Day Comfort</span></div>
        </div>
      </div>

      <div class="page-container mt-14">
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-[30px]">
          ${assets.heroCards
            .map(
              (image, index) => html`
                <figure class="hero-card aspect-[386/518] overflow-hidden rounded-[24px] bg-[#eeeeee]">
                  <img src="${image}" alt="Groov editorial card ${index + 1}" class="h-full w-full object-cover" />
                </figure>
              `,
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

export function heroModelCarouselSection({ stagedLoading = false } = {}) {
  return html`
    <section class="hero-model-carousel-section relative h-screen min-h-[720px] overflow-hidden bg-[#111] text-white" data-hero-model-carousel-section ${stagedLoading ? `data-video-loading-strategy="staged"` : ""}>
      <div class="absolute inset-0" aria-hidden="true" data-hero-model-media-layer>
        ${scrollModels
          .map((model, index) => renderScrollModelMedia(model, index, { hero: true, stagedLoading }))
          .join("")}
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0.38)_42%,rgba(0,0,0,0.46)_100%)]"></div>
        <div class="absolute inset-x-0 top-0 h-[34vh] bg-gradient-to-b from-white/24 via-white/8 to-transparent"></div>
        <div class="absolute inset-x-0 bottom-0 h-[54vh] bg-gradient-to-t from-black/72 via-black/24 to-transparent"></div>
      </div>

      <div class="relative z-30">${header({ transparent: true, tone: "light" })}</div>

      <div class="hero-model-carousel-copy page-container pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center text-center">
        <p class="${type.eyebrow} text-white">Custom Insoles, Powered By AI</p>
        <h1 class="mt-4 max-w-[300px] ${type.h1} text-white md:max-w-[1010px]">
          End pain. Maximize comfort.<br />Optimize performance.
        </h1>
        <p class="mt-5 max-w-[760px] ${type.lead} text-white/88">
          Groov custom insoles bridge the gap between off-the-shelf shoes and your unique feet using AI-powered foot scanning technology &mdash; all from your
          <span class="relative top-1 inline-flex items-center gap-1.5 whitespace-nowrap font-bold text-white">
            <img src="${assets.apple}" alt="" class="h-5 w-5 invert" />
            <span class="relative top-0.5">iPhone</span>
          </span>
          in just minutes.
        </p>
        ${button({
          label: "Meet Groov",
          href: "#model-scroll",
          size: "lg",
          className: "pointer-events-auto mt-8 shadow-[0_18px_36px_rgba(54,148,243,0.28)] hover:-translate-y-0.5",
        })}
      </div>

      <button type="button" class="absolute left-4 top-[62%] z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full transition hover:scale-105 md:left-16 md:top-1/2 md:h-14 md:w-14" aria-label="Previous model" data-hero-model-prev>
        <img src="${assets.arrowLeft}" alt="" class="h-full w-full" />
      </button>
      <button type="button" class="absolute right-4 top-[62%] z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full transition hover:scale-105 md:right-16 md:top-1/2 md:h-14 md:w-14" aria-label="Next model" data-hero-model-next>
        <img src="${assets.arrowRight}" alt="" class="h-full w-full" />
      </button>

      <div class="page-container absolute inset-x-0 bottom-8 z-20 md:bottom-10">
        <nav class="grid grid-cols-4 gap-x-3 md:gap-x-8" aria-label="Groov hero model navigation">
          ${scrollModels
            .map(
              (model, index) => html`
                <button type="button" class="relative whitespace-nowrap pb-4 text-left ${type.action} ${index === 0 ? "text-white" : "text-white/60"} transition-opacity md:pb-5" data-model-item data-model-index="${index}" data-model-name="${model.name}" data-model-duration="${model.duration || 5000}" style="--progress: 0" aria-pressed="${index === 0 ? "true" : "false"}">
                  ${model.name}
                </button>
              `,
            )
            .join("")}
        </nav>
      </div>
    </section>
  `;
}

export function heroCloudsSection() {
  return html`
    <section class="relative h-[944px] overflow-hidden bg-[#d8edfb] text-black">
      <img src="${assets.heroClouds}" alt="" class="absolute inset-0 h-full w-full object-cover" />
      <div class="absolute inset-0 bg-white/5"></div>
      <img src="${assets.heroCloudsInsole}" alt="Groov insoles" class="pointer-events-none absolute bottom-[85px] left-1/2 z-[1] h-[472px] w-[579px] max-w-[88vw] -translate-x-1/2 select-none object-contain" />
      <div class="relative z-10">
        ${header({ transparent: true })}
        <div class="page-container flex flex-col items-center pt-14 text-center md:pt-16">
          <p class="${type.eyebrow} text-[#1b1b1d]">Custom Insoles, Powered By AI</p>
          <h1 class="mt-4 max-w-[900px] ${type.h1} text-[#050505]">
            End pain. Maximize comfort.<br />Optimize performance.
          </h1>
          <p class="mt-5 max-w-[820px] ${type.lead} text-black">
            Groov custom insoles bridge the gap between off-the-shelf shoes and your unique feet using AI-powered foot scanning technology &mdash; all from your
            <span class="inline-flex items-center gap-1.5 whitespace-nowrap font-bold">
              <img src="${assets.apple}" alt="" class="h-5 w-5" />
              <span>iPhone</span>
            </span>
            in just minutes.
          </p>
          ${button({
            label: "Meet Groov",
            href: "#model-scroll",
            size: "lg",
            className: "mt-8 shadow-[0_18px_36px_rgba(54,148,243,0.28)] hover:-translate-y-0.5",
          })}
        </div>
      </div>
    </section>
  `;
}

export function modelScrollSection() {
  return html`
    <section id="model-scroll" class="model-scroll-section relative" data-model-scroll-section>
      <div class="sticky top-0 h-screen overflow-hidden bg-[#111]">
        <div class="absolute inset-0 h-screen w-screen" aria-hidden="true" data-model-media-layer>
          ${scrollModels
            .map((model, index) => renderScrollModelMedia(model, index))
            .join("")}
          <div class="absolute inset-0 bg-black/25"></div>
          <div class="absolute inset-x-0 bottom-0 h-[46vh] bg-gradient-to-t from-black/90 via-black/48 to-transparent"></div>
        </div>
        <div class="page-container relative z-10 flex h-full flex-col justify-end pb-10 text-white md:pb-12">
          <div class="model-copy max-w-[680px]" data-model-copy>
            <h2 class="${type.h2} text-white" data-model-title>${scrollModels[0].title}</h2>
            <p class="mt-3 ${type.lead} text-white/92" data-model-subtitle>${scrollModels[0].subtitle}</p>
          </div>
          <nav class="mt-14 grid grid-cols-4 gap-x-4 md:mt-20 md:gap-x-8" aria-label="Groov model navigation">
            ${scrollModels
              .map(
                (model, index) => html`
                  <button type="button" class="relative pb-4 text-left ${type.action} ${index === 0 ? "text-white" : "text-white/50"} transition-opacity md:pb-5" data-model-item data-model-index="${index}" data-model-name="${model.name}" style="--progress: 0">
                    ${model.name}
                  </button>
                `,
              )
              .join("")}
          </nav>
        </div>
      </div>
    </section>
  `;
}

export function testimonialRevealSection() {
  return html`
    <section class="bg-white py-24 md:py-[132px]" data-scroll-text-section>
      <div class="page-container">
        <div class="flex flex-col items-start gap-7 md:flex-row md:gap-12">
          <img src="${assets.quotation}" alt="" class="mt-2 h-auto w-12 shrink-0 md:w-[60px]" />
          <div class="max-w-[1112px]">
            <p class="${type.quote} text-[#b2b2b2]" data-scroll-text-reveal data-reveal-text="Groovs turn my least favorite shoe into my favorite shoe... and my favorite shoe into my favorite favorite shoe!"></p>
            <div class="mt-12 flex items-center gap-4 md:mt-11" data-author-block>
              <img src="${assets.nfl}" alt="NFL" class="h-14 w-auto shrink-0" />
              <div class="leading-tight">
                <p class="${type.lead} text-black">Von Miller</p>
                <p class="mt-1 ${type.bodySmall} text-[#4e626d]">Super Bowl MVP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function trustedMarqueeSection() {
  return html`
    <section class="bg-white pb-20 md:pb-24">
      <div class="page-container">
        <div class="flex flex-col items-center text-center">
          <img src="${assets.stars}" alt="5 star rating" class="h-[17px] w-[93px]" />
          <p class="mt-3 ${type.lead} text-[#16395b]">Trusted by leaders in performance &amp; health</p>
        </div>
        ${logoMarquee({ logos: assets.trustedLogos, className: "mt-9 max-w-[1072px]" })}
      </div>
    </section>
  `;
}

function videoTestimonialCard(testimonial) {
  return html`
    <article class="group relative aspect-[592/669] overflow-hidden rounded-[18px] bg-[#f4f4f6]" data-video-testimonial data-testimonial-name="${testimonial.name}">
      <img src="${testimonial.image}" alt="${testimonial.name}" class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" />
      <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_36%,rgba(0,0,0,0.44)_68%,rgba(0,0,0,0.76)_100%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_84%,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.34)_34%,rgba(0,0,0,0)_62%)]"></div>
      <div class="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-5 p-8 text-white md:p-10">
        <div class="max-w-[360px]">
          <p class="${type.lead} text-white/92">
            ${testimonial.quote.includes("favorite favorite")
              ? `&ldquo;Groov turned my least favorite shoes into my favorite shoes... and my favorite shoes into my <strong class="font-black text-white">favorite favorite shoes.</strong>&rdquo;`
              : `Scan your feet with your iPhone for <strong class="font-black text-white">freedom from foot pain</strong>`}
          </p>
          <div class="mt-8 flex items-center gap-3">
            ${testimonial.badge ? `<img src="${testimonial.badge}" alt="" class="h-[42px] w-auto shrink-0" />` : ""}
            <div class="min-w-0">
              <p class="flex items-center gap-2 ${type.bodySmall} font-medium text-white">
                <span>${testimonial.handle}</span>
                <img src="${assets.verified}" alt="Verified" class="h-[15px] w-[15px]" />
              </p>
              <p class="mt-2 ${type.caption} text-white/48">${testimonial.meta}</p>
            </div>
          </div>
        </div>
        <button type="button" class="flex h-[66px] w-[66px] shrink-0 items-center justify-center rounded-full border border-white bg-black/10 transition hover:scale-105 hover:bg-white/10" aria-label="Play ${testimonial.name} video">
          <img src="${assets.playVideo}" alt="" class="h-full w-full" />
        </button>
      </div>
    </article>
  `;
}

function socialProofMeta(item) {
  return html`
    <div class="flex flex-col gap-2">
      <div class="flex items-end gap-[7px]">
        <p class="${type.bodySmall} font-medium text-white">${item.name}</p>
        <img src="${assets.verified}" alt="Verified" class="h-4 w-4 shrink-0" />
      </div>
      ${item.role ? `<p class="${type.caption} text-[#858585]">${item.role}</p>` : ""}
      ${item.meta ? `<p class="${type.caption} text-white/48">${item.meta}</p>` : ""}
    </div>
  `;
}

function socialProofMediaCard(item, index) {
  return html`
    <article class="social-proof-card social-proof-card-portrait group relative h-[407px] w-[282px] shrink-0 overflow-hidden rounded-[16px] bg-[#f1f1f1]" data-social-proof-card data-social-proof-type="${item.type}" data-card-index="${index}">
      <img src="${item.image}" alt="${item.alt}" class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]" />
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/35"></div>
      <div class="absolute inset-x-0 bottom-0 h-[219px] bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      ${item.type === "video"
        ? `
            <span class="pointer-events-none absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <img src="${assets.socialProofPlay}" alt="" class="h-14 w-14" />
            </span>
          `
        : ""}
      <div class="absolute inset-x-4 bottom-[21px] z-20 flex flex-col ${item.quote ? "gap-8" : "gap-0"}">
        ${item.quote ? `<p class="max-w-[239px] ${type.bodySmall} font-medium text-white">${item.quote}</p>` : ""}
        ${socialProofMeta(item)}
      </div>
    </article>
  `;
}

function socialProofPressCard(item, index) {
  return html`
    <article class="social-proof-card social-proof-card-press flex h-[407px] w-[282px] shrink-0 flex-col gap-[30px]" data-social-proof-card data-social-proof-type="${item.type}" data-card-index="${index}">
      <div class="relative h-[188px] overflow-hidden rounded-[16px] bg-[#010101]">
        <img src="${item.image}" alt="${item.alt}" class="h-full w-full object-cover object-top" />
      </div>
      <div class="flex h-[189px] items-center justify-center rounded-[16px] bg-[#f5f5f5] px-6 text-center">
        <div class="flex max-w-[241px] flex-col items-center gap-6">
          <p class="text-center ${type.bodySmall} text-[#7b7b7b]">
            <span>${item.quoteBefore}</span>
            <span class="font-bold text-[#2f2f2f]">${item.quoteEmphasis}</span>
            <span>${item.quoteAfter}</span>
          </p>
          <img src="${assets.socialProofFastCompany}" alt="Fast Company" class="h-[13px] w-[92px]" />
        </div>
      </div>
    </article>
  `;
}

function socialProofCard(item, index) {
  if (item.type === "press") {
    return socialProofPressCard(item, index);
  }

  return socialProofMediaCard(item, index);
}

export function socialProofSection({ variant = "carousel" } = {}) {
  const isMarquee = variant === "marquee";

  return html`
    <section class="bg-white py-16 md:py-20" data-social-proof-section data-social-proof-variant="${variant}">
      <div class="page-container">
        <div class="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div class="max-w-[720px]">
            <h2 class="${type.h2} text-black">
              Helping athletes, doctors, and
              <span class="font-playfair text-[#3694f3] italic"> everyday</span>
              movers
            </h2>
          </div>
          ${isMarquee
            ? ""
            : html`
                <div class="hidden items-center gap-3 md:flex" aria-label="Social proof carousel controls">
                  <button type="button" class="social-proof-arrow social-proof-arrow-prev" data-social-proof-prev aria-label="Previous testimonial">
                    <img src="${assets.socialProofArrows.left}" alt="" class="h-[51px] w-[53px]" />
                  </button>
                  <button type="button" class="social-proof-arrow social-proof-arrow-next" data-social-proof-next aria-label="Next testimonial">
                    <img src="${assets.socialProofArrows.right}" alt="" class="h-[51px] w-[53px]" />
                  </button>
                </div>
              `}
        </div>
      </div>

      <div class="page-container mt-10">
        ${
          isMarquee
            ? html`
                <div class="social-proof-marquee overflow-hidden" aria-label="Social proof marquee">
                  <div class="social-proof-marquee-track flex w-max items-stretch gap-5 md:gap-6">
                    ${assets.socialProofItems.map(socialProofCard).join("")}
                    ${assets.socialProofItems.map((item, index) => socialProofCard(item, index)).join("")}
                  </div>
                </div>
              `
            : html`
                <div class="social-proof-swiper swiper" data-social-proof-slider>
                  <div class="swiper-wrapper">
                    ${assets.socialProofItems
                      .map(
                        (item, index) => html`
                          <div class="swiper-slide !w-auto">${socialProofCard(item, index)}</div>
                        `,
                      )
                      .join("")}
                  </div>
                  <div class="social-proof-pagination swiper-pagination md:hidden"></div>
                </div>
              `
        }
      </div>
    </section>
  `;
}

export function groovForSection() {
  const shopAllButton = button({
    label: "Shop All",
    size: "sm",
    className: "!h-11 !px-6 !shadow-none",
  });

  const momentumButton = button({
    label: "Momentum",
    variant: "white",
    size: "sm",
    className: "!h-11 !px-6 !shadow-none",
  });

  return html`
    <section class="bg-white py-8 md:py-[41px]">
      <div class="page-container">
        <div class="grid gap-6 md:grid-cols-[594px_578px] md:justify-center md:gap-[30px]">
          <article class="relative h-[507px] overflow-hidden rounded-[16px] bg-white shadow-[0_4px_32px_rgba(0,0,0,0.15)]">
            <div class="flex flex-col items-center px-6 pt-7 text-center md:px-10">
              <h2 class="${type.h4} text-black">
                GROOV FOR
                <span class="font-playfair text-4xl md:text-5xl font-bold italic text-[#3694f3]">you</span>
              </h2>
              <div class="mt-5">${shopAllButton}</div>
            </div>
            <div class="absolute inset-x-0 bottom-7 flex justify-center">
              <div class="groov-for-insole relative h-[303px] w-[154px]">
                <img src="${assets.teamsInsole}" alt="Groov insole" class="absolute left-0 top-0 h-[285px] w-[144px] object-contain" />
                <span class="absolute bottom-0 left-[19px] h-[4px] w-[135px] rounded-full bg-black/10 blur-[2px]"></span>
              </div>
            </div>
          </article>

          <article class="relative h-[513px] overflow-hidden rounded-[24px] bg-black">
            <div class="absolute inset-x-0 bottom-0 top-[84px] overflow-hidden">
              <img src="${assets.teamsBg}" alt="" class="h-full w-full object-cover object-center" />
              <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.08)_58%,rgba(0,0,0,0.26)_100%)]"></div>
            </div>
            <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(61,149,250,0.42),rgba(61,149,250,0.0)_24%)]"></div>
            <div class="pointer-events-none absolute inset-x-0 bottom-0 h-[186px] bg-gradient-to-t from-black/62 via-black/26 to-transparent"></div>
            <div class="relative z-10 flex flex-col items-center px-8 pt-[35px] text-center text-white">
              <h2 class="${type.h4} text-white">
                GROOV FOR
                <span class="font-playfair text-4xl md:text-5xl font-bold italic leading-none">teams</span>
              </h2>
              <div class="mt-[25px]">${momentumButton}</div>
            </div>
          </article>
        </div>
      </div>
    </section>
  `;
}

export function floatingCtaSection() {
  const ctaButton = button({
    label: "Why Groov",
    variant: "black",
    className: "!h-10 !px-6 !shadow-none",
  });

  return html`
    <section class="relative h-[1003px] overflow-hidden bg-white md:h-[1167px]" data-floating-cta-section>
      <div class="absolute inset-0 hidden bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_11.559%,#fafafa_41.571%,#fafafa_100%)] md:block"></div>

      <div class="absolute inset-0 overflow-hidden md:inset-x-0 md:bottom-[128px] md:top-[128px]">
        <picture>
          <source media="(min-width: 768px)" srcset="${assets.ctaDesktopBg}" />
          <img src="${assets.ctaMobileBg}" alt="" class="h-full w-full object-cover object-center" />
        </picture>
        <div class="absolute inset-0 bg-[rgba(54,148,243,0.34)]"></div>
      </div>

      <img src="${assets.ctaInsoleFloat1}" alt="" class="pointer-events-none absolute bottom-[217px] left-[-30px] z-[5] h-[465px] w-[347px] select-none object-contain md:bottom-[31px] md:left-0 md:h-[762px] md:w-[568px]" />
      <img src="${assets.ctaInsoleFloat2}" alt="" class="pointer-events-none absolute left-[109px] top-[186px] z-[5] h-[451px] w-[353px] select-none object-contain md:left-auto md:right-0 md:top-[31px] md:h-[660px] md:w-[517px]" />

      <div class="page-container relative z-10 hidden h-full md:block">
        <div class="absolute left-[calc(50%+26px)] top-1/2 flex w-[810px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-8 text-center">
          <h2 class="${type.h1} text-white">
            We don't make your shoes. We make
            <em class="font-playfair font-bold italic">shoes</em>
            yours.
          </h2>
          ${ctaButton}
        </div>
      </div>

      <div class="relative z-10 h-full md:hidden">
        <h2 class="absolute left-1/2 top-[61px] w-[373px] max-w-[calc(100%-40px)] -translate-x-1/2 text-center ${type.h1} text-white">
          We don't make your shoes.
        </h2>
        <div class="absolute left-1/2 top-[786px] flex w-[373px] max-w-[calc(100%-56px)] -translate-x-1/2 flex-col items-center gap-6 text-center">
          <p class="${type.h1} text-white">
            We make<br />
            <em class="font-playfair font-bold italic">shoes</em>
            yours.
          </p>
          ${ctaButton}
        </div>
      </div>
    </section>
  `;
}

export function trustedExpertsProofSection() {
  return html`
    <section class="bg-white pt-16 pb-8 md:pt-14 md:pb-10">
      <div class="page-container">
        <div class="mx-auto flex max-w-[560px] flex-col items-center text-center">
          <img src="${assets.trusters}" alt="Groov trusters" class="h-[47px] w-[113px]" />
          <h2 class="mt-4 ${type.h4} text-black">
            Backed by the experts &mdash; from the world's top foot doctors to elite athletes
          </h2>
        </div>
        ${logoMarquee({ logos: assets.trustedLogos, className: "mt-9 max-w-[1072px]" })}
      </div>
    </section>
  `;
}

export function videoTestimonialsSection() {
  return html`
    <section class="bg-white pt-8 pb-16 md:pt-10 md:pb-14">
      <div class="page-container">
        <div class="mx-auto grid max-w-[1072px] gap-8 md:grid-cols-2 md:gap-8">
          ${assets.videoTestimonials.map(videoTestimonialCard).join("")}
        </div>
      </div>
    </section>
  `;
}

export function trustedExpertsSection() {
  return html`
    ${trustedExpertsProofSection()}
    ${videoTestimonialsSection()}
  `;
}

export function favoriteShoeSection() {
  return html`
    <section class="overflow-hidden bg-white py-10" data-favorite-shoe-section>
      <div class="page-container">
        <div class="flex items-start justify-between gap-8">
          <h2 class="max-w-[390px] ${type.h2} text-black">
            Make every shoe<br />your <em class="font-playfair font-bold italic">favorite</em> shoe.
          </h2>
          <div class="mt-4 hidden items-center gap-4 md:flex" aria-label="Favorite shoe carousel controls">
            <button type="button" class="favorite-carousel-arrow favorite-carousel-arrow-prev flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[var(--groov-blue)] transition hover:bg-[#2488e8] disabled:cursor-not-allowed disabled:opacity-35" aria-label="Previous card" data-favorite-prev disabled>
              <img src="${assets.arrowFilled}" alt="" class="h-4 w-4 rotate-180" />
            </button>
            <button type="button" class="favorite-carousel-arrow flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[var(--groov-blue)] transition hover:bg-[#2488e8] disabled:cursor-not-allowed disabled:opacity-35" aria-label="Next card" data-favorite-next>
              <img src="${assets.arrowFilled}" alt="" class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <div class="page-container mt-8">
        <div class="favorite-shoe-carousel overflow-x-auto" data-favorite-carousel>
          <div class="flex w-max gap-[30px]">
            ${assets.favoriteShoeCards
              .map(
                (card, index) => html`
                  <figure class="h-[458px] w-[383px] shrink-0 overflow-hidden rounded-[9px] bg-[#f5f5f5]" data-favorite-card data-card-index="${index}">
                    <img src="${card.image}" alt="${card.alt}" class="h-full w-full object-cover" />
                  </figure>
                `,
              )
              .join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}

export function modelTabsIntroSection() {
  return html`
    <section class="bg-[#17212b] px-0 pb-0 pt-14 md:pt-20">
      <div class="page-container">
        <div class="mx-auto flex max-w-[920px] flex-col items-center text-center">
          <h2 class="max-w-[820px] ${type.h2} text-white">
            Transform your footwear from off-the-shelf to
            <span class="font-playfair font-bold italic text-[#3694f3]">custom</span>
            in under 3 minutes
          </h2>
          <p class="mt-6 max-w-[690px] ${type.bodySmall} text-white/65">
            Groov creates custom-fit insoles designed specifically for your feet, your movement, and your lifestyle. Using a simple iPhone foot scan, we transform everyday footwear into shoes tailor fit to you.
          </p>
          <div class="mt-8 md:mt-9">
            ${button({
              label: "Get Groov",
              size: "sm",
              className: "!h-10 !px-6 !shadow-[0_18px_36px_rgba(54,148,243,0.28)] hover:-translate-y-0.5",
            })}
          </div>
        </div>
      </div>
    </section>
  `;
}

export function modelCard(card) {
  return html`
    <button type="button" class="swiper-slide group relative flex flex-col items-center overflow-hidden rounded-[9px] border border-[#242f3b] bg-[#1b2530] px-8 pb-11 pt-12 text-center transition hover:border-white/20 md:h-[430px] md:rounded-[24px] md:pb-8 md:pt-11" aria-pressed="${card.selected ? "true" : "false"}" data-model-card data-model-name="${card.name}">
      <span class="model-card-radio absolute right-4 top-4 h-[27px] w-[27px] rounded-full border border-white/10 transition"></span>
      <span class="flex h-[250px] w-[232px] items-center justify-center md:h-[257px] md:w-[179px]">
        <img src="${card.image}" alt="${card.name} insole" class="h-full w-full object-contain" />
      </span>
      <span class="mt-10 flex flex-col items-center gap-3 md:mt-8 md:gap-2">
        <span class="${type.h4} text-white">${card.name}</span>
        <span class="max-w-[244px] ${type.bodySmall} text-[#737b82] md:max-w-[190px]">${card.description}</span>
      </span>
    </button>
  `;
}

export function modelTabsSection() {
  return html`
    <section class="bg-[#17212b] px-0 py-16 md:py-20" data-model-tabs-section>
      <div class="page-container">
        <div class="flex flex-col items-center gap-4 md:gap-[54px]">
          <div class="flex max-w-full items-center gap-4 overflow-x-auto rounded-full bg-[#131b23] p-[5px] md:gap-8 md:p-2" role="tablist" aria-label="Groov purchase steps">
            ${[
              ["0", "STEP 1", "Choose model"],
              ["1", "STEP 2", "Quick Scan"],
              ["2", "STEP 3", "Get Groovs"],
            ]
              .map(
                ([index, step, label]) => html`
                  <button type="button" class="flex shrink-0 items-center gap-2 rounded-full border border-transparent py-[5px] pl-[5px] pr-3 text-left ${type.ui} transition md:gap-3 md:py-2 md:pl-2 md:pr-5" role="tab" aria-selected="${index === "0"}" aria-controls="step-panel-${Number(index) + 1}" id="step-tab-${Number(index) + 1}" data-step-tab data-step-index="${index}">
                    <span class="step-tab-badge h-[20px] w-[42px] items-center justify-center rounded-full ${type.caption} font-black leading-none md:h-[30px] md:w-[69px]">${step}</span>
                    <span class="whitespace-nowrap">${label}</span>
                  </button>
                `,
              )
              .join("")}
          </div>
          <div class="w-full">
            <div id="step-panel-1" role="tabpanel" aria-labelledby="step-tab-1" data-step-panel data-step-index="0">
              <div class="flex flex-col gap-6">
                <div class="flex flex-col items-center justify-center gap-5 rounded-[9px] border border-[#242f3b] bg-[#1b2530] px-6 py-4 text-center ${type.bodySmall} text-white/50 md:flex-row md:items-center md:justify-between md:rounded-full md:border-0 md:px-8 md:text-left">
                  <p>Purchase one of our <strong class="font-bold text-white">4 insole models.</strong></p>
                  <div class="hidden flex-col gap-4 md:flex md:flex-row md:items-center md:gap-8">
                    <p>Not sure which Groovs are right for you?</p>
                    ${button({ label: "Take our quiz", variant: "secondary", size: "md" })}
                  </div>
                </div>
                <div class="model-card-swiper swiper" data-model-card-slider>
                  <div class="swiper-wrapper">${assets.modelCards.map(modelCard).join("")}</div>
                  <div class="model-card-pagination swiper-pagination md:hidden"></div>
                </div>
                <div class="flex flex-col items-center gap-6 rounded-[13px] border border-[#242f3b] bg-[#1b2530] px-8 py-6 text-center md:hidden">
                  <p class="${type.body} font-medium text-white/60">Not sure which Groovs are right for you?</p>
                  ${button({ label: "Take our quiz", variant: "secondary", size: "md", className: "w-full" })}
                </div>
              </div>
            </div>
            <div id="step-panel-2" class="hidden" role="tabpanel" aria-labelledby="step-tab-2" data-step-panel data-step-index="1">
              <div class="mx-auto max-w-[1032px]"><img src="${assets.step2}" alt="iPhone foot scan interface preview" class="h-auto w-full" /></div>
            </div>
            <div id="step-panel-3" class="hidden" role="tabpanel" aria-labelledby="step-tab-3" data-step-panel data-step-index="2">
              <div class="mx-auto max-w-[1032px]"><img src="${assets.step2}" alt="Groov final scan preview" class="h-auto w-full" /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function homePage() {
  return html`
    <main>
      ${heroSection()}
      ${modelScrollSection()}
      ${testimonialRevealSection()}
      ${trustedMarqueeSection()}
      ${modelTabsIntroSection()}
      ${modelTabsSection()}
      ${trustedExpertsProofSection()}
      ${videoTestimonialsSection()}
      ${favoriteShoeSection()}
      ${socialProofSection({ variant: "carousel" })}
      ${groovForSection()}
      ${floatingCtaSection()}
    </main>
  `;
}

export function homePageV2() {
  return html`
    <main>
      ${heroModelCarouselSection()}
      ${testimonialRevealSection()}
      ${groovForSection()}
      ${floatingCtaSection()}
      ${trustedExpertsProofSection()}
      ${videoTestimonialsSection()}
      ${modelTabsIntroSection()}
      ${modelTabsSection()}
      ${favoriteShoeSection()}
      ${socialProofSection({ variant: "carousel" })}
    </main>
  `;
}
