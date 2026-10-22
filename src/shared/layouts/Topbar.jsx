import { Bell } from 'lucide-react'

function Topbar({ currentPage }) {
  return (
    <header className="bg-white border-bottom d-flex align-items-center justify-content-between px-4" style={{ minHeight: '47px' }}>
      <div className="small text-secondary" style={{ fontSize: '9.5px', letterSpacing: '.3px' }}>
        CFP 402 <span className="mx-1">/</span> <strong className="text-dark">{currentPage}</strong>
      </div>
      <button className="btn btn-link p-0 text-secondary" type="button" aria-label="Notificaciones">
        <Bell size={16} strokeWidth={1.6} aria-hidden="true" />
      </button>
    </header>
  )
}

export default Topbar
