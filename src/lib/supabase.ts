import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

if ((!supabaseUrl || !supabaseAnonKey) && !useMockData) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = useMockData
  ? null
  : createClient(
      supabaseUrl || "https://placeholder.supabase.co",
      supabaseAnonKey || "placeholder-key"
    );
