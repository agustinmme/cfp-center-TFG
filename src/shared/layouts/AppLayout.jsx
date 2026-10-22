import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'

function AppLayout({ children, currentPage = 'Comisiones', user, profile, onSignOut }) {
  return (
    <div className="app-shell min-vh-100" style={{ backgroundColor: '#f5f6f7', color: '#16303d' }}>
      <Sidebar currentPage={currentPage} user={user} profile={profile} onSignOut={onSignOut} />

      <div className="app-shell-main min-vh-100 d-flex flex-column" style={{ marginLeft: '265px' }}>
        <Topbar currentPage={currentPage} />
        <main className="flex-grow-1">{children}</main>
      </div>
    </div>
  )
}

export default AppLayout
