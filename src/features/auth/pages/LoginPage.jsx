import LoginForm from '../components/LoginForm.jsx'
import Logo from '../../../shared/components/Logo.jsx'
import PageHeader from '../../../shared/components/PageHeader/PageHeader.jsx'
import theme from '../../../shared/theme/index.js'

function LoginPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.login.background,
        color: theme.login.text,
      }}
    >
      <section
        aria-labelledby="login-title"
        style={{
          width: '33.333333%',
          overflow: 'hidden',
          border: `1px solid ${theme.login.border}`,
          borderRadius: '12px',
          background: theme.login.surface,
          boxShadow: theme.login.shadow,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 32px',
            background: theme.login.headerBackground,
          }}
        >
          <Logo />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            padding: '32px',
          }}
        >
          <PageHeader
            eyebrow="BIENVENIDO/A"
            title="Iniciar sesion"
            description="Ingresa tus credenciales para continuar al panel de gestion."
            id="login-title"
          />

          <LoginForm />

          <p style={{ margin: 0, color: theme.login.mutedText, fontSize: '12px', textAlign: 'center' }}>
            MiCentro - 0.1.0
          </p>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
