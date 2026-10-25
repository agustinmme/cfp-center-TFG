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

function StudentModal({ onClose }) {
  return (
    <Modal
      title="Registrar estudiante"
      description="Completá los datos para agregar un nuevo estudiante."
      titleId="student-modal-title"
      onClose={onClose}
      as="form"
      onSubmit={(event) => event.preventDefault()}
      footer={(
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit">Guardar estudiante</Button>
        </>
      )}
    >
      <StudentFieldset title="DATOS PERSONALES">
        <div className="row g-3">
          <StudentField label="Nombre" placeholder="Ej. Ana Lucía" />
          <StudentField label="Apellido" placeholder="Ej. Pérez" />
          <StudentField label="Número de documento" placeholder="Ej. 38.452.901" />
          <StudentField label="Fecha de nacimiento" type="date" />
          <StudentField label="Género" type="select" options={['Femenino', 'Masculino', 'Otro']} />
        </div>
      </StudentFieldset>
      <StudentFieldset title="CONTACTO (OPCIONALES)">
        <div className="row g-3">
          <StudentField label="Email" type="email" placeholder="correo@ejemplo.com" />
          <StudentField label="Teléfono / WhatsApp" placeholder="Ej. 221 555-0123" />
          <div className="col-12"><StudentField label="Domicilio" placeholder="Ej. Calle 12 123" /></div>
        </div>
      </StudentFieldset>
    </Modal>
  )
}

function StudentFieldset({ title, children }) {
  return <fieldset className="border-0 m-0 p-0"><legend style={{ width: '100%', padding: '0 0 6px', marginBottom: '14px', borderBottom: `1px solid ${theme.table.border}`, color: theme.button.primaryBackground, fontSize: '11px', fontWeight: 700, letterSpacing: '.1em' }}>{title}</legend>{children}</fieldset>
}

function StudentField({ label, type = 'text', placeholder, options }) {
  return <label className="col-6 d-flex flex-column gap-2" style={{ fontSize: '12px', fontWeight: 600 }}>{label}{type === 'select' ? <select style={{ ...fieldStyle, width: '100%' }}>{options.map((option) => <option key={option}>{option}</option>)}</select> : <input type={type} placeholder={placeholder} style={{ ...fieldStyle, width: '100%' }} />}</label>
}

export default StudentModal
