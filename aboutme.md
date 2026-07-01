# Fairyteller — портфолио-сайт AI-художника

## О проекте

Я (Александр) — AI-художник под ником **Fairyteller**. Строю сайт-портфолио с нуля.
Это **полностью новый проект** — никакого отношения к старым файлам с брендингом "VOID.ARCHIVE"
(если такие где-то всплывут в истории чата — это устаревшая, заброшенная версия, игнорировать).

## Визуальный стиль

- Неон-розовый `#ff1f74` + электро-циан `#00d9ff` на глубоком чёрном фоне
- Эстетика: киберпанк / стрит-арт, сбалансированная — не агрессивная
- Максимально амбициозный масштаб, не минимализм

## Структура сайта

- `index.html` — hero-слайдер → витрина из 4 избранных работ → about → contact → footer
- `gallery.html` — полная коллекция работ
- Переключатель языка RU/EN на обеих страницах
- ~~Форма отзывов через Supabase~~ — убрана из финальной версии
- Новые фичи в планах: счётчик визитов (Supabase), лайк на каждую работу (Supabase, сердце outline/filled + анимация искры), авто-бейдж "NEW" (14 дней с даты добавления, CSS+JS), анимация дрона по дуге в hero, полноэкранное мобильное меню

## Статус ассетов — ВСЕ 21 ГОТОВЫ ✅

Все ассеты подтверждены как готовые и сверены напрямую с папками проекта на ПК
(`source/` — исходники PNG, `assets/` — финальные/конвертированные файлы).

- `logo-full.png` — версия с декоративными скобками, для hero (готов в `assets/logo/`)
- `logo-clean.png` — для хедера/футера/favicon (готов в `assets/logo/`)
- `bg-left.png` — левая панель граффити-стены (готов в `assets/backgrounds/` как `.webp`)
- `bg-right.png` — правая панель со встроенной надписью "CREATE YOUR REALITY" (вписана в само изображение, не CSS-оверлей; готов в `assets/backgrounds/` как `.webp`)
- `hero-bg.png` — фон hero (туманный неоновый город)
- `frame-gold.png` — запасной, не используется (отсутствует, и не нужен)
- `artist.png` — портрет художника (переименован из `author.png`)
- `noise.png` — текстура шума
- `scratches.png` — текстура царапин
- `splash-pink.png` / `splash-cyan.png` — брызги краски
- `divider-neon.png` — разделитель
- `corner-bracket.png` — декоративный уголок sci-fi стиля
- `tags-set.png` — набор граффити-тегов
- `octagon-frame.png` — запасной, не используется (отсутствует, и не нужен)
- `glitch-overlay.png` — эффект глитча
- `cursor.png` / `cursor-hover.png` — кастомный курсор
- neon-strokes — **8 файлов** (не 9, финальное решение): `stroke-arc-cyan.png`, `stroke-circle-cyan.png`, `stroke-circle-pink.png`, `stroke-slash-cyan.png`, `stroke-slash-pink.png`, `stroke-spiral-pink.png`, `stroke-streak-pink.png`, `stroke-wave-cyan.png`
- `counter-frame.png` — рамка для счётчика визитов
- `heart-outline.png` / `heart-filled.png` — иконки лайка
- `drone.png` — дрон для hero-анимации

Иконки UI — **Lucide Icons** (SVG), не генерировались отдельно.

Большинство файлов пока лежит как PNG в `source/` и ещё не сконвертировано в WebP
(кроме `bg-left`/`bg-right`, уже готовых в `assets/backgrounds/`).

## Утверждённые тексты (RU/EN)

### Hero (вариант B)
**RU:** eyebrow "// АРХИВ ВИДЕНИЙ — 001", title "МАШИНЫ / ВИДЯТ / НЕЖНОСТЬ",
sub "Я учу алгоритмы смотреть так, как смотрит человек, который ещё не разучился удивляться."

**EN:** eyebrow "// ARCHIVE OF VISIONS — 001", title "MACHINES / THAT SEE / TENDERNESS",
sub "I teach algorithms to look the way a person looks who hasn't yet forgotten how to wonder."

### About
4 года формирования стиля (не 5 — уточнено и подтверждено).

**RU:** "Четыре года я живу на границе сна и кода. Каждая работа начинается не с промпта,
а с чувства — с обрывка настроения, который хочется удержать, пока он не растворился.
Машина даёт мне инструмент, но решает всегда рука и глаз: что оставить, что стереть, где свет
должен дрогнуть. Я не ищу идеальное изображение — я ищу то единственное, в котором что-то
узнаваемо ёкает. Иногда это лицо, иногда — пустая улица в три часа ночи. Стиль сложился не сразу,
но теперь я знаю, как он дышит, и продолжаю его слушать, кадр за кадром."

**EN:** "For four years I've lived on the border between dreaming and code. Every piece begins not
with a prompt but with a feeling — a fragment of mood I want to hold onto before it dissolves.
The machine gives me a tool, but the hand and the eye always decide: what stays, what's erased,
where the light should tremble. I'm not chasing the perfect image — I'm chasing the one where
something recognizable catches in the chest. Sometimes it's a face, sometimes an empty street
at three in the morning. The style took time to find, but now I know how it breathes, and I keep
listening to it, frame by frame."

### Gallery
**RU:** title "Архив", desc "Здесь — всё, что осталось от снов, которые я успел поймать.
Листай медленно, как старый альбом: каждый кадр всё ещё дышит тем вечером, в который был сделан."

**EN:** title "The Archive", desc "Everything I managed to catch from the dreams lives here.
Scroll slowly, like an old album — every frame still breathes the evening it was made in."

### Contact
**RU:** title "Найти меня", desc "Если что-то здесь отозвалось — напишите. Заказы, идеи для
коллабораций, просто пара слов о том, что зацепило." Лейблы: Почта / Instagram / Telegram

**EN:** title "Reach Out", desc "If something here struck a chord — write to me. Commissions,
collaboration ideas, or just a few words about what stayed with you." Labels: Email / Instagram / Telegram

### Footer
**RU:** "Сделано вручную, кадр за кадром" / **EN:** "Made by hand, frame by frame"

### Meta-теги
**RU:** title "Fairyteller — архив снов на стыке человека и машины",
desc "Портфолио AI-художника Fairyteller. Киберпанк-портреты, в которых нежность оказалась
сильнее неона."

**EN:** title "Fairyteller — an archive of dreams between human and machine",
desc "Portfolio of AI artist Fairyteller. Cyberpunk portraits where tenderness turned out
stronger than neon."

## Открытые задачи

✅ Все 22 ассета готовы, включая нарезку neon-strokes на 9 файлов.

1. Выбрать 10–12 работ для первого запуска галереи
2. Подготовить два размера на каждую работу (preview ~800×1000, full ~1600×2000), конвертация в WebP
3. Решить, какие 4 работы идут в "Избранное" на главной (`showcase: true`)
4. Написать названия + теги для каждой работы
5. Проставить `dateAdded` для логики бейджа "NEW"
6. (опционально) доработать верхний правый угол кресла на портрете художника
7. Убрать чёрный фон у декоративных PNG через remove.bg или CSS `mix-blend-mode: screen`
8. **Файлов кода пока не создано — html/css/js будем писать с нуля, начиная с этого этапа**

## Анимации (план)

SVG stroke-draw прелоадер, intro-последовательность, Ken Burns эффект на hero-слайдере,
parallax, scroll-reveal с stagger в галерее, 3D-tilt на портрете художника при наведении,
count-up для статистики, кастомный курсор, ripple-эффект на кликах — везде с учётом
`prefers-reduced-motion`.

## Инструменты

- **squoosh.app** — конвертация PNG → WebP (качество 80–85)
- **Lucide Icons** — источник SVG-иконок
- AI-генерация изображений — для визуальных ассетов
- CSS — для отдельных оверлеев и текстур (где это уместнее генерации)

## Как я люблю работать

- Иду шаг за шагом, одна задача/решение за раз
- Жду прямую обратную связь по генерациям (что хорошо/плохо/переделать)
- Для GPT-Image и Midjourney нужны разные промпты (MJ короче, в стиле keyword+params)
- Объясняй мне "зачем", прежде чем что-то делать
