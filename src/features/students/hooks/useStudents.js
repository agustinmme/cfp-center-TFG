import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createStudent, getStudents, updateStudent } from '../../../backend/supabase/services/studentService.js'

export function useStudents() {
  return useQuery({
    queryKey: ['students'],
    queryFn: getStudents,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

export function useCreateStudent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
  })
}

export function useUpdateStudent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateStudent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
  })
}
