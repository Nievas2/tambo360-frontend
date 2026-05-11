import { RolOrganizacion } from '@/types/enums'
import {
  Establecimiento,
  Establecimiento_OrganiacionUsuario,
} from '@/types/establishment'
import { Invitacion } from '@/types/invite'
import { User } from '@/types/types'
import z from 'zod'

export const createOrganization = z.object({
  name: z
    .string()
    .min(1, 'El nombre de la organización es requerido')
    .max(
      255,
      'El nombre de la organización no puede exceder los 255 caracteres'
    ),
})

export interface Organizacion {
  idOrganizacion: string
  nombre: string
  fechaCreacion: Date

  usuarios?: OrganizacionUsuario[]
  establecimientos?: Establecimiento[]
  invitacions?: Invitacion[]
}

export interface OrganizacionUsuario {
  idOrganizacionUsuario: string

  idOrganizacion: string
  organizacion?: Organizacion

  idUsuario: string
  usuario?: User

  rol: RolOrganizacion
  estado: boolean
  fechaCreacion: Date

  establecimientoOrganizacionUsuarios?: Establecimiento_OrganiacionUsuario[]
}
