import { useMemo, useState } from 'react'
import { ChevronDown, Mail, MessageCircle } from 'lucide-react'
import Button from '../../../shared/components/Buttons/Button.jsx'
import DataTable from '../../../shared/components/DataTable/DataTable.jsx'
import Pagination from '../../../shared/components/Pagination/Pagination.jsx'
import theme from '../../../shared/theme/index.js'

const statusColors = {
  Activo: { background: theme.status.activeBackground, color: theme.status.activeText },
  Pendiente: { background: theme.status.pendingBackground, color: theme.status.pendingText },
  Inactivo: { background: theme.status.inactiveBackground, color: theme.status.inactiveText },
}

const fieldStyle = {
  height: '44px',
  padding: '0 12px',
  border: `1px solid ${theme.login.border}`,
  borderRadius: '6px',
  backgroundColor: theme.login.inputBackground,
  color: theme.text,
  fontSize: '13px',
}

const iconButtonStyle = {
  width: '40px',
  height: '40px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.table.border}`,
  borderRadius: '6px',
  backgroundColor: theme.white,
  color: theme.button.secondaryText,
}

function StudentsTable({ students, totalStudents, currentPage, onPageChange }) {
  const [query, setQuery] = useState('')
  const [appliedQuery, setAppliedQuery] = useState('')
  const [status, setStatus] = useState('Todos los estados')

  const filteredStudents = useMemo(() => {
    const normalizedQuery = appliedQuery.trim().toLowerCase()

    return students.filter((student) => {
      const matchesQuery = !normalizedQuery || `${student.name} ${student.document}`.toLowerCase().includes(normalizedQuery)
      const matchesStatus = status === 'Todos los estados' || student.status === status
      return matchesQuery && matchesStatus
    })
  }, [appliedQuery, status, students])

  const columns = [
    { key: 'name', header: 'ESTUDIANTE', cellStyle: { fontWeight: 500 } },
    { key: 'document', header: 'DOCUMENTO', cellStyle: { color: theme.login.mutedText } },
    { key: 'course', header: 'ÚLTIMO CURSO', cellStyle: { color: theme.login.mutedText } },
    {
      key: 'status',
      header: 'ESTADO',
      render: (student) => <span style={{ ...statusColors[student.status], display: 'inline-flex', padding: '5px 9px', borderRadius: '999px', fontSize: '11px', fontWeight: 600 }}>{student.status}</span>,
    },
    {
      key: 'contact',
      header: 'CONTACTO',
      align: 'right',
      render: (student) => (
        <div className="d-inline-flex gap-2">
          <button type="button" aria-label={`Enviar WhatsApp a ${student.name}`} title="WhatsApp" style={{ ...iconButtonStyle, color: theme.status.activeText }}><MessageCircle size={16} aria-hidden="true" /></button>
          <button type="button" aria-label={`Enviar correo a ${student.name}`} title="Correo" style={iconButtonStyle}><Mail size={16} aria-hidden="true" /></button>
        </div>
      ),
    },
  ]

  return (
    <section
      aria-label="Listado de estudiantes"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '24px',
        backgroundColor: theme.login.surface,
        border: `1px solid ${theme.login.border}`,
        borderRadius: '8px',
      }}
    >
      <div className="d-flex align-items-center justify-content-between gap-3">
        <div className="d-flex align-items-center gap-2">
          <label style={{ width: '280px' }}>
            <span className="visually-hidden">Buscar por nombre o DNI</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre o DNI"
              style={{ ...fieldStyle, width: '100%' }}
            />
          </label>
          <Button onClick={() => setAppliedQuery(query)}>Buscar</Button>
        </div>

        <label className="position-relative" style={{ width: '210px' }}>
          <span className="visually-hidden">Filtrar por estado</span>
          <select value={status} onChange={(event) => setStatus(event.target.value)} style={{ ...fieldStyle, width: '100%', appearance: 'none', paddingRight: '36px' }}>
            <option>Todos los estados</option>
            <option>Activo</option>
            <option>Pendiente</option>
            <option>Inactivo</option>
          </select>
          <ChevronDown size={16} aria-hidden="true" className="position-absolute" style={{ right: '12px', top: '14px', pointerEvents: 'none' }} />
        </label>
      </div>

      <DataTable columns={columns} rows={filteredStudents} getRowKey={(student) => student.document} emptyState="No hay estudiantes que coincidan con la búsqueda." />

      <Pagination
        currentPage={currentPage}
        totalPages={3}
        totalItems={totalStudents}
        visibleItems={filteredStudents.length}
        onPageChange={onPageChange}
        itemLabel="estudiantes"
      />
    </section>
  )
}

export default StudentsTable
