import { getHerds } from '@/utils/api/establishment/herd.api'
import { queryKeys } from '@/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'

export function useHerds() {
  return useQuery({
    queryKey: queryKeys.herd.lists(),
    queryFn: async () => getHerds(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
