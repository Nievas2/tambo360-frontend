import { getOrganizations } from '@/utils/api/organization.api'
import { queryKeys } from '@/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'

export function useOrganizations() {
  return useQuery({
    queryKey: queryKeys.organization.all,
    queryFn: async () => getOrganizations(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
