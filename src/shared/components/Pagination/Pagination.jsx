import { ChevronLeft, ChevronRight } from 'lucide-react'
import theme from '../../theme/index.js'

function Pagination({ currentPage, totalPages, totalItems, visibleItems, onPageChange, itemLabel = 'elementos' }) {
  const paginationButtonStyle = {
    minWidth: '40px',
    height: '40px',
    padding: '0 10px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    border: `1px solid ${theme.table.border}`,
    borderRadius: '6px',
    backgroundColor: theme.white,
    color: theme.button.secondaryText,
    fontSize: '13px',
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) onPageChange(page)
  }

  return (
    <nav aria-label="Paginación" className="d-flex flex-column gap-3" style={{ paddingTop: '4px' }}>
      <span style={{ color: theme.login.mutedText, fontSize: '13px' }}>Mostrando {visibleItems} de {totalItems} {itemLabel}</span>
      <div className="d-flex align-items-center justify-content-between gap-3">
        <button type="button" disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)} style={paginationButtonStyle}>
          <ChevronLeft size={16} aria-hidden="true" />Anterior
        </button>
        <div className="d-flex gap-2">
          {pages.map((page) => (
            <button
              key={page}
              type="button"
              aria-label={`Ir a la página ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
              onClick={() => goToPage(page)}
              style={page === currentPage ? { ...paginationButtonStyle, backgroundColor: theme.button.primaryBackground, borderColor: theme.button.primaryBackground, color: theme.white, fontWeight: 700 } : paginationButtonStyle}
            >
              {page}
            </button>
          ))}
        </div>
        <button type="button" disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)} style={paginationButtonStyle}>
          Siguiente<ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
    </nav>
  )
}

export default Pagination
