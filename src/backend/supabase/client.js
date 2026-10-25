import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
export const centroId = import.meta.env.VITE_CENTRO_ID

let supabase = null

if (supabaseUrl && supabasePublishableKey) {
  try {
    supabase = createClient(supabaseUrl, supabasePublishableKey)
  } catch (error) {
    console.error('No se pudo configurar Supabase', error)
  }
}

export const isSupabaseConfigured = Boolean(supabase)

export { supabase }
