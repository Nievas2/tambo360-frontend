'use client'
import { useResponseInvite } from '@/hooks/invitation/useResponseInvite'
import { InvitationRole } from '@/types/enums'
import { Invitacion } from '@/types/invite'

interface InvitationCardProps {
  invitation: Invitacion
}

export const InvitationCard = ({ invitation }: InvitationCardProps) => {
  const name = invitation.establecimiento.nombre || 'Tambo General'
  const orgName = invitation.organizacion.nombre || 'Organización'
  const { mutate } = useResponseInvite()

  function handleResponseInvite(
    idInvitacion: string,
    accion: 'aceptada' | 'rechazada',
    rol: InvitationRole
  ) {
    mutate({ idInvitacion, accion, rol })
  }

  return (
    <div className="max-w-sm w-full bg-white border border-emerald-800/30 rounded-[2rem] p-10 shadow-lg flex flex-col items-center text-center font-sans">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-2">{name}</h2>
        <p className="text-gray-700 text-sm">
          Organización: <span className="ml-1 font-medium">{orgName}</span>
        </p>
      </div>

      <div className="mb-10">
        <span className="text-slate-400 text-sm font-semibold uppercase tracking-wide block mb-1">
          Rol Ofrecido
        </span>
        <h3 className="text-emerald-700 text-lg font-bold">
          {invitation.rol.nombre}
        </h3>
      </div>

      <div className="w-full space-y-3">
        <button
          className="w-full bg-[#2D8659] hover:bg-[#246d47] text-white font-bold py-4 rounded-xl transition-colors text-lg"
          onClick={() =>
            handleResponseInvite(invitation.id, 'aceptada', invitation.rol.rol)
          }
        >
          Aceptar Invitación
        </button>

        <button
          className="w-full bg-[#96A3B6] hover:bg-[#808da1] text-white font-bold py-4 rounded-xl transition-colors text-lg"
          onClick={() =>
            handleResponseInvite(invitation.id, 'rechazada', invitation.rol.rol)
          }
        >
          Rechazar
        </button>
      </div>
    </div>
  )
}
