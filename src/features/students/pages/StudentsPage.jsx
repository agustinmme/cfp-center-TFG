import { useState } from 'react'
import { Download, Plus } from 'lucide-react'
import Button from '../../../shared/components/Buttons/Button.jsx'
import PageHeader from '../../../shared/components/PageHeader/PageHeader.jsx'
import StudentModal from '../components/StudentModal.jsx'
import StudentsTable from '../components/StudentsTable.jsx'

const students = [
  { name: 'Ana Lucía Pérez', document: 'DNI 38.452.901', course: 'Electricidad domiciliaria', status: 'Activo' },
  { name: 'Carlos Ramírez', document: 'DNI 41.208.773', course: 'Programación web', status: 'Activo' },
  { name: 'Sofía Benítez', document: 'DNI 36.904.118', course: 'Gastronomía profesional', status: 'Pendiente' },
  { name: 'Martín Sosa', document: 'DNI 39.554.220', course: 'Instalaciones sanitarias', status: 'Activo' },
  { name: 'Valentina Ruiz', document: 'DNI 42.119.032', course: 'Diseño gráfico', status: 'Inactivo' },
]

function StudentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <section aria-labelledby="students-title" className="container-fluid d-flex flex-column gap-4" style={{ padding: '32px' }}>
      <div className="d-flex align-items-end justify-content-between gap-4">
        <PageHeader
          title="Estudiantes"
          description="248 estudiantes registrados · 226 activos"
          id="students-title"
        />
        <div className="d-flex gap-3">
          <Button variant="secondary" icon={<Download size={16} aria-hidden="true" />}>Exportar</Button>
          <Button icon={<Plus size={16} aria-hidden="true" />} onClick={() => setIsModalOpen(true)}>Registrar estudiante</Button>
        </div>
      </div>

      <StudentsTable students={students} totalStudents={248} currentPage={currentPage} onPageChange={setCurrentPage} />

      {isModalOpen && <StudentModal onClose={() => setIsModalOpen(false)} />}
    </section>
  )
}

export default StudentsPage
