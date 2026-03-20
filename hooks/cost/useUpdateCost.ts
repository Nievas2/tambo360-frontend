import { UpdateCostData } from '@/types/cost'
import { updateCost } from '@/utils/api/cost.api'
import { baseKeys, queryKeys } from '@/utils/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export function useUpdateCost() {
  const queryClient = useQueryClient()
  return useMutation<
    AxiosResponse<{ cost: UpdateCostData }>,
    AxiosError<{ message: string }>,
    { values: UpdateCostData; id: string; loteId: string }
  >({
    mutationFn: async ({
      values,
      id,
    }: {
      values: UpdateCostData
      id: string
    }) => {
      const { data } = await updateCost(values, id)
      return data
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKeys.cost.lists() })
      const previous = queryClient.getQueryData(queryKeys.cost.lists())
      queryClient.setQueryData(queryKeys.cost.lists(), () => previous)
      return { previous }
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cost.lists() })
      queryClient.invalidateQueries({
        queryKey: queryKeys.batch.detail(variables.loteId),
      })
      queryClient.invalidateQueries({
        queryKey: [...baseKeys.batch, 'filters'],
      })
    },
  })
}
