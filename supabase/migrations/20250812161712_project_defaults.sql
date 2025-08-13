alter table "public"."projects" alter column "visibility" set default 'private';
alter table "public"."projects" rename column "repo_url" to "external_url";
