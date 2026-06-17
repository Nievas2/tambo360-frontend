import { TipoOrdenie, VentaLeche, TipoRodeo } from '@/types/enums'
import z from 'zod'

const rodeoSchema = z.object({
  tipoRodeo: z.enum(TipoRodeo, 'El tipo de rodeo debe ser un valor válido'),
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
    rodeos: z.array(rodeoSchema).refine(
      (rodeos) => {
        const tiposPresentes = new Set(rodeos.map((r) => r.tipoRodeo))
        const todosLosTipos = Object.values(TipoRodeo)
        return todosLosTipos.every((tipo) => tiposPresentes.has(tipo))
      },
      {
        message: 'Debe existir al menos un rodeo de cada tipo',
      }
    ),
    cantOrdenie: z
      .number()
      .int('La cantidad de ordeñes debe ser un número entero')
      .positive(
        'La cantidad de ordeñes por día debe ser un número entero positivo'
      ),
    tipoOrdenie: z.enum(
      TipoOrdenie,
      'El tipo de ordeñe debe ser un valor válido'
    ),
    promLitros: z
      .number('El promedio de litros por vaca debe ser un número')
      .positive('El promedio de litros por vaca debe ser un número positivo'),
    ventaLeche: z.enum(
      VentaLeche,
      'El tipo de venta de leche debe ser un valor válido'
    ),
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

export type ConfigurationData = z.infer<typeof configurationSchema>
