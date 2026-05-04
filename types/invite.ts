import {
  EstadoInvitacion,
  RolOrganizacion,
  InvitationRole,
} from '@/types/enums'
import { Organizacion } from '@/types/organization'
import { User } from '@/types/types'
import z from 'zod'

export const sendInviteSchema = z.object({
  correo: z.email('Correo electrónico inválido'),
  rol: z.enum(InvitationRole, 'Rol inválido'),
})

export interface Invitacion {
  idInvitacion: string

  idOrganizacion: string
  idInvitador: string
  idEstablecimiento?: string

  correo: string
  codigo: string
  estado: EstadoInvitacion
  expiraEn: Date
  rol: RolOrganizacion

  organizacion?: Organizacion
  usuario?: User

  creadoEn: Date
}
