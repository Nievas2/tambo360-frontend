import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginUser } from '@/utils/api/auth.api'
import { queryKeys } from '@/utils/queryKeys'
import { AxiosError, AxiosResponse } from 'axios'
import { User } from '@/types'
import { LoginData } from '@/types/login'

export function useLogin() {
  const queryClient = useQueryClient()
  return useMutation<
    AxiosResponse<{ user: User; token: string }>,
    AxiosError<{ message: string }>,
    LoginData
  >({
    mutationFn: async (values: LoginData) => {
      const { data } = await loginUser(values)
      return data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.currentUser })
    },
  })
}
