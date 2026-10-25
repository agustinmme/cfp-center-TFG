import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCentroById, updateCentroNombre } from '../../backend/supabase/services/centroService.js'
import { centroId } from '../../backend/supabase/client.js'

const centroQueryKey = ['centro', centroId]

export function useCentro() {
  return useQuery({
    queryKey: centroQueryKey,
    queryFn: () => getCentroById(centroId),
    enabled: Boolean(centroId),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}

export function useUpdateCentroNombre() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (nombre) => updateCentroNombre(centroId, nombre),
    onSuccess: (updatedCentro) => {
      queryClient.setQueryData(centroQueryKey, updatedCentro)
    },
  })
}
