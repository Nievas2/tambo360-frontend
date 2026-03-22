import { DecreaseData } from '@/types/decrease'
import { updateDecrease } from '@/utils/api/decrease.api'
import { baseKeys, queryKeys } from '@/utils/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

interface UpdateDecreaseProps {
  idLote: string
}
export function useUpdateDecrease({ idLote }: UpdateDecreaseProps) {
  const queryClient = useQueryClient()
  return useMutation<
    AxiosResponse<{ decrease: DecreaseData }>,
    AxiosError<{ message: string }>,
    { values: DecreaseData; id: string }
  >({
    mutationFn: async ({
      values,
      id,
    }: {
      values: DecreaseData
      id: string
    }) => {
      const { data } = await updateDecrease(values, id)
      return data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.decrease.lists() })
      queryClient.invalidateQueries({
        queryKey: queryKeys.batch.detail(idLote),
      })
      queryClient.invalidateQueries({
        queryKey: [...baseKeys.batch, 'filters'],
      })
    },
  })
}
