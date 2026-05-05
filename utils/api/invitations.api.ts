import { api } from '@/services/api'
import { InvitationRole } from '@/types/enums'

export const getInvitations = () => api.get('/perfil/invitaciones')

export const sendEstablishmentInvitation = (data: {
  correo: string
  rol: string
}) => api.post('/establecimiento/invitacion', data)

export const sendOrganizationInvitation = (data: {
  email: string
  role: string
}) => api.post('/organizacion/invitacion', data)

export const responseInvitation = (data: {
  idInvitacion: string
  accion: 'aceptada' | 'rechazada'
  rol: InvitationRole
}) => api.post('/perfil/invitaciones/est', data)
