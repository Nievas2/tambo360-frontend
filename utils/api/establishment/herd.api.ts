import { api } from '@/services/api'

export const getHerds = async () => api.get(`/establecimiento/rodeos/get`)
