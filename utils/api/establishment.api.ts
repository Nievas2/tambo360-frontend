import { api } from '@/services/api'
import { EstablishmentData, EstablishmentName } from '@/types/establishment'

export const createEstablishment = (dto: EstablishmentData) =>
  api.post('/establecimiento/registrar', dto)

export const updateEstablishmentName = (dto: EstablishmentName) =>
  api.patch(`/establecimiento/editar-nombre`, dto)
