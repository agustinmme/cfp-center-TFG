import { supabase } from '../client.js'

export async function getModules() {
  if (!supabase) {
    throw new Error('Supabase no esta configurado.')
  }

  const { data, error } = await supabase
    .from('modulos')
    .select('id, codigo, nombre, cantidad_horas')
    .order('codigo', { ascending: true })

  if (error) throw new Error('No se pudieron obtener los modulos.', { cause: error })

  return (data ?? []).map((module) => ({
    id: module.id,
    code: module.codigo,
    name: module.nombre,
    hours: module.cantidad_horas,
  }))
}

export async function createModule(module) {
  if (!supabase) {
    throw new Error('Supabase no esta configurado.')
  }

  const payload = {
    codigo: module.codigo,
    nombre: module.nombre,
    cantidad_horas: module.cantidad_horas,
  }

  const { data, error } = await supabase
    .from('modulos')
    .insert(payload)
    .select('id, codigo, nombre, cantidad_horas')
    .single()

  if (error) throw new Error('No se pudo registrar el modulo.', { cause: error })

  return data
}
