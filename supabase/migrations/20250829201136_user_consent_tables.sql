create type "public"."policy_doc_types" as enum ('T&C', 'cookies', 'privacy', 'disclaimer');

create table "public"."policy_doc_hashes" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "document_id" uuid not null default gen_random_uuid(),
    "content_hash" text not null
);


alter table "public"."policy_doc_hashes" enable row level security;

create table "public"."policy_documents" (
    "id" uuid not null default gen_random_uuid(),
    "version" text not null,
    "created_at" timestamp with time zone not null default now(),
    "document_type" policy_doc_types not null,
    "effective_from" timestamp with time zone not null,
    "superseded_at" timestamp with time zone,
    "content" text not null
);

create type "public"."revocation_reasons" as enum ('user_request', 'account_deletion', 'other');
create type "public"."consent_methods" as enum ('checkbox', 'button_clicked');

alter table "public"."policy_documents" enable row level security;

create table "public"."user_consents" (
    "id" uuid not null default gen_random_uuid(),
    "consented_at" timestamp with time zone not null default now(),
    "consent_method" consent_methods not null,
    "user_id" uuid not null default auth.uid(),
    "document_id" uuid not null default gen_random_uuid(),
    "revoked_at" timestamp with time zone,
    "revocation_reason" revocation_reasons,
    "ip_address" bigint not null,
    "user_agent" text not null
);

-- Remove all update rights for the user consents table
revoke update on "public"."user_consents" from authenticated, anon;

-- Grant the rights to only update the revoked_at and revocation_reason fields
GRANT update (revoked_at, revocation_reason) on "public"."user_consents" to authenticated;

alter table "public"."user_consents" enable row level security;

CREATE UNIQUE INDEX policy_doc_hashes_pkey ON public.policy_doc_hashes USING btree (id);

CREATE UNIQUE INDEX policy_documents_pkey ON public.policy_documents USING btree (id);

CREATE UNIQUE INDEX user_consents_ip_address_key ON public.user_consents USING btree (ip_address);

CREATE UNIQUE INDEX user_consents_pkey ON public.user_consents USING btree (id);

alter table "public"."policy_doc_hashes" add constraint "policy_doc_hashes_pkey" PRIMARY KEY using index "policy_doc_hashes_pkey";

alter table "public"."policy_documents" add constraint "policy_documents_pkey" PRIMARY KEY using index "policy_documents_pkey";

alter table "public"."user_consents" add constraint "user_consents_pkey" PRIMARY KEY using index "user_consents_pkey";

alter table "public"."policy_doc_hashes" add constraint "policy_doc_hashes_document_id_fkey" FOREIGN KEY (document_id) REFERENCES policy_documents(id) ON UPDATE RESTRICT ON DELETE RESTRICT not valid;

alter table "public"."policy_doc_hashes" validate constraint "policy_doc_hashes_document_id_fkey";

alter table "public"."user_consents" add constraint "user_consents_document_id_fkey" FOREIGN KEY (document_id) REFERENCES policy_documents(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_consents" validate constraint "user_consents_document_id_fkey";

alter table "public"."user_consents" add constraint "user_consents_ip_address_key" UNIQUE using index "user_consents_ip_address_key";
grant delete on table "public"."policy_doc_hashes" to "anon";
grant insert on table "public"."policy_doc_hashes" to "anon";
grant references on table "public"."policy_doc_hashes" to "anon";
grant select on table "public"."policy_doc_hashes" to "anon";
grant trigger on table "public"."policy_doc_hashes" to "anon";
grant truncate on table "public"."policy_doc_hashes" to "anon";
grant update on table "public"."policy_doc_hashes" to "anon";
grant delete on table "public"."policy_doc_hashes" to "authenticated";
grant insert on table "public"."policy_doc_hashes" to "authenticated";
grant references on table "public"."policy_doc_hashes" to "authenticated";
grant select on table "public"."policy_doc_hashes" to "authenticated";
grant trigger on table "public"."policy_doc_hashes" to "authenticated";
grant truncate on table "public"."policy_doc_hashes" to "authenticated";
grant update on table "public"."policy_doc_hashes" to "authenticated";
grant delete on table "public"."policy_doc_hashes" to "service_role";
grant insert on table "public"."policy_doc_hashes" to "service_role";
grant references on table "public"."policy_doc_hashes" to "service_role";
grant select on table "public"."policy_doc_hashes" to "service_role";
grant trigger on table "public"."policy_doc_hashes" to "service_role";
grant truncate on table "public"."policy_doc_hashes" to "service_role";
grant update on table "public"."policy_doc_hashes" to "service_role";
grant delete on table "public"."policy_documents" to "anon";
grant insert on table "public"."policy_documents" to "anon";
grant references on table "public"."policy_documents" to "anon";
grant select on table "public"."policy_documents" to "anon";
grant trigger on table "public"."policy_documents" to "anon";
grant truncate on table "public"."policy_documents" to "anon";
grant update on table "public"."policy_documents" to "anon";
grant delete on table "public"."policy_documents" to "authenticated";
grant insert on table "public"."policy_documents" to "authenticated";
grant references on table "public"."policy_documents" to "authenticated";
grant select on table "public"."policy_documents" to "authenticated";
grant trigger on table "public"."policy_documents" to "authenticated";
grant truncate on table "public"."policy_documents" to "authenticated";
grant update on table "public"."policy_documents" to "authenticated";
grant delete on table "public"."policy_documents" to "service_role";
grant insert on table "public"."policy_documents" to "service_role";
grant references on table "public"."policy_documents" to "service_role";
grant select on table "public"."policy_documents" to "service_role";
grant trigger on table "public"."policy_documents" to "service_role";
grant truncate on table "public"."policy_documents" to "service_role";
grant update on table "public"."policy_documents" to "service_role";
grant delete on table "public"."user_consents" to "anon";
grant insert on table "public"."user_consents" to "anon";
grant references on table "public"."user_consents" to "anon";
grant select on table "public"."user_consents" to "anon";
grant trigger on table "public"."user_consents" to "anon";
grant truncate on table "public"."user_consents" to "anon";
grant update on table "public"."user_consents" to "anon";
grant delete on table "public"."user_consents" to "authenticated";
grant insert on table "public"."user_consents" to "authenticated";
grant references on table "public"."user_consents" to "authenticated";
grant select on table "public"."user_consents" to "authenticated";
grant trigger on table "public"."user_consents" to "authenticated";
grant truncate on table "public"."user_consents" to "authenticated";
grant update on table "public"."user_consents" to "authenticated";
grant delete on table "public"."user_consents" to "service_role";
grant insert on table "public"."user_consents" to "service_role";
grant references on table "public"."user_consents" to "service_role";
grant select on table "public"."user_consents" to "service_role";
grant trigger on table "public"."user_consents" to "service_role";
grant truncate on table "public"."user_consents" to "service_role";
grant update on table "public"."user_consents" to "service_role";

create policy "Enable insert for authenticated users only"
on "public"."policy_doc_hashes"
as permissive
for insert
to postgres
with check (true);


create policy "Enable read access for admins"
on "public"."policy_doc_hashes"
as permissive
for select
to postgres, supabase_admin
using (true);


create policy "Enable insert for postgres users only"
on "public"."policy_documents"
as permissive
for insert
to postgres
with check (true);


create policy "Enable read access for all users"
on "public"."policy_documents"
as permissive
for select
to public
using (true);


create policy "Enable update for postgres users only"
on "public"."policy_documents"
as permissive
for update
to postgres
using (true);


create policy "Enable users to update revoked_at and revocation_reason"
on "public"."user_consents"
as restrictive
for update
to authenticated
using ((auth.uid() = user_id));


create policy "Enable users to view their own data only"
on "public"."user_consents"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));