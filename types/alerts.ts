import { Categoria, NivelAlerta } from '@/types/enums'

export interface Alert {
  id: string
  idEstablecimiento: string
  idLote: string

  producto: string
  categoria: Categoria
  nivel: NivelAlerta

  descripcion: string
  creadoEn: Date
  visto: boolean
}
