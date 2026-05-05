import { TipoOrdenie, VentaLeche } from '@/types/enums'
import z from 'zod'

export const configurationSchema = z.object({
  cantidadVacas: z.number().int().positive(),
  Razas: z.array(
    z.object({
      idRaza: z.uuid('El ID de la raza debe ser un UUID válido'),
      nombre: z.string('El nombre de la raza debe ser una cadena de texto'),
    })
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

export type ConfigurationData = z.infer<typeof configurationSchema>
