import { createClient } from "@supabase/supabase-js";
// Supabase configuration
const supabaseUrl = "https://muigfbzlygnkgiisfxrv.supabase.co";
// NOTE: It is safe to expose the anon key on the client side, but RLS policies must be in place.
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11aWdmYnpseWdua2dpaXNmeHJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwMTEyOTAsImV4cCI6MjA4NDU4NzI5MH0.gaTqjYswW9zbih0Ystyy2dcR8Q9qnXraoz1OpcWA2Ho";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
