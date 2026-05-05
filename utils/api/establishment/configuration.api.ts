import { api } from '@/services/api'

export const sendConfiguration = async (data: any) =>
  api.post('/establecimiento/cuestionario', data)

export const getConfiguration = async () =>
  api.get('/establecimiento/cuestionario/info')
