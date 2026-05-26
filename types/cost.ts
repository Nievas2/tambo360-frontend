import { Lote } from '@/types/batch'
import { TipoCosto } from '@/types/enums'
import z from 'zod'

export enum Concept {
  insumos_basicos = 'insumos_basicos',
  leche_cruda = 'leche_cruda',
  cuajo_y_fermentos = 'cuajo_y_fermentos',
  refrigeracion = 'refrigeracion',
}

export const CONCEPTO_LABELS: Record<string, string> = {
  insumos_basicos: 'Insumos',
  leche_cruda: 'Leche Cruda',
  cuajo_y_fermentos: 'Cuajo y Fermentos',
  refrigeracion: 'Refrigeración',
}

export const TIPO_COSTO_LABELS: Record<string, string> = {
  ALIMENTACION: 'Alimentación',
  SANIDAD: 'Sanidad',
  MANO_OBRA: 'Mano de Obra',
  ENERGIA: 'Energía',
  MANTENIMIENTO: 'Mantenimiento',
  LOGISTICA: 'Logística',
  OTRO: 'Otro',
}

export const UpdateCostSchema = z.object({
  concepto: z
    .enum(TipoCosto)
    .optional()
    .refine((value) => value !== undefined, 'Concepto requerido'),
  monto: z
    .string()
    .min(1, 'Monto requerido')
    .refine((value) => !isNaN(Number(value)), 'Monto no valido')
    .transform((value) => Number(value)),
  observaciones: z
    .string()
    .max(100, 'Observaciones demasiado largas')
    .optional()
    .refine((val) => !val || val.trim().length > 0, {
      message: 'Observaciones no puede contener solo espacios',
    }),
})

export type UpdateCostData = z.infer<typeof UpdateCostSchema>

export interface Costo {
  idCostoDirecto: string
  concepto: string
  monto: string
  moneda: string
  observaciones: string
  fechaCreacion: string
  idLote: string
  lote: Lote
}

export interface CostosDirecto {
  idCostoDirecto: string
  concepto: TipoCosto
  monto: number
  observaciones?: string
  fechaCreacion: string
  tipoCosto: TipoCosto

  idLote: string
  lote?: Lote
}
