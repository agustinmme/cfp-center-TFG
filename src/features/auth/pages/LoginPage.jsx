import LoginForm from '../components/LoginForm.jsx'

function LoginPage() {
  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
      <section className="card col-4 border-0 rounded-3 shadow-sm" aria-labelledby="login-title">
        <div className="card-body p-4">
          <div className="mb-2 text-uppercase text-primary fw-bold small">Bienvenido/a</div>

          <h1 className="h2 mb-2" id="login-title">
            Iniciar sesion
          </h1>

          <p className="mb-4 text-secondary small">
            Ingresa tus credenciales para continuar al panel de gestion.
          </p>

          <LoginForm />

          <div className="mt-4 text-center text-secondary small">CFP 402&nbsp;&nbsp;·&nbsp;&nbsp;Sistema de Gestion Academica</div>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
