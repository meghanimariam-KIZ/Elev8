-- ELEV8 initial schema: product records + brand/publishing settings.
-- Run this in the Supabase Dashboard SQL Editor (see the PR description /
-- final report for exact steps).

create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  product_name text,
  category text,
  price numeric,
  brand_name text,
  brand_style text,
  target_audience text,
  image_url text,
  created_at timestamptz not null default now()
);

-- One row per brand/owner. There's no auth/users table yet, so this is a
-- simple singleton: the app reads/updates whichever row exists (or creates
-- the first one) rather than scoping by an owner_id.
create table if not exists public.brand_settings (
  id uuid primary key default gen_random_uuid(),
  instagram_business_account_id text,
  facebook_page_id text,
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.brand_settings enable row level security;

-- NOTE: These policies are intentionally permissive (any anon/public
-- request can read and write) because this app doesn't have auth wired up
-- yet. TIGHTEN THESE once auth exists — e.g. scope rows by owner_id /
-- auth.uid() and drop the blanket "anon" grants below.
create policy "products: allow all (anon) - tighten after auth"
  on public.products
  for all
  to anon
  using (true)
  with check (true);

create policy "brand_settings: allow all (anon) - tighten after auth"
  on public.brand_settings
  for all
  to anon
  using (true)
  with check (true);
