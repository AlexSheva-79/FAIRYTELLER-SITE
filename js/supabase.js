// Fairyteller — обёртка над Supabase (счётчик визитов + лайки).
// Используется ТОЛЬКО publishable key — безопасен для фронтенда при включённом RLS.
// Запись в таблицы идёт только через защищённые RPC-функции (см. supabase/schema.sql).

const SUPABASE_URL = "https://eatxawvzwbckgkzmijzh.supabase.co";
const SUPABASE_KEY = "sb_publishable_SclD0cGX9anD351jDHb-oA_nGEdBnCG";

const SB_HEADERS = {
  "apikey": SUPABASE_KEY,
  "Authorization": `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
};

// Вызов RPC-функции. Возвращает распарсенный JSON или null при ошибке.
async function sbRpc(fn, body) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
      method: "POST",
      headers: SB_HEADERS,
      body: JSON.stringify(body || {}),
    });
    if (!res.ok) {
      console.warn(`[supabase] RPC ${fn} failed:`, res.status);
      return null;
    }
    return await res.json();
  } catch (e) {
    console.warn(`[supabase] RPC ${fn} error:`, e);
    return null;
  }
}

// GET-запрос к таблице (для чтения текущих значений).
async function sbSelect(path) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers: SB_HEADERS });
    if (!res.ok) {
      console.warn(`[supabase] select ${path} failed:`, res.status);
      return null;
    }
    return await res.json();
  } catch (e) {
    console.warn(`[supabase] select ${path} error:`, e);
    return null;
  }
}

// --- Счётчик визитов ---
// Инкрементит один раз за сессию браузера, иначе только читает текущее значение.
async function registerVisit() {
  const key = "ft-visited-session";
  if (sessionStorage.getItem(key)) {
    const rows = await sbSelect("site_visits?id=eq.1&select=count");
    return rows && rows[0] ? rows[0].count : null;
  }
  sessionStorage.setItem(key, "1");
  return await sbRpc("increment_site_visits");
}

// --- Лайки ---
// Локально (в браузере) помним, какие работы пользователь лайкнул.
function likedSet() {
  try { return new Set(JSON.parse(localStorage.getItem("ft-liked") || "[]")); }
  catch { return new Set(); }
}
function saveLikedSet(set) {
  localStorage.setItem("ft-liked", JSON.stringify([...set]));
}
function isLiked(slug) { return likedSet().has(slug); }

// Читает все счётчики лайков разом. Возвращает объект { slug: count }.
async function fetchAllLikes() {
  const rows = await sbSelect("artwork_likes?select=slug,like_count");
  const map = {};
  if (rows) rows.forEach((r) => { map[r.slug] = r.like_count; });
  return map;
}

// Переключает лайк работы. Возвращает { liked, count } или null при ошибке.
async function toggleLike(slug) {
  const set = likedSet();
  const willLike = !set.has(slug);
  const count = await sbRpc("toggle_artwork_like", { p_slug: slug, p_like: willLike });
  if (count === null) return null;
  if (willLike) set.add(slug); else set.delete(slug);
  saveLikedSet(set);
  return { liked: willLike, count };
}
