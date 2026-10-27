import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createModule, getModules } from '../../../backend/supabase/services/moduleService.js'

export function useModules() {
  return useQuery({
    queryKey: ['modules'],
    queryFn: getModules,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

export function useCreateModule() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createModule,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['modules'] }),
  })
}
