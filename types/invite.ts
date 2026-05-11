import { EstadoInvitacion, InvitationRole } from '@/types/enums'
import { User } from '@/types/types'
import z from 'zod'

export const sendInviteSchema = z.object({
  correo: z.email('Correo electrónico inválido'),
  rol: z.enum(InvitationRole, 'Rol inválido'),
})

export const responseInviteSchema = z.object({
  idInvitacion: z.uuidv4(),
  accion: z.enum(['aceptada', 'rechazada'], 'Acción inválida'),
  rol: z.enum(InvitationRole, 'Rol inválido'),
})

export type ResponseInvite = z.infer<typeof responseInviteSchema>

export interface Invitacion {
  id: string

  correo: string
  codigo: string
  estado: EstadoInvitacion
  expiraEn: Date
  rol: {
    rol: InvitationRole
    nombre: string
  }
  establecimiento: {
    id: string
    nombre: string
  }

  organizacion: {
    id: string
    nombre: string
  }
  usuario?: User

  creadoEn: Date
}
