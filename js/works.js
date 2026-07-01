// Fairyteller — данные всех работ.
// slug используется как ключ лайков в Supabase (artwork_likes.slug).
// showcase: true — работа попадает в блок "Избранное" на главной.
// accent — акцентный цвет неоновой рамки showcase-работы ("gold" | "cyan"): рамка
//   подсвечивается только у той работы, что сейчас показана в hero-баннере, и уголки
//   баннера перекрашиваются в этот же цвет синхронно со сменой слайда.
// dateAdded — дата ВЫКЛАДКИ на сайт (для бейджа NEW, 14 дней). Формат YYYY-MM-DD.
// w/h — размеры preview для сохранения пропорций в masonry (без скачков вёрстки).

const WORKS = [
  {
    slug: "01-ink-and-tenderness",
    title: { ru: "Чернила и нежность", en: "Ink and Tenderness" },
    tags: { ru: ["тату-салон", "киберпанк-город"], en: ["tattoo salon", "cyberpunk city"] },
    showcase: true,
    accent: "gold",
    dateAdded: "2026-06-30",
    w: 800, h: 448,
  },
  {
    slug: "02-sight-through-the-wires",
    title: { ru: "Взгляд сквозь провода", en: "Sight Through the Wires" },
    tags: { ru: ["хакер", "киберпанк-портрет"], en: ["hacker", "cyberpunk portrait"] },
    showcase: true,
    accent: "cyan",
    dateAdded: "2026-06-30",
    w: 800, h: 533,
  },
  {
    slug: "03-solar-wind",
    title: { ru: "Солнечный ветер", en: "Solar Wind" },
    tags: { ru: ["солнечный ветер", "киберпанк-город"], en: ["solar wind", "cyberpunk city"] },
    showcase: true,
    accent: "gold",
    dateAdded: "2026-06-30",
    w: 800, h: 533,
  },
  {
    slug: "04-old-rebels",
    title: { ru: "Старые бунтари", en: "Old Rebels" },
    tags: { ru: ["старые бунтари", "киберпанк-портрет"], en: ["old rebels", "cyberpunk portrait"] },
    showcase: true,
    accent: "cyan",
    dateAdded: "2026-06-30",
    w: 800, h: 600,
  },
  {
    slug: "05-midnight-bar",
    title: { ru: "Полночный бар", en: "Midnight Bar" },
    tags: { ru: ["ночной бар", "киберпанк-соблазн"], en: ["night bar", "cyberpunk allure"] },
    showcase: false,
    dateAdded: "2026-07-02",
    w: 667, h: 1000,
  },
  {
    slug: "06-wasteland-wanderer",
    title: { ru: "Странник пустошей", en: "Wasteland Wanderer" },
    tags: { ru: ["постапокалипсис", "механический пёс"], en: ["post-apocalypse", "mechanical dog"] },
    showcase: false,
    dateAdded: "2026-07-02",
    w: 800, h: 533,
  },
  {
    slug: "07-neon-date",
    title: { ru: "Свидание в неоне", en: "Neon Date" },
    tags: { ru: ["парочка", "киберпанк-улица"], en: ["couple", "cyberpunk street"] },
    showcase: false,
    dateAdded: "2026-07-02",
    w: 753, h: 1000,
  },
  {
    slug: "08-yellow-racer",
    title: { ru: "Жёлтый гонщик", en: "Yellow Racer" },
    tags: { ru: ["гонка", "киберпанк-город"], en: ["race", "cyberpunk city"] },
    showcase: false,
    dateAdded: "2026-07-02",
    w: 800, h: 600,
  },
  {
    slug: "09-street-chic",
    title: { ru: "Уличный шик", en: "Street Chic" },
    tags: { ru: ["стрит-стайл", "городская мода"], en: ["street style", "urban fashion"] },
    showcase: false,
    dateAdded: "2026-07-02",
    w: 336, h: 1000,
  },
  {
    slug: "10-by-the-water",
    title: { ru: "У воды", en: "By the Water" },
    tags: { ru: ["набережная", "городские тату"], en: ["waterfront", "urban tattoos"] },
    showcase: false,
    dateAdded: "2026-07-02",
    w: 560, h: 1000,
  },
  {
    slug: "11-garage-punk",
    title: { ru: "Гаражный панк", en: "Garage Punk" },
    tags: { ru: ["панк", "гаражная мастерская"], en: ["punk", "garage workshop"] },
    showcase: false,
    dateAdded: "2026-07-02",
    w: 560, h: 1000,
  },
  {
    slug: "12-golden-patterns",
    title: { ru: "Золотые узоры", en: "Golden Patterns" },
    tags: { ru: ["портрет", "золотой орнамент"], en: ["portrait", "golden ornament"] },
    showcase: false,
    dateAdded: "2026-07-02",
    w: 667, h: 1000,
  },
  {
    slug: "13-neon-fighter",
    title: { ru: "Боец из неона", en: "Neon Fighter" },
    tags: { ru: ["боец", "неоновый город"], en: ["fighter", "neon city"] },
    showcase: false,
    dateAdded: "2026-07-02",
    w: 753, h: 1000,
  },
];

// Пути к изображениям
function showcaseSrc(slug) { return `assets/works/showcase/${slug}.webp`; }
function previewSrc(slug) { return `assets/works/gallery/preview/${slug}.webp`; }
function fullSrc(slug) { return `assets/works/gallery/full/${slug}.webp`; }
