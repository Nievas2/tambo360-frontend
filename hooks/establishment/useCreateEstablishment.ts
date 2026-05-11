import { EstablishmentData } from '@/types/establishment'
import { Establecimiento } from '@/types/types'
import { createEstablishment } from '@/utils/api/establishment.api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export function useCreateEstablishment() {
  return useMutation<
    { data: Establecimiento },
    AxiosError<{ message: string }>,
    EstablishmentData
  >({
    mutationFn: async (values: EstablishmentData) => {
      const { data } = await createEstablishment(values)
      return data
    },
  })
}
