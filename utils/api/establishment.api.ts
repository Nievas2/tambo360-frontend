import { api } from '@/services/api'
import { EstablishmentData, EstablishmentName } from '@/types/establishment'

export const createEstablishment = (dto: EstablishmentData) =>
  api.post('/establecimiento', dto, {
    headers: {
      'x-organizacion-id': dto.organizacionId,
    },
  })

export const updateEstablishmentName = (dto: EstablishmentName) =>
  api.patch(`/establecimiento`, dto)
