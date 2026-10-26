import { supabase } from '../client.js'

const studentSelect = `
  id,
  nombre,
  apellido,
  dni,
  fecha_nacimiento,
  genero,
  telefono,
  email,
  direccion,
  inscripciones (
    id,
    fecha_inscripcion,
    estado_inscripcion,
    comisiones (
      id,
      cursos (id, nombre)
    )
  )
`

function getLatestEnrollment(enrollments = []) {
  return [...(Array.isArray(enrollments) ? enrollments : [])].sort((first, second) => {
    const dateDifference = new Date(second.fecha_inscripcion) - new Date(first.fecha_inscripcion)
    if (dateDifference !== 0) return dateDifference
    return Number(second.id) - Number(first.id)
  })[0]
}

function getRelatedRecord(record) {
  return Array.isArray(record) ? record[0] : record
}

function getStudentErrorMessage(error, action = 'registrar') {
  if (error?.code === '23505' || error?.message?.toLowerCase().includes('duplicate key')) {
    return 'Ya existe un estudiante con ese DNI.'
  }

  if (error?.code === '22P02') {
    return 'El genero seleccionado no es valido.'
  }

  if (error?.code === '23502') {
    return 'Completa todos los campos obligatorios.'
  }

  if (error?.code === '42501') {
    return `No tenes permisos para ${action} estudiantes.`
  }

  return `No se pudo ${action} el estudiante.`
}

export async function getStudents() {
  if (!supabase) {
    throw new Error('Supabase no esta configurado.')
  }

  const { data, error } = await supabase
    .from('estudiantes')
    .select(studentSelect)
    .order('apellido')
    .order('nombre')

  if (error) throw new Error('No se pudieron obtener los estudiantes.', { cause: error })

  return (data ?? []).map((student) => {
    const latestEnrollment = getLatestEnrollment(student.inscripciones)
    const commission = getRelatedRecord(latestEnrollment?.comisiones)
    const course = getRelatedRecord(commission?.cursos)

    return {
      id: student.id,
      nombre: student.nombre,
      apellido: student.apellido,
      dni: student.dni,
      name: [student.nombre, student.apellido].filter(Boolean).join(' '),
      document: student.dni ? `DNI ${student.dni}` : '-',
      course: course?.nombre || '-',
      status: latestEnrollment?.estado_inscripcion || '-',
      fecha_nacimiento: student.fecha_nacimiento,
      genero: student.genero,
      phone: student.telefono,
      email: student.email,
      direccion: student.direccion,
    }
  })
}

export async function createStudent(student) {
  if (!supabase) {
    throw new Error('Supabase no esta configurado.')
  }

  const payload = {
    nombre: student.nombre,
    apellido: student.apellido,
    dni: String(student.dni ?? '').replace(/[.\s-]/g, ''),
    fecha_nacimiento: student.fecha_nacimiento,
    genero: student.genero,
  }

  for (const field of ['telefono', 'email', 'direccion']) {
    const value = String(student[field] ?? '').trim()
    if (value) payload[field] = value
  }

  const { data, error } = await supabase
    .from('estudiantes')
    .insert(payload)
    .select('id, nombre, apellido, dni, fecha_nacimiento, genero, telefono, email, direccion')
    .single()

  if (error) throw new Error(getStudentErrorMessage(error), { cause: error })

  return data
}

export async function updateStudent(student) {
  if (!supabase) {
    throw new Error('Supabase no esta configurado.')
  }

  const payload = {
    nombre: student.nombre,
    apellido: student.apellido,
    dni: String(student.dni ?? '').replace(/[.\s-]/g, ''),
    fecha_nacimiento: student.fecha_nacimiento,
    genero: student.genero,
    telefono: String(student.telefono ?? '').trim() || null,
    email: String(student.email ?? '').trim() || null,
    direccion: String(student.direccion ?? '').trim() || null,
  }

  const { data, error } = await supabase
    .from('estudiantes')
    .update(payload)
    .eq('id', student.id)
    .select('id, nombre, apellido, dni, fecha_nacimiento, genero, telefono, email, direccion')
    .single()

  if (error) throw new Error(getStudentErrorMessage(error, 'actualizar'), { cause: error })

  return data
}
