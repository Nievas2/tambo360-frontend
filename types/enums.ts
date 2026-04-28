export type Unidad = 'kg' | 'litros'

export type Moneda = 'USD' | 'EUR' | 'ARS'

export type Categoria = 'quesos' | 'leches'

export type TipoToken = 'verificacion' | 'recuperacion'

export type TipoMerma = 'Natural' | 'Tecnica' | 'Administrativa' | 'Danio'

export type ConceptoCosto =
  | 'insumos_basicos'
  | 'leche_cruda'
  | 'cuajo_y_fermentos'
  | 'refrigeracion'

export type RolOrganizacion =
  | 'cooperativa'
  | 'duenio'
  | 'administrador'
  | 'empleado'

export type RolEstablecimiento = 'duenio' | 'administrador' | 'empleado'

export type EstadoInvitacion = 'pendiente' | 'aceptada' | 'rechazada'

export type TipoOrdenie =
  | 'balde'
  | 'linea'
  | 'espina_de_pescado'
  | 'rotativo'
  | 'manual'
  | 'otro'

export type VentaLeche = 'usina' | 'fabrica_propia' | 'cooperativa' | 'varios'

export type NivelAlerta = 'bajo' | 'medio' | 'alto'
