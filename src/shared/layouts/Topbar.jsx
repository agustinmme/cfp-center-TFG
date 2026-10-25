import { Bell } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.jsx'

function Topbar({ currentPage }) {
  return (
    <header className="bg-white border-bottom d-flex align-items-center justify-content-between px-4" style={{ minHeight: '47px' }}>
      <Breadcrumb currentPage={currentPage} />
    </header>
  )
}

export default Topbar
