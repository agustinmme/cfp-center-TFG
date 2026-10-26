import { useState } from 'react'
import { Download, Plus } from 'lucide-react'
import Button from '../../../shared/components/Buttons/Button.jsx'
import PageHeader from '../../../shared/components/PageHeader/PageHeader.jsx'
import StudentModal from '../components/StudentModal.jsx'
import StudentDetailModal from '../components/StudentDetailModal.jsx'
import StudentsTable from '../components/StudentsTable.jsx'
import { useCreateStudent, useStudents, useUpdateStudent } from '../hooks/useStudents.js'
import theme from '../../../shared/theme/index.js'

function StudentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const { data: students = [], isLoading, isError, refetch } = useStudents()
  const createStudentMutation = useCreateStudent()
  const updateStudentMutation = useUpdateStudent()

  async function handleCreateStudent(student) {
    await createStudentMutation.mutateAsync(student)
    setIsModalOpen(false)
  }

  async function handleUpdateStudent(student) {
    await updateStudentMutation.mutateAsync(student)
    setSelectedStudent(null)
  }

  return (
    <section aria-labelledby="students-title" className="container-fluid d-flex flex-column gap-4" style={{ padding: '32px' }}>
      <div className="d-flex align-items-end justify-content-between gap-4">
        <PageHeader
          title="Estudiantes"
          description={`${students.length} estudiantes registrados`}
          id="students-title"
        />
        <div className="d-flex gap-3">
          <Button variant="secondary" icon={<Download size={16} aria-hidden="true" />}>Exportar</Button>
          <Button icon={<Plus size={16} aria-hidden="true" />} onClick={() => setIsModalOpen(true)}>Registrar estudiante</Button>
        </div>
      </div>

      {isLoading && <p role="status" style={{ color: theme.login.mutedText }}>Cargando estudiantes...</p>}

      {isError && (
        <div role="alert" className="d-flex align-items-center gap-3" style={{ color: theme.login.error }}>
          <span>No se pudieron cargar los estudiantes.</span>
          <Button variant="secondary" onClick={() => refetch()}>Reintentar</Button>
        </div>
      )}

      {!isLoading && !isError && (
        <StudentsTable students={students} currentPage={currentPage} onPageChange={setCurrentPage} onStudentSelect={setSelectedStudent} />
      )}

      {isModalOpen && (
        <StudentModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateStudent}
          isSaving={createStudentMutation.isPending}
        />
      )}

      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onUpdate={handleUpdateStudent}
          isSaving={updateStudentMutation.isPending}
        />
      )}
    </section>
  )
}

export default StudentsPage
