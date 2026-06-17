import { Invitacion } from '@/types/invite'
import { getInvitations } from '@/utils/api/invitations.api'
import { queryKeys } from '@/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export function useInvitations() {
  return useQuery<
    AxiosResponse<{
      invitaciones_organizacion: Invitacion[]
      invitaciones_establecimiento: Invitacion[]
    }>
  >({
    queryKey: queryKeys.invitation.lists(),
    queryFn: async () => {
      return await getInvitations()
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
