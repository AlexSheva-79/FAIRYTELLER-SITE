// Fairyteller — логика страницы галереи (gallery.html).
// Вызывается из main.js, если определена (renderGallery).
// Переиспользует buildWorkCard, WORKS, getLang, t из общих скриптов.

// Канонические ключи тегов = английские теги (стабильны при смене языка).
// Строим карты соответствия en<->ru по позиции в массивах (они выровнены).
const tagEnToRu = {};
const tagRuToEn = {};
WORKS.forEach((w) => {
  w.tags.en.forEach((en, i) => {
    const ru = w.tags.ru[i];
    tagEnToRu[en] = ru;
    tagRuToEn[ru] = en;
  });
});

// Порядок показа в галерее: сначала showcase, затем остальные (можно менять).
function galleryOrder() {
  return [...WORKS];
}

let activeTag = "all"; // текущий фильтр (english key или "all")

function renderGallery() {
  const grid = document.querySelector(".gallery__grid");
  if (!grid) return;

  // карточки
  galleryOrder().forEach((work) => {
    const card = buildWorkCard(work, { showcase: false });
    card.dataset.tags = JSON.stringify(work.tags.en); // канон для фильтра
    grid.appendChild(card);
  });

  buildTagFilter();
  initLightbox();
}

// --- Фильтр по тегам ---
function buildTagFilter() {
  const bar = document.querySelector(".gallery__filter");
  if (!bar) return;
  const lang = getLang();

  const allTags = [...new Set(WORKS.flatMap((w) => w.tags.en))].sort();
  const label = (en) => (lang === "en" ? en : (tagEnToRu[en] || en));

  bar.innerHTML = "";
  const makeChip = (key, text) => {
    const chip = document.createElement("button");
    chip.className = "chip" + (key === activeTag ? " is-active" : "");
    chip.dataset.tag = key;
    chip.textContent = text;
    chip.addEventListener("click", () => applyFilter(key));
    return chip;
  };

  bar.appendChild(makeChip("all", lang === "en" ? "All" : "Все"));
  allTags.forEach((en) => bar.appendChild(makeChip(en, label(en))));
}

function applyFilter(key) {
  activeTag = key;
  document.querySelectorAll(".gallery__filter .chip").forEach((c) =>
    c.classList.toggle("is-active", c.dataset.tag === key)
  );
  document.querySelectorAll(".gallery__grid .work").forEach((card) => {
    const tags = JSON.parse(card.dataset.tags || "[]");
    const show = key === "all" || tags.includes(key);
    card.classList.toggle("is-hidden", !show);
  });
}

// При смене языка — обновляем подписи чипов (ключи остаются английскими).
document.addEventListener("langchange", () => {
  if (document.querySelector(".gallery__filter")) buildTagFilter();
});

// --- Лайтбокс ---
function initLightbox() {
  const box = document.querySelector(".lightbox");
  if (!box) return;
  const imgEl = box.querySelector(".lightbox__img");
  const titleEl = box.querySelector(".lightbox__title");
  const tagsEl = box.querySelector(".lightbox__tags");

  const open = (slug) => {
    const work = WORKS.find((w) => w.slug === slug);
    if (!work) return;
    const lang = getLang();
    imgEl.src = fullSrc(slug);
    imgEl.alt = work.title[lang];
    titleEl.textContent = work.title[lang];
    tagsEl.innerHTML = work.tags[lang].map((tg) => `<span class="work__tag">${tg}</span>`).join("");
    box.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    box.classList.remove("is-open");
    document.body.style.overflow = "";
    imgEl.src = "";
  };

  // клик по карточке (но не по кнопке лайка)
  document.querySelector(".gallery__grid").addEventListener("click", (e) => {
    if (e.target.closest(".like")) return;
    const card = e.target.closest(".work");
    if (card) open(card.dataset.slug);
  });

  box.querySelector(".lightbox__close").addEventListener("click", close);
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}
