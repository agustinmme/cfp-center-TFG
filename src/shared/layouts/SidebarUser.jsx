import { LogOut } from 'lucide-react'
import colors from '../theme/colors.js'

function getInitials(name, email) {
  if (name) return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
  return email?.slice(0, 2).toUpperCase() || 'US'
}

function SidebarUser({ user, profile, onSignOut }) {
  const email = user?.email || 'Usuario'
  const fullName = [profile?.nombre, profile?.apellido].filter(Boolean).join(' ').trim()
  const displayName = fullName || email
  const role = profile?.rol || 'Usuario'

  return (
    <div
      className="rounded-2 d-flex align-items-center gap-2 mt-auto p-2"
      style={{ backgroundColor: colors.sidebar.userBackground, color: colors.white }}
    >
      <span className="rounded-circle d-grid align-items-center justify-content-center fw-bold" style={{ width: '22px', height: '22px', backgroundColor: colors.sidebar.userAccent, color: colors.sidebar.background, fontSize: '8px' }}>
        {getInitials(fullName, user?.email)}
      </span>
      <span className="flex-grow-1 min-w-0">
        <strong className="d-block text-truncate" style={{ maxWidth: '175px', fontSize: '10px' }}>{displayName}</strong>
        <small className="d-block text-truncate" style={{ maxWidth: '175px', color: colors.sidebar.userMutedText, fontSize: '8px' }}>{role}</small>
      </span>
      <button
        className="btn btn-link text-white p-0"
        onClick={onSignOut}
        type="button"
        aria-label={`Cerrar sesion de ${email}`}
        title="Cerrar sesion"
      >
        <LogOut size={16} strokeWidth={1.6} aria-hidden="true" />
      </button>
    </div>
  )
}

export default SidebarUser
