import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "supabase/supabase.types";

export class BaseRepository {
  public supabase: SupabaseClient<Database>;

  constructor(supabase: SupabaseClient<Database>) {
    this.supabase = supabase;
  }
}
