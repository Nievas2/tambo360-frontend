import {
  TipoOrdenie,
  TipoRodeo,
  TipoSeguimiento,
  VentaLeche,
} from '@/types/enums'
import z from 'zod'

const rodeoSchema = z.object({
  tipoRodeo: z.nativeEnum(TipoRodeo),
  cantVacas: z
    .number('La cantidad de vacas debe ser un número')
    .int('La cantidad de vacas debe ser un número entero')
    .positive('La cantidad de vacas debe ser un número entero positivo'),
  costoRacion: z
    .number('El costo de la ración debe ser un número')
    .positive('El costo de la ración debe ser un número positivo'),
})

export const configurationSchema = z
  .object({
    cantVacas: z
      .number('La cantidad de vacas debe ser un número')
      .int('La cantidad de vacas debe ser un número entero')
      .positive('La cantidad de vacas debe ser un número entero positivo'),
    cantOrdenie: z
      .number()
      .int('La cantidad de ordeñes debe ser un número entero')
      .positive(
        'La cantidad de ordeñes por día debe ser un número entero positivo'
      ),
    tipoOrdenie: z.nativeEnum(TipoOrdenie),
    promLitros: z
      .number('El promedio de litros debe ser un número')
      .positive('El promedio de litros debe ser un número positivo'),
    ventaLeche: z.nativeEnum(VentaLeche),
    empleados: z.boolean('El campo de empleados debe ser un booleano'),
    cantEmpleados: z
      .number()
      .int('La cantidad de empleados debe ser un número entero')
      .positive('La cantidad de empleados debe ser un número entero positivo')
      .optional(),
    ubicacion: z.object({
      provincia: z.string('La provincia es requerida'),
      localidad: z.string('La localidad es requerida'),
    }),
    TipoSeguimiento: z.nativeEnum(TipoSeguimiento),
    rodeos: z.array(rodeoSchema).optional(),
  })
  .refine(
    (data) => {
      if (data.empleados) {
        return data.cantEmpleados !== undefined
      }
      return true
    },
    {
      message:
        'La cantidad de empleados es requerida si el establecimiento tiene empleados',
    }
  )

  // Si el tipo de seguimiento es RODEO, los rodeos son obligatorios y debe existir al menos
  // un rodeo de cada tipo
  .refine(
    (data) => {
      if (data.TipoSeguimiento === TipoSeguimiento.RODEO) {
        const rodeos = data.rodeos
        if (!rodeos || rodeos.length === 0) return false
        const tiposPresentes = new Set(rodeos.map((r) => r.tipoRodeo))
        const todosLosTipos = Object.values(TipoRodeo)
        return todosLosTipos.every((tipo) => tiposPresentes.has(tipo))
      }
      return true
    },
    {
      message:
        'Debe existir al menos un rodeo de cada tipo cuando el seguimiento es RODEO',
    }
  )

export type ConfigurationData = z.infer<typeof configurationSchema>

export type ConfigurationRequest = Omit<
  ConfigurationData,
  'registrarRodeo' | 'costoRacion'
> & {
  TipoSeguimiento: 'RODEO'
  tipoSeguimiento?: 'RODEO'
  idEstablecimiento: string
  rodeos: Array<{
    tipoRodeo: string
    cantVacas: number
    costoRacion: number
  }>
}
