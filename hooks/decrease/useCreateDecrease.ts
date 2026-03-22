import { DecreaseWithLote } from '@/types/decrease'
import { createDecrease } from '@/utils/api/decrease.api'
import { baseKeys, queryKeys } from '@/utils/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export function useCreateDecrease() {
  const queryClient = useQueryClient()
  return useMutation<
    AxiosResponse,
    AxiosError<{ message: string }>,
    DecreaseWithLote
  >({
    mutationFn: async (values: DecreaseWithLote) => {
      const { data } = await createDecrease(values)
      return data
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.decrease.lists() })
      queryClient.invalidateQueries({
        queryKey: queryKeys.batch.detail(variables.idLote),
      })
      queryClient.invalidateQueries({
        queryKey: [...baseKeys.batch, 'filters'],
      })
    },
  })
}
