import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { isSupabaseConfigured, supabase } from '../../../backend/supabase/client.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const queryClient = useQueryClient()
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false)
      return undefined
    }

    let mounted = true
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) {
        setSession(nextSession)
        setLoading(false)
        if (!nextSession) queryClient.removeQueries({ queryKey: ['usuario'] })
      }
    })

    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!mounted) return
      setSession(data.session)
      setError(sessionError)
      setLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [queryClient])

  const signIn = useCallback(async (email, password) => {
    if (!supabase) {
      return { data: null, error: new Error('Supabase no esta configurado.') }
    }

    const result = await supabase.auth.signInWithPassword({ email, password })
    if (result.error) setError(result.error)
    else queryClient.removeQueries({ queryKey: ['usuario'] })
    return result
  }, [queryClient])

  const signOut = useCallback(async () => {
    if (!supabase) {
      return { error: new Error('Supabase no esta configurado.') }
    }

    const result = await supabase.auth.signOut()
    if (result.error) setError(result.error)
    return result
  }, [])

  const value = useMemo(() => ({
    loading,
    user: session?.user ?? null,
    session,
    error,
    signIn,
    signOut,
  }), [error, loading, session, signIn, signOut])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe utilizarse dentro de un AuthProvider.')
  }

  return context
}
