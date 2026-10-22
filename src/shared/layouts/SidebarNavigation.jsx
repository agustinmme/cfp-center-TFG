import { navigationGroups } from '../constants/navigation.js'

function SidebarNavigation({ currentPage }) {
  return (
    <>
      {navigationGroups.map((group) => (
        <div className="mb-4" key={group.label}>
          <div className="px-2 mb-2 fw-semibold" style={{ color: '#86a3b0', fontSize: '8.5px', letterSpacing: '1.4px' }}>
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
                  style={{
                    color: active ? '#fff' : '#cfe0e8',
                    backgroundColor: active ? '#2a5368' : 'transparent',
                    boxShadow: active ? 'inset 2px 0 0 #d9a24c' : 'none',
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
