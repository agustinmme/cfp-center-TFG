import { supabase } from '../../../backend/supabase/client.js'

export async function getCurrentUsuario(userId) {
  if (!supabase) {
    throw new Error('Supabase no esta configurado.')
  }

  const { data, error } = await supabase
    .from('usuarios')
    .select('nombre, apellido, rol')
    .eq('id', userId)
    .single()

  if (error) throw new Error('No se pudo obtener el usuario actual.', { cause: error })
  return data
}
