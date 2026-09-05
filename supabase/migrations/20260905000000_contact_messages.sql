-- Contact form submissions. Written only by the server (service role);
-- nothing on the client can read or write this table.
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text,
  service text not null,
  budget text not null,
  message text not null,
  ip text,
  handled_at timestamptz
);

alter table public.contact_messages enable row level security;

-- No policies on purpose: with RLS enabled and no policies, only the
-- service role (which bypasses RLS) can access rows.
create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);
