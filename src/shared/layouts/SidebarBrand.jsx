import Logo from '../components/Logo.jsx'
import { useCentro } from '../hooks/useCentro.js'
import theme from '../theme/index.js'

function SidebarBrand() {
  const { data: centro, isError } = useCentro()
  const centroNombre = centro?.nombre || (isError ? 'Centro' : 'Cargando...')

  return (
    <div className="d-flex align-items-center gap-2 mb-4 px-1">
      <Logo size={44} />
      <div className="d-flex flex-column justify-content-between" style={{ height: '44px' }}>
        <strong className="text-white" style={{ fontSize: '27px', lineHeight: 1, transform: 'translateY(3px)' }}>402</strong>
        <span style={{ color: theme.sidebar.mutedText, fontSize: '11px', lineHeight: 1.2 }}>{centroNombre}</span>
      </div>
    </div>
  )
}

export default SidebarBrand
