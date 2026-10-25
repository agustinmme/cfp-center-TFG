import { supabase } from '../client.js'

export async function getCentroById(centroId) {
  if (!supabase) {
    throw new Error('Supabase no esta configurado.')
  }

  const { data, error } = await supabase
    .from('centro')
    .select('id, nombre')
    .eq('id', centroId)
    .single()

  if (error) throw new Error('No se pudo obtener el centro.', { cause: error })
  return data
}

export async function updateCentroNombre(centroId, nombre) {
  if (!supabase) {
    throw new Error('Supabase no esta configurado.')
  }

  const { data, error } = await supabase
    .from('centro')
    .update({ nombre })
    .eq('id', centroId)
    .select('id, nombre')
    .single()

  if (error) throw new Error('No se pudo actualizar el nombre del centro.', { cause: error })
  return data
}
