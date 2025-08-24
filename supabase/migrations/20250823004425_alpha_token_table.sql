create table if not exists "public"."alpha_tokens" (
    "id" uuid not null primary key default gen_random_uuid(),
    "user_id" uuid references "public"."profiles" (id) on delete cascade,
    "created_at" timestamptz not null default now()
);

alter table "public"."alpha_tokens" enable row level security;
