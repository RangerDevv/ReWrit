import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://ckariqslgkqwrtoluiqf.supabase.co'
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrYXJpcXNsZ2txd3J0b2x1aXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU3Nzk0NzUsImV4cCI6MTk5MTM1NTQ3NX0.pT33DWZ5fPgS2LoBjQGYKk8j8928RhmTHtxUI4ywlD4"
export const supabase = createClient(supabaseUrl, key)

const isOptionalChainingSupported = () => {
    try {
      eval('const foo = {}; foo?.bar');
    } catch {
      return false;
    }
  
    return true;
  }
  
  try {
    supabase.auth.onAuthStateChange((event, session) => {
      try {
        if ((event === 'SIGNED_OUT' || event === 'USER_DELETED') && typeof document !== "undefined") {
          // delete cookies on sign out
          const expires = new Date(0).toUTCString()
          document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`
          document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires
          document.cookie = `my-access-token=${session!.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
          document.cookie = `my-refresh-token=${session!.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
        }
      } catch (e) {
        console.log(e)
      }
    })
  } catch {
  }