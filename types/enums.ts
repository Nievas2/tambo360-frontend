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

export type RolOrganizacion = 'ORG_OWNER' | 'ORG_ADMIN' | 'MEMBER'

export type RolEstablecimiento = 'OWNER' | 'ADMIN' | 'EMPLOYEE'

export enum InvitationRole {
  EMPLOYEE = 'EMPLOYEE',
  ADMIN = 'ADMIN',
}

export type EstadoInvitacion = 'pendiente' | 'aceptada' | 'rechazada'

export enum TipoOrdenie {
  BALDE = 'balde',
  LINEA = 'linea',
  ESPINA_DE_PESCADO = 'espina_de_pescado',
  ROTATIVO = 'rotativo',
  MANUAL = 'manual',
  OTRO = 'otro',
}

export enum VentaLeche {
  USINA = 'usina',
  FABRICA_PROPIA = 'fabrica_propia',
  COOPERATIVA = 'cooperativa',
  VARIOS = 'varios',
}

export type NivelAlerta = 'bajo' | 'medio' | 'alto'
