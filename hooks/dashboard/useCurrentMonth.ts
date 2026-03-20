import { getCurrentMonth } from '@/utils/api/dashboard.api'
import { queryKeys } from '@/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export function useCurrentMonth() {
  return useQuery<AxiosResponse, AxiosError<{ message: string }>>({
    queryKey: queryKeys.dashboard.current(),
    queryFn: async () => {
      const { data } = await getCurrentMonth()
      return data
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
