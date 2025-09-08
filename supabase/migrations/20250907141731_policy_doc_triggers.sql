alter type "policy"."revocation_reasons" add value 'superseded';

create or replace function "policy"."revoke_old_consents_on_new_consent"()
returns trigger
language plpgsql
security definer
as $$
begin
    update "policy"."user_consents" 
    set 
        "revoked_at" = now(),
        "revocation_reason" = 'superseded'
    where 
        "user_id" = NEW."user_id"
        and "document_id" in (
            select pd."id" 
            from "policy"."policy_documents" pd
            where pd."document_type" = (
                select "document_type" 
                from "policy"."policy_documents" 
                where "id" = NEW."document_id"
            )
        )
        and "id" != NEW."id"
        and "revoked_at" is null;
    
    return NEW;
end;
$$;

create trigger "revoke_old_consents_trigger"
    after insert on "policy"."user_consents"
    for each row
    execute function "policy"."revoke_old_consents_on_new_consent"();

create or replace function "policy"."insert_document_hash"()
returns TRIGGER
language plpgsql
security definer
as $$
declare
    content_md5_hash text;
begin
    content_md5_hash := md5(new."content");
    
    insert into "policy"."policy_doc_hashes" ("document_id", "content_hash")
    values (new."id", content_md5_hash);
    
    return new;
end;
$$;

create trigger "insert_document_hash_trigger"
    after insert on "policy"."policy_documents"
    for each row
    execute function "policy"."insert_document_hash"();