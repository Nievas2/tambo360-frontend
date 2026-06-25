import { Lote } from '@/types/batch'
import { Categoria, Unidad } from '@/types/enums'
import z from 'zod'

export interface Product {
  idProducto: string
  nombre: string
  categoria: Categoria
  loteProducciones?: Lote[]
}

export const newProductSchema = z.object({
  nombre: z.string().min(1, 'El nombre del producto es requerido'),
  unidad: z.enum(Unidad, 'La unidad de medida debe ser un valor válido'),
})

export type NewProductForm = z.infer<typeof newProductSchema>
