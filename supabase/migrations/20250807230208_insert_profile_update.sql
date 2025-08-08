-- allow nullable usernames, enforce lowercase usernames, add index to username
alter table "public"."profiles" alter column "username" drop not null;
alter table "public"."profiles" add constraint username_lowercase check (username = lower(username));
create unique index idx_profiles_username on public.profiles(username);

-- function inserts new profile with null username
CREATE OR REPLACE FUNCTION "public"."insert_profile_for_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    set search_path to ''
    AS $$
begin

  insert into public.profiles (id, username, avatar_url)
  values (
    new.id,
    null,
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  );
  return new;
end;
$$;

ALTER FUNCTION "public"."insert_profile_for_new_user"() OWNER TO "postgres";
