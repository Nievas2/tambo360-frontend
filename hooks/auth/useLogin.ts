import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginUser } from '@/utils/api/auth.api'
import { queryKeys } from '@/utils/queryKeys'
import { AxiosError, AxiosResponse } from 'axios'
import { LoginData } from '@/types/login'
import { User } from '@/types/types'

export function useLogin() {
  const queryClient = useQueryClient()
  return useMutation<
    AxiosResponse<{ user: User; token: string }>,
    AxiosError<{ message: string }>,
    LoginData
  >({
    mutationFn: async (values: LoginData) => loginUser(values),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.currentUser })
    },
  })
}
