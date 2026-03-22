import { BatchFilters } from '@/types/batch'
import { getBatches } from '@/utils/api/batch.api'
import { queryKeys } from '@/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'

interface BatchesFilters {
  filters: BatchFilters
}
export function useBatches({ filters }: BatchesFilters) {
  return useQuery({
    queryKey: queryKeys.batch.filters(filters),
    queryFn: async () => {
      const { data } = await getBatches({ filters })
      return data
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
