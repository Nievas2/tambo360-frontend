import { Establecimiento, EstablishmentData } from '@/types/establishment'
import { createEstablishment } from '@/utils/api/establishment.api'
import { queryKeys } from '@/utils/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export function useCreateEstablishment() {
  const queryClient = useQueryClient()
  return useMutation<
    { data: Establecimiento },
    AxiosError<{ message: string }>,
    EstablishmentData
  >({
    mutationFn: async (values: EstablishmentData) => {
      const { data } = await createEstablishment(values)
      return data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.organization.all })
    },
  })
}
