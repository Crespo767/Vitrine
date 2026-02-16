
import { createClient } from "@supabase/supabase-js";

// Hardcoded for this demo as requested. In production, use environment variables.
const supabaseUrl = "https://lshdarzzxrsidmuwnzhf.supabase.co";
const supabaseKey = "sb_publishable_-5uqQUaKq6GHGBeLrGDslg_jwTq6Y_s";

export const supabase = createClient(supabaseUrl, supabaseKey);
