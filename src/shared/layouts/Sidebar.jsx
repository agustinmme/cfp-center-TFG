import SidebarBrand from './SidebarBrand.jsx'
import SidebarNavigation from './SidebarNavigation.jsx'
import SidebarUser from './SidebarUser.jsx'

function Sidebar({ currentPage, user, profile, onSignOut }) {
  return (
    <aside
      className="app-shell-aside position-fixed top-0 start-0 h-100 d-flex flex-column p-3"
      style={{ width: '265px', backgroundColor: '#17394a', color: '#cfe0e8' }}
      aria-label="Navegacion principal"
    >
      <SidebarBrand />
      <SidebarNavigation currentPage={currentPage} />
      <SidebarUser user={user} profile={profile} onSignOut={onSignOut} />
    </aside>
  )
}

export default Sidebar
