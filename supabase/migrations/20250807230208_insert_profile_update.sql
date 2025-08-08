alter table "public"."profiles" alter column "username" drop not null;

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
