-- Fairyteller — схема Supabase: счётчик визитов + лайки на работы
-- Выполнить целиком в Supabase Dashboard → SQL Editor → New query → Run

-- ============================================================
-- 1. Счётчик визитов сайта (одна строка-счётчик)
-- ============================================================

create table if not exists public.site_visits (
  id smallint primary key default 1,
  count bigint not null default 0,
  constraint site_visits_single_row check (id = 1)
);

insert into public.site_visits (id, count)
values (1, 0)
on conflict (id) do nothing;

-- Атомарный инкремент через RPC — фронтенд не может писать в таблицу напрямую,
-- только вызвать эту функцию. security definer = функция выполняется с правами
-- владельца (может писать в таблицу), даже если у вызывающего (anon) таких прав нет.
create or replace function public.increment_site_visits()
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count bigint;
begin
  update public.site_visits
  set count = count + 1
  where id = 1
  returning count into new_count;
  return new_count;
end;
$$;

alter table public.site_visits enable row level security;

-- Разрешаем всем читать текущее значение счётчика
create policy "Anyone can read visit count"
  on public.site_visits for select
  using (true);

-- Прямая запись в таблицу запрещена всем (нет policy для insert/update/delete) —
-- единственный путь изменить count — через increment_site_visits()
grant execute on function public.increment_site_visits() to anon, authenticated;


-- ============================================================
-- 2. Лайки на работы (по slug работы, см. assets/works/...)
-- ============================================================

create table if not exists public.artwork_likes (
  slug text primary key,
  like_count bigint not null default 0
);

-- Переключение лайка (like/unlike) через RPC — та же логика защиты, что и выше.
-- p_like = true увеличивает счётчик, false — уменьшает (не ниже 0).
create or replace function public.toggle_artwork_like(p_slug text, p_like boolean)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count bigint;
begin
  insert into public.artwork_likes (slug, like_count)
  values (p_slug, 0)
  on conflict (slug) do nothing;

  if p_like then
    update public.artwork_likes
    set like_count = like_count + 1
    where slug = p_slug
    returning like_count into new_count;
  else
    update public.artwork_likes
    set like_count = greatest(like_count - 1, 0)
    where slug = p_slug
    returning like_count into new_count;
  end if;

  return new_count;
end;
$$;

alter table public.artwork_likes enable row level security;

create policy "Anyone can read like counts"
  on public.artwork_likes for select
  using (true);

grant execute on function public.toggle_artwork_like(text, boolean) to anon, authenticated;
