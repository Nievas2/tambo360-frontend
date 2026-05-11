import { ConfigurationData } from '@/types/establishment/configuration'
import { sendConfiguration } from '@/utils/api/establishment/configuration.api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export function useUpdateConfiguration() {
  return useMutation<
    AxiosResponse,
    AxiosError<{ message: string }>,
    ConfigurationData
  >({
    mutationFn: async (data: ConfigurationData) => sendConfiguration(data),
  })
}
