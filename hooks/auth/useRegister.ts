import { useMutation, useQueryClient } from '@tanstack/react-query'
import { registerUser } from '@/utils/api/auth.api'
import { RegisterData } from '@/types/register'
import { queryKeys } from '@/utils/queryKeys'
import { AxiosError } from 'axios'
import { User } from '@/types'

export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation<
    { user: User },
    AxiosError<{ message: string }>,
    RegisterData
  >({
    mutationFn: async (values: RegisterData) => {
      const { data } = await registerUser(values)
      return data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.currentUser })
    },
  })
}
