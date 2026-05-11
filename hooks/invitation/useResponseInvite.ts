import { ResponseInvite } from '@/types/invite'
import { responseInvitation } from '@/utils/api/invitations.api'
import { queryKeys } from '@/utils/queryKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export function useResponseInvite() {
  const queryClient = useQueryClient()
  return useMutation<
    AxiosResponse,
    AxiosError<{ message: string }>,
    ResponseInvite
  >({
    mutationFn: async ({ idInvitacion, accion, rol }: ResponseInvite) =>
      responseInvitation({
        idInvitacion,
        accion,
        rol,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.invitation.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.invitation.lists() })
    },
  })
}
