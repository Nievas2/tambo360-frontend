import { EstadoInvitacion, RolOrganizacion } from '@/types/enums'
import { Organizacion } from '@/types/organization'
import { User } from '@/types/types'

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
