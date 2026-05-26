import { api } from '@/services/api'
import { UpdateCostData } from '@/types/cost'

export const createCost = async (values: UpdateCostData, id: string) =>
  api.post('/costos', {
    loteId: id,
    ...values,
  })

export const getBatchCosts = (id: string) =>
  api.get('/costos/costos-lote/' + id)

export const getCostDetail = (id: string) => api.get(`/costos/detalle/${id}`)

export const updateCost = (dto: UpdateCostData, id: string) =>
  api.patch(`/costos/${id}`, { ...dto, tipoCosto: dto.concepto })

export const deleteCost = (id: string) => api.delete(`/costos/${id}`)
