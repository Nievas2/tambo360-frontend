import { TipoToken } from '@/types/enums'
import { Invitacion } from '@/types/invite'
import { OrganizacionUsuario } from '@/types/organization'

export interface User {
  idUsuario: string
  correo: string
  contrasena: string
  nombre: string
  verificado: boolean
  fechaCreacion: Date
  activo: boolean

  tokens?: VerificarToken[]
  organizaciones?: OrganizacionUsuario[]
  invitacions?: Invitacion[]
}

export interface VerificarToken {
  tokenid: string

  idUsuario: string
  usuario?: User

  tipo: TipoToken
  tokenHash: string
  expiraEn: Date
  usadoEn?: Date
  creadoEn: Date
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export enum AuthView {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  DASHBOARD = 'DASHBOARD',
}
