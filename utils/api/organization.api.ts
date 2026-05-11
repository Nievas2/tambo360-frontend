import { api } from '@/services/api'

export const createOrganization = async (name: string) =>
  await api.post('/organizacion', { nombre: name })

export const getOrganizations = async () => await api.get('/organizacion')
