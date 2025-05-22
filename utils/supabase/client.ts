// utils/supabase/client.ts
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../supabase/supabase.types";
import { createBrowserClient } from "@supabase/ssr";

const supabaseClient: SupabaseClient<Database> = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default supabaseClient;
