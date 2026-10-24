import Button from '../../../shared/components/Button.jsx'
import Legend from '../../../shared/components/Legend.jsx'
import theme from '../../../shared/theme/index.js'

function ConfigurationPage() {
  return (
    <div
      className="container-fluid d-flex flex-column gap-4"
      style={{ width: '100%', padding: '10px 40px 0' }}
    >
      <div>
        <span style={{ color: theme.login.eyebrow, fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em' }}>
          CENTRO DE FORMACIÓN PROFESIONAL
        </span>
        <h1 className="mb-0" style={{ color: theme.text, fontSize: '28px', lineHeight: 1.2, marginTop: '6px' }}>
          Configuración
        </h1>
      </div>

      <section
        style={{
          padding: '24px',
          backgroundColor: theme.login.surface,
          border: `1px solid ${theme.login.border}`,
          borderRadius: '8px',
          width: '50%'
        }}
      >
        <form className="d-flex flex-column gap-3" onSubmit={(event) => event.preventDefault()}>
          <fieldset className="d-flex flex-column gap-2 border-0 m-0 p-0">
            <Legend text="INSTITUCIÓN" />
            <p className="mb-0" style={{ color: theme.login.mutedText, fontSize: '12px', marginTop: '-4px' }}>
              Datos generales del centro
            </p>
            <label className="d-flex flex-column gap-1" style={{ color: theme.text, fontSize: '12px', fontWeight: 600 }}>
              Nombre
              <input
                type="text"
                defaultValue="Ing. Ubaldo Santilli"
                autoComplete="organization"
                style={{
                  width: '100%',
                  height: '44px',
                  padding: '0 12px',
                  border: `1px solid ${theme.login.border}`,
                  borderRadius: '6px',
                  backgroundColor: theme.login.inputBackground,
                  color: theme.text,
                  fontSize: '13px',
                  fontWeight: 400,
                }}
              />
            </label>
          </fieldset>

          <div className="d-flex align-items-center gap-3">
            <Button type="submit">Guardar cambios</Button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default ConfigurationPage
