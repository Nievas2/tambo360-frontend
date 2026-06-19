import { Alert } from '@/types/alerts'
import { CostosDirecto } from '@/types/cost'
import { Merma } from '@/types/decrease'
import { TipoDestino, Unidad } from '@/types/enums'
import { Establecimiento, Raza } from '@/types/establishment'
import { Rodeo } from '@/types/establishment/herd'
import { Product } from '@/types/product'
import z from 'zod'

export const BatchSchema = z.object({
  idProducto: z.uuidv4().min(1, 'Debe seleccionar un producto válido'),
  cantRaza: z.preprocess(
    (val) => {
      if (val === '' || val === null || val === undefined) return undefined
      const parsed = Number(val)
      return isNaN(parsed) ? undefined : parsed
    },
    z
      .number()
      .refine((v) => v !== undefined, {
        message: 'La cantidad es obligatoria',
      })
      .positive('La cantidad debe ser mayor a 0')
  ),
  idRodeo: z.uuidv4().min(1, 'Debe seleccionar un rodeo válido'),
  unidad: z.enum(Unidad, 'Unidad inválida'),
  tempTanque: z.coerce
    .number()
    .refine((v) => v !== undefined && v !== null, {
      message: 'La temperatura del tanque es obligatoria',
    })
    .positive('La temperatura del tanque debe ser mayor a 0'),

  destino: z
    .enum(TipoDestino, 'Destino inválido')
    .optional()
    .refine((v) => v !== undefined, {
      message: 'La cantidad es obligatoria',
    }),
  cantidad: z.preprocess(
    (val) => {
      if (val === '' || val === null || val === undefined) return undefined
      const parsed = Number(val)
      return isNaN(parsed) ? undefined : parsed
    },
    z
      .number()
      .refine((v) => v !== undefined, {
        message: 'La cantidad es obligatoria',
      })
      .positive('La cantidad debe ser mayor a 0')
  ),

  fechaProduccion: z
    .string()
    .min(1, 'La fecha de producción es obligatoria')
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Fecha inválida',
    })
    .refine(
      (val) => {
        const fechaIngresada = new Date(val + 'T00:00:00')

        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0)

        const haceUnaSemana = new Date(hoy)
        haceUnaSemana.setDate(hoy.getDate() - 7)

        return fechaIngresada >= haceUnaSemana
      },
      {
        message: 'La fecha no puede ser de hace más de una semana',
      }
    )
    .refine(
      (val) => {
        const fechaIngresada = new Date(val + 'T00:00:00')

        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0)

        return fechaIngresada <= hoy
      },
      {
        message: 'La fecha no puede ser futura',
      }
    ),
})

export type BatchData = z.infer<typeof BatchSchema>

export type BatchDto = BatchData & { id: string }

export interface Lote {
  idLote: string
  numeroLote: number
  fechaProduccion: string

  idProducto: string
  producto?: Product

  cantidad: string
  unidad: Unidad

  idRaza: string
  cantAnimales?: number

  idEstablecimiento: string
  estado: boolean
  establecimiento?: Establecimiento

  tempTanque: number
  destino: TipoDestino

  raza: Raza
  rodeo: Rodeo
  mermas: Merma[]
  costosDirectos?: CostosDirecto[]
  alertas?: Alert[]
}

export interface BatchFilters {
  nombre?: string
  orden?: 'asc' | 'desc'
  pagina?: string
}
