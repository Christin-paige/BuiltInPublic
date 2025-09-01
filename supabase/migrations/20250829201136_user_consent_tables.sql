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
grant references on table "policy"."policy_doc_hashes" to "anon";
grant select on table "policy"."policy_doc_hashes" to "anon";
grant truncate on table "policy"."policy_doc_hashes" to "anon";
grant references on table "policy"."policy_doc_hashes" to "authenticated";
grant select on table "policy"."policy_doc_hashes" to "authenticated";
grant trigger on table "policy"."policy_doc_hashes" to "authenticated";
grant truncate on table "policy"."policy_doc_hashes" to "authenticated";
grant delete on table "policy"."policy_doc_hashes" to "service_role";
grant insert on table "policy"."policy_doc_hashes" to "service_role";
grant references on table "policy"."policy_doc_hashes" to "service_role";
grant select on table "policy"."policy_doc_hashes" to "service_role";
grant trigger on table "policy"."policy_doc_hashes" to "service_role";
grant truncate on table "policy"."policy_doc_hashes" to "service_role";
grant update on table "policy"."policy_doc_hashes" to "service_role";
grant references on table "policy"."policy_documents" to "anon";
grant select on table "policy"."policy_documents" to "anon";
grant trigger on table "policy"."policy_documents" to "anon";
grant truncate on table "policy"."policy_documents" to "anon";
grant references on table "policy"."policy_documents" to "authenticated";
grant select on table "policy"."policy_documents" to "authenticated";
grant trigger on table "policy"."policy_documents" to "authenticated";
grant truncate on table "policy"."policy_documents" to "authenticated";
grant delete on table "policy"."policy_documents" to "service_role";
grant insert on table "policy"."policy_documents" to "service_role";
grant references on table "policy"."policy_documents" to "service_role";
grant select on table "policy"."policy_documents" to "service_role";
grant trigger on table "policy"."policy_documents" to "service_role";
grant truncate on table "policy"."policy_documents" to "service_role";
grant update on table "policy"."policy_documents" to "service_role";
grant delete on table "policy"."user_consents" to "anon";
grant insert on table "policy"."user_consents" to "anon";
grant references on table "policy"."user_consents" to "anon";
grant select on table "policy"."user_consents" to "anon";
grant trigger on table "policy"."user_consents" to "anon";
grant truncate on table "policy"."user_consents" to "anon";
grant update on table "policy"."user_consents" to "anon";
grant delete on table "policy"."user_consents" to "authenticated";
grant insert on table "policy"."user_consents" to "authenticated";
grant references on table "policy"."user_consents" to "authenticated";
grant select on table "policy"."user_consents" to "authenticated";
grant trigger on table "policy"."user_consents" to "authenticated";
grant truncate on table "policy"."user_consents" to "authenticated";
grant update on table "policy"."user_consents" to "authenticated";
grant delete on table "policy"."user_consents" to "service_role";
grant insert on table "policy"."user_consents" to "service_role";
grant references on table "policy"."user_consents" to "service_role";
grant select on table "policy"."user_consents" to "service_role";
grant trigger on table "policy"."user_consents" to "service_role";
grant truncate on table "policy"."user_consents" to "service_role";
grant update on table "policy"."user_consents" to "service_role";

create policy "Enable insert for authenticated users only"
on "policy"."policy_doc_hashes"
as permissive
for insert
to postgres
with check (true);


create policy "Enable read access for admins"
on "policy"."policy_doc_hashes"
as permissive
for select
to postgres, supabase_admin
using (true);


create policy "Enable insert for postgres users only"
on "policy"."policy_documents"
as permissive
for insert
to postgres
with check (true);


create policy "Enable read access for all users"
on "policy"."policy_documents"
as permissive
for select
to public
using (true);


create policy "Enable update for postgres users only"
on "policy"."policy_documents"
as permissive
for update
to postgres
using (true);


create policy "Enable users to update revoked_at and revocation_reason"
on "policy"."user_consents"
as restrictive
for update
to authenticated
using ((auth.uid() = user_id));


create policy "Enable users to view their own data only"
on "policy"."user_consents"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));