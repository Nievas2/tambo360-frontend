import { Lote } from '@/types/batch'
import { Categoria } from '@/types/enums'

export interface Product {
  idProducto: string
  nombre: string
  categoria: Categoria

  loteProducciones?: Lote[]
}
