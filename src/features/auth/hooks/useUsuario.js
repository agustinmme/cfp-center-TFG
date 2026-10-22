import { useQuery } from '@tanstack/react-query'
import { getCurrentUsuario } from '../services/usuarioService.js'

export function useUsuario(user) {
  return useQuery({
    queryKey: ['usuario', user?.id],
    queryFn: () => getCurrentUsuario(user.id),
    enabled: Boolean(user),
    staleTime: Infinity,
  })
}
