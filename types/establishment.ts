import { Lote } from '@/types/batch'
import { RolEstablecimiento, TipoOrdenie, VentaLeche } from '@/types/enums'
import { Organizacion, OrganizacionUsuario } from '@/types/organization'
import z from 'zod'

export const EstablishmentSchema = z.object({
  nombre: z
    .string()
    .min(5, 'El nombre del establecimiento debe tener al menos 5 caracteres')
    .max(
      100,
      'El nombre del establecimiento no puede tener más de 100 caracteres'
    ),
})

export const UpdateEstablishmentSchema = z.object({
  nombre: z
    .string()
    .min(5, 'El nombre del establecimiento debe tener al menos 5 caracteres')
    .max(
      100,
      'El nombre del establecimiento no puede tener más de 100 caracteres'
    ),
})

export type EstablishmentName = z.infer<typeof UpdateEstablishmentSchema>

export type EstablishmentData = z.infer<typeof EstablishmentSchema> & {
  organizacionId: string
}

export interface Establecimiento {
  idEstablecimiento: string
  nombre: string
  localidad?: string
  provincia?: string
  fechaCreacion: Date

  idOrganizacion: string
  organizacion?: Organizacion

  loteProducciones?: Lote[]
  establecimientoOrganizacionUsuarios?: Establecimiento_OrganiacionUsuario[]
  configuracions?: Configuracion[]
  establecimientoRazas?: EstablecimientoRaza[]
}

export interface Establecimiento_OrganiacionUsuario {
  idEstablecimientoOrganizacionUsuario: string

  idEstablecimiento: string
  establecimiento?: Establecimiento

  idOrganizacionUsuario: string
  organizacionUsuario?: OrganizacionUsuario

  rol: RolEstablecimiento
  estado: boolean
  fechaCreacion: Date
}

export interface Configuracion {
  idConfiguracion: string

  idEstablecimiento: string
  establecimiento?: Establecimiento

  cantVacas?: number
  cantOrdenies?: number
  promLitros?: number
  tipoOrdenie?: TipoOrdenie
  ventaLeche?: VentaLeche
  empleados?: boolean
  cantEmpleados?: number

  modificadoEn?: Date
}

export interface EstablecimientoRaza {
  idEstablecimientoRaza: string

  idEstablecimiento: string
  establecimiento?: Establecimiento

  idRaza: string
  raza?: Raza
}

export interface Raza {
  idRaza: string
  nombre: string

  establecimientoRazas?: EstablecimientoRaza[]
}
