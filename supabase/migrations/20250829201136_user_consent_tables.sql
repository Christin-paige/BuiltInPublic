create schema if not exists policy;

create type "policy"."policy_doc_types" as enum ('T&C', 'cookies', 'privacy', 'disclaimer');

create table "policy"."policy_documents" (
    "id" uuid not null primary key default gen_random_uuid(),
    "version" text not null,
    "created_at" timestamp with time zone not null default now(),
    "document_type" "policy"."policy_doc_types" not null,
    "effective_from" timestamp with time zone not null,
    "superseded_at" timestamp with time zone,
    "content" text not null
);

alter table "policy"."policy_documents" enable row level security;

create table "policy"."policy_doc_hashes" (
    "id" uuid not null primary key default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "document_id" uuid not null references "policy"."policy_documents"("id"),
    "content_hash" text not null
);

alter table "policy"."policy_doc_hashes" enable row level security;

create type "policy"."revocation_reasons" as enum ('user_request', 'account_deletion', 'other');
create type "policy"."consent_methods" as enum ('checkbox', 'button_clicked');

create table "policy"."user_consents" (
    "id" uuid not null primary key default gen_random_uuid(),
    "consented_at" timestamp with time zone not null default now(),
    "consent_method" "policy"."consent_methods" not null,
    "user_id" uuid not null default auth.uid() references "auth"."users"("id"),
    "document_id" uuid not null references "policy"."policy_documents"("id"),
    "revoked_at" timestamp with time zone,
    "revocation_reason" "policy"."revocation_reasons",
    "ip_address" inet not null,
    "user_agent" text not null
);

alter table "policy"."user_consents" enable row level security;

CREATE INDEX user_consents_user_id_document_id_idx ON policy.user_consents USING btree (user_id, document_id);

-- Create revokes and grants for tables
revoke all on table "public"."policy_doc_hashes" from anon, authenticated;
revoke all on table "public"."policy_documents" from anon, authenticated;
revoke all on table "public"."user_consents" from anon, authenticated;

grant select on table "public"."policy_documents" to anon, authenticated;
grant references on table "public"."policy_documents" to anon, authenticated;

grant select on table "public"."user_consents" to authenticated;
grant insert on table "public"."user_consents" to authenticated; 
grant update (revoked_at, revocation_reason) on table "public"."user_consents" to authenticated; 
grant references on table "public"."user_consents" to anon, authenticated; 

grant references on table "public"."policy_doc_hashes" to anon, authenticated;

-- Policies
create policy "Any user can select"
on "policy"."policy_documents"
for select
to anon, authenticated
using (true);

create policy "Authenticated user can select their own records"
on "policy"."user_consents"
for select
to authenticated
using (auth.uid() = user_id);

create policy "Authenticated user can insert consents"
on "policy"."user_consents"
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Authenticated user can revoke consent"
on "policy"."user_consents"
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);