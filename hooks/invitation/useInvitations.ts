import { getInvitations } from '@/utils/api/invitations.api'
import { queryKeys } from '@/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'

export function useInvitations() {
  return useQuery({
    queryKey: queryKeys.invitation.lists(),
    queryFn: async () => {
      const { data } = await getInvitations()
      return data
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
