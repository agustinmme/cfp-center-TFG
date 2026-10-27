import Sidebar from './Sidebar.jsx'
import theme from '../theme/index.js'

function AppLayout({ children, currentPage = 'Comisiones', user, profile, onSignOut, onPageChange }) {
  return (
    <div className="app-shell min-vh-100" style={{ backgroundColor: theme.background, color: theme.text }}>
      <Sidebar currentPage={currentPage} user={user} profile={profile} onSignOut={onSignOut} onPageChange={onPageChange} />

      <div className="app-shell-main min-vh-100 d-flex flex-column" style={{ marginLeft: '265px' }}>
        <main className="flex-grow-1">{children}</main>
      </div>
    </div>
  )
}

export default AppLayout
