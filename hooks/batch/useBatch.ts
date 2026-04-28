import { Lote } from '@/types/batch'
import { getBatch } from '@/utils/api/batch.api'
import { queryKeys } from '@/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'

export function useBatch({ id }: { id: string }) {
  return useQuery<{ data: Lote }>({
    queryKey: queryKeys.batch.detail(id),
    queryFn: async () => {
      const { data } = await getBatch(id)
      return data
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
}
