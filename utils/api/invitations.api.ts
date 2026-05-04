import { api } from '@/services/api'

export const getInvitations = () => api.get('/perfil/invitaciones')

export const sendEstablishmentInvitation = (data: {
  correo: string
  rol: string
}) => api.post('/establecimiento/invitacion', data)

export const sendOrganizationInvitation = (data: {
  email: string
  role: string
}) => api.post('/organizacion/invitacion', data)

export const acceptInvitation = (invitationId: string) =>
  api.post(`/perfil/invitaciones/${invitationId}/aceptar`)

export const rejectInvitation = (invitationId: string) =>
  api.post(`/perfil/invitaciones/${invitationId}/rechazar`)
