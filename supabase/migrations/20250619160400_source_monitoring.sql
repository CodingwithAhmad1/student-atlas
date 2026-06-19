-- Source monitoring pipeline: registry, snapshots, and change alerts.
-- Designed for: daily crawler -> AI drafting agent (MCP) -> human review -> publish.

-- ---------------------------------------------------------------------------
-- Enum types
-- ---------------------------------------------------------------------------

create type public.source_country as enum ('US', 'UK', 'AU');

create type public.source_category as enum (
  'visitor',
  'student',
  'work',
  'residency',
  'citizenship',
  'general'
);

create type public.change_alert_status as enum (
  'pending',
  'drafting',
  'review',
  'approved',
  'rejected'
);

-- ---------------------------------------------------------------------------
-- monitored_sources — URLs to watch (mirrors frontend source-registry.ts)
-- ---------------------------------------------------------------------------

create table public.monitored_sources (
  id          text primary key,
  url         text not null,
  country     public.source_country not null,
  category    public.source_category not null,
  label       text not null,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

create index monitored_sources_country_idx on public.monitored_sources (country);
create index monitored_sources_category_idx on public.monitored_sources (category);
create index monitored_sources_is_active_idx on public.monitored_sources (is_active);

comment on table public.monitored_sources is
  'Registry of government URLs monitored for policy changes. Seeded from frontend/src/data/source-registry.ts.';

-- ---------------------------------------------------------------------------
-- source_snapshots — historical page snapshots for diffing
-- ---------------------------------------------------------------------------

create table public.source_snapshots (
  id            uuid primary key default gen_random_uuid(),
  source_id     text not null references public.monitored_sources (id) on delete cascade,
  content_hash  text not null,
  fetched_at    timestamptz not null default now(),
  content_text  text
);

create index source_snapshots_source_id_idx on public.source_snapshots (source_id);
create index source_snapshots_fetched_at_idx on public.source_snapshots (fetched_at desc);

comment on table public.source_snapshots is
  'Point-in-time snapshots of monitored source pages. Crawler writes here; agent diffs old vs new.';

-- ---------------------------------------------------------------------------
-- change_alerts — detected changes awaiting review
-- ---------------------------------------------------------------------------

create table public.change_alerts (
  id                  uuid primary key default gen_random_uuid(),
  source_id           text not null references public.monitored_sources (id) on delete cascade,
  old_snapshot_id     uuid references public.source_snapshots (id) on delete set null,
  new_snapshot_id     uuid references public.source_snapshots (id) on delete set null,
  detected_at         timestamptz not null default now(),
  status              public.change_alert_status not null default 'pending',
  agent_draft         jsonb,
  agent_explanation   text,
  reviewer_notes      text,
  reviewed_by         text,
  reviewed_at         timestamptz,
  published_at        timestamptz
);

create index change_alerts_source_id_idx on public.change_alerts (source_id);
create index change_alerts_status_idx on public.change_alerts (status);
create index change_alerts_detected_at_idx on public.change_alerts (detected_at desc);

comment on table public.change_alerts is
  'Change alerts from crawler through AI drafting to human review. Agent writes drafts; admin portal manages status.';

-- ---------------------------------------------------------------------------
-- Row Level Security — service role only until admin auth is implemented
-- ---------------------------------------------------------------------------

alter table public.monitored_sources enable row level security;
alter table public.source_snapshots enable row level security;
alter table public.change_alerts enable row level security;

-- No public policies yet. Crawler, MCP agent, and admin portal use service_role.
-- Add authenticated admin policies when the review portal is built.
