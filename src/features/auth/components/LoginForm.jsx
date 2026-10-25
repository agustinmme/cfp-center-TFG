import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import Button from '../../../shared/components/Buttons/Button.jsx'
import theme from '../../../shared/theme/index.js'
import { useAuth } from '../providers/AuthProvider.jsx'

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { signIn } = useAuth()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onTouched' })

  const handleLogin = async ({ email, password }) => {
    let error

    try {
      ({ error } = await signIn(email, password))
    } catch {
      error = true
    }

    if (error) {
      setError('root.authentication', {
        type: 'authentication',
        message: 'No pudimos iniciar sesion. Verifica tu correo y contrasena.',
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      noValidate
      style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
    >
      {errors.root?.authentication && (
        <div
          role="alert"
          style={{
            margin: 0,
            padding: '8px 12px',
            border: `1px solid ${theme.login.error}`,
            borderRadius: '6px',
            color: theme.login.error,
            fontSize: '12px',
          }}
        >
          {errors.root.authentication.message}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: 0 }}>
        <label htmlFor="email" style={{ margin: 0, color: theme.login.text, fontSize: '12px', fontWeight: 600 }}>Correo electronico</label>
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            height: '44px',
            overflow: 'hidden',
            border: `1px solid ${errors.email ? theme.login.error : theme.login.border}`,
            borderRadius: '6px',
            background: theme.login.inputBackground,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'flex',
              flex: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              borderRight: `1px solid ${theme.login.border}`,
              color: theme.login.mutedText,
            }}
          >
            <Mail size={16} strokeWidth={1.7} aria-hidden="true" />
          </span>
          <input
            id="email"
            type="email"
            placeholder="Ingresa tu correo electronico"
            autoComplete="email"
            aria-describedby={errors.email ? 'email-feedback' : undefined}
            style={{
              flex: 1,
              minWidth: 0,
              border: 0,
              background: 'transparent',
              color: theme.login.text,
              padding: '0 12px',
              fontSize: '13px',
            }}
            {...register('email', {
              required: 'Ingresa tu correo electronico.',
              pattern: { value: /^(\S+)@(\S+)\.(\S+)$/, message: 'Ingresa un correo electronico valido.' },
            })}
          />
        </div>
        {errors.email && <div id="email-feedback" style={{ margin: 0, color: theme.login.error, fontSize: '12px' }}>{errors.email.message}</div>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: 0 }}>
        <label htmlFor="password" style={{ margin: 0, color: theme.login.text, fontSize: '12px', fontWeight: 600 }}>Contrasena</label>
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            height: '44px',
            overflow: 'hidden',
            border: `1px solid ${errors.password ? theme.login.error : theme.login.border}`,
            borderRadius: '6px',
            background: theme.login.inputBackground,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'flex',
              flex: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              borderRight: `1px solid ${theme.login.border}`,
              color: theme.login.mutedText,
            }}
          >
            <LockKeyhole size={16} strokeWidth={1.7} aria-hidden="true" />
          </span>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Ingresa tu contrasena"
            autoComplete="current-password"
            aria-describedby={errors.password ? 'password-feedback' : undefined}
            style={{
              flex: 1,
              minWidth: 0,
              border: 0,
              background: 'transparent',
              color: theme.login.text,
              padding: '0 12px',
              fontSize: '13px',
            }}
            {...register('password', { required: 'Ingresa tu contrasena.' })}
          />

          <button
            type="button"
            aria-label={showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((currentValue) => !currentValue)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 'none',
              width: '44px',
              border: 0,
              borderLeft: `1px solid ${theme.login.border}`,
              background: 'transparent',
              color: theme.login.mutedText,
              cursor: 'pointer',
            }}
          >
            {showPassword ? (
              <EyeOff size={16} strokeWidth={1.7} aria-hidden="true" />
            ) : (
              <Eye size={16} strokeWidth={1.7} aria-hidden="true" />
            )}
          </button>
        </div>
        {errors.password && <div id="password-feedback" style={{ margin: 0, color: theme.login.error, fontSize: '12px' }}>{errors.password.message}</div>}
      </div>

      <Button
        type="submit"
        style={{ width: '100%' }}
        icon={<ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" />}
        iconDirection="right"
      >
        Ingresar
      </Button>
    </form>
  )
}

export default LoginForm
