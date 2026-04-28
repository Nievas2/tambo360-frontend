import { createOrganization } from '@/utils/api/organization.api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export function useCreateOrganization() {
  return useMutation<AxiosResponse, AxiosError<{ message: string }>, string>({
    mutationFn: async (name: string) => {
      const { data } = await createOrganization(name)
      return data
    },
  })
}
