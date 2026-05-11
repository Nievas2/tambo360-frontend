import { api } from '@/services/api'

export const breeds = () => api.get('/razas')
