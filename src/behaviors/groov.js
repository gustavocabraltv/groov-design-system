import { scrollModels } from "../sections/data.js";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function preloadModelMedia(model) {
  if (model.video) {
    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.src = model.video;
    return;
  }

  if (model.image) {
    const image = new Image();
    image.src = model.image;
  }
}

function syncActiveVideo(media, isActive) {
  if (!(media instanceof HTMLVideoElement)) return;

  if (isActive) {
    const playPromise = media.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
    return;
  }

  media.pause();
}

export function initModelScrollSection(section) {
  if (!section) return;

  const mediaItems = Array.from(section.querySelectorAll("[data-model-media]"));
  const items = Array.from(section.querySelectorAll("[data-model-item]"));
  const copy = section.querySelector("[data-model-copy]");
  const title = section.querySelector("[data-model-title]");
  const subtitle = section.querySelector("[data-model-subtitle]");
  let activeIndex = 0;
  let ticking = false;
  let fadeTimer;

  scrollModels.forEach(preloadModelMedia);

  function setActiveModel(nextIndex) {
    if (nextIndex === activeIndex) return;

    activeIndex = nextIndex;
    mediaItems.forEach((media, index) => {
      const isActive = index === activeIndex;
      media.classList.toggle("is-active", isActive);
      syncActiveVideo(media, isActive);
    });

    copy.classList.add("is-fading");
    window.clearTimeout(fadeTimer);
    fadeTimer = window.setTimeout(() => {
      title.textContent = scrollModels[activeIndex].title;
      subtitle.textContent = scrollModels[activeIndex].subtitle;
      copy.classList.remove("is-fading");
    }, 250);
  }

  function updateModelScroll() {
    ticking = false;

    const rect = section.getBoundingClientRect();
    const scrollable = section.offsetHeight - window.innerHeight;
    const progress = clamp(-rect.top / scrollable, 0, 1);
    const segmentSize = 1 / scrollModels.length;
    const nextIndex = clamp(Math.floor(progress / segmentSize), 0, scrollModels.length - 1);

    setActiveModel(nextIndex);

    items.forEach((item, index) => {
      const start = index * segmentSize;
      const end = start + segmentSize;
      const itemProgress = clamp((progress - start) / (end - start), 0, 1);

      item.style.setProperty("--progress", itemProgress.toFixed(3));
      item.classList.toggle("text-white", index === nextIndex);
      item.classList.toggle("text-white/50", index !== nextIndex);
      item.classList.toggle("font-black", index === nextIndex);
      item.classList.toggle("font-bold", index !== nextIndex);
    });
  }

  function requestTick() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateModelScroll);
  }

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const index = Number(item.dataset.modelIndex || 0);
      const target = section.offsetTop + (section.offsetHeight - window.innerHeight) * (index / scrollModels.length);
      window.scrollTo({ top: target, behavior: "smooth" });
    });
  });

  mediaItems.forEach((media, index) => {
    syncActiveVideo(media, index === activeIndex);
  });

  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", requestTick);
  updateModelScroll();
}

export function initHeroModelCarouselSection(section) {
  if (!section || section.dataset.heroModelCarouselInitialized === "true") return;
  section.dataset.heroModelCarouselInitialized = "true";

  const mediaItems = Array.from(section.querySelectorAll("[data-hero-model-media]"));
  const items = Array.from(section.querySelectorAll("[data-model-item]"));
  const prev = section.querySelector("[data-hero-model-prev]");
  const next = section.querySelector("[data-hero-model-next]");
  const total = mediaItems.length;
  if (!total || !items.length) return;

  let activeIndex = -1;
  let elapsed = 0;
  let startedAt = null;
  let cleanupActiveMedia = () => {};

  scrollModels.forEach(preloadModelMedia);

  function getDuration(index) {
    const modelDuration = Number(items[index]?.dataset.modelDuration || mediaItems[index]?.dataset.modelDuration || scrollModels[index]?.duration || 5000);
    return Number.isFinite(modelDuration) && modelDuration > 0 ? modelDuration : 5000;
  }

  function renderProgress(progress) {
    items.forEach((item, index) => {
      const itemProgress = index < activeIndex ? 1 : index === activeIndex ? progress : 0;
      item.style.setProperty("--progress", itemProgress.toFixed(3));
      item.classList.toggle("text-white", index === activeIndex);
      item.classList.toggle("text-white/60", index !== activeIndex);
      item.classList.toggle("font-black", index === activeIndex);
      item.classList.toggle("font-bold", index !== activeIndex);
      item.setAttribute("aria-pressed", String(index === activeIndex));
    });
  }

  function startProgress(index) {
    if (index !== activeIndex || startedAt !== null) return;
    startedAt = performance.now();
  }

  function pauseProgress(index) {
    if (index !== activeIndex || startedAt === null) return;
    elapsed += performance.now() - startedAt;
    startedAt = null;
  }

  function getProgress() {
    const currentElapsed = startedAt === null ? elapsed : elapsed + performance.now() - startedAt;
    return clamp(currentElapsed / getDuration(activeIndex), 0, 1);
  }

  function resetVideo(media) {
    if (!(media instanceof HTMLVideoElement)) return;

    media.pause();
    try {
      media.currentTime = 0;
    } catch {
      // Some browsers can reject seeks before metadata exists; pausing is still safe.
    }
  }

  function waitForActiveMedia(media, index) {
    if (!(media instanceof HTMLVideoElement)) {
      startProgress(index);
      return;
    }

    const handlePlaying = () => startProgress(index);
    const handleWaiting = () => pauseProgress(index);

    media.addEventListener("playing", handlePlaying);
    media.addEventListener("waiting", handleWaiting);
    media.addEventListener("stalled", handleWaiting);
    cleanupActiveMedia = () => {
      media.removeEventListener("playing", handlePlaying);
      media.removeEventListener("waiting", handleWaiting);
      media.removeEventListener("stalled", handleWaiting);
    };

    resetVideo(media);
    const playPromise = media.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  }

  function setActiveModel(index) {
    cleanupActiveMedia();
    cleanupActiveMedia = () => {};
    activeIndex = (index + total) % total;
    elapsed = 0;
    startedAt = null;

    mediaItems.forEach((media, mediaIndex) => {
      const isActive = mediaIndex === activeIndex;
      media.classList.toggle("is-active", isActive);

      if (isActive) {
        waitForActiveMedia(media, activeIndex);
        return;
      }

      resetVideo(media);
    });

    renderProgress(0);
  }

  function tick() {
    const progress = activeIndex === -1 ? 0 : getProgress();
    renderProgress(progress);

    if (progress >= 1) {
      setActiveModel(activeIndex + 1);
    }

    window.requestAnimationFrame(tick);
  }

  function goTo(index) {
    setActiveModel(index);
  }

  prev?.addEventListener("click", () => goTo(activeIndex - 1));
  next?.addEventListener("click", () => goTo(activeIndex + 1));

  items.forEach((item) => {
    item.addEventListener("click", () => {
      goTo(Number(item.dataset.modelIndex || 0));
    });
  });

  setActiveModel(0);
  window.requestAnimationFrame(tick);
}

export function initScrollTextReveal(section) {
  if (!section) return;

  const revealText = section.querySelector("[data-scroll-text-reveal]");
  if (!revealText) return;

  const words = (revealText.dataset.revealText || "").trim().split(/\s+/).filter(Boolean);
  let ticking = false;

  revealText.innerHTML = words
    .map((word, index) => `<span class="testimonial-word" data-word-index="${index}">${word}</span>`)
    .join(" ");

  const wordSpans = Array.from(revealText.querySelectorAll("[data-word-index]"));

  function updateReveal() {
    ticking = false;

    const rect = section.getBoundingClientRect();
    const start = window.innerHeight * 0.82;
    const end = window.innerHeight * 0.22;
    const progress = clamp((start - rect.top) / (start - end), 0, 1);
    const revealLimit = progress * wordSpans.length;

    wordSpans.forEach((word, index) => {
      word.classList.toggle("is-revealed", index < revealLimit);
    });
  }

  function requestTick() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateReveal);
  }

  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", requestTick);
  updateReveal();
}

export function initModelTabsSection(section) {
  if (!section) return;

  const tabs = Array.from(section.querySelectorAll("[data-step-tab]"));
  const panels = Array.from(section.querySelectorAll("[data-step-panel]"));
  const modelCards = Array.from(section.querySelectorAll("[data-model-card]"));
  const slider = section.querySelector("[data-model-card-slider]");
  let modelSwiper = null;

  function activateStep(index) {
    tabs.forEach((tab) => {
      const isActive = Number(tab.dataset.stepIndex) === index;
      tab.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel) => {
      const isActive = Number(panel.dataset.stepIndex) === index;
      panel.classList.toggle("hidden", !isActive);
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activateStep(Number(tab.dataset.stepIndex || 0));
    });
  });

  modelCards.forEach((card) => {
    card.addEventListener("click", () => {
      modelCards.forEach((item) => item.setAttribute("aria-pressed", "false"));
      card.setAttribute("aria-pressed", "true");
    });
  });

  function updateModelSlider() {
    const shouldUseSwiper = window.matchMedia("(max-width: 767px)").matches;

    if (shouldUseSwiper && !modelSwiper && window.Swiper && slider) {
      modelSwiper = new window.Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 14,
        speed: 420,
        pagination: {
          el: slider.querySelector(".model-card-pagination"),
          clickable: true,
        },
      });
    }

    if (!shouldUseSwiper && modelSwiper) {
      modelSwiper.destroy(true, true);
      modelSwiper = null;
    }
  }

  window.addEventListener("resize", updateModelSlider);
  updateModelSlider();
  activateStep(0);
}

export function initFavoriteShoeSection(section) {
  if (!section) return;

  const carousel = section.querySelector("[data-favorite-carousel]");
  const prev = section.querySelector("[data-favorite-prev]");
  const next = section.querySelector("[data-favorite-next]");
  const firstCard = section.querySelector("[data-favorite-card]");
  if (!carousel || !prev || !next || !firstCard) return;

  function getStepSize() {
    const cardRect = firstCard.getBoundingClientRect();
    const styles = window.getComputedStyle(firstCard.parentElement);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");
    return cardRect.width + gap;
  }

  function updateControls() {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth - 2;
    prev.disabled = carousel.scrollLeft <= 2;
    next.disabled = carousel.scrollLeft >= maxScroll;
  }

  function scrollByDirection(direction) {
    carousel.scrollBy({ left: getStepSize() * direction, behavior: "smooth" });
    window.requestAnimationFrame(updateControls);
    window.setTimeout(updateControls, 450);
  }

  prev.addEventListener("click", () => scrollByDirection(-1));
  next.addEventListener("click", () => scrollByDirection(1));
  carousel.addEventListener("scroll", () => window.requestAnimationFrame(updateControls), { passive: true });
  window.addEventListener("resize", updateControls);
  updateControls();
}

export function initSocialProofSection(section) {
  if (!section) return;
  if (section.dataset.socialProofVariant !== "carousel") return;

  const slider = section.querySelector("[data-social-proof-slider]");
  if (!slider || !window.Swiper) return;

  const prev = section.querySelector("[data-social-proof-prev]");
  const next = section.querySelector("[data-social-proof-next]");
  const pagination = slider.querySelector(".social-proof-pagination");

  new window.Swiper(slider, {
    slidesPerView: "auto",
    spaceBetween: 24,
    speed: 560,
    navigation: prev && next ? { prevEl: prev, nextEl: next } : undefined,
    pagination: pagination
      ? {
          el: pagination,
          clickable: true,
        }
      : undefined,
    breakpoints: {
      0: {
        slidesPerView: 1.08,
        spaceBetween: 14,
      },
      768: {
        slidesPerView: "auto",
        spaceBetween: 24,
      },
    },
  });
}

export function initMegaMenuHeader(header) {
  if (!header) return;

  const trigger = header.querySelector("[data-mega-menu-trigger]");
  const menu = header.querySelector("[data-mega-menu]");
  const overlay = header.querySelector("[data-mega-menu-overlay]");
  if (!trigger || !menu) return;

  function setOpen(isOpen) {
    if (isOpen && overlay) {
      const headerBottom = header.getBoundingClientRect().bottom;
      overlay.style.setProperty("--mega-menu-overlay-top", `${Math.round(headerBottom)}px`);
    }

    menu.classList.toggle("hidden", !isOpen);
    overlay?.classList.toggle("hidden", !isOpen);
    header.classList.toggle("is-mega-menu-open", isOpen);
    trigger.setAttribute("aria-expanded", String(isOpen));
  }

  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(menu.classList.contains("hidden"));
  });

  overlay?.addEventListener("click", () => setOpen(false));

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  });
}

export function initGroovSections(root = document) {
  root.querySelectorAll("[data-mega-menu-header]").forEach(initMegaMenuHeader);
  root.querySelectorAll("[data-hero-model-carousel-section]").forEach(initHeroModelCarouselSection);
  root.querySelectorAll("[data-model-scroll-section]").forEach(initModelScrollSection);
  root.querySelectorAll("[data-scroll-text-section]").forEach(initScrollTextReveal);
  root.querySelectorAll("[data-model-tabs-section]").forEach(initModelTabsSection);
  root.querySelectorAll("[data-favorite-shoe-section]").forEach(initFavoriteShoeSection);
  root.querySelectorAll("[data-social-proof-section]").forEach(initSocialProofSection);
}
