import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export function createServiceClient(): SupabaseClient<Database> {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-key",
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
