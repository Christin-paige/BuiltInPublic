create type "public"."profile_visibility" as enum ('public', 'platform', 'private');

alter table "public"."profiles" add column "visibility" "public"."profile_visibility" not null default 'platform';

drop policy if exists "Anyone can view auth users" ON "auth"."users";
drop policy if exists "Allow insert for authenticated users" on "public"."profiles";
drop policy if exists "authenticated users can read profiles" on "public"."profiles";

create policy "Anyone can view public profiles" on "public"."profiles" for select using (visibility = 'public');
create policy "Any authenticated user can view platform profiles" on "public"."profiles" for select to authenticated using (visibility = 'platform');
create policy "Authenticated users can view their own profiles" on "public"."profiles" for select using (auth.uid() = id);
