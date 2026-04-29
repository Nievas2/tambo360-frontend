import { api } from '@/services/api'

export const getInvitations = () => api.get('/perfil/invitaciones')
