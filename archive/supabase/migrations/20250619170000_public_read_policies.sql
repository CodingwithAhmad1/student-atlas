-- Public read access and query views for the transparency portal.

-- ---------------------------------------------------------------------------
-- Views
-- ---------------------------------------------------------------------------

create view public.source_health with (security_invoker = true) as
select
  ms.id,
  ms.url,
  ms.country,
  ms.category,
  ms.label,
  ms.is_active,
  ms.created_at,
  snap.fetched_at as last_checked_at,
  snap.content_hash as last_content_hash,
  snap.id as last_snapshot_id
from public.monitored_sources ms
left join lateral (
  select id, fetched_at, content_hash
  from public.source_snapshots
  where source_id = ms.id
  order by fetched_at desc
  limit 1
) snap on true;

create view public.change_alerts_detail with (security_invoker = true) as
select
  ca.id,
  ca.source_id,
  ca.old_snapshot_id,
  ca.new_snapshot_id,
  ca.detected_at,
  ca.status,
  ca.agent_draft,
  ca.agent_explanation,
  ca.reviewer_notes,
  ca.reviewed_by,
  ca.reviewed_at,
  ca.published_at,
  ms.label as source_label,
  ms.url as source_url,
  ms.country,
  ms.category
from public.change_alerts ca
join public.monitored_sources ms on ms.id = ca.source_id;

grant select on public.source_health to anon, authenticated;
grant select on public.change_alerts_detail to anon, authenticated;

-- ---------------------------------------------------------------------------
-- RLS policies — public read-only
-- ---------------------------------------------------------------------------

create policy "Public read monitored_sources"
  on public.monitored_sources
  for select
  to anon, authenticated
  using (true);

create policy "Public read source_snapshots"
  on public.source_snapshots
  for select
  to anon, authenticated
  using (true);

create policy "Public read change_alerts"
  on public.change_alerts
  for select
  to anon, authenticated
  using (true);
