import { getConfiguration } from '@/utils/api/establishment/configuration.api'
import { queryKeys } from '@/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'

export function useConfiguration() {
  return useQuery({
    queryKey: queryKeys.establishment.configuration(),
    queryFn: async () => {
      const { data } = await getConfiguration()
      return data
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
