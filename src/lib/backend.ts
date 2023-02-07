import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://ckariqslgkqwrtoluiqf.supabase.co'
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrYXJpcXNsZ2txd3J0b2x1aXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU3Nzk0NzUsImV4cCI6MTk5MTM1NTQ3NX0.pT33DWZ5fPgS2LoBjQGYKk8j8928RhmTHtxUI4ywlD4"
export const supabase = createClient(supabaseUrl, key)
