// Fairyteller — общая логика сайта.
// Зависит от: works.js, i18n.js, supabase.js (подключены раньше).

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- бейдж NEW: 14 дней с даты выкладки ---------- */
function isNew(dateAdded) {
  const added = new Date(dateAdded + "T00:00:00");
  const days = (Date.now() - added.getTime()) / 86400000;
  return days >= 0 && days <= 14;
}

/* ---------- построение карточки работы (переиспользуется на главной и в галерее) ---------- */
function buildWorkCard(work, opts = {}) {
  const lang = getLang();
  const src = opts.showcase ? showcaseSrc(work.slug) : previewSrc(work.slug);

  const card = document.createElement("article");
  card.className = "work reveal";
  card.dataset.slug = work.slug;
  if (opts.showcase) {
    // showcase — единый портретный формат 4/5 (задаётся в CSS), + акцентный цвет рамки
    card.dataset.accent = work.accent || "cyan";
    card.style.setProperty("--frame", work.accent === "gold" ? "var(--gold)" : "var(--cyan)");
  } else {
    // галерея (masonry) — сохраняем оригинальные пропорции работы
    card.style.aspectRatio = `${work.w} / ${work.h}`;
  }

  card.innerHTML = `
    <div class="work__media">
      <img src="${src}" alt="" loading="lazy" width="${work.w}" height="${work.h}">
    </div>
    ${isNew(work.dateAdded) ? `<span class="badge-new" data-i18n="badge.new">${t("badge.new", lang)}</span>` : ""}
    <button class="like" aria-label="like" data-slug="${work.slug}">
      <span class="like__icon">
        <img class="outline" src="assets/ui/heart-outline.webp" alt="">
        <img class="filled"  src="assets/ui/heart-filled.webp"  alt="">
      </span>
      <span class="like__count">·</span>
    </button>
    <div class="work__overlay">
      <h3 class="work__title">${work.title[lang]}</h3>
      <div class="work__tags">
        ${work.tags[lang].map((tag) => `<span class="work__tag">${tag}</span>`).join("")}
      </div>
    </div>
  `;

  if (isLiked(work.slug)) card.querySelector(".like").classList.add("is-liked");
  return card;
}

// Обновить тексты карточек при смене языка (заголовки/теги)
function refreshCards() {
  const lang = getLang();
  document.querySelectorAll(".work").forEach((card) => {
    const work = WORKS.find((w) => w.slug === card.dataset.slug);
    if (!work) return;
    const titleEl = card.querySelector(".work__title");
    if (titleEl) titleEl.textContent = work.title[lang];
    const tagsEl = card.querySelector(".work__tags");
    if (tagsEl) tagsEl.innerHTML = work.tags[lang].map((tag) => `<span class="work__tag">${tag}</span>`).join("");
  });
}

/* ---------- лайки: навешиваем обработчик + подгружаем счётчики ---------- */
async function initLikes() {
  const likeMap = await fetchAllLikes();
  document.querySelectorAll(".like").forEach((btn) => {
    const slug = btn.dataset.slug;
    const countEl = btn.querySelector(".like__count");
    if (countEl) countEl.textContent = likeMap[slug] != null ? likeMap[slug] : 0;

    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      // оптимистичный отклик
      btn.classList.add("spark");
      setTimeout(() => btn.classList.remove("spark"), 500);
      const res = await toggleLike(slug);
      if (res) {
        btn.classList.toggle("is-liked", res.liked);
        if (countEl) countEl.textContent = res.count;
      }
    });
  });
}

/* ---------- счётчик визитов ---------- */
async function initVisits() {
  const el = document.querySelector(".footer__visits .vnum");
  if (!el) return;
  const count = await registerVisit();
  if (count != null) el.textContent = Number(count).toLocaleString("ru-RU");
}

/* ---------- рендер showcase на главной ---------- */
function renderShowcase() {
  const grid = document.querySelector(".showcase__grid");
  if (!grid) return;
  WORKS.filter((w) => w.showcase).forEach((work) => {
    grid.appendChild(buildWorkCard(work, { showcase: true }));
  });
}

/* ---------- видео-баннер в hero (анимация избранных работ) ---------- */
// Ролики не привязаны к конкретным работам (отдельная анимация из 4 файлов),
// поэтому подсветки уголков/карточки showcase здесь больше нет — уголки остаются
// в дефолтном цвете из CSS.
const HERO_VIDEOS = ["hero-1", "hero-2", "hero-3", "hero-4"];

function heroVideoSrc(name) {
  const mobile = window.matchMedia("(max-width: 860px)").matches;
  return `assets/video/${name}${mobile ? "-mobile" : ""}.mp4`;
}

function renderHeroBanner() {
  const banner = document.querySelector(".hero__banner");
  if (!banner) return;
  const corners = banner.querySelectorAll(".hero__corner");

  HERO_VIDEOS.forEach((name, i) => {
    const slide = document.createElement("div");
    slide.className = "hero__slide" + (i === 0 ? " is-active" : "");
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = i === 0 ? "auto" : "metadata";
    video.poster = `assets/video/${name}-poster.jpg`;
    video.src = heroVideoSrc(name);
    slide.appendChild(video);
    // вставляем слайды перед уголками, чтобы уголки оставались поверх
    banner.insertBefore(slide, corners[0] || null);
  });
  const els = banner.querySelectorAll(".hero__slide");
  const videos = banner.querySelectorAll(".hero__slide video");

  // при уменьшенной анимации — просто показываем постер первого ролика, без автовоспроизведения
  if (prefersReduced || videos.length < 2) return;

  let idx = 0;
  function playSlide(i) {
    const v = videos[i];
    v.currentTime = 0;
    v.play().catch(() => {});
  }
  function advance() {
    els[idx].classList.remove("is-active");
    videos[idx].pause();
    idx = (idx + 1) % els.length;
    els[idx].classList.add("is-active");
    playSlide(idx);
  }
  videos.forEach((v) => v.addEventListener("ended", advance));
  playSlide(0);
}

/* ---------- прелоадер + intro-последовательность hero ---------- */
function initPreloader() {
  const pre = document.querySelector(".preloader");
  const startIntro = () => document.body.classList.add("intro-ready");
  if (!pre) { startIntro(); return; } // на странице без прелоадера (напр. будущие лендинги) hero должен быть виден сразу
  window.addEventListener("load", () => {
    setTimeout(() => {
      pre.classList.add("is-done");
      startIntro();
    }, prefersReduced ? 0 : 500);
  });
}

/* ---------- кастомный курсор ---------- */
function initCursor() {
  if (prefersReduced || window.matchMedia("(max-width: 860px)").matches) return;
  const cursor = document.createElement("div");
  cursor.className = "cursor";
  document.body.appendChild(cursor);

  let x = 0, y = 0, cx = 0, cy = 0, running = false;
  function loop() {
    cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    // останавливаем цикл, когда курсор практически догнал цель (не крутим rAF впустую)
    if (Math.abs(x - cx) > 0.5 || Math.abs(y - cy) > 0.5) {
      requestAnimationFrame(loop);
    } else {
      running = false;
    }
  }
  document.addEventListener("mousemove", (e) => {
    x = e.clientX; y = e.clientY;
    if (!running) { running = true; requestAnimationFrame(loop); }
  });

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest("a, button, .work")) cursor.classList.add("is-hover");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest("a, button, .work")) cursor.classList.remove("is-hover");
  });
}

/* ---------- parallax: фон hero и боковые фон-стены сдвигаются медленнее контента ---------- */
function initParallax() {
  if (prefersReduced) return;
  const heroBg = document.querySelector(".hero__bg");
  const walls = document.querySelectorAll(".side-walls");
  if (!heroBg && !walls.length) return;

  let ticking = false;
  function update() {
    const y = window.scrollY;
    if (heroBg) heroBg.style.transform = `scale(1.08) translateY(${y * 0.12}px)`;
    walls.forEach((el) => el.style.setProperty("--wall-shift", `${y * 0.06}px`));
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}

/* ---------- ripple на кликах (кнопки, чипы, крестик лайтбокса) ---------- */
// .like не включена сюда намеренно — у неё уже есть своя "искра" (см. .like.spark в CSS),
// второй эффект поверх выглядел бы избыточно.
function initRipple() {
  if (prefersReduced) return;
  const selector = ".hero__cta, .btn-ghost, .chip, .contact__link, .lightbox__close";
  document.addEventListener("click", (e) => {
    const el = e.target.closest(selector);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const size = Math.hypot(rect.width, rect.height); // диаметр, гарантированно перекрывающий углы от точки клика
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    el.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });
}

/* ---------- хедер: фон при скролле ---------- */
function initHeader() {
  const header = document.querySelector(".header");
  if (!header) return;
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- мобильное меню ---------- */
function initMobileMenu() {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".mobile-menu");
  if (!burger || !menu) return;
  const toggle = (open) => {
    burger.classList.toggle("is-open", open);
    menu.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => toggle(!menu.classList.contains("is-open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggle(false)));
}

/* ---------- язык: кнопки переключения ---------- */
function initLang() {
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
  });
  applyLang(getLang());
  document.addEventListener("langchange", refreshCards);
}

/* ---------- scroll-reveal ---------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (prefersReduced) { els.forEach((el) => el.classList.add("is-visible")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("is-visible"), (i % 4) * 90);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach((el) => io.observe(el));
}

/* ---------- 3D-tilt на портрете ---------- */
function initTilt() {
  if (prefersReduced) return;
  const el = document.querySelector(".about__portrait");
  if (!el) return;
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`;
  });
  el.addEventListener("mouseleave", () => { el.style.transform = ""; });
}

/* ---------- count-up для статистики ---------- */
function initCountUp() {
  const nums = document.querySelectorAll("[data-count]");
  if (!nums.length) return;
  const run = (el) => {
    const target = +el.dataset.count;
    if (prefersReduced) { el.textContent = target; return; }
    let cur = 0;
    const step = Math.max(1, Math.round(target / 40));
    const tick = () => {
      cur = Math.min(target, cur + step);
      el.textContent = cur;
      if (cur < target) requestAnimationFrame(tick);
    };
    tick();
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { run(entry.target); io.unobserve(entry.target); } });
  }, { threshold: 0.5 });
  nums.forEach((el) => io.observe(el));
}

/* ---------- инициализация ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initLang();
  initHeader();
  initMobileMenu();
  initCursor();
  renderShowcase();   // только на главной (если есть .showcase__grid)
  renderHeroBanner(); // только на главной; после showcase — чтобы подсветить карточку
  if (typeof renderGallery === "function") renderGallery(); // только на gallery.html
  initReveal();
  initParallax();
  initRipple();
  initTilt();
  initCountUp();
  initLikes();
  initVisits();
});
