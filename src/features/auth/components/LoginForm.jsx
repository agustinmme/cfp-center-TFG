import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import Button from '../../../shared/components/Button.jsx'
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
    <form onSubmit={handleSubmit(handleLogin)} noValidate>
      {errors.root?.authentication && (
        <div className="alert alert-danger py-2" role="alert">
          {errors.root.authentication.message}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label fw-bold" htmlFor="email">Correo electronico</label>
        <div className="input-group">
          <span className="input-group-text bg-white">
            <Mail size={16} strokeWidth={1.7} aria-hidden="true" />
          </span>
          <input
            id="email"
            type="email"
            className={`form-control${errors.email ? ' is-invalid' : ''}`}
            placeholder="Ingresa tu correo electronico"
            autoComplete="email"
            aria-describedby={errors.email ? 'email-feedback' : undefined}
            {...register('email', {
              required: 'Ingresa tu correo electronico.',
              pattern: { value: /^(\S+)@(\S+)\.(\S+)$/, message: 'Ingresa un correo electronico valido.' },
            })}
          />
        </div>
        {errors.email && <div className="invalid-feedback d-block" id="email-feedback">{errors.email.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold" htmlFor="password">Contrasena</label>
        <div className="input-group">
          <span className="input-group-text bg-white">
            <LockKeyhole size={16} strokeWidth={1.7} aria-hidden="true" />
          </span>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            className={`form-control${errors.password ? ' is-invalid' : ''}`}
            placeholder="Ingresa tu contrasena"
            autoComplete="current-password"
            aria-describedby={errors.password ? 'password-feedback' : undefined}
            {...register('password', { required: 'Ingresa tu contrasena.' })}
          />

          <button
            type="button"
            className="btn btn-outline-secondary"
            aria-label={showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((currentValue) => !currentValue)}
          >
            {showPassword ? (
              <EyeOff size={16} strokeWidth={1.7} aria-hidden="true" />
            ) : (
              <Eye size={16} strokeWidth={1.7} aria-hidden="true" />
            )}
          </button>
        </div>
        {errors.password && <div className="invalid-feedback d-block" id="password-feedback">{errors.password.message}</div>}
      </div>

      <Button
        type="submit"
        className="btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
        endIcon={<ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" />}
      >
        Ingresar
      </Button>
    </form>
  )
}

export default LoginForm
