import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import Button from '../../../shared/components/Buttons/Button.jsx'
import DataTable from '../../../shared/components/DataTable/DataTable.jsx'
import Pagination from '../../../shared/components/Pagination/Pagination.jsx'
import theme from '../../../shared/theme/index.js'

const columns = [
  { key: 'code', header: 'CÓDIGO', cellStyle: { color: theme.login.mutedText } },
  { key: 'name', header: 'MÓDULO', cellStyle: { fontWeight: 500 } },
  { key: 'hours', header: 'HORAS', align: 'right' },
]

const panelStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '24px',
  backgroundColor: theme.login.surface,
  border: `1px solid ${theme.login.border}`,
  borderRadius: '8px',
}

const searchInputStyle = {
  width: '280px',
  maxWidth: '100%',
  height: '44px',
  padding: '0 12px',
  border: `1px solid ${theme.login.border}`,
  borderRadius: '6px',
  backgroundColor: theme.login.inputBackground,
  color: theme.text,
  fontSize: '13px',
}

const pageSize = 10

function ModulesTable({ modules, isLoading, isError, onRetry, onAddModule }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [query, setQuery] = useState('')
  const [appliedQuery, setAppliedQuery] = useState('')

  const filteredModules = useMemo(() => {
    const normalizedQuery = appliedQuery.trim().toLowerCase()
    return modules.filter((module) => `${module.code} ${module.name}`.toLowerCase().includes(normalizedQuery))
  }, [appliedQuery, modules])

  const totalPages = Math.max(1, Math.ceil(filteredModules.length / pageSize))
  const paginatedModules = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredModules.slice(start, start + pageSize)
  }, [currentPage, filteredModules])

  function handleSearch() {
    setAppliedQuery(query)
    setCurrentPage(1)
  }

  return (
    <section aria-label="Módulos" style={panelStyle}>
      <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <label>
            <span className="visually-hidden">Buscar módulo</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar módulo" style={searchInputStyle} />
          </label>
          <Button onClick={handleSearch}>Buscar</Button>
        </div>
        <Button icon={<Plus size={16} aria-hidden="true" />} onClick={onAddModule}>Agregar módulo</Button>
      </div>
      {isLoading && <p role="status" style={{ color: theme.login.mutedText }}>Cargando modulos...</p>}
      {isError && (
        <div role="alert" className="d-flex align-items-center gap-3" style={{ color: theme.login.error }}>
          <span>No se pudieron cargar los modulos.</span>
          <Button variant="secondary" onClick={onRetry}>Reintentar</Button>
        </div>
      )}
      {!isLoading && !isError && (
        <>
          <DataTable
            columns={columns}
            rows={paginatedModules}
            getRowKey={(module) => module.id}
            emptyState="No hay modulos disponibles."
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredModules.length}
            visibleItems={paginatedModules.length}
            onPageChange={setCurrentPage}
            itemLabel="modulos"
          />
        </>
      )}
    </section>
  )
}

export default ModulesTable
