import LoginForm from '../components/LoginForm.jsx'
import Logo from '../../../shared/components/Logo.jsx'
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
          <div>
            <div
              style={{
                color: theme.login.eyebrow,
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.14em',
              }}
            >
              BIENVENIDO/A
            </div>

            <h1
              id="login-title"
              style={{
                margin: '6px 0 8px',
                fontSize: '28px',
                lineHeight: 1.2,
              }}
            >
              Iniciar sesion
            </h1>

            <p style={{ margin: 0, color: theme.login.mutedText, fontSize: '13px' }}>
              Ingresa tus credenciales para continuar al panel de gestion.
            </p>
          </div>

          <LoginForm />

          <p style={{ margin: 0, color: theme.login.mutedText, fontSize: '12px', textAlign: 'center' }}>
            Sistema de Gestion Academica
          </p>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
