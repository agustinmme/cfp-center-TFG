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

function ModuleModal({ onClose, onSubmit, isSaving = false }) {
  const [backendError, setBackendError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' })
  const isBusy = isSaving || isSubmitting

  function handleClose() {
    if (!isBusy) onClose()
  }

  async function handleFormSubmit(values) {
    setBackendError('')

    try {
      await onSubmit({
        codigo: values.code,
        nombre: values.name,
        cantidad_horas: values.hours,
      })
    } catch (error) {
      setBackendError(error instanceof Error ? error.message : 'No se pudo registrar el modulo.')
      throw error
    }
  }

  return (
    <Modal
      title="Agregar modulo"
      description="Completa los datos para agregar un nuevo modulo."
      titleId="module-modal-title"
      onClose={handleClose}
      as="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      footer={(
        <>
          <Button variant="secondary" onClick={handleClose} disabled={isBusy}>Cancelar</Button>
          <Button type="submit" disabled={isBusy}>{isBusy ? 'Guardando...' : 'Guardar modulo'}</Button>
        </>
      )}
    >
      <fieldset className="border-0 m-0 p-0">
        <legend style={{ width: '100%', padding: '0 0 6px', marginBottom: '14px', borderBottom: `1px solid ${theme.table.border}`, color: theme.button.primaryBackground, fontSize: '11px', fontWeight: 700, letterSpacing: '.1em' }}>
          DATOS DEL MODULO
        </legend>
        <div className="row g-3">
          <ModuleField name="name" label="Nombre" placeholder="Ej. Carpinteria Naval" register={register} error={errors.name} rules={{ required: 'El nombre es obligatorio.' }} />
          <ModuleField name="code" label="Codigo" placeholder="Ej. AP0015.2" register={register} error={errors.code} rules={{ required: 'El codigo es obligatorio.' }} />
          <ModuleField name="hours" label="Horas" type="number" placeholder="Ej. 45" register={register} error={errors.hours} rules={{ required: 'Las horas son obligatorias.', valueAsNumber: true, min: { value: 1, message: 'Las horas deben ser mayores que cero.' }, validate: (value) => Number.isInteger(value) || 'Las horas deben ser un numero entero.' }} />
        </div>
      </fieldset>
      {backendError && <p role="alert" style={{ margin: 0, color: theme.login.error, fontSize: '12px' }}>{backendError}</p>}
     </Modal>
  )
}

function ModuleField({ name, label, type = 'text', placeholder, register, rules, error }) {
  const inputStyle = { ...fieldStyle, width: '100%', ...(error ? { borderColor: theme.login.error } : {}) }

  return (
    <label className="col-12 d-flex flex-column gap-2" style={{ fontSize: '12px', fontWeight: 600 }} htmlFor={name}>
      {label}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        {...register(name, rules)}
        style={inputStyle}
      />
      {error && <span id={`${name}-error`} style={{ color: theme.login.error, fontSize: '11px', fontWeight: 400 }}>{error.message}</span>}
    </label>
  )
}

export default ModuleModal
