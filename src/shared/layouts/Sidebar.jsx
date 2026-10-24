import SidebarBrand from './SidebarBrand.jsx'
import SidebarNavigation from './SidebarNavigation.jsx'
import SidebarUser from './SidebarUser.jsx'
import theme from '../theme/index.js'

function Sidebar({ currentPage, user, profile, onSignOut, onPageChange }) {
  return (
    <aside
      className="app-shell-aside position-fixed top-0 start-0 h-100 d-flex flex-column p-3"
      style={{ width: '265px', backgroundColor: theme.sidebar.background, color: theme.sidebar.text }}
      aria-label="Navegacion principal"
    >
      <SidebarBrand />
      <SidebarNavigation currentPage={currentPage} role={profile?.rol} onPageChange={onPageChange} />
      <SidebarUser user={user} profile={profile} onSignOut={onSignOut} />
    </aside>
  )
}

export default Sidebar
