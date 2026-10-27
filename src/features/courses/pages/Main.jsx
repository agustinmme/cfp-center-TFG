import { useState } from 'react'
import PageHeader from '../../../shared/components/PageHeader/PageHeader.jsx'
import CoursesTable from '../components/CoursesTable.jsx'
import CourseModal from '../components/CourseModal.jsx'
import ModuleModal from '../components/ModuleModal.jsx'
import ModulesTable from '../components/ModulesTable.jsx'
import { useCreateModule, useModules } from '../hooks/useModules.js'

function Main() {
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false)
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false)
  const { data: modules = [], isLoading: modulesLoading, isError: modulesError, refetch: refetchModules } = useModules()
  const createModuleMutation = useCreateModule()

  async function handleModuleSubmit(module) {
    await createModuleMutation.mutateAsync(module)
    setIsModuleModalOpen(false)
  }

  async function handleCourseSubmit() {
    setIsCourseModalOpen(false)
  }

  return (
    <section
      aria-labelledby="courses-modules-title"
      className="container-fluid d-flex flex-column gap-4"
      style={{ padding: '32px' }}
    >
      <div>
        <PageHeader title="Cursos" description="Oferta formativa" id="courses-modules-title" />
      </div>
      <CoursesTable onAddCourse={() => setIsCourseModalOpen(true)} />

      <section aria-labelledby="modules-title" className="d-flex flex-column gap-3">
        <PageHeader title="Módulos" description="Nomenclador de módulos" id="modules-title" />
        <ModulesTable
          modules={modules}
          isLoading={modulesLoading}
          isError={modulesError}
          onRetry={refetchModules}
          onAddModule={() => setIsModuleModalOpen(true)}
        />
      </section>

      {isModuleModalOpen && (
        <ModuleModal
          onClose={() => setIsModuleModalOpen(false)}
          onSubmit={handleModuleSubmit}
          isSaving={createModuleMutation.isPending}
        />
      )}

      {isCourseModalOpen && (
        <CourseModal
          availableModules={modules}
          onClose={() => setIsCourseModalOpen(false)}
          onSubmit={handleCourseSubmit}
        />
      )}
    </section>
  )
}

export default Main
