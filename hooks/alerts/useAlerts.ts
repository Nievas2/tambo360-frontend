import { getAlerts } from '@/utils/api/alerts.api'
import { queryKeys } from '@/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'

interface LastsAlertsProps {
  id?: string
  range: string
}
export function useAlerts({ id, range }: LastsAlertsProps) {
  return useQuery({
    queryKey: queryKeys.alert.filters(range),
    queryFn: async () => {
      const { data } = await getAlerts(id!, range)
      return data
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
