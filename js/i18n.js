// Fairyteller — переводы RU/EN. Тексты утверждены (см. aboutme.md).
// Применяются к элементам с атрибутом data-i18n="ключ".
// Выбор языка хранится в localStorage('ft-lang'), по умолчанию RU.

const I18N = {
  ru: {
    "nav.home": "Главная",
    "nav.gallery": "Галерея",
    "nav.about": "Обо мне",
    "nav.contact": "Контакты",

    "hero.eyebrow": "// АРХИВ ВИДЕНИЙ — 001",
    "hero.title": "МАШИНЫ / ВИДЯТ / НЕЖНОСТЬ",
    "hero.sub": "Я учу алгоритмы смотреть так, как смотрит человек, который ещё не разучился удивляться.",
    "hero.cta": "Перейти в галерею",
    "hero.tagline": "AI-художник · архив снов",

    "showcase.title": "Избранное",
    "showcase.sub": "Четыре кадра, которые держат меня крепче остальных.",
    "showcase.all": "Вся коллекция",

    "about.title": "О художнике",
    "about.body": "Четыре года я живу на границе сна и кода. Каждая работа начинается не с промпта, а с чувства — с обрывка настроения, который хочется удержать, пока он не растворился. Машина даёт мне инструмент, но решает всегда рука и глаз: что оставить, что стереть, где свет должен дрогнуть. Я не ищу идеальное изображение — я ищу то единственное, в котором что-то узнаваемо ёкает. Иногда это лицо, иногда — пустая улица в три часа ночи. Стиль сложился не сразу, но теперь я знаю, как он дышит, и продолжаю его слушать, кадр за кадром.",

    "contact.title": "Найти меня",
    "contact.desc": "Если что-то здесь отозвалось — напишите. Заказы, идеи для коллабораций, просто пара слов о том, что зацепило.",
    "contact.email": "Почта",
    "contact.instagram": "Instagram",
    "contact.telegram": "Telegram",

    "gallery.title": "Архив",
    "gallery.desc": "Здесь — всё, что осталось от снов, которые я успел поймать. Листай медленно, как старый альбом: каждый кадр всё ещё дышит тем вечером, в который был сделан.",

    "footer.tagline": "Сделано вручную, кадр за кадром",
    "badge.new": "NEW",
    "visits.label": "визитов",
  },
  en: {
    "nav.home": "Home",
    "nav.gallery": "Gallery",
    "nav.about": "About",
    "nav.contact": "Contact",

    "hero.eyebrow": "// ARCHIVE OF VISIONS — 001",
    "hero.title": "MACHINES / THAT SEE / TENDERNESS",
    "hero.sub": "I teach algorithms to look the way a person looks who hasn't yet forgotten how to wonder.",
    "hero.cta": "Go to Gallery",
    "hero.tagline": "AI artist · archive of dreams",

    "showcase.title": "Featured",
    "showcase.sub": "Four frames that hold onto me tighter than the rest.",
    "showcase.all": "Full collection",

    "about.title": "About",
    "about.body": "For four years I've lived on the border between dreaming and code. Every piece begins not with a prompt but with a feeling — a fragment of mood I want to hold onto before it dissolves. The machine gives me a tool, but the hand and the eye always decide: what stays, what's erased, where the light should tremble. I'm not chasing the perfect image — I'm chasing the one where something recognizable catches in the chest. Sometimes it's a face, sometimes an empty street at three in the morning. The style took time to find, but now I know how it breathes, and I keep listening to it, frame by frame.",

    "contact.title": "Reach Out",
    "contact.desc": "If something here struck a chord — write to me. Commissions, collaboration ideas, or just a few words about what stayed with you.",
    "contact.email": "Email",
    "contact.instagram": "Instagram",
    "contact.telegram": "Telegram",

    "gallery.title": "The Archive",
    "gallery.desc": "Everything I managed to catch from the dreams lives here. Scroll slowly, like an old album — every frame still breathes the evening it was made in.",

    "footer.tagline": "Made by hand, frame by frame",
    "badge.new": "NEW",
    "visits.label": "visits",
  },
};

function getLang() {
  return localStorage.getItem("ft-lang") || "ru";
}

function setLang(lang) {
  localStorage.setItem("ft-lang", lang);
  applyLang(lang);
}

function t(key, lang) {
  lang = lang || getLang();
  return (I18N[lang] && I18N[lang][key]) || key;
}

// Применяет текущий язык ко всем data-i18n элементам и обновляет переключатель.
function applyLang(lang) {
  lang = lang || getLang();
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const text = t(el.getAttribute("data-i18n"), lang);
    // элементы с .fx-slash подсвечивают символы "/" неоном
    if (el.classList.contains("fx-slash")) {
      el.innerHTML = text.replace(/\//g, '<span class="slash">/</span>');
    } else {
      el.textContent = text;
    }
  });
  // Кнопки переключателя языка
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
  });
  // Сообщаем остальному коду (галерея, showcase), что язык сменился
  document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
}
