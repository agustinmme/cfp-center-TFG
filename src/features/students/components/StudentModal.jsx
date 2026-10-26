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

function StudentModal({ onClose, onSubmit, isSaving = false }) {
  const [backendError, setBackendError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' })
  const isBusy = isSaving || isSubmitting

  async function handleFormSubmit(values) {
    setBackendError('')

    try {
      await onSubmit(values)
    } catch (error) {
      setBackendError(error instanceof Error ? error.message : 'No se pudo registrar el estudiante.')
      throw error
    }
  }

  function handleClose() {
    if (!isBusy) onClose()
  }

  return (
    <Modal
      title="Registrar estudiante"
      description="Completá los datos para agregar un nuevo estudiante."
      titleId="student-modal-title"
      onClose={handleClose}
      as="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      footer={(
        <>
          <Button variant="secondary" onClick={handleClose} disabled={isBusy}>Cancelar</Button>
          <Button type="submit" disabled={isBusy}>{isBusy ? 'Guardando...' : 'Guardar estudiante'}</Button>
        </>
      )}
    >
      <StudentFieldset title="DATOS PERSONALES">
        <div className="row g-3">
          <StudentField name="nombre" label="Nombre" placeholder="Ej. Ana Lucía" register={register} error={errors.nombre} rules={{ required: 'El nombre es obligatorio.' }} />
          <StudentField name="apellido" label="Apellido" placeholder="Ej. Pérez" register={register} error={errors.apellido} rules={{ required: 'El apellido es obligatorio.' }} />
          <StudentField name="dni" label="Número de documento" placeholder="Ej. 38452901" register={register} error={errors.dni} rules={{ required: 'El DNI es obligatorio.' }} />
          <StudentField name="fecha_nacimiento" label="Fecha de nacimiento" type="date" register={register} error={errors.fecha_nacimiento} rules={{ required: 'La fecha de nacimiento es obligatoria.' }} />
          <StudentField name="genero" label="Género" type="select" options={genderOptions} register={register} error={errors.genero} rules={{ required: 'El genero es obligatorio.' }} />
        </div>
      </StudentFieldset>
      <StudentFieldset title="CONTACTO (OPCIONALES)">
        <div className="row g-3">
          <StudentField name="email" label="Email" type="email" placeholder="correo@ejemplo.com" register={register} error={errors.email} rules={{ pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Ingresa un email valido.' } }} />
          <StudentField name="telefono" label="Teléfono / WhatsApp" placeholder="Ej. 221 555-0123" register={register} error={errors.telefono} />
          <div className="col-12"><StudentField name="direccion" label="Domicilio" placeholder="Ej. Calle 12 123" register={register} error={errors.direccion} /></div>
        </div>
      </StudentFieldset>
      {backendError && <p role="alert" style={{ margin: 0, color: theme.login.error, fontSize: '12px' }}>{backendError}</p>}
    </Modal>
  )
}

function StudentFieldset({ title, children }) {
  return <fieldset className="border-0 m-0 p-0"><legend style={{ width: '100%', padding: '0 0 6px', marginBottom: '14px', borderBottom: `1px solid ${theme.table.border}`, color: theme.button.primaryBackground, fontSize: '11px', fontWeight: 700, letterSpacing: '.1em' }}>{title}</legend>{children}</fieldset>
}

function StudentField({ name, label, type = 'text', placeholder, options, register, rules, error }) {
  const inputStyle = { ...fieldStyle, width: '100%', ...(error ? { borderColor: theme.login.error } : {}) }
  const fieldProps = {
    id: name,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${name}-error` : undefined,
    ...register(name, rules),
  }

  return (
    <label className="col-6 d-flex flex-column gap-2" style={{ fontSize: '12px', fontWeight: 600 }} htmlFor={name}>
      {label}
      {type === 'select' ? (
        <select {...fieldProps} style={inputStyle}>
          <option value="">Seleccioná una opción</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      ) : <input {...fieldProps} type={type} placeholder={placeholder} style={inputStyle} />}
      {error && <span id={`${name}-error`} style={{ color: theme.login.error, fontSize: '11px', fontWeight: 400 }}>{error.message}</span>}
    </label>
  )
}

export default StudentModal
