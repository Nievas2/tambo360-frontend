import { api } from '@/services/api'
import { GraphParams } from '@/types/dashboard'

export const getCurrentMonth = () => api.get('/dashboard/mes-actual')

export const getGraph = (params: GraphParams) =>
  api.get('/dashboard/grafico', { params: params })
