import { getNavigationForRole } from '../constants/navigation.js'
import colors from '../theme/colors.js'

function SidebarNavigation({ currentPage, role, onPageChange }) {
  const navigationGroups = getNavigationForRole(role)

  return (
    <>
      {navigationGroups.map((group) => (
        <div className="mb-4" key={group.label}>
          <div className="px-2 mb-2 fw-semibold" style={{ color: colors.sidebar.mutedText, fontSize: '8.5px', letterSpacing: '1.4px' }}>
            {group.label}
          </div>
          <nav className="d-grid gap-1" aria-label={group.label}>
            {group.items.map(({ label, icon: Icon }) => {
              const active = label === currentPage

              return (
                <button
                  className="btn text-start d-flex align-items-center gap-2 border-0 rounded-2 px-2 py-2"
                  key={label}
                  type="button"
                  aria-current={active ? 'page' : undefined}
                  onClick={() => onPageChange(label)}
                  style={{
                    color: active ? colors.white : colors.sidebar.text,
                    backgroundColor: active ? colors.sidebar.activeBackground : 'transparent',
                    boxShadow: active ? `inset 2px 0 0 ${colors.sidebar.activeIndicator}` : 'none',
                    fontSize: '11px',
                  }}
                >
                  <Icon size={16} strokeWidth={1.6} aria-hidden="true" />
                  {label}
                </button>
              )
            })}
          </nav>
        </div>
      ))}
    </>
  )
}

export default SidebarNavigation
