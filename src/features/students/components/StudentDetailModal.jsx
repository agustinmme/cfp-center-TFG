import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../shared/components/Buttons/Button.jsx'
import Modal from '../../../shared/components/Modal/Modal.jsx'
import theme from '../../../shared/theme/index.js'

const fieldStyle = {
  height: '44px',
  padding: '0 12px',
  border: `1px solid ${theme.login.border}`,
  borderRadius: '6px',
  backgroundColor: theme.login.inputBackground,
  color: theme.text,
  fontSize: '13px',
}

const genderOptions = ['Masculino', 'Femenino', 'Otro']

function StudentDetailModal({ student, onClose, onUpdate, isSaving = false }) {
  const [isEditing, setIsEditing] = useState(false)
  const [backendError, setBackendError] = useState('')
  const defaultValues = {
    nombre: student.nombre || '',
    apellido: student.apellido || '',
    dni: student.dni || '',
    fecha_nacimiento: student.fecha_nacimiento || '',
    genero: student.genero || '',
    email: student.email || '',
    telefono: student.phone || '',
    direccion: student.direccion || '',
  }
  const { register, reset, handleSubmit, formState: { isSubmitting } } = useForm({ defaultValues })
  const isBusy = isSaving || isSubmitting

  async function handleFormSubmit(values) {
    setBackendError('')

    try {
      await onUpdate({ ...values, id: student.id })
    } catch (error) {
      setBackendError(error instanceof Error ? error.message : 'No se pudo actualizar el estudiante.')
      throw error
    }
  }

  function handleClose() {
    if (!isBusy) onClose()
  }

  return (
    <Modal
      title="Datos del estudiante"
      description="Consultá la información registrada del estudiante."
      titleId="student-detail-modal-title"
      onClose={handleClose}
      as="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      footer={(
        isEditing ? (
          <>
            <Button
              variant="secondary"
              onClick={() => {
                reset(defaultValues)
                setBackendError('')
                setIsEditing(false)
              }}
              disabled={isBusy}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isBusy}>{isBusy ? 'Guardando...' : 'Aceptar'}</Button>
          </>
        ) : <Button onClick={() => setIsEditing(true)} disabled={isBusy}>Editar</Button>
      )}
    >
      <StudentFieldset title="DATOS PERSONALES">
        <div className="row g-3">
           <StudentField name="nombre" label="Nombre" register={register} disabled={!isEditing || isBusy} />
           <StudentField name="apellido" label="Apellido" register={register} disabled={!isEditing || isBusy} />
           <StudentField name="dni" label="Número de documento" register={register} disabled={!isEditing || isBusy} />
           <StudentField name="fecha_nacimiento" label="Fecha de nacimiento" type="date" register={register} disabled={!isEditing || isBusy} />
           <StudentField name="genero" label="Género" type="select" options={genderOptions} register={register} disabled={!isEditing || isBusy} />
        </div>
      </StudentFieldset>
      <StudentFieldset title="CONTACTO (OPCIONALES)">
        <div className="row g-3">
           <StudentField name="email" label="Email" type="email" register={register} disabled={!isEditing || isBusy} />
           <StudentField name="telefono" label="Teléfono / WhatsApp" register={register} disabled={!isEditing || isBusy} />
           <div className="col-12"><StudentField name="direccion" label="Domicilio" register={register} disabled={!isEditing || isBusy} /></div>
        </div>
      </StudentFieldset>
      {backendError && <p role="alert" style={{ margin: 0, color: theme.login.error, fontSize: '12px' }}>{backendError}</p>}
    </Modal>
  )
}

function StudentFieldset({ title, children }) {
  return <fieldset className="border-0 m-0 p-0"><legend style={{ width: '100%', padding: '0 0 6px', marginBottom: '14px', borderBottom: `1px solid ${theme.table.border}`, color: theme.button.primaryBackground, fontSize: '11px', fontWeight: 700, letterSpacing: '.1em' }}>{title}</legend>{children}</fieldset>
}

function StudentField({ name, label, type = 'text', options, register, disabled }) {
  const fieldProps = { id: `student-detail-${name}`, disabled, ...register(name) }

  return (
    <label className="col-6 d-flex flex-column gap-2" style={{ fontSize: '12px', fontWeight: 600 }} htmlFor={fieldProps.id}>
      {label}
      {type === 'select' ? (
        <select {...fieldProps} style={{ ...fieldStyle, width: '100%' }}>
          <option value="">Sin datos</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      ) : <input {...fieldProps} type={type} style={{ ...fieldStyle, width: '100%' }} />}
    </label>
  )
}

export default StudentDetailModal
