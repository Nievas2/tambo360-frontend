import { InvitationRole } from '@/types/enums'
import { sendEstablishmentInvitation } from '@/utils/api/invitations.api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export function useSendInvite() {
  return useMutation<
    AxiosResponse,
    AxiosError<{ message: string }>,
    { correo: string; rol: InvitationRole }
  >({
    mutationFn: async (data: { correo: string; rol: InvitationRole }) =>
      sendEstablishmentInvitation(data),
  })
}
