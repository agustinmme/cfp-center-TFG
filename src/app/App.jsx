import { useState } from 'react'
import LoginPage from '../features/auth/pages/LoginPage.jsx'
import { navigationViews } from './routes/navigationViews.js'
import { isSupabaseConfigured } from '../backend/supabase/client.js'
import { useAuth } from '../features/auth/providers/AuthProvider.jsx'
import { useUsuario } from '../features/auth/hooks/useUsuario.js'
import AppLayout from '../shared/layouts/AppLayout.jsx'
import { getNavigationForRole } from '../shared/constants/navigation.js'

function App() {
  const { loading, user, signOut } = useAuth()
  const { data: usuario, isLoading: usuarioLoading, isError: usuarioError } = useUsuario(user)

  if (!isSupabaseConfigured) {
    return (
      <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
        <section className="alert alert-warning m-0" role="alert">
          Configura las variables de entorno de Supabase para iniciar la aplicacion.
        </section>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light" role="status">
        <span>Cargando sesion…</span>
      </main>
    )
  }

  if (!user) return <LoginPage />

  if (usuarioLoading) {
    return (
      <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light" role="status">
        <span>Cargando datos del usuario…</span>
      </main>
    )
  }

  if (usuarioError || !usuario) {
    return (
      <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
        <section className="alert alert-danger m-0" role="alert">
          No se pudieron cargar los datos del usuario. Cerra sesion e intenta nuevamente.
        </section>
      </main>
    )
  }

  return <AuthenticatedApp user={user} profile={usuario} signOut={signOut} />
}

function AuthenticatedApp({ user, profile, signOut }) {
  const [selectedPage, setSelectedPage] = useState('Panel general')
  const availableNavigation = getNavigationForRole(profile.rol)
  const availablePages = availableNavigation.flatMap((group) => group.items.map((item) => item.label))
  const firstPage = availablePages[0]
  const currentPage = availablePages.includes(selectedPage) ? selectedPage : firstPage
  const SelectedPage = navigationViews[currentPage]

  function handlePageChange(page) {
    if (availablePages.includes(page)) setSelectedPage(page)
  }

  return (
    <AppLayout currentPage={currentPage} user={user} profile={profile} onSignOut={signOut} onPageChange={handlePageChange}>
      {SelectedPage ? <SelectedPage /> : null}
    </AppLayout>
  )
}

export default App
